package com.skillsphere.dto;

import com.skillsphere.model.Certificate;
import java.time.format.DateTimeFormatter;

public class CertificateDTO {

    private Long id;
    private Long studentId;
    private Long courseId;
    private String studentName;
    private String studentEmail;
    private String courseName;
    private String courseTitle;
    private String instructor;
    private String instructorName;
    private String certificateId;
    private String credentialId;
    private Double completionPercentage;
    private String grade;
    private String issueDate;
    private String completionDate;
    private String duration;
    private String courseDuration;
    private String learningHours;
    private String level;
    private String qrCode;
    private String verificationToken;
    private String status;

    public CertificateDTO(Certificate c) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM d, yyyy");
        this.id = c.getId();
        this.studentId = c.getStudent() != null ? c.getStudent().getId() : null;
        this.courseId = c.getCourse() != null ? c.getCourse().getId() : null;
        this.studentName = c.getStudentName();
        this.studentEmail = c.getStudent() != null ? c.getStudent().getEmail() : "";
        this.courseName = c.getCourseName();
        this.courseTitle = c.getCourseName();
        this.instructor = c.getInstructor();
        this.instructorName = c.getInstructor();
        this.certificateId = c.getCertificateId();
        this.credentialId = c.getCertificateId();
        this.completionPercentage = c.getCompletionPercentage();
        this.grade = c.getGrade();
        this.issueDate = c.getIssueDate() != null ? c.getIssueDate().format(formatter) : "";
        this.completionDate = c.getCompletionDate() != null ? c.getCompletionDate().format(formatter) : this.issueDate;
        this.duration = c.getDuration();
        this.courseDuration = c.getDuration();
        this.learningHours = c.getLearningHours();
        this.level = c.getLevel();
        this.qrCode = c.getQrCode();
        this.verificationToken = c.getVerificationToken();
        this.status = c.getStatus() != null ? c.getStatus() : "VERIFIED";
    }

    public Long getId() { return id; }
    public Long getStudentId() { return studentId; }
    public Long getCourseId() { return courseId; }
    public String getStudentName() { return studentName; }
    public String getStudentEmail() { return studentEmail; }
    public String getCourseName() { return courseName; }
    public String getCourseTitle() { return courseTitle; }
    public String getInstructor() { return instructor; }
    public String getInstructorName() { return instructorName; }
    public String getCertificateId() { return certificateId; }
    public String getCredentialId() { return credentialId; }
    public Double getCompletionPercentage() { return completionPercentage; }
    public String getGrade() { return grade; }
    public String getIssueDate() { return issueDate; }
    public String getCompletionDate() { return completionDate; }
    public String getDuration() { return duration; }
    public String getCourseDuration() { return courseDuration; }
    public String getLearningHours() { return learningHours; }
    public String getLevel() { return level; }
    public String getQrCode() { return qrCode; }
    public String getVerificationToken() { return verificationToken; }
    public String getStatus() { return status; }
}

