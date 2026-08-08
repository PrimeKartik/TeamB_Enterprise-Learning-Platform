import { CheckCircle, PlayCircle, HelpCircle, Sparkles } from 'lucide-react'

export default function LessonSidebar({
  modules,
  selectedItem,
  onSelectItem
}) {
  return (
    <aside className="rounded-2xl bg-[#201233] shadow-xl border border-white/10 overflow-hidden flex flex-col h-full max-h-[800px]">

      <div className="border-b border-white/10 p-5 bg-[#1A1028] shrink-0">
        <h2 className="text-xl font-bold text-white">Course Content</h2>
        <p className="mt-1 text-xs font-semibold text-[#EC4899]">
          {modules.length} Modules
        </p>
      </div>

      <div className="overflow-y-auto flex-1 p-3 space-y-4">
        {modules.map((mod, index) => (
          <div key={mod.id} className="border border-white/10 rounded-xl overflow-hidden shadow-sm bg-[#1A1028]/60">
            <div className="bg-[#1A1028] p-3 font-semibold text-white border-b border-white/10 text-sm">
              <div className="text-purple-200 font-bold">Module {index + 1}: {mod.title}</div>
              {mod.description && (
                <p className="text-[11px] font-normal text-purple-300/80 mt-1 leading-snug">
                  {mod.description}
                </p>
              )}
              {mod.youtubeLink && (
                <div className="text-xs font-normal text-purple-300 mt-1">
                  <a href={
                      (mod.youtubeLink.startsWith('http') ? mod.youtubeLink : `https://${mod.youtubeLink}`)
                      .replace('youtube.com/embed/', 'youtube.com/watch?v=')
                  } target="_blank" rel="noopener noreferrer" className="hover:underline">📺 YouTube Reference</a>
                </div>
              )}
               {mod.referenceBook && (
                <div className="text-xs font-normal text-purple-300 mt-1">
                  📚 {mod.referenceBook}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              {mod.lessons?.map((lesson) => {
                const isSelected = selectedItem?.type === 'lesson' && selectedItem?.data?.id === lesson.id;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => onSelectItem({ type: 'lesson', data: lesson })}
                    className={`flex items-start gap-3 px-4 py-3 text-left transition text-sm
                    ${isSelected 
                      ? 'bg-gradient-to-r from-[#7C3AED]/30 to-[#EC4899]/30 border-l-4 border-[#EC4899] text-white' 
                      : 'hover:bg-[#2A1740] border-l-4 border-transparent text-[#B8B8C7]'}`}
                  >
                    {isSelected ? (
                      <PlayCircle size={18} className="mt-0.5 text-[#EC4899] shrink-0 animate-pulse" />
                    ) : (
                      <CheckCircle size={18} className={`mt-0.5 shrink-0 ${lesson.completed ? 'text-emerald-400' : 'text-purple-300/30'}`} />
                    )}
                    <div>
                      <p className={`font-medium ${isSelected ? 'text-white' : 'text-purple-200/90'}`}>
                        {lesson.title}
                      </p>
                      <p className="text-xs text-[#B8B8C7]/70 mt-0.5">{lesson.duration}</p>
                    </div>
                  </button>
                )
              })}

              {mod.quiz && (
                <button
                  onClick={() => onSelectItem({ type: 'quiz', data: mod.quiz })}
                  className={`flex items-center gap-3 px-4 py-3 text-left transition text-sm border-t border-white/10
                  ${selectedItem?.type === 'quiz' && selectedItem?.data?.id === mod.quiz.id 
                    ? 'bg-gradient-to-r from-[#7C3AED]/30 to-[#EC4899]/30 border-l-4 border-[#EC4899] text-white' 
                    : 'hover:bg-[#2A1740] border-l-4 border-transparent text-[#B8B8C7]'}`}
                >
                  <HelpCircle size={18} className={`${selectedItem?.type === 'quiz' && selectedItem?.data?.id === mod.quiz.id ? 'text-[#EC4899]' : 'text-purple-300/40'} shrink-0`} />
                  <div>
                    <p className={`font-medium ${selectedItem?.type === 'quiz' && selectedItem?.data?.id === mod.quiz.id ? 'text-white' : 'text-purple-200/90'}`}>
                      Practice Quiz
                    </p>
                    <p className="text-xs text-[#B8B8C7]/70 mt-0.5">{mod.quiz.questions?.length || 0} Questions</p>
                  </div>
                </button>
              )}

              {/* Module Practice & Assessment Button */}
              <button
                onClick={() => onSelectItem({ type: 'practice', data: mod })}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-t border-white/10 hover:from-purple-800/60 hover:to-pink-800/60 text-xs font-bold text-purple-200 transition cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-400" /> Start Module Practice
                </span>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-[10px] text-purple-300 font-mono">
                  26 Questions
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </aside>
  )
}