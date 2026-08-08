package com.skillsphere.repository;

import com.skillsphere.model.ContestQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContestQuestionRepository extends JpaRepository<ContestQuestion, Long> {
    List<ContestQuestion> findByContestId(Long contestId);
}
