export const CAREER_ROADMAPS_DATA = [
  {
    roleKey: "fullstack",
    title: "Full Stack Developer",
    category: "Web Development",
    description: "Master modern end-to-end web engineering from responsive frontend UI design to backend microservices, SQL/NoSQL databases, REST APIs, and cloud deployment architectures.",
    estimatedDuration: "12 Weeks (3 Months)",
    difficulty: "Intermediate",
    level: "Intermediate / Job-Ready Track",
    demand: "High Demand 🔥 (96% Growth)",
    companiesHiringCount: "520+ Tech Companies",
    streakDays: 7,

    // Salary Insights (100% INR)
    salaryInsights: {
      annualCtc: "₹14,50,000 / year",
      monthlySalary: "₹1,20,800 / month",
      fresherSalary: "₹6,50,000 / year",
      experiencedSalary: "₹24,00,000 / year"
    },

    // Progress Stats
    progressStats: {
      overallCompletion: 78,
      coursesCompleted: 12,
      modulesCompleted: 48,
      lessonsCompleted: 164,
      assessmentsDone: 15,
      codingSolved: 142,
      projectsDone: 5,
      totalLearningHours: 220,
      certsEarned: 3
    },

    // 2. Skills Required (Tech Chips)
    techStack: [
      { name: "HTML5 & CSS3", level: "Beginner", status: "Completed", icon: "Code" },
      { name: "JavaScript ES6+", level: "Intermediate", status: "Completed", icon: "Terminal" },
      { name: "React.js 18", level: "Intermediate", status: "In Progress", icon: "Sparkles" },
      { name: "Tailwind CSS", level: "Beginner", status: "Completed", icon: "Layers" },
      { name: "Node.js & Express", level: "Intermediate", status: "In Progress", icon: "Cpu" },
      { name: "MySQL & MongoDB", level: "Intermediate", status: "In Progress", icon: "FileText" },
      { name: "Docker & AWS", level: "Advanced", status: "Locked", icon: "ShieldCheck" },
      { name: "Git & GitHub", level: "Beginner", status: "Completed", icon: "CheckSquare" }
    ],

    // 3. Weekly Learning Timeline
    timelineTable: [
      { week: "Week 1", topics: "HTML5 Semantics, Forms, CSS Box Model & Typography", hours: "15 Hrs", assignment: "Profile Page", project: "Semantic Landing Page", status: "Completed", progress: 100 },
      { week: "Week 2", topics: "CSS Flexbox, Grid, Media Queries & Animations", hours: "18 Hrs", assignment: "Grid Dashboard", project: "Portfolio Website", status: "Completed", progress: 100 },
      { week: "Week 3", topics: "JavaScript ES6+, DOM Manipulation & Event Handling", hours: "20 Hrs", assignment: "Task Manager", project: "Interactive Task Board", status: "In Progress", progress: 75 },
      { week: "Week 4", topics: "Async JS, Promises, Fetch API & LocalStorage", hours: "20 Hrs", assignment: "API Fetcher", project: "Calculator & Weather App", status: "In Progress", progress: 40 },
      { week: "Week 5", topics: "React.js Core, JSX, Props & useState Hooks", hours: "22 Hrs", assignment: "Product Catalog", project: "Quiz App", status: "Locked", progress: 0 },
      { week: "Week 6", topics: "useEffect, Context API & React Router DOM v6", hours: "22 Hrs", assignment: "Router Setup", project: "Todo & Productivity App", status: "Locked", progress: 0 },
      { week: "Week 7", topics: "Node.js Event Loop, Express Middleware & REST APIs", hours: "20 Hrs", assignment: "Express Server", project: "Product REST Microservice", status: "Locked", progress: 0 },
      { week: "Week 8", topics: "Database Design, MySQL JOINs & MongoDB Mongoose", hours: "22 Hrs", assignment: "SQL Queries", project: "E-Commerce Database", status: "Locked", progress: 0 }
    ],

    weeks: [
      {
        weekNum: 1,
        title: "HTML5 & Modern CSS Fundamentals",
        learningHours: 15,
        topics: [
          { id: "w1_1", name: "Semantic HTML5 tags & Document Structure", completed: true },
          { id: "w1_2", name: "CSS Selectors, Box Model & Typography", completed: true },
          { id: "w1_3", name: "CSS Positioning & Z-Index", completed: true },
          { id: "w1_4", name: "Forms, Validation & Media Tags", completed: true }
        ],
        videos: [{ title: "HTML5 Masterclass for Beginners", duration: "45 mins" }],
        readings: [{ title: "MDN Web Docs: HTML Elements Reference", type: "Official Docs" }],
        codingPractice: [{ name: "Build a Structured Product Card", platform: "SkillSphere Practice", diff: "Easy" }],
        assignments: [{ title: "Responsive Semantic Profile Page", duration: "3 Hours" }],
        quiz: { title: "Week 1 HTML & CSS Core Quiz", questionsCount: 15 }
      },
      {
        weekNum: 2,
        title: "Advanced CSS: Flexbox, Grid & Responsive Design",
        learningHours: 18,
        topics: [
          { id: "w2_1", name: "Flexbox Layout Architecture & Alignment", completed: true },
          { id: "w2_2", name: "CSS Grid Template Columns & Areas", completed: true },
          { id: "w2_3", name: "Media Queries & Mobile-First Design", completed: true },
          { id: "w2_4", name: "CSS Variables, Transitions & Animations", completed: true }
        ],
        videos: [{ title: "Flexbox vs Grid Complete Guide", duration: "50 mins" }],
        readings: [{ title: "A Complete Guide to Flexbox (CSS-Tricks)", type: "Article" }],
        codingPractice: [{ name: "Create a Responsive Dashboard Grid", platform: "SkillSphere Practice", diff: "Easy" }],
        assignments: [{ title: "Mini Project: Responsive Portfolio Website", duration: "5 Hours" }],
        quiz: { title: "Week 2 Flexbox & Grid Assessment", questionsCount: 15 }
      }
    ],

    // 4. Daily Study Schedule
    dailyTimetable: [
      { day: "Monday", hours: "2.5 Hours", topic: "HTML5 Semantics & Core Structure", goal: "Complete 2 Video Lessons & Quiz", status: "Completed" },
      { day: "Tuesday", hours: "2.5 Hours", topic: "CSS Flexbox & Responsive Layouts", goal: "Build Flexbox Navigation Bar", status: "Completed" },
      { day: "Wednesday", hours: "3.0 Hours", topic: "JavaScript Syntax & Functions", goal: "Solve 5 SkillSphere JS Problems", status: "In Progress" },
      { day: "Thursday", hours: "2.5 Hours", topic: "DOM Events & Event Listeners", goal: "Create Dynamic Counter & List App", status: "In Progress" },
      { day: "Friday", hours: "3.0 Hours", topic: "Mini Project Development", goal: "Build Portfolio Layout in Code", status: "Pending" },
      { day: "Saturday", hours: "2.0 Hours", topic: "Weekly Evaluation & Assessment", goal: "Attempt Week 3 MCQ Test", status: "Pending" },
      { day: "Sunday", hours: "1.5 Hours", topic: "Revision & Code Refactoring", goal: "Commit Clean Code to GitHub", status: "Pending" }
    ],

    // 6. Coding Practice
    codingPracticeSummary: {
      easyCount: 65,
      mediumCount: 55,
      hardCount: 22,
      solved: 142,
      remaining: 108,
      acceptanceRate: "94.2%",
      streak: "7 Days Streak",
      leetcodeUrl: "https://leetcode.com/problemset/all/",
      hackerrankUrl: "https://www.hackerrank.com/domains/tutorials/10-days-of-javascript"
    },

    // 7. Projects
    miniProjects: [
      { 
        id: "p1",
        title: "Responsive Portfolio Website", 
        description: "Pixel-perfect personal developer portfolio with mobile-first CSS Grid, dark mode, and contact form.",
        difficulty: "Beginner", 
        hours: "5 Hours", 
        skills: ["HTML5", "CSS Grid", "Flexbox"], 
        status: "Completed",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=60",
        github: "https://github.com/skillsphere/portfolio-template",
        demo: "https://portfolio-skillsphere.vercel.app",
        resources: "https://github.com/skillsphere/portfolio-template/archive/refs/heads/main.zip"
      },
      { 
        id: "p2",
        title: "Interactive Web Calculator", 
        description: "Feature-rich calculator with keyboard support, calculation history, and custom themes.",
        difficulty: "Easy", 
        hours: "4 Hours", 
        skills: ["JS ES6+", "DOM API", "CSS"], 
        status: "Completed",
        image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500&auto=format&fit=crop&q=60",
        github: "https://github.com/skillsphere/js-calculator",
        demo: "https://calculator-skillsphere.vercel.app",
        resources: "https://github.com/skillsphere/js-calculator/archive/refs/heads/main.zip"
      },
      { 
        id: "p3",
        title: "Todo & Productivity Kanban Board", 
        description: "Task management app with drag-and-drop support, local storage persistence, and category filters.",
        difficulty: "Intermediate", 
        hours: "6 Hours", 
        skills: ["React", "LocalStorage", "Tailwind CSS"], 
        status: "In Progress",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&auto=format&fit=crop&q=60",
        github: "https://github.com/skillsphere/react-kanban-todo",
        demo: "https://kanban-skillsphere.vercel.app",
        resources: "https://github.com/skillsphere/react-kanban-todo/archive/refs/heads/main.zip"
      }
    ],

    // 8. Mock Interviews
    mockInterviews: {
      topics: ["Data Structures & Algorithms", "React Component Lifecycle & Hooks", "Node.js Microservices Architecture", "System Design & Database Indexing"],
      techQuestions: [
        "What is the difference between Virtual DOM and Real DOM in React?",
        "Explain Node.js Event Loop and Non-blocking I/O.",
        "Compare SQL vs NoSQL database ACID properties."
      ],
      hrQuestions: [
        "Tell me about a time you handled production bug outages.",
        "Where do you see yourself in 3 years as a Software Engineer?"
      ],
      systemDesign: [
        "Design a Scalable URL Shortener Service (like bit.ly)",
        "Design a Real-time Notification System (WebSockets/Redis)"
      ],
      interviewTips: [
        "Use the STAR method for behavioral questions (Situation, Task, Action, Result).",
        "Think out loud during algorithmic problem solving.",
        "Clarify edge cases before writing code."
      ]
    },

    // 9. Industry Certifications
    certifications: [
      { 
        name: "SkillSphere Certified Full Stack Engineer", 
        provider: "SkillSphere Nexus", 
        progress: 85, 
        duration: "12 Weeks", 
        difficulty: "Intermediate", 
        examFee: "Included Free",
        website: "https://skillsphere.edu/certs",
        guide: "https://skillsphere.edu/certs/guide",
        syllabus: "https://skillsphere.edu/certs/syllabus",
        practiceTest: "/dashboard/assessments"
      },
      { 
        name: "AWS Certified Developer – Associate", 
        provider: "Amazon Web Services", 
        progress: 60, 
        duration: "8 Weeks Prep", 
        difficulty: "Intermediate", 
        examFee: "₹12,500",
        website: "https://aws.amazon.com/certification/certified-developer-associate/",
        guide: "https://aws.amazon.com/certification/",
        syllabus: "https://d1.awsstatic.com/training-and-certification/docs-dev-associate/AWS-Certified-Developer-Associate_Exam-Guide.pdf",
        practiceTest: "https://aws.amazon.com/certification/certified-developer-associate/"
      },
      { 
        name: "Meta Frontend Developer Professional Certificate", 
        provider: "Meta / Coursera", 
        progress: 90, 
        duration: "10 Weeks", 
        difficulty: "Beginner/Intermediate", 
        examFee: "₹3,200 / mo",
        website: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
        guide: "https://coursera.org",
        syllabus: "https://coursera.org/meta-frontend",
        practiceTest: "https://coursera.org/meta-frontend"
      }
    ],

    // 10. Resume Preparation
    resumePrep: {
      atsScore: 88,
      checklist: [
        { item: "Quantified achievements (e.g. Improved load speed by 40%)", checked: true },
        { item: "GitHub repo links & live hosted demo URLs", checked: true },
        { item: "Clean Tech Stack keywords matched to ATS filters", checked: true },
        { item: "Education & Certifications verified", checked: true }
      ],
      templates: ["Enterprise ATS Developer", "Modern Tech Specialist", "Minimalist Full Stack"],
      tips: [
        "Keep resume under 1-2 pages.",
        "Use standard font like Inter, Roboto, or Arial for ATS parsing.",
        "Highlight measurable metrics in bullet points."
      ]
    },

    // 11. Job Opportunities (100% INR)
    companiesHiring: [
      { name: "Google", logo: "G", role: "Full Stack Engineer", location: "Bengaluru / Hybrid", salary: "₹18,00,000 – ₹32,00,000 / yr", website: "https://careers.google.com", skills: ["React", "TypeScript", "Node.js", "System Design"] },
      { name: "Microsoft", logo: "MS", role: "SDE-1 Full Stack", location: "Hyderabad / Remote", salary: "₹16,00,000 – ₹28,00,000 / yr", website: "https://careers.microsoft.com", skills: ["React", "C# / Node", "Azure", "SQL"] },
      { name: "Amazon", logo: "AMZ", role: "Software Development Engineer", location: "Chennai / Hybrid", salary: "₹15,00,000 – ₹26,00,000 / yr", website: "https://amazon.jobs", skills: ["Java", "React", "AWS", "Microservices"] },
      { name: "Zoho", logo: "Z", role: "Product Developer", location: "Chennai", salary: "₹10,00,000 – ₹18,00,000 / yr", website: "https://zoho.com/careers", skills: ["JavaScript", "Java", "PostgreSQL", "REST APIs"] }
    ],

    // 13. Learning Calendar
    calendarEvents: [
      { id: "c1", date: "Aug 06, 2026", time: "10:00 AM", title: "JavaScript ES6 DOM Quiz", type: "Quiz", completed: false, badgeColor: "bg-purple-500/20 text-purple-300" },
      { id: "c2", date: "Aug 08, 2026", time: "11:59 PM", title: "Task Board Assignment Due", type: "Assignment", completed: false, badgeColor: "bg-blue-500/20 text-blue-300" },
      { id: "c3", date: "Aug 12, 2026", time: "6:00 PM", title: "Portfolio Project Deadline", type: "Project", completed: false, badgeColor: "bg-emerald-500/20 text-emerald-300" },
      { id: "c4", date: "Aug 15, 2026", time: "4:00 PM", title: "System Design Mock Interview", type: "Mock Interview", completed: false, badgeColor: "bg-pink-500/20 text-pink-300" }
    ],

    // 14. Learning Resources
    resources: [
      { category: "Books", items: [{ name: "Eloquent JavaScript (3rd Ed)", url: "https://eloquentjavascript.net/" }, { name: "You Don't Know JS Yet", url: "https://github.com/getify/You-Dont-Know-JS" }] },
      { category: "Official Documentation", items: [{ name: "MDN Web Docs", url: "https://developer.mozilla.org/" }, { name: "React.dev Official Manual", url: "https://react.dev/" }] },
      { category: "GitHub Repositories", items: [{ name: "clean-code-javascript", url: "https://github.com/ryanmcdermott/clean-code-javascript" }, { name: "developer-roadmap", url: "https://github.com/kamranahmedse/developer-roadmap" }] },
      { category: "YouTube Playlists", items: [{ name: "Traversy Media Web Dev", url: "https://youtube.com/traversymedia" }, { name: "Fireship 100 Seconds of Code", url: "https://youtube.com/fireship" }] },
      { category: "Practice Platforms", items: [{ name: "SkillSphere Coding Arena", url: "/dashboard/coding-practice" }, { name: "LeetCode Problem Set", url: "https://leetcode.com/" }] }
    ]
  },

  {
    roleKey: "java",
    title: "Java Backend Developer",
    category: "Backend Engineering",
    description: "Build scalable enterprise backend services with Java 17+, Spring Boot 3, Hibernate/JPA, Microservices architecture, PostgreSQL, and Kafka messaging.",
    estimatedDuration: "12 Weeks (3 Months)",
    difficulty: "Intermediate / Advanced",
    level: "Enterprise Backend Specialist Track",
    demand: "Extremely High 🔥 (98% Growth)",
    companiesHiringCount: "480+ Enterprise Companies",
    streakDays: 7,

    salaryInsights: {
      annualCtc: "₹12,00,000 / year",
      monthlySalary: "₹1,00,000 / month",
      fresherSalary: "₹5,00,000 / year",
      experiencedSalary: "₹20,00,000 / year"
    },

    progressStats: {
      overallCompletion: 70,
      coursesCompleted: 10,
      modulesCompleted: 40,
      lessonsCompleted: 140,
      assessmentsDone: 12,
      codingSolved: 130,
      projectsDone: 4,
      totalLearningHours: 210,
      certsEarned: 2
    },

    techStack: [
      { name: "Java 17+", level: "Intermediate", status: "Completed", icon: "Code" },
      { name: "OOP Principles", level: "Beginner", status: "Completed", icon: "CheckSquare" },
      { name: "Spring Boot 3", level: "Intermediate", status: "In Progress", icon: "Cpu" },
      { name: "Spring Data JPA", level: "Intermediate", status: "In Progress", icon: "FileText" },
      { name: "PostgreSQL", level: "Intermediate", status: "In Progress", icon: "Layers" },
      { name: "Apache Kafka", level: "Advanced", status: "Locked", icon: "Terminal" }
    ],

    timelineTable: [
      { week: "Week 1", topics: "Java 17 Syntax, OOP, Memory & Collections", hours: "18 Hrs", assignment: "Bank Engine", project: "Banking Account Engine", status: "Completed", progress: 100 },
      { week: "Week 2", topics: "Java Streams, Lambdas & Multithreading", hours: "20 Hrs", assignment: "Stream Processing", project: "Concurrent Processing Engine", status: "Completed", progress: 100 }
    ],

    weeks: [
      {
        weekNum: 1,
        title: "Java Core: Syntax, OOP & Collections",
        learningHours: 18,
        topics: [
          { id: "jw1_1", name: "Java JDK 17 Setup & Memory Management", completed: true },
          { id: "jw1_2", name: "OOP Encapsulation & Polymorphism", completed: true }
        ],
        videos: [{ title: "Java 17 Core Crash Course", duration: "1 Hour 10 mins" }],
        readings: [{ title: "Oracle Java SE 17 Docs", type: "Official Docs" }],
        codingPractice: [{ name: "Custom LinkedList Implementation", platform: "SkillSphere Practice", diff: "Medium" }],
        assignments: [{ title: "Console Bank System", duration: "4 Hours" }],
        quiz: { title: "Week 1 Java Core Quiz", questionsCount: 20 }
      }
    ],

    dailyTimetable: [
      { day: "Monday", hours: "2.5 Hours", topic: "Java Core & OOP Principles", goal: "Complete Encapsulation Modules", status: "Completed" }
    ],

    codingPracticeSummary: {
      easyCount: 50, mediumCount: 60, hardCount: 20, solved: 130, remaining: 110, acceptanceRate: "92.5%", streak: "7 Days",
      leetcodeUrl: "https://leetcode.com", hackerrankUrl: "https://hackerrank.com"
    },

    miniProjects: [
      { id: "jp1", title: "Banking Account Engine", description: "Java 17 OOP engine for multi-currency accounts.", difficulty: "Beginner", hours: "5 Hours", skills: ["Java 17", "OOP"], status: "Completed", image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500&auto=format&fit=crop&q=60", github: "https://github.com", demo: "https://github.com", resources: "https://github.com" }
    ],

    mockInterviews: {
      topics: ["Java Collections", "Spring IoC Bean Lifecycle", "Hibernate N+1 Query Problem"],
      techQuestions: ["What is the difference between Comparable and Comparator?"],
      hrQuestions: ["Why choose Java Spring Boot for Enterprise Backends?"],
      systemDesign: ["Design a Rate Limiter Service"],
      interviewTips: ["Master Java Stream API operations."]
    },

    certifications: [
      { name: "Oracle Certified Professional: Java SE 17", provider: "Oracle", progress: 80, duration: "12 Weeks", difficulty: "Advanced", examFee: "₹19,800", website: "https://oracle.com", guide: "https://oracle.com", syllabus: "https://oracle.com", practiceTest: "https://oracle.com" }
    ],

    resumePrep: { atsScore: 85, checklist: [{ item: "Spring Boot experience listed", checked: true }], templates: ["Backend Engineer ATS"], tips: ["Highlight Java 17 features."] },
    companiesHiring: [{ name: "Amazon", logo: "AMZ", role: "Java Backend Engineer", location: "Bengaluru", salary: "₹16,00,000 – ₹28,00,000 / yr", website: "https://amazon.jobs", skills: ["Java 17", "Spring Boot", "AWS"] }],
    calendarEvents: [{ id: "cj1", date: "Aug 07, 2026", time: "4:00 PM", title: "Spring Boot Controller Test", type: "Quiz", completed: false, badgeColor: "bg-purple-500/20 text-purple-300" }],
    resources: [{ category: "Books", items: [{ name: "Effective Java", url: "https://oracle.com" }] }]
  },

  {
    roleKey: "frontend",
    title: "Frontend Developer",
    category: "Web Development",
    description: "Specialize in building ultra-responsive, beautiful, accessible, and fast web user interfaces using HTML5, Modern CSS/Tailwind, JavaScript, React.js, TypeScript, Next.js, and Redux Toolkit.",
    estimatedDuration: "10 Weeks (2.5 Months)",
    difficulty: "Intermediate",
    level: "Frontend UI/UX Engineering Track",
    demand: "High Demand 🔥 (94% Growth)",
    companiesHiringCount: "600+ Web Agencies",
    streakDays: 7,

    salaryInsights: {
      annualCtc: "₹9,50,000 / year",
      monthlySalary: "₹79,000 / month",
      fresherSalary: "₹5,00,000 / year",
      experiencedSalary: "₹16,00,000 / year"
    },

    progressStats: {
      overallCompletion: 82,
      coursesCompleted: 9,
      modulesCompleted: 36,
      lessonsCompleted: 130,
      assessmentsDone: 10,
      codingSolved: 120,
      projectsDone: 4,
      totalLearningHours: 180,
      certsEarned: 2
    },

    techStack: [
      { name: "HTML5 & CSS3", level: "Beginner", status: "Completed", icon: "Code" },
      { name: "Tailwind CSS", level: "Beginner", status: "Completed", icon: "Layers" },
      { name: "JavaScript ES6+", level: "Intermediate", status: "Completed", icon: "Terminal" },
      { name: "React.js 18", level: "Intermediate", status: "In Progress", icon: "Sparkles" },
      { name: "TypeScript", level: "Intermediate", status: "Locked", icon: "ShieldCheck" }
    ],

    timelineTable: [
      { week: "Week 1", topics: "HTML5 Accessibility, CSS Grid & Tailwind CSS", hours: "16 Hrs", assignment: "Tailwind UI", project: "SaaS Landing Page", status: "Completed", progress: 100 },
      { week: "Week 2", topics: "Modern JS Modules, Async/Await & DOM Events", hours: "18 Hrs", assignment: "Kanban Board", project: "Kanban Task App", status: "Completed", progress: 100 }
    ],

    weeks: [
      {
        weekNum: 1,
        title: "Pixel-Perfect HTML5, Modern CSS & Tailwind",
        learningHours: 16,
        topics: [{ id: "fw1_1", name: "Semantic HTML5 Accessibility", completed: true }],
        videos: [{ title: "Tailwind CSS Course", duration: "1 Hour" }],
        readings: [{ title: "Tailwind Docs", type: "Docs" }],
        codingPractice: [{ name: "Clone Stripe Hero", platform: "SkillSphere", diff: "Easy" }],
        assignments: [{ title: "Responsive Landing Page", duration: "4 Hours" }],
        quiz: { title: "Week 1 CSS Quiz", questionsCount: 15 }
      }
    ],

    dailyTimetable: [{ day: "Monday", hours: "2.5 Hours", topic: "Tailwind Utilities", goal: "Build Hero Component", status: "Completed" }],
    codingPracticeSummary: { easyCount: 60, mediumCount: 50, hardCount: 10, solved: 120, remaining: 80, acceptanceRate: "96.0%", streak: "7 Days", leetcodeUrl: "https://leetcode.com", hackerrankUrl: "https://hackerrank.com" },
    miniProjects: [{ id: "fp1", title: "SaaS Landing Page", description: "Tailwind CSS Landing Page", difficulty: "Easy", hours: "4 Hours", skills: ["Tailwind CSS"], status: "Completed", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60", github: "https://github.com", demo: "https://vercel.app", resources: "https://github.com" }],
    mockInterviews: { topics: ["DOM Rendering", "React Custom Hooks"], techQuestions: ["Explain SSR vs SSG in Next.js."], hrQuestions: ["How to support cross-browser compatibility?"], systemDesign: ["Design a Frontend Design System"], interviewTips: ["Focus on component reusability."] },
    certifications: [{ name: "Meta Frontend Developer Certificate", provider: "Meta", progress: 95, duration: "10 Weeks", difficulty: "Intermediate", examFee: "₹3,200 / mo", website: "https://coursera.org", guide: "https://coursera.org", syllabus: "https://coursera.org", practiceTest: "https://coursera.org" }],
    resumePrep: { atsScore: 92, checklist: [{ item: "Vercel live demo links included", checked: true }], templates: ["Frontend Specialist"], tips: ["Showcase deployed projects."] },
    companiesHiring: [{ name: "Freshworks", logo: "FW", role: "Frontend Developer", location: "Chennai", salary: "₹10,00,000 – ₹18,00,000 / yr", website: "https://freshworks.com", skills: ["React", "TypeScript", "Tailwind"] }],
    calendarEvents: [{ id: "cf1", date: "Aug 06, 2026", time: "2:00 PM", title: "React Router Quiz", type: "Quiz", completed: false, badgeColor: "bg-purple-500/20 text-purple-300" }],
    resources: [{ category: "Books", items: [{ name: "CSS Secrets", url: "https://css-tricks.com" }] }]
  },

  {
    roleKey: "python",
    title: "Python Developer",
    category: "Backend & Automation",
    description: "Master Python 3.12, Object-Oriented Design, Django 5, FastAPI, REST APIs, Web Scraping, PostgreSQL, PyTest, and Data Automation scripts.",
    estimatedDuration: "10 Weeks (2.5 Months)",
    difficulty: "Beginner / Intermediate",
    level: "Python & Backend Automation Track",
    demand: "Very High 🔥 (95% Growth)",
    companiesHiringCount: "420+ Companies",
    streakDays: 7,

    salaryInsights: {
      annualCtc: "₹11,00,000 / year",
      monthlySalary: "₹91,600 / month",
      fresherSalary: "₹5,50,000 / year",
      experiencedSalary: "₹18,00,000 / year"
    },

    progressStats: {
      overallCompletion: 68,
      coursesCompleted: 8,
      modulesCompleted: 32,
      lessonsCompleted: 110,
      assessmentsDone: 9,
      codingSolved: 110,
      projectsDone: 3,
      totalLearningHours: 175,
      certsEarned: 1
    },

    techStack: [{ name: "Python 3.12", level: "Beginner", status: "Completed", icon: "Code" }],
    timelineTable: [{ week: "Week 1", topics: "Python Syntax & Control Flow", hours: "15 Hrs", assignment: "CLI App", project: "Expense Tracker", status: "Completed", progress: 100 }],
    weeks: [{ weekNum: 1, title: "Python 3 Core", learningHours: 15, topics: [{ id: "py1", name: "Python Syntax", completed: true }] }],
    dailyTimetable: [{ day: "Monday", hours: "2.5 Hours", topic: "Python Basics", goal: "Complete Code Labs", status: "Completed" }],
    codingPracticeSummary: { easyCount: 55, mediumCount: 45, hardCount: 10, solved: 110, remaining: 100, acceptanceRate: "93.0%", streak: "7 Days", leetcodeUrl: "https://leetcode.com", hackerrankUrl: "https://hackerrank.com" },
    miniProjects: [{ id: "pyp1", title: "CLI Expense Tracker", description: "Python automation tool", difficulty: "Easy", hours: "4 Hours", skills: ["Python"], status: "Completed", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60", github: "https://github.com", demo: "https://github.com", resources: "https://github.com" }],
    mockInterviews: { topics: ["Python GIL", "Django ORM vs Raw SQL"], techQuestions: ["Explain AsyncIO in Python."], hrQuestions: ["Why Python for web backend?"], systemDesign: ["Design a Web Scraper Pipeline"], interviewTips: ["Master PyTest."] },
    certifications: [{ name: "PCEP Python Certificate", provider: "Python Institute", progress: 90, duration: "6 Weeks", difficulty: "Beginner", examFee: "₹6,500", website: "https://python.org", guide: "https://python.org", syllabus: "https://python.org", practiceTest: "https://python.org" }],
    resumePrep: { atsScore: 84, checklist: [{ item: "GitHub Python repos included", checked: true }], templates: ["Python Engineer"], tips: ["Add PyTest coverage."] },
    companiesHiring: [{ name: "Google", logo: "G", role: "Python Developer", location: "Bengaluru", salary: "₹16,00,000 – ₹30,00,000 / yr", website: "https://careers.google.com", skills: ["Python", "Django", "GCP"] }],
    calendarEvents: [{ id: "cpy1", date: "Aug 09, 2026", time: "11:00 AM", title: "Python OOP Test", type: "Quiz", completed: false, badgeColor: "bg-purple-500/20 text-purple-300" }],
    resources: [{ category: "Books", items: [{ name: "Fluent Python", url: "https://python.org" }] }]
  },

  {
    roleKey: "cloud",
    title: "Cloud Engineer",
    category: "Cloud & Infrastructure",
    description: "Design, deploy, and manage secure cloud infrastructure on AWS and Google Cloud using Terraform, Docker, Kubernetes, Linux, and Cloud Networking.",
    estimatedDuration: "12 Weeks (3 Months)",
    difficulty: "Advanced",
    level: "Cloud Solutions Architect Track",
    demand: "High Demand 🔥 (97% Growth)",
    companiesHiringCount: "380+ Cloud Firms",
    streakDays: 7,

    salaryInsights: {
      annualCtc: "₹15,50,000 / year",
      monthlySalary: "₹1,29,000 / month",
      fresherSalary: "₹7,00,000 / year",
      experiencedSalary: "₹26,00,000 / year"
    },

    progressStats: {
      overallCompletion: 74,
      coursesCompleted: 9,
      modulesCompleted: 36,
      lessonsCompleted: 120,
      assessmentsDone: 11,
      codingSolved: 95,
      projectsDone: 3,
      totalLearningHours: 200,
      certsEarned: 2
    },

    techStack: [{ name: "AWS EC2/VPC", level: "Intermediate", status: "In Progress", icon: "ShieldCheck" }],
    timelineTable: [{ week: "Week 1", topics: "Linux Administration & Bash", hours: "18 Hrs", assignment: "Bash Script", project: "Hardened Linux Server", status: "Completed", progress: 100 }],
    weeks: [{ weekNum: 1, title: "Linux SysAdmin", learningHours: 18, topics: [{ id: "cl1", name: "Linux CLI", completed: true }] }],
    dailyTimetable: [{ day: "Monday", hours: "2.5 Hours", topic: "Linux & AWS VPC", goal: "Configure Subnets", status: "Completed" }],
    codingPracticeSummary: { easyCount: 40, mediumCount: 40, hardCount: 15, solved: 95, remaining: 85, acceptanceRate: "90.0%", streak: "7 Days", leetcodeUrl: "https://leetcode.com", hackerrankUrl: "https://hackerrank.com" },
    miniProjects: [{ id: "clp1", title: "AWS Multi-AZ VPC in Terraform", description: "Infrastructure as code blueprint", difficulty: "Intermediate", hours: "8 Hours", skills: ["AWS", "Terraform"], status: "Completed", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60", github: "https://github.com", demo: "https://aws.amazon.com", resources: "https://github.com" }],
    mockInterviews: { topics: ["Security Groups vs NACL", "VPC Peering"], techQuestions: ["Explain AWS ALB vs NLB."], hrQuestions: ["How to manage cloud cost optimization?"], systemDesign: ["Design a Multi-Region AWS Architecture"], interviewTips: ["Draw clear cloud architecture diagrams."] },
    certifications: [{ name: "AWS Certified Solutions Architect", provider: "AWS", progress: 85, duration: "8 Weeks", difficulty: "Intermediate", examFee: "₹12,500", website: "https://aws.amazon.com", guide: "https://aws.amazon.com", syllabus: "https://aws.amazon.com", practiceTest: "https://aws.amazon.com" }],
    resumePrep: { atsScore: 89, checklist: [{ item: "AWS Architecture diagrams included", checked: true }], templates: ["Cloud Architect"], tips: ["Show Terraform script links."] },
    companiesHiring: [{ name: "Amazon", logo: "AMZ", role: "Cloud Solutions Architect", location: "Hyderabad", salary: "₹18,00,000 – ₹32,00,000 / yr", website: "https://amazon.jobs", skills: ["AWS", "Terraform", "K8s"] }],
    calendarEvents: [{ id: "ccl1", date: "Aug 10, 2026", time: "3:00 PM", title: "AWS VPC Exam", type: "Certificate Exam", completed: false, badgeColor: "bg-amber-500/20 text-amber-300" }],
    resources: [{ category: "Books", items: [{ name: "AWS Architect Guide", url: "https://aws.amazon.com" }] }]
  }
];
