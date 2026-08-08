export const DEFAULT_RESUME_DATA = {
  personal: {
    fullName: "Alex Rivera",
    title: "Full Stack Software Engineer",
    email: "alex.rivera@skillsphere.edu",
    phone: "+91 98765 43210",
    address: "Bengaluru, Karnataka",
    linkedin: "https://linkedin.com/in/alexrivera-dev",
    github: "https://github.com/alexrivera-dev",
    portfolio: "https://alexrivera.dev",
    photoUrl: "",
    summary: "Dedicated Full Stack Engineer experienced in building REST APIs with Node.js and user interfaces with React.js. Passionate about writing clean code and improving system performance."
  },
  education: [
    {
      id: "edu1",
      degree: "B.Tech in Computer Science & Engineering",
      college: "VTU Institute of Technology",
      university: "VTU",
      cgpa: "8.5 / 10.0",
      startYear: "2020",
      endYear: "2024"
    }
  ],
  experience: [
    {
      id: "exp1",
      company: "TechNexus Solutions",
      position: "Junior Software Engineer",
      duration: "Jun 2024 - Present",
      responsibilities: "Developed RESTful microservices using Node.js, Express, and MySQL.\nBuilt responsive frontend UI components using React 18 and Tailwind CSS.\nParticipated in daily Agile standups and code reviews."
    }
  ],
  projects: [
    {
      id: "proj1",
      name: "SkillSphere LMS Platform",
      description: "Learning management system with course player, quiz engine, and student analytics.",
      technologies: "React, Node.js, Express, MySQL",
      github: "https://github.com/alexrivera/skillsphere-lms",
      demo: "https://skillsphere.demo"
    }
  ],
  skills: {
    languages: "JavaScript, TypeScript, Java, HTML5, CSS3, SQL",
    frontend: "React.js, Redux, Tailwind CSS, HTML5",
    backend: "Node.js, Express.js, REST APIs",
    database: "MySQL, MongoDB",
    cloud: "AWS S3, EC2",
    devops: "Git, GitHub",
    testing: "Postman, Jest",
    tools: "VS Code, Postman, JIRA",
    softSkills: "Problem Solving, Teamwork, Communication"
  },
  certifications: [
    {
      id: "cert1",
      name: "SkillSphere Full Stack Certified Engineer",
      issuer: "SkillSphere Nexus",
      date: "Jan 2026",
      credentialUrl: "https://skillsphere.edu/verify/cert-1029"
    }
  ],
  achievements: [],
  languages: [
    { id: "lang1", name: "English", proficiency: "Professional" }
  ],
  interests: ["Web Development", "Open Source"],
  references: []
};

export const TEMPLATE_OPTIONS = [
  { id: "modern", name: "Modern ATS Standard", description: "Clean two-tone layout with left accent bar and clear section dividers." },
  { id: "professional", name: "Professional Corporate", description: "Traditional top-header layout favored by corporate recruiters & ATS scanners." }
];

export const AI_SUMMARY_SUGGESTIONS = [
  "Results-driven Full Stack Engineer with expertise in React, Node.js, Express, and relational database systems. Engineered REST microservices serving 100k+ active users while optimizing API response times by 35%.",
  "Passionate Software Developer specializing in modern frontend UI engineering with React.js, TypeScript, and Tailwind CSS. Reduced application bundle load time by 40% through lazy loading and component optimization.",
  "Backend Engineering Specialist proficient in Java 17, Spring Boot, Microservices, and SQL/NoSQL databases. Proven capability in optimizing database query execution paths and managing scalable cloud infrastructure.",
  "Cloud & DevOps Engineer experienced in AWS, Docker, Kubernetes, and automated CI/CD pipelines. Focused on maintaining 99.99% system uptime and secure infrastructure as code."
];

export const ACTION_VERBS = [
  "Engineered", "Architected", "Spearheaded", "Accelerated", "Optimized", "Implemented", "Designed", 
  "Streamlined", "Orchestrated", "Developed", "Deployed", "Refactored", "Automated", "Pioneered", "Transformed"
];

// Rigorous, Dynamic ATS Score Calculation Engine
export function calculateATSScore(data) {
  let personalScore = 0;
  let summaryScore = 0;
  let expScore = 0;
  let projScore = 0;
  let skillsScore = 0;
  let eduCertScore = 0;
  const missing = [];

  // 1. Personal & Contact Info (max 20)
  const p = data?.personal || {};
  if (p.fullName && p.fullName.trim().length >= 3) personalScore += 5;
  else missing.push("Full Name (min 3 chars)");

  if (p.title && p.title.trim().length >= 3) personalScore += 4;
  else missing.push("Professional Job Title");

  if (p.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email.trim())) personalScore += 4;
  else missing.push("Valid Email Address");

  if (p.phone && p.phone.trim().length >= 7) personalScore += 3;
  else missing.push("Phone Number");

  if (p.linkedin && p.linkedin.toLowerCase().includes("linkedin")) personalScore += 2;
  else missing.push("LinkedIn Profile Link");

  if ((p.github && p.github.toLowerCase().includes("github")) || (p.portfolio && p.portfolio.trim().length > 5)) personalScore += 2;
  else missing.push("GitHub or Portfolio URL");

  // 2. Professional Summary (max 15)
  const summaryText = (p.summary || "").trim();
  const summaryWords = summaryText ? summaryText.split(/\s+/).length : 0;
  if (summaryWords >= 25) {
    summaryScore += 10;
  } else if (summaryWords >= 10) {
    summaryScore += 5;
  } else {
    missing.push("Summary (min 25 words)");
  }

  const keywords = ["engineer", "developer", "scalable", "experience", "lead", "built", "managed", "full stack", "java", "react", "cloud", "api", "database", "optimized"];
  const summaryMatches = keywords.filter(k => summaryText.toLowerCase().includes(k)).length;
  summaryScore += Math.min(summaryMatches * 1, 5);

  // 3. Work Experience & Quantified Impact (max 25)
  const experiences = data?.experience || [];
  if (experiences.length >= 2) {
    expScore += 10;
  } else if (experiences.length === 1) {
    expScore += 6;
  } else {
    missing.push("Work Experience (add 2+ entries)");
  }

  let hasActionVerbs = false;
  let hasMetrics = false;
  const actionVerbsList = ["engineered", "architected", "spearheaded", "accelerated", "optimized", "implemented", "designed", "streamlined", "developed", "built", "led"];
  
  experiences.forEach(e => {
    const resp = (e.responsibilities || "").toLowerCase();
    if (actionVerbsList.some(verb => resp.includes(verb))) hasActionVerbs = true;
    if (/\d+%|\$\d+|\d+\+|\d+k|\d+ms|\d+\s*users|\d+\s*ms/i.test(resp)) hasMetrics = true;
  });

  if (hasActionVerbs) expScore += 8;
  else missing.push("Action Verbs in Experience (e.g., Engineered, Spearheaded)");

  if (hasMetrics) expScore += 7;
  else missing.push("Quantified Metrics in Experience (e.g., %, 40%, 100k users)");

  // 4. Projects (max 15)
  const projects = data?.projects || [];
  if (projects.length >= 2) {
    projScore += 8;
  } else if (projects.length === 1) {
    projScore += 4;
  } else {
    missing.push("Technical Projects (add 2+ entries)");
  }

  let hasTechStack = false;
  let hasLinks = false;
  projects.forEach(pr => {
    if (pr.technologies && pr.technologies.trim().length > 3) hasTechStack = true;
    if ((pr.github && pr.github.trim()) || (pr.demo && pr.demo.trim())) hasLinks = true;
  });

  if (hasTechStack) projScore += 4;
  else missing.push("Project Tech Stack list");

  if (hasLinks) projScore += 3;
  else missing.push("Project GitHub or Demo Link");

  // 5. Categorized Technical Skills (max 15)
  const skillsObj = data?.skills || {};
  let filledSkillCategories = 0;
  Object.values(skillsObj).forEach(val => {
    if (val && typeof val === 'string' && val.trim().length > 3) {
      filledSkillCategories++;
    }
  });

  if (filledSkillCategories >= 5) {
    skillsScore = 15;
  } else if (filledSkillCategories >= 3) {
    skillsScore = 10;
  } else if (filledSkillCategories >= 1) {
    skillsScore = 5;
  } else {
    missing.push("Categorized Technical Skills");
  }

  // 6. Education & Certifications (max 10)
  const education = data?.education || [];
  const certs = data?.certifications || [];
  if (education.length >= 1 && education[0].degree && education[0].college) {
    eduCertScore += 5;
  } else {
    missing.push("Degree & College Info");
  }

  if (certs.length >= 1 && certs[0].name) {
    eduCertScore += 5;
  } else {
    missing.push("Industry Certifications");
  }

  const totalScore = Math.min(
    personalScore + summaryScore + expScore + projScore + skillsScore + eduCertScore,
    100
  );

  return {
    totalScore,
    breakdown: {
      personal: personalScore,
      summary: summaryScore,
      experience: expScore,
      projects: projScore,
      skills: skillsScore,
      eduCert: eduCertScore
    },
    missing
  };
}
