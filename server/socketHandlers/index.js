// Socket event handlers for quiz application
import roomManager from '../managers/roomManager.js';

export default function initSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle joining a room
    socket.on('join-room', (data) => {
      const { roomId, user } = data;
      
      try {
        // Add user to room using room manager
        const participant = roomManager.addParticipant(roomId, socket.id, user);
        
        // Join socket room
        socket.join(roomId);
        
        const room = roomManager.getRoom(roomId);
        
        // Notify room about new user and send updated participants
        socket.to(roomId).emit('user-joined', { 
          username: user, 
          participantCount: room.participants.size,
          participants: roomManager.getParticipants(roomId)
        });

        // Send current room state to new user
        socket.emit('room-state', {
          participants: roomManager.getParticipants(roomId),
          leaderboard: roomManager.getLeaderboard(roomId),
          gameState: room.gameState,
          currentQuestion: room.currentQuestion
        });

        console.log(`User ${user} joined room ${roomId}`);
      } catch (error) {
        console.error('Error joining room:', error);
        socket.emit('error', { message: error.message });
      }
    });

    // Handle quiz answer submission
    socket.on('submit-answer', (data) => {
      const { roomId, answer, questionIndex } = data;
      
      try {
        const result = roomManager.submitAnswer(roomId, socket.id, answer, questionIndex);
        const room = roomManager.getRoom(roomId);
        const participant = room.participants.get(socket.id);
        
        // Notify room about answer submission
        socket.to(roomId).emit('answer-submitted', {
          username: participant.username,
          hasAnswered: true,
          isCorrect: result.isCorrect
        });

        // Update leaderboard
        broadcastLeaderboard(roomId, io);
        
        // Check if all participants have answered
        if (roomManager.allParticipantsAnswered(roomId)) {
          setTimeout(() => {
            nextQuestion(roomId, io);
          }, 2000); // Wait 2 seconds before next question
        }
      } catch (error) {
        console.error('Error submitting answer:', error);
        socket.emit('error', { message: error.message });
      }
    });

    // Handle starting quiz
    socket.on('start-quiz', (data) => {
      const { roomId, quizData } = data;
      
      try {
        const result = roomManager.startQuiz(roomId);
        
        // Notify all participants
        io.to(roomId).emit('quiz-started', {
          quiz: result.quiz,
          question: result.question,
          questionNumber: result.questionNumber,
          totalQuestions: result.totalQuestions
        });

        console.log(`Quiz started in room ${roomId}`);
      } catch (error) {
        console.error('Error starting quiz:', error);
        socket.emit('error', { message: error.message });
      }
    });

    // Handle ending quiz (host only)
    socket.on('end-quiz', (data) => {
      const { roomId } = data;
      
      try {
        const room = roomManager.getRoom(roomId);
        if (!room) {
          socket.emit('error', { message: 'Room not found' });
          return;
        }

        // Check if user is the host
        if (room.hostId !== socket.id) {
          socket.emit('error', { message: 'Only the host can end the quiz' });
          return;
        }

        // End the quiz
        room.gameState = 'finished';
        const leaderboard = roomManager.getLeaderboard(roomId);
        
        // Notify all participants
        io.to(roomId).emit('quiz-ended', {
          leaderboard: leaderboard
        });

        console.log(`Quiz ended in room ${roomId}`);
      } catch (error) {
        console.error('Error ending quiz:', error);
        socket.emit('error', { message: error.message });
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      
      // Remove user from all rooms using room manager
      const allRooms = roomManager.getAllRooms();
      allRooms.forEach(roomInfo => {
        const room = roomManager.getRoom(roomInfo.id);
        if (room && room.participants.has(socket.id)) {
          const participant = roomManager.removeParticipant(roomInfo.id, socket.id);
          
          if (participant) {
            // Notify room about user leaving and send updated participants
            socket.to(roomInfo.id).emit('user-left', {
              username: participant.username,
              participantCount: room.participants.size,
              participants: roomManager.getParticipants(roomInfo.id)
            });

            // Update leaderboard
            broadcastLeaderboard(roomInfo.id, io);
          }
        }
      });
    });
  });
}

// Helper function to broadcast leaderboard updates
function broadcastLeaderboard(roomId, io) {
  const leaderboard = roomManager.getLeaderboard(roomId);
  io.to(roomId).emit('update-leaderboard', leaderboard);
}

// Helper function to move to next question
function nextQuestion(roomId, io) {
  try {
    const result = roomManager.nextQuestion(roomId);
    
    if (result.finished) {
      // Quiz finished
      io.to(roomId).emit('quiz-finished', {
        leaderboard: result.leaderboard
      });
    } else {
      // Next question
      io.to(roomId).emit('next-question', {
        question: result.question,
        questionNumber: result.questionNumber,
        totalQuestions: result.totalQuestions
      });
    }
  } catch (error) {
    console.error('Error moving to next question:', error);
  }
}