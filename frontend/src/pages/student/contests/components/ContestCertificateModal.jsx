import React, { useRef } from 'react';
import { X, Award, Printer, GraduationCap, ShieldCheck, Star } from 'lucide-react';

export default function ContestCertificateModal({ certificate, onClose }) {
  const certRef = useRef(null);

  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-[#1A102B] border border-purple-500/30 rounded-2xl max-w-4xl w-full p-6 space-y-6 shadow-2xl relative my-6">
        
        {/* Top Controls Bar - Hidden during print */}
        <div className="no-print flex items-center justify-between gap-4 border-b border-purple-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <Award size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Official Certificate of Achievement</h3>
              <p className="text-xs text-purple-300/80">SkillSphere Competitive Programming Credentials · Verified Record</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl text-xs font-bold hover:opacity-95 transition flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Printer size={15} /> Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-200 hover:text-white transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Certificate Box - Pristine Executive White Paper (Forced Light Mode styles) */}
        <div
          id="certificate-print-area"
          ref={certRef}
          style={{ backgroundColor: '#FFFFFF', color: '#0F172A' }}
          className="certificate-container relative overflow-hidden rounded-xl p-8 sm:p-12 shadow-2xl border-[6px] border-[#D4AF37] text-slate-900"
        >
          {/* Subtle Guilloche Watermark / Frame */}
          <div style={{ backgroundColor: '#FDFBF7' }} className="border-2 border-[#D4AF37] rounded-lg p-6 sm:p-10 relative flex flex-col justify-between text-center space-y-6 min-h-[520px]">
            
            {/* Corner Gold Foil Filigree Ornaments */}
            <div style={{ borderColor: '#D4AF37' }} className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 pointer-events-none" />
            <div style={{ borderColor: '#D4AF37' }} className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 pointer-events-none" />
            <div style={{ borderColor: '#D4AF37' }} className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 pointer-events-none" />
            <div style={{ borderColor: '#D4AF37' }} className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 pointer-events-none" />

            {/* Header: Organization Emblem & Name */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7C3AED] via-[#A855F7] to-[#EC4899] flex items-center justify-center text-white shadow-lg">
                <GraduationCap size={32} />
              </div>
              <div>
                <span className="text-2xl font-black uppercase tracking-widest bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899] bg-clip-text text-transparent block">
                  SKILLSPHERE
                </span>
                <span style={{ color: '#B8860B' }} className="text-[11px] font-bold uppercase tracking-[4px] block -mt-0.5">
                  Competitive Coding Nexus
                </span>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="space-y-1">
              <h1 style={{ color: '#0F172A' }} className="text-2xl sm:text-3xl font-serif font-black uppercase tracking-[0.18em]">
                Certificate of Achievement
              </h1>
              <p style={{ color: '#64748B' }} className="text-xs uppercase tracking-widest font-semibold">
                This Official Credential is Awarded To
              </p>
            </div>

            {/* Student Name */}
            <div className="py-1">
              <h2 className="text-3xl sm:text-4xl font-serif font-black bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899] bg-clip-text text-transparent py-1">
                {certificate.studentName || 'Kavipriya S'}
              </h2>
              <div style={{ background: 'linear-gradient(to right, transparent, #D4AF37, transparent)' }} className="w-64 h-0.5 mx-auto mt-2" />
            </div>

            {/* Contest Statement */}
            <div className="space-y-1 max-w-xl mx-auto">
              <p style={{ color: '#475569' }} className="text-xs font-medium leading-relaxed">
                For demonstrating exceptional algorithmic problem-solving skills and securing <strong>Rank #{certificate.rankPosition || 1}</strong> in
              </p>
              <h3 style={{ color: '#B8860B' }} className="text-lg font-bold tracking-tight">
                "{certificate.contestTitle || 'Weekly Algorithmic Challenge #104'}"
              </h3>
            </div>

            {/* Performance Metrics Summary Bar */}
            <div style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }} className="grid grid-cols-3 gap-4 p-3.5 rounded-xl border text-xs font-semibold max-w-md mx-auto shadow-sm">
              <div className="text-center">
                <span style={{ color: '#64748B' }} className="text-[9px] uppercase font-bold block">Final Rank</span>
                <span style={{ color: '#7C3AED' }} className="text-sm font-black block">Rank #{certificate.rankPosition || 1} 🥇</span>
              </div>
              <div className="text-center border-x border-slate-200">
                <span style={{ color: '#64748B' }} className="text-[9px] uppercase font-bold block">Total Score</span>
                <span style={{ color: '#10B981' }} className="text-sm font-black block">{certificate.score || 380} Marks</span>
              </div>
              <div className="text-center">
                <span style={{ color: '#64748B' }} className="text-[9px] uppercase font-bold block">Issue Date</span>
                <span style={{ color: '#0F172A' }} className="text-xs font-bold block mt-0.5">{certificate.issueDate || 'August 03, 2026'}</span>
              </div>
            </div>

            {/* Footer Signatures, Official Badge & QR Code */}
            <div style={{ borderColor: '#E2E8F0' }} className="pt-4 border-t grid grid-cols-3 gap-4 items-end text-xs">
              
              {/* Left Signature */}
              <div className="text-left space-y-1">
                <div style={{ borderColor: '#B8860B' }} className="w-36 border-b border-dashed pb-1">
                  <span style={{ color: '#6B21A8' }} className="font-serif italic font-extrabold text-sm block">Dr. Alex Morgan</span>
                </div>
                <p style={{ color: '#0F172A' }} className="font-bold text-[11px]">Dr. Alex Morgan</p>
                <p style={{ color: '#64748B' }} className="text-[9px]">Chief Tournament Judge</p>
              </div>

              {/* Center Verification QR Code & Seal */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <img
                    src={certificate.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${certificate.certificateId}`}
                    alt="QR Code Verification"
                    style={{ borderColor: '#D4AF37', backgroundColor: '#FFFFFF' }}
                    className="w-16 h-16 object-contain border-2 p-1 rounded-lg shadow-sm"
                  />
                  <div style={{ backgroundColor: '#D4AF37' }} className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] shadow">
                    <Star size={10} className="fill-white" />
                  </div>
                </div>
                <span style={{ color: '#B8860B' }} className="text-[9px] font-mono font-bold mt-1.5">{certificate.certificateId || 'SSLN-CONTEST-2026-X89713'}</span>
              </div>

              {/* Right Signature */}
              <div className="text-right space-y-1">
                <div style={{ borderColor: '#B8860B' }} className="w-36 border-b border-dashed pb-1 ml-auto">
                  <span style={{ color: '#6B21A8' }} className="font-serif italic font-extrabold text-sm block">Dr. Victoria Vance</span>
                </div>
                <p style={{ color: '#0F172A' }} className="font-bold text-[11px]">Dr. Victoria Vance</p>
                <p style={{ color: '#64748B' }} className="text-[9px]">SkillSphere Academic Registrar</p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
