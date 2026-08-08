package com.skillsphere.repository;

import com.skillsphere.model.ContestSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContestSubmissionRepository extends JpaRepository<ContestSubmission, Long> {
    List<ContestSubmission> findByContestIdAndUserEmail(Long contestId, String userEmail);
    List<ContestSubmission> findByUserEmail(String userEmail);
}
