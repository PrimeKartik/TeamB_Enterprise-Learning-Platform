import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export default function ResumePreview({ resumeData, selectedTemplate = "modern", printRef }) {
  const { personal, education, experience, projects, skills, certifications, achievements } = resumeData || {};

  return (
    <div 
      ref={printRef}
      id="printable-resume" 
      className="bg-white text-black w-full max-w-[800px] mx-auto min-h-[842px] shadow-2xl p-6 md:p-10 font-sans transition-all duration-300 select-text rounded-sm box-border"
      style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
    >
      
      {/* ==================== TEMPLATE 1: MODERN BLACK & WHITE ATS ==================== */}
      {selectedTemplate === "modern" && (
        <div className="space-y-3.5">
          {/* Header */}
          <div className="border-b-2 border-black pb-3 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-black tracking-tight text-black uppercase leading-none">{personal?.fullName || "Your Full Name"}</h1>
              <p className="text-sm font-bold text-gray-800 uppercase tracking-wider">{personal?.title || "Professional Title"}</p>
              
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-800 font-medium pt-1">
                {personal?.email && <span>{personal.email}</span>}
                {personal?.phone && <span>• {personal.phone}</span>}
                {personal?.address && <span>• {personal.address}</span>}
                {personal?.linkedin && <span>• {personal.linkedin}</span>}
                {personal?.github && <span>• {personal.github}</span>}
                {personal?.portfolio && <span>• {personal.portfolio}</span>}
              </div>
            </div>

            {personal?.photoUrl && (
              <img src={personal.photoUrl} alt="Profile" className="w-16 h-16 rounded object-cover border border-black shrink-0" />
            )}
          </div>

          {/* Summary */}
          {personal?.summary && (
            <div className="space-y-1">
              <h3 className="text-sm font-black uppercase tracking-wider text-black border-b border-black pb-1">Professional Summary</h3>
              <p className="text-xs text-gray-900 leading-relaxed font-normal">{personal.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-black border-b border-black pb-1">Work Experience</h3>
              <div className="space-y-2.5">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline text-xs sm:text-sm font-bold text-black">
                      <span>{exp.position} — <strong className="text-black font-extrabold">{exp.company}</strong></span>
                      <span className="text-xs font-mono text-gray-700">{exp.duration}</span>
                    </div>
                    {exp.responsibilities && (
                      <ul className="list-disc list-inside text-xs text-gray-900 leading-relaxed space-y-1 pl-1">
                        {exp.responsibilities.split('\n').filter(r => r.trim()).map((resp, rIdx) => (
                          <li key={rIdx}>{resp.replace(/^[•\-\*]\s*/, '')}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-black border-b border-black pb-1">Key Technical Projects</h3>
              <div className="space-y-2">
                {projects.map((p) => (
                  <div key={p.id} className="space-y-1">
                    <div className="flex justify-between items-baseline text-xs sm:text-sm font-bold text-black">
                      <span>{p.name}</span>
                      <span className="text-xs font-mono text-gray-700">{p.technologies}</span>
                    </div>
                    <p className="text-xs text-gray-900 leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div className="space-y-1.5">
              <h3 className="text-sm font-black uppercase tracking-wider text-black border-b border-black pb-1">Education</h3>
              <div className="space-y-1 text-xs">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline text-black">
                    <span className="font-bold">{edu.degree} — <span className="font-semibold text-gray-800">{edu.college} ({edu.university})</span> {edu.cgpa ? `• CGPA: ${edu.cgpa}` : ''}</span>
                    <span className="font-mono text-gray-700 text-xs">{edu.startYear} - {edu.endYear}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills && (
            <div className="space-y-1.5">
              <h3 className="text-sm font-black uppercase tracking-wider text-black border-b border-black pb-1">Skills & Core Competencies</h3>
              <div className="space-y-1 text-xs text-gray-900">
                {Object.entries(skills || {}).map(([cat, list]) => list && (
                  <div key={cat} className="flex gap-2 leading-relaxed">
                    <span className="font-extrabold uppercase text-xs text-black w-32 shrink-0">{cat}:</span>
                    <span className="font-normal">{list}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications & Achievements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {certifications && certifications.length > 0 && (
              <div className="space-y-1">
                <h3 className="text-sm font-black uppercase tracking-wider text-black border-b border-black pb-1">Certifications</h3>
                <ul className="list-disc list-inside text-xs text-gray-900 space-y-1">
                  {certifications.map((c) => (
                    <li key={c.id}>
                      <strong className="text-black">{c.name}</strong> — {c.issuer} ({c.date})
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {achievements && achievements.length > 0 && (
              <div className="space-y-1">
                <h3 className="text-sm font-black uppercase tracking-wider text-black border-b border-black pb-1">Achievements</h3>
                <ul className="list-disc list-inside text-xs text-gray-900 space-y-1">
                  {achievements.map((a) => (
                    <li key={a.id}>
                      <strong className="text-black">{a.title}</strong> — {a.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== TEMPLATE 2: PROFESSIONAL CLASSIC ==================== */}
      {selectedTemplate !== "modern" && (
        <div className="space-y-3.5">
          <div className="text-center border-b-2 border-black pb-3">
            <h1 className="text-3xl font-black text-black uppercase leading-none">{personal?.fullName || "Your Full Name"}</h1>
            <p className="text-xs font-bold text-gray-800 uppercase tracking-widest mt-1">{personal?.title}</p>
            <div className="flex flex-wrap justify-center gap-3 mt-1.5 text-xs text-gray-800 font-medium">
              {personal?.email && <span>{personal.email}</span>}
              {personal?.phone && <span>• {personal.phone}</span>}
              {personal?.address && <span>• {personal.address}</span>}
              {personal?.linkedin && <span>• {personal.linkedin}</span>}
            </div>
          </div>

          {personal?.summary && (
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-black border-b border-black pb-1 mb-1.5">Professional Summary</h3>
              <p className="text-xs text-gray-900 leading-relaxed">{personal.summary}</p>
            </div>
          )}

          {experience && experience.length > 0 && (
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-black border-b border-black pb-1 mb-1.5">Work Experience</h3>
              <div className="space-y-2">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between font-bold text-xs sm:text-sm text-black">
                      <span>{exp.position} - {exp.company}</span>
                      <span className="font-mono text-gray-700 text-xs">{exp.duration}</span>
                    </div>
                    {exp.responsibilities && (
                      <ul className="list-disc list-inside text-xs text-gray-900 leading-relaxed space-y-1 pl-1">
                        {exp.responsibilities.split('\n').filter(r => r.trim()).map((resp, rIdx) => (
                          <li key={rIdx}>{resp.replace(/^[•\-\*]\s*/, '')}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects && projects.length > 0 && (
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-black border-b border-black pb-1 mb-1.5">Projects</h3>
              <div className="space-y-1.5 text-xs">
                {projects.map((p) => (
                  <div key={p.id}>
                    <span className="font-bold text-black text-xs sm:text-sm">{p.name}</span> ({p.technologies})
                    <p className="text-gray-900 leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education && education.length > 0 && (
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-black border-b border-black pb-1 mb-1.5">Education</h3>
              <div className="space-y-1 text-xs">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between text-black">
                    <span className="font-bold">{edu.degree} — {edu.college}</span>
                    <span className="font-mono text-gray-700 text-xs">{edu.startYear} - {edu.endYear}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
