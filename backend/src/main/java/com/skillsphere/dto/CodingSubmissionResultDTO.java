package com.skillsphere.dto;

import java.util.List;

public class CodingSubmissionResultDTO {
    private String status; // PASSED, FAILED, PARTIAL
    private int passedTestCases;
    private int totalTestCases;
    private int executionTimeMs;
    private double memoryUsageMb;
    private int score;
    private int xpEarned;
    private String explanation;
    private String suggestedImprovements;
    private List<TestCaseResult> testResults;
    private List<String> newlyUnlockedBadges;

    public CodingSubmissionResultDTO() {}

    public static class TestCaseResult {
        private String input;
        private String expectedOutput;
        private String actualOutput;
        private boolean passed;

        public TestCaseResult(String input, String expectedOutput, String actualOutput, boolean passed) {
            this.input = input;
            this.expectedOutput = expectedOutput;
            this.actualOutput = actualOutput;
            this.passed = passed;
        }

        public String getInput() { return input; }
        public String getExpectedOutput() { return expectedOutput; }
        public String getActualOutput() { return actualOutput; }
        public boolean isPassed() { return passed; }
    }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getPassedTestCases() { return passedTestCases; }
    public void setPassedTestCases(int passedTestCases) { this.passedTestCases = passedTestCases; }

    public int getTotalTestCases() { return totalTestCases; }
    public void setTotalTestCases(int totalTestCases) { this.totalTestCases = totalTestCases; }

    public int getExecutionTimeMs() { return executionTimeMs; }
    public void setExecutionTimeMs(int executionTimeMs) { this.executionTimeMs = executionTimeMs; }

    public double getMemoryUsageMb() { return memoryUsageMb; }
    public void setMemoryUsageMb(double memoryUsageMb) { this.memoryUsageMb = memoryUsageMb; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public int getXpEarned() { return xpEarned; }
    public void setXpEarned(int xpEarned) { this.xpEarned = xpEarned; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getSuggestedImprovements() { return suggestedImprovements; }
    public void setSuggestedImprovements(String suggestedImprovements) { this.suggestedImprovements = suggestedImprovements; }

    public List<TestCaseResult> getTestResults() { return testResults; }
    public void setTestResults(List<TestCaseResult> testResults) { this.testResults = testResults; }

    public List<String> getNewlyUnlockedBadges() { return newlyUnlockedBadges; }
    public void setNewlyUnlockedBadges(List<String> newlyUnlockedBadges) { this.newlyUnlockedBadges = newlyUnlockedBadges; }
}
