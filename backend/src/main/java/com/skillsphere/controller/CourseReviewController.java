package com.skillsphere.controller;

import com.skillsphere.dto.CourseReviewRequest;
import com.skillsphere.dto.CourseReviewSummaryDTO;
import com.skillsphere.model.CourseReview;
import com.skillsphere.service.CourseReviewService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class CourseReviewController {

    private final CourseReviewService reviewService;

    public CourseReviewController(CourseReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<CourseReview> submitReview(
            @Valid @RequestBody CourseReviewRequest request,
            Authentication authentication) {
        String email = (authentication != null && authentication.getName() != null)
                ? authentication.getName()
                : "student@skillsphere.edu";
        CourseReview saved = reviewService.submitOrUpdateReview(email, request);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<CourseReviewSummaryDTO> getCourseReviews(
            @PathVariable Long courseId,
            @RequestParam(required = false, defaultValue = "ALL") String ratingFilter,
            @RequestParam(required = false, defaultValue = "RECENT") String sortBy) {
        CourseReviewSummaryDTO summary = reviewService.getCourseReviewsSummary(courseId, ratingFilter, sortBy);
        return ResponseEntity.ok(summary);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseReview> updateReview(
            @PathVariable Long id,
            @Valid @RequestBody CourseReviewRequest request,
            Authentication authentication) {
        String email = (authentication != null && authentication.getName() != null)
                ? authentication.getName()
                : "student@skillsphere.edu";
        request.setCourseId(request.getCourseId() != null ? request.getCourseId() : 1L);
        CourseReview updated = reviewService.submitOrUpdateReview(email, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok(Map.of("message", "Review deleted successfully"));
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<CourseReview> likeReview(@PathVariable Long id) {
        CourseReview liked = reviewService.likeReview(id);
        return ResponseEntity.ok(liked);
    }
}
