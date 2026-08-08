package com.skillsphere.repository;

import com.skillsphere.model.ContestTestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContestTestCaseRepository extends JpaRepository<ContestTestCase, Long> {
    List<ContestTestCase> findByQuestionId(Long questionId);
}
