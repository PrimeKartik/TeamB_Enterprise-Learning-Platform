package com.skillsphere.repository;

import com.skillsphere.model.Enrollment;
import com.skillsphere.model.Lesson;
import com.skillsphere.model.LessonProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LessonProgressRepository extends JpaRepository<LessonProgress, Long> {

    Optional<LessonProgress> findByEnrollmentAndLesson(
            Enrollment enrollment,
            Lesson lesson
    );

    List<LessonProgress> findByEnrollment(Enrollment enrollment);

    long countByEnrollmentAndCompletedTrue(Enrollment enrollment);

}