import React from 'react'
import { X } from 'lucide-react'
import CertificatePreview from './CertificatePreview'

export default function CertificateModal({ isOpen, onClose, certificate }) {
  if (!isOpen || !certificate) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#180E29] border border-purple-500/30 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4">
        
        {/* Modal Close Header */}
        <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-500 animate-ping" />
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              Certificate Preview • A4 Portrait
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Certificate Render */}
        <div className="py-2">
          <CertificatePreview certificate={certificate} onClose={onClose} />
        </div>
      </div>
    </div>
  )
}
