package com.skillsphere.repository;

import com.skillsphere.model.CodingSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodingSubmissionRepository extends JpaRepository<CodingSubmission, Long> {
    List<CodingSubmission> findByUserEmail(String userEmail);
    List<CodingSubmission> findByUserEmailAndQuestionId(String userEmail, Long questionId);
}
