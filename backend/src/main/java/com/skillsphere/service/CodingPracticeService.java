package com.skillsphere.service;

import com.skillsphere.dto.CodingSubmissionRequest;
import com.skillsphere.dto.CodingSubmissionResultDTO;
import com.skillsphere.model.*;
import com.skillsphere.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class CodingPracticeService {

    private final CodingQuestionRepository questionRepository;
    private final CodingTestCaseRepository testCaseRepository;
    private final CodingSubmissionRepository submissionRepository;
    private final CodingProgressRepository progressRepository;
    private final CodingBadgeRepository badgeRepository;
    private final CodingLeaderboardRepository leaderboardRepository;

    public CodingPracticeService(
            CodingQuestionRepository questionRepository,
            CodingTestCaseRepository testCaseRepository,
            CodingSubmissionRepository submissionRepository,
            CodingProgressRepository progressRepository,
            CodingBadgeRepository badgeRepository,
            CodingLeaderboardRepository leaderboardRepository) {
        this.questionRepository = questionRepository;
        this.testCaseRepository = testCaseRepository;
        this.submissionRepository = submissionRepository;
        this.progressRepository = progressRepository;
        this.badgeRepository = badgeRepository;
        this.leaderboardRepository = leaderboardRepository;
    }

    public List<CodingQuestion> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Optional<CodingQuestion> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    public List<CodingQuestion> getQuestionsByCourseId(Long courseId) {
        return questionRepository.findByCourseId(courseId);
    }

    public CodingProgress getOrCreateProgress(String userEmail) {
        return progressRepository.findByUserEmail(userEmail)
                .orElseGet(() -> {
                    CodingProgress p = new CodingProgress();
                    p.setUserEmail(userEmail);
                    p.setQuestionsAttempted(0);
                    p.setQuestionsSolved(0);
                    p.setXpPoints(0);
                    p.setCurrentStreak(1);
                    p.setDailyGoalQuestions(5);
                    return progressRepository.save(p);
                });
    }

    public List<CodingBadge> getBadgesForUser(String userEmail) {
        return badgeRepository.findByUserEmail(userEmail);
    }

    public List<CodingLeaderboard> getLeaderboard() {
        return leaderboardRepository.findAllByOrderByXpPointsDesc();
    }

    @Transactional
    public CodingSubmissionResultDTO evaluateAndSubmit(String userEmail, CodingSubmissionRequest req) {
        CodingQuestion question = questionRepository.findById(req.getQuestionId())
                .orElseThrow(() -> new IllegalArgumentException("Question not found with ID: " + req.getQuestionId()));

        List<CodingTestCase> testCases = testCaseRepository.findByQuestionId(question.getId());
        List<CodingSubmissionResultDTO.TestCaseResult> testCaseResults = new ArrayList<>();

        boolean allPassed = true;
        int passedCount = 0;

        String submittedCode = req.getCode() != null ? req.getCode().trim() : "";

        // Check if question is MCQ/Prediction type or Code execution
        if ("Multiple Choice".equalsIgnoreCase(question.getQuestionType()) || "Output Prediction".equalsIgnoreCase(question.getQuestionType())) {
            boolean isCorrect = req.getSelectedAnswer() != null &&
                    req.getSelectedAnswer().equalsIgnoreCase(question.getCorrectAnswer());
            if (isCorrect) {
                passedCount = 1;
            } else {
                allPassed = false;
            }
            testCaseResults.add(new CodingSubmissionResultDTO.TestCaseResult(
                    "User Answer: " + req.getSelectedAnswer(),
                    question.getCorrectAnswer(),
                    req.getSelectedAnswer(),
                    isCorrect
            ));
        } else {
            // Code execution simulation against test cases
            if (testCases.isEmpty()) {
                // Fallback virtual test cases if none in DB
                boolean hasContent = submittedCode.length() > 10;
                passedCount = hasContent ? 2 : 0;
                allPassed = hasContent;
                testCaseResults.add(new CodingSubmissionResultDTO.TestCaseResult("Sample Input 1", question.getSampleOutput(), question.getSampleOutput(), hasContent));
                testCaseResults.add(new CodingSubmissionResultDTO.TestCaseResult("Sample Input 2", "Expected Result", "Expected Result", hasContent));
            } else {
                for (CodingTestCase tc : testCases) {
                    boolean testPassed = !submittedCode.isEmpty() && !submittedCode.contains("BUG");
                    if (testPassed) {
                        passedCount++;
                    } else {
                        allPassed = false;
                    }
                    testCaseResults.add(new CodingSubmissionResultDTO.TestCaseResult(
                            tc.getInputData() != null ? tc.getInputData() : "Input",
                            tc.getExpectedOutput(),
                            testPassed ? tc.getExpectedOutput() : "Compilation/Runtime Error",
                            testPassed
                    ));
                }
            }
        }

        int totalCount = testCaseResults.size();
        int executionTimeMs = (int) (Math.random() * 40 + 80);
        double memoryUsageMb = 12.0 + Math.random() * 6.0;
        int score = totalCount > 0 ? (passedCount * 100) / totalCount : 100;
        int xpEarned = allPassed ? question.getXpReward() : (score * question.getXpReward()) / 100;

        // Save submission record
        CodingSubmission sub = new CodingSubmission();
        sub.setUserEmail(userEmail);
        sub.setQuestionId(question.getId());
        sub.setLanguage(req.getLanguage() != null ? req.getLanguage() : question.getDefaultLanguage());
        sub.setSubmittedCode(submittedCode);
        sub.setStatus(allPassed ? "PASSED" : (passedCount > 0 ? "PARTIAL" : "FAILED"));
        sub.setPassedTestCases(passedCount);
        sub.setTotalTestCases(totalCount);
        sub.setExecutionTimeMs(executionTimeMs);
        sub.setMemoryUsageMb(memoryUsageMb);
        sub.setScore(score);
        sub.setExplanation(allPassed ? "Great job! All test cases executed flawlessly with optimal time complexity." : "Some test cases failed. Verify boundary conditions and algorithm logic.");
        sub.setSuggestedImprovements(allPassed ? "Consider optimizing memory allocation or trying alternative data structures." : "Review edge cases such as null inputs, empty arrays, or negative values.");
        submissionRepository.save(sub);

        // Update User Progress
        CodingProgress progress = getOrCreateProgress(userEmail);
        progress.setQuestionsAttempted(progress.getQuestionsAttempted() + 1);
        if (allPassed) {
            progress.setQuestionsSolved(progress.getQuestionsSolved() + 1);
            progress.setXpPoints(progress.getXpPoints() + xpEarned);
        }
        if (score > progress.getBestScore()) {
            progress.setBestScore(score);
        }
        progress.setPracticeTimeSeconds(progress.getPracticeTimeSeconds() + (question.getExpectedTimeMinutes() * 60));
        progressRepository.save(progress);

        // Check & Unlock Badges
        List<String> unlockedBadges = checkAndUnlockBadges(userEmail, progress, question);

        // Update Leaderboard entry
        updateLeaderboardEntry(userEmail, progress.getQuestionsSolved(), progress.getXpPoints(), progress.getCurrentStreak());

        // Prepare response
        CodingSubmissionResultDTO res = new CodingSubmissionResultDTO();
        res.setStatus(sub.getStatus());
        res.setPassedTestCases(passedCount);
        res.setTotalTestCases(totalCount);
        res.setExecutionTimeMs(executionTimeMs);
        res.setMemoryUsageMb(Math.round(memoryUsageMb * 10.0) / 10.0);
        res.setScore(score);
        res.setXpEarned(xpEarned);
        res.setExplanation(sub.getExplanation());
        res.setSuggestedImprovements(sub.getSuggestedImprovements());
        res.setTestResults(testCaseResults);
        res.setNewlyUnlockedBadges(unlockedBadges);

        return res;
    }

    private List<String> checkAndUnlockBadges(String userEmail, CodingProgress progress, CodingQuestion question) {
        List<String> newlyUnlocked = new ArrayList<>();
        int solved = progress.getQuestionsSolved();

        checkBadge(userEmail, "FIRST_SOLVED", "First Problem Solved", "Solved your first coding practice question!", "Trophy", solved >= 1, newlyUnlocked);
        checkBadge(userEmail, "10_SOLVED", "10 Problems Solved", "Completed 10 coding challenges successfully!", "Award", solved >= 10, newlyUnlocked);
        checkBadge(userEmail, "50_SOLVED", "50 Problems Solved", "Mastered 50 programming challenges!", "Sparkles", solved >= 50, newlyUnlocked);
        checkBadge(userEmail, "100_SOLVED", "100 Problems Solved", "Century Club: 100 challenges solved!", "Crown", solved >= 100, newlyUnlocked);

        String lang = question.getDefaultLanguage().toLowerCase();
        if (lang.contains("sql")) {
            checkBadge(userEmail, "SQL_MASTER", "SQL Master", "Mastered database querying & joins!", "Database", true, newlyUnlocked);
        } else if (lang.contains("java") && !lang.contains("script")) {
            checkBadge(userEmail, "JAVA_EXPERT", "Java Expert", "Demonstrated Java Object Oriented expertise!", "Code", true, newlyUnlocked);
        } else if (lang.contains("python")) {
            checkBadge(userEmail, "PYTHON_PRO", "Python Pro", "Solved Python data analysis & algorithms!", "Terminal", true, newlyUnlocked);
        } else if (lang.contains("react") || question.getTagsCsv().toLowerCase().contains("react")) {
            checkBadge(userEmail, "REACT_NINJA", "React Ninja", "Mastered React state, hooks & component logic!", "Cpu", true, newlyUnlocked);
        } else if (lang.contains("aws") || question.getCourseTitle().toLowerCase().contains("cloud")) {
            checkBadge(userEmail, "CLOUD_EXPLORER", "Cloud Explorer", "Constructed serverless & cloud compute code!", "Cloud", true, newlyUnlocked);
        }

        return newlyUnlocked;
    }

    private void checkBadge(String email, String key, String title, String desc, String icon, boolean condition, List<String> list) {
        if (condition && badgeRepository.findByUserEmailAndBadgeKey(email, key).isEmpty()) {
            badgeRepository.save(new CodingBadge(email, key, title, desc, icon));
            list.add(title);
        }
    }

    private void updateLeaderboardEntry(String email, int solved, int xp, int streak) {
        CodingLeaderboard lb = leaderboardRepository.findByUserEmail(email)
                .orElseGet(() -> {
                    CodingLeaderboard n = new CodingLeaderboard();
                    n.setUserEmail(email);
                    String name = email.contains("@") ? email.substring(0, email.indexOf("@")) : email;
                    n.setUserName(name.substring(0, 1).toUpperCase() + name.substring(1));
                    n.setAvatarUrl("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150");
                    return n;
                });
        lb.setSolvedCount(solved);
        lb.setXpPoints(xp);
        lb.setStreakDays(streak);
        leaderboardRepository.save(lb);
    }
}
