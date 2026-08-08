package com.skillsphere.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "practice_questions")
public class PracticeQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "course_id", nullable = false)
    private Long courseId;

    @Column(name = "module_name", nullable = false)
    private String moduleName;

    @Column(name = "topic_name", nullable = false)
    private String topicName;

    @Column(name = "question_type", nullable = false)
    private String questionType; // MCQ, TRUE_FALSE, SHORT_ANSWER, CODING, SCENARIO, CASE_STUDY, MINI_ASSIGNMENT

    @Column(name = "question_text", columnDefinition = "TEXT", nullable = false)
    private String questionText;

    private String difficulty = "Medium"; // Easy, Medium, Hard
    private Integer marks = 10;

    @Column(name = "correct_answer", columnDefinition = "TEXT")
    private String correctAnswer;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    @Column(columnDefinition = "TEXT")
    private String hints;

    @Column(name = "scenario_details", columnDefinition = "TEXT")
    private String scenarioDetails;

    @Column(name = "assignment_details", columnDefinition = "TEXT")
    private String assignmentDetails;

    @Column(name = "evaluation_criteria", columnDefinition = "TEXT")
    private String evaluationCriteria;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "questionId", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<QuestionOption> options = new ArrayList<>();

    public PracticeQuestion() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public String getModuleName() { return moduleName; }
    public void setModuleName(String moduleName) { this.moduleName = moduleName; }

    public String getTopicName() { return topicName; }
    public void setTopicName(String topicName) { this.topicName = topicName; }

    public String getQuestionType() { return questionType; }
    public void setQuestionType(String questionType) { this.questionType = questionType; }

    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public Integer getMarks() { return marks; }
    public void setMarks(Integer marks) { this.marks = marks; }

    public String getCorrectAnswer() { return correctAnswer; }
    public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getHints() { return hints; }
    public void setHints(String hints) { this.hints = hints; }

    public String getScenarioDetails() { return scenarioDetails; }
    public void setScenarioDetails(String scenarioDetails) { this.scenarioDetails = scenarioDetails; }

    public String getAssignmentDetails() { return assignmentDetails; }
    public void setAssignmentDetails(String assignmentDetails) { this.assignmentDetails = assignmentDetails; }

    public String getEvaluationCriteria() { return evaluationCriteria; }
    public void setEvaluationCriteria(String evaluationCriteria) { this.evaluationCriteria = evaluationCriteria; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<QuestionOption> getOptions() { return options; }
    public void setOptions(List<QuestionOption> options) { this.options = options; }
}
