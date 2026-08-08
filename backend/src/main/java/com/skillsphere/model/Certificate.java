package com.skillsphere.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "certificates")
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "certificate_id", nullable = false, unique = true, length = 50)
    private String certificateId; // Also credentialId (SSLN-2026-XXXXXX)

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "course_name")
    private String courseName;

    @Column(name = "completion_percentage")
    private Double completionPercentage = 100.0;

    @Column(length = 10)
    private String grade = "A+";

    @Column(name = "issue_date", nullable = false)
    private LocalDateTime issueDate = LocalDateTime.now();


    @Column(name = "completion_date")
    private LocalDateTime completionDate = LocalDateTime.now();

    @Column(name = "duration", length = 50)
    private String duration;

    @Column(name = "learning_hours", length = 50)
    private String learningHours;

    @Column(name = "level", length = 50)
    private String level;

    @Column(name = "instructor", length = 255)
    private String instructor;

    @Column(name = "qr_code", length = 500)
    private String qrCode;

    @Column(name = "verification_token", length = 255)
    private String verificationToken;

    @Column(length = 20)
    private String status = "VERIFIED";

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Certificate() {
    }

    public Certificate(User student, Course course, String certificateId, String grade) {
        this.student = student;
        this.course = course;
        this.certificateId = certificateId;
        this.studentName = student != null ? student.getName() : "Student";
        this.courseName = course != null ? course.getTitle() : "Course";
        this.instructor = (course != null && course.getInstructor() != null) ? course.getInstructor() : "Dr. Alex Morgan";
        this.duration = (course != null && course.getDuration() != null) ? course.getDuration() : "8 Weeks";
        this.learningHours = "40 Hours";
        this.level = (course != null && course.getLevel() != null) ? course.getLevel() : "Intermediate";
        this.grade = (grade != null && !grade.isBlank()) ? grade : "A+";
        this.completionPercentage = 100.0;
        this.issueDate = LocalDateTime.now();
        this.completionDate = LocalDateTime.now();
        this.verificationToken = certificateId;
        this.qrCode = "/certificates/verify/" + certificateId;
        this.status = "VERIFIED";
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PrePersist
    public void onCreate() {
        if (this.createdAt == null) this.createdAt = LocalDateTime.now();
        if (this.updatedAt == null) this.updatedAt = LocalDateTime.now();
        if (this.issueDate == null) this.issueDate = LocalDateTime.now();
        if (this.completionDate == null) this.completionDate = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCertificateId() { return certificateId; }
    public void setCertificateId(String certificateId) { this.certificateId = certificateId; }

    // Alias helper for credentialId
    public String getCredentialId() { return certificateId; }
    public void setCredentialId(String credentialId) { this.certificateId = credentialId; }

    public User getStudent() { return student; }
    public void setStudent(User student) {
        this.student = student;
        if (student != null && (this.studentName == null || this.studentName.isBlank())) {
            this.studentName = student.getName();
        }
    }

    public Course getCourse() { return course; }
    public void setCourse(Course course) {
        this.course = course;
        if (course != null && (this.courseName == null || this.courseName.isBlank())) {
            this.courseName = course.getTitle();
        }
    }

    public String getStudentName() {
        return (studentName != null && !studentName.isBlank())
                ? studentName
                : (student != null ? student.getName() : "Student");
    }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getCourseName() {
        return (courseName != null && !courseName.isBlank())
                ? courseName
                : (course != null ? course.getTitle() : "Course");
    }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public Double getCompletionPercentage() { return completionPercentage != null ? completionPercentage : 100.0; }
    public void setCompletionPercentage(Double completionPercentage) { this.completionPercentage = completionPercentage; }

    public String getGrade() { return grade != null ? grade : "A+"; }
    public void setGrade(String grade) { this.grade = grade; }

    public LocalDateTime getIssueDate() { return issueDate; }
    public void setIssueDate(LocalDateTime issueDate) { this.issueDate = issueDate; }

    public LocalDateTime getCompletionDate() { return completionDate; }
    public void setCompletionDate(LocalDateTime completionDate) { this.completionDate = completionDate; }

    public String getDuration() { return duration != null ? duration : "8 Weeks"; }
    public void setDuration(String duration) { this.duration = duration; }

    // Alias for backward compatibility
    public String getCourseDuration() { return getDuration(); }
    public void setCourseDuration(String duration) { setDuration(duration); }

    public String getLearningHours() { return learningHours != null ? learningHours : "40 Hours"; }
    public void setLearningHours(String learningHours) { this.learningHours = learningHours; }

    public String getLevel() { return level != null ? level : "Intermediate"; }
    public void setLevel(String level) { this.level = level; }

    public String getInstructor() { return instructor != null ? instructor : "Dr. Alex Morgan"; }
    public void setInstructor(String instructor) { this.instructor = instructor; }

    // Alias for backward compatibility
    public String getInstructorName() { return getInstructor(); }
    public void setInstructorName(String instructor) { setInstructor(instructor); }

    public String getQrCode() { return qrCode; }
    public void setQrCode(String qrCode) { this.qrCode = qrCode; }

    public String getVerificationToken() { return verificationToken; }
    public void setVerificationToken(String verificationToken) { this.verificationToken = verificationToken; }

    public String getStatus() { return status != null ? status : "VERIFIED"; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

