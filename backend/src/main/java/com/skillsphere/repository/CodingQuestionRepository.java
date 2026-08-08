package com.skillsphere.repository;

import com.skillsphere.model.CodingQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodingQuestionRepository extends JpaRepository<CodingQuestion, Long> {
    List<CodingQuestion> findByCourseId(Long courseId);
    List<CodingQuestion> findByDifficulty(String difficulty);
    List<CodingQuestion> findByCourseTitleContainingIgnoreCase(String courseTitle);
}
