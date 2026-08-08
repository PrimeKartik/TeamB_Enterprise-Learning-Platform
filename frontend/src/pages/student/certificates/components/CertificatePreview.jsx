import { useState, useRef } from 'react'
import {
  Award,
  ShieldCheck,
  Share2,
  Copy,
  Check,
  Linkedin,
  Mail,
  Sparkles,
  Download,
  QrCode,
  CheckCircle2,
  GraduationCap,
  ExternalLink,
  Printer
} from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { toast } from 'react-toastify'
import { useAuthContext } from '../../../../context/AuthContext'

export default function CertificatePreview({ certificate, onClose }) {
  const { user } = useAuthContext()
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const certRef = useRef(null)

  if (!certificate) return null

  // Ensure Certificate ID follows SSLN-2026-XXXX format
  const rawId = certificate.certificateId || certificate.credentialId || `SSLN-2026-001254`
  const credentialId = rawId.startsWith('SSLN-')
    ? rawId
    : `SSLN-2026-${rawId.replace(/^SKILL-/, '').replace(/^[A-Za-z0-9]+-/, '')}`

  // Student details strictly from authenticated user context / certificate payload
  const studentName = certificate.studentName || certificate.student?.name || user?.name || 'Kavipriya S'
  const courseTitle = certificate.courseName || certificate.courseTitle || certificate.course?.title || 'Full Stack Development'
  const instructorName = certificate.instructor || certificate.instructorName || 'Dr. Alex Morgan'
  const issueDate = certificate.issueDate || '05 Aug 2026'
  const completionDate = certificate.completionDate || issueDate
  const duration = certificate.duration || certificate.courseDuration || '8 Weeks'
  const level = certificate.level || certificate.courseLevel || 'Intermediate'
  const grade = certificate.grade || 'A+'
  const completionPercentage = certificate.completionPercentage ? `${certificate.completionPercentage}%` : '100%'
  const learningHours = certificate.learningHours || '40 Hours'

  // Dynamic Verification URL
  const verifyPath = `/verify/${credentialId}`
  const fullVerifyUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${verifyPath}`
    : `https://skillsphere.edu/verify/${credentialId}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullVerifyUrl)
    setCopied(true)
    toast.success('Verification link copied to clipboard!')
    setTimeout(() => setCopied(false), 2500)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Official Certificate - ${studentName}`,
          text: `I earned my official certificate for "${courseTitle}" on SkillSphere Learning Nexus!`,
          url: fullVerifyUrl
        })
      } catch (err) {
        if (err.name !== 'AbortError') handleCopyLink()
      }
    } else {
      handleCopyLink()
    }
  }

  const handleDownloadPdf = async () => {
    if (!certRef.current) return
    try {
      setDownloading(true)
      const element = certRef.current
      const canvas = await html2canvas(element, {
        scale: 3, // High DPI clarity
        useCORS: true,
        logging: false,
        backgroundColor: '#FFFFFF'
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`${credentialId}-certificate.pdf`)
      toast.success('Enterprise PDF certificate downloaded!')
    } catch (err) {
      console.error('PDF Generation Error:', err)
      toast.error('Failed to generate PDF. Trying fallback download...')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn max-w-[860px] mx-auto text-slate-900">
      
      {/* Top Header Controls Bar */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 bg-[#1F1235]/90 border border-purple-500/30 rounded-2xl p-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              Official Enterprise Certificate
            </h3>
            <p className="text-xs text-purple-200/70">SkillSphere Learning Nexus • Verified Credential</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
            <CheckCircle2 size={15} /> VERIFIED
          </div>
        </div>
      </div>

      {/* Main Professional A4 Portrait Diploma Container */}
      <div
        id="certificate-print-area"
        ref={certRef}
        className="certificate-paper relative overflow-hidden rounded-2xl shadow-2xl bg-white text-slate-900 mx-auto select-none"
        style={{
          width: '100%',
          maxWidth: '794px', // Standard A4 ratio
          minHeight: '1060px',
          backgroundColor: '#FFFFFF',
          color: '#0F172A',
          boxSizing: 'border-box'
        }}
      >
        {/* Outer Metallic Gold Border Frame */}
        <div className="h-full border-[6px] border-[#D4AF37] p-3 relative flex flex-col justify-between rounded-xl">
          {/* Inner Decorative Golden Line */}
          <div className="h-full border border-[#D4AF37]/60 p-8 sm:p-10 relative flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FAFBFD] via-[#FFFFFF] to-[#F8FAFC] rounded-lg">
            
            {/* Top Ribbon Badge */}
            <div className="absolute top-0 right-10 w-12 h-20 bg-gradient-to-b from-[#7C3AED] to-[#EC4899] shadow-lg flex flex-col items-center justify-end pb-3 text-white rounded-b-lg">
              <Award size={22} className="text-amber-300 animate-pulse" />
              <span className="text-[8px] font-black uppercase tracking-tighter mt-0.5">EXCELLENCE</span>
            </div>

            {/* Top Ornate Gold Corner Accents */}
            <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-[#D4AF37] rounded-tl pointer-events-none" />
            <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-[#D4AF37] rounded-tr pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-[#D4AF37] rounded-bl pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-[#D4AF37] rounded-br pointer-events-none" />

            {/* Top & Bottom Decorative Golden Borders */}
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-1 opacity-70" />

            {/* Background Watermark Seal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.035] pointer-events-none flex flex-col items-center justify-center">
              <Award size={480} className="text-[#7C3AED]" />
            </div>

            {/* Academic Board Seal Stamp Watermark Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-4 border-dashed border-[#D4AF37]/25 flex items-center justify-center pointer-events-none select-none rotate-12">
              <div className="text-center opacity-20">
                <GraduationCap size={75} className="mx-auto mb-1 text-[#D4AF37]" />
                <span className="text-[12px] font-black tracking-[4px] uppercase text-[#D4AF37] block">SkillSphere Nexus</span>
                <span className="text-[9px] font-bold tracking-[2px] uppercase text-slate-700 block">OFFICIAL CERTIFIED BOARD</span>
              </div>
            </div>

            {/* Certificate Header */}
            <div className="relative z-10 text-center space-y-4 pt-2">
              
              {/* SkillSphere Brand Logo & Header */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7C3AED] via-[#A855F7] to-[#EC4899] flex items-center justify-center text-white shadow-lg">
                  <GraduationCap size={32} />
                </div>
                <div className="text-left">
                  <span className="text-2xl sm:text-3xl font-black tracking-wider uppercase bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899] bg-clip-text text-transparent block leading-tight">
                    SkillSphere
                  </span>
                  <span className="text-[11px] font-extrabold tracking-[4px] uppercase text-[#B45309] block -mt-1">
                    Learning Nexus
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="pt-3 space-y-1.5">
                <h1 className="text-3xl sm:text-4xl font-black tracking-[4px] uppercase text-slate-900 font-serif">
                  CERTIFICATE OF COMPLETION
                </h1>
                <p className="text-[11px] uppercase tracking-[3px] text-slate-500 font-bold">
                  This Certificate is Proudly Presented To
                </p>
              </div>

              {/* Recipient Full Name */}
              <div className="py-2 relative z-10">
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#7C3AED] py-1 font-sans">
                  {studentName}
                </h2>
                {/* Gold Accent Divider */}
                <div className="w-3/4 max-w-md h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
              </div>

              {/* Course Title Section */}
              <div className="space-y-1">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                  Has Successfully Completed
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-[#B45309] tracking-tight">
                  "{courseTitle}"
                </h3>
              </div>
            </div>

            {/* 3x3 Metadata Cards Grid */}
            <div className="relative z-10 my-6 pt-4 border-t border-[#D4AF37]/40 grid grid-cols-3 gap-3 text-left text-xs">
              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#CBD5E1] shadow-xs">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block">Certificate ID</span>
                <span className="font-mono font-black text-xs text-slate-900 block mt-0.5 truncate">{credentialId}</span>
              </div>

              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#CBD5E1] shadow-xs">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block">Completion Date</span>
                <span className="font-black text-xs text-slate-900 block mt-0.5">{completionDate}</span>
              </div>

              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#CBD5E1] shadow-xs">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block">Instructor</span>
                <span className="font-black text-xs text-slate-900 block mt-0.5 truncate">{instructorName}</span>
              </div>

              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#CBD5E1] shadow-xs">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block">Course Duration</span>
                <span className="font-black text-xs text-slate-900 block mt-0.5">{duration}</span>
              </div>

              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#CBD5E1] shadow-xs">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block">Skill Level</span>
                <span className="font-black text-xs text-slate-900 block mt-0.5">{level}</span>
              </div>

              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#CBD5E1] shadow-xs">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block">Learning Hours</span>
                <span className="font-black text-xs text-slate-900 block mt-0.5">{learningHours}</span>
              </div>

              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#CBD5E1] shadow-xs">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block">Grade Score</span>
                <span className="font-black text-xs text-emerald-600 block mt-0.5">{grade}</span>
              </div>

              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#CBD5E1] shadow-xs">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block">Completion %</span>
                <span className="font-black text-xs text-purple-600 block mt-0.5">{completionPercentage}</span>
              </div>

              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#CBD5E1] shadow-xs">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block">Issue Date</span>
                <span className="font-black text-xs text-slate-900 block mt-0.5">{issueDate}</span>
              </div>
            </div>

            {/* Bottom Decorative Gold Line */}
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-4 opacity-70" />

            {/* Bottom Signatures & Dynamic QR Code Section */}
            <div className="relative z-10 pt-2 grid grid-cols-3 gap-4 items-end text-center">
              
              {/* Instructor Signature */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
                <div className="w-40 border-b-2 border-dashed border-[#D4AF37] pb-1 text-center sm:text-left">
                  <span className="font-serif italic text-xl font-black text-[#7C3AED]">
                    {instructorName}
                  </span>
                </div>
                <p className="text-xs font-black text-slate-900">{instructorName}</p>
                <p className="text-[9px] font-bold text-slate-500">Lead Instructor & Subject Expert</p>
              </div>

              {/* Dynamic QR Code */}
              <div className="flex flex-col items-center justify-center">
                <div className="p-2 bg-white rounded-xl shadow-md border-2 border-[#D4AF37] inline-block">
                  <QRCodeSVG
                    value={fullVerifyUrl}
                    size={72}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <p className="text-[9px] font-mono mt-1 flex items-center gap-1 font-bold text-[#B45309]">
                  <QrCode size={11} /> Scan to Verify
                </p>
              </div>

              {/* Registrar Signature & Stamp */}
              <div className="flex flex-col items-center sm:items-end text-center sm:text-right space-y-1">
                <div className="w-40 border-b-2 border-dashed border-[#D4AF37] pb-1 text-center sm:text-right">
                  <span className="font-serif italic text-xl font-black text-[#7C3AED]">
                    Dr. Victoria Vance
                  </span>
                </div>
                <p className="text-xs font-black text-slate-900">SkillSphere Learning Nexus</p>
                <p className="text-[9px] font-bold text-slate-500">Academic Board & Registrar</p>
              </div>
            </div>

            {/* Footer Attribution */}
            <div className="mt-4 pt-3 border-t border-slate-200 text-center">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Generated by SkillSphere Learning Nexus • Verification URL: {fullVerifyUrl}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 bg-[#1F1235]/90 border border-purple-500/30 p-4 rounded-2xl shadow-xl backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
          >
            <Download size={16} /> {downloading ? 'Generating PDF...' : 'Download Enterprise PDF'}
          </button>

          <a
            href={verifyPath}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 cursor-pointer"
          >
            <ExternalLink size={15} /> Public Verification
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleCopyLink}
            className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
            {copied ? 'Copied!' : 'Copy Verification Link'}
          </button>

          <button
            onClick={() => {
              const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullVerifyUrl)}`;
              window.open(linkedinUrl, '_blank');
            }}
            className="px-4 py-3 bg-[#0077B5] hover:opacity-90 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Linkedin size={15} /> Share on LinkedIn
          </button>

          <a
            href={`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseTitle)}&organizationName=SkillSphere+Learning+Nexus&issueYear=2026&issueMonth=8&certUrl=${encodeURIComponent(fullVerifyUrl)}&certId=${encodeURIComponent(credentialId)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-gradient-to-r from-blue-700 to-indigo-600 hover:opacity-90 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Linkedin size={15} /> Add to LinkedIn Profile
          </a>
        </div>

      </div>
    </div>
  )
}
