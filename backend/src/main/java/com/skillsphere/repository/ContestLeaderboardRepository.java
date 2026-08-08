package com.skillsphere.repository;

import com.skillsphere.model.ContestLeaderboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContestLeaderboardRepository extends JpaRepository<ContestLeaderboard, Long> {
    List<ContestLeaderboard> findByContestIdOrderByScoreDescPenaltyTimeAsc(Long contestId);
    Optional<ContestLeaderboard> findByContestIdAndUserEmail(Long contestId, String userEmail);
}
