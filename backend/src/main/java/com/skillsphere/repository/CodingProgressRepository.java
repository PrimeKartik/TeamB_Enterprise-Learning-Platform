package com.skillsphere.repository;

import com.skillsphere.model.CodingProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CodingProgressRepository extends JpaRepository<CodingProgress, Long> {
    Optional<CodingProgress> findByUserEmail(String userEmail);
}
