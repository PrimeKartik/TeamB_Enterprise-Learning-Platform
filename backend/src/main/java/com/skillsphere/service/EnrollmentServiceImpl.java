package com.skillsphere.service;

import com.skillsphere.dto.DashboardCourseDTO;
import com.skillsphere.dto.EnrollRequest;
import com.skillsphere.dto.EnrollmentSummary;
import com.skillsphere.dto.ProgressUpdateRequest;
import com.skillsphere.model.Course;
import com.skillsphere.model.Enrollment;
import com.skillsphere.model.User;
import com.skillsphere.repository.CourseRepository;
import com.skillsphere.repository.EnrollmentRepository;
import com.skillsphere.repository.LessonProgressRepository;
import com.skillsphere.repository.LessonRepository;
import com.skillsphere.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;
import com.skillsphere.dto.ContinueLearningDTO;
import com.skillsphere.model.Lesson;
import com.skillsphere.model.LessonProgress;
import com.skillsphere.repository.LessonRepository;
import com.skillsphere.repository.LessonProgressRepository;

import java.util.List;

@Service
public class EnrollmentServiceImpl implements EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final LessonProgressRepository lessonProgressRepository;
    private final NotificationService notificationService;

    private final com.skillsphere.repository.CertificateRepository certificateRepository;

    public EnrollmentServiceImpl(
            EnrollmentRepository enrollmentRepository,
            UserRepository userRepository,
            CourseRepository courseRepository,
            LessonRepository lessonRepository,
            LessonProgressRepository lessonProgressRepository,
            NotificationService notificationService,
            com.skillsphere.repository.CertificateRepository certificateRepository) {

        this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
        this.lessonProgressRepository = lessonProgressRepository;
        this.notificationService = notificationService;
        this.certificateRepository = certificateRepository;
    }

    @Override
    public EnrollmentSummary enroll(
            EnrollRequest request,
            Authentication authentication) {
//...
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        boolean exists = enrollmentRepository
                .existsByUser_EmailAndCourse_Id(
                        email,
                        course.getId());

        if (exists) {
            Enrollment existing = enrollmentRepository
                    .findByUser_EmailAndCourse_Id(email, course.getId())
                    .orElse(null);
            if (existing != null) {
                return new EnrollmentSummary(
                        existing.getId(),
                        existing.getCourse(),
                        existing.getProgress(),
                        existing.getEnrolledAt());
            }
        }

        Enrollment enrollment = new Enrollment(user, course);

        enrollmentRepository.save(enrollment);

        notificationService.create(
                user,
                "Enrolled in a new course",
                "You've successfully enrolled in \"" + course.getTitle() + "\". Happy learning!",
                "ENROLLMENT");

        return new EnrollmentSummary(
                enrollment.getId(),
                enrollment.getCourse(),
                enrollment.getProgress(),
                enrollment.getEnrolledAt());
    }

    @Override
    @Transactional
    public ContinueLearningDTO continueLearning(
            Long courseId,
            Authentication authentication) {

        String email = authentication.getName();

        // Check or auto-create enrollment if missing
        Enrollment enrollment = enrollmentRepository
                .findByUser_EmailAndCourse_Id(email, courseId)
                .orElseGet(() -> {
                    User user = userRepository.findByEmail(email).orElse(null);
                    Course course = courseRepository.findById(courseId).orElse(null);
                    if (user != null && course != null) {
                        Enrollment e = new Enrollment();
                        e.setUser(user);
                        e.setCourse(course);
                        e.setPaymentStatus("PAID");
                        return enrollmentRepository.save(e);
                    }
                    return null;
                });

        // Get all lessons in order
        List<Lesson> lessons = lessonRepository.findByCourseIdOrderByModuleAndLessonOrderAsc(courseId);

        if (lessons.isEmpty()) {
            return new ContinueLearningDTO(courseId, 1L, "Lesson 1");
        }

        if (enrollment == null) {
            return new ContinueLearningDTO(courseId, lessons.get(0).getId(), lessons.get(0).getTitle());
        }

        // Find first incomplete lesson
        for (Lesson lesson : lessons) {
            boolean completed = lessonProgressRepository
                    .findByEnrollmentAndLesson(enrollment, lesson)
                    .map(LessonProgress::getCompleted)
                    .orElse(false);

            if (!completed) {
                return new ContinueLearningDTO(
                        courseId,
                        lesson.getId(),
                        lesson.getTitle());
            }
        }

        // If all lessons are completed, return the last lesson.
        Lesson lastLesson = lessons.get(lessons.size() - 1);

        return new ContinueLearningDTO(
                courseId,
                lastLesson.getId(),
                lastLesson.getTitle());
    }

    @Override
    public List<DashboardCourseDTO> getDashboardCourses(
            Authentication authentication) {

        String email = authentication.getName();

        return enrollmentRepository.findByUser_Email(email)
                .stream()
                .map(this::convertToDashboardDTO)
                .toList();
    }

    @Override
    public List<EnrollmentSummary> getMyEnrollments(
            Authentication authentication) {

        String email = authentication.getName();

        return enrollmentRepository.findByUser_Email(email)
                .stream()
                .map(e -> new EnrollmentSummary(
                        e.getId(),
                        e.getCourse(),
                        e.getProgress(),
                        e.getEnrolledAt()))
                .toList();
    }

    @Override
    public EnrollmentSummary updateProgress(
            Long courseId,
            ProgressUpdateRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        Enrollment enrollment = enrollmentRepository
                .findByUser_EmailAndCourse_Id(email, courseId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        boolean wasAlreadyComplete = enrollment.getProgress() != null && enrollment.getProgress() >= 100;

        // Progress must never go down: keep the best (highest) value ever
        // recorded for this enrollment, even if this update reports less.
        int currentProgress = enrollment.getProgress() != null ? enrollment.getProgress() : 0;
        int incomingProgress = request.getProgress() != null ? request.getProgress() : 0;
        int newProgress = Math.max(currentProgress, incomingProgress);

        enrollment.setProgress(newProgress);

        enrollmentRepository.save(enrollment);

        if (!wasAlreadyComplete && newProgress >= 100) {
            notificationService.create(
                    enrollment.getUser(),
                    "Course completed! 🎉",
                    "You completed \"" + enrollment.getCourse().getTitle() + "\". Great work!",
                    "COMPLETION");
        }

        return new EnrollmentSummary(
                enrollment.getId(),
                enrollment.getCourse(),
                enrollment.getProgress(),
                enrollment.getEnrolledAt());
    }

    @Override
    public EnrollmentSummary completeAssessment(
            Long courseId,
            com.skillsphere.dto.AssessmentCompleteRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        // Only enrolled users can submit an assessment for this course.
        Enrollment enrollment = enrollmentRepository
                .findByUser_EmailAndCourse_Id(email, courseId)
                .orElseThrow(() -> new RuntimeException(
                        "You must be enrolled in this course to take its assessment"));

        int score = request.getScore() != null ? request.getScore() : 0;
        int total = request.getTotal() != null && request.getTotal() > 0 ? request.getTotal() : 1;

        // Percentage from THIS attempt only.
        int attemptPercentage = (int) Math.round((score * 100.0) / total);

        boolean wasAlreadyComplete = enrollment.getProgress() != null && enrollment.getProgress() >= 100;

        // Course completion is the BEST attempt ever recorded — a worse
        // retake (e.g. 4/10 after a previous 8/10) must never lower it.
        int currentProgress = enrollment.getProgress() != null ? enrollment.getProgress() : 0;
        int newProgress = Math.max(currentProgress, attemptPercentage);

        enrollment.setProgress(newProgress);
        enrollmentRepository.save(enrollment);

        if (!wasAlreadyComplete && newProgress >= 100) {
            notificationService.create(
                    enrollment.getUser(),
                    "Course completed! 🎉",
                    "You completed \"" + enrollment.getCourse().getTitle() + "\" via assessment. Great work!",
                    "COMPLETION");
        }

        // Certificate is only unlocked at a perfect (100%) score, and only
        // ever issued once per user/course — a later retake at 100% again
        // must not create a duplicate certificate.
        if (attemptPercentage >= 100) {
            boolean alreadyCertified = certificateRepository
                    .existsByStudent_EmailAndCourse_Id(email, courseId);

            if (!alreadyCertified) {
                String credentialId = "SKILL-" + courseId + "-"
                        + java.util.UUID.randomUUID().toString().substring(0, 6).toUpperCase();
                com.skillsphere.model.Certificate certificate = new com.skillsphere.model.Certificate(
                        enrollment.getUser(), enrollment.getCourse(), credentialId, "A+");
                certificateRepository.save(certificate);
            }
        }

        return new EnrollmentSummary(
                enrollment.getId(),
                enrollment.getCourse(),
                enrollment.getProgress(),
                enrollment.getEnrolledAt());
    }

    private DashboardCourseDTO convertToDashboardDTO(
            Enrollment enrollment) {

        DashboardCourseDTO dto = new DashboardCourseDTO();

        dto.setEnrollmentId(enrollment.getId());
        dto.setCourseId(enrollment.getCourse().getId());
        dto.setCourseTitle(enrollment.getCourse().getTitle());

        // Your Course entity has imageUrl, not thumbnail
        dto.setImageUrl(enrollment.getCourse().getImageUrl());
        dto.setProgress(enrollment.getProgress());

        return dto;
    }
}