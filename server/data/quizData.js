// Quiz data module - centralized quiz questions and configurations
export const quizCategories = {
  easy: {
    id: 'easy',
    title: 'Easy Quiz',
    description: 'Basic questions for beginners',
    timePerQuestion: 30,
    pointsPerQuestion: 10
  },
  medium: {
    id: 'medium', 
    title: 'Medium Quiz',
    description: 'Intermediate level questions',
    timePerQuestion: 20,
    pointsPerQuestion: 15
  },
  hard: {
    id: 'hard',
    title: 'Hard Quiz', 
    description: 'Advanced challenging questions',
    timePerQuestion: 15,
    pointsPerQuestion: 20
  }
};

export const quizQuestions = {
  easy: [
    {
      id: 1,
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
      explanation: 'Basic addition: 2 + 2 = 4'
    },
    {
      id: 2,
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 'Paris',
      explanation: 'Paris is the capital and largest city of France'
    },
    {
      id: 3,
      question: 'Which planet is closest to the Sun?',
      options: ['Venus', 'Mercury', 'Earth', 'Mars'],
      correctAnswer: 'Mercury',
      explanation: 'Mercury is the closest planet to the Sun in our solar system'
    },
    {
      id: 4,
      question: 'What is the largest mammal in the world?',
      options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
      correctAnswer: 'Blue Whale',
      explanation: 'The blue whale is the largest mammal and animal on Earth'
    },
    {
      id: 5,
      question: 'How many days are in a week?',
      options: ['5', '6', '7', '8'],
      correctAnswer: '7',
      explanation: 'There are 7 days in a week: Monday through Sunday'
    }
  ],
  medium: [
    {
      id: 1,
      question: 'What is the square root of 64?',
      options: ['6', '7', '8', '9'],
      correctAnswer: '8',
      explanation: '8 × 8 = 64, so the square root of 64 is 8'
    },
    {
      id: 2,
      question: 'Who painted the Mona Lisa?',
      options: ['Van Gogh', 'Picasso', 'Da Vinci', 'Michelangelo'],
      correctAnswer: 'Da Vinci',
      explanation: 'Leonardo da Vinci painted the Mona Lisa between 1503-1519'
    },
    {
      id: 3,
      question: 'What is the chemical symbol for Gold?',
      options: ['Go', 'Gd', 'Au', 'Ag'],
      correctAnswer: 'Au',
      explanation: 'Au comes from the Latin word "aurum" meaning gold'
    },
    {
      id: 4,
      question: 'Which ocean is the largest?',
      options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'],
      correctAnswer: 'Pacific',
      explanation: 'The Pacific Ocean is the largest ocean, covering about 46% of Earth\'s water surface'
    },
    {
      id: 5,
      question: 'What is the speed of light in vacuum?',
      options: ['300,000 km/s', '299,792,458 m/s', '186,000 miles/s', 'All of the above'],
      correctAnswer: 'All of the above',
      explanation: 'All these values represent the speed of light in different units'
    }
  ],
  hard: [
    {
      id: 1,
      question: 'What is the derivative of x²?',
      options: ['x', '2x', 'x²', '2'],
      correctAnswer: '2x',
      explanation: 'Using the power rule: d/dx(x²) = 2x'
    },
    {
      id: 2,
      question: 'Which programming language was created by Brendan Eich?',
      options: ['Python', 'JavaScript', 'Java', 'C++'],
      correctAnswer: 'JavaScript',
      explanation: 'Brendan Eich created JavaScript in 1995 while working at Netscape'
    },
    {
      id: 3,
      question: 'What is the time complexity of binary search?',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
      correctAnswer: 'O(log n)',
      explanation: 'Binary search has O(log n) time complexity as it halves the search space each iteration'
    },
    {
      id: 4,
      question: 'Which HTTP status code means "Not Found"?',
      options: ['400', '401', '404', '500'],
      correctAnswer: '404',
      explanation: 'HTTP 404 Not Found indicates the requested resource could not be found'
    },
    {
      id: 5,
      question: 'What is the Big O notation for merge sort?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      correctAnswer: 'O(n log n)',
      explanation: 'Merge sort has O(n log n) time complexity in all cases'
    }
  ]
};

// Helper function to get quiz by difficulty
export function getQuizByDifficulty(difficulty) {
  const category = quizCategories[difficulty];
  const questions = quizQuestions[difficulty];
  
  if (!category || !questions) {
    throw new Error(`Quiz difficulty "${difficulty}" not found`);
  }

  return {
    id: `${difficulty}-quiz`,
    title: category.title,
    difficulty: difficulty,
    description: category.description,
    timePerQuestion: category.timePerQuestion,
    pointsPerQuestion: category.pointsPerQuestion,
    questions: questions.map(q => ({
      ...q,
      timeLimit: category.timePerQuestion
    }))
  };
}

// Helper function to get all available quiz difficulties
export function getAvailableQuizzes() {
  return Object.keys(quizCategories).map(difficulty => ({
    difficulty,
    title: quizCategories[difficulty].title,
    description: quizCategories[difficulty].description,
    questionCount: quizQuestions[difficulty].length,
    timePerQuestion: quizCategories[difficulty].timePerQuestion
  }));
}

// Helper function to get safe quiz (without correct answers)
export function getSafeQuiz(difficulty) {
  const quiz = getQuizByDifficulty(difficulty);
  
  return {
    ...quiz,
    questions: quiz.questions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options,
      timeLimit: q.timeLimit
    }))
  };
}

// Helper function to check if answer is correct
export function checkAnswer(question, answer) {
  return question.correctAnswer === answer;
}

// Helper function to get question explanation
export function getQuestionExplanation(question) {
  return question.explanation || 'No explanation available';
}
