package com.skillsphere.config;

import com.skillsphere.model.Course;
import com.skillsphere.model.CourseModule;
import com.skillsphere.model.Lesson;
import com.skillsphere.model.ModuleQuiz;
import com.skillsphere.model.QuizQuestion;
import com.skillsphere.repository.CourseRepository;
import com.skillsphere.repository.CourseModuleRepository;
import com.skillsphere.repository.LessonRepository;
import com.skillsphere.repository.ModuleQuizRepository;
import com.skillsphere.repository.UserRepository;
import com.skillsphere.repository.EnrollmentRepository;
import com.skillsphere.model.User;
import com.skillsphere.model.Enrollment;
import java.time.LocalDateTime;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Order(2)
public class CourseSeeder implements CommandLineRunner {

    private final CourseRepository courseRepository;
    private final CourseModuleRepository moduleRepository;
    private final LessonRepository lessonRepository;
    private final ModuleQuizRepository moduleQuizRepository;
    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;

    public CourseSeeder(
            CourseRepository courseRepository,
            CourseModuleRepository moduleRepository,
            LessonRepository lessonRepository,
            ModuleQuizRepository moduleQuizRepository,
            UserRepository userRepository,
            EnrollmentRepository enrollmentRepository) {
        this.courseRepository = courseRepository;
        this.moduleRepository = moduleRepository;
        this.lessonRepository = lessonRepository;
        this.moduleQuizRepository = moduleQuizRepository;
        this.userRepository = userRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    @Override
    public void run(String... args) {
        if (courseRepository.count() > 0) {
            System.out.println("[CourseSeeder] Courses already exist. Checking module count...");
            if (moduleRepository.count() == 0) {
                System.out.println("[CourseSeeder] Seeding modules, lessons, and quizzes for existing courses...");
                seedModulesForCourseList(courseRepository.findAll());
            }
            return;
        }

        List<Course> courses = List.of(
            buildCourse(
                "Full Stack Development",
                "Learn to build complete web applications from frontend to backend. This comprehensive course covers HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB. You'll build real-world projects including an e-commerce platform, a social media dashboard, and a real-time chat application. By the end, you'll be able to design, develop, and deploy full-stack web applications independently.",
                "BESTSELLER", "bg-orange-500",
                "Beginner", "12 Weeks", 4.8, "1.2K", 29999.0,
                "/images/full-stack-development.svg",
                "Web Development",
                42, 60, 12,
                "Basic computer literacy, No prior coding experience needed",
                "Build responsive websites with HTML/CSS/JS, Create dynamic UIs with React, Build RESTful APIs with Node.js and Express, Work with MongoDB databases, Deploy applications to the cloud, Implement authentication and authorization"
            ),
            buildCourse(
                "React.js Essentials",
                "Master React.js from the ground up. This course takes you from React fundamentals through advanced patterns including hooks, context, reducers, and performance optimization. You'll build a complete project management application with drag-and-drop, real-time updates, and responsive design. Learn component architecture, state management, routing, and testing best practices.",
                "POPULAR", "bg-blue-500",
                "Beginner", "6 Weeks", 4.7, "836", 14999.0,
                "/images/reactjs-essentials.svg",
                "React",
                28, 36, 8,
                "Basic JavaScript knowledge, Understanding of HTML/CSS",
                "Understand React component lifecycle, Master React Hooks (useState/useEffect/useContext), Build reusable component libraries, Implement client-side routing with React Router, Manage global state effectively, Write unit tests for React components"
            ),
            buildCourse(
                "Java Programming",
                "A deep dive into Java programming covering core concepts, object-oriented programming, data structures, algorithms, and enterprise application development. You'll work with Spring Boot to build production-ready APIs, connect to databases with JPA/Hibernate, and implement security with Spring Security. Includes hands-on projects and coding challenges to reinforce learning.",
                "TRENDING", "bg-emerald-500",
                "Intermediate", "8 Weeks", 4.6, "1.1K", 19999.0,
                "/images/java-programming.svg",
                "Java",
                35, 48, 10,
                "Basic programming concepts, Understanding of any programming language",
                "Write clean object-oriented Java code, Implement common data structures and algorithms, Build REST APIs with Spring Boot, Work with databases using JPA/Hibernate, Implement authentication with Spring Security, Write unit and integration tests"
            ),
            buildCourse(
                "Database Management",
                "Learn relational and NoSQL database design, optimization, and administration. This course covers MySQL, PostgreSQL, and MongoDB with real-world scenarios. You'll master SQL queries, database normalization, indexing strategies, transaction management, and performance tuning. Build practical projects including a data warehouse and a scalable document store.",
                "NEW", "bg-fuchsia-500",
                "Intermediate", "5 Weeks", 4.5, "654", 12999.0,
                "/images/database-management.svg",
                "Database",
                22, 30, 7,
                "Basic SQL knowledge, Understanding of data types",
                "Design normalized database schemas, Write complex SQL queries and joins, Optimize queries with indexing, Manage transactions and concurrency, Work with MongoDB document databases, Implement backup and recovery strategies"
            ),
            buildCourse(
                "Python Programming",
                "From zero to Python proficiency. This course covers Python syntax, data types, control flow, functions, OOP, file handling, and popular libraries like NumPy, Pandas, and Matplotlib. Build automation scripts, data analysis pipelines, and a web scraper. Perfect for beginners looking to start their programming journey or professionals wanting to add Python to their toolkit.",
                "BESTSELLER", "bg-teal-500",
                "Beginner", "7 Weeks", 4.9, "2.1K", 16999.0,
                "/images/python-programming.svg",
                "Python",
                32, 42, 9,
                "No prior experience required, Basic math skills",
                "Write Python programs from scratch, Work with data using NumPy and Pandas, Create visualizations with Matplotlib, Build web scrapers and automation scripts, Understand object-oriented programming, Handle files and exceptions effectively"
            ),
            buildCourse(
                "Data Science & Analytics",
                "Transform raw data into actionable insights. Learn the complete data science workflow: data collection, cleaning, exploratory analysis, statistical modeling, and visualization. Work with Python, Pandas, Scikit-learn, and Tableau. Capstone projects include a customer churn prediction model and an interactive analytics dashboard.",
                "HOT", "bg-violet-500",
                "Intermediate", "10 Weeks", 4.7, "920", 34999.0,
                "/images/data-science.svg",
                "Data Science",
                40, 55, 11,
                "Python basics, Basic statistics knowledge",
                "Perform exploratory data analysis, Build predictive models with Scikit-learn, Create interactive dashboards, Apply statistical methods to real data, Clean and preprocess messy datasets, Communicate findings with compelling visualizations"
            ),
            buildCourse(
                "Machine Learning Fundamentals",
                "Understand and implement core machine learning algorithms. This course covers supervised learning (regression, classification), unsupervised learning (clustering, dimensionality reduction), and an introduction to deep learning with TensorFlow. Work on real datasets and build models for image classification, sentiment analysis, and recommendation systems.",
                "TRENDING", "bg-pink-500",
                "Advanced", "10 Weeks", 4.8, "745", 39999.0,
                "/images/machine-learning.svg",
                "Machine Learning",
                38, 52, 10,
                "Python proficiency, Statistics and linear algebra basics, Data Science fundamentals",
                "Implement supervised learning algorithms, Build clustering and dimensionality reduction models, Create neural networks with TensorFlow, Evaluate and tune model performance, Build end-to-end ML pipelines, Deploy models to production"
            ),
            buildCourse(
                "UI/UX Design Masterclass",
                "Design beautiful, user-centered digital experiences. Learn design thinking, wireframing, prototyping, user research, and visual design principles. Master Figma for creating pixel-perfect designs and interactive prototypes. Build a complete design system and portfolio-ready case studies for web and mobile applications.",
                "NEW", "bg-sky-500",
                "Beginner", "6 Weeks", 4.6, "512", 18999.0,
                "/images/ui-ux-design.svg",
                "UI/UX Design",
                24, 32, 6,
                "No design experience needed, Creative mindset",
                "Apply design thinking methodology, Create wireframes and prototypes in Figma, Conduct user research and usability testing, Build a complete design system, Design responsive web and mobile interfaces, Present design decisions with case studies"
            ),
            buildCourse(
                "DevOps Engineering",
                "Master the tools and practices that bridge development and operations. Learn Docker, Kubernetes, CI/CD pipelines with Jenkins and GitHub Actions, infrastructure as code with Terraform, and monitoring with Prometheus and Grafana. Deploy and manage applications on AWS and GCP with automated scaling and zero-downtime deployments.",
                "POPULAR", "bg-green-500",
                "Advanced", "9 Weeks", 4.7, "680", 24999.0,
                "/images/devops.svg",
                "DevOps",
                34, 48, 9,
                "Linux command line basics, Basic networking concepts, Experience with any programming language",
                "Containerize applications with Docker, Orchestrate containers with Kubernetes, Build CI/CD pipelines, Implement infrastructure as code, Set up monitoring and alerting, Deploy to AWS and GCP"
            ),
            buildCourse(
                "Cyber Security Essentials",
                "Protect systems, networks, and data from cyber threats. This course covers network security, cryptography, ethical hacking, vulnerability assessment, and incident response. Learn to use industry tools like Wireshark, Metasploit, and Burp Suite. Prepare for real-world security challenges with hands-on labs and capture-the-flag exercises.",
                "HOT", "bg-amber-500",
                "Intermediate", "8 Weeks", 4.5, "430", 27999.0,
                "/images/cyber-security.svg",
                "Cyber Security",
                30, 42, 8,
                "Basic networking knowledge, Linux command line familiarity",
                "Identify common vulnerabilities and threats, Perform penetration testing, Implement network security measures, Understand cryptographic principles, Respond to security incidents, Use industry-standard security tools"
            ),
            buildCourse(
                "Node.js Backend Development",
                "Build scalable and performant server-side applications with Node.js. Cover Express.js, REST API design, authentication with JWT, real-time communication with WebSockets, database integration with MongoDB and PostgreSQL, and microservices architecture. Deploy production-ready backends with Docker and cloud platforms.",
                "POPULAR", "bg-lime-500",
                "Intermediate", "7 Weeks", 4.6, "890", 15999.0,
                "/images/nodejs.svg",
                "Node.js",
                30, 40, 8,
                "JavaScript fundamentals, Basic understanding of HTTP",
                "Build RESTful APIs with Express.js, Implement JWT authentication, Work with WebSockets for real-time apps, Integrate MongoDB and PostgreSQL, Design microservices architecture, Deploy with Docker and cloud platforms"
            ),
            buildCourse(
                "Cloud Computing with AWS",
                "Master cloud computing concepts and AWS services. Learn to architect, deploy, and manage applications on Amazon Web Services. Cover EC2, S3, Lambda, DynamoDB, CloudFormation, and more. Build a multi-tier web application on AWS with auto-scaling, load balancing, and high availability. Prepares you for the AWS Solutions Architect certification.",
                "NEW", "bg-indigo-500",
                "Advanced", "8 Weeks", 4.8, "560", 21999.0,
                "/images/cloud-computing.svg",
                "Cloud Computing",
                32, 44, 10,
                "Basic networking, Linux command line, Any programming language experience",
                "Design cloud architectures on AWS, Deploy and manage EC2 instances, Build serverless applications with Lambda, Implement storage solutions with S3 and DynamoDB, Set up auto-scaling and load balancing, Prepare for AWS certification exam"
            ),
            buildCourse(
                "Data Structures & Algorithms",
                "Master problem-solving and algorithmic thinking required for top tech interview rounds. Cover Big-O, Linked Lists, Trees, Graphs, Sorting, Dynamic Programming, and System Design.",
                "TRENDING", "bg-purple-500",
                "Intermediate", "8 Weeks", 4.9, "1.4K", 18999.0,
                "/images/java-programming.svg",
                "Data Structures",
                35, 48, 10,
                "Basic programming knowledge in Java, C++, or Python",
                "Analyze Time & Space Complexity, Implement Trees & Graphs, Solve Dynamic Programming challenges, Pass technical coding interviews"
            ),
            buildCourse(
                "Software Testing & QA Automation",
                "Comprehensive guide to Manual and Automated Software Testing. Learn Selenium WebDriver, TestNG, Cucumber BDD, Postman API Testing, and CI/CD Automation.",
                "POPULAR", "bg-teal-500",
                "Beginner", "6 Weeks", 4.6, "480", 13999.0,
                "/images/full-stack-development.svg",
                "Software Testing",
                25, 36, 8,
                "Basic computer literacy and logical thinking",
                "Design test suites, Automate UI testing with Selenium, Test REST APIs with Postman, Integrate automation in Jenkins"
            ),
            buildCourse(
                "Mobile App Development with Flutter",
                "Build cross-platform iOS and Android apps using Google Flutter & Dart. Cover Widget trees, Provider state management, Firebase authentication, and Play Store publishing.",
                "NEW", "bg-cyan-500",
                "Intermediate", "7 Weeks", 4.7, "620", 17999.0,
                "/images/reactjs-essentials.svg",
                "Mobile Development",
                30, 42, 9,
                "Basic understanding of Object-Oriented Programming",
                "Build iOS & Android apps from single codebase, Integrate Firebase backend, Publish apps to App Store & Google Play"
            )
        );

        courseRepository.saveAll(courses);
        seedModulesForCourseList(courses);
        System.out.println("[CourseSeeder] Seeded " + courses.size() + " courses with full details, modules, lessons, and quizzes.");
    }

    private void seedModulesForCourseList(List<Course> courses) {
        for (Course c : courses) {
            String skillName = c.getSkill() != null && !c.getSkill().isEmpty() ? c.getSkill() : c.getTitle();
            // Module 1
            CourseModule m1 = new CourseModule();
            m1.setTitle("Introduction to " + c.getSkill());
            m1.setDescription("Getting started with the fundamentals of " + c.getSkill() + ".");
            m1.setModuleOrder(1);
            m1.setCourse(c);
            moduleRepository.save(m1);

            Lesson l1 = new Lesson();
            l1.setTitle("Welcome to the course");
            l1.setDescription("Overview of what you will learn.");
            l1.setLessonOrder(1);
            l1.setDuration("10:00");
            l1.setVideoUrl(getVideoUrlForSkill(c.getSkill(), 1));
            l1.setContent("<div class='space-y-6 text-violet-100/90 leading-relaxed'>" +
                "<h3 class='text-2xl text-violet-300 font-bold mb-4'>Chapter 1: Foundations of " + c.getSkill() + "</h3>" +
                "<p>Welcome to the beginning of your journey into the world of " + c.getSkill() + ". Just as a sturdy building requires a solid foundation, mastering any technical skill requires a deep understanding of its core principles. In this chapter, we will explore the historical context, the primary problems this technology was created to solve, and the basic syntax and structure you will encounter daily.</p>" +
                "<p>When you first approach " + c.getSkill() + ", it might seem overwhelming. However, by breaking it down into fundamental components, you will quickly see the underlying logic. We begin by setting up the necessary environment—a crucial step that ensures you have the right tools to write, test, and deploy your work. Think of this as preparing your workshop before beginning to craft.</p>" +
                "<h4 class='text-xl text-violet-200 font-semibold mt-6 mb-3'>1.1 The Core Philosophy</h4>" +
                "<p>Every technology has a guiding philosophy. For " + c.getSkill() + ", the emphasis is on efficiency, readability, and scalability. As you read through the documentation and community guidelines, you'll notice a strong preference for code that is not only functional but also elegant. The best developers don't just write code that computers can understand; they write code that other humans can maintain.</p>" +
                "<h4 class='text-xl text-violet-200 font-semibold mt-6 mb-3'>1.2 Initial Setup and First Steps</h4>" +
                "<p>Your first task is to install the core dependencies and configure your integrated development environment (IDE). Once set up, you will write your first 'Hello World' program. While this seems trivial, it proves that your entire toolchain—from the editor to the compiler or interpreter—is functioning correctly. Below, you will find a reference video that visually walks you through this setup process.</p>" +
                "<h4 class='text-xl text-violet-200 font-semibold mt-6 mb-3'>Recommended Reading</h4>" +
                "<p>To deepen your understanding of these foundations, we highly recommend reading <em>\"Clean Code\"</em> by Robert C. Martin and the official documentation for " + c.getSkill() + ". These resources provide excellent theoretical background to supplement this course.</p>" +
                "</div>");
            l1.setModule(m1);
            l1.setCourse(c);
            lessonRepository.save(l1);

            ModuleQuiz mq = new ModuleQuiz();
            mq.setTitle("Basics Quiz");
            mq.setDescription("Test your knowledge on the introductory concepts.");
            mq.setModule(m1);

            QuizQuestion q1 = new QuizQuestion();
            q1.setQuestionText("What is the primary focus of this first module?");
            q1.setOptionA("Advanced techniques");
            q1.setOptionB("Introduction and basics");
            q1.setOptionC("Final capstone project");
            q1.setOptionD("Nothing in particular");
            q1.setCorrectAnswer("B");
            mq.addQuestion(q1);
            
            QuizQuestion q2 = new QuizQuestion();
            q2.setQuestionText("Are you ready to learn " + c.getSkill() + "?");
            q2.setOptionA("Yes, definitely!");
            q2.setOptionB("Maybe later.");
            q2.setOptionC("Not sure.");
            q2.setOptionD("No.");
            q2.setCorrectAnswer("A");
            mq.addQuestion(q2);

            moduleQuizRepository.save(mq);

            // Module 2
            CourseModule m2 = new CourseModule();
            m2.setTitle("Core Concepts in " + c.getSkill());
            m2.setDescription("Deep dive into the main concepts and practical applications.");
            m2.setModuleOrder(2);
            m2.setCourse(c);
            moduleRepository.save(m2);

            Lesson l2 = new Lesson();
            l2.setTitle("Essential Techniques");
            l2.setDescription("Master the most important techniques used in " + c.getSkill() + ".");
            l2.setLessonOrder(1);
            l2.setDuration("45:00");
            l2.setVideoUrl(getVideoUrlForSkill(c.getSkill(), 2));
            l2.setContent("<div class='space-y-6 text-violet-100/90 leading-relaxed'>" +
                "<h3 class='text-2xl text-violet-300 font-bold mb-4'>Chapter 2: Essential Techniques in " + c.getSkill() + "</h3>" +
                "<p>With the foundations in place, it is time to turn our attention to the essential techniques that separate a novice from a practitioner. In " + c.getSkill() + ", these techniques involve understanding data structures, control flow, and modular design. As you progress through this chapter, you will transition from writing simple scripts to engineering robust solutions.</p>" +
                "<h4 class='text-xl text-violet-200 font-semibold mt-6 mb-3'>2.1 Managing State and Control Flow</h4>" +
                "<p>At the heart of any application is the way it handles data and logic. You will learn how to structure conditional statements, loops, and recursive functions to process information efficiently. We will also discuss the concept of 'state'—how an application remembers information between different actions. Mishandling state is a common source of bugs, so we will emphasize immutable data patterns and predictable state transitions.</p>" +
                "<h4 class='text-xl text-violet-200 font-semibold mt-6 mb-3'>2.2 Error Handling and Edge Cases</h4>" +
                "<p>A truly professional application doesn't just work when everything goes right; it gracefully handles situations when things go wrong. We will cover try-catch mechanisms, defensive programming, and logging strategies. Anticipating edge cases—those unlikely but possible scenarios—is what makes software resilient. Ensure you review the reference material below to see how these techniques are applied in a real-world debugging session.</p>" +
                "<h4 class='text-xl text-violet-200 font-semibold mt-6 mb-3'>Recommended Reading</h4>" +
                "<p>For further study on essential techniques, consider reading <em>\"The Pragmatic Programmer\"</em> by Andrew Hunt and David Thomas. It is a timeless piece that applies wonderfully to " + c.getSkill() + ".</p>" +
                "</div>");
            l2.setModule(m2);
            l2.setCourse(c);
            lessonRepository.save(l2);

            Lesson l3 = new Lesson();
            l3.setTitle("Advanced Application");
            l3.setDescription("Taking your skills to the next level.");
            l3.setLessonOrder(2);
            l3.setDuration("50:00");
            l3.setVideoUrl(getVideoUrlForSkill(c.getSkill(), 3));
            l3.setContent("<div class='space-y-6 text-violet-100/90 leading-relaxed'>" +
                "<h3 class='text-2xl text-violet-300 font-bold mb-4'>Chapter 3: Advanced Architecture & Scalability</h3>" +
                "<p>Welcome to the final conceptual chapter of this module. Having mastered both the basics and the essential techniques, you are now ready to tackle architectural patterns and scalability. In enterprise environments, " + c.getSkill() + " is rarely used in isolation; it is part of a larger ecosystem. Here, we will study how to design systems that can handle increased load without sacrificing performance.</p>" +
                "<h4 class='text-xl text-violet-200 font-semibold mt-6 mb-3'>3.1 Design Patterns</h4>" +
                "<p>Design patterns are proven solutions to common software design problems. We will explore patterns such as the Singleton, Factory, and Observer patterns, contextualizing them within the framework of " + c.getSkill() + ". By adopting these patterns, you avoid reinventing the wheel and ensure your codebase remains scalable and understandable to other developers.</p>" +
                "<h4 class='text-xl text-violet-200 font-semibold mt-6 mb-3'>3.2 Performance Optimization</h4>" +
                "<p>Scalability isn't just about throwing more servers at a problem; it starts with efficient code. We will dive into memory management, asynchronous processing, and caching strategies. You'll learn how to profile your applications to identify bottlenecks. The concluding reference video will demonstrate a live profiling session where a sluggish application is optimized to run lightning fast.</p>" +
                "<h4 class='text-xl text-violet-200 font-semibold mt-6 mb-3'>Recommended Reading</h4>" +
                "<p>To master scalable architectures, we suggest reading <em>\"Designing Data-Intensive Applications\"</em> by Martin Kleppmann. This book will solidify your understanding of high-performance system design using " + c.getSkill() + ".</p>" +
                "</div>");
            l3.setModule(m2);
            l3.setCourse(c);
            lessonRepository.save(l3);

            ModuleQuiz mq2 = new ModuleQuiz();
            mq2.setTitle("Advanced Quiz");
            mq2.setDescription("Test your knowledge on the advanced concepts.");
            mq2.setModule(m2);

            QuizQuestion q3 = new QuizQuestion();
            q3.setQuestionText("Which of the following is considered an advanced technique in " + c.getSkill() + "?");
            q3.setOptionA("Printing 'Hello World'");
            q3.setOptionB("Using standard libraries safely");
            q3.setOptionC("Implementing complex architectural patterns");
            q3.setOptionD("Reading the documentation");
            q3.setCorrectAnswer("C");
            mq2.addQuestion(q3);
            
            QuizQuestion q4 = new QuizQuestion();
            q4.setQuestionText("How can you optimize performance and scalability?");
            q4.setOptionA("By writing more lines of code");
            q4.setOptionB("By applying proper design patterns and caching");
            q4.setOptionC("By ignoring edge cases");
            q4.setOptionD("Performance is automatically handled");
            q4.setCorrectAnswer("B");
            mq2.addQuestion(q4);

            moduleQuizRepository.save(mq2);

            // Module 3: Final Assessment (20 Questions)
            CourseModule m3 = new CourseModule();
            m3.setTitle("Final Assessment: " + c.getSkill());
            m3.setDescription("A comprehensive quiz to test your mastery of the entire course.");
            m3.setModuleOrder(3);
            m3.setCourse(c);
            moduleRepository.save(m3);

            ModuleQuiz mq3 = new ModuleQuiz();
            mq3.setTitle("Final Exam");
            mq3.setDescription("This exam comprises 20 questions covering all course materials.");
            mq3.setModule(m3);

            for (int i = 1; i <= 20; i++) {
                QuizQuestion q = new QuizQuestion();
                q.setQuestionText("Question " + i + ": Which of the following best describes concept " + i + " in " + c.getSkill() + "?");
                q.setOptionA("A foundational principle of " + c.getSkill());
                q.setOptionB("An advanced implementation detail");
                q.setOptionC("A common anti-pattern to avoid");
                q.setOptionD("An obsolete practice");
                
                // Randomize correct answer slightly based on index
                if (i % 4 == 0) q.setCorrectAnswer("A");
                else if (i % 4 == 1) q.setCorrectAnswer("B");
                else if (i % 4 == 2) q.setCorrectAnswer("C");
                else q.setCorrectAnswer("D");
                
                mq3.addQuestion(q);
            }
            moduleQuizRepository.save(mq3);
        }

        System.out.println("[CourseSeeder] Seeded " + courses.size() + " courses with full details, modules, lessons, and quizzes.");
    }


    private Course buildCourse(
        String title, String description,
        String badge, String badgeColor,
        String level, String duration, double rating, String reviews, double price,
        String imageUrl, String skill,
        int totalLessons, int totalHours, int totalQuizzes,
        String prerequisites, String learningOutcomes
    ) {
        Course c = new Course();
        c.setTitle(title);
        c.setDescription(description);
        c.setBadge(badge);
        c.setBadgeColor(badgeColor);
        c.setLevel(level);
        c.setDuration(duration);
        c.setRating(rating);
        c.setReviews(reviews);
        c.setPrice(price);
        c.setImageUrl(imageUrl);
        c.setSkill(skill);
        c.setTotalLessons(totalLessons);
        c.setTotalHours(totalHours);
        c.setTotalQuizzes(totalQuizzes);
        c.setPrerequisites(prerequisites);
        c.setLearningOutcomes(learningOutcomes);
        return c;
    }

    private String getVideoUrlForSkill(String skill, int lessonNumber) {
        String base = "https://www.youtube.com/embed/";
        return switch (skill) {
            case "Web Development" -> base + (lessonNumber == 1 ? "zJSY8tbf_ys" : lessonNumber == 2 ? "mU6anWqZJcc" : "Q33KBiDriJY");
            case "React" -> base + (lessonNumber == 1 ? "bMknfKXIFA8" : lessonNumber == 2 ? "Ke90Tje7VS0" : "SqcY0GlETPk");
            case "Java" -> base + (lessonNumber == 1 ? "eIrMbAQSU34" : lessonNumber == 2 ? "grEKMHGYyns" : "A74TOX803D0");
            case "Database" -> base + (lessonNumber == 1 ? "HXV3zeJZ1EQ" : lessonNumber == 2 ? "7S_tz1z_5bA" : "ztHopE5Wnpc");
            case "Python" -> base + (lessonNumber == 1 ? "_uQrJ0TkZlc" : lessonNumber == 2 ? "kqtD5dpn9C8" : "t8pPdKYpowI");
            case "Data Science" -> base + (lessonNumber == 1 ? "ua-CiDNNj30" : lessonNumber == 2 ? "KdgQvgE3ji4" : "X3paOmcrTjQ");
            case "Machine Learning" -> base + (lessonNumber == 1 ? "7eh4d6sabA0" : lessonNumber == 2 ? "i_LwzRmA_08" : "Gv9_4yMHFhI");
            case "UI/UX Design" -> base + (lessonNumber == 1 ? "c9Wg6Cb_YlU" : lessonNumber == 2 ? "zHAa-m16NQk" : "85gJMUEcnK0");
            case "DevOps" -> base + (lessonNumber == 1 ? "hQcFE0RD0cQ" : lessonNumber == 2 ? "Xrgk023l4lI" : "9pZ2xglTXO0");
            case "Cyber Security" -> base + (lessonNumber == 1 ? "inWWhr5tnEA" : lessonNumber == 2 ? "lpa8uy4u0R8" : "3Kq1MIfTWCE");
            case "Node.js" -> base + (lessonNumber == 1 ? "Oe421EPjeBE" : lessonNumber == 2 ? "fBNz5xF-Kx4" : "w-7RQ46RgxU");
            case "Cloud Computing" -> base + (lessonNumber == 1 ? "a9__D53WsUs" : lessonNumber == 2 ? "k1RI5locZE4" : "Z3SQb_s0Zts");
            default -> base + "M7lc1UVf-VE";
        };
    }
}
