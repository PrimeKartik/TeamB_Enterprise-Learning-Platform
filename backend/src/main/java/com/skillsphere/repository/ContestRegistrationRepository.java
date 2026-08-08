package com.skillsphere.repository;

import com.skillsphere.model.ContestRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContestRegistrationRepository extends JpaRepository<ContestRegistration, Long> {
    List<ContestRegistration> findByContestId(Long contestId);
    List<ContestRegistration> findByUserEmail(String userEmail);
    Optional<ContestRegistration> findByContestIdAndUserEmail(Long contestId, String userEmail);
}
