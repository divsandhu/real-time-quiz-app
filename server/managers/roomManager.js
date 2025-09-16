// Room Manager - handles all room-related operations
import { getQuizByDifficulty, checkAnswer } from '../data/quizData.js';

class RoomManager {
  constructor() {
    this.rooms = new Map();
    this.userScores = new Map(); // Store user scores by room
  }

  // Create a new room
  createRoom(hostId, difficulty = 'easy', quizTitle = null) {
    const roomId = this.generateRoomId();
    
    try {
      const quizData = getQuizByDifficulty(difficulty);
      
      const room = {
        id: roomId,
        hostId,
        difficulty,
        quizTitle: quizTitle || quizData.title,
        quiz: quizData,
        createdAt: new Date(),
        participants: new Map(),
        gameState: 'waiting', // waiting, playing, finished
        currentQuestion: 0,
        leaderboard: [],
        settings: {
          timePerQuestion: quizData.timePerQuestion,
          pointsPerQuestion: quizData.pointsPerQuestion,
          autoStart: false,
          showExplanations: true
        }
      };

      this.rooms.set(roomId, room);
      console.log(`Room ${roomId} created by ${hostId}`);
      
      return {
        roomId,
        room: this.getRoomInfo(room)
      };
    } catch (error) {
      throw new Error(`Failed to create room: ${error.message}`);
    }
  }

  // Get room by ID
  getRoom(roomId) {
    return this.rooms.get(roomId);
  }

  // Get room information (public data only)
  getRoomInfo(room) {
    if (!room) return null;
    
    return {
      id: room.id,
      difficulty: room.difficulty,
      quizTitle: room.quizTitle,
      createdAt: room.createdAt,
      gameState: room.gameState,
      participantCount: room.participants.size,
      currentQuestion: room.currentQuestion,
      totalQuestions: room.quiz ? room.quiz.questions.length : 0,
      settings: room.settings
    };
  }

  // Add participant to room
  addParticipant(roomId, socketId, username) {
    const room = this.getRoom(roomId);
    if (!room) {
      throw new Error('Room not found');
    }

    if (room.gameState === 'playing') {
      throw new Error('Cannot join room while quiz is in progress');
    }

    const participant = {
      id: socketId,
      username,
      score: 0,
      currentAnswer: null,
      answered: false,
      joinedAt: new Date()
    };

    room.participants.set(socketId, participant);
    
    console.log(`User ${username} joined room ${roomId}`);
    return participant;
  }

  // Remove participant from room
  removeParticipant(roomId, socketId) {
    const room = this.getRoom(roomId);
    if (!room) return null;

    const participant = room.participants.get(socketId);
    if (participant) {
      room.participants.delete(socketId);
      console.log(`User ${participant.username} left room ${roomId}`);
    }

    return participant;
  }

  // Start quiz in room
  startQuiz(roomId) {
    const room = this.getRoom(roomId);
    if (!room) {
      throw new Error('Room not found');
    }

    if (room.participants.size === 0) {
      throw new Error('Cannot start quiz with no participants');
    }

    room.gameState = 'playing';
    room.currentQuestion = 0;

    // Reset all participants
    room.participants.forEach(participant => {
      participant.score = 0;
      participant.answered = false;
      participant.currentAnswer = null;
    });

    console.log(`Quiz started in room ${roomId}`);
    return {
      quiz: room.quiz,
      question: room.quiz.questions[0],
      questionNumber: 1,
      totalQuestions: room.quiz.questions.length
    };
  }

  // Submit answer for a participant
  submitAnswer(roomId, socketId, answer, questionIndex) {
    const room = this.getRoom(roomId);
    if (!room || room.gameState !== 'playing') {
      throw new Error('Room not found or quiz not active');
    }

    const participant = room.participants.get(socketId);
    if (!participant) {
      throw new Error('Participant not found');
    }

    if (participant.answered) {
      throw new Error('Answer already submitted');
    }

    const question = room.quiz.questions[questionIndex];
    if (!question) {
      throw new Error('Question not found');
    }

    const isCorrect = checkAnswer(question, answer);
    
    if (isCorrect) {
      participant.score += room.settings.pointsPerQuestion;
    }

    participant.currentAnswer = answer;
    participant.answered = true;

    console.log(`Answer submitted by ${participant.username}: ${isCorrect ? 'Correct' : 'Incorrect'}`);
    
    return {
      isCorrect,
      score: participant.score,
      explanation: question.explanation
    };
  }

  // Check if all participants have answered
  allParticipantsAnswered(roomId) {
    const room = this.getRoom(roomId);
    if (!room) return false;

    return Array.from(room.participants.values()).every(p => p.answered);
  }

  // Move to next question
  nextQuestion(roomId) {
    const room = this.getRoom(roomId);
    if (!room || !room.quiz) {
      throw new Error('Room or quiz not found');
    }

    room.currentQuestion++;
    
    if (room.currentQuestion >= room.quiz.questions.length) {
      // Quiz finished
      room.gameState = 'finished';
      return {
        finished: true,
        leaderboard: this.getLeaderboard(roomId)
      };
    } else {
      // Next question
      room.participants.forEach(participant => {
        participant.answered = false;
        participant.currentAnswer = null;
      });

      return {
        finished: false,
        question: room.quiz.questions[room.currentQuestion],
        questionNumber: room.currentQuestion + 1,
        totalQuestions: room.quiz.questions.length
      };
    }
  }

  // Get leaderboard for room
  getLeaderboard(roomId) {
    const room = this.getRoom(roomId);
    if (!room) return [];

    const participants = Array.from(room.participants.values());
    return participants
      .sort((a, b) => b.score - a.score)
      .map((participant, index) => ({
        rank: index + 1,
        username: participant.username,
        score: participant.score,
        socketId: participant.id
      }));
  }

  // Get participants list
  getParticipants(roomId) {
    const room = this.getRoom(roomId);
    if (!room) return [];

    return Array.from(room.participants.values());
  }

  // Delete room
  deleteRoom(roomId) {
    const room = this.getRoom(roomId);
    if (room) {
      this.rooms.delete(roomId);
      console.log(`Room ${roomId} deleted`);
      return true;
    }
    return false;
  }

  // Generate unique room ID
  generateRoomId() {
    let roomId;
    do {
      roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    } while (this.rooms.has(roomId));
    
    return roomId;
  }

  // Get all rooms (for admin purposes)
  getAllRooms() {
    const rooms = [];
    this.rooms.forEach((room, roomId) => {
      rooms.push(this.getRoomInfo(room));
    });
    return rooms;
  }

  // Clean up empty rooms (call periodically)
  cleanupEmptyRooms() {
    const emptyRooms = [];
    this.rooms.forEach((room, roomId) => {
      if (room.participants.size === 0) {
        emptyRooms.push(roomId);
      }
    });

    emptyRooms.forEach(roomId => {
      this.deleteRoom(roomId);
    });

    console.log(`Cleaned up ${emptyRooms.length} empty rooms`);
    return emptyRooms.length;
  }
}

// Export singleton instance
export default new RoomManager();
