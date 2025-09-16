import express from "express";
import roomManager from "../managers/roomManager.js";
import { getAvailableQuizzes, getSafeQuiz } from "../data/quizData.js";

const router = express.Router();

// Create a new room
router.post('/', (req, res) => {
  try {
    const { hostId, difficulty = 'easy', quizTitle } = req.body;
    
    if (!hostId) {
      return res.status(400).json({ error: 'Host ID is required' });
    }

    const result = roomManager.createRoom(hostId, difficulty, quizTitle);
    res.json(result);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get room information
router.get('/:roomId', (req, res) => {
  try {
    const { roomId } = req.params;
    const room = roomManager.getRoom(roomId);
    
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json(roomManager.getRoomInfo(room));
  } catch (error) {
    console.error('Error getting room:', error);
    res.status(500).json({ error: 'Failed to get room information' });
  }
});

// Get available quizzes
router.get('/quizzes/available', (req, res) => {
  try {
    const availableQuizzes = getAvailableQuizzes();
    res.json({ quizzes: availableQuizzes });
  } catch (error) {
    console.error('Error getting available quizzes:', error);
    res.status(500).json({ error: 'Failed to get available quizzes' });
  }
});

// Get quiz questions for a specific difficulty
router.get('/quizzes/:difficulty', (req, res) => {
  try {
    const { difficulty } = req.params;
    const safeQuiz = getSafeQuiz(difficulty);
    res.json({ quiz: safeQuiz });
  } catch (error) {
    console.error('Error getting quiz:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete room (cleanup)
router.delete('/:roomId', (req, res) => {
  try {
    const { roomId } = req.params;
    const deleted = roomManager.deleteRoom(roomId);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ error: 'Failed to delete room' });
  }
});

export default router;
