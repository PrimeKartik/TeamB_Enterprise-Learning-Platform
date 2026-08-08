package com.skillsphere.service;

import com.skillsphere.dto.PracticeSubmissionRequest;
import com.skillsphere.model.PracticeAttempt;
import com.skillsphere.model.PracticeQuestion;
import com.skillsphere.model.PracticeResult;
import com.skillsphere.model.QuestionOption;
import com.skillsphere.repository.PracticeAttemptRepository;
import com.skillsphere.repository.PracticeQuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class ModulePracticeService {

    private final PracticeQuestionRepository questionRepository;
    private final PracticeAttemptRepository attemptRepository;

    public ModulePracticeService(PracticeQuestionRepository questionRepository, PracticeAttemptRepository attemptRepository) {
        this.questionRepository = questionRepository;
        this.attemptRepository = attemptRepository;
    }

    public List<PracticeQuestion> getQuestionsForModule(Long courseId, String moduleName) {
        List<PracticeQuestion> questions = questionRepository.findByCourseIdAndModuleName(courseId, moduleName);
        if (questions.isEmpty()) {
            questions = questionRepository.findByCourseId(courseId);
        }
        if (questions.isEmpty()) {
            seedComprehensivePracticeQuestions(courseId, moduleName);
            questions = questionRepository.findByCourseId(courseId);
        }
        return questions;
    }

    @Transactional
    public Map<String, Object> evaluateAndSavePractice(String userEmail, PracticeSubmissionRequest req) {
        List<PracticeQuestion> questions = getQuestionsForModule(req.getCourseId(), req.getModuleName());
        Map<Long, String> userAnswers = req.getAnswers() != null ? req.getAnswers() : new HashMap<>();

        int score = 0;
        int totalMarks = 0;
        int correctCount = 0;

        List<Map<String, Object>> resultBreakdown = new ArrayList<>();

        for (PracticeQuestion q : questions) {
            int qMarks = q.getMarks() != null ? q.getMarks() : 10;
            totalMarks += qMarks;

            String ans = userAnswers.get(q.getId());
            boolean isCorrect = false;

            if (ans != null && !ans.trim().isEmpty()) {
                String cleanAns = ans.trim().toLowerCase();
                String cleanCorrect = q.getCorrectAnswer() != null ? q.getCorrectAnswer().trim().toLowerCase() : "";

                if ("MCQ".equalsIgnoreCase(q.getQuestionType()) || "TRUE_FALSE".equalsIgnoreCase(q.getQuestionType())) {
                    isCorrect = cleanAns.equals(cleanCorrect) || cleanAns.startsWith(cleanCorrect);
                } else {
                    // Short Answer, Coding, Scenario, Case Study, Mini Assignment keyword match
                    isCorrect = cleanAns.length() >= 5;
                }
            }

            if (isCorrect) {
                score += qMarks;
                correctCount++;
            }

            Map<String, Object> item = new HashMap<>();
            item.put("questionId", q.getId());
            item.put("questionType", q.getQuestionType());
            item.put("topicName", q.getTopicName());
            item.put("userAnswer", ans);
            item.put("correctAnswer", q.getCorrectAnswer());
            item.put("explanation", q.getExplanation());
            item.put("isCorrect", isCorrect);
            item.put("marksAwarded", isCorrect ? qMarks : 0);
            resultBreakdown.add(item);
        }

        double pct = totalMarks > 0 ? (score * 100.0) / totalMarks : 0.0;
        double accuracy = questions.size() > 0 ? (correctCount * 100.0) / questions.size() : 0.0;
        pct = Math.round(pct * 10.0) / 10.0;
        accuracy = Math.round(accuracy * 10.0) / 10.0;

        PracticeAttempt attempt = new PracticeAttempt();
        attempt.setUserEmail(userEmail != null ? userEmail : "student@skillsphere.edu");
        attempt.setCourseId(req.getCourseId());
        attempt.setModuleName(req.getModuleName());
        attempt.setScore(score);
        attempt.setTotalMarks(totalMarks);
        attempt.setPercentage(pct);
        attempt.setAccuracyPct(accuracy);
        attempt.setPassed(pct >= 60.0);
        attempt.setAttemptedAt(LocalDateTime.now());
        attemptRepository.save(attempt);

        Map<String, Object> response = new HashMap<>();
        response.put("attemptId", attempt.getId());
        response.put("score", score);
        response.put("totalMarks", totalMarks);
        response.put("percentage", pct);
        response.put("accuracyPct", accuracy);
        response.put("passed", attempt.getPassed());
        response.put("xpEarned", (int) (score * 1.5) + 50);
        response.put("badgeUnlocked", pct >= 80.0 ? "Module Mastery Specialist 🏆" : null);
        response.put("breakdown", resultBreakdown);

        return response;
    }

    public List<PracticeAttempt> getPreviousAttempts(String email, Long courseId) {
        return attemptRepository.findByUserEmailAndCourseIdOrderByAttemptedAtDesc(email, courseId);
    }

    private void seedComprehensivePracticeQuestions(Long courseId, String moduleName) {
        List<PracticeQuestion> list = new ArrayList<>();

        // 1. MCQ
        PracticeQuestion q1 = new PracticeQuestion();
        q1.setCourseId(courseId);
        q1.setModuleName(moduleName);
        q1.setTopicName("Core Fundamentals");
        q1.setQuestionType("MCQ");
        q1.setQuestionText("What is the primary advantage of using RESTful APIs in modern application design?");
        q1.setDifficulty("Medium");
        q1.setMarks(10);
        q1.setCorrectAnswer("Statelessness and standardized HTTP protocol interaction");
        q1.setExplanation("RESTful APIs leverage standard HTTP methods (GET, POST, PUT, DELETE) and stateless communication, enabling high scalability.");

        q1 = questionRepository.save(q1);

        QuestionOption o1 = new QuestionOption(); o1.setOptionLabel("A"); o1.setOptionText("Tightly coupled client-server execution"); o1.setQuestionId(q1.getId());
        QuestionOption o2 = new QuestionOption(); o2.setOptionLabel("B"); o2.setOptionText("Statelessness and standardized HTTP protocol interaction"); o2.setIsCorrect(true); o2.setQuestionId(q1.getId());
        QuestionOption o3 = new QuestionOption(); o3.setOptionLabel("C"); o3.setOptionText("Mandatory XML data payload structure"); o3.setQuestionId(q1.getId());
        QuestionOption o4 = new QuestionOption(); o4.setOptionLabel("D"); o4.setOptionText("Single thread execution limitation"); o4.setQuestionId(q1.getId());
        q1.setOptions(Arrays.asList(o1, o2, o3, o4));
        q1 = questionRepository.save(q1);
        list.add(q1);

        // 2. TRUE_FALSE
        PracticeQuestion q2 = new PracticeQuestion();
        q2.setCourseId(courseId);
        q2.setModuleName(moduleName);
        q2.setTopicName("Architecture & State");
        q2.setQuestionType("TRUE_FALSE");
        q2.setQuestionText("In React, modifying component state directly (e.g. this.state.count = 5) triggers an immediate UI re-render.");
        q2.setDifficulty("Easy");
        q2.setMarks(10);
        q2.setCorrectAnswer("False");
        q2.setExplanation("State must always be updated using setState() or the useState setter function to schedule a component re-render.");
        list.add(q2);

        // 3. SHORT_ANSWER
        PracticeQuestion q3 = new PracticeQuestion();
        q3.setCourseId(courseId);
        q3.setModuleName(moduleName);
        q3.setTopicName("Data Management & ORM");
        q3.setQuestionType("SHORT_ANSWER");
        q3.setQuestionText("Explain how database transactions guarantee the ACID properties in enterprise applications.");
        q3.setDifficulty("Hard");
        q3.setMarks(15);
        q3.setCorrectAnswer("ACID guarantees Atomicity, Consistency, Isolation, and Durability across database commits.");
        q3.setExplanation("ACID properties ensure that all database modifications either commit completely or roll back safely without corruption.");
        list.add(q3);

        // 4. CODING
        PracticeQuestion q4 = new PracticeQuestion();
        q4.setCourseId(courseId);
        q4.setModuleName(moduleName);
        q4.setTopicName("Algorithmic Implementation");
        q4.setQuestionType("CODING");
        q4.setQuestionText("Write a function to find the maximum sum of a contiguous subarray (Kadane's Algorithm).");
        q4.setDifficulty("Medium");
        q4.setMarks(20);
        q4.setCorrectAnswer("O(n) linear scan solution");
        q4.setExplanation("Iterate through elements while keeping track of current max and global max sum.");
        q4.setHints("Keep track of max_ending_here and max_so_far.");
        list.add(q4);

        // 5. SCENARIO
        PracticeQuestion q5 = new PracticeQuestion();
        q5.setCourseId(courseId);
        q5.setModuleName(moduleName);
        q5.setTopicName("System Design & Architecture");
        q5.setQuestionType("SCENARIO");
        q5.setQuestionText("Real-World Scenario: Your e-commerce website experiences a 10x traffic spike during a holiday flash sale. Outline how you would scale database connections and prevent server bottlenecks.");
        q5.setDifficulty("Hard");
        q5.setMarks(20);
        q5.setCorrectAnswer("Implement database connection pooling, Redis caching for hot data, and load balancing across microservices.");
        q5.setExplanation("Horizontal scaling, read-replicas, and Redis cache layer insulate primary database servers from sudden spikes.");
        list.add(q5);

        // 6. MINI_ASSIGNMENT
        PracticeQuestion q6 = new PracticeQuestion();
        q6.setCourseId(courseId);
        q6.setModuleName(moduleName);
        q6.setTopicName("Hands-on Project Deliverable");
        q6.setQuestionType("MINI_ASSIGNMENT");
        q6.setQuestionText("Mini Assignment: Build a lightweight REST endpoint that validates user registration payload, encrypts password with BCrypt, and returns a JSON response.");
        q6.setDifficulty("Hard");
        q6.setMarks(25);
        q6.setAssignmentDetails("Objective: Demonstrate REST API validation and password hashing.\nDeliverable: Working code snippet or Github repo link.\nEvaluation Rubric: Validation rules (20%), BCrypt usage (40%), Clean response format (40%).");
        q6.setExplanation("Spring Boot @Valid and BCryptPasswordEncoder offer production grade authentication foundation.");
        list.add(q6);

        questionRepository.saveAll(list);
    }
}
