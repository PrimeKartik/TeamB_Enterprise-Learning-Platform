package com.skillsphere.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "coding_progress")
public class CodingProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_email", nullable = false, unique = true)
    private String userEmail;

    @Column(name = "questions_attempted")
    private Integer questionsAttempted = 0;

    @Column(name = "questions_solved")
    private Integer questionsSolved = 0;

    @Column(name = "best_score")
    private Integer bestScore = 0;

    @Column(name = "practice_time_seconds")
    private Integer practiceTimeSeconds = 0;

    @Column(name = "current_streak")
    private Integer currentStreak = 1;

    @Column(name = "daily_goal_questions")
    private Integer dailyGoalQuestions = 5;

    @Column(name = "xp_points")
    private Integer xpPoints = 0;

    @Column(name = "leaderboard_rank")
    private Integer leaderboardRank = 1;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public CodingProgress() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public Integer getQuestionsAttempted() { return questionsAttempted; }
    public void setQuestionsAttempted(Integer questionsAttempted) { this.questionsAttempted = questionsAttempted; }

    public Integer getQuestionsSolved() { return questionsSolved; }
    public void setQuestionsSolved(Integer questionsSolved) { this.questionsSolved = questionsSolved; }

    public Integer getBestScore() { return bestScore; }
    public void setBestScore(Integer bestScore) { this.bestScore = bestScore; }

    public Integer getPracticeTimeSeconds() { return practiceTimeSeconds; }
    public void setPracticeTimeSeconds(Integer practiceTimeSeconds) { this.practiceTimeSeconds = practiceTimeSeconds; }

    public Integer getCurrentStreak() { return currentStreak; }
    public void setCurrentStreak(Integer currentStreak) { this.currentStreak = currentStreak; }

    public Integer getDailyGoalQuestions() { return dailyGoalQuestions; }
    public void setDailyGoalQuestions(Integer dailyGoalQuestions) { this.dailyGoalQuestions = dailyGoalQuestions; }

    public Integer getXpPoints() { return xpPoints; }
    public void setXpPoints(Integer xpPoints) { this.xpPoints = xpPoints; }

    public Integer getLeaderboardRank() { return leaderboardRank; }
    public void setLeaderboardRank(Integer leaderboardRank) { this.leaderboardRank = leaderboardRank; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
