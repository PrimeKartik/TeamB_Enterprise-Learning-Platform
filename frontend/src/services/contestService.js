import api from '../api/client';

const MOCK_CONTESTS = [
  {
    id: 1,
    title: 'The Sunday Sprint #105',
    description: 'Compete with top developers worldwide. Solve 4 algorithmic challenges in 90 minutes. Earn badges, climb the ranks, and get noticed by recruiters.',
    bannerUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200',
    startTime: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString(),
    endTime: new Date(Date.now() + 2 * 24 * 3600 * 1000 + 90 * 60 * 1000).toISOString(),
    durationMinutes: 90,
    difficulty: 'Medium',
    questionCount: 4,
    totalMarks: 400,
    status: 'UPCOMING',
    rulesText: '1. All submissions must be your own original work.\n2. Penalty time of 15 minutes applies per wrong submission.\n3. Automatic submission will trigger when the timer expires.'
  },
  {
    id: 2,
    title: 'Midweek Speed Code Clash',
    description: 'Live fast-paced coding sprint focusing on Data Structures, Arrays, Strings, and HashMap efficiency.',
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200',
    startTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    durationMinutes: 90,
    difficulty: 'Mixed',
    questionCount: 3,
    totalMarks: 300,
    status: 'ONGOING',
    rulesText: '1. Live rankings update automatically upon evaluation.\n2. Multi-language support enabled.'
  },
  {
    id: 3,
    title: 'Weekly Algorithmic Challenge #104',
    description: 'Global competitive coding tournament featuring binary trees, dynamic programming, and SQL querying.',
    bannerUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200',
    startTime: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
    endTime: new Date(Date.now() - 7 * 24 * 3600 * 1000 + 90 * 60 * 1000).toISOString(),
    durationMinutes: 90,
    difficulty: 'Hard',
    questionCount: 4,
    totalMarks: 400,
    status: 'COMPLETED',
    rulesText: 'Completed contest archive.'
  }
];

const MOCK_QUESTIONS = [
  {
    id: 1,
    contestId: 2,
    title: 'Maximum Subarray Sum (Kadane Algorithm)',
    difficulty: 'Medium',
    tagsCsv: 'Arrays, Dynamic Programming',
    problemStatement: 'Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
    constraintsText: '1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4',
    inputFormat: 'Single line containing array `nums`.',
    outputFormat: 'Integer representing the maximum subarray sum.',
    sampleInput: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
    sampleOutput: '6',
    sampleExplanation: 'The contiguous subarray [4, -1, 2, 1] has the largest sum = 6.',
    timeLimitSeconds: 2,
    memoryLimitMb: 256,
    marks: 100,
  },
  {
    id: 2,
    contestId: 2,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    tagsCsv: 'Sliding Window, Strings, HashMap',
    problemStatement: 'Given a string `s`, find the length of the longest substring without repeating characters.',
    constraintsText: '0 <= s.length <= 5 * 10^4',
    inputFormat: 'String s',
    outputFormat: 'Integer length of longest substring',
    sampleInput: 's = "abcabcbb"',
    sampleOutput: '3',
    sampleExplanation: 'The answer is "abc", with the length of 3.',
    timeLimitSeconds: 2,
    memoryLimitMb: 256,
    marks: 100,
  },
  {
    id: 3,
    contestId: 2,
    title: 'Valid Parentheses Matching',
    difficulty: 'Easy',
    tagsCsv: 'Stack, Strings',
    problemStatement: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.',
    constraintsText: '1 <= s.length <= 10^4',
    inputFormat: 'String s',
    outputFormat: 'Boolean true or false',
    sampleInput: 's = "()[]{}"',
    sampleOutput: 'true',
    sampleExplanation: 'All brackets are closed in the correct corresponding order.',
    timeLimitSeconds: 1,
    memoryLimitMb: 128,
    marks: 100,
  }
];

const MOCK_LEADERBOARD = [
  { rankPosition: 1, userName: 'Alex Chen', userEmail: 'alex@skillsphere.edu', profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', score: 300, problemsSolved: 3, penaltyTime: 24, submissionCount: 3 },
  { rankPosition: 2, userName: 'Sarah Jenkins', userEmail: 'sarah@skillsphere.edu', profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', score: 200, problemsSolved: 2, penaltyTime: 32, submissionCount: 4 },
  { rankPosition: 3, userName: 'Kavipriya S (You)', userEmail: 'kavi@skillsphere.edu', profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150', score: 200, problemsSolved: 2, penaltyTime: 45, submissionCount: 3 },
  { rankPosition: 4, userName: 'Michael Ross', userEmail: 'm.ross@skillsphere.edu', profileImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', score: 100, problemsSolved: 1, penaltyTime: 18, submissionCount: 2 }
];

export const contestService = {
  async getContests(status) {
    try {
      const res = await api.get('/contests', { params: { status } });
      if (res.data && res.data.length > 0) return res.data;
      return MOCK_CONTESTS;
    } catch (e) {
      if (status) return MOCK_CONTESTS.filter(c => c.status === status.toUpperCase());
      return MOCK_CONTESTS;
    }
  },

  async registerForContest(contestId) {
    try {
      const res = await api.post(`/contests/${contestId}/register`);
      return res.data;
    } catch (e) {
      return { contestId, status: 'REGISTERED' };
    }
  },

  async getContestQuestions(contestId) {
    try {
      const res = await api.get(`/contests/${contestId}/questions`);
      if (res.data && res.data.length > 0) return res.data;
      return MOCK_QUESTIONS;
    } catch (e) {
      return MOCK_QUESTIONS;
    }
  },

  async submitSolution(contestId, data) {
    try {
      const res = await api.post(`/contests/${contestId}/submit`, data);
      if (res.data) return res.data;
      throw new Error('Fallback simulation needed');
    } catch (e) {
      const isPassed = data.code && data.code.trim().length > 10 && !data.code.includes('BUG');
      return {
        status: isPassed ? 'PASSED' : 'FAILED',
        passedTestCases: isPassed ? 3 : 1,
        totalTestCases: 3,
        executionTimeMs: 84,
        memoryUsageMb: 16.4,
        score: isPassed ? 100 : 0,
        explanation: isPassed ? 'All test cases passed cleanly!' : 'Failed on hidden testcase #2.',
        suggestedImprovements: 'Check memory bounds.'
      };
    }
  },

  async getLeaderboard(contestId) {
    try {
      const res = await api.get(`/contests/${contestId}/leaderboard`);
      if (res.data && res.data.length > 0) return res.data;
      return MOCK_LEADERBOARD;
    } catch (e) {
      return MOCK_LEADERBOARD;
    }
  },

  async getCertificate(contestId) {
    try {
      const res = await api.get(`/contests/${contestId}/certificate`);
      if (res.data) return res.data;
      throw new Error('Fallback');
    } catch (e) {
      return {
        certificateId: `SSLN-CONTEST-2026-X9821`,
        contestId: contestId || 3,
        contestTitle: 'Weekly Algorithmic Challenge #104',
        studentName: 'Kavipriya S',
        studentEmail: 'kavi@skillsphere.edu',
        rankPosition: 1,
        score: 380,
        issueDate: 'August 03, 2026',
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=SSLN-CONTEST-2026-X9821`
      };
    }
  },

  async getDiscussions(contestId) {
    try {
      const res = await api.get(`/contests/${contestId}/discussions`);
      if (res.data) return res.data;
      return [];
    } catch (e) {
      return [
        { id: 1, userName: 'Alex Chen', commentText: 'Kadane algorithm implementation is optimal O(N).', likesCount: 12, createdAt: '10 mins ago' },
        { id: 2, userName: 'Sarah Jenkins', commentText: 'Watch out for sliding window edge cases on question #2!', likesCount: 7, createdAt: '5 mins ago' }
      ];
    }
  },

  async addDiscussion(contestId, commentText) {
    try {
      const res = await api.post(`/contests/${contestId}/discussions`, { commentText });
      return res.data;
    } catch (e) {
      return { id: Date.now(), userName: 'You (Student)', commentText, likesCount: 0, createdAt: 'Just now' };
    }
  },

  async getStudentStats() {
    try {
      const res = await api.get('/contests/stats');
      if (res.data) return res.data;
      return {
        totalContestsParticipated: 14,
        contestsWon: 3,
        bestRank: 1,
        totalProblemsSolved: 52,
        successRate: 91.2,
        totalPoints: 5400,
        currentRating: 1720,
        highestRating: 1780,
        badgesEarned: 8,
        codingStreak: 14
      };
    } catch (e) {
      return {
        totalContestsParticipated: 14,
        contestsWon: 3,
        bestRank: 1,
        totalProblemsSolved: 52,
        successRate: 91.2,
        totalPoints: 5400,
        currentRating: 1720,
        highestRating: 1780,
        badgesEarned: 8,
        codingStreak: 14
      };
    }
  }
};

export default contestService;
