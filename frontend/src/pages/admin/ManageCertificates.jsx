import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Award, AlertCircle, FileSpreadsheet, FileText, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { toast } from "react-toastify";
import jsPDF from "jspdf";

import CertificateTable from "./components/CertificateTable";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import IssueCertificateModal from "./components/IssueCertificateModal";
import CertificateViewModal from "./components/CertificateViewModal";
import { adminCertificateApi } from "../../api/adminCertificateApi";

const DEFAULT_SYSTEM_CERTIFICATES = [
  {
    id: 101,
    certificateId: "SSLN-2026-001254",
    studentName: "Ruthish",
    studentEmail: "ruthish@gmail.com",
    courseName: "Full Stack Development",
    completionProgress: 100,
    grade: "B+",
    issueDate: "July 29, 2026",
    status: "VERIFIED",
    instructor: "Dr. Alex Morgan",
    duration: "12 Weeks",
    learningHours: "60 Hours",
    level: "Advanced"
  },
  {
    id: 102,
    certificateId: "SSLN-2026-001255",
    studentName: "Shan K",
    studentEmail: "shan@gmail.com",
    courseName: "React.js & Redux Masterclass",
    completionProgress: 100,
    grade: "A+",
    issueDate: "August 02, 2026",
    status: "VERIFIED",
    instructor: "Sarah Jenkins",
    duration: "8 Weeks",
    learningHours: "40 Hours",
    level: "Intermediate"
  },
  {
    id: 103,
    certificateId: "SSLN-2026-001256",
    studentName: "Gayatri Senthamarai",
    studentEmail: "gayatrisenthamarai@gmail.com",
    courseName: "Spring Boot & Microservices",
    completionProgress: 100,
    grade: "A+",
    issueDate: "August 04, 2026",
    status: "VERIFIED",
    instructor: "Michael Chang",
    duration: "10 Weeks",
    learningHours: "50 Hours",
    level: "Advanced"
  },
  {
    id: 104,
    certificateId: "SSLN-2026-001257",
    studentName: "Kavipriya S",
    studentEmail: "kavipriya@gmail.com",
    courseName: "Data Structures & Algorithms in Java",
    completionProgress: 100,
    grade: "A",
    issueDate: "August 05, 2026",
    status: "VERIFIED",
    instructor: "Prof. Robert Vance",
    duration: "12 Weeks",
    learningHours: "65 Hours",
    level: "Advanced"
  },
  {
    id: 105,
    certificateId: "SSLN-2026-001258",
    studentName: "Ezhil Mathi",
    studentEmail: "ezhilmathi@gmail.com",
    courseName: "Node.js & Express REST Microservices",
    completionProgress: 100,
    grade: "A",
    issueDate: "August 05, 2026",
    status: "VERIFIED",
    instructor: "Elena Rostova",
    duration: "6 Weeks",
    learningHours: "35 Hours",
    level: "Intermediate"
  }
];

export default function ManageCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [issueOpen, setIssueOpen] = useState(false);

  useEffect(() => {
    loadCertificates();
  }, []);

  async function loadCertificates() {
    try {
      setLoading(true);
      setError(null);
      const res = await adminCertificateApi.getAllCertificates();
      const apiData = res.data || [];
      
      const mergedMap = new Map();
      DEFAULT_SYSTEM_CERTIFICATES.forEach(c => mergedMap.set(c.certificateId, c));
      apiData.forEach(c => {
        const key = c.certificateId || c.credentialId || `SSLN-2026-${c.id}`;
        mergedMap.set(key, { ...c, certificateId: key });
      });

      setCertificates(Array.from(mergedMap.values()));
    } catch (err) {
      console.error(err);
      setCertificates(DEFAULT_SYSTEM_CERTIFICATES);
    } finally {
      setLoading(false);
    }
  }

  const filteredCertificates = useMemo(() => {
    return certificates.filter((c) => {
      const s = search.toLowerCase();
      const matchesSearch =
        (c.studentName || "").toLowerCase().includes(s) ||
        (c.studentEmail || "").toLowerCase().includes(s) ||
        (c.courseName || c.courseTitle || "").toLowerCase().includes(s) ||
        (c.certificateId || c.credentialId || "").toLowerCase().includes(s);

      const matchesStatus = statusFilter === "ALL" || (c.status || "VERIFIED").toUpperCase() === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [certificates, search, statusFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage) || 1;
  const paginatedCertificates = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCertificates.slice(start, start + itemsPerPage);
  }, [filteredCertificates, currentPage]);

  function handleView(certificate) {
    setSelectedCertificate(certificate);
    setViewOpen(true);
  }

  function handleDownload(certificate) {
    setSelectedCertificate(certificate);
    setViewOpen(true);
  }

  function handleDelete(certificate) {
    setSelectedCertificate(certificate);
    setDeleteOpen(true);
  }

  async function confirmDelete() {
    try {
      await adminCertificateApi.deleteCertificate(selectedCertificate.id);
      toast.success("Certificate revoked successfully.");
      setCertificates((prev) => prev.filter((c) => c.id !== selectedCertificate.id));
    } catch (err) {
      console.error(err);
      toast.error("Could not revoke this certificate.");
    } finally {
      setDeleteOpen(false);
    }
  }

  async function handleIssue(data) {
    try {
      await adminCertificateApi.issueCertificate(data);
      toast.success("Certificate issued successfully.");
      setIssueOpen(false);
      loadCertificates();
    } catch (err) {
      toast.error("Error issuing certificate.");
    }
  }

  // Export CSV
  const exportCSV = () => {
    if (filteredCertificates.length === 0) {
      toast.info("No data to export.");
      return;
    }
    const headers = ["Certificate ID", "Student Name", "Student Email", "Course Name", "Completion %", "Grade", "Issue Date", "Status"];
    const rows = filteredCertificates.map(c => [
      `"${c.certificateId || c.credentialId || ''}"`,
      `"${c.studentName || ''}"`,
      `"${c.studentEmail || ''}"`,
      `"${c.courseName || c.courseTitle || ''}"`,
      `"${c.completionPercentage || 100}%"`,
      `"${c.grade || 'A+'}"`,
      `"${c.issueDate || ''}"`,
      `"${c.status || 'VERIFIED'}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SkillSphere_Certificates_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Certificates exported as CSV!");
  };

  // Export PDF Report
  const exportPDF = () => {
    if (filteredCertificates.length === 0) {
      toast.info("No data to export.");
      return;
    }
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("SkillSphere Learning Nexus - Certificates Master Report", 14, 18);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${new Date().toLocaleString()} | Total Records: ${filteredCertificates.length}`, 14, 25);

    let y = 35;
    doc.setFont("helvetica", "bold");
    doc.text("Certificate ID", 14, y);
    doc.text("Student Name", 55, y);
    doc.text("Course Title", 105, y);
    doc.text("Grade", 160, y);
    doc.text("Status", 180, y);
    doc.line(14, y + 2, 195, y + 2);
    y += 8;

    doc.setFont("helvetica", "normal");
    filteredCertificates.slice(0, 30).forEach((c) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      const idStr = (c.certificateId || c.credentialId || '').slice(0, 18);
      const nameStr = (c.studentName || '').slice(0, 20);
      const courseStr = (c.courseName || c.courseTitle || '').slice(0, 24);

      doc.text(idStr, 14, y);
      doc.text(nameStr, 55, y);
      doc.text(courseStr, 105, y);
      doc.text(c.grade || 'A+', 160, y);
      doc.text(c.status || 'VERIFIED', 180, y);
      y += 7;
    });

    doc.save(`SkillSphere_Certificates_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
    toast.success("Certificates master report exported as PDF!");
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-32 rounded-2xl bg-[#1F1235] border border-purple-500/20 animate-pulse" />
        <div className="h-64 rounded-2xl bg-[#1F1235] border border-purple-500/20 animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
        <AlertCircle className="mx-auto mb-3 text-red-400" size={28} />
        <p className="text-red-400">{error}</p>
        <button
          onClick={loadCertificates}
          className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#1F1235] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold w-fit mb-3">
            <Award size={14} /> Admin Certificate Governance
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Manage Student Certificates
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
            Issue, view, filter, and manage official SkillSphere accomplishment credentials.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={exportCSV}
            className="px-4 py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer"
          >
            <FileSpreadsheet size={16} /> Export CSV
          </button>

          <button
            onClick={exportPDF}
            className="px-4 py-2.5 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer"
          >
            <FileText size={16} /> Export PDF Report
          </button>

          <button
            onClick={() => setIssueOpen(true)}
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-purple-600/30 shrink-0 cursor-pointer"
          >
            <Plus size={16} /> Issue Certificate
          </button>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-[#19102B] border border-purple-500/20 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-300/60" />
          <input
            className="w-full bg-black/40 border border-purple-500/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-purple-500 transition"
            placeholder="Search by student name, email, course, or certificate ID..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
          <Filter size={14} className="text-purple-400" />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-black/40 border border-purple-500/30 text-white rounded-xl px-3 py-2.5 text-xs font-semibold outline-none w-full sm:w-auto"
          >
            <option value="ALL">All Statuses</option>
            <option value="VERIFIED">Verified</option>
            <option value="REVOKED">Revoked</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {filteredCertificates.length === 0 ? (
        <div className="rounded-2xl border border-purple-500/20 bg-[#1F1235] p-10 text-center text-purple-300/70">
          No certificates matching criteria. Click "Issue Certificate" to create one.
        </div>
      ) : (
        <div className="space-y-4">
          <CertificateTable
            certificates={paginatedCertificates}
            onView={handleView}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-[#19102B] border border-purple-500/20 px-5 py-3 rounded-2xl text-xs text-purple-200/80">
              <span>
                Showing Page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong> ({filteredCertificates.length} Total Certificates)
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="p-2 rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 text-white disabled:opacity-40 transition cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="p-2 rounded-xl bg-white/5 border border-purple-500/20 hover:bg-white/10 text-white disabled:opacity-40 transition cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <IssueCertificateModal
        open={issueOpen}
        onClose={() => setIssueOpen(false)}
        onIssue={handleIssue}
      />

      <CertificateViewModal
        open={viewOpen}
        certificate={selectedCertificate}
        onClose={() => setViewOpen(false)}
      />

      <DeleteConfirmationModal
        open={deleteOpen}
        title="Revoke Certificate"
        message="Are you sure you want to revoke this student certificate? This action will remove public verification validity."
        onCancel={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
