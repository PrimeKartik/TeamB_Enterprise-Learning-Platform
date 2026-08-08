import { useState } from 'react'
import { ShieldCheck, Search, X, CheckCircle2, Award, Calendar, User, ExternalLink, Copy, Check } from 'lucide-react'

export default function CertificateVerifyModal({ isOpen, onClose, certificates }) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [searched, setSearched] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleVerify = async (e) => {
    e?.preventDefault()
    setSearched(true)
    if (!query.trim()) {
      setResult(null)
      return
    }

    const cleanQuery = query.trim().toUpperCase()
    const found = certificates.find(
      (c) => c.credentialId?.toUpperCase() === cleanQuery || c.id?.toString() === cleanQuery || c.courseTitle.toUpperCase().includes(cleanQuery)
    )
    if (found) {
      setResult(found)
      return
    }

    try {
      const { certificateApi } = await import("../../../../api/certificateApi")
      const res = await certificateApi.verify(cleanQuery)
      if (res.data && res.data.valid) {
        setResult({
          credentialId: res.data.certificateId || res.data.credentialId,
          studentName: res.data.studentName,
          courseTitle: res.data.courseTitle || res.data.courseName,
          instructorName: res.data.instructorName,
          issueDate: res.data.issueDate,
          status: res.data.status || 'VERIFIED',
        })
      } else {
        setResult(null)
      }
    } catch (err) {
      setResult(null)
    }
  }

  const handleCopyLink = () => {
    if (result) {
      navigator.clipboard.writeText(`https://skillsphere.edu/verify/${result.credentialId}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-panel border border-soft rounded-2xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-soft flex items-center justify-center text-muted hover:text-heading transition"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-primary">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-heading">Certificate Verification</h2>
            <p className="text-xs text-muted">Verify official credential authenticity</p>
          </div>
        </div>

        <form onSubmit={handleVerify} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Credential ID (e.g. SKILL-8942-X9)"
              className="w-full bg-base border border-soft rounded-xl pl-10 pr-4 py-2.5 text-sm text-heading outline-none focus:border-primary transition uppercase tracking-wide font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-brand-gradient text-white rounded-xl text-sm font-semibold hover:opacity-90 transition shrink-0"
          >
            Verify
          </button>
        </form>

        {searched && (
          <div>
            {result ? (
              <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-left relative">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-3">
                  <CheckCircle2 size={18} />
                  <span>OFFICIALLY VERIFIED CERTIFICATE</span>
                </div>

                <div className="space-y-2 text-xs text-body">
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                    <span className="text-muted">Credential ID:</span>
                    <span className="font-mono font-bold text-heading">{result.credentialId}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                    <span className="text-muted flex items-center gap-1"><User size={13} /> Recipient:</span>
                    <span className="font-semibold text-heading">{result.studentName}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                    <span className="text-muted flex items-center gap-1"><Award size={13} /> Course:</span>
                    <span className="font-semibold text-heading">{result.courseTitle}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted flex items-center gap-1"><Calendar size={13} /> Issue Date:</span>
                    <span className="text-heading">{result.issueDate}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-500/20 flex gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="flex-1 py-2 px-3 rounded-lg bg-base border border-soft text-xs font-medium text-heading flex items-center justify-center gap-1.5 hover:bg-soft transition"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    {copied ? 'Link Copied!' : 'Copy Verify Link'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                <p className="text-sm font-semibold text-red-400">No Verified Certificate Found</p>
                <p className="text-xs text-muted mt-1">
                  Please check the Credential ID or course title and try again.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
