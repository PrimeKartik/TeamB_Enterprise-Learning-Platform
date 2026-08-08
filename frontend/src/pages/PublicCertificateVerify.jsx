import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  AlertCircle,
  Calendar,
  User,
  BookOpen,
  Clock,
  Download,
  Eye,
  ArrowLeft,
  Sparkles,
  GraduationCap
} from 'lucide-react'
import { certificateApi } from '../api/certificateApi'
import CertificateModal from './student/certificates/components/CertificateModal'

export default function PublicCertificateVerify() {
  const { certificateId } = useParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    async function verify() {
      if (!certificateId) return
      try {
        setLoading(true)
        setError(null)
        const res = await certificateApi.verify(certificateId)
        if (res.data && res.data.valid) {
          setData(res.data)
        } else {
          setError(res.data?.message || 'Certificate ID invalid or not found.')
        }
      } catch (err) {
        console.error('Verification Error:', err)
        setError('Unable to verify certificate at this time.')
      } finally {
        setLoading(false)
      }
    }
    verify()
  }, [certificateId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F081D] text-white flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-purple-200 animate-pulse">
          Authenticating Credential Signature...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F081D] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Top Header Brand */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 flex items-center justify-center text-white shadow-lg">
              <GraduationCap size={22} />
            </div>
            <div>
              <span className="text-lg font-black tracking-wider uppercase bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent block leading-tight">
                SkillSphere
              </span>
              <span className="text-[9px] font-extrabold tracking-[3px] uppercase text-amber-400 block">
                Learning Nexus
              </span>
            </div>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-white transition font-medium"
          >
            <ArrowLeft size={14} /> Back to SkillSphere
          </Link>
        </div>

        {error ? (
          /* Invalid Certificate View */
          <div className="bg-[#1F1235] border border-red-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
              <AlertCircle size={40} />
            </div>
            <div>
              <span className="px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                INVALID CREDENTIAL
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-4">
                Certificate Not Found
              </h1>
              <p className="text-sm text-purple-200/70 mt-2 max-w-md mx-auto">
                No matching verified record was found for Certificate ID <span className="font-mono text-amber-300 font-bold">{certificateId}</span>.
              </p>
            </div>
          </div>
        ) : (
          /* Verified Certificate Details Card */
          <div className="bg-[#1F1235] border border-purple-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-8">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Verification Status Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-500/20 pb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    <CheckCircle2 size={14} /> Official Verified Status: VERIFIED
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                    Authentic Academic Certificate
                  </h1>
                </div>
              </div>

              <div className="bg-black/30 border border-white/10 px-4 py-2 rounded-xl text-right">
                <span className="text-[10px] text-purple-300 uppercase tracking-wider font-semibold block">Certificate ID</span>
                <span className="font-mono font-bold text-amber-300 text-sm">{data?.certificateId}</span>
              </div>
            </div>

            {/* Recipient & Course Summary */}
            <div className="space-y-4 relative z-10">
              <div className="bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <span className="text-xs text-purple-300/70 font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <User size={14} className="text-purple-400" /> Student Name
                    </span>
                    <h2 className="text-2xl font-black text-white">{data?.studentName}</h2>
                  </div>

                  <div>
                    <span className="text-xs text-purple-300/70 font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <BookOpen size={14} className="text-pink-400" /> Course Name
                    </span>
                    <h2 className="text-xl font-bold text-pink-300">{data?.courseTitle || data?.courseName}</h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-purple-300/60 block font-medium">Completion Date</span>
                    <span className="font-bold text-white mt-0.5 block">{data?.completionDate || data?.issueDate}</span>
                  </div>

                  <div>
                    <span className="text-purple-300/60 block font-medium">Instructor</span>
                    <span className="font-bold text-white mt-0.5 block truncate">{data?.instructorName || data?.instructor}</span>
                  </div>

                  <div>
                    <span className="text-purple-300/60 block font-medium">Course Duration</span>
                    <span className="font-bold text-white mt-0.5 block">{data?.duration || '8 Weeks'}</span>
                  </div>

                  <div>
                    <span className="text-purple-300/60 block font-medium">Grade & Status</span>
                    <span className="font-bold text-emerald-400 mt-0.5 block">{data?.grade || 'A+'} • {data?.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 relative z-10">
              <button
                onClick={() => setModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-lg shadow-purple-600/30 cursor-pointer"
              >
                <Eye size={18} /> Preview Official A4 Diploma
              </button>

              <button
                onClick={() => setModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-lg shadow-emerald-600/30 cursor-pointer"
              >
                <Download size={18} /> Download Certificate PDF
              </button>
            </div>

          </div>
        )}
      </div>

      {/* React Modal View */}
      {data && (
        <CertificateModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          certificate={data}
        />
      )}
    </div>
  )
}
