import api from '../api/client';

const MOCK_ANALYTICS_DATA = {
  totalStudentsEnrolled: 5,
  studentsLearningToday: 4,
  completedCourses: 1,
  certificatesGenerated: 3,
  avgCompletionRate: 65.5,
  avgQuizScore: 86.7,
  avgCodingScore: 83.0,
  inactiveStudentsCount: 2,
  topPerformingStudents: [
    { id: 102, studentName: 'Alex Rivera', email: 'alex.r@skillsphere.edu', courseName: 'Java Programming Masterclass', completionPercentage: 100.0, avgQuizScore: 96.0, codingScore: 94.0, totalXp: 2800 },
    { id: 104, studentName: 'Michael Chen', email: 'm.chen@skillsphere.edu', courseName: 'Cloud Computing with AWS', completionPercentage: 80.0, avgQuizScore: 90.0, codingScore: 86.0, totalXp: 1600 },
    { id: 101, studentName: 'Kavipriya S', email: 'kavipriya@skillsphere.edu', courseName: 'Full Stack Web Development', completionPercentage: 75.0, avgQuizScore: 92.5, codingScore: 88.0, totalXp: 1450 }
  ],
  recentlyEnrolledStudents: [
    { id: 101, studentName: 'Kavipriya S', courseName: 'Full Stack Web Development', enrollmentDate: '2026-07-20 10:30' },
    { id: 103, studentName: 'Priya Sharma', courseName: 'Python for Data Science', enrollmentDate: '2026-07-15 14:20' }
  ],
  inactiveStudents: [
    { id: 104, studentName: 'Michael Chen', courseName: 'Cloud Computing with AWS', lastActive: '8 days ago' },
    { id: 105, studentName: 'Sarah Jenkins', courseName: 'UI/UX Design with Figma', lastActive: '12 days ago' }
  ],
  courseEnrollmentChart: [
    { course: 'Full Stack Web', students: 1 },
    { course: 'Java Masterclass', students: 1 },
    { course: 'Python Data Sci', students: 1 },
    { course: 'Cloud AWS', students: 1 },
    { course: 'UI/UX Figma', students: 1 }
  ],
  studentProgressDistribution: [
    { name: 'Not Started', value: 0, color: '#94A3B8' },
    { name: 'In Progress', value: 4, color: '#7C3AED' },
    { name: 'Completed', value: 1, color: '#10B981' }
  ],
  dailyActiveStudentsChart: [
    { day: 'Mon', active: 42 },
    { day: 'Tue', active: 58 },
    { day: 'Wed', active: 65 },
    { day: 'Thu', active: 72 },
    { day: 'Fri', active: 68 },
    { day: 'Sat', active: 85 },
    { day: 'Sun', active: 91 }
  ],
  courseCompletionTrendChart: [
    { month: 'Jan', completions: 12 },
    { month: 'Feb', completions: 18 },
    { month: 'Mar', completions: 25 },
    { month: 'Apr', completions: 32 },
    { month: 'May', completions: 28 },
    { month: 'Jun', completions: 45 },
    { month: 'Jul', completions: 54 }
  ],
  quizPerformanceChart: [
    { quiz: 'Quiz 1 (Basics)', avgScore: 88 },
    { quiz: 'Quiz 2 (OOP)', avgScore: 82 },
    { quiz: 'Quiz 3 (Async)', avgScore: 79 },
    { quiz: 'Quiz 4 (DB/SQL)', avgScore: 91 },
    { quiz: 'Quiz 5 (Spring)', avgScore: 86 }
  ],
  codingPracticeRadar: [
    { subject: 'Syntax & Logic', score: 90 },
    { subject: 'Data Structures', score: 85 },
    { subject: 'Algorithms', score: 80 },
    { subject: 'Database Queries', score: 92 },
    { subject: 'Debugging', score: 88 }
  ],
  certificatesIssuedChart: [
    { name: 'Generated Certificates', value: 3, color: '#EC4899' },
    { name: 'Pending Completion', value: 2, color: '#4B5563' }
  ],
  monthlyEnrollmentsChart: [
    { month: 'Jan', enrollments: 110 },
    { month: 'Feb', enrollments: 125 },
    { month: 'Mar', enrollments: 140 },
    { month: 'Apr', enrollments: 160 },
    { month: 'May', enrollments: 150 },
    { month: 'Jun', enrollments: 180 },
    { month: 'Jul', enrollments: 195 }
  ]
};

const MOCK_ENROLLMENTS = [
  {
    id: 101,
    studentId: 101,
    studentName: 'Kavipriya S',
    email: 'kavipriya@skillsphere.edu',
    mobileNumber: '+91 98765 43210',
    collegeName: 'PSG College of Technology',
    courseName: 'Full Stack Web Development',
    instructorName: 'Dr. Alex Morgan',
    enrollmentDate: '2026-07-20 10:30',
    currentModule: 'Module 4: Spring Boot REST APIs',
    lessonsCompleted: 18,
    totalLessons: 24,
    modulesCompleted: 4,
    totalModules: 6,
    completionPercentage: 75.0,
    avgQuizScore: 92.5,
    codingScore: 88.0,
    certificateStatus: 'Generated',
    lastActive: 'Today at 17:45',
    learningStatus: 'In Progress',
    quizzesAttempted: 8,
    problemsSolved: 28,
    easySolved: 15,
    mediumSolved: 10,
    hardSolved: 3,
    totalXp: 1450,
    timeSpentHours: 38.5,
    currentLesson: 'Lesson 4.2: JPA Entity Mapping'
  },
  {
    id: 102,
    studentId: 102,
    studentName: 'Alex Rivera',
    email: 'alex.r@skillsphere.edu',
    mobileNumber: '+1 555 019 2831',
    collegeName: 'Stanford University',
    courseName: 'Java Programming Masterclass',
    instructorName: 'Dr. Alex Morgan',
    enrollmentDate: '2026-07-05 14:15',
    currentModule: 'Module 6: Final Capstone',
    lessonsCompleted: 24,
    totalLessons: 24,
    modulesCompleted: 6,
    totalModules: 6,
    completionPercentage: 100.0,
    avgQuizScore: 96.0,
    codingScore: 94.0,
    certificateStatus: 'Generated',
    lastActive: 'Yesterday',
    learningStatus: 'Completed',
    quizzesAttempted: 10,
    problemsSolved: 45,
    easySolved: 20,
    mediumSolved: 18,
    hardSolved: 7,
    totalXp: 2800,
    timeSpentHours: 62.0,
    currentLesson: 'Course Completed'
  },
  {
    id: 103,
    studentId: 103,
    studentName: 'Priya Sharma',
    email: 'priya.s@skillsphere.edu',
    mobileNumber: '+91 91234 56789',
    collegeName: 'IIT Madras',
    courseName: 'Python for Data Science',
    instructorName: 'Dr. Victoria Vance',
    enrollmentDate: '2026-07-15 09:00',
    currentModule: 'Module 3: Pandas DataFrames',
    lessonsCompleted: 12,
    totalLessons: 20,
    modulesCompleted: 3,
    totalModules: 5,
    completionPercentage: 60.0,
    avgQuizScore: 85.0,
    codingScore: 82.0,
    certificateStatus: 'Not Generated',
    lastActive: '2 days ago',
    learningStatus: 'In Progress',
    quizzesAttempted: 5,
    problemsSolved: 18,
    easySolved: 10,
    mediumSolved: 6,
    hardSolved: 2,
    totalXp: 950,
    timeSpentHours: 24.0,
    currentLesson: 'Lesson 3.1: Data Cleaning with Pandas'
  },
  {
    id: 104,
    studentId: 104,
    studentName: 'Michael Chen',
    email: 'm.chen@skillsphere.edu',
    mobileNumber: '+1 555 382 1092',
    collegeName: 'MIT',
    courseName: 'Cloud Computing with AWS',
    instructorName: 'Dr. Victoria Vance',
    enrollmentDate: '2026-06-20 11:45',
    currentModule: 'Module 5: Serverless Lambda',
    lessonsCompleted: 16,
    totalLessons: 20,
    modulesCompleted: 4,
    totalModules: 5,
    completionPercentage: 80.0,
    avgQuizScore: 90.0,
    codingScore: 86.0,
    certificateStatus: 'Generated',
    lastActive: '8 days ago',
    learningStatus: 'In Progress',
    quizzesAttempted: 6,
    problemsSolved: 22,
    easySolved: 12,
    mediumSolved: 8,
    hardSolved: 2,
    totalXp: 1600,
    timeSpentHours: 41.0,
    currentLesson: 'Lesson 5.2: API Gateway Integration'
  },
  {
    id: 105,
    studentId: 105,
    studentName: 'Sarah Jenkins',
    email: 's.jenkins@skillsphere.edu',
    mobileNumber: '+44 7700 900077',
    collegeName: 'Oxford University',
    courseName: 'UI/UX Design with Figma',
    instructorName: 'Sarah Jenkins',
    enrollmentDate: '2026-06-05 16:20',
    currentModule: 'Module 1: Design Systems',
    lessonsCompleted: 2,
    totalLessons: 16,
    modulesCompleted: 0,
    totalModules: 4,
    completionPercentage: 12.5,
    avgQuizScore: 70.0,
    codingScore: 65.0,
    certificateStatus: 'Not Generated',
    lastActive: '12 days ago',
    learningStatus: 'In Progress',
    quizzesAttempted: 2,
    problemsSolved: 5,
    easySolved: 4,
    mediumSolved: 1,
    hardSolved: 0,
    totalXp: 300,
    timeSpentHours: 6.5,
    currentLesson: 'Lesson 1.2: Typography Guidelines'
  }
];

export const studentAnalyticsService = {
  async getAnalytics() {
    try {
      const res = await api.get('/admin/analytics');
      if (res.data) return res.data;
      return MOCK_ANALYTICS_DATA;
    } catch (e) {
      return MOCK_ANALYTICS_DATA;
    }
  },

  async getEnrollments() {
    try {
      const res = await api.get('/admin/enrollments');
      if (res.data && res.data.length > 0) return res.data;
      return MOCK_ENROLLMENTS;
    } catch (e) {
      return MOCK_ENROLLMENTS;
    }
  },

  async getStudentById(id) {
    try {
      const res = await api.get(`/admin/student/${id}`);
      if (res.data) return res.data;
      return MOCK_ENROLLMENTS.find(s => s.id === Number(id)) || MOCK_ENROLLMENTS[0];
    } catch (e) {
      return MOCK_ENROLLMENTS.find(s => s.id === Number(id)) || MOCK_ENROLLMENTS[0];
    }
  },

  async updateEnrollment(id, data) {
    try {
      const res = await api.put(`/admin/enrollment/${id}`, data);
      return res.data;
    } catch (e) {
      return { ...data, id };
    }
  },

  async deleteEnrollment(id) {
    try {
      const res = await api.delete(`/admin/enrollment/${id}`);
      return res.data;
    } catch (e) {
      return { success: true };
    }
  }
};

export default studentAnalyticsService;
