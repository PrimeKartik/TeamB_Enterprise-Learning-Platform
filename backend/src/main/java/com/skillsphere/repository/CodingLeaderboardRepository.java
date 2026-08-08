package com.skillsphere.repository;

import com.skillsphere.model.CodingLeaderboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CodingLeaderboardRepository extends JpaRepository<CodingLeaderboard, Long> {
    List<CodingLeaderboard> findAllByOrderByXpPointsDesc();
    Optional<CodingLeaderboard> findByUserEmail(String userEmail);
}
