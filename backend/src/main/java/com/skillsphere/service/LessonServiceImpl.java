package com.skillsphere.service;

import com.skillsphere.dto.LessonDTO;
import com.skillsphere.model.Enrollment;
import com.skillsphere.model.Lesson;
import com.skillsphere.model.LessonProgress;
import com.skillsphere.repository.EnrollmentRepository;
import com.skillsphere.repository.LessonProgressRepository;
import com.skillsphere.repository.LessonRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonServiceImpl implements LessonService {

    private final LessonRepository lessonRepository;
    private final LessonProgressRepository lessonProgressRepository;
    private final EnrollmentRepository enrollmentRepository;

    public LessonServiceImpl(
            LessonRepository lessonRepository,
            LessonProgressRepository lessonProgressRepository,
            EnrollmentRepository enrollmentRepository) {

        this.lessonRepository = lessonRepository;
        this.lessonProgressRepository = lessonProgressRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    @Override
    public List<LessonDTO> getLessons(
            Long courseId,
            Authentication authentication) {

        String email = authentication.getName();

        Enrollment enrollment = enrollmentRepository
                .findByUser_EmailAndCourse_Id(email, courseId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        return lessonRepository
                .findByCourseIdOrderByModuleAndLessonOrderAsc(courseId)
                .stream()
                .map(lesson -> convertToDTO(lesson, enrollment))
                .toList();
    }

    @Override
    public LessonDTO getLesson(
            Long lessonId,
            Authentication authentication) {

        String email = authentication.getName();

        Lesson lesson = lessonRepository
                .findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        Enrollment enrollment = enrollmentRepository
                .findByUser_EmailAndCourse_Id(
                        email,
                        lesson.getModule().getCourse().getId())
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        return convertToDTO(lesson, enrollment);
    }

    @Override
    @Transactional
    public void completeLesson(
            Long lessonId,
            Authentication authentication) {

        String email = authentication.getName();

        Lesson lesson = lessonRepository
                .findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        Long courseId = lesson.getModule().getCourse().getId();

        Enrollment enrollment = enrollmentRepository
                .findByUser_EmailAndCourse_Id(email, courseId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        LessonProgress lessonProgress = lessonProgressRepository
                .findByEnrollmentAndLesson(enrollment, lesson)
                .orElseGet(() -> {

                    LessonProgress progress = new LessonProgress();

                    progress.setEnrollment(enrollment);

                    progress.setLesson(lesson);

                    progress.setCompleted(false);

                    return progress;

                });

        if (!lessonProgress.getCompleted()) {

            lessonProgress.setCompleted(true);

            lessonProgressRepository.save(lessonProgress);

        }

        long totalLessons = lessonRepository.countByCourseId(courseId);

        long completedLessons = lessonProgressRepository
                .countByEnrollmentAndCompletedTrue(
                        enrollment);

        int progress = totalLessons == 0
                ? 0
                : (int) ((completedLessons * 100) / totalLessons);

        enrollment.setProgress(progress);

        enrollmentRepository.save(enrollment);

    }

    private LessonDTO convertToDTO(
            Lesson lesson,
            Enrollment enrollment) {

        LessonDTO dto = new LessonDTO();

        dto.setId(lesson.getId());
        dto.setTitle(lesson.getTitle());
        dto.setDescription(lesson.getDescription());
        dto.setLessonOrder(lesson.getLessonOrder());
        dto.setDuration(lesson.getDuration());
        dto.setVideoUrl(lesson.getVideoUrl());
        dto.setContent(lesson.getContent());

        boolean completed = lessonProgressRepository
                .findByEnrollmentAndLesson(
                        enrollment,
                        lesson)
                .map(LessonProgress::getCompleted)
                .orElse(false);

        dto.setCompleted(completed);

        return dto;
    }
}
