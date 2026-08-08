package com.skillsphere.controller;

import com.skillsphere.dto.ContinueLearningDTO;
import com.skillsphere.dto.DashboardCourseDTO;
import com.skillsphere.dto.EnrollRequest;
import com.skillsphere.dto.EnrollmentSummary;
import com.skillsphere.dto.ProgressUpdateRequest;
import com.skillsphere.dto.AssessmentCompleteRequest;
import com.skillsphere.service.EnrollmentService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.skillsphere.dto.ContinueLearningDTO;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

        private final EnrollmentService enrollmentService;

        public EnrollmentController(EnrollmentService enrollmentService) {
                this.enrollmentService = enrollmentService;
        }

        // ================================
        // ENROLL COURSE
        // ================================
        @PostMapping
        public ResponseEntity<EnrollmentSummary> enroll(
                        @Valid @RequestBody EnrollRequest request,
                        Authentication authentication) {

                EnrollmentSummary enrollment = enrollmentService.enroll(request, authentication);

                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(enrollment);
        }

        // ================================
        // DASHBOARD COURSES
        // ================================
        @GetMapping("/dashboard")
        public ResponseEntity<List<DashboardCourseDTO>> dashboard(
                        Authentication authentication) {

                return ResponseEntity.ok(
                                enrollmentService.getDashboardCourses(authentication));
        }

        // ================================
        // MY ENROLLMENTS
        // ================================
        @GetMapping("/my")
        public ResponseEntity<List<EnrollmentSummary>> myEnrollments(
                        Authentication authentication) {

                return ResponseEntity.ok(
                                enrollmentService.getMyEnrollments(authentication));
        }

        @GetMapping("/{courseId}/continue")
        public ResponseEntity<ContinueLearningDTO> continueLearning(

                        @PathVariable Long courseId,

                        Authentication authentication) {

                return ResponseEntity.ok(

                                enrollmentService.continueLearning(
                                                courseId,
                                                authentication));
        }

        // ================================
        // UPDATE PROGRESS
        // ================================
        @PatchMapping("/{courseId}/progress")
        public ResponseEntity<EnrollmentSummary> updateProgress(

                        @PathVariable Long courseId,

                        @Valid @RequestBody ProgressUpdateRequest request,

                        Authentication authentication) {

                return ResponseEntity.ok(
                                enrollmentService.updateProgress(
                                                courseId,
                                                request,
                                                authentication));
        }

        @PostMapping("/{courseId}/complete-assessment")
        public ResponseEntity<EnrollmentSummary> completeAssessment(
                        @PathVariable Long courseId,
                        @Valid @RequestBody AssessmentCompleteRequest request,
                        Authentication authentication) {

                return ResponseEntity.ok(
                                enrollmentService.completeAssessment(
                                                courseId,
                                                request,
                                                authentication));
        }
}