import { Eye, Download, Trash2, Award, ShieldCheck } from "lucide-react";

export default function CertificateTable({
  certificates,
  onView,
  onDownload,
  onDelete,
}) {
  return (
    <div className="bg-[#19102B] border border-purple-500/20 rounded-2xl shadow-xl overflow-x-auto">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-[#140C24] border-b border-purple-500/20 text-xs text-purple-300/80 font-bold uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4">Certificate ID</th>
            <th className="px-6 py-4">Student</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Course</th>
            <th className="px-6 py-4 text-center">Completion</th>
            <th className="px-6 py-4 text-center">Grade</th>
            <th className="px-6 py-4 text-center">Issue Date</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-purple-500/10 text-xs text-purple-100">
          {certificates.length === 0 ? (
            <tr>
              <td colSpan={9} className="py-10 text-center text-purple-300/60">
                No Certificates Found
              </td>
            </tr>
          ) : (
            certificates.map((certificate) => {
              const rawId = certificate.certificateId || certificate.credentialId || `SSLN-2026-001254`;
              const certId = rawId.startsWith('SSLN-')
                ? rawId
                : `SSLN-2026-${rawId.replace(/^SKILL-/, '').replace(/^[A-Za-z0-9]+-/, '')}`;

              return (
                <tr key={certificate.id} className="hover:bg-purple-500/5 transition">
                  <td className="px-6 py-4 font-mono font-bold text-amber-300">
                    {certId}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          certificate.studentImage ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(certificate.studentName || "Student")}&background=7c3aed&color=fff`
                        }
                        alt=""
                        className="w-8 h-8 rounded-full object-cover border border-purple-500/30"
                      />
                      <span className="font-bold text-white text-xs">{certificate.studentName || "Student"}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-purple-200/70">
                    {certificate.studentEmail || "student@skillsphere.edu"}
                  </td>

                  <td className="px-6 py-4 font-semibold text-pink-300 max-w-[200px] truncate">
                    {certificate.courseName || certificate.courseTitle}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="bg-purple-500/20 border border-purple-500/40 text-purple-300 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
                      {certificate.completionPercentage ? `${certificate.completionPercentage}%` : '100%'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full font-bold text-[11px]">
                      {certificate.grade || 'A+'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center text-purple-200/70 font-medium">
                    {certificate.issueDate || certificate.completionDate}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1">
                      <ShieldCheck size={12} /> {certificate.status || 'VERIFIED'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onView(certificate)}
                        className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-600 transition cursor-pointer"
                        title="Preview A4 Certificate"
                      >
                        <Eye size={15} />
                      </button>

                      <button
                        onClick={() => onDownload(certificate)}
                        className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600 hover:text-white transition cursor-pointer"
                        title="Download PDF"
                      >
                        <Download size={15} />
                      </button>

                      <button
                        onClick={() => onDelete(certificate)}
                        className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white transition cursor-pointer"
                        title="Revoke Certificate"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}