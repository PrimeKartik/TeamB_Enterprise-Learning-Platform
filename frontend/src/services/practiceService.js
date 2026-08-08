import api from '../api/client';

const MOCK_PRACTICE_QUESTIONS = [
  {
    id: 101,
    courseId: 1,
    moduleName: 'Module 1: Foundations & Architecture',
    topicName: 'Variables & Data Types',
    questionType: 'MCQ',
    questionText: 'Which primitive data type in Java occupies 64 bits of memory and represents a signed integer value?',
    difficulty: 'Easy',
    marks: 10,
    correctAnswer: 'long',
    explanation: 'In Java, long is a 64-bit signed integer with a range from -2^63 to 2^63 - 1.',
    hints: 'Think of 64-bit integer primitives vs float/double.',
    options: [
      { id: 1, optionLabel: 'A', optionText: 'int' },
      { id: 2, optionLabel: 'B', optionText: 'long', isCorrect: true },
      { id: 3, optionLabel: 'C', optionText: 'double' },
      { id: 4, optionLabel: 'D', optionText: 'short' }
    ]
  },
  {
    id: 102,
    courseId: 1,
    moduleName: 'Module 1: Foundations & Architecture',
    topicName: 'OOP Principles',
    questionType: 'TRUE_FALSE',
    questionText: 'In object-oriented programming, encapsulation allows direct external modification of private class fields without getter or setter methods.',
    difficulty: 'Easy',
    marks: 10,
    correctAnswer: 'False',
    explanation: 'Encapsulation restricts direct access to an object state and requires public getters/setters.',
    hints: 'Encapsulation hides implementation details.',
    options: [
      { id: 5, optionLabel: 'A', optionText: 'True' },
      { id: 6, optionLabel: 'B', optionText: 'False', isCorrect: true }
    ]
  },
  {
    id: 103,
    courseId: 1,
    moduleName: 'Module 1: Foundations & Architecture',
    topicName: 'Async State Management',
    questionType: 'SHORT_ANSWER',
    questionText: 'Explain the core purpose of React useEffect dependency array in avoiding memory leaks.',
    difficulty: 'Medium',
    marks: 15,
    correctAnswer: 'Re-runs side effects only when specified dependency values change.',
    explanation: 'The dependency array instructs React when to run or skip the effect callback, preventing infinite loop re-renders.',
    evaluationCriteria: 'Mentions side-effects, dependencies, and preventing unnecessary re-renders.'
  },
  {
    id: 104,
    courseId: 1,
    moduleName: 'Module 1: Foundations & Architecture',
    topicName: 'Algorithmic Problem Solving',
    questionType: 'CODING',
    questionText: 'Write an algorithm to reverse a linked list or array in O(n) linear time complexity.',
    difficulty: 'Medium',
    marks: 20,
    correctAnswer: 'Two-pointer approach swapping start and end elements.',
    explanation: 'Use start pointer at 0 and end pointer at length - 1, swapping until start >= end.',
    scenarioDetails: 'Input: [1, 2, 3, 4, 5] -> Output: [5, 4, 3, 2, 1]',
    hints: 'Use a two-pointer technique or iterative node re-linking.'
  },
  {
    id: 105,
    courseId: 1,
    moduleName: 'Module 1: Foundations & Architecture',
    topicName: 'System Architecture',
    questionType: 'SCENARIO',
    questionText: 'Scenario: High Traffic Spike -- Your web application database experiences high read latency during flash sales. How would you introduce Redis caching to optimize throughput?',
    difficulty: 'Hard',
    marks: 20,
    correctAnswer: 'Cache frequently read products in Redis with TTL expiration.',
    explanation: 'Redis acts as an in-memory key-value cache, serving read queries in sub-millisecond response times.',
    scenarioDetails: 'Target response time < 50ms under 50,000 requests/sec.'
  },
  {
    id: 106,
    courseId: 1,
    moduleName: 'Module 1: Foundations & Architecture',
    topicName: 'Hands-on Deliverable',
    questionType: 'MINI_ASSIGNMENT',
    questionText: 'Mini Assignment: Design a clean REST API endpoint for user profile updates with field validation.',
    difficulty: 'Hard',
    marks: 25,
    correctAnswer: 'PUT /api/users/profile with JSON request body.',
    assignmentDetails: 'Objective: Demonstrate DTO validation and HTTP status response codes.\nDeliverables: Code snippet or GitHub link.\nRubric: Input validation (30%), Error handling (30%), Clean response format (40%).'
  }
];

export const practiceService = {
  async getModuleQuestions(courseId = 1, moduleName = 'Module 1') {
    try {
      const res = await api.get('/practice/module', { params: { courseId, moduleName } });
      if (res.data && res.data.length > 0) return res.data;
      return MOCK_PRACTICE_QUESTIONS;
    } catch (e) {
      return MOCK_PRACTICE_QUESTIONS;
    }
  },

  async submitPractice(payload) {
    try {
      const res = await api.post('/practice/submit', payload);
      return res.data;
    } catch (e) {
      // Offline fallback calculation
      const answers = payload.answers || {};
      let score = 0;
      let totalMarks = 0;
      let correctCount = 0;

      MOCK_PRACTICE_QUESTIONS.forEach(q => {
        totalMarks += q.marks || 10;
        const uAns = answers[q.id];
        const isCorrect = uAns && (uAns === q.correctAnswer || uAns.length >= 3);
        if (isCorrect) {
          score += q.marks || 10;
          correctCount++;
        }
      });

      const pct = Math.round((score * 100.0) / totalMarks);
      const acc = Math.round((correctCount * 100.0) / MOCK_PRACTICE_QUESTIONS.length);

      return {
        score,
        totalMarks,
        percentage: pct,
        accuracyPct: acc,
        passed: pct >= 60,
        xpEarned: score + 50,
        badgeUnlocked: pct >= 80 ? 'Module Practice Specialist 🏆' : null,
        breakdown: MOCK_PRACTICE_QUESTIONS.map(q => ({
          questionId: q.id,
          questionType: q.questionType,
          topicName: q.topicName,
          userAnswer: answers[q.id] || 'Not answered',
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          isCorrect: Boolean(answers[q.id]),
          marksAwarded: answers[q.id] ? q.marks : 0
        }))
      };
    }
  }
};

export default practiceService;
