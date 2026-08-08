package com.skillsphere.service;

import com.skillsphere.dto.LessonDTO;
import com.skillsphere.dto.ModuleDTO;
import com.skillsphere.model.Course;
import com.skillsphere.model.CourseModule;
import com.skillsphere.model.Enrollment;
import com.skillsphere.model.Lesson;
import com.skillsphere.model.LessonProgress;
import com.skillsphere.repository.CourseModuleRepository;
import com.skillsphere.repository.CourseRepository;
import com.skillsphere.repository.EnrollmentRepository;
import com.skillsphere.repository.LessonProgressRepository;
import com.skillsphere.repository.LessonRepository;
import com.skillsphere.repository.ModuleQuizRepository;
import com.skillsphere.service.ModuleQuizService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ModuleServiceImpl implements ModuleService {

    private final CourseModuleRepository moduleRepository;
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final LessonProgressRepository lessonProgressRepository;
    private final ModuleQuizRepository quizRepository;

    public ModuleServiceImpl(
            CourseModuleRepository moduleRepository,
            CourseRepository courseRepository,
            LessonRepository lessonRepository,
            EnrollmentRepository enrollmentRepository,
            LessonProgressRepository lessonProgressRepository,
            ModuleQuizRepository quizRepository) {

        this.moduleRepository = moduleRepository;
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.lessonProgressRepository = lessonProgressRepository;
        this.quizRepository = quizRepository;
    }

    @Override
    @Transactional
    public List<ModuleDTO> getModulesByCourse(Long courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new RuntimeException("Course not found");
        }

        ensureModulesExist(courseId);

        return moduleRepository
                .findByCourseIdOrderByModuleOrderAsc(courseId)
                .stream()
                .map(module -> convertToPublicDTO(module))
                .toList();
    }

    @Override
    @Transactional
    public List<ModuleDTO> getModulesWithLessons(
            Long courseId,
            Authentication authentication) {

        String email = authentication.getName();

        Enrollment enrollment = enrollmentRepository
                .findByUser_EmailAndCourse_Id(email, courseId)
                .orElse(null);

        ensureModulesExist(courseId);

        return moduleRepository
                .findByCourseIdOrderByModuleOrderAsc(courseId)
                .stream()
                .map(module -> convertToEnrolledDTO(module, enrollment))
                .toList();
    }

    @Override
    @Transactional
    public ModuleDTO createModule(Long courseId, CourseModule module) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        module.setId(null);
        module.setCourse(course);

        CourseModule saved = moduleRepository.save(module);

        return convertToPublicDTO(saved);
    }

    @Override
    @Transactional
    public ModuleDTO updateModule(Long moduleId, CourseModule updated) {
        CourseModule existing = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module not found"));

        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setModuleOrder(updated.getModuleOrder());
        existing.setYoutubeLink(updated.getYoutubeLink());
        existing.setReferenceBook(updated.getReferenceBook());

        CourseModule saved = moduleRepository.save(existing);

        return convertToPublicDTO(saved);
    }

    @Override
    @Transactional
    public void deleteModule(Long moduleId) {
        CourseModule module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module not found"));

        lessonRepository.deleteByModuleId(moduleId);
        moduleRepository.delete(module);
    }

    private ModuleDTO convertToPublicDTO(CourseModule module) {
        ModuleDTO dto = new ModuleDTO();
        dto.setId(module.getId());
        dto.setTitle(module.getTitle());
        dto.setDescription(module.getDescription());
        dto.setModuleOrder(module.getModuleOrder());
        dto.setYoutubeLink(module.getYoutubeLink());
        dto.setReferenceBook(module.getReferenceBook());

        List<LessonDTO> lessons = lessonRepository
                .findByModuleIdOrderByLessonOrderAsc(module.getId())
                .stream()
                .map(this::convertLessonToPublicDTO)
                .toList();

        dto.setLessons(lessons);

        quizRepository.findByModuleId(module.getId()).ifPresent(quiz -> {
            dto.setQuiz(ModuleQuizService.mapToDTO(quiz));
        });

        return dto;
    }

    private ModuleDTO convertToEnrolledDTO(
            CourseModule module,
            Enrollment enrollment) {

        ModuleDTO dto = new ModuleDTO();
        dto.setId(module.getId());
        dto.setTitle(module.getTitle());
        dto.setDescription(module.getDescription());
        dto.setModuleOrder(module.getModuleOrder());
        dto.setYoutubeLink(module.getYoutubeLink());
        dto.setReferenceBook(module.getReferenceBook());

        List<LessonDTO> lessons = lessonRepository
                .findByModuleIdOrderByLessonOrderAsc(module.getId())
                .stream()
                .map(lesson -> convertLessonToEnrolledDTO(lesson, enrollment))
                .toList();

        dto.setLessons(lessons);

        quizRepository.findByModuleId(module.getId()).ifPresent(quiz -> {
            dto.setQuiz(ModuleQuizService.mapToDTO(quiz));
        });

        return dto;
    }

    private LessonDTO convertLessonToPublicDTO(Lesson lesson) {
        LessonDTO dto = new LessonDTO();
        dto.setId(lesson.getId());
        dto.setTitle(lesson.getTitle());
        dto.setDescription(lesson.getDescription());
        dto.setLessonOrder(lesson.getLessonOrder());
        dto.setDuration(lesson.getDuration());
        return dto;
    }

    private LessonDTO convertLessonToEnrolledDTO(
            Lesson lesson,
            Enrollment enrollment) {

        LessonDTO dto = new LessonDTO();
        dto.setId(lesson.getId());
        dto.setTitle(lesson.getTitle());
        dto.setDescription(lesson.getDescription());
        dto.setLessonOrder(lesson.getLessonOrder());
        dto.setDuration(lesson.getDuration());
        dto.setVideoUrl(lesson.getVideoUrl());
        dto.setContent(lesson.getContent());

        boolean completed = lessonProgressRepository
                .findByEnrollmentAndLesson(enrollment, lesson)
                .map(LessonProgress::getCompleted)
                .orElse(false);

        dto.setCompleted(completed);
        return dto;
    }

    private void ensureModulesExist(Long courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) return;

        List<CourseModule> existing = moduleRepository.findByCourseIdOrderByModuleOrderAsc(courseId);
        String[] titles = getModuleTitlesForSkill(course.getSkill(), course.getTitle());

        for (int i = 0; i < titles.length; i++) {
            CourseModule m;
            if (i < existing.size()) {
                m = existing.get(i);
                m.setTitle(titles[i]);
                m.setDescription(getRichModuleDescription(titles[i]));
                m = moduleRepository.save(m);
            } else {
                m = new CourseModule();
                m.setTitle(titles[i]);
                m.setDescription(getRichModuleDescription(titles[i]));
                m.setModuleOrder(i + 1);
                m.setCourse(course);
                m = moduleRepository.save(m);
            }

            if (lessonRepository.findByModuleIdOrderByLessonOrderAsc(m.getId()).isEmpty()) {
                // Seed 2 lessons per module
                Lesson l1 = new Lesson();
                l1.setTitle(titles[i].replace("Module " + (i + 1) + ": ", "") + " - Foundations");
                l1.setDescription(getRichModuleDescription(titles[i]));
                l1.setLessonOrder(1);
                l1.setDuration("20:00");
                l1.setVideoUrl(getVideoUrlForSkill(course.getSkill(), 1));
                l1.setContent(getRichLessonContent(titles[i], false));
                l1.setModule(m);
                l1.setCourse(course);
                lessonRepository.save(l1);

                Lesson l2 = new Lesson();
                l2.setTitle(titles[i].replace("Module " + (i + 1) + ": ", "") + " - Hands-on Lab");
                l2.setDescription("Practical implementation, real-world scenario architecture, and hands-on coding lab for " + titles[i] + ".");
                l2.setLessonOrder(2);
                l2.setDuration("35:00");
                l2.setVideoUrl(getVideoUrlForSkill(course.getSkill(), 2));
                l2.setContent(getRichLessonContent(titles[i], true));
                l2.setModule(m);
                l2.setCourse(course);
                lessonRepository.save(l2);

                if (quizRepository.findByModuleId(m.getId()).isEmpty()) {
                    com.skillsphere.model.ModuleQuiz mq = new com.skillsphere.model.ModuleQuiz();
                    mq.setTitle(titles[i] + " Quiz");
                    mq.setDescription("Assess your understanding of " + titles[i]);
                    mq.setModule(m);

                    com.skillsphere.model.QuizQuestion q1 = new com.skillsphere.model.QuizQuestion();
                    q1.setQuestionText("What is the main objective of " + titles[i] + "?");
                    q1.setOptionA("Master production concepts and best practices");
                    q1.setOptionB("Avoid writing code");
                    q1.setOptionC("Learn irrelevant theoretical syntax");
                    q1.setOptionD("None of the above");
                    q1.setCorrectAnswer("A");
                    mq.addQuestion(q1);

                    quizRepository.save(mq);
                }
            }
        }
    }

    private String[] getModuleTitlesForSkill(String skill, String courseTitle) {
        String s = (skill != null && !skill.isEmpty()) ? skill : (courseTitle != null ? courseTitle : "");
        String lower = s.toLowerCase();
        if (lower.contains("react")) {
            return new String[] {
                "Module 1: React.js Fundamentals & JSX Syntax",
                "Module 2: Component Architecture & State Management",
                "Module 3: React Hooks (useState, useEffect, useContext)",
                "Module 4: Routing & Async API Data Integration",
                "Module 5: Advanced Patterns & Production Performance"
            };
        } else if (lower.contains("java")) {
            return new String[] {
                "Module 1: Java Core Language Syntax & OOP Foundations",
                "Module 2: Collections Framework & Memory Management",
                "Module 3: Spring Boot REST API & Microservices",
                "Module 4: Spring Data JPA & Database Persistence",
                "Module 5: Spring Security, Testing & Enterprise Deployment"
            };
        } else if (lower.contains("python")) {
            return new String[] {
                "Module 1: Python Basics & Control Structures",
                "Module 2: Data Structures, Functions & OOP in Python",
                "Module 3: File I/O, Error Handling & Modules",
                "Module 4: Data Analysis with NumPy & Pandas",
                "Module 5: Web Development with Flask & FastAPI"
            };
        } else if (lower.contains("database") || lower.contains("sql")) {
            return new String[] {
                "Module 1: Relational Database Concepts & SQL Queries",
                "Module 2: Schema Normalization & Complex Joins",
                "Module 3: Indexing, Transactions & Performance Tuning",
                "Module 4: NoSQL Databases & MongoDB Integration",
                "Module 5: Database Administration & Security Best Practices"
            };
        } else if (lower.contains("design") || lower.contains("ui")) {
            return new String[] {
                "Module 1: UI/UX Foundations & User Research Principles",
                "Module 2: Wireframing, Prototyping & Figma Mastery",
                "Module 3: Visual Design Tokens, Typography & Color Systems",
                "Module 4: Usability Testing & Design Systems",
                "Module 5: Portfolio Case Study & Product Handoff"
            };
        } else if (lower.contains("cloud") || lower.contains("aws")) {
            return new String[] {
                "Module 1: Cloud Computing Fundamentals & AWS Core Services",
                "Module 2: IAM Security, Virtual Private Cloud (VPC) & Networking",
                "Module 3: Compute (EC2, Lambda) & Storage (S3, EBS)",
                "Module 4: Database Services (RDS, DynamoDB) & Auto Scaling",
                "Module 5: Serverless Architecture & DevOps Deployment"
            };
        } else if (lower.contains("devops")) {
            return new String[] {
                "Module 1: DevOps Methodology & Linux Command Line",
                "Module 2: Version Control & Git Collaboration",
                "Module 3: Containerization with Docker",
                "Module 4: Container Orchestration with Kubernetes",
                "Module 5: Continuous Integration & Deployment (CI/CD Pipelines)"
            };
        } else if (lower.contains("test") || lower.contains("qa")) {
            return new String[] {
                "Module 1: Software Testing Principles & QA Fundamentals",
                "Module 2: Test Case Design & Black Box / White Box Testing",
                "Module 3: Test Automation with Selenium & JUnit",
                "Module 4: API Testing with Postman & RestAssured",
                "Module 5: CI/CD Integration & Automated Regression Suites"
            };
        } else if (lower.contains("structure") || lower.contains("dsa") || lower.contains("algo")) {
            return new String[] {
                "Module 1: Time & Space Complexity (Big-O Analysis)",
                "Module 2: Arrays, Strings & Linked Lists Mastery",
                "Module 3: Stacks, Queues & Hash Tables",
                "Module 4: Trees, Binary Search Trees & Heaps",
                "Module 5: Graph Algorithms, Searching & Dynamic Programming"
            };
        } else if (lower.contains("machine") || lower.contains("ml") || lower.contains("ai")) {
            return new String[] {
                "Module 1: Mathematics & Statistics for Machine Learning",
                "Module 2: Supervised Learning (Regression & Classification)",
                "Module 3: Unsupervised Learning (Clustering & Dimensionality Reduction)",
                "Module 4: Model Evaluation, Hyperparameter Tuning & Cross Validation",
                "Module 5: Introduction to Deep Learning & Neural Networks"
            };
        } else if (lower.contains("mobile") || lower.contains("app") || lower.contains("android")) {
            return new String[] {
                "Module 1: Mobile App Development Foundations & Mobile UI",
                "Module 2: Cross-Platform Development & State Management",
                "Module 3: REST API Integration & Native Device Features",
                "Module 4: Local Storage, SQLite & Persistence",
                "Module 5: App Publishing, Security & Performance Optimization"
            };
        } else {
            return new String[] {
                "Module 1: HTML5, CSS3 & Responsive Web Design",
                "Module 2: JavaScript ES6+ & Dynamic Web Logic",
                "Module 3: React.js Essentials & Component Architecture",
                "Module 4: Node.js, Express & RESTful APIs",
                "Module 5: Database Integration & Capstone Application"
            };
        }
    }

    private String getVideoUrlForSkill(String skill, int lessonNumber) {
        String base = "https://www.youtube.com/embed/";
        if (skill == null) return base + "zJSY8tbf_ys";
        String s = skill.toLowerCase();
        if (s.contains("react")) return base + (lessonNumber == 1 ? "bMknfKXIFA8" : "Ke90Tje7VS0");
        if (s.contains("java")) return base + (lessonNumber == 1 ? "eIrMbAQSU34" : "grEKMHGYyns");
        if (s.contains("python")) return base + (lessonNumber == 1 ? "_uQrJ0TkZlc" : "kqtD5dpn9C8");
        if (s.contains("database") || s.contains("sql")) return base + (lessonNumber == 1 ? "HXV3zeJZ1EQ" : "7S_tz1z_5bA");
        if (s.contains("design") || s.contains("ui")) return base + (lessonNumber == 1 ? "c9Wg6Cb_YlU" : "zHAa-m16NQk");
        if (s.contains("devops")) return base + (lessonNumber == 1 ? "hQcFE0RD0cQ" : "Xrgk023l4lI");
        if (s.contains("cloud")) return base + (lessonNumber == 1 ? "a9__D53WsUs" : "k1RI5locZE4");
        return base + "zJSY8tbf_ys";
    }

    private String getRichModuleDescription(String title) {
        if (title == null) return "Comprehensive industry-aligned module covering core principles, hands-on implementation, and production best practices.";
        String lower = title.toLowerCase();
        
        if (lower.contains("html") || lower.contains("css") || lower.contains("web design")) {
            return "Master modern Web standards with HTML5 semantic architecture, CSS3 flexbox/grid layout systems, responsive mobile-first typography, and WCAG accessibility standards to craft production-ready user interfaces.";
        } else if (lower.contains("javascript") || lower.contains("es6") || lower.contains("web logic")) {
            return "Master modern JavaScript ES6+ features including arrow functions, async/await, DOM event delegation, closures, modules, and API data fetching pipelines for dynamic web applications.";
        } else if (lower.contains("react") || lower.contains("jsx")) {
            return "Explore React 18 component architecture, JSX rendering patterns, virtual DOM diffing, props flow, useState/useEffect hook lifecycle, and state management for scalable frontend apps.";
        } else if (lower.contains("node") || lower.contains("express") || lower.contains("rest")) {
            return "Build asynchronous backend microservices with Node.js event loops, Express middleware, RESTful endpoint architecture, JWT authentication, and robust error handling.";
        } else if (lower.contains("database") || lower.contains("sql") || lower.contains("mongo")) {
            return "Learn relational and NoSQL database engineering, schema normalization, complex SQL joins, indexing strategies, MongoDB Mongoose ORM, and query performance optimization.";
        } else if (lower.contains("java") || lower.contains("spring")) {
            return "Deep dive into enterprise Java development, Object-Oriented paradigms, Spring Boot REST controllers, Dependency Injection, JPA repository persistence, and microservice security.";
        } else if (lower.contains("python") || lower.contains("flask") || lower.contains("fastapi")) {
            return "Master Python syntax, object-oriented programming, data structures, file I/O streams, automated testing, and building web APIs with Flask and FastAPI frameworks.";
        } else if (lower.contains("cloud") || lower.contains("aws")) {
            return "Gain practical expertise in AWS Cloud architecture, EC2 compute instances, S3 object storage, VPC networking, IAM security policies, and serverless Lambda deployments.";
        } else if (lower.contains("devops") || lower.contains("docker") || lower.contains("kubernetes") || lower.contains("ci/cd")) {
            return "Master DevOps automation with Docker containerization, Kubernetes cluster orchestration, Git collaboration workflows, and automated CI/CD deployment pipelines.";
        } else if (lower.contains("ui") || lower.contains("ux") || lower.contains("design") || lower.contains("figma")) {
            return "Learn user-centered UI/UX design workflows, wireframing in Figma, interactive prototyping, typography hierarchy, visual design tokens, and usability testing.";
        } else if (lower.contains("test") || lower.contains("qa") || lower.contains("automation")) {
            return "Understand software quality assurance, test plan strategy, unit testing frameworks, end-to-end UI automation with Selenium, and API testing with Postman.";
        } else if (lower.contains("structure") || lower.contains("dsa") || lower.contains("algo")) {
            return "Master fundamental data structures (Arrays, Linked Lists, Trees, Graphs) and algorithmic paradigms (Sorting, Searching, Dynamic Programming, Greedy approaches) with Big-O time and space optimization.";
        }
        return "Comprehensive module covering essential industry standards, architectural patterns, hands-on lab projects, and production deployment strategies for " + title + ".";
    }

    private String getRichLessonContent(String title, boolean isLab) {
        if (isLab) {
            return "<div class='space-y-6 text-violet-100/90 leading-relaxed'>" +
                "<h3 class='text-2xl text-violet-300 font-bold mb-4'>" + title + " - Hands-on Interactive Lab</h3>" +
                "<p class='text-base text-[#B8B8C7]'>In this intensive practical lab, you will apply the core principles covered in this module by building a production-ready feature step-by-step. Focus on clean code structure, error handling, and performance optimization.</p>" +
                "<div class='p-4 rounded-xl bg-purple-950/40 border border-purple-800/40 my-4'>" +
                "<h4 class='text-lg text-pink-400 font-bold mb-2'>🧪 Lab Objectives & Requirements</h4>" +
                "<ul class='list-disc list-inside space-y-2 text-sm text-purple-200'>" +
                "<li>Implement modular code structure adhering to industry design patterns</li>" +
                "<li>Integrate input validation, edge-case checks, and structured logging</li>" +
                "<li>Optimize resource consumption, DOM updates, and API payloads</li>" +
                "<li>Run automated unit tests to verify solution correctness</li>" +
                "</ul>" +
                "</div>" +
                "<h4 class='text-xl text-violet-200 font-semibold mt-6 mb-3'>1. Implementation Walkthrough</h4>" +
                "<p class='text-sm text-[#B8B8C7]'>Follow the step-by-step guidance below to construct your solution, inspect execution traces, and verify compliance with production benchmarks.</p>" +
                "</div>";
        }

        return "<div class='space-y-6 text-violet-100/90 leading-relaxed'>" +
            "<h3 class='text-2xl text-violet-300 font-bold mb-4'>" + title + " - Core Architectural Concepts</h3>" +
            "<p class='text-base text-[#B8B8C7]'>Welcome to this module! This lesson provides an in-depth exploration of core mechanics, fundamental syntax, and industry best practices for <strong>" + title + "</strong>.</p>" +
            "<div class='grid grid-cols-1 md:grid-cols-2 gap-4 my-6'>" +
            "<div class='p-4 rounded-xl bg-purple-950/30 border border-purple-800/30'>" +
            "<h5 class='text-sm font-bold text-pink-400 uppercase tracking-wider mb-2'>🎯 Core Objectives</h5>" +
            "<p class='text-xs text-purple-200 leading-relaxed'>Understand fundamental design choices, memory lifecycle, syntax structures, and system execution order.</p>" +
            "</div>" +
            "<div class='p-4 rounded-xl bg-purple-950/30 border border-purple-800/30'>" +
            "<h5 class='text-sm font-bold text-purple-300 uppercase tracking-wider mb-2'>🚀 Industry Application</h5>" +
            "<p class='text-xs text-purple-200 leading-relaxed'>Apply these principles to build scalable software components capable of handling high throughput in production.</p>" +
            "</div>" +
            "</div>" +
            "<h4 class='text-xl text-violet-200 font-semibold mt-6 mb-3'>1. Conceptual Deep Dive & Fundamentals</h4>" +
            "<p class='text-sm text-[#B8B8C7] leading-relaxed'>Mastering <strong>" + title + "</strong> requires understanding both high-level design patterns and underlying mechanics. Throughout this lesson, pay close attention to component composition, scope management, and clean code conventions.</p>" +
            "<h4 class='text-xl text-violet-200 font-semibold mt-6 mb-3'>2. Key Takeaways & Best Practices</h4>" +
            "<ul class='list-disc list-inside space-y-2 text-sm text-purple-200 bg-purple-950/20 p-4 rounded-xl border border-purple-800/30'>" +
            "<li>Always maintain modular responsibility separation between application layers</li>" +
            "<li>Leverage built-in tools, developer utilities, and static analysis for early error detection</li>" +
            "<li>Ensure comprehensive unit test coverage and document public interface contracts</li>" +
            "</ul>" +
            "</div>";
    }
}
