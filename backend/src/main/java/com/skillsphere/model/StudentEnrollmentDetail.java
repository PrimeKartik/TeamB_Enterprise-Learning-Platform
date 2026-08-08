package com.skillsphere.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_enrollments")
public class StudentEnrollmentDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "student_name", nullable = false)
    private String studentName;

    @Column(nullable = false)
    private String email;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "college_name")
    private String collegeName = "SkillSphere University";

    @Column(name = "course_name", nullable = false)
    private String courseName;

    @Column(name = "instructor_name")
    private String instructorName = "Dr. Alex Morgan";

    @Column(name = "enrollment_date")
    private LocalDateTime enrollmentDate = LocalDateTime.now();

    @Column(name = "current_module")
    private String currentModule = "Module 1: Fundamentals";

    @Column(name = "lessons_completed")
    private Integer lessonsCompleted = 0;

    @Column(name = "total_lessons")
    private Integer totalLessons = 24;

    @Column(name = "modules_completed")
    private Integer modulesCompleted = 0;

    @Column(name = "total_modules")
    private Integer totalModules = 6;

    @Column(name = "completion_percentage")
    private Double completionPercentage = 0.0;

    @Column(name = "avg_quiz_score")
    private Double avgQuizScore = 0.0;

    @Column(name = "coding_score")
    private Double codingScore = 0.0;

    @Column(name = "certificate_status")
    private String certificateStatus = "Not Generated"; // Generated, Not Generated

    @Column(name = "last_active")
    private LocalDateTime lastActive = LocalDateTime.now();

    @Column(name = "learning_status")
    private String learningStatus = "In Progress"; // Not Started, In Progress, Completed

    @Column(name = "quizzes_attempted")
    private Integer quizzesAttempted = 0;

    @Column(name = "problems_solved")
    private Integer problemsSolved = 0;

    @Column(name = "easy_solved")
    private Integer easySolved = 0;

    @Column(name = "medium_solved")
    private Integer mediumSolved = 0;

    @Column(name = "hard_solved")
    private Integer hardSolved = 0;

    @Column(name = "total_xp")
    private Integer totalXp = 0;

    @Column(name = "time_spent_hours")
    private Double timeSpentHours = 0.0;

    @Column(name = "current_lesson")
    private String currentLesson = "Lesson 1.1: Architecture Overview";

    public StudentEnrollmentDetail() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }

    public String getCollegeName() { return collegeName; }
    public void setCollegeName(String collegeName) { this.collegeName = collegeName; }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public String getInstructorName() { return instructorName; }
    public void setInstructorName(String instructorName) { this.instructorName = instructorName; }

    public LocalDateTime getEnrollmentDate() { return enrollmentDate; }
    public void setEnrollmentDate(LocalDateTime enrollmentDate) { this.enrollmentDate = enrollmentDate; }

    public String getCurrentModule() { return currentModule; }
    public void setCurrentModule(String currentModule) { this.currentModule = currentModule; }

    public Integer getLessonsCompleted() { return lessonsCompleted; }
    public void setLessonsCompleted(Integer lessonsCompleted) { this.lessonsCompleted = lessonsCompleted; }

    public Integer getTotalLessons() { return totalLessons; }
    public void setTotalLessons(Integer totalLessons) { this.totalLessons = totalLessons; }

    public Integer getModulesCompleted() { return modulesCompleted; }
    public void setModulesCompleted(Integer modulesCompleted) { this.modulesCompleted = modulesCompleted; }

    public Integer getTotalModules() { return totalModules; }
    public void setTotalModules(Integer totalModules) { this.totalModules = totalModules; }

    public Double getCompletionPercentage() { return completionPercentage; }
    public void setCompletionPercentage(Double completionPercentage) { this.completionPercentage = completionPercentage; }

    public Double getAvgQuizScore() { return avgQuizScore; }
    public void setAvgQuizScore(Double avgQuizScore) { this.avgQuizScore = avgQuizScore; }

    public Double getCodingScore() { return codingScore; }
    public void setCodingScore(Double codingScore) { this.codingScore = codingScore; }

    public String getCertificateStatus() { return certificateStatus; }
    public void setCertificateStatus(String certificateStatus) { this.certificateStatus = certificateStatus; }

    public LocalDateTime getLastActive() { return lastActive; }
    public void setLastActive(LocalDateTime lastActive) { this.lastActive = lastActive; }

    public String getLearningStatus() { return learningStatus; }
    public void setLearningStatus(String learningStatus) { this.learningStatus = learningStatus; }

    public Integer getQuizzesAttempted() { return quizzesAttempted; }
    public void setQuizzesAttempted(Integer quizzesAttempted) { this.quizzesAttempted = quizzesAttempted; }

    public Integer getProblemsSolved() { return problemsSolved; }
    public void setProblemsSolved(Integer problemsSolved) { this.problemsSolved = problemsSolved; }

    public Integer getEasySolved() { return easySolved; }
    public void setEasySolved(Integer easySolved) { this.easySolved = easySolved; }

    public Integer getMediumSolved() { return mediumSolved; }
    public void setMediumSolved(Integer mediumSolved) { this.mediumSolved = mediumSolved; }

    public Integer getHardSolved() { return hardSolved; }
    public void setHardSolved(Integer hardSolved) { this.hardSolved = hardSolved; }

    public Integer getTotalXp() { return totalXp; }
    public void setTotalXp(Integer totalXp) { this.totalXp = totalXp; }

    public Double getTimeSpentHours() { return timeSpentHours; }
    public void setTimeSpentHours(Double timeSpentHours) { this.timeSpentHours = timeSpentHours; }

    public String getCurrentLesson() { return currentLesson; }
    public void setCurrentLesson(String currentLesson) { this.currentLesson = currentLesson; }
}
