import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, Save, Download, Printer, Share2, Eye, Plus, Trash2, Sparkles, 
  Layers
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../../context/AuthContext';
import { DEFAULT_RESUME_DATA, TEMPLATE_OPTIONS, AI_SUMMARY_SUGGESTIONS, ACTION_VERBS } from './data/resumeTemplates';
import ResumePreview from './components/ResumePreview';
import ATSScoreWidget from './components/ATSScoreWidget';

export default function ResumeBuilder() {
  const { user } = useAuthContext();
  const printRef = useRef(null);
  const storageKey = `skillSphereResume_${user?.email || 'guest'}`;

  // Form & Preview State
  const [resumeData, setResumeData] = useState(DEFAULT_RESUME_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [activeStep, setActiveStep] = useState("personal");
  const [lastSaved, setLastSaved] = useState("Just now");

  // Auto-Save Effect
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setResumeData(JSON.parse(saved));
      } catch (e) {
        console.log("Using default template data", e);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(storageKey, JSON.stringify(resumeData));
      setLastSaved(new Date().toLocaleTimeString());
    }, 1500);
    return () => clearTimeout(timer);
  }, [resumeData, storageKey]);

  // Form Handlers
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [name]: value }
    }));
  };

  const handleSkillsCategoryChange = (category, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: { ...prev.skills, [category]: value }
    }));
  };

  // Education Helpers
  const addEducation = () => {
    const newEdu = { id: `edu_${Date.now()}`, degree: "", college: "", university: "", cgpa: "", startYear: "", endYear: "" };
    setResumeData(prev => ({ ...prev, education: [...(prev.education || []), newEdu] }));
  };
  const updateEducation = (id, field, val) => {
    setResumeData(prev => ({
      ...prev,
      education: (prev.education || []).map(e => e.id === id ? { ...e, [field]: val } : e)
    }));
  };
  const removeEducation = (id) => {
    setResumeData(prev => ({ ...prev, education: (prev.education || []).filter(e => e.id !== id) }));
  };

  // Experience Helpers
  const addExperience = () => {
    const newExp = { id: `exp_${Date.now()}`, company: "", position: "", duration: "", responsibilities: "" };
    setResumeData(prev => ({ ...prev, experience: [...(prev.experience || []), newExp] }));
  };
  const updateExperience = (id, field, val) => {
    setResumeData(prev => ({
      ...prev,
      experience: (prev.experience || []).map(e => e.id === id ? { ...e, [field]: val } : e)
    }));
  };
  const removeExperience = (id) => {
    setResumeData(prev => ({ ...prev, experience: (prev.experience || []).filter(e => e.id !== id) }));
  };

  // Project Helpers
  const addProject = () => {
    const newProj = { id: `proj_${Date.now()}`, name: "", description: "", technologies: "", github: "", demo: "" };
    setResumeData(prev => ({ ...prev, projects: [...(prev.projects || []), newProj] }));
  };
  const updateProject = (id, field, val) => {
    setResumeData(prev => ({
      ...prev,
      projects: (prev.projects || []).map(p => p.id === id ? { ...p, [field]: val } : p)
    }));
  };
  const removeProject = (id) => {
    setResumeData(prev => ({ ...prev, projects: (prev.projects || []).filter(p => p.id !== id) }));
  };

  // Certification Helpers
  const addCertification = () => {
    const newCert = { id: `cert_${Date.now()}`, name: "", issuer: "", date: "", credentialUrl: "" };
    setResumeData(prev => ({ ...prev, certifications: [...(prev.certifications || []), newCert] }));
  };
  const updateCertification = (id, field, val) => {
    setResumeData(prev => ({
      ...prev,
      certifications: (prev.certifications || []).map(c => c.id === id ? { ...c, [field]: val } : c)
    }));
  };
  const removeCertification = (id) => {
    setResumeData(prev => ({ ...prev, certifications: (prev.certifications || []).filter(c => c.id !== id) }));
  };

  // AI Assistant Triggers
  const applyAISummary = () => {
    const randomSummary = AI_SUMMARY_SUGGESTIONS[Math.floor(Math.random() * AI_SUMMARY_SUGGESTIONS.length)];
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, summary: randomSummary }
    }));
    toast.success("AI Summary Generated!");
  };

  const insertActionVerb = (expId, verb) => {
    setResumeData(prev => ({
      ...prev,
      experience: (prev.experience || []).map(exp => {
        if (exp.id === expId) {
          const current = exp.responsibilities || "";
          const updated = current ? `${current}\n• ${verb} ` : `• ${verb} `;
          return { ...exp, responsibilities: updated };
        }
        return exp;
      })
    }));
  };

  // Save / Export Actions
  const handleManualSave = () => {
    localStorage.setItem(storageKey, JSON.stringify(resumeData));
    toast.success("Resume saved successfully!");
  };

  // Pristine Self-Contained 1-Page A4 PDF Print Handler
  const handlePrint = () => {
    const { personal, education, experience, projects, skills, certifications, achievements } = resumeData || {};

    const printWindow = window.open('', '_blank', 'width=900,height=1150');
    if (!printWindow) {
      toast.error("Please allow pop-ups to print or export PDF!");
      return;
    }

    const printHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${personal?.fullName || 'Resume'} - SkillSphere ATS Resume</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 10mm 12mm;
            }
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body {
              margin: 0;
              padding: 0;
              background-color: #ffffff !important;
              color: #000000 !important;
              font-family: 'Segoe UI', Arial, sans-serif;
            }
            .page-canvas {
              width: 100%;
              max-width: 210mm;
              margin: 0 auto;
              padding: 5mm 0;
              box-sizing: border-box;
              background-color: #ffffff;
              color: #000000;
            }
            .header-title {
              font-size: 26px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              color: #000000;
              margin: 0 0 4px 0;
              line-height: 1.1;
            }
            .header-subtitle {
              font-size: 13px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1px;
              color: #111827;
              margin-bottom: 6px;
            }
            .contact-bar {
              font-size: 11.5px;
              color: #374151;
              padding-bottom: 8px;
              border-bottom: 2px solid #000000;
              margin-bottom: 12px;
            }
            .contact-item {
              display: inline-block;
              margin-right: 10px;
            }
            .section-heading {
              font-size: 13px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: 1.2px;
              color: #000000;
              border-bottom: 1.5px solid #000000;
              padding-bottom: 3px;
              margin-top: 14px;
              margin-bottom: 8px;
            }
            .summary-p {
              font-size: 11.5px;
              line-height: 1.5;
              color: #1F2937;
              margin: 0 0 8px 0;
            }
            .item-row {
              margin-bottom: 8px;
              page-break-inside: avoid;
            }
            .role-title {
              font-size: 12.5px;
              font-weight: 800;
              color: #000000;
            }
            .company-name {
              font-weight: 700;
              color: #111827;
            }
            .item-date {
              font-size: 11px;
              font-weight: 600;
              font-family: 'Consolas', 'Courier New', monospace;
              color: #4B5563;
              float: right;
            }
            ul.bullets {
              margin: 4px 0 6px 16px;
              padding: 0;
            }
            ul.bullets li {
              font-size: 11.5px;
              line-height: 1.45;
              color: #1F2937;
              margin-bottom: 3px;
            }
            .skill-line {
              font-size: 11.5px;
              line-height: 1.4;
              margin-bottom: 4px;
            }
            .skill-label {
              font-weight: 800;
              font-size: 11px;
              text-transform: uppercase;
              color: #000000;
              display: inline-block;
              width: 140px;
            }
            .clear { clear: both; }
          </style>
        </head>
        <body>
          <div class="page-canvas">
            <!-- Header -->
            <div class="header-title">${personal?.fullName || "YOUR FULL NAME"}</div>
            <div class="header-subtitle">${personal?.title || "PROFESSIONAL TITLE"}</div>
            <div class="contact-bar">
              ${[
                personal?.email,
                personal?.phone,
                personal?.address,
                personal?.linkedin,
                personal?.github,
                personal?.portfolio
              ].filter(Boolean).map(item => `<span class="contact-item">${item}</span>`).join(" &bull; ")}
            </div>

            <!-- Summary -->
            ${personal?.summary ? `
              <div class="section-heading">Professional Summary</div>
              <p class="summary-p">${personal.summary}</p>
            ` : ''}

            <!-- Experience -->
            ${(experience && experience.length > 0) ? `
              <div class="section-heading">Work Experience</div>
              ${experience.map(exp => `
                <div class="item-row">
                  <div class="item-date">${exp.duration || ''}</div>
                  <div class="role-title">${exp.position || ''} &mdash; <span class="company-name">${exp.company || ''}</span></div>
                  <div class="clear"></div>
                  ${exp.responsibilities ? `
                    <ul class="bullets">
                      ${exp.responsibilities.split('\n').filter(r => r.trim()).map(r => `<li>${r.replace(/^[•\-\*]\s*/, '')}</li>`).join('')}
                    </ul>
                  ` : ''}
                </div>
              `).join('')}
            ` : ''}

            <!-- Projects -->
            ${(projects && projects.length > 0) ? `
              <div class="section-heading">Key Technical Projects</div>
              ${projects.map(p => `
                <div class="item-row">
                  <div class="role-title">${p.name || ''} <span style="font-weight: 600; font-size: 11px; color: #4B5563;">(${p.technologies || ''})</span></div>
                  <div style="font-size: 11.5px; color: #374151; margin-top: 2px; line-height: 1.4;">${p.description || ''}</div>
                </div>
              `).join('')}
            ` : ''}

            <!-- Education -->
            ${(education && education.length > 0) ? `
              <div class="section-heading">Education</div>
              ${education.map(edu => `
                <div class="item-row">
                  <div class="item-date">${edu.startYear || ''} - ${edu.endYear || ''}</div>
                  <div class="role-title">${edu.degree || ''} &mdash; <span style="font-weight: 600; color: #374151;">${edu.college || ''} ${edu.university ? `(${edu.university})` : ''}</span> ${edu.cgpa ? `<span style="font-size: 11px; color: #4B5563;">&bull; CGPA: ${edu.cgpa}</span>` : ''}</div>
                  <div class="clear"></div>
                </div>
              `).join('')}
            ` : ''}

            <!-- Technical Skills -->
            ${skills ? `
              <div class="section-heading">Technical Skills & Competencies</div>
              ${Object.entries(skills).filter(([_, v]) => v && String(v).trim()).map(([cat, list]) => `
                <div class="skill-line">
                  <span class="skill-label">${cat}:</span> <span>${list}</span>
                </div>
              `).join('')}
            ` : ''}

            <!-- Certifications & Achievements -->
            ${((certifications && certifications.length > 0) || (achievements && achievements.length > 0)) ? `
              <div style="display: flex; gap: 20px; margin-top: 8px;">
                ${(certifications && certifications.length > 0) ? `
                  <div style="flex: 1;">
                    <div class="section-heading" style="margin-top: 0;">Certifications</div>
                    <ul class="bullets" style="margin-top: 4px;">
                      ${certifications.map(c => `<li><strong>${c.name}</strong> &mdash; ${c.issuer} (${c.date})</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
                ${(achievements && achievements.length > 0) ? `
                  <div style="flex: 1;">
                    <div class="section-heading" style="margin-top: 0;">Achievements</div>
                    <ul class="bullets" style="margin-top: 4px;">
                      ${achievements.map(a => `<li><strong>${a.title}</strong> &mdash; ${a.description}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 250);
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(printHtml);
    printWindow.document.close();
  };

  // High-Quality Professional Black & White Word Document Exporter
  const handleExportDOCX = () => {
    toast.info("Generating Professional Word Document...");

    const { personal, education, experience, projects, skills, certifications, achievements } = resumeData || {};

    const docHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${personal?.fullName || 'Resume'}</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 0.8in 0.8in 0.8in 0.8in;
          }
          body {
            font-family: 'Calibri', 'Arial', sans-serif;
            font-size: 11pt;
            line-height: 1.35;
            color: #000000;
            margin: 0;
            padding: 0;
          }
          h1 {
            font-size: 22pt;
            font-weight: bold;
            color: #000000;
            text-transform: uppercase;
            margin: 0 0 3pt 0;
            letter-spacing: 0.5pt;
          }
          .subtitle {
            font-size: 11pt;
            font-weight: bold;
            color: #000000;
            text-transform: uppercase;
            margin-bottom: 6pt;
            letter-spacing: 1pt;
          }
          .contact-bar {
            font-size: 9.5pt;
            color: #111827;
            margin-bottom: 12pt;
            padding-bottom: 6pt;
            border-bottom: 2pt solid #000000;
          }
          .section-header {
            font-size: 11pt;
            font-weight: bold;
            color: #000000;
            text-transform: uppercase;
            letter-spacing: 1pt;
            margin-top: 12pt;
            margin-bottom: 5pt;
            padding-bottom: 2pt;
            border-bottom: 1.5pt solid #000000;
          }
          .item-title {
            font-size: 11pt;
            font-weight: bold;
            color: #000000;
          }
          .item-subtitle {
            font-size: 10pt;
            font-weight: bold;
            color: #111827;
          }
          .item-date {
            font-size: 9.5pt;
            color: #374151;
            font-family: 'Consolas', 'Courier New', monospace;
            float: right;
          }
          .summary-text {
            font-size: 10.5pt;
            color: #111827;
            margin-bottom: 8pt;
          }
          ul {
            margin: 3pt 0 8pt 16pt;
            padding: 0;
          }
          li {
            font-size: 10pt;
            color: #111827;
            margin-bottom: 2pt;
          }
          .skill-row {
            font-size: 10pt;
            margin-bottom: 3pt;
          }
          .skill-cat {
            font-weight: bold;
            color: #000000;
            text-transform: uppercase;
            font-size: 9pt;
          }
        </style>
      </head>
      <body>
        <!-- Header -->
        <h1>${personal?.fullName || "Your Full Name"}</h1>
        <div class="subtitle">${personal?.title || "Professional Title"}</div>
        <div class="contact-bar">
          ${[
            personal?.email,
            personal?.phone,
            personal?.address,
            personal?.linkedin,
            personal?.github,
            personal?.portfolio
          ].filter(Boolean).join(" &nbsp;|&nbsp; ")}
        </div>

        <!-- Summary -->
        ${personal?.summary ? `
          <div class="section-header">Professional Summary</div>
          <div class="summary-text">${personal.summary}</div>
        ` : ''}

        <!-- Work Experience -->
        ${(experience && experience.length > 0) ? `
          <div class="section-header">Work Experience</div>
          ${experience.map(exp => `
            <div style="margin-bottom: 8pt;">
              <div class="item-date">${exp.duration || ''}</div>
              <div class="item-title">${exp.position || ''} &mdash; ${exp.company || ''}</div>
              ${exp.responsibilities ? `
                <ul>
                  ${exp.responsibilities.split('\n').filter(r => r.trim()).map(r => `<li>${r.replace(/^[•\-\*]\s*/, '')}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        ` : ''}

        <!-- Projects -->
        ${(projects && projects.length > 0) ? `
          <div class="section-header">Key Projects</div>
          ${projects.map(p => `
            <div style="margin-bottom: 6pt;">
              <div class="item-title">${p.name || ''} <span style="font-weight: normal; font-size: 9.5pt; color: #374151;">(${p.technologies || ''})</span></div>
              <div style="font-size: 10pt; color: #111827; margin-top: 2pt;">${p.description || ''}</div>
              ${(p.github || p.demo) ? `<div style="font-size: 9pt; color: #4B5563; margin-top: 1pt;">${[p.github, p.demo].filter(Boolean).join(' | ')}</div>` : ''}
            </div>
          `).join('')}
        ` : ''}

        <!-- Education -->
        ${(education && education.length > 0) ? `
          <div class="section-header">Education</div>
          ${education.map(edu => `
            <div style="margin-bottom: 5pt;">
              <div class="item-date">${edu.startYear || ''} - ${edu.endYear || ''}</div>
              <div class="item-title">${edu.degree || ''}</div>
              <div class="item-subtitle">${edu.college || ''} ${edu.university ? `(${edu.university})` : ''} ${edu.cgpa ? `&bull; CGPA: ${edu.cgpa}` : ''}</div>
            </div>
          `).join('')}
        ` : ''}

        <!-- Skills -->
        ${skills ? `
          <div class="section-header">Technical Skills</div>
          ${Object.entries(skills).filter(([_, v]) => v && String(v).trim()).map(([cat, list]) => `
            <div class="skill-row">
              <span class="skill-cat">${cat}:</span> ${list}
            </div>
          `).join('')}
        ` : ''}

        <!-- Certifications -->
        ${(certifications && certifications.length > 0) ? `
          <div class="section-header">Certifications</div>
          <ul>
            ${certifications.map(c => `<li><strong>${c.name}</strong> - ${c.issuer} (${c.date})</li>`).join('')}
          </ul>
        ` : ''}

        <!-- Achievements -->
        ${(achievements && achievements.length > 0) ? `
          <div class="section-header">Achievements</div>
          <ul>
            ${achievements.map(a => `<li><strong>${a.title}</strong> - ${a.description}</li>`).join('')}
          </ul>
        ` : ''}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', docHtml], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(personal?.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.doc`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Professional Word Document Exported!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Sharable Resume Link copied to clipboard!");
  };

  const wizardSteps = [
    { id: "personal", label: "1. Personal" },
    { id: "summary", label: "2. Summary" },
    { id: "education", label: "3. Education" },
    { id: "experience", label: "4. Experience" },
    { id: "projects", label: "5. Projects" },
    { id: "skills", label: "6. Skills" },
    { id: "certifications", label: "7. Certifications" },
    { id: "achievements", label: "8. Achievements" }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      
      {/* Header Bar */}
      <div className="bg-panel border border-soft p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wide">
            ENTERPRISE ATS RESUME SUITE
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-heading mt-2 flex items-center gap-3">
            <FileText className="text-[#EC4899]" size={32} /> Professional ATS Resume Builder
          </h1>
          <p className="text-xs text-muted mt-1">
            Build, optimize, and export recruiters' top-rated ATS-compliant resumes with real-time live preview.
          </p>
        </div>

        {/* Export Suite Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={handleManualSave} className="px-3.5 py-2 rounded-xl bg-base border border-soft text-xs font-bold text-heading hover:bg-hover transition flex items-center gap-1.5 cursor-pointer">
            <Save size={14} /> Save Draft
          </button>
          <button onClick={handlePrint} className="px-3.5 py-2 rounded-xl bg-brand-gradient text-white text-xs font-bold shadow-lg hover:opacity-90 transition flex items-center gap-1.5 cursor-pointer">
            <Printer size={14} /> Export PDF
          </button>
          <button onClick={handleExportDOCX} className="px-3.5 py-2 rounded-xl bg-base border border-soft text-xs font-bold text-purple-300 hover:bg-hover transition flex items-center gap-1.5 cursor-pointer">
            <Download size={14} /> Export DOCX
          </button>
          <button onClick={handleShare} className="p-2 rounded-xl bg-base border border-soft text-muted hover:text-heading transition cursor-pointer">
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Dynamic ATS Score Calculator & Recommendations */}
      <ATSScoreWidget 
        resumeData={resumeData} 
        onJumpToSection={(secName) => {
          if (secName.includes("Summary")) setActiveStep("summary");
          else if (secName.includes("Experience")) setActiveStep("experience");
          else if (secName.includes("Education") || secName.includes("Degree")) setActiveStep("education");
          else if (secName.includes("Project")) setActiveStep("projects");
          else if (secName.includes("Skills")) setActiveStep("skills");
          else if (secName.includes("Certifications")) setActiveStep("certifications");
          else setActiveStep("personal");
        }}
      />

      {/* Template Selector Bar */}
      <div className="bg-panel border border-soft p-4 rounded-2xl shadow-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Layers className="text-purple-400" size={18} />
          <span className="text-xs font-bold text-heading uppercase tracking-wider">ATS TEMPLATE:</span>
          <select 
            value={selectedTemplate} 
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="px-4 py-2 rounded-xl bg-base border border-soft text-xs font-bold text-heading focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            {TEMPLATE_OPTIONS.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        <span className="text-xs text-muted font-mono hidden sm:inline">
          100% Recruiter & ATS Compliant Formatting
        </span>
      </div>

      {/* MAIN SPLIT SCREEN: Editor (Left) & Live A4 Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Form Wizard (7 cols) */}
        <div className="lg:col-span-7 space-y-4 bg-panel border border-soft rounded-2xl p-6 shadow-xl">
          
          {/* Step Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-soft">
            {wizardSteps.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveStep(s.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  activeStep === s.id
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'text-muted hover:text-heading hover:bg-hover'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* STEP 1: Personal Information */}
          {activeStep === "personal" && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-sm font-extrabold text-heading border-b border-soft pb-2">1. Personal Details & Social Links</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-muted block mb-1 uppercase">Full Name *</label>
                  <input type="text" name="fullName" value={resumeData.personal?.fullName || ""} onChange={handlePersonalChange} className="w-full px-3 py-2 rounded-xl bg-base border border-soft text-xs text-heading focus:outline-none focus:border-purple-500" />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-muted block mb-1 uppercase">Professional Title *</label>
                  <input type="text" name="title" value={resumeData.personal?.title || ""} onChange={handlePersonalChange} placeholder="e.g. Senior Full Stack Engineer" className="w-full px-3 py-2 rounded-xl bg-base border border-soft text-xs text-heading focus:outline-none focus:border-purple-500" />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-muted block mb-1 uppercase">Email Address *</label>
                  <input type="email" name="email" value={resumeData.personal?.email || ""} onChange={handlePersonalChange} className="w-full px-3 py-2 rounded-xl bg-base border border-soft text-xs text-heading focus:outline-none focus:border-purple-500" />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-muted block mb-1 uppercase">Phone Number</label>
                  <input type="text" name="phone" value={resumeData.personal?.phone || ""} onChange={handlePersonalChange} className="w-full px-3 py-2 rounded-xl bg-base border border-soft text-xs text-heading focus:outline-none focus:border-purple-500" />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-muted block mb-1 uppercase">Location / City</label>
                  <input type="text" name="address" value={resumeData.personal?.address || ""} onChange={handlePersonalChange} className="w-full px-3 py-2 rounded-xl bg-base border border-soft text-xs text-heading focus:outline-none focus:border-purple-500" />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-muted block mb-1 uppercase">LinkedIn Profile Link</label>
                  <input type="text" name="linkedin" value={resumeData.personal?.linkedin || ""} onChange={handlePersonalChange} className="w-full px-3 py-2 rounded-xl bg-base border border-soft text-xs text-heading focus:outline-none focus:border-purple-500" />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-muted block mb-1 uppercase">GitHub Profile Link</label>
                  <input type="text" name="github" value={resumeData.personal?.github || ""} onChange={handlePersonalChange} className="w-full px-3 py-2 rounded-xl bg-base border border-soft text-xs text-heading focus:outline-none focus:border-purple-500" />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-muted block mb-1 uppercase">Portfolio Website Link</label>
                  <input type="text" name="portfolio" value={resumeData.personal?.portfolio || ""} onChange={handlePersonalChange} className="w-full px-3 py-2 rounded-xl bg-base border border-soft text-xs text-heading focus:outline-none focus:border-purple-500" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Professional Summary */}
          {activeStep === "summary" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-soft pb-2">
                <h3 className="text-sm font-extrabold text-heading">2. Professional Summary</h3>
                <button 
                  onClick={applyAISummary}
                  className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30 hover:bg-purple-500/30 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles size={13} className="text-amber-400" /> Generate AI Summary
                </button>
              </div>

              <div>
                <label className="text-[11px] font-bold text-muted block mb-1 uppercase">Summary Description</label>
                <textarea 
                  name="summary" 
                  rows="6" 
                  value={resumeData.personal?.summary || ""} 
                  onChange={handlePersonalChange}
                  placeholder="Write a concise overview of your technical background, top accomplishments, and domain expertise..."
                  className="w-full px-3 py-2 rounded-xl bg-base border border-soft text-xs text-heading focus:outline-none focus:border-purple-500 leading-relaxed"
                />
                <div className="text-right text-[10px] text-muted font-mono mt-1">
                  Word Count: {(resumeData.personal?.summary || "").trim().split(/\s+/).filter(Boolean).length} words
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Education */}
          {activeStep === "education" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-soft pb-2">
                <h3 className="text-sm font-extrabold text-heading">3. Education & Credentials</h3>
                <button onClick={addEducation} className="px-3 py-1 rounded-xl bg-brand-gradient text-white text-xs font-bold shadow flex items-center gap-1 cursor-pointer">
                  <Plus size={14} /> Add Education
                </button>
              </div>

              {(resumeData.education || []).map((edu) => (
                <div key={edu.id} className="p-4 rounded-xl bg-base border border-soft space-y-3 relative group">
                  <button onClick={() => removeEducation(edu.id)} className="absolute top-3 right-3 text-pink-400 hover:text-pink-300">
                    <Trash2 size={16} />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-muted block mb-1 uppercase">Degree</label>
                      <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} placeholder="B.Tech Computer Science" className="w-full px-3 py-2 rounded-xl bg-panel border border-soft text-xs text-heading" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-muted block mb-1 uppercase">College / University</label>
                      <input type="text" value={edu.college} onChange={(e) => updateEducation(edu.id, 'college', e.target.value)} placeholder="IIT / VTU" className="w-full px-3 py-2 rounded-xl bg-panel border border-soft text-xs text-heading" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-muted block mb-1 uppercase">CGPA / Percentage</label>
                      <input type="text" value={edu.cgpa} onChange={(e) => updateEducation(edu.id, 'cgpa', e.target.value)} placeholder="8.5 / 10.0" className="w-full px-3 py-2 rounded-xl bg-panel border border-soft text-xs text-heading" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-muted block mb-1 uppercase">Years (Start - End)</label>
                      <input type="text" value={edu.startYear} onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)} placeholder="2020 - 2024" className="w-full px-3 py-2 rounded-xl bg-panel border border-soft text-xs text-heading" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 4: Experience */}
          {activeStep === "experience" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-soft pb-2">
                <h3 className="text-sm font-extrabold text-heading">4. Work Experience</h3>
                <button onClick={addExperience} className="px-3 py-1 rounded-xl bg-brand-gradient text-white text-xs font-bold shadow flex items-center gap-1 cursor-pointer">
                  <Plus size={14} /> Add Experience
                </button>
              </div>

              {(resumeData.experience || []).map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl bg-base border border-soft space-y-3 relative">
                  <button onClick={() => removeExperience(exp.id)} className="absolute top-3 right-3 text-pink-400 hover:text-pink-300">
                    <Trash2 size={16} />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-muted block mb-1 uppercase">Position</label>
                      <input type="text" value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} placeholder="Software Engineer" className="w-full px-3 py-2 rounded-xl bg-panel border border-soft text-xs text-heading" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-muted block mb-1 uppercase">Company</label>
                      <input type="text" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} placeholder="Tech Corp" className="w-full px-3 py-2 rounded-xl bg-panel border border-soft text-xs text-heading" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-muted block mb-1 uppercase">Duration</label>
                      <input type="text" value={exp.duration} onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)} placeholder="Jun 2024 - Present" className="w-full px-3 py-2 rounded-xl bg-panel border border-soft text-xs text-heading" />
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-muted uppercase">Responsibilities & Quantified Impact</label>
                        <div className="flex items-center gap-1 overflow-x-auto max-w-xs scrollbar-none">
                          <span className="text-[10px] text-purple-300 font-bold">Action Verbs:</span>
                          {ACTION_VERBS.slice(0, 4).map((verb, vIdx) => (
                            <button key={vIdx} onClick={() => insertActionVerb(exp.id, verb)} className="px-1.5 py-0.5 rounded text-[10px] bg-panel text-muted hover:text-heading border border-soft">
                              +{verb}
                            </button>
                          ))}
                        </div>
                      </div>
                      <textarea rows="4" value={exp.responsibilities} onChange={(e) => updateExperience(exp.id, 'responsibilities', e.target.value)} className="w-full px-3 py-2 rounded-xl bg-panel border border-soft text-xs text-heading leading-relaxed" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 5: Projects */}
          {activeStep === "projects" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-soft pb-2">
                <h3 className="text-sm font-extrabold text-heading">5. Technical Projects</h3>
                <button onClick={addProject} className="px-3 py-1 rounded-xl bg-brand-gradient text-white text-xs font-bold shadow flex items-center gap-1 cursor-pointer">
                  <Plus size={14} /> Add Project
                </button>
              </div>

              {(resumeData.projects || []).map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-base border border-soft space-y-3 relative">
                  <button onClick={() => removeProject(proj.id)} className="absolute top-3 right-3 text-pink-400 hover:text-pink-300">
                    <Trash2 size={16} />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-muted block mb-1 uppercase">Project Name</label>
                      <input type="text" value={proj.name} onChange={(e) => updateProject(proj.id, 'name', e.target.value)} placeholder="SkillSphere LMS Platform" className="w-full px-3 py-2 rounded-xl bg-panel border border-soft text-xs text-heading" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-muted block mb-1 uppercase">Tech Stack</label>
                      <input type="text" value={proj.technologies} onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)} placeholder="React, Node.js, MySQL" className="w-full px-3 py-2 rounded-xl bg-panel border border-soft text-xs text-heading" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-muted block mb-1 uppercase">Description</label>
                      <textarea rows="3" value={proj.description} onChange={(e) => updateProject(proj.id, 'description', e.target.value)} className="w-full px-3 py-2 rounded-xl bg-panel border border-soft text-xs text-heading leading-relaxed" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 6: Skills */}
          {activeStep === "skills" && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-sm font-extrabold text-heading border-b border-soft pb-2">6. Categorized Technical Skills</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: "languages", label: "Programming Languages" },
                  { key: "frontend", label: "Frontend Frameworks" },
                  { key: "backend", label: "Backend Microservices" },
                  { key: "database", label: "Databases & ORMs" },
                  { key: "cloud", label: "Cloud Platforms (AWS/GCP)" },
                  { key: "devops", label: "DevOps & CI/CD Tools" },
                  { key: "testing", label: "Testing Libraries" },
                  { key: "softSkills", label: "Soft Skills & Agility" }
                ].map((item) => (
                  <div key={item.key}>
                    <label className="text-[11px] font-bold text-muted block mb-1 uppercase">{item.label}</label>
                    <input 
                      type="text" 
                      value={resumeData.skills?.[item.key] || ""} 
                      onChange={(e) => handleSkillsCategoryChange(item.key, e.target.value)} 
                      placeholder="e.g. JavaScript, React, Node" 
                      className="w-full px-3 py-2 rounded-xl bg-base border border-soft text-xs text-heading focus:outline-none focus:border-purple-500" 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 7: Certifications */}
          {activeStep === "certifications" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-soft pb-2">
                <h3 className="text-sm font-extrabold text-heading">7. Industry Certifications</h3>
                <button onClick={addCertification} className="px-3 py-1 rounded-xl bg-brand-gradient text-white text-xs font-bold shadow flex items-center gap-1 cursor-pointer">
                  <Plus size={14} /> Add Certification
                </button>
              </div>

              {(resumeData.certifications || []).map((cert) => (
                <div key={cert.id} className="p-4 rounded-xl bg-base border border-soft space-y-3 relative">
                  <button onClick={() => removeCertification(cert.id)} className="absolute top-3 right-3 text-pink-400 hover:text-pink-300">
                    <Trash2 size={16} />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-muted block mb-1 uppercase">Certification Name</label>
                      <input type="text" value={cert.name} onChange={(e) => updateCertification(cert.id, 'name', e.target.value)} placeholder="AWS Certified Developer" className="w-full px-3 py-2 rounded-xl bg-panel border border-soft text-xs text-heading" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-muted block mb-1 uppercase">Issuer</label>
                      <input type="text" value={cert.issuer} onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)} placeholder="Amazon Web Services" className="w-full px-3 py-2 rounded-xl bg-panel border border-soft text-xs text-heading" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-muted block mb-1 uppercase">Date</label>
                      <input type="text" value={cert.date} onChange={(e) => updateCertification(cert.id, 'date', e.target.value)} placeholder="Jan 2026" className="w-full px-3 py-2 rounded-xl bg-panel border border-soft text-xs text-heading" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 8: Achievements */}
          {activeStep === "achievements" && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-sm font-extrabold text-heading border-b border-soft pb-2">8. Achievements & Honors</h3>
              <p className="text-xs text-muted">Include hackathon wins, top academic rank, or technical awards.</p>
              
              <div className="p-4 rounded-xl bg-base border border-soft space-y-3">
                {(resumeData.achievements || []).map((ach) => (
                  <div key={ach.id} className="space-y-2">
                    <input type="text" value={ach.title} onChange={(e) => {
                      const updated = (resumeData.achievements || []).map(a => a.id === ach.id ? { ...a, title: e.target.value } : a);
                      setResumeData({ ...resumeData, achievements: updated });
                    }} placeholder="Achievement Title" className="w-full px-3 py-2 rounded-xl bg-panel border border-soft text-xs text-heading font-bold" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wizard Navigation Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-soft">
            <span className="text-[11px] text-muted font-mono">Auto-Saved: {lastSaved}</span>
            <button onClick={handleManualSave} className="px-4 py-2 rounded-xl bg-brand-gradient text-white text-xs font-bold shadow hover:opacity-90 transition cursor-pointer">
              Save All Changes
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Live A4 Document Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sticky top-20">
          <div className="bg-panel border border-soft p-4 rounded-2xl shadow-xl flex items-center justify-between">
            <span className="text-xs font-bold text-heading flex items-center gap-2">
              <Eye size={16} className="text-purple-400" /> Real-time A4 Resume Preview
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300">
              A4 Printable Layout
            </span>
          </div>

          <div className="overflow-y-auto max-h-[750px] scrollbar-none rounded-2xl shadow-2xl border border-soft">
            <ResumePreview 
              resumeData={resumeData} 
              selectedTemplate={selectedTemplate} 
              printRef={printRef}
            />
          </div>
        </div>

      </div>

    </div>
  );
}
