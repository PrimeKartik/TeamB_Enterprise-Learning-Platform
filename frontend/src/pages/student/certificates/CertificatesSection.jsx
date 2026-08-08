import { useEffect, useState } from "react";
import { Award, ShieldCheck, Search, Sparkles, CheckCircle, ClipboardCheck, Filter, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";

import { useAssessmentCertificates } from "../../../hooks/useAssessmentCertificates";
import { certificateApi } from "../../../api/certificateApi";
import CertificateCard from "./components/CertificateCard";
import CertificateModal from "./components/CertificateModal";
import CertificateVerifyModal from "./components/CertificateVerifyModal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "react-toastify";

export default function CertificatesSection() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);

  const { assessmentCertificates } = useAssessmentCertificates();
  const [apiCertificates, setApiCertificates] = useState([]);
  const [localCertificates, setLocalCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApiCerts() {
      try {
        setLoading(true);
        const res = await certificateApi.getMyCertificates();
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setApiCertificates(res.data);
        } else {
          try {
            const fallbackRes = await certificateApi.getStudentCertificates(1);
            if (fallbackRes.data && Array.isArray(fallbackRes.data)) {
              setApiCertificates(fallbackRes.data);
            }
          } catch (e) {}
        }
      } catch (err) {
        console.log("Error fetching API certificates:", err);
      } finally {
        setLoading(false);
      }
    }

    try {
      const savedStr = localStorage.getItem("skillsphere_generated_certificates");
      if (savedStr) {
        setLocalCertificates(JSON.parse(savedStr));
      }
    } catch (e) {}

    fetchApiCerts();
  }, []);

  // Merge backend API certificates, local certificates, and assessment certificates
  const combinedList = [...apiCertificates, ...localCertificates];
  const allCertificates = combinedList.concat(
    assessmentCertificates.filter(
      (ac) => !combinedList.some((c) => 
        (c.certificateId || c.credentialId) === ac.credentialId ||
        (c.courseTitle || c.courseName) === (ac.courseTitle || ac.courseName)
      )
    )
  ).filter((c, index, self) =>
    index === self.findIndex((t) => (t.certificateId || t.credentialId || t.id) === (c.certificateId || c.credentialId || c.id))
  );

  function handlePreview(certificate) {
    setSelectedCertificate(certificate);
    setModalOpen(true);
  }

  async function handleDownload(certificate) {
    try {
      const rawId = certificate.certificateId || certificate.credentialId || `SSLN-2026-001254`;
      const certId = rawId.startsWith('SSLN-')
        ? rawId
        : `SSLN-2026-${rawId.replace(/^SKILL-/, '').replace(/^[A-Za-z0-9]+-/, '')}`;

      try {
        const res = await certificateApi.download(certId);
        if (res.data && res.data.size > 0) {
          const blob = new Blob([res.data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${certId}-certificate.pdf`);
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
          toast.success("Certificate PDF downloaded!");
          return;
        }
      } catch (ignored) {}

      // Client-side fallback PDF generation using html2canvas & jsPDF
      handlePreview(certificate);
    } catch (err) {
      console.error(err);
      toast.error("Download failed.");
    }
  }

  const filteredCertificates = allCertificates
    .filter((c) =>
      (c.courseTitle || c.courseName || c.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.certificateId || c.credentialId || "").toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") return (b.id || 0) - (a.id || 0);
      if (sortBy === "oldest") return (a.id || 0) - (b.id || 0);
      if (sortBy === "title") return (a.courseTitle || a.courseName || "").localeCompare(b.courseTitle || b.courseName || "");
      return 0;
    });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner Header */}
      <div className="bg-[#1F1235] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold w-fit mb-3">
            <Sparkles size={14} /> Official Credentials Nexus
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            My Enterprise Certificates
          </h1>
          <p className="text-sm text-purple-200/80 mt-2 leading-relaxed">
            All your verified certificates of completion are stored here securely. View, download PDF, or verify credentials anytime.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10 w-full md:w-auto">
          <button
            onClick={() => setVerifyModalOpen(true)}
            className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-purple-600/30 cursor-pointer"
          >
            <ShieldCheck size={18} /> Verify Certificate ID
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 rounded-2xl bg-[#19102B] border border-purple-500/20 animate-pulse" />
          ))}
        </div>
      ) : allCertificates.length === 0 ? (
        <div className="rounded-3xl border border-purple-500/20 bg-[#1F1235] p-12 text-center space-y-4">
          <Award size={48} className="mx-auto text-purple-400 opacity-60" />
          <h2 className="text-xl font-bold text-white">No Certificates Earned Yet</h2>
          <p className="text-sm text-purple-200/70 max-w-md mx-auto">
            Complete 100% of any course modules, lessons, and assessments to generate your official verified certificate.
          </p>
          <Link
            to="/dashboard/courses"
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-6 py-3 text-xs font-bold text-white transition shadow-lg shadow-purple-600/30"
          >
            <ClipboardCheck size={16} /> Browse Enrolled Courses
          </Link>
        </div>
      ) : (
        <>
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#19102B] border border-purple-500/20 p-4 rounded-2xl">
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-300/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search certificate or ID..."
                className="w-full bg-black/40 border border-purple-500/30 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-purple-500 transition"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-2 text-xs">
                <ArrowUpDown size={14} className="text-purple-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-black/40 border border-purple-500/30 text-white rounded-xl px-3 py-2 text-xs font-semibold outline-none"
                >
                  <option value="newest">Sort by Newest</option>
                  <option value="oldest">Sort by Oldest</option>
                  <option value="title">Sort by Course Title</option>
                </select>
              </div>

              <span className="flex items-center gap-1.5 font-bold text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30">
                <CheckCircle size={15} />
                {filteredCertificates.length} Verified {filteredCertificates.length === 1 ? "Certificate" : "Certificates"}
              </span>
            </div>
          </div>

          {/* Certificates Cards Grid */}
          {filteredCertificates.length === 0 ? (
            <p className="py-12 text-center text-sm text-purple-300/70">
              No certificates match "{searchQuery}".
            </p>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCertificates.map((certificate) => (
                <CertificateCard
                  key={certificate.id || certificate.certificateId}
                  certificate={certificate}
                  onPreview={handlePreview}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal View for A4 Certificate Preview */}
      <CertificateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        certificate={selectedCertificate}
      />

      {/* Quick Verification Lookup Modal */}
      <CertificateVerifyModal
        isOpen={verifyModalOpen}
        onClose={() => setVerifyModalOpen(false)}
        certificates={allCertificates}
      />
    </div>
  );
}
