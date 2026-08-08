package com.skillsphere.repository;

import com.skillsphere.model.PracticeAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PracticeAttemptRepository extends JpaRepository<PracticeAttempt, Long> {
    List<PracticeAttempt> findByUserEmailAndCourseIdOrderByAttemptedAtDesc(String userEmail, Long courseId);
    List<PracticeAttempt> findByUserEmailAndCourseIdAndModuleName(String userEmail, Long courseId, String moduleName);
}
