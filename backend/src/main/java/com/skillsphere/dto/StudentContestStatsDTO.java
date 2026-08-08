package com.skillsphere.dto;

public class StudentContestStatsDTO {
    private int totalContestsParticipated = 12;
    private int contestsWon = 2;
    private int bestRank = 1;
    private int totalProblemsSolved = 48;
    private double successRate = 88.5;
    private int totalPoints = 4800;
    private int currentRating = 1685;
    private int highestRating = 1740;
    private int badgesEarned = 7;
    private int codingStreak = 14;

    public StudentContestStatsDTO() {}

    public int getTotalContestsParticipated() { return totalContestsParticipated; }
    public void setTotalContestsParticipated(int totalContestsParticipated) { this.totalContestsParticipated = totalContestsParticipated; }

    public int getContestsWon() { return contestsWon; }
    public void setContestsWon(int contestsWon) { this.contestsWon = contestsWon; }

    public int getBestRank() { return bestRank; }
    public void setBestRank(int bestRank) { this.bestRank = bestRank; }

    public int getTotalProblemsSolved() { return totalProblemsSolved; }
    public void setTotalProblemsSolved(int totalProblemsSolved) { this.totalProblemsSolved = totalProblemsSolved; }

    public double getSuccessRate() { return successRate; }
    public void setSuccessRate(double successRate) { this.successRate = successRate; }

    public int getTotalPoints() { return totalPoints; }
    public void setTotalPoints(int totalPoints) { this.totalPoints = totalPoints; }

    public int getCurrentRating() { return currentRating; }
    public void setCurrentRating(int currentRating) { this.currentRating = currentRating; }

    public int getHighestRating() { return highestRating; }
    public void setHighestRating(int highestRating) { this.highestRating = highestRating; }

    public int getBadgesEarned() { return badgesEarned; }
    public void setBadgesEarned(int badgesEarned) { this.badgesEarned = badgesEarned; }

    public int getCodingStreak() { return codingStreak; }
    public void setCodingStreak(int codingStreak) { this.codingStreak = codingStreak; }
}
