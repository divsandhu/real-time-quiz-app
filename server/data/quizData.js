// Quiz data module - centralized quiz questions and configurations
export const quizCategories = {
  easy: {
    id: 'easy',
    title: 'Basic Aptitude',
    description: 'Fundamental logical reasoning and basic math',
    timePerQuestion: 30,
    pointsPerQuestion: 10
  },
  medium: {
    id: 'medium', 
    title: 'Intermediate Aptitude',
    description: 'Moderate quantitative and verbal reasoning',
    timePerQuestion: 25,
    pointsPerQuestion: 15
  },
  hard: {
    id: 'hard',
    title: 'Advanced Aptitude', 
    description: 'Complex analytical and reasoning skills',
    timePerQuestion: 20,
    pointsPerQuestion: 20
  }
};

export const quizQuestions = {
  easy: [
    {
      id: 1,
      question: 'If A is taller than B, and B is taller than C, then A is taller than C. This is an example of:',
      options: ['Transitive property', 'Commutative property', 'Associative property', 'Distributive property'],
      correctAnswer: 'Transitive property',
      explanation: 'The transitive property states that if A > B and B > C, then A > C.'
    },
    {
      id: 2,
      question: 'What comes next in the sequence: 2, 4, 8, 16, ___?',
      options: ['20', '24', '32', '28'],
      correctAnswer: '32',
      explanation: 'Each number is multiplied by 2: 2×2=4, 4×2=8, 8×2=16, 16×2=32'
    },
    {
      id: 3,
      question: 'If all roses are flowers and some flowers are red, which statement must be true?',
      options: ['All roses are red', 'Some roses are red', 'All red things are flowers', 'Cannot be determined'],
      correctAnswer: 'Cannot be determined',
      explanation: 'We know roses are flowers, but we don\'t know if roses are among the flowers that are red.'
    },
    {
      id: 4,
      question: 'A shopkeeper sells 20% more items this month than last month. If he sold 120 items last month, how many did he sell this month?',
      options: ['140', '144', '150', '160'],
      correctAnswer: '144',
      explanation: '120 + (20% of 120) = 120 + 24 = 144 items'
    },
    {
      id: 5,
      question: 'Which word does NOT belong with the others?',
      options: ['Square', 'Triangle', 'Circle', 'Rectangle'],
      correctAnswer: 'Circle',
      explanation: 'Circle is the only curved shape; the others are all polygons with straight edges.'
    },
    {
      id: 6,
      question: 'If 3x + 7 = 22, what is the value of x?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '5',
      explanation: '3x + 7 = 22, so 3x = 15, therefore x = 5'
    },
    {
      id: 7,
      question: 'Complete the analogy: Book is to Library as Car is to ___?',
      options: ['Garage', 'Highway', 'Driver', 'Engine'],
      correctAnswer: 'Garage',
      explanation: 'A book is stored in a library, just as a car is stored in a garage.'
    },
    {
      id: 8,
      question: 'What is 25% of 80?',
      options: ['15', '20', '25', '30'],
      correctAnswer: '20',
      explanation: '25% of 80 = 0.25 × 80 = 20'
    }
  ],
  medium: [
    {
      id: 1,
      question: 'In a class of 30 students, 18 play football and 12 play basketball. If 8 students play both sports, how many play neither?',
      options: ['6', '8', '10', '12'],
      correctAnswer: '8',
      explanation: 'Using set theory: Total = Football + Basketball - Both + Neither. 30 = 18 + 12 - 8 + Neither, so Neither = 8'
    },
    {
      id: 2,
      question: 'If the ratio of boys to girls in a class is 3:2 and there are 25 students total, how many boys are there?',
      options: ['10', '12', '15', '18'],
      correctAnswer: '15',
      explanation: 'Let 3x + 2x = 25, so 5x = 25, x = 5. Boys = 3x = 3 × 5 = 15'
    },
    {
      id: 3,
      question: 'A train travels 120 km in 2 hours. If it continues at the same speed, how far will it travel in 5 hours?',
      options: ['240 km', '300 km', '360 km', '480 km'],
      correctAnswer: '300 km',
      explanation: 'Speed = 120/2 = 60 km/h. Distance in 5 hours = 60 × 5 = 300 km'
    },
    {
      id: 4,
      question: 'What is the next number in the series: 1, 4, 9, 16, 25, ___?',
      options: ['30', '36', '42', '49'],
      correctAnswer: '36',
      explanation: 'This is the sequence of perfect squares: 1², 2², 3², 4², 5², so the next is 6² = 36'
    },
    {
      id: 5,
      question: 'If 5 workers can build a wall in 8 days, how many days will it take 8 workers to build the same wall?',
      options: ['4 days', '5 days', '6 days', '8 days'],
      correctAnswer: '5 days',
      explanation: 'Using inverse proportion: 5 × 8 = 8 × x, so 40 = 8x, therefore x = 5 days'
    },
    {
      id: 6,
      question: 'Which of the following is the odd one out?',
      options: ['Square', 'Rectangle', 'Rhombus', 'Trapezoid'],
      correctAnswer: 'Trapezoid',
      explanation: 'Square, Rectangle, and Rhombus are all parallelograms (opposite sides parallel), but Trapezoid has only one pair of parallel sides.'
    },
    {
      id: 7,
      question: 'If a clock shows 3:15, what is the angle between the hour and minute hands?',
      options: ['0°', '7.5°', '15°', '30°'],
      correctAnswer: '7.5°',
      explanation: 'At 3:15, minute hand is at 3 (90°), hour hand is at 3 + (15/60) × 30° = 3 + 7.5° = 97.5°. Difference = 97.5° - 90° = 7.5°'
    },
    {
      id: 8,
      question: 'A number is increased by 25% and then decreased by 20%. What is the net change?',
      options: ['No change', '5% increase', '5% decrease', 'Cannot be determined'],
      correctAnswer: 'No change',
      explanation: 'Let original = 100. After 25% increase: 125. After 20% decrease: 125 × 0.8 = 100. Net change = 0%'
    }
  ],
  hard: [
    {
      id: 1,
      question: 'In a group of 100 people, 60 like coffee, 40 like tea, and 20 like both. How many people like neither coffee nor tea?',
      options: ['20', '25', '30', '35'],
      correctAnswer: '20',
      explanation: 'Using set theory: Neither = Total - (Coffee + Tea - Both) = 100 - (60 + 40 - 20) = 100 - 80 = 20'
    },
    {
      id: 2,
      question: 'If a car\'s speed increases from 60 km/h to 90 km/h, what is the percentage increase?',
      options: ['30%', '40%', '50%', '60%'],
      correctAnswer: '50%',
      explanation: 'Percentage increase = ((90 - 60) / 60) × 100 = (30/60) × 100 = 50%'
    },
    {
      id: 3,
      question: 'A cube has a surface area of 150 cm². What is its volume?',
      options: ['125 cm³', '150 cm³', '175 cm³', '200 cm³'],
      correctAnswer: '125 cm³',
      explanation: 'Surface area = 6a² = 150, so a² = 25, a = 5 cm. Volume = a³ = 5³ = 125 cm³'
    },
    {
      id: 4,
      question: 'If 2^x = 8 and 3^y = 27, what is the value of x + y?',
      options: ['5', '6', '7', '8'],
      correctAnswer: '6',
      explanation: '2^x = 8 = 2³, so x = 3. 3^y = 27 = 3³, so y = 3. Therefore x + y = 3 + 3 = 6'
    },
    {
      id: 5,
      question: 'A bag contains 5 red, 4 blue, and 3 green balls. If two balls are drawn without replacement, what is the probability of getting one red and one blue ball?',
      options: ['1/3', '5/18', '1/4', '2/9'],
      correctAnswer: '5/18',
      explanation: 'Probability = (5/12 × 4/11) + (4/12 × 5/11) = (20/132) + (20/132) = 40/132 = 10/33 ≈ 5/18'
    },
    {
      id: 6,
      question: 'If the compound interest on a sum for 2 years at 10% per annum is ₹210, what is the principal amount?',
      options: ['₹900', '₹950', '₹1000', '₹1050'],
      correctAnswer: '₹1000',
      explanation: 'Let P be principal. CI = P[(1 + r/100)^n - 1]. 210 = P[(1.1)² - 1] = P[0.21]. So P = 210/0.21 = ₹1000'
    },
    {
      id: 7,
      question: 'In a triangle ABC, if angle A = 60° and sides b = 8, c = 6, what is the length of side a?',
      options: ['7', '8', '9', '10'],
      correctAnswer: '7',
      explanation: 'Using cosine rule: a² = b² + c² - 2bc cos(A) = 64 + 36 - 2(8)(6)cos(60°) = 100 - 96(0.5) = 100 - 48 = 52. So a = √52 ≈ 7'
    },
    {
      id: 8,
      question: 'If log₂(x) = 3 and log₃(y) = 2, what is the value of log₆(xy)?',
      options: ['2', '3', '4', '5'],
      correctAnswer: '5',
      explanation: 'log₂(x) = 3, so x = 2³ = 8. log₃(y) = 2, so y = 3² = 9. xy = 8 × 9 = 72. log₆(72) = log₆(6² × 2) = 2 + log₆(2) = 2 + 1/log₂(6) ≈ 2 + 0.387 ≈ 2.387'
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
