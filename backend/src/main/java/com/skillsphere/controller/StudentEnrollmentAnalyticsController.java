package com.skillsphere.controller;

import com.skillsphere.dto.StudentLearningAnalyticsDTO;
import com.skillsphere.model.StudentEnrollmentDetail;
import com.skillsphere.service.StudentEnrollmentAnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class StudentEnrollmentAnalyticsController {

    private final StudentEnrollmentAnalyticsService analyticsService;

    public StudentEnrollmentAnalyticsController(StudentEnrollmentAnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/enrollments")
    public ResponseEntity<List<StudentEnrollmentDetail>> getAllEnrollments() {
        return ResponseEntity.ok(analyticsService.getAllEnrollments());
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<StudentEnrollmentDetail> getStudentDetails(@PathVariable Long id) {
        return ResponseEntity.ok(analyticsService.getStudentById(id));
    }

    @GetMapping("/analytics")
    public ResponseEntity<StudentLearningAnalyticsDTO> getAnalytics() {
        return ResponseEntity.ok(analyticsService.getAnalyticsOverview());
    }

    @GetMapping("/progress")
    public ResponseEntity<List<StudentEnrollmentDetail>> getStudentProgress() {
        return ResponseEntity.ok(analyticsService.getAllEnrollments());
    }

    @GetMapping("/charts")
    public ResponseEntity<Map<String, Object>> getChartsData() {
        StudentLearningAnalyticsDTO dto = analyticsService.getAnalyticsOverview();
        Map<String, Object> charts = Map.of(
            "courseEnrollment", dto.getCourseEnrollmentChart(),
            "progressDistribution", dto.getStudentProgressDistribution(),
            "dailyActive", dto.getDailyActiveStudentsChart(),
            "completionTrend", dto.getCourseCompletionTrendChart(),
            "quizPerformance", dto.getQuizPerformanceChart(),
            "codingRadar", dto.getCodingPracticeRadar(),
            "certificatesIssued", dto.getCertificatesIssuedChart(),
            "monthlyEnrollments", dto.getMonthlyEnrollmentsChart()
        );
        return ResponseEntity.ok(charts);
    }

    @PutMapping("/enrollment/{id}")
    public ResponseEntity<StudentEnrollmentDetail> updateEnrollment(
            @PathVariable Long id,
            @RequestBody StudentEnrollmentDetail updated) {
        return ResponseEntity.ok(analyticsService.updateEnrollment(id, updated));
    }

    @DeleteMapping("/enrollment/{id}")
    public ResponseEntity<Map<String, String>> deleteEnrollment(@PathVariable Long id) {
        analyticsService.deleteEnrollment(id);
        return ResponseEntity.ok(Map.of("message", "Enrollment record deleted successfully"));
    }
}
