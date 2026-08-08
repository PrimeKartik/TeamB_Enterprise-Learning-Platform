package com.skillsphere.repository;

import com.skillsphere.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

    List<Lesson> findByModuleIdOrderByLessonOrderAsc(Long moduleId);

    @Query("SELECT l FROM Lesson l JOIN l.module m WHERE m.course.id = :courseId ORDER BY m.moduleOrder ASC, l.lessonOrder ASC")
    List<Lesson> findByCourseIdOrderByModuleAndLessonOrderAsc(@Param("courseId") Long courseId);

    @Query("SELECT COUNT(l) FROM Lesson l WHERE l.module.course.id = :courseId")
    long countByCourseId(@Param("courseId") Long courseId);

    void deleteByModuleId(Long moduleId);

    @Query("DELETE FROM Lesson l WHERE l.module.course.id = :courseId")
    @org.springframework.data.jpa.repository.Modifying
    @org.springframework.transaction.annotation.Transactional
    void deleteByModule_Course_Id(@Param("courseId") Long courseId);
}
