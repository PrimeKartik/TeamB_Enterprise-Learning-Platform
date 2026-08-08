import { AlertTriangle, X } from "lucide-react";

export default function DeleteConfirmationModal({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
      <div className="bg-panel border border-soft rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-soft flex items-center justify-center text-muted hover:text-heading transition"
        >
          <X size={18} />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mx-auto">
          <AlertTriangle size={32} />
        </div>

        <h2 className="text-xl font-bold text-heading text-center mt-5">
          {title || "Confirm Deletion"}
        </h2>

        <p className="text-xs text-muted text-center mt-2 leading-relaxed">
          {message || "Are you sure you want to delete this record? This action cannot be undone."}
        </p>

        <div className="flex items-center gap-3 mt-6 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 bg-base border border-soft text-heading py-2.5 rounded-xl text-xs font-semibold hover:bg-soft transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-xs font-semibold transition shadow-md"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}