package com.skillsphere.controller;

import com.skillsphere.dto.AdminStatsDTO;
import com.skillsphere.model.Course;
import com.skillsphere.model.Enrollment;
import com.skillsphere.model.User;
import com.skillsphere.repository.CourseRepository;
import com.skillsphere.repository.EnrollmentRepository;
import com.skillsphere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDTO> getStats() {
        AdminStatsDTO stats = new AdminStatsDTO();

        long totalUsers = userRepository.count();
        long totalStudents = userRepository.countByRole("STUDENT");
        long totalCourses = courseRepository.count();

        List<Enrollment> allEnrollments = enrollmentRepository.findAll();

        // Enrollment-derived stats must only ever reflect real students —
        // an admin account enrolling in a course (e.g. for testing) should
        // never inflate enrollment counts, completion counts, revenue, or
        // the enrollment trend chart.
        List<Enrollment> studentEnrollments = allEnrollments.stream()
                .filter(e -> e.getUser() != null && "STUDENT".equals(e.getUser().getRole()))
                .toList();

        long activeEnrollments = studentEnrollments.size();

        long completedCourses = studentEnrollments.stream()
                .filter(e -> e.getProgress() != null && e.getProgress() >= 100)
                .count();

        long activeUsers = studentEnrollments.stream()
                .map(e -> e.getUser().getId())
                .distinct()
                .count();

        double totalRevenue = studentEnrollments.stream()
                .mapToDouble(e -> e.getCourse().getPrice() != null ? e.getCourse().getPrice() : 0.0)
                .sum();

        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);
        long newUsersThisMonth = userRepository.findByCreatedAtAfter(oneMonthAgo).size();

        stats.setTotalUsers(totalUsers);
        stats.setTotalStudents(totalStudents);
        stats.setTotalCourses(totalCourses);
        stats.setActiveUsers(activeUsers);
        stats.setActiveEnrollments(activeEnrollments);
        stats.setCompletedCourses(completedCourses);
        stats.setTotalRevenue(totalRevenue);
        stats.setNewUsersThisMonth(newUsersThisMonth);

        // Calculate chart data for last 12 months
        stats.setMonthlyUserRegistrations(calculateMonthlyUserRegistrations());
        stats.setMonthlyCourseEnrollments(calculateMonthlyCourseEnrollments(studentEnrollments));

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    private List<Map<String, Object>> calculateMonthlyUserRegistrations() {
        List<User> users = userRepository.findAll();
        Map<String, Long> counts = new HashMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM yyyy");
        
        LocalDate now = LocalDate.now();
        for (int i = 11; i >= 0; i--) {
            LocalDate month = now.minusMonths(i);
            counts.put(month.format(formatter), 0L);
        }

        for (User user : users) {
            if (user.getCreatedAt() != null) {
                String monthKey = user.getCreatedAt().format(formatter);
                if (counts.containsKey(monthKey)) {
                    counts.put(monthKey, counts.get(monthKey) + 1);
                }
            }
        }

        return formatChartData(counts);
    }

    private List<Map<String, Object>> calculateMonthlyCourseEnrollments(List<Enrollment> enrollments) {
        Map<String, Long> counts = new HashMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM yyyy");
        
        LocalDate now = LocalDate.now();
        for (int i = 11; i >= 0; i--) {
            LocalDate month = now.minusMonths(i);
            counts.put(month.format(formatter), 0L);
        }

        for (Enrollment enrollment : enrollments) {
            if (enrollment.getEnrolledAt() != null) {
                String monthKey = enrollment.getEnrolledAt().format(formatter);
                if (counts.containsKey(monthKey)) {
                    counts.put(monthKey, counts.get(monthKey) + 1);
                }
            }
        }

        return formatChartData(counts);
    }

    private List<Map<String, Object>> formatChartData(Map<String, Long> counts) {
        List<Map<String, Object>> result = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM yyyy");
        LocalDate now = LocalDate.now();
        
        for (int i = 11; i >= 0; i--) {
            LocalDate month = now.minusMonths(i);
            String monthKey = month.format(formatter);
            Map<String, Object> dataPoint = new HashMap<>();
            dataPoint.put("name", monthKey);
            dataPoint.put("value", counts.get(monthKey));
            result.add(dataPoint);
        }
        return result;
    }
}
