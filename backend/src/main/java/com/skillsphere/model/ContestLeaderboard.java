package com.skillsphere.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contest_leaderboard")
public class ContestLeaderboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "contest_id", nullable = false)
    private Long contestId;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "profile_image")
    private String profileImage;

    private Integer score = 0;

    @Column(name = "problems_solved")
    private Integer problemsSolved = 0;

    @Column(name = "penalty_time")
    private Integer penaltyTime = 0;

    @Column(name = "submission_count")
    private Integer submissionCount = 0;

    @Column(name = "last_submission_at")
    private LocalDateTime lastSubmissionAt = LocalDateTime.now();

    public ContestLeaderboard() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getContestId() { return contestId; }
    public void setContestId(Long contestId) { this.contestId = contestId; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getProfileImage() { return profileImage; }
    public void setProfileImage(String profileImage) { this.profileImage = profileImage; }

    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }

    public Integer getProblemsSolved() { return problemsSolved; }
    public void setProblemsSolved(Integer problemsSolved) { this.problemsSolved = problemsSolved; }

    public Integer getPenaltyTime() { return penaltyTime; }
    public void setPenaltyTime(Integer penaltyTime) { this.penaltyTime = penaltyTime; }

    public Integer getSubmissionCount() { return submissionCount; }
    public void setSubmissionCount(Integer submissionCount) { this.submissionCount = submissionCount; }

    public LocalDateTime getLastSubmissionAt() { return lastSubmissionAt; }
    public void setLastSubmissionAt(LocalDateTime lastSubmissionAt) { this.lastSubmissionAt = lastSubmissionAt; }
}
