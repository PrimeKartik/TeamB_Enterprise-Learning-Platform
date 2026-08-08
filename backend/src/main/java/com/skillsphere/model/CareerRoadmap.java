package com.skillsphere.model;

import jakarta.persistence.*;

@Entity
@Table(name = "career_roadmaps")
public class CareerRoadmap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String roleKey; // fullstack, java, frontend, backend, python, data-analyst, data-scientist, cloud, devops, ui-ux, qa-engineer

    @Column(nullable = false)
    private String title; // Full Stack Developer

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "estimated_duration")
    private String estimatedDuration; // 6 Months

    @Column(columnDefinition = "TEXT")
    private String requiredSkillsJson; // JSON array of skills

    @Column(columnDefinition = "TEXT")
    private String recommendedCoursesJson; // JSON array of course titles/ids

    @Column(columnDefinition = "TEXT")
    private String recommendedCertificationsJson;

    @Column(columnDefinition = "TEXT")
    private String codingPracticeTopicsJson;

    @Column(columnDefinition = "TEXT")
    private String projectsJson;

    @Column(columnDefinition = "TEXT")
    private String interviewPrepJson;

    public CareerRoadmap() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRoleKey() { return roleKey; }
    public void setRoleKey(String roleKey) { this.roleKey = roleKey; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getEstimatedDuration() { return estimatedDuration; }
    public void setEstimatedDuration(String estimatedDuration) { this.estimatedDuration = estimatedDuration; }

    public String getRequiredSkillsJson() { return requiredSkillsJson; }
    public void setRequiredSkillsJson(String requiredSkillsJson) { this.requiredSkillsJson = requiredSkillsJson; }

    public String getRecommendedCoursesJson() { return recommendedCoursesJson; }
    public void setRecommendedCoursesJson(String recommendedCoursesJson) { this.recommendedCoursesJson = recommendedCoursesJson; }

    public String getRecommendedCertificationsJson() { return recommendedCertificationsJson; }
    public void setRecommendedCertificationsJson(String recommendedCertificationsJson) { this.recommendedCertificationsJson = recommendedCertificationsJson; }

    public String getCodingPracticeTopicsJson() { return codingPracticeTopicsJson; }
    public void setCodingPracticeTopicsJson(String codingPracticeTopicsJson) { this.codingPracticeTopicsJson = codingPracticeTopicsJson; }

    public String getProjectsJson() { return projectsJson; }
    public void setProjectsJson(String projectsJson) { this.projectsJson = projectsJson; }

    public String getInterviewPrepJson() { return interviewPrepJson; }
    public void setInterviewPrepJson(String interviewPrepJson) { this.interviewPrepJson = interviewPrepJson; }
}
