import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, BookOpen, Award, Code, CheckCircle, Clock, ChevronRight, Sparkles, Terminal, 
  Briefcase, Calendar, Flame, TrendingUp, CheckSquare, FileText, Layers, Video, 
  ExternalLink, ShieldCheck, Cpu, Building2, Play, Target, ArrowRight, Brain, Zap, 
  Check, Star, HelpCircle, Send, FileCode, UserCheck, Download, Bookmark, Plus, X, BarChart2, DollarSign, MapPin, Search, Lock, Unlock, Upload, CheckCircle2, RotateCcw, AlertCircle, RefreshCw, Eye, ListOrdered
} from 'lucide-react';
import api from '../../../api/client';
import { CAREER_ROADMAPS_DATA } from './data/roadmapData';

export default function CareerRoadmapsSection() {
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState(CAREER_ROADMAPS_DATA);
  const [selectedRoleKey, setSelectedRoleKey] = useState("fullstack");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("sec-overview");

  // Selected Week for Daily Plan (Default to Week 1)
  const [selectedWeekForDailyPlan, setSelectedWeekForDailyPlan] = useState(1);

  // Hourly Schedule Modal State
  const [hourlyModalOpen, setHourlyModalOpen] = useState(false);
  const [selectedHourlyDay, setSelectedHourlyDay] = useState(null);

  // Interactive Week Submissions State
  const [submittedWeeks, setSubmittedWeeks] = useState({
    1: { assignmentSubmitted: true, projectSubmitted: true, completed: true, githubUrl: 'https://github.com/student/week1-html5', demoUrl: 'https://week1-profile.vercel.app' },
    2: { assignmentSubmitted: true, projectSubmitted: true, completed: true, githubUrl: 'https://github.com/student/week2-flexbox', demoUrl: 'https://week2-portfolio.vercel.app' },
    3: { assignmentSubmitted: false, projectSubmitted: false, completed: false, githubUrl: '', demoUrl: '' },
    4: { assignmentSubmitted: false, projectSubmitted: false, completed: false, githubUrl: '', demoUrl: '' },
    5: { assignmentSubmitted: false, projectSubmitted: false, completed: false, githubUrl: '', demoUrl: '' },
    6: { assignmentSubmitted: false, projectSubmitted: false, completed: false, githubUrl: '', demoUrl: '' },
    7: { assignmentSubmitted: false, projectSubmitted: false, completed: false, githubUrl: '', demoUrl: '' },
    8: { assignmentSubmitted: false, projectSubmitted: false, completed: false, githubUrl: '', demoUrl: '' }
  });

  // Modal State for Submission
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [submissionTarget, setSubmissionTarget] = useState(null);
  const [submissionForm, setSubmissionForm] = useState({ githubUrl: '', demoUrl: '', notes: '', fileName: '' });

  const [toastMessage, setToastMessage] = useState(null);

  // Detailed Daily Plans mapped per Week with Daily Coding Challenges & Hourly Breakdowns
  const weekDailyPlans = {
    1: {
      weekTitle: "Week 1: HTML5 Semantics, Forms, CSS Box Model & Typography",
      schedule: [
        { 
          day: "Mon (Day 1)", 
          time: "09:00 AM - 10:30 AM", 
          topic: "Semantic HTML5 Tags & Document Structure", 
          duration: "1.5 Hours", 
          goal: "Master <header>, <nav>, <main>, <article>, and <footer> tags", 
          status: "Completed", 
          codingChallenge: "Build a Semantic HTML5 Card with <article> & <header>", 
          codingDiff: "Easy",
          hourlySlots: [
            { time: "09:00 AM - 09:30 AM", task: "Video Lecture: Semantic HTML5 Tags (<header>, <nav>, <main>, <article>, <footer>)", type: "Lecture", completed: true },
            { time: "09:30 AM - 10:00 AM", task: "Hands-on Code Practice: Build clean document markup structure", type: "Practice", completed: true },
            { time: "10:00 AM - 10:30 AM", task: "Daily Coding Challenge: Build a Semantic HTML5 Card with <article> & <header>", type: "Coding", completed: true },
            { time: "02:00 PM - 03:00 PM", task: "Self-Check Assessment: Quiz on Semantic Tags vs <div> containers", type: "Assessment", completed: true },
            { time: "04:00 PM - 05:00 PM", task: "GitHub Version Control: Commit & Push Day 1 Code Repository", type: "Submission", completed: true }
          ]
        },
        { 
          day: "Tue (Day 2)", 
          time: "11:00 AM - 01:00 PM", 
          topic: "CSS Selectors, Box Model & Typography", 
          duration: "2.0 Hours", 
          goal: "Understand margin collapsing, border-box & custom fonts", 
          status: "Completed", 
          codingChallenge: "CSS Box Model: Center a Card with Auto Margins & Padding", 
          codingDiff: "Easy",
          hourlySlots: [
            { time: "11:00 AM - 11:45 AM", task: "Video Lecture: CSS Box Model (Margin, Border, Padding & Content Box)", type: "Lecture", completed: true },
            { time: "11:45 AM - 12:30 PM", task: "Hands-on Practice: Experiment with box-sizing: border-box and margin collapsing", type: "Practice", completed: true },
            { time: "12:30 PM - 01:00 PM", task: "Daily Coding Challenge: Center a Card with Auto Margins & Padding", type: "Coding", completed: true },
            { time: "03:00 PM - 04:00 PM", task: "Typography Workshop: Google Fonts Integration & Line-Height Scaling", type: "Practice", completed: true }
          ]
        },
        { 
          day: "Wed (Day 3)", 
          time: "02:00 PM - 03:30 PM", 
          topic: "CSS Positioning, Z-Index & Layout Flow", 
          duration: "1.5 Hours", 
          goal: "Master relative, absolute, fixed & sticky positioning", 
          status: "Completed", 
          codingChallenge: "CSS Positioning: Build a Fixed Navigation Bar with Z-Index", 
          codingDiff: "Easy",
          hourlySlots: [
            { time: "02:00 PM - 02:45 PM", task: "Video Lecture: CSS Positioning (static, relative, absolute, fixed, sticky)", type: "Lecture", completed: true },
            { time: "02:45 PM - 03:30 PM", task: "Hands-on Practice: Build a Sticky Navigation Bar with Z-Index layering", type: "Practice", completed: true },
            { time: "05:00 PM - 06:00 PM", task: "Daily Coding Challenge: Position Floating Action Buttons & Tooltips", type: "Coding", completed: true }
          ]
        },
        { 
          day: "Thu (Day 4)", 
          time: "04:00 PM - 05:00 PM", 
          topic: "Forms, Input Validation & Media Tags", 
          duration: "1.0 Hour", 
          goal: "Build accessible forms with native pattern validation", 
          status: "Completed", 
          codingChallenge: "Form Validation: Build a Registration Form with RegEx", 
          codingDiff: "Easy",
          hourlySlots: [
            { time: "04:00 PM - 04:30 PM", task: "Video Lecture: HTML5 Form Input Types, Attributes & Pattern Validation", type: "Lecture", completed: true },
            { time: "04:30 PM - 05:00 PM", task: "Daily Coding Challenge: Build a Registration Form with RegEx Validation", type: "Coding", completed: true }
          ]
        },
        { 
          day: "Fri (Day 5)", 
          time: "06:00 PM - 08:00 PM", 
          topic: "Assignment: Semantic Profile Page", 
          duration: "2.0 Hours", 
          goal: "Code clean responsive profile page without frameworks", 
          status: "Completed", 
          codingChallenge: "Assignment: Responsive Semantic Developer Profile Page", 
          codingDiff: "Medium",
          hourlySlots: [
            { time: "06:00 PM - 07:00 PM", task: "Architecture & Markup: Code Semantic Profile Structure", type: "Practice", completed: true },
            { time: "07:00 PM - 08:00 PM", task: "Styling & Submission: Apply Custom CSS Theme & Upload to SkillSphere", type: "Submission", completed: true }
          ]
        },
        { 
          day: "Sat (Day 6)", 
          time: "10:00 AM - 01:00 PM", 
          topic: "Mini Project: Semantic Landing Page", 
          duration: "3.0 Hours", 
          goal: "Build complete product landing page with CSS styling", 
          status: "Completed", 
          codingChallenge: "Mini Project: Product Landing Page with Custom CSS Styling", 
          codingDiff: "Medium",
          hourlySlots: [
            { time: "10:00 AM - 11:30 AM", task: "Build Hero Section, Navigation & Feature Cards", type: "Coding", completed: true },
            { time: "11:30 AM - 01:00 PM", task: "Deploy to Vercel & Submit Mini Project GitHub Repo", type: "Submission", completed: true }
          ]
        },
        { 
          day: "Sun (Day 7)", 
          time: "04:00 PM - 05:00 PM", 
          topic: "Code Review & Submission", 
          duration: "1.0 Hour", 
          goal: "Submit Week 1 Assignment & Mini Project to unlock Week 2!", 
          status: "Completed", 
          codingChallenge: "Code Review & Refactoring: Optimize CSS Selectors & Clean Up", 
          codingDiff: "Easy",
          hourlySlots: [
            { time: "04:00 PM - 05:00 PM", task: "Code Review & Refactoring: Validate W3C Standards & Unlock Week 2!", type: "Submission", completed: true }
          ]
        }
      ]
    },
    2: {
      weekTitle: "Week 2: CSS Flexbox, Grid, Media Queries & Animations",
      schedule: [
        { 
          day: "Mon (Day 1)", 
          time: "09:00 AM - 10:30 AM", 
          topic: "Flexbox Architecture & Alignment", 
          duration: "1.5 Hours", 
          goal: "Master flex-direction, justify-content, align-items & flex-grow", 
          status: "Completed", 
          codingChallenge: "Flexbox Challenge: Build a Responsive Navigation Bar", 
          codingDiff: "Easy",
          hourlySlots: [
            { time: "09:00 AM - 09:45 AM", task: "Video Lecture: Flexbox Container & Item Properties", type: "Lecture", completed: true },
            { time: "09:45 AM - 10:30 AM", task: "Daily Coding Challenge: Build a Responsive Flexbox Nav Bar", type: "Coding", completed: true }
          ]
        },
        { 
          day: "Tue (Day 2)", 
          time: "11:00 AM - 01:00 PM", 
          topic: "CSS Grid Template Columns & Areas", 
          duration: "2.0 Hours", 
          goal: "Build 2D dashboard layouts using repeat() and minmax()", 
          status: "Completed", 
          codingChallenge: "CSS Grid: Construct a 3-Column Responsive Dashboard Layout", 
          codingDiff: "Medium",
          hourlySlots: [
            { time: "11:00 AM - 12:00 PM", task: "Video Lecture: CSS Grid Areas, Tracks & minmax()", type: "Lecture", completed: true },
            { time: "12:00 PM - 01:00 PM", task: "Daily Coding Challenge: 3-Column Responsive Dashboard Layout", type: "Coding", completed: true }
          ]
        },
        { day: "Wed (Day 3)", time: "02:00 PM - 03:30 PM", topic: "Media Queries & Mobile-First Design", duration: "1.5 Hours", goal: "Set responsive breakpoints for mobile, tablet & desktop", status: "Completed", codingChallenge: "Responsive Breakpoints: Hide & Toggle Mobile Drawer Menu", codingDiff: "Easy" },
        { day: "Thu (Day 4)", time: "04:00 PM - 05:00 PM", topic: "CSS Variables, Keyframes & Micro-Animations", duration: "1.0 Hour", goal: "Add hover effects, keyframe loaders & smooth transitions", status: "Completed", codingChallenge: "CSS Animation: Build a Pulsing Loading Spinner & Hover Glow", codingDiff: "Easy" },
        { day: "Fri (Day 5)", time: "06:00 PM - 08:00 PM", topic: "Assignment: Grid Dashboard Layout", duration: "2.0 Hours", goal: "Build responsive analytics dashboard layout with CSS Grid", status: "Completed", codingChallenge: "Assignment: Analytics Dashboard Grid Layout with Cards", codingDiff: "Medium" },
        { day: "Sat (Day 6)", time: "10:00 AM - 01:00 PM", topic: "Mini Project: Developer Portfolio Website", duration: "3.0 Hours", goal: "Build personal portfolio website with mobile menu & dark mode", status: "Completed", codingChallenge: "Mini Project: Responsive Developer Portfolio Website", codingDiff: "Medium" },
        { day: "Sun (Day 7)", time: "04:00 PM - 05:00 PM", topic: "Code Review & Submission", duration: "1.0 Hour", goal: "Submit Week 2 Assignment & Mini Project to unlock Week 3!", status: "Completed", codingChallenge: "CSS Linting: Validate & Minify Flexbox & Grid Styles", codingDiff: "Easy" }
      ]
    },
    3: {
      weekTitle: "Week 3: JavaScript ES6+, DOM Manipulation & Event Handling",
      schedule: [
        { day: "Mon (Day 1)", time: "09:00 AM - 10:30 AM", topic: "JS ES6 Variables, Arrow Functions & Scope", duration: "1.5 Hours", goal: "Understand block scope, lexical scope & arrow function syntax", status: "In Progress", codingChallenge: "JS ES6 Challenge: Refactor Functions to Arrow Syntax & Closures", codingDiff: "Easy" },
        { day: "Tue (Day 2)", time: "11:00 AM - 01:00 PM", topic: "Array Functional Methods (map, filter, reduce)", duration: "2.0 Hours", goal: "Master immutable data transformations in JavaScript", status: "In Progress", codingChallenge: "Array Challenge: Filter Active Users & Calculate Total Revenue with Reduce", codingDiff: "Medium" },
        { day: "Wed (Day 3)", time: "02:00 PM - 03:30 PM", topic: "DOM Manipulation & Event Listeners", duration: "1.5 Hours", goal: "querySelector, addEventListener & Event Delegation", status: "Pending", codingChallenge: "DOM Challenge: Event Listener Delegation on Dynamic Lists", codingDiff: "Easy" },
        { day: "Thu (Day 4)", time: "04:00 PM - 05:00 PM", topic: "Dynamic DOM Creation & Manipulation", duration: "1.0 Hour", goal: "Create & append elements dynamically from JS arrays", status: "Pending", codingChallenge: "JS Challenge: Dynamic Product Card Generator from JSON Array", codingDiff: "Medium" },
        { day: "Fri (Day 5)", time: "06:00 PM - 08:00 PM", topic: "Assignment: Task Manager Application", duration: "2.0 Hours", goal: "Build interactive task add, toggle & delete application", status: "Pending", codingChallenge: "Assignment: Interactive Task Manager App with Filter States", codingDiff: "Medium" },
        { day: "Sat (Day 6)", time: "10:00 AM - 01:00 PM", topic: "Mini Project: Interactive Kanban Task Board", duration: "3.0 Hours", goal: "Build drag-and-drop task board with state management", status: "Pending", codingChallenge: "Mini Project: Kanban Drag-and-Drop Task Board in Vanilla JS", codingDiff: "Hard" },
        { day: "Sun (Day 7)", time: "04:00 PM - 05:00 PM", topic: "Code Review & Submission", duration: "1.0 Hour", goal: "Submit Week 3 Task Manager to unlock Week 4!", status: "Pending", codingChallenge: "JS Debugging: Fix Event Bubbling & Memory Leaks", codingDiff: "Easy" }
      ]
    },
    4: {
      weekTitle: "Week 4: Async JS, Promises, Fetch API & LocalStorage",
      schedule: [
        { day: "Mon (Day 1)", time: "09:00 AM - 10:30 AM", topic: "Asynchronous JS & Event Loop", duration: "1.5 Hours", goal: "Understand microtask queue, call stack & web APIs", status: "Locked", codingChallenge: "Async Challenge: Simulate Microtasks vs Macrotasks Execution", codingDiff: "Medium" },
        { day: "Tue (Day 2)", time: "11:00 AM - 01:00 PM", topic: "Promises & async/await Syntax", duration: "2.0 Hours", goal: "Handle asynchronous errors gracefully with try/catch", status: "Locked", codingChallenge: "Promise Challenge: Convert Callback Hell to async/await Pipeline", codingDiff: "Medium" },
        { day: "Wed (Day 3)", time: "02:00 PM - 03:30 PM", topic: "Fetch API & REST API Integration", duration: "1.5 Hours", goal: "Fetch JSON data from public REST APIs", status: "Locked", codingChallenge: "Fetch Challenge: Search & Display GitHub User Repositories", codingDiff: "Medium" },
        { day: "Thu (Day 4)", time: "04:00 PM - 05:00 PM", topic: "LocalStorage & Data Persistence", duration: "1.0 Hour", goal: "Persist app state across page reloads using getItem & setItem", status: "Locked", codingChallenge: "LocalStorage Challenge: Save & Sync User Preferences in JSON", codingDiff: "Easy" },
        { day: "Fri (Day 5)", time: "06:00 PM - 08:00 PM", topic: "Assignment: API Data Fetcher Component", duration: "2.0 Hours", goal: "Build live API search component with debouncing", status: "Locked", codingChallenge: "Assignment: Live Debounced API Search Component", codingDiff: "Hard" },
        { day: "Sat (Day 6)", time: "10:00 AM - 01:00 PM", topic: "Mini Project: Weather & Calculator App", duration: "3.0 Hours", goal: "Build live weather dashboard using Geolocation & OpenWeather API", status: "Locked", codingChallenge: "Mini Project: Weather App with Geolocation & Forecast Cards", codingDiff: "Hard" },
        { day: "Sun (Day 7)", time: "04:00 PM - 05:00 PM", topic: "Code Review & Submission", duration: "1.0 Hour", goal: "Submit Week 4 Assignment & Mini Project to unlock Week 5!", status: "Locked", codingChallenge: "Async Testing: Write Jest Tests for Async API Functions", codingDiff: "Medium" }
      ]
    },
    5: {
      weekTitle: "Week 5: React.js Core, JSX, Props & useState Hooks",
      schedule: [
        { day: "Mon (Day 1)", time: "09:00 AM - 10:30 AM", topic: "React Architecture & JSX Syntax", duration: "1.5 Hours", goal: "Create functional components & render dynamic JSX expressions", status: "Locked", codingChallenge: "React Challenge: Build Reusable Button & Card Components", codingDiff: "Easy" },
        { day: "Tue (Day 2)", time: "11:00 AM - 01:00 PM", topic: "Props, Composition & Destructuring", duration: "2.0 Hours", goal: "Pass dynamic props between parent & child components", status: "Locked", codingChallenge: "Props Challenge: Pass User Profile Object to Child Badge Card", codingDiff: "Easy" },
        { day: "Wed (Day 3)", time: "02:00 PM - 03:30 PM", topic: "useState Hook & Form Input Binding", duration: "1.5 Hours", goal: "Manage component state and controlled inputs", status: "Locked", codingChallenge: "useState Challenge: Controlled Multi-Input Registration Form", codingDiff: "Medium" },
        { day: "Thu (Day 4)", time: "04:00 PM - 05:00 PM", topic: "Conditional Rendering & List Keys", duration: "1.0 Hour", goal: "Render dynamic lists safely with key props", status: "Locked", codingChallenge: "React Challenge: Conditional Loading Skeleton & Error State", codingDiff: "Easy" },
        { day: "Fri (Day 5)", time: "06:00 PM - 08:00 PM", topic: "Assignment: Filterable Product Catalog", duration: "2.0 Hours", goal: "Build searchable product catalog with React state", status: "Locked", codingChallenge: "Assignment: Filterable Category Product Grid in React", codingDiff: "Medium" },
        { day: "Sat (Day 6)", time: "10:00 AM - 01:00 PM", topic: "Mini Project: Interactive Quiz Application", duration: "3.0 Hours", goal: "Build full React quiz app with timer & score breakdown", status: "Locked", codingChallenge: "Mini Project: Interactive React Quiz App with Score Breakdown", codingDiff: "Hard" },
        { day: "Sun (Day 7)", time: "04:00 PM - 05:00 PM", topic: "Code Review & Submission", duration: "1.0 Hour", goal: "Submit Week 5 Assignment & Mini Project to unlock Week 6!", status: "Locked", codingChallenge: "React Code Review: Fix Stale State Closures in Handlers", codingDiff: "Medium" }
      ]
    },
    6: {
      weekTitle: "Week 6: useEffect, Context API & React Router DOM v6",
      schedule: [
        { day: "Mon (Day 1)", time: "09:00 AM - 10:30 AM", topic: "useEffect Lifecycle & Dependency Array", duration: "1.5 Hours", goal: "Fetch API data on mount and manage cleanup functions", status: "Locked", codingChallenge: "useEffect Challenge: Fetch Data on Mount with AbortController", codingDiff: "Medium" },
        { day: "Tue (Day 2)", time: "11:00 AM - 01:00 PM", topic: "React Router DOM v6 & Route Guards", duration: "2.0 Hours", goal: "Set up BrowserRouter, Routes, Route & Link navigation", status: "Locked", codingChallenge: "Router Challenge: Protected Layout Routes with Navigate Guard", codingDiff: "Medium" },
        { day: "Wed (Day 3)", time: "02:00 PM - 03:30 PM", topic: "Context API & Global State Management", duration: "1.5 Hours", goal: "Create AuthContext & ThemeContext to prevent prop drilling", status: "Locked", codingChallenge: "Context Challenge: AuthContext Provider with Login & Logout Functions", codingDiff: "Hard" },
        { day: "Thu (Day 4)", time: "04:00 PM - 05:00 PM", topic: "Custom Hooks & Modular Logic", duration: "1.0 Hour", goal: "Extract reusable fetch & localStorage logic into custom hooks", status: "Locked", codingChallenge: "Custom Hook: Build useFetch & useLocalStorage Custom Hooks", codingDiff: "Medium" },
        { day: "Fri (Day 5)", time: "06:00 PM - 08:00 PM", topic: "Assignment: Router Setup & Auth Guard", duration: "2.0 Hours", goal: "Build multi-page routed application with login protect", status: "Locked", codingChallenge: "Assignment: Multi-Page Dashboard Router with Protected Layout", codingDiff: "Hard" },
        { day: "Sat (Day 6)", time: "10:00 AM - 01:00 PM", topic: "Mini Project: Productivity Kanban App", duration: "3.0 Hours", goal: "Build multi-view productivity dashboard with React Router & Context", status: "Locked", codingChallenge: "Mini Project: Full Productivity Dashboard in React Router v6", codingDiff: "Hard" },
        { day: "Sun (Day 7)", time: "04:00 PM - 05:00 PM", topic: "Code Review & Submission", duration: "1.0 Hour", goal: "Submit Week 6 Assignment & Mini Project to unlock Week 7!", status: "Locked", codingChallenge: "React Optimization: Use React.memo & useMemo to Prevent Re-renders", codingDiff: "Medium" }
      ]
    },
    7: {
      weekTitle: "Week 7: Node.js Event Loop, Express Middleware & REST APIs",
      schedule: [
        { day: "Mon (Day 1)", time: "09:00 AM - 10:30 AM", topic: "Node.js Core Modules & CommonJS / ESM", duration: "1.5 Hours", goal: "Understand fs, path, http modules and package.json", status: "Locked", codingChallenge: "Node Challenge: Read & Parse JSON File Asynchronously with fs/promises", codingDiff: "Easy" },
        { day: "Tue (Day 2)", time: "11:00 AM - 01:00 PM", topic: "Express.js Routing & Middleware", duration: "2.0 Hours", goal: "Build Express server, app.use(), body-parser & CORS", status: "Locked", codingChallenge: "Express Challenge: Logger & Authentication Custom Middleware", codingDiff: "Medium" },
        { day: "Wed (Day 3)", time: "02:00 PM - 03:30 PM", topic: "RESTful API Design & HTTP Verbs", duration: "1.5 Hours", goal: "Design GET, POST, PUT, DELETE endpoints with JSON response", status: "Locked", codingChallenge: "REST Challenge: Full CRUD Controller Router for Products API", codingDiff: "Medium" },
        { day: "Thu (Day 4)", time: "04:00 PM - 05:00 PM", topic: "Centralized Error Handling & Validation", duration: "1.0 Hour", goal: "Implement custom Express error handlers & status codes", status: "Locked", codingChallenge: "Express Challenge: Global Error Handling Middleware & Express-Validator", codingDiff: "Medium" },
        { day: "Fri (Day 5)", time: "06:00 PM - 08:00 PM", topic: "Assignment: Express REST Server", duration: "2.0 Hours", goal: "Build Express backend REST service for products & users", status: "Locked", codingChallenge: "Assignment: Production-Ready Express REST API Server", codingDiff: "Hard" },
        { day: "Sat (Day 6)", time: "10:00 AM - 01:00 PM", topic: "Mini Project: Product REST Microservice", duration: "3.0 Hours", goal: "Build complete CRUD REST API with Postman test collection", status: "Locked", codingChallenge: "Mini Project: Product REST Microservice with JWT Auth", codingDiff: "Hard" },
        { day: "Sun (Day 7)", time: "04:00 PM - 05:00 PM", topic: "Code Review & Submission", duration: "1.0 Hour", goal: "Submit Week 7 Assignment & Mini Project to unlock Week 8!", status: "Locked", codingChallenge: "API Testing: Supertest Integration Suite for Express Endpoints", codingDiff: "Medium" }
      ]
    },
    8: {
      weekTitle: "Week 8: Database Design, MySQL JOINs & MongoDB Mongoose",
      schedule: [
        { day: "Mon (Day 1)", time: "09:00 AM - 10:30 AM", topic: "Relational Database Schema & SQL Queries", duration: "1.5 Hours", goal: "Design normalized tables, PRIMARY & FOREIGN keys", status: "Locked", codingChallenge: "SQL Challenge: CREATE TABLE DDL with FOREIGN KEY constraints", codingDiff: "Easy" },
        { day: "Tue (Day 2)", time: "11:00 AM - 01:00 PM", topic: "SQL JOINs, Grouping & Aggregations", duration: "2.0 Hours", goal: "Write INNER JOIN, LEFT JOIN, GROUP BY & HAVING queries", status: "Locked", codingChallenge: "SQL Challenge: Write Complex Multi-Table INNER JOIN & GROUP BY Query", codingDiff: "Medium" },
        { day: "Wed (Day 3)", time: "02:00 PM - 03:30 PM", topic: "MongoDB Document Store & Mongoose ORM", duration: "1.5 Hours", goal: "Define Mongoose Schemas, Models & CRUD queries", status: "Locked", codingChallenge: "Mongoose Challenge: Define User & Order Schema with References", codingDiff: "Medium" },
        { day: "Thu (Day 4)", time: "04:00 PM - 05:00 PM", topic: "Database Indexing & Performance Tuning", duration: "1.0 Hour", goal: "Add B-tree & hash indexes to optimize search queries", status: "Locked", codingChallenge: "DB Tuning: Create Compound Indexes to Optimize Read Speed", codingDiff: "Medium" },
        { day: "Fri (Day 5)", time: "06:00 PM - 08:00 PM", topic: "Assignment: SQL & Mongo Queries", duration: "2.0 Hours", goal: "Write database migrations and test query execution", status: "Locked", codingChallenge: "Assignment: Database Migration & Aggregation Query Suite", codingDiff: "Hard" },
        { day: "Sat (Day 6)", time: "10:00 AM - 01:00 PM", topic: "Mini Project: Full Stack E-Commerce DB", duration: "3.0 Hours", goal: "Build complete database persistence layer for E-Commerce app", status: "Locked", codingChallenge: "Mini Project: Full Stack E-Commerce Database Architecture", codingDiff: "Hard" },
        { day: "Sun (Day 7)", time: "04:00 PM - 05:00 PM", topic: "Final Graduation Review & Certification", duration: "1.0 Hour", goal: "Submit Week 8 Final Project to earn Verified Certificate! 🎓", status: "Locked", codingChallenge: "Graduation Assessment: Capstone Code Audit & Security Review", codingDiff: "Hard" }
      ]
    }
  };

  useEffect(() => {
    loadRoadmaps();
  }, []);


  const loadRoadmaps = async () => {
    try {
      setLoading(true);
      const res = await api.get('/career-roadmaps');
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        const merged = CAREER_ROADMAPS_DATA.map(local => {
          const matched = res.data.find(r => r && r.roleKey === local.roleKey);
          return matched ? { ...local, title: matched.title || local.title, description: matched.description || local.description } : local;
        });
        setRoadmaps(merged);
      } else {
        setRoadmaps(CAREER_ROADMAPS_DATA);
      }
    } catch (err) {
      console.log('Using local client dataset', err);
      setRoadmaps(CAREER_ROADMAPS_DATA);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Open Hourly Timetable Breakdown Modal
  const handleOpenHourlyModal = (daySchedule) => {
    setSelectedHourlyDay(daySchedule);
    setHourlyModalOpen(true);
  };

  // Click on a Week row in Curriculum table -> Displays daily plan for that week & scrolls to Section 5
  const handleSelectWeekForDailyPlan = (weekNum, topics) => {
    setSelectedWeekForDailyPlan(weekNum);
    showToast(`Displaying Daily Study Plan for Week ${weekNum}: ${topics || ''} 📅`);
    scrollToSection('sec-daily');
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const openYouTubeTutorial = (topicTitle) => {
    if (!topicTitle) return;
    const query = encodeURIComponent(`${topicTitle} tutorial`);
    const youtubeUrl = `https://www.youtube.com/results?search_query=${query}`;
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
    showToast(`Opening YouTube tutorial for: ${topicTitle} 🎥`);
  };

  // Helper to check if a week is unlocked
  const isWeekUnlocked = (weekNum) => {
    if (weekNum === 1) return true;
    const prevWeek = submittedWeeks[weekNum - 1];
    return prevWeek && prevWeek.completed;
  };

  // Open Submission Modal
  const handleOpenSubmissionModal = (weekNum, type, title) => {
    if (!isWeekUnlocked(weekNum)) {
      showToast(`🔒 Week ${weekNum} is Locked! Complete & submit Week ${weekNum - 1} Assignment & Project first to unlock!`);
      return;
    }
    setSubmissionTarget({ weekNum, type, title });
    setSubmissionForm({ 
      githubUrl: submittedWeeks[weekNum]?.githubUrl || '', 
      demoUrl: submittedWeeks[weekNum]?.demoUrl || '', 
      notes: '', 
      fileName: '' 
    });
    setSubmissionModalOpen(true);
  };

  // Submit Assignment or Mini Project & Unlock Next Week
  const handleConfirmSubmission = (e) => {
    e.preventDefault();
    if (!submissionTarget) return;

    const { weekNum, type } = submissionTarget;

    setSubmittedWeeks(prev => {
      const currentWeekData = prev[weekNum] || { assignmentSubmitted: false, projectSubmitted: false, completed: false };
      const isAssignment = type === 'assignment';
      const isProject = type === 'project';

      const updatedAssignment = isAssignment ? true : currentWeekData.assignmentSubmitted;
      const updatedProject = isProject ? true : currentWeekData.projectSubmitted;
      const isCompletedNow = updatedAssignment || updatedProject;

      return {
        ...prev,
        [weekNum]: {
          assignmentSubmitted: updatedAssignment,
          projectSubmitted: updatedProject,
          completed: isCompletedNow,
          githubUrl: submissionForm.githubUrl || currentWeekData.githubUrl || 'https://github.com/student/submission',
          demoUrl: submissionForm.demoUrl || currentWeekData.demoUrl || 'https://demo.vercel.app'
        }
      };
    });

    setSubmissionModalOpen(false);
    showToast(`🎉 Week ${weekNum} ${type === 'assignment' ? 'Assignment' : 'Mini Project'} Submitted Successfully! Week ${weekNum + 1} is now UNLOCKED! 🚀`);
  };

  // Start Interactive Mock Test / Interview Modal
  // Active Selected Roadmap with Safe Fallbacks
  const safeRoadmaps = Array.isArray(roadmaps) && roadmaps.length > 0 ? roadmaps : CAREER_ROADMAPS_DATA;
  const activeRoadmap = safeRoadmaps.find(r => r && r.roleKey === selectedRoleKey) || safeRoadmaps[0] || CAREER_ROADMAPS_DATA[0];

  // Dynamic calculations for progress based on submitted weeks
  const totalWeeksCount = ((activeRoadmap && activeRoadmap.timelineTable) || []).length || 8;
  const completedWeeksCount = Object.keys(submittedWeeks || {}).filter(w => submittedWeeks[w]?.completed).length;
  const calculatedProgress = Math.round((completedWeeksCount / totalWeeksCount) * 100);

  // Active Selected Daily Plan Data
  const currentWeekPlan = (weekDailyPlans && weekDailyPlans[selectedWeekForDailyPlan]) || weekDailyPlans[1];

  // Horizontal Navigation Sections Bar
  const horizontalNavSections = [
    { id: "sec-timeline", label: "Curriculum" },
    { id: "sec-daily", label: "Daily Schedule & Coding" }
  ];

  if (loading) {
    return (
      <div className="p-16 text-center text-white space-y-4">
        <Sparkles size={44} className="mx-auto text-purple-400 animate-spin" />
        <p className="font-extrabold text-xl">Loading Career Roadmap Planner...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fadeIn pb-24 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-gradient-to-r from-purple-600 via-[#EC4899] to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border border-white/20">
          <Sparkles size={22} className="shrink-0" />
          <span className="text-xs sm:text-sm font-black">{toastMessage}</span>
        </div>
      )}

      {/* Header Breadcrumb & Track Selector */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-300/80">
          <Compass size={14} className="text-[#EC4899]" />
          <span>Career Roadmaps</span>
          <ChevronRight size={14} />
          <span className="text-white font-bold">{activeRoadmap.title}</span>
        </div>

        {/* Track Selection Bar */}
        <div className="bg-[#180E2B] border border-purple-500/20 p-4 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <Briefcase className="text-[#EC4899]" size={20} />
            <span className="text-xs font-black text-white uppercase tracking-wider">Targeted Career Track:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CAREER_ROADMAPS_DATA.map((r) => (
              <button
                key={r.roleKey}
                onClick={() => setSelectedRoleKey(r.roleKey)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                  selectedRoleKey === r.roleKey
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white shadow-lg shadow-purple-600/30 ring-2 ring-purple-500/40'
                    : 'bg-[#1F1235] border border-purple-500/20 text-purple-200/80 hover:text-white hover:bg-purple-900/40'
                }`}
              >
                {r.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Horizontal Navigation Pills */}
      <div className="sticky top-0 z-40 bg-[#180E2B]/95 backdrop-blur-md border border-purple-500/30 p-2.5 rounded-2xl shadow-2xl flex items-center gap-2 overflow-x-auto scrollbar-none w-full max-w-full">
        {horizontalNavSections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition cursor-pointer shrink-0 ${
              activeTab === sec.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-purple-200/80 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* SECTION 4: DETAILED 12-WEEK CURRICULUM WITH INTERACTIVE CLICKABLE WEEKS */}
      {/* ==================================================== */}
      <section id="sec-timeline" className="bg-[#180E2B] border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="border-b border-purple-500/20 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Calendar className="text-pink-400" size={22} /> Submission-Based 12-Week Semester Curriculum
            </h2>
            <p className="text-xs text-purple-200/70 mt-1">
              👉 <strong>Tip:</strong> Click any Week row below to instantly view its detailed 7-Day Study Plan & Daily Coding Practice!
            </p>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold w-fit flex items-center gap-1.5">
            <Unlock size={14} /> Submit to Progression
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-purple-500/20 shadow-lg">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#1F1235] border-b border-purple-500/20 text-white font-extrabold uppercase text-[11px] tracking-wider">
                <th className="p-4">Week</th>
                <th className="p-4">Topics & Modules</th>
                <th className="p-4">Hours</th>
                <th className="p-4">Assignment Submission</th>
                <th className="p-4">Mini Project Submission</th>
                <th className="p-4">Status</th>
                <th className="p-4">Progress</th>
                <th className="p-4 text-center">Action / Plan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/10 text-purple-200">
              {(activeRoadmap.timelineTable || []).map((row, idx) => {
                const weekNum = idx + 1;
                const unlocked = isWeekUnlocked(weekNum);
                const weekData = submittedWeeks[weekNum] || { assignmentSubmitted: false, projectSubmitted: false, completed: false };

                const isCompleted = weekData.completed;
                const isAssignmentDone = weekData.assignmentSubmitted;
                const isProjectDone = weekData.projectSubmitted;
                const isSelected = selectedWeekForDailyPlan === weekNum;

                return (
                  <tr 
                    key={idx} 
                    onClick={() => handleSelectWeekForDailyPlan(weekNum, row.topics)}
                    className={`transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-purple-600/30 ring-2 ring-purple-500/60 font-bold'
                        : !unlocked 
                        ? 'bg-black/30 opacity-60 hover:opacity-80' 
                        : isCompleted 
                        ? 'bg-emerald-950/20 hover:bg-emerald-900/40' 
                        : 'hover:bg-purple-900/30'
                    }`}
                    title={`Click to view Daily Study Plan & Coding Practice for Week ${weekNum}`}
                  >
                    <td className="p-4 font-mono font-bold text-white whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {!unlocked ? (
                          <Lock size={15} className="text-purple-400 shrink-0" />
                        ) : isCompleted ? (
                          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        ) : (
                          <Unlock size={15} className="text-amber-400 shrink-0" />
                        )}
                        <span className="text-sm font-extrabold">{row.week}</span>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-[#EC4899] text-[10px] font-black uppercase">
                            Active
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-white max-w-xs">{row.topics}</td>
                    <td className="p-4 font-mono">{row.hours}</td>

                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      {!unlocked ? (
                        <span className="text-[11px] text-purple-300/50 flex items-center gap-1 font-semibold">
                          <Lock size={12} /> {row.assignment}
                        </span>
                      ) : isAssignmentDone ? (
                        <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-[11px] inline-flex items-center gap-1.5 shadow-sm">
                          <CheckCircle size={13} /> {row.assignment} (Submitted)
                        </span>
                      ) : (
                        <button
                          onClick={() => handleOpenSubmissionModal(weekNum, 'assignment', row.assignment)}
                          className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs inline-flex items-center gap-1.5 transition shadow-md cursor-pointer"
                        >
                          <Upload size={13} /> Submit {row.assignment}
                        </button>
                      )}
                    </td>

                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      {!unlocked ? (
                        <span className="text-[11px] text-purple-300/50 flex items-center gap-1 font-semibold">
                          <Lock size={12} /> {row.project}
                        </span>
                      ) : isProjectDone ? (
                        <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-[11px] inline-flex items-center gap-1.5 shadow-sm">
                          <CheckCircle size={13} /> {row.project} (Submitted)
                        </span>
                      ) : (
                        <button
                          onClick={() => handleOpenSubmissionModal(weekNum, 'project', row.project)}
                          className="px-3.5 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-extrabold text-xs inline-flex items-center gap-1.5 transition shadow-md cursor-pointer"
                        >
                          <Upload size={13} /> Submit {row.project}
                        </button>
                      )}
                    </td>

                    <td className="p-4">
                      {!unlocked ? (
                        <span className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-400 text-[10px] font-bold inline-flex items-center gap-1">
                          <Lock size={11} /> Locked
                        </span>
                      ) : isCompleted ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold inline-flex items-center gap-1">
                          <CheckCircle size={11} /> Completed
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold inline-flex items-center gap-1">
                          <Play size={11} /> In Progress
                        </span>
                      )}
                    </td>

                    <td className="p-4 font-mono font-bold">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-black/40 rounded-full h-2 overflow-hidden border border-purple-500/20">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              isCompleted ? 'bg-emerald-400' : unlocked ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-purple-900/40'
                            }`} 
                            style={{ width: `${isCompleted ? 100 : unlocked ? 50 : 0}%` }} 
                          />
                        </div>
                        <span>{isCompleted ? '100%' : unlocked ? '50%' : '0%'}</span>
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectWeekForDailyPlan(weekNum, row.topics);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-200 hover:bg-purple-600 hover:text-white transition text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Eye size={13} /> View Daily Plan
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 5: FULL-WIDTH HORIZONTAL DAILY STUDY & CODING PLANNER */}
      {/* ==================================================== */}
      <section id="sec-daily" className="bg-[#180E2B] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="border-b border-purple-500/20 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-pink-400 uppercase tracking-wider mb-1">
              <Calendar size={16} /> Selected Timetable & Coding Plan for Week {selectedWeekForDailyPlan}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Clock className="text-amber-400" size={24} /> {currentWeekPlan.weekTitle}
            </h2>
            <p className="text-xs text-purple-200/80 mt-1">
              7-Day full-width horizontal routine with learning goals, daily coding practice challenges, and interactive hourly time breakdowns.
            </p>
          </div>

          {/* Quick Week Switcher Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((wNum) => (
              <button
                key={wNum}
                onClick={() => setSelectedWeekForDailyPlan(wNum)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedWeekForDailyPlan === wNum
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md ring-1 ring-purple-400'
                    : 'bg-[#1F1235] border border-purple-500/20 text-purple-300 hover:bg-purple-900/40 hover:text-white'
                }`}
              >
                W{wNum}
              </button>
            ))}
          </div>
        </div>

        {/* Executive Weekly Schedule Timeline Cards */}
        <div className="space-y-4 w-full">
          {currentWeekPlan.schedule.map((sch, i) => (
            <div 
              key={i} 
              className="bg-[#1F1235] border border-purple-500/25 p-5 sm:p-6 rounded-2xl space-y-4 shadow-xl hover:border-purple-500/50 transition duration-300"
            >
              {/* Row Header: Day Badge, Time, Status & Action Buttons */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-purple-500/15">
                
                {/* Left: Day & Time */}
                <div className="flex flex-wrap items-center gap-3">
                  <button 
                    onClick={() => handleOpenHourlyModal(sch)}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-black text-xs uppercase tracking-wide shadow-md flex items-center gap-1.5 cursor-pointer"
                    title="Click to view 1-to-1 Hour Schedule Breakdown"
                  >
                    {sch.day} <ListOrdered size={14} />
                  </button>
                  <div className="flex items-center gap-2 font-mono text-xs text-purple-200">
                    <Clock size={14} className="text-amber-400" />
                    <span className="font-bold">{sch.time}</span>
                    <span className="text-purple-400">({sch.duration})</span>
                  </div>
                </div>

                {/* Right: Status Pill & Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => handleOpenHourlyModal(sch)}
                    className="px-3 py-2 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-200 hover:bg-purple-600 hover:text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <ListOrdered size={14} /> 1-to-1 Hour Schedule
                  </button>

                  {sch.status === 'Completed' ? (
                    <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-extrabold text-xs flex items-center gap-1.5">
                      <CheckCircle size={14} /> Completed
                    </span>
                  ) : sch.status === 'In Progress' ? (
                    <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-extrabold text-xs flex items-center gap-1.5">
                      <Play size={14} /> In Progress
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold text-xs">
                      Pending
                    </span>
                  )}

                  <button
                    onClick={() => {
                      const titleToPass = sch.codingChallenge || sch.topic;
                      navigate('/dashboard/coding-practice', {
                        state: {
                          challengeTitle: titleToPass,
                          topic: sch.topic,
                          weekTitle: currentWeekPlan.weekTitle,
                          codingDiff: sch.codingDiff || 'Medium'
                        }
                      });
                      showToast(`Opening Code Editor Workspace for: ${titleToPass}! 💻`);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-[#EC4899] to-pink-600 hover:opacity-90 text-white font-black text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer shadow-purple-600/20"
                  >
                    <Code size={14} /> Solve Code Practice
                  </button>

                  <button
                    onClick={() => openYouTubeTutorial(sch.topic)}
                    className="px-3 py-2 rounded-xl bg-red-600/20 border border-red-500/40 text-red-300 hover:bg-red-600 hover:text-white font-extrabold text-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Video size={14} /> Tutorial
                  </button>
                </div>

              </div>

              {/* Row Body: Module Topic & Objective */}
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-white">{sch.topic}</h3>
                <p className="text-xs text-purple-200/80 font-medium leading-relaxed">{sch.goal}</p>
              </div>

              {/* Daily Practice Challenge Banner */}
              {sch.codingChallenge && (
                <div className="bg-purple-950/60 border border-purple-700/40 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
                      <Code size={16} />
                    </div>
                    <div>
                      <span className="font-extrabold text-cyan-300 block">Daily Coding Challenge</span>
                      <span className="text-white font-bold">{sch.codingChallenge}</span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-extrabold shrink-0 w-fit">
                    {sch.codingDiff || 'Easy'} Tier
                  </span>
                </div>
              )}

            </div>
          ))}
        </div>
      </section>

      {/* ==================================================== */}
      {/* INTERACTIVE HOURLY 1-TO-1 TIMETABLE BREAKDOWN MODAL */}
      {/* ==================================================== */}
      {hourlyModalOpen && selectedHourlyDay && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#180E2B] border border-purple-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-start border-b border-purple-500/20 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-extrabold uppercase">
                  {selectedHourlyDay.day} Hourly Routine
                </span>
                <h2 className="text-xl font-black text-white mt-2">
                  1-to-1 Hour Specific Schedule & Task Checklist
                </h2>
                <p className="text-xs text-purple-200/70 mt-1">{selectedHourlyDay.topic}</p>
              </div>
              
              <button 
                onClick={() => setHourlyModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-purple-200 hover:text-white transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Time Slot List */}
            <div className="space-y-3">
              {(selectedHourlyDay.hourlySlots || [
                { time: "09:00 AM - 10:00 AM", task: `Video Lecture & Concepts: ${selectedHourlyDay.topic}`, type: "Lecture", completed: true },
                { time: "10:00 AM - 11:00 AM", task: `Hands-on Code Implementation: ${selectedHourlyDay.goal}`, type: "Practice", completed: true },
                { time: "11:00 AM - 12:00 PM", task: `Daily Coding Practice: ${selectedHourlyDay.codingChallenge || selectedHourlyDay.topic}`, type: "Coding", completed: true },
                { time: "02:00 PM - 03:00 PM", task: "Knowledge Verification & Quiz Review", type: "Assessment", completed: false },
                { time: "04:00 PM - 05:00 PM", task: "GitHub Code Commit & Progress Audit", type: "Submission", completed: false }
              ]).map((slot, sIdx) => (
                <div key={sIdx} className="bg-[#1F1235] border border-purple-500/20 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-purple-950 text-amber-400 font-mono font-bold text-xs border border-purple-800/40">
                        🕒 {slot.time}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        slot.type === 'Coding' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' :
                        slot.type === 'Lecture' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {slot.type}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white leading-relaxed">{slot.task}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {slot.type === 'Coding' && (
                      <button
                        onClick={() => {
                          setHourlyModalOpen(false);
                          navigate('/dashboard/coding-practice', {
                            state: {
                              challengeTitle: selectedHourlyDay.codingChallenge || selectedHourlyDay.topic,
                              topic: selectedHourlyDay.topic,
                              weekTitle: currentWeekPlan.weekTitle
                            }
                          });
                        }}
                        className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs transition flex items-center gap-1 cursor-pointer shadow-sm"
                      >
                        <Code size={13} /> Solve
                      </button>
                    )}
                    <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs inline-flex items-center gap-1">
                      <CheckCircle size={13} /> Scheduled
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-purple-500/20 flex justify-end">
              <button
                onClick={() => setHourlyModalOpen(false)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-extrabold text-xs shadow-lg hover:opacity-90 transition cursor-pointer"
              >
                Close Timetable
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* INTERACTIVE ASSIGNMENT & MINI PROJECT SUBMISSION MODAL */}
      {/* ==================================================== */}
      {submissionModalOpen && submissionTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#180E2B] border border-purple-500/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 relative overflow-hidden">
            
            <div className="flex justify-between items-start border-b border-purple-500/20 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-extrabold uppercase">
                  Week {submissionTarget.weekNum} Submission
                </span>
                <h2 className="text-xl font-black text-white mt-2">
                  Submit {submissionTarget.type === 'assignment' ? 'Assignment' : 'Mini Project'}: {submissionTarget.title}
                </h2>
              </div>
              <button 
                onClick={() => setSubmissionModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-purple-200 hover:text-white transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed font-medium">
              Submit your GitHub repository link and live project demo to complete <strong>Week {submissionTarget.weekNum}</strong> and automatically unlock <strong>Week {submissionTarget.weekNum + 1}</strong>!
            </p>

            <form onSubmit={handleConfirmSubmission} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-extrabold text-white flex items-center gap-1.5">
                  <Code size={14} className="text-purple-400" /> GitHub Repository URL *
                </label>
                <input
                  type="url"
                  required
                  value={submissionForm.githubUrl}
                  onChange={(e) => setSubmissionForm({ ...submissionForm, githubUrl: e.target.value })}
                  placeholder="https://github.com/yourusername/week-project-repo"
                  className="w-full bg-black/40 border border-purple-500/30 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-purple-500 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-extrabold text-white flex items-center gap-1.5">
                  <ExternalLink size={14} className="text-pink-400" /> Live Demo URL (Optional)
                </label>
                <input
                  type="url"
                  value={submissionForm.demoUrl}
                  onChange={(e) => setSubmissionForm({ ...submissionForm, demoUrl: e.target.value })}
                  placeholder="https://your-project.vercel.app"
                  className="w-full bg-black/40 border border-purple-500/30 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-purple-500 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-extrabold text-white flex items-center gap-1.5">
                  <FileText size={14} className="text-amber-400" /> Submission Notes / Key Features Built
                </label>
                <textarea
                  rows={3}
                  value={submissionForm.notes}
                  onChange={(e) => setSubmissionForm({ ...submissionForm, notes: e.target.value })}
                  placeholder="Describe your implementation, design patterns used, and completed features..."
                  className="w-full bg-black/40 border border-purple-500/30 rounded-xl p-3 text-white text-xs outline-none focus:border-purple-500 transition"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-purple-500/20">
                <button
                  type="button"
                  onClick={() => setSubmissionModalOpen(false)}
                  className="flex-1 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-[#EC4899] to-emerald-600 text-white font-extrabold text-xs shadow-xl hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Upload size={16} /> Submit & Unlock Week {submissionTarget.weekNum + 1} 🚀
                </button>
              </div>
            </form>

          </div>
        </div>
      )}


    </div>
  );
}
