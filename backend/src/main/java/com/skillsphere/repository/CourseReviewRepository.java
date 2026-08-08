package com.skillsphere.repository;

import com.skillsphere.model.CourseReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseReviewRepository extends JpaRepository<CourseReview, Long> {
    List<CourseReview> findByCourseIdOrderByCreatedAtDesc(Long courseId);
    List<CourseReview> findByCourseIdAndRatingOrderByCreatedAtDesc(Long courseId, Integer rating);
    Optional<CourseReview> findByCourseIdAndStudentEmail(Long courseId, String studentEmail);
    long countByCourseId(Long courseId);
}
