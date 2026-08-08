package com.skillsphere.repository;

import com.skillsphere.model.CodingBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CodingBadgeRepository extends JpaRepository<CodingBadge, Long> {
    List<CodingBadge> findByUserEmail(String userEmail);
    Optional<CodingBadge> findByUserEmailAndBadgeKey(String userEmail, String badgeKey);
}
