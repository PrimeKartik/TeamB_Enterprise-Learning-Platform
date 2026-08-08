package com.skillsphere.controller;

import com.skillsphere.model.CareerRoadmap;
import com.skillsphere.repository.CareerRoadmapRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/career-roadmaps")
public class CareerRoadmapController {

    private final CareerRoadmapRepository roadmapRepository;

    public CareerRoadmapController(CareerRoadmapRepository roadmapRepository) {
        this.roadmapRepository = roadmapRepository;
    }

    @GetMapping
    public ResponseEntity<List<CareerRoadmap>> getAllRoadmaps() {
        List<CareerRoadmap> list = roadmapRepository.findAll();
        if (list.isEmpty()) {
            list = seedDefaultRoadmaps();
        }
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{roleKey}")
    public ResponseEntity<CareerRoadmap> getRoadmapByRole(@PathVariable String roleKey) {
        CareerRoadmap roadmap = roadmapRepository.findByRoleKey(roleKey)
                .orElseGet(() -> {
                    List<CareerRoadmap> seeded = seedDefaultRoadmaps();
                    return seeded.stream().filter(r -> r.getRoleKey().equalsIgnoreCase(roleKey)).findFirst().orElse(seeded.get(0));
                });
        return ResponseEntity.ok(roadmap);
    }

    private List<CareerRoadmap> seedDefaultRoadmaps() {
        List<CareerRoadmap> list = new ArrayList<>();

        String[] roles = {
            "fullstack:Full Stack Developer:6 Months",
            "java:Java Backend Specialist:5 Months",
            "frontend:Frontend Architect (React & Web3):4 Months",
            "backend:Microservices & Cloud Backend:5 Months",
            "python:Python & AI Engineer:6 Months",
            "data-analyst:Data Analyst & BI Specialist:4 Months",
            "data-scientist:Data Scientist & ML Engineer:7 Months",
            "cloud:Cloud Solutions Architect (AWS/GCP):5 Months",
            "devops:DevOps & CI/CD Engineer:5 Months",
            "ui-ux:UI/UX & Product Designer:3 Months",
            "qa-engineer:Software Test & QA Automation:4 Months"
        };

        for (String r : roles) {
            String[] parts = r.split(":");
            String key = parts[0];
            String title = parts[1];
            String duration = parts[2];

            CareerRoadmap roadmap = new CareerRoadmap();
            roadmap.setRoleKey(key);
            roadmap.setTitle(title);
            roadmap.setEstimatedDuration(duration);
            roadmap.setDescription("Structured mastery path covering foundational to enterprise-level production skills for " + title + ".");
            roadmap.setRequiredSkillsJson("[\"HTML/CSS/JS\", \"Data Structures & Algorithms\", \"Git/GitHub\", \"REST APIs\", \"Database Design\"]");
            roadmap.setRecommendedCoursesJson("[\"Full Stack Development\", \"Database Management\", \"Java Enterprise Systems\"]");
            roadmap.setRecommendedCertificationsJson("[\"SkillSphere Certified " + title + "\", \"AWS Certified Developer\"]");
            roadmap.setCodingPracticeTopicsJson("[\"Arrays & Strings\", \"Linked Lists & Trees\", \"Dynamic Programming\", \"System Design\"]");
            roadmap.setProjectsJson("[\"E-Commerce Microservices Platform\", \"Real-Time Analytics Dashboard\", \"Automated CI/CD Pipeline\"]");
            roadmap.setInterviewPrepJson("[\"Top 50 Behavioral & Technical Questions\", \"Live System Design Mock Interviews\", \"LeetCode Medium Speed Run\"]");

            roadmapRepository.save(roadmap);
            list.add(roadmap);
        }

        return list;
    }
}
