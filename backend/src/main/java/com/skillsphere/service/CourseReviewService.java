package com.skillsphere.service;

import com.skillsphere.dto.CourseReviewRequest;
import com.skillsphere.dto.CourseReviewSummaryDTO;
import com.skillsphere.model.CourseReview;
import com.skillsphere.model.User;
import com.skillsphere.repository.CourseReviewRepository;
import com.skillsphere.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CourseReviewService {

    private final CourseReviewRepository reviewRepository;
    private final UserRepository userRepository;

    public CourseReviewService(CourseReviewRepository reviewRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CourseReview submitOrUpdateReview(String email, CourseReviewRequest req) {
        User user = userRepository.findByEmail(email).orElse(null);
        String name = user != null ? user.getName() : "Kavipriya S";
        String avatar = user != null && user.getAvatarUrl() != null ? user.getAvatarUrl() : "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150";

        Optional<CourseReview> existing = reviewRepository.findByCourseIdAndStudentEmail(req.getCourseId(), email);
        CourseReview review;
        if (existing.isPresent()) {
            review = existing.get();
            review.setRating(req.getRating());
            review.setReviewTitle(req.getReviewTitle());
            review.setReviewText(req.getReviewText());
            review.setUpdatedAt(LocalDateTime.now());
        } else {
            review = new CourseReview();
            review.setCourseId(req.getCourseId());
            review.setUserId(user != null ? user.getId() : null);
            review.setStudentName(name);
            review.setStudentEmail(email);
            review.setProfileImage(avatar);
            review.setRating(req.getRating());
            review.setReviewTitle(req.getReviewTitle());
            review.setReviewText(req.getReviewText());
            review.setIsVerified(true);
            review.setHelpfulCount(0);
        }
        return reviewRepository.save(review);
    }

    public CourseReviewSummaryDTO getCourseReviewsSummary(Long courseId, String ratingFilter, String sortBy) {
        List<CourseReview> allReviews = reviewRepository.findByCourseIdOrderByCreatedAtDesc(courseId);
        
        // Seed default fallback data if DB is empty for this course
        if (allReviews.isEmpty()) {
            seedSampleReviews(courseId);
            allReviews = reviewRepository.findByCourseIdOrderByCreatedAtDesc(courseId);
        }

        CourseReviewSummaryDTO summary = new CourseReviewSummaryDTO();
        long total = allReviews.size();
        summary.setTotalReviews(total);

        long c5 = allReviews.stream().filter(r -> r.getRating() == 5).count();
        long c4 = allReviews.stream().filter(r -> r.getRating() == 4).count();
        long c3 = allReviews.stream().filter(r -> r.getRating() == 3).count();
        long c2 = allReviews.stream().filter(r -> r.getRating() == 2).count();
        long c1 = allReviews.stream().filter(r -> r.getRating() == 1).count();

        summary.setStar5Count(c5);
        summary.setStar4Count(c4);
        summary.setStar3Count(c3);
        summary.setStar2Count(c2);
        summary.setStar1Count(c1);

        if (total > 0) {
            double sum = allReviews.stream().mapToInt(CourseReview::getRating).sum();
            double avg = sum / total;
            summary.setAverageRating(Math.round(avg * 10.0) / 10.0);

            summary.setStar5Pct((int) Math.round((c5 * 100.0) / total));
            summary.setStar4Pct((int) Math.round((c4 * 100.0) / total));
            summary.setStar3Pct((int) Math.round((c3 * 100.0) / total));
            summary.setStar2Pct((int) Math.round((c2 * 100.0) / total));
            summary.setStar1Pct((int) Math.round((c1 * 100.0) / total));
        }

        // Apply Rating Filter
        List<CourseReview> filtered = new ArrayList<>(allReviews);
        if (ratingFilter != null && !ratingFilter.equalsIgnoreCase("ALL")) {
            try {
                int r = Integer.parseInt(ratingFilter);
                filtered = filtered.stream().filter(rev -> rev.getRating() == r).collect(Collectors.toList());
            } catch (Exception ignored) {}
        }

        // Apply Sorting
        if ("HIGHEST".equalsIgnoreCase(sortBy)) {
            filtered.sort(Comparator.comparingInt(CourseReview::getRating).reversed().thenComparing(CourseReview::getCreatedAt, Comparator.reverseOrder()));
        } else if ("LOWEST".equalsIgnoreCase(sortBy)) {
            filtered.sort(Comparator.comparingInt(CourseReview::getRating).thenComparing(CourseReview::getCreatedAt, Comparator.reverseOrder()));
        } else if ("HELPFUL".equalsIgnoreCase(sortBy)) {
            filtered.sort(Comparator.comparingInt(CourseReview::getHelpfulCount).reversed().thenComparing(CourseReview::getCreatedAt, Comparator.reverseOrder()));
        } else {
            filtered.sort(Comparator.comparing(CourseReview::getCreatedAt, Comparator.reverseOrder()));
        }

        summary.setReviews(filtered);
        return summary;
    }

    @Transactional
    public CourseReview likeReview(Long reviewId) {
        CourseReview review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("Review not found with ID: " + reviewId));
        review.setHelpfulCount(review.getHelpfulCount() + 1);
        return reviewRepository.save(review);
    }

    @Transactional
    public void deleteReview(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }

    private void seedSampleReviews(Long courseId) {
        List<CourseReview> samples = Arrays.asList(
            createReview(courseId, "Alex Rivera", "alex.r@skillsphere.edu", "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150", 5, "Best Full Stack Course I Have Ever Taken!", "The practical React & Spring Boot hands-on projects were incredible. I went from knowing basic HTML to deploying full stack applications on AWS.", 24),
            createReview(courseId, "Priya Sharma", "priya.s@skillsphere.edu", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", 5, "Highly Comprehensive & Well Structured", "Dr. Alex Morgan explains complex backend architectural concepts with ease. The REST API design module was top notch!", 18),
            createReview(courseId, "Michael Chen", "m.chen@skillsphere.edu", "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150", 4, "Great Learning Experience", "Very solid curriculum. Loved the live coding practice exercises and real-world database integration.", 11),
            createReview(courseId, "Sarah Jenkins", "s.jenkins@skillsphere.edu", "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150", 5, "Career Changing Masterclass", "Secured my software engineering internship after adding projects from this course to my portfolio. 10/10 recommended!", 32)
        );
        reviewRepository.saveAll(samples);
    }

    private CourseReview createReview(Long courseId, String name, String email, String avatar, int rating, String title, String text, int helpful) {
        CourseReview r = new CourseReview();
        r.setCourseId(courseId);
        r.setStudentName(name);
        r.setStudentEmail(email);
        r.setProfileImage(avatar);
        r.setRating(rating);
        r.setReviewTitle(title);
        r.setReviewText(text);
        r.setIsVerified(true);
        r.setHelpfulCount(helpful);
        return r;
    }
}
