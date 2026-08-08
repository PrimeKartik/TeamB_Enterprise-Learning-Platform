const JOBS_STORAGE_KEY = 'skillSphereJobs';
const APPLICATIONS_STORAGE_KEY = 'skillSphereApplications';

// Initialize with mock jobs if empty
const initializeJobs = () => {
  const existing = localStorage.getItem(JOBS_STORAGE_KEY);
  if (!existing) {
    const defaultJobs = [
      {
        id: 1,
        title: "Frontend Developer Intern",
        company: "Google",
        location: "Remote",
        type: "Internship",
        salary: "$4,000/mo",
        posted: "2 days ago",
        description: "We are looking for a passionate Frontend Developer Intern to join our Search team.",
        requirements: ["Strong knowledge of JavaScript", "Experience with React"],
        color: "bg-blue-100 text-blue-600",
        status: "OPEN"
      },
      {
        id: 2,
        title: "Junior Backend Engineer",
        company: "Stripe",
        location: "San Francisco, CA",
        type: "Full-Time",
        salary: "$120,000/yr",
        posted: "5 hours ago",
        description: "Join Stripe's core payments team building scalable microservices using Node.js.",
        requirements: ["1+ years of backend experience", "Strong knowledge of REST APIs"],
        color: "bg-purple-100 text-purple-600",
        status: "OPEN"
      }
    ];
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(defaultJobs));
    return defaultJobs;
  }
  return JSON.parse(existing);
};

export const getJobs = () => {
  return initializeJobs();
};

export const addJob = (job) => {
  const jobs = getJobs();
  const newJob = {
    ...job,
    id: Date.now(),
    posted: "Just now",
    status: "OPEN",
    color: "bg-green-100 text-green-600" // Default color for new jobs
  };
  jobs.push(newJob);
  localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
  return newJob;
};

export const closeJob = (jobId) => {
  const jobs = getJobs();
  const updated = jobs.map(j => j.id === jobId ? { ...j, status: "CLOSED" } : j);
  localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(updated));
};

export const addLocalNotification = (userId, title, message) => {
  if (!userId || userId === 'guest') return;
  const key = `skillSphereNotifications_${userId}`;
  const localNotes = JSON.parse(localStorage.getItem(key) || '[]');
  localNotes.push({
    id: 'LOC-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    title,
    message,
    read: false,
    createdAt: new Date().toISOString()
  });
  localStorage.setItem(key, JSON.stringify(localNotes));
};

export const applyForJob = (jobId, studentName, resumeData, userId) => {
  const applications = JSON.parse(localStorage.getItem(APPLICATIONS_STORAGE_KEY) || '[]');
  const newApp = {
    id: 'APP-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    jobId,
    userId,
    studentName,
    resumeData,
    status: 'PENDING',
    appliedAt: new Date().toISOString()
  };
  applications.push(newApp);
  localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));
  
  if (userId && userId !== 'guest') {
    const job = getJobs().find(j => j.id === jobId);
    addLocalNotification(userId, "Application Sent", `Your application for ${job?.title || 'a job'} has been sent successfully.`);
  }

  return newApp;
};

export const getApplicationsForJob = (jobId) => {
  const applications = JSON.parse(localStorage.getItem(APPLICATIONS_STORAGE_KEY) || '[]');
  return applications.filter(a => a.jobId === jobId);
};

export const updateApplicationStatus = (appId, status) => {
  const applications = JSON.parse(localStorage.getItem(APPLICATIONS_STORAGE_KEY) || '[]');
  const app = applications.find(a => a.id === appId);
  
  const updatedApps = applications.map(a => a.id === appId ? { ...a, status } : a);
  localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(updatedApps));

  if (app && app.userId && app.userId !== 'guest') {
    const job = getJobs().find(j => j.id === app.jobId);
    const title = status === 'ACCEPTED' ? "Application Accepted! 🎉" : status === 'REJECTED' ? "Application Update" : "Application Status";
    const message = status === 'ACCEPTED' 
        ? `Congratulations! Your application for ${job?.title || 'the role'} at ${job?.company || 'the company'} was accepted.`
        : `Your application for ${job?.title || 'the role'} at ${job?.company || 'the company'} was rejected.`;
    addLocalNotification(app.userId, title, message);
  }
};

export const getApplicationsForStudent = (userId) => {
  const applications = JSON.parse(localStorage.getItem(APPLICATIONS_STORAGE_KEY) || '[]');
  return applications.filter(a => a.userId === userId);
};
