import api from '../api/client';

const MOCK_REVENUE_DATA = {
  totalRevenue: 0.0,
  monthlyRevenue: 0.0,
  todaysRevenue: 0.0,
  thisWeekRevenue: 0.0,
  thisYearRevenue: 0.0,
  totalPaidEnrollments: 0,
  freeCourseEnrollments: 0,
  avgRevenuePerStudent: 0.0,
  revenueGrowthPct: 0.0,
  pendingPayments: 0.0,
  refundedAmount: 0.0,

  monthlyRevenueChart: [
    { month: 'Aug 25', revenue: 0 },
    { month: 'Sep 25', revenue: 0 },
    { month: 'Oct 25', revenue: 0 },
    { month: 'Nov 25', revenue: 0 },
    { month: 'Dec 25', revenue: 0 },
    { month: 'Jan 26', revenue: 0 },
    { month: 'Feb 26', revenue: 0 },
    { month: 'Mar 26', revenue: 0 },
    { month: 'Apr 26', revenue: 0 },
    { month: 'May 26', revenue: 0 },
    { month: 'Jun 26', revenue: 0 },
    { month: 'Aug 26', revenue: 44998 },
  ],

  revenueByCourseChart: [
    { course: 'Full Stack Development', revenue: 29999, enrollments: 1, rating: 4.9 },
    { course: 'React.js Essentials', revenue: 14999, enrollments: 1, rating: 4.8 },
  ],

  revenueDistributionChart: [
    { name: 'Full Stack Development', value: 29999, color: '#7C3AED' },
    { name: 'React.js Essentials', value: 14999, color: '#EC4899' },
  ],

  weeklyRevenueChart: [
    { day: 'Mon', revenue: 44998 },
    { day: 'Tue', revenue: 0 },
    { day: 'Wed', revenue: 0 },
    { day: 'Thu', revenue: 0 },
    { day: 'Fri', revenue: 0 },
    { day: 'Sat', revenue: 0 },
    { day: 'Sun', revenue: 0 },
  ],

  enrollmentVsRevenueChart: [
    { month: 'Aug', enrollments: 2, revenue: 44998 },
  ],

  topRevenueCourses: [
    { rank: 1, courseName: 'Full Stack Development', instructor: 'Dr. Alex Morgan', studentsEnrolled: 1, revenue: 29999, growth: '+100%', status: 'Active' },
    { rank: 2, courseName: 'React.js Essentials', instructor: 'Dr. Alex Morgan', studentsEnrolled: 1, revenue: 14999, growth: '+100%', status: 'Active' },
  ],

  recentTransactions: [
    { transactionId: 'TXN-89012', studentName: 'Kavipriya S', courseName: 'Full Stack Development', amount: 29999.00, paymentMethod: 'UPI / GPay', paymentStatus: 'COMPLETED', date: '2026-08-03 15:10' },
    { transactionId: 'TXN-89011', studentName: 'Kavipriya S', courseName: 'React.js Essentials', amount: 14999.00, paymentMethod: 'Credit Card', paymentStatus: 'COMPLETED', date: '2026-08-03 12:45' },
  ],

  insights: {
    highestRevenueCourse: 'Full Stack Development (₹29,999)',
    lowestRevenueCourse: 'React.js Essentials (₹14,999)',
    highestEnrollmentMonth: 'August 2026 (2 Paid Enrollments)',
    avgMonthlyIncome: '₹44,998.00 / month',
    revenueGrowthPct: '+100% YoY Growth',
    popularPaymentMethod: 'UPI / GPay & Credit Card'
  }
};

export const revenueService = {
  async getAnalytics(timeframe = '30DAYS') {
    try {
      const res = await api.get('/admin/revenue/analytics', { params: { timeframe } });
      if (res.data) return res.data;
      console.warn("No data from API, using MOCK_REVENUE_DATA");
      return MOCK_REVENUE_DATA;
    } catch (e) {
      console.error("Error fetching revenue analytics:", e);
      return MOCK_REVENUE_DATA;
    }
  },

  async getTransactions() {
    try {
      const res = await api.get('/admin/revenue/transactions');
      if (res.data && res.data.length > 0) return res.data;
      return MOCK_REVENUE_DATA.recentTransactions;
    } catch (e) {
      return MOCK_REVENUE_DATA.recentTransactions;
    }
  }
};

export default revenueService;
