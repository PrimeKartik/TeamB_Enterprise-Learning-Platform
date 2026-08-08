package com.skillsphere.repository;

import com.skillsphere.model.PracticeQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PracticeQuestionRepository extends JpaRepository<PracticeQuestion, Long> {
    List<PracticeQuestion> findByCourseId(Long courseId);
    List<PracticeQuestion> findByCourseIdAndModuleName(Long courseId, String moduleName);
    List<PracticeQuestion> findByCourseIdAndTopicName(Long courseId, String topicName);
}
