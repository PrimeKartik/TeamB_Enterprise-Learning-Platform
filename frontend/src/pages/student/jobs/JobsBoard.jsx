import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Building2, ChevronRight, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { getJobs, applyForJob, getApplicationsForStudent } from '../../../services/JobService';
import { useAuthContext } from '../../../context/AuthContext';

export default function JobsBoard() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  const [myApplications, setMyApplications] = useState([]);

  const { user } = useAuthContext();

  useEffect(() => {
    const allJobs = getJobs();
    // Only show OPEN jobs to students
    setJobs(allJobs.filter(j => j.status === 'OPEN'));
    if (user && user.email) {
      setMyApplications(getApplicationsForStudent(user.email));
    }
  }, [user?.email]);

  const handleApply = () => {
    // Try to get their actual resume or just pass a mock
    const storageKey = `skillSphereResume_${user?.email || 'guest'}`;
    const resumeData = JSON.parse(localStorage.getItem(storageKey));
    
    if (!resumeData || !resumeData.personal || !resumeData.personal.fullName) {
      toast.error("Please build your resume in the Resume Builder first!");
      return;
    }

    const studentName = resumeData.personal.fullName;
    
    const newApp = applyForJob(selectedJob.id, studentName, resumeData, user?.email || 'guest');
    setMyApplications([...myApplications, newApp]);

    toast.success(`Successfully applied to ${selectedJob.company} using your SkillSphere Resume!`);
    setHasApplied(true);
  };

  const getApplicationStatus = (jobId) => {
    const app = myApplications.find(a => a.jobId === jobId);
    return app ? app.status : null;
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationQuery === '' || job.location.toLowerCase().includes(locationQuery.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-6 animate-in fade-in duration-500 overflow-hidden">
      
      {/* Header & Search */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex-shrink-0">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Find Your Next Role</h1>
        <p className="text-gray-500 mb-6">Discover jobs and internships tailored to your skills.</p>
        
        <div className="flex flex-col md:flex-row gap-4">
           <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by role, company, or skills..." className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition font-medium text-gray-900 dark:text-white" />
           </div>
           <div className="w-full md:w-48 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" value={locationQuery} onChange={e => setLocationQuery(e.target.value)} placeholder="Location" className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition font-medium text-gray-900 dark:text-white" />
           </div>
           <button className="px-8 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition shadow-md">
             Search
           </button>
        </div>
      </div>

      {/* Main Content Area: Split View */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
         
         {/* Left: Job List */}
         <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2 pb-4">
            {filteredJobs.length === 0 ? (
               <div className="text-center p-8 text-gray-500 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                 No jobs match your search.
               </div>
            ) : (
               filteredJobs.map(job => (
               <div 
                 key={job.id} 
                 onClick={() => { setSelectedJob(job); setHasApplied(false); }}
                 className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                   selectedJob?.id === job.id 
                     ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-500 shadow-md transform scale-[1.02]' 
                     : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-200 hover:shadow-md'
                 }`}
               >
                  <div className="flex items-start gap-4 mb-4">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${job.color}`}>
                        {job.company.charAt(0)}
                     </div>
                     <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{job.title}</h3>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{job.company}</p>
                     </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                     <span className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 flex items-center gap-1">
                        <MapPin size={12}/> {job.location}
                     </span>
                     <span className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 flex items-center gap-1">
                        <Briefcase size={12}/> {job.type}
                     </span>
                     <span className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 flex items-center gap-1">
                        <DollarSign size={12}/> {job.salary}
                     </span>
                  </div>
               </div>
            )))}
         </div>

         {/* Right: Job Details */}
         <div className="flex-1 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
            {selectedJob ? (
               <>
                 <div className="p-8 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-6">
                       <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-3xl shadow-sm ${selectedJob.color}`}>
                          {selectedJob.company.charAt(0)}
                       </div>
                       <div>
                          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">{selectedJob.title}</h2>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                             <Building2 size={16} />
                             <span className="font-medium text-lg">{selectedJob.company}</span>
                             <span className="text-sm px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 ml-2">{selectedJob.posted}</span>
                          </div>
                       </div>
                    </div>
                    
                    <button 
                       onClick={handleApply}
                       disabled={getApplicationStatus(selectedJob.id) !== null}
                       className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                          getApplicationStatus(selectedJob.id) === 'ACCEPTED' ? 'bg-green-500 text-white' :
                          getApplicationStatus(selectedJob.id) === 'REJECTED' ? 'bg-red-500 text-white' :
                          getApplicationStatus(selectedJob.id) === 'PENDING' ? 'bg-yellow-500 text-white' :
                          'bg-brand-gradient text-white hover:opacity-90'
                       }`}
                    >
                       {getApplicationStatus(selectedJob.id) === 'ACCEPTED' ? (
                          <><CheckCircle2 size={20} /> Application Accepted!</>
                       ) : getApplicationStatus(selectedJob.id) === 'REJECTED' ? (
                          <><XCircle size={20} /> Application Rejected</>
                       ) : getApplicationStatus(selectedJob.id) === 'PENDING' ? (
                          <><Clock size={20} /> Application Under Review</>
                       ) : (
                          <>Apply with SkillSphere Resume <ChevronRight size={20} /></>
                       )}
                    </button>
                 </div>

                 <div className="p-8 overflow-y-auto custom-scrollbar">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">About the Role</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                       {selectedJob.description}
                    </p>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Requirements</h3>
                    <ul className="space-y-3">
                       {selectedJob.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                             <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                             <span>{req}</span>
                          </li>
                       ))}
                    </ul>
                 </div>
               </>
            ) : (
               <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center mb-4">
                     <Briefcase className="text-gray-300 dark:text-gray-600" size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-400 dark:text-gray-500">Select a role to view details</h3>
                  <p className="text-gray-400 mt-2 max-w-sm">Click on any job card on the left to see the full description and apply directly using your generated resume.</p>
               </div>
            )}
         </div>

      </div>
    </div>
  );
}
