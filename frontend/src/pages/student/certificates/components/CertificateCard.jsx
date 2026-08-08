import { Award, Download, Eye, ShieldCheck, Share2, Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useAuthContext } from "../../../../context/AuthContext";
import { toast } from "react-toastify";

export default function CertificateCard({
  certificate,
  onPreview,
  onDownload,
}) {
  const { user } = useAuthContext();
  const [copied, setCopied] = useState(false);
  
  const rawId = certificate.certificateId || certificate.credentialId || `SSLN-2026-001254`;
  const credentialId = rawId.startsWith('SSLN-')
    ? rawId
    : `SSLN-2026-${rawId.replace(/^SKILL-/, '').replace(/^[A-Za-z0-9]+-/, '')}`;

  const candidateName = certificate.studentName || certificate.student?.name || user?.name || 'Kavipriya S';
  const verifyUrl = `${window.location.origin}/verify/${credentialId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verifyUrl);
    setCopied(true);
    toast.success("Verification link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#19102B] border border-purple-500/20 rounded-2xl shadow-lg hover:shadow-2xl hover:border-purple-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      
      {/* Header Banner */}
      <div className="relative h-44 p-5 flex flex-col justify-between bg-gradient-to-r from-[#7C3AED] via-purple-900 to-[#EC4899] text-white overflow-hidden">
        <div className="absolute right-[-20px] bottom-[-20px] opacity-15 group-hover:scale-110 transition duration-500">
          <Award size={140} />
        </div>

        <div className="flex justify-between items-start relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-md">
            <Award size={22} className="text-amber-300" />
          </div>
          <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-amber-400/40 text-[10px] font-bold tracking-wide text-amber-300 font-mono">
            {credentialId}
          </span>
        </div>

        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-purple-200">
            Certificate of Completion
          </p>
          <h3 className="text-base font-extrabold line-clamp-2 mt-0.5 leading-snug">
            {certificate.courseTitle || certificate.courseName}
          </h3>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-[#19102B]">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-purple-200/80">
            <span>Student: <strong className="text-white font-bold">{candidateName}</strong></span>
            <span className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <ShieldCheck size={13} /> Verified
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-purple-300/60 pt-2 border-t border-purple-500/10">
            <span>Issued: <strong className="text-purple-100 font-semibold">{certificate.issueDate || certificate.completionDate}</strong></span>
            <span>Grade: <strong className="text-amber-300 font-bold">{certificate.grade || 'A+'}</strong></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 mt-5">
          <div className="flex gap-2">
            <button
              onClick={() => onPreview(certificate)}
              className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-2.5 rounded-xl font-bold text-xs flex justify-center items-center gap-1.5 transition shadow-md shadow-purple-600/30 cursor-pointer"
            >
              <Eye size={15} /> Preview Certificate
            </button>

            <button
              onClick={() => onDownload(certificate)}
              className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/30"
              title="Download PDF Certificate"
            >
              <Download size={15} />
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopyLink}
              className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-purple-200 hover:text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              {copied ? 'Copied Link!' : 'Copy Link'}
            </button>

            <button
              onClick={() => {
                const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(verifyUrl)}`;
                window.open(url, '_blank');
              }}
              className="py-2 px-3 bg-[#0077B5] hover:opacity-90 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              title="Share on LinkedIn"
            >
              <Share2 size={14} /> LinkedIn
            </button>

            <a
              href={`/verify/${credentialId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 bg-white/5 hover:bg-white/10 text-purple-200 hover:text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
              title="Public Verify Page"
            >
              <ExternalLink size={14} /> Verify
            </a>
          </div>

        </div>
      </div>

    </div>
  );
}
