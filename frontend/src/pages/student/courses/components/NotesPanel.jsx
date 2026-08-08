import { useState } from 'react'
import { StickyNote } from 'lucide-react'

export default function NotesPanel() {

  const [notes, setNotes] = useState('')

  return (

    <div className="rounded-2xl bg-[#201233] p-6 shadow-xl border border-white/10 text-white">

      <div className="mb-5 flex items-center gap-3">

        <StickyNote
          className="text-[#EC4899]"
          size={24}
        />

        <h2 className="text-xl font-extrabold text-white">
          My Notes
        </h2>

      </div>

      <textarea
        rows={10}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes here..."
        className="w-full rounded-xl bg-[#1A1028] border border-white/10 p-4 text-white placeholder-gray-500 outline-none transition focus:border-[#EC4899]"
      />

      <button
        className="mt-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-6 py-2.5 font-bold text-white transition hover:opacity-90 shadow-md"
      >
        Save Notes
      </button>

    </div>

  )

}