package com.skillsphere.repository;

import com.skillsphere.model.StudentNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentNoteRepository extends JpaRepository<StudentNote, Long> {
    List<StudentNote> findByUserId(Long userId);
    List<StudentNote> findByUserIdAndCourseId(Long userId, Long courseId);
    Optional<StudentNote> findByUserIdAndLessonId(Long userId, Long lessonId);
}
