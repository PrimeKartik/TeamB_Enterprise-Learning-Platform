import React, { useState, useEffect } from 'react';
import { Plus, Briefcase, Trash2, Eye, X, Check, XCircle } from 'lucide-react';
import { getJobs, addJob, closeJob, getApplicationsForJob, updateApplicationStatus } from '../../services/JobService';
import { toast } from 'react-toastify';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewApplicantsJob, setViewApplicantsJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);

  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-Time',
    salary: '',
    description: '',
    requirements: ''
  });

  useEffect(() => {
    refreshJobs();
  }, []);

  const refreshJobs = () => {
    setJobs(getJobs());
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    if (!newJob.title || !newJob.company) {
       toast.error("Title and Company are required.");
       return;
    }
    const formattedJob = {
       ...newJob,
       requirements: newJob.requirements.split('\n').filter(r => r.trim() !== '')
    };
    addJob(formattedJob);
    toast.success("Job posted successfully!");
    setIsModalOpen(false);
    setNewJob({ title: '', company: '', location: '', type: 'Full-Time', salary: '', description: '', requirements: '' });
    refreshJobs();
  };

  const handleCloseJob = (id) => {
    if (window.confirm("Are you sure you want to close this job post?")) {
       closeJob(id);
       toast.success("Job closed.");
       refreshJobs();
    }
  };

  const handleViewApplicants = (job) => {
    const apps = getApplicationsForJob(job.id);
    setApplicants(apps);
    setViewApplicantsJob(job);
  };

  const handleUpdateStatus = (appId, status) => {
    updateApplicationStatus(appId, status);
    toast.success(`Application marked as ${status}`);
    // refresh applicants
    if (viewApplicantsJob) {
       setApplicants(getApplicationsForJob(viewApplicantsJob.id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Jobs & Internships</h1>
          <p className="text-gray-500">Post new opportunities and review applications.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-brand-gradient text-white font-bold rounded-lg flex items-center gap-2 hover:opacity-90 transition shadow-md">
          <Plus size={18} /> Post New Job
        </button>
      </div>

      {/* Jobs List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
             <tr className="bg-gray-50 dark:bg-gray-900/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">Role</th>
                <th className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">Company</th>
                <th className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">Status</th>
                <th className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 text-right">Actions</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
             {jobs.map(job => (
                <tr key={job.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-750 transition">
                   <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 dark:text-white">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.type} • {job.location}</div>
                   </td>
                   <td className="px-6 py-4 font-medium text-gray-700 dark:text-gray-300">
                      {job.company}
                   </td>
                   <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${job.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                         {job.status}
                      </span>
                   </td>
                   <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                         <button onClick={() => handleViewApplicants(job)} className="px-3 py-1.5 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-md text-sm font-semibold flex items-center gap-1 transition">
                            <UsersIcon size={14}/> Applicants
                         </button>
                         {job.status === 'OPEN' && (
                            <button onClick={() => handleCloseJob(job.id)} className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-sm font-semibold transition">
                               Close Post
                            </button>
                         )}
                      </div>
                   </td>
                </tr>
             ))}
             {jobs.length === 0 && (
                <tr>
                   <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No jobs posted yet.</td>
                </tr>
             )}
          </tbody>
        </table>
      </div>

      {/* Add Job Modal */}
      {isModalOpen && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
               <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Post New Job</h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition"><X size={20}/></button>
               </div>
               <form onSubmit={handleAddJob} className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
                        <input type="text" required value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" />
                     </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Company</label>
                        <input type="text" required value={newJob.company} onChange={e => setNewJob({...newJob, company: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" />
                     </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Location</label>
                        <input type="text" required value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" />
                     </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Job Type</label>
                        <select value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white">
                           <option>Full-Time</option>
                           <option>Part-Time</option>
                           <option>Internship</option>
                        </select>
                     </div>
                     <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Salary / Stipend</label>
                        <input type="text" required value={newJob.salary} onChange={e => setNewJob({...newJob, salary: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" />
                     </div>
                     <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea required rows="4" value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white resize-none"></textarea>
                     </div>
                     <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Requirements (One per line)</label>
                        <textarea required rows="4" value={newJob.requirements} onChange={e => setNewJob({...newJob, requirements: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white resize-none"></textarea>
                     </div>
                  </div>
                  <div className="pt-4 flex justify-end gap-3">
                     <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-lg font-bold text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                     <button type="submit" className="px-5 py-2 rounded-lg font-bold bg-brand-gradient text-white hover:opacity-90 transition shadow-md">Post Job</button>
                  </div>
               </form>
            </div>
         </div>
      )}

      {/* View Applicants Modal */}
      {viewApplicantsJob && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
               <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <div>
                     <h2 className="text-xl font-bold text-gray-900 dark:text-white">Applicants</h2>
                     <p className="text-sm text-gray-500">{viewApplicantsJob.title} at {viewApplicantsJob.company}</p>
                  </div>
                  <button onClick={() => setViewApplicantsJob(null)} className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition"><X size={20}/></button>
               </div>
               <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                  {applicants.length === 0 ? (
                     <div className="text-center py-12 text-gray-500">
                        No applications yet for this role.
                     </div>
                  ) : (
                     <div className="space-y-4">
                        {applicants.map(app => (
                           <div key={app.id} className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-between items-center">
                              <div>
                                 <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    {app.studentName} <span className="px-2 py-0.5 rounded text-xs bg-purple-100 text-purple-700 font-mono">{app.id}</span>
                                    {app.status === 'ACCEPTED' && <span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-700 font-bold">ACCEPTED</span>}
                                    {app.status === 'REJECTED' && <span className="px-2 py-0.5 rounded text-xs bg-red-100 text-red-700 font-bold">REJECTED</span>}
                                    {app.status === 'PENDING' && <span className="px-2 py-0.5 rounded text-xs bg-yellow-100 text-yellow-700 font-bold">PENDING</span>}
                                 </div>
                                 <div className="text-sm text-gray-500 mt-1">Applied on {new Date(app.appliedAt).toLocaleDateString()}</div>
                              </div>
                              <div className="flex gap-2">
                                 {app.status === 'PENDING' && (
                                    <>
                                       <button onClick={() => handleUpdateStatus(app.id, 'ACCEPTED')} className="px-3 py-1.5 bg-green-50 text-green-600 border border-green-200 rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-green-100 transition">
                                          <Check size={16}/> Accept
                                       </button>
                                       <button onClick={() => handleUpdateStatus(app.id, 'REJECTED')} className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-red-100 transition">
                                          <XCircle size={16}/> Reject
                                       </button>
                                    </>
                                 )}
                                 <button onClick={() => {
                                    setSelectedResume(app.resumeData);
                                 }} className="px-4 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-bold flex items-center gap-2 hover:border-purple-500 transition text-gray-900 dark:text-white">
                                    <Eye size={16}/> View Resume
                                 </button>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            </div>
         </div>
      )}

      {/* Resume Viewer Modal */}
      {selectedResume && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[95vh]">
               <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                     <Eye size={18} className="text-purple-500"/> Resume Viewer
                  </h2>
                  <button onClick={() => setSelectedResume(null)} className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition"><X size={20}/></button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                  <div className="bg-white text-gray-800 w-full max-w-[800px] mx-auto shadow-lg p-8 md:p-12 min-h-[842px]">
                     {/* Header */}
                     <div className="text-center border-b-2 border-gray-800 pb-6 mb-6">
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">{selectedResume.personal?.fullName || 'Anonymous User'}</h1>
                        <div className="flex flex-wrap justify-center gap-3 mt-3 text-sm text-gray-600 font-medium">
                           <span>{selectedResume.personal?.email || 'No Email'}</span>
                           <span>• {selectedResume.personal?.phone || 'No Phone'}</span>
                           <span>• {selectedResume.personal?.location || 'No Location'}</span>
                        </div>
                     </div>

                     {/* Summary */}
                     <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed text-sm">{selectedResume.personal?.summary || ''}</p>
                     </div>

                     {/* Experience */}
                     {selectedResume.experience && selectedResume.experience.length > 0 && (
                        <div className="mb-6">
                           <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-4">Experience</h3>
                           <div className="space-y-4">
                              {selectedResume.experience.map(exp => (
                                <div key={exp.id}>
                                   <div className="flex justify-between items-baseline mb-1">
                                      <h4 className="font-bold text-gray-800">{exp.role}</h4>
                                      <span className="text-xs font-semibold text-gray-500">{exp.date}</span>
                                   </div>
                                   <div className="text-sm font-medium text-gray-600 mb-2">{exp.company}</div>
                                   <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                                </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {/* Education */}
                     {selectedResume.education && selectedResume.education.length > 0 && (
                        <div className="mb-6">
                           <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-4">Education</h3>
                           <div className="space-y-3">
                              {selectedResume.education.map(edu => (
                                <div key={edu.id}>
                                   <div className="flex justify-between items-baseline mb-1">
                                      <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                                      <span className="text-xs font-semibold text-gray-500">{edu.date}</span>
                                   </div>
                                   <div className="text-sm font-medium text-gray-600">{edu.school}</div>
                                </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {/* Projects */}
                     {selectedResume.projects && selectedResume.projects.length > 0 && (
                        <div className="mb-6">
                           <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-4">Projects</h3>
                           <div className="space-y-4">
                              {selectedResume.projects.map(proj => (
                                <div key={proj.id}>
                                   <div className="flex justify-between items-baseline mb-1">
                                      <h4 className="font-bold text-gray-800">{proj.title}</h4>
                                      <span className="text-xs font-semibold text-gray-500">{proj.techStack}</span>
                                   </div>
                                   <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
                                </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {/* Certifications */}
                     {selectedResume.certifications && selectedResume.certifications.length > 0 && (
                        <div className="mb-6">
                           <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-4">Certifications</h3>
                           <div className="space-y-3">
                              {selectedResume.certifications.map(cert => (
                                <div key={cert.id}>
                                   <div className="flex justify-between items-baseline mb-1">
                                      <h4 className="font-bold text-gray-800">{cert.name}</h4>
                                      <span className="text-xs font-semibold text-gray-500">{cert.date}</span>
                                   </div>
                                   <div className="text-sm font-medium text-gray-600">{cert.issuer}</div>
                                </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {/* Skills */}
                     {selectedResume.skills && (
                        <div>
                           <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-4">Skills</h3>
                           <p className="text-sm text-gray-700 leading-relaxed">{selectedResume.skills}</p>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      )}

    </div>
  );
}

// Helper icon component for inline use
function UsersIcon(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
}
