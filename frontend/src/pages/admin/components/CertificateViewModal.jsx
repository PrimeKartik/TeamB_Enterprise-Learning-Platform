import React from "react";
import { X } from "lucide-react";
import CertificatePreview from "../../student/certificates/components/CertificatePreview";

export default function CertificateViewModal({ open, certificate, onClose }) {
  if (!open || !certificate) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex justify-center items-center z-50 p-4 sm:p-6 overflow-y-auto">
      <div className="bg-panel border border-soft rounded-2xl w-full max-w-4xl p-4 sm:p-6 relative shadow-2xl animate-fadeIn max-h-[92vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 border-b border-soft pb-3 no-print">
          <h2 className="text-lg font-extrabold text-heading flex items-center gap-2">
            Official Student Certificate Preview
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-base hover:bg-soft border border-soft text-muted hover:text-heading flex items-center justify-center transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* High-Resolution Professional Certificate Component */}
        <CertificatePreview certificate={certificate} />
      </div>
    </div>
  );
}
