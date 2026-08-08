package com.skillsphere.controller;

import com.skillsphere.dto.AssessmentDTO;
import com.skillsphere.dto.AssessmentQuestionDTO;
import com.skillsphere.dto.AssessmentSummaryDTO;
import com.skillsphere.model.Course;
import com.skillsphere.model.Enrollment;
import com.skillsphere.repository.EnrollmentRepository;
import com.skillsphere.service.AssessmentGenerationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assessments")
public class AssessmentController {

    private static final int DEFAULT_DURATION_MINUTES = 10;
    private static final int QUESTION_COUNT = 10;

    private final EnrollmentRepository enrollmentRepository;
    private final AssessmentGenerationService assessmentGenerationService;

    public AssessmentController(
            EnrollmentRepository enrollmentRepository,
            AssessmentGenerationService assessmentGenerationService) {
        this.enrollmentRepository = enrollmentRepository;
        this.assessmentGenerationService = assessmentGenerationService;
    }

    // ================================
    // LIST AVAILABLE ASSESSMENTS
    // One entry per course the current user is enrolled in. If the user has
    // no enrollments, this returns an empty list — the frontend shows the
    // "enroll in a course to unlock its assessment" message in that case.
    // ================================
    @GetMapping
    public ResponseEntity<List<AssessmentSummaryDTO>> listAvailable(Authentication authentication) {

        String email = authentication.getName();

        List<AssessmentSummaryDTO> summaries = enrollmentRepository
                .findByUser_Email(email)
                .stream()
                .map(Enrollment::getCourse)
                .filter(course -> course != null)
                .map(course -> new AssessmentSummaryDTO(
                        course.getId(),
                        course.getTitle(),
                        "AI-generated skill assessment for \"" + course.getTitle() + "\".",
                        DEFAULT_DURATION_MINUTES,
                        QUESTION_COUNT))
                .toList();

        return ResponseEntity.ok(summaries);
    }

    // ================================
    // GENERATE QUESTIONS FOR A COURSE
    // Generates a brand-new set of AI questions every time it's called.
    // Only allowed if the current user is enrolled in the course.
    // ================================
    @PostMapping("/{courseId}/start")
    public ResponseEntity<?> start(@PathVariable Long courseId, Authentication authentication) {

        String email = authentication.getName();

        Enrollment enrollment = enrollmentRepository
                .findByUser_EmailAndCourse_Id(email, courseId)
                .orElse(null);

        if (enrollment == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "You must be enrolled in this course to take its assessment."));
        }

        Course course = enrollment.getCourse();

        try {
            List<AssessmentQuestionDTO> questions = assessmentGenerationService.generateQuestions(course);

            AssessmentDTO dto = new AssessmentDTO(
                    course.getId(),
                    course.getTitle(),
                    DEFAULT_DURATION_MINUTES,
                    questions);

            return ResponseEntity.ok(dto);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(Map.of("message", "Could not generate the assessment right now. Please try again."));
        }
    }
}
