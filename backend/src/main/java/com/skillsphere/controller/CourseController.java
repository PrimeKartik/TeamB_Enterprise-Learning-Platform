package com.skillsphere.controller;

import com.skillsphere.dto.CourseDTO;
import com.skillsphere.dto.ErrorResponse;
import com.skillsphere.model.Course;
import com.skillsphere.repository.CourseRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

        private final CourseRepository courseRepository;
        private final com.skillsphere.repository.EnrollmentRepository enrollmentRepository;
        private final com.skillsphere.repository.WishlistRepository wishlistRepository;
        private final com.skillsphere.repository.CertificateRepository certificateRepository;
        private final com.skillsphere.repository.LessonRepository lessonRepository;
        private final com.skillsphere.repository.CourseModuleRepository moduleRepository;

        public CourseController(
                        CourseRepository courseRepository,
                        com.skillsphere.repository.EnrollmentRepository enrollmentRepository,
                        com.skillsphere.repository.WishlistRepository wishlistRepository,
                        com.skillsphere.repository.CertificateRepository certificateRepository,
                        com.skillsphere.repository.LessonRepository lessonRepository,
                        com.skillsphere.repository.CourseModuleRepository moduleRepository) {

                this.courseRepository = courseRepository;
                this.enrollmentRepository = enrollmentRepository;
                this.wishlistRepository = wishlistRepository;
                this.certificateRepository = certificateRepository;
                this.lessonRepository = lessonRepository;
                this.moduleRepository = moduleRepository;

        }

        // ==========================
        // GET ALL COURSES
        // ==========================

        @GetMapping
        public List<CourseDTO> getAllCourses(Authentication authentication) {
                return courseRepository.findAll()
                                .stream()
                                .map(course -> convertToDTO(course, authentication))
                                .toList();
        }

        // ==========================
        // GET ALL COURSES (ADMIN)
        // ==========================

        @GetMapping("/admin")
        public ResponseEntity<List<com.skillsphere.dto.CourseAdminDTO>> getAdminCourses() {
                return ResponseEntity.ok(courseRepository.findAllWithStats());
        }

        // ==========================
        // GET COURSE BY ID
        // ==========================

        @GetMapping("/{id}")
        public ResponseEntity<?> getCourse(@PathVariable Long id, Authentication authentication) {
                return courseRepository.findById(id)
                                .<ResponseEntity<?>>map(course -> {
                                        CourseDTO dto = convertToDTO(course, authentication);
                                        return ResponseEntity.ok(dto);
                                })
                                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                                                .body(new ErrorResponse("Course not found")));
        }

        // ==========================
        // CREATE COURSE
        // ==========================

        @PostMapping
        public ResponseEntity<?> createCourse(

                        @Valid @RequestBody Course course

        ) {

                course.setId(null);

                Course saved = courseRepository.save(course);

                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(saved);

        }

        // ==========================
        // UPDATE COURSE
        // ==========================

        @PutMapping("/{id}")
        public ResponseEntity<?> updateCourse(

                        @PathVariable Long id,

                        @Valid @RequestBody Course updatedCourse

        ) {

                return courseRepository.findById(id)

                                .<ResponseEntity<?>>map(existing -> {

                                        existing.setTitle(
                                                        updatedCourse.getTitle());

                                        existing.setDescription(
                                                        updatedCourse.getDescription());

                                        existing.setBadge(
                                                        updatedCourse.getBadge());

                                        existing.setBadgeColor(
                                                        updatedCourse.getBadgeColor());

                                        existing.setLevel(
                                                        updatedCourse.getLevel());

                                        existing.setDuration(
                                                        updatedCourse.getDuration());

                                        existing.setRating(
                                                        updatedCourse.getRating());

                                        existing.setReviews(
                                                        updatedCourse.getReviews());

                                        existing.setPrice(
                                                        updatedCourse.getPrice());

                                        existing.setImageUrl(
                                                        updatedCourse.getImageUrl());

                                        existing.setSkill(
                                                        updatedCourse.getSkill());

                                        existing.setTotalLessons(
                                                        updatedCourse.getTotalLessons());

                                        existing.setTotalHours(
                                                        updatedCourse.getTotalHours());

                                        existing.setTotalQuizzes(
                                                        updatedCourse.getTotalQuizzes());

                                        existing.setPrerequisites(
                                                        updatedCourse.getPrerequisites());

                                        existing.setLearningOutcomes(
                                                        updatedCourse.getLearningOutcomes());

                                        Course saved = courseRepository.save(existing);

                                        return ResponseEntity.ok(saved);

                                })

                                .orElseGet(() ->

                                ResponseEntity
                                                .status(HttpStatus.NOT_FOUND)
                                                .body(
                                                                new ErrorResponse(
                                                                                "Course not found"))

                                );

        }

        // ==========================
        // DELETE COURSE
        // ==========================

        @DeleteMapping("/{id}")
        @org.springframework.transaction.annotation.Transactional
        public ResponseEntity<?> deleteCourse(

                        @PathVariable Long id

        ) {

                if (!courseRepository.existsById(id)) {

                        return ResponseEntity
                                        .status(HttpStatus.NOT_FOUND)
                                        .body(
                                                        new ErrorResponse(
                                                                        "Course not found"));

                }

                // A course can have enrollments, wishlist saves, certificates, and
                // lessons pointing at it via foreign keys. None of those cascade
                // automatically, so deleting the course directly used to fail with
                // a database constraint violation whenever ANY student had ever
                // enrolled in, saved, or earned a certificate for it. Since this is
                // an explicit admin "delete course" action, we clean up all of its
                // dependent records first, then delete the course itself.
                try {
                        enrollmentRepository.deleteByCourse_Id(id);
                        wishlistRepository.deleteByCourse_Id(id);
                        certificateRepository.deleteByCourse_Id(id);
                        lessonRepository.deleteByModule_Course_Id(id);
                        moduleRepository.deleteByCourseId(id);

                        courseRepository.deleteById(id);
                } catch (Exception e) {
                        return ResponseEntity
                                        .status(HttpStatus.CONFLICT)
                                        .body(new ErrorResponse(
                                                        "Could not delete this course: " + e.getMessage()));
                }

                return ResponseEntity
                                .noContent()
                                .build();
        }

        private CourseDTO convertToDTO(Course course, Authentication authentication) {

                CourseDTO dto = new CourseDTO();

                dto.setId(course.getId());
                dto.setTitle(course.getTitle());
                dto.setDescription(course.getDescription());

                dto.setBadge(course.getBadge());
                dto.setBadgeColor(course.getBadgeColor());

                dto.setLevel(course.getLevel());
                dto.setDuration(course.getDuration());

                dto.setRating(course.getRating());
                dto.setReviews(course.getReviews());

                dto.setPrice(course.getPrice());

                String img = course.getImageUrl();
                if (img == null || img.trim().isEmpty()) {
                    img = "/images/full-stack-development.svg";
                }
                dto.setImageUrl(img);

                dto.setSkill(course.getSkill());

                dto.setTotalLessons(course.getTotalLessons());
                dto.setTotalHours(course.getTotalHours());
                dto.setTotalQuizzes(course.getTotalQuizzes());

                dto.setPrerequisites(course.getPrerequisites());
                dto.setLearningOutcomes(course.getLearningOutcomes());

                // Check actual enrollment status
                boolean enrolled = false;
                int progress = 0;
                
                if (authentication != null && authentication.isAuthenticated() && !"anonymousUser".equals(authentication.getPrincipal())) {
                        String email = authentication.getName();
                        var enrollmentOpt = enrollmentRepository.findByUser_EmailAndCourse_Id(email, course.getId());
                        if (enrollmentOpt.isPresent()) {
                                enrolled = true;
                                progress = enrollmentOpt.get().getProgress() != null ? enrollmentOpt.get().getProgress() : 0;
                        }
                }

                dto.setEnrolled(enrolled);
                dto.setProgress(progress);

                return dto;
        }
}