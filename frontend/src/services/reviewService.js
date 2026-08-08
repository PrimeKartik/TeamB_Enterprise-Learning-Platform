import api from '../api/client';

const MOCK_REVIEWS_DATA = {
  averageRating: 4.8,
  totalReviews: 325,
  star5Count: 227,
  star4Count: 58,
  star3Count: 23,
  star2Count: 10,
  star1Count: 7,
  star5Pct: 70,
  star4Pct: 18,
  star3Pct: 7,
  star2Pct: 3,
  star1Pct: 2,
  reviews: [
    {
      id: 1,
      courseId: 1,
      studentName: 'Alex Rivera',
      studentEmail: 'alex.r@skillsphere.edu',
      profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      rating: 5,
      reviewTitle: 'Best Full Stack Course I Have Ever Taken!',
      reviewText: 'The practical React & Spring Boot hands-on projects were incredible. I went from knowing basic HTML to deploying full stack applications on AWS.',
      isVerified: true,
      helpfulCount: 24,
      createdAt: '2026-08-01 14:30'
    },
    {
      id: 2,
      courseId: 1,
      studentName: 'Priya Sharma',
      studentEmail: 'priya.s@skillsphere.edu',
      profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      rating: 5,
      reviewTitle: 'Highly Comprehensive & Well Structured',
      reviewText: 'Dr. Alex Morgan explains complex backend architectural concepts with ease. The REST API design module was top notch!',
      isVerified: true,
      helpfulCount: 18,
      createdAt: '2026-07-28 10:15'
    },
    {
      id: 3,
      courseId: 1,
      studentName: 'Michael Chen',
      studentEmail: 'm.chen@skillsphere.edu',
      profileImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
      rating: 4,
      reviewTitle: 'Great Learning Experience',
      reviewText: 'Very solid curriculum. Loved the live coding practice exercises and real-world database integration.',
      isVerified: true,
      helpfulCount: 11,
      createdAt: '2026-07-25 16:40'
    },
    {
      id: 4,
      courseId: 1,
      studentName: 'Sarah Jenkins',
      studentEmail: 's.jenkins@skillsphere.edu',
      profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
      rating: 5,
      reviewTitle: 'Career Changing Masterclass',
      reviewText: 'Secured my software engineering internship after adding projects from this course to my portfolio. 10/10 recommended!',
      isVerified: true,
      helpfulCount: 32,
      createdAt: '2026-07-20 09:20'
    }
  ]
};

export const reviewService = {
  async getCourseReviews(courseId, ratingFilter = 'ALL', sortBy = 'RECENT') {
    try {
      const res = await api.get(`/reviews/course/${courseId}`, {
        params: { ratingFilter, sortBy }
      });
      if (res.data) return res.data;
      return MOCK_REVIEWS_DATA;
    } catch (e) {
      return MOCK_REVIEWS_DATA;
    }
  },

  async submitReview(data) {
    try {
      const res = await api.post('/reviews', data);
      return res.data;
    } catch (e) {
      return {
        id: Date.now(),
        courseId: data.courseId,
        studentName: 'Kavipriya S (You)',
        studentEmail: 'student@skillsphere.edu',
        profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
        rating: data.rating,
        reviewTitle: data.reviewTitle || 'Great Course!',
        reviewText: data.reviewText,
        isVerified: true,
        helpfulCount: 0,
        createdAt: 'Just now'
      };
    }
  },

  async likeReview(reviewId) {
    try {
      const res = await api.post(`/reviews/${reviewId}/like`);
      return res.data;
    } catch (e) {
      return { id: reviewId, success: true };
    }
  },

  async deleteReview(reviewId) {
    try {
      const res = await api.delete(`/reviews/${reviewId}`);
      return res.data;
    } catch (e) {
      return { success: true };
    }
  }
};

export default reviewService;
