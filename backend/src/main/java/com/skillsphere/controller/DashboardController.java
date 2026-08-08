package com.skillsphere.controller;

import com.skillsphere.dto.DashboardResponse;
import com.skillsphere.dto.EnrollmentSummary;
import com.skillsphere.model.Enrollment;
import com.skillsphere.model.User;
import com.skillsphere.repository.EnrollmentRepository;
import com.skillsphere.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;

    public DashboardController(EnrollmentRepository enrollmentRepository, UserRepository userRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public DashboardResponse getDashboard(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Authenticated user not found"));

        List<EnrollmentSummary> enrollments = enrollmentRepository.findByUser_Email(email)
                .stream()
                .sorted(Comparator.comparing(Enrollment::getEnrolledAt).reversed())
                .map(e -> new EnrollmentSummary(
                        e.getId(),
                        e.getCourse(),
                        e.getProgress(),
                        e.getEnrolledAt()))
                .toList();

        int totalCourses = enrollments.size();

        int completedCourses = (int) enrollments.stream()
                .filter(e -> e.getProgress() >= 100)
                .count();

        // Average of each course's own progress (e.g. 50% + 80% -> 65%),
        // not the percentage of courses that are fully completed.
        double averageProgress = totalCourses > 0
                ? enrollments.stream()
                        .mapToInt(e -> e.getProgress() != null ? e.getProgress() : 0)
                        .average()
                        .orElse(0)
                : 0;

        return new DashboardResponse(
                user.getName(),
                user.getEmail(),
                totalCourses,
                completedCourses,
                averageProgress,
                enrollments);
    }
}
