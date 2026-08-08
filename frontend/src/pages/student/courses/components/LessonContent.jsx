import { useState, useEffect } from 'react'
import { BookOpen, Clock, ExternalLink, Bookmark as BookmarkIcon, FileText, Save, Check, Sparkles, Target, Code, Award } from 'lucide-react'
import { bookmarkApi } from '../../../../api/bookmarkApi'
import { noteApi } from '../../../../api/noteApi'
import { useAuth } from '../../../../context/AuthContext'
import { toast } from 'react-toastify'

export default function LessonContent({ lesson, courseId }) {
    const { user } = useAuth()
    const userId = user?.id || 1

    const [bookmarked, setBookmarked] = useState(false)
    const [noteText, setNoteText] = useState('')
    const [savingNote, setSavingNote] = useState(false)
    const [noteSaved, setNoteSaved] = useState(false)

    useEffect(() => {
        if (lesson?.id && userId) {
            checkBookmarkStatus()
            loadStudentNote()
        }
    }, [lesson?.id, userId])

    async function checkBookmarkStatus() {
        try {
            const res = await bookmarkApi.checkBookmark(userId, lesson.id)
            setBookmarked(res.data?.bookmarked || false)
        } catch (err) {
            console.error('Error checking bookmark', err)
        }
    }

    async function loadStudentNote() {
        try {
            const res = await noteApi.getNote(userId, lesson.id)
            setNoteText(res.data?.noteText || '')
        } catch (err) {
            console.error('Error loading note', err)
        }
    }

    async function handleToggleBookmark() {
        try {
            const res = await bookmarkApi.toggleBookmark({
                userId,
                courseId: courseId || 1,
                lessonId: lesson.id
            })
            setBookmarked(res.data?.bookmarked)
            toast.success(res.data?.message || 'Bookmark updated')
        } catch (err) {
            console.error(err)
            toast.error('Failed to update bookmark')
        }
    }

    async function handleSaveNote() {
        try {
            setSavingNote(true)
            await noteApi.saveNote({
                userId,
                courseId: courseId || 1,
                lessonId: lesson.id,
                noteText
            })
            setNoteSaved(true)
            toast.success('Note saved successfully!')
            setTimeout(() => setNoteSaved(false), 3000)
        } catch (err) {
            console.error(err)
            toast.error('Failed to save note')
        } finally {
            setSavingNote(false)
        }
    }

    function handleDownloadPdfNotes() {
        const printWindow = window.open('', '_blank')
        printWindow.document.write(`
            <html>
                <head>
                    <title>${lesson.title} - Notes</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 40px; color: #1a1028; line-height: 1.6; }
                        h1 { color: #7c3aed; border-bottom: 2px solid #ec4899; padding-bottom: 10px; }
                        .meta { font-[#6b7280]; font-size: 14px; margin-bottom: 20px; }
                        .content { margin-top: 20px; font-size: 16px; }
                        .student-note { margin-top: 30px; background: #f3e8ff; padding: 20px; border-radius: 8px; border-left: 4px solid #7c3aed; }
                    </style>
                </head>
                <body>
                    <h1>${lesson.title}</h1>
                    <div class="meta">SkillSphere Learning Nexus | Lesson Duration: ${lesson.duration || 'N/A'}</div>
                    <div class="content">
                        <h3>Lesson Overview</h3>
                        <p>${lesson.description || 'No detailed description available.'}</p>
                    </div>
                    ${noteText ? `<div class="student-note"><h3>Your Personal Notes</h3><p>${noteText.replace(/\n/g, '<br/>')}</p></div>` : ''}
                </body>
            </html>
        `)
        printWindow.document.close()
        printWindow.print()
    }

    if (!lesson) {
        return (
            <div className="rounded-2xl bg-[#201233] p-8 shadow-lg border border-white/10 text-white text-center">
                Please select a lesson from the sidebar to start learning.
            </div>
        )
    }

    const videoSrc = lesson.video_url || lesson.videoUrl;

    return (
        <div className="rounded-2xl bg-[#201233] p-6 shadow-xl border border-white/10 space-y-6">

            {/* Embedded YouTube Video Player */}
            {videoSrc && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-purple-800/40 bg-black shadow-2xl shadow-purple-950/50">
                    <iframe
                        className="w-full h-full"
                        src={videoSrc.includes('youtube.com/embed') ? videoSrc : videoSrc.replace('watch?v=', 'embed/')}
                        title={lesson.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}

            {/* Lesson Title, Actions Toolbar & Duration */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                    <BookOpen
                        size={24}
                        className="text-[#EC4899]"
                    />
                    <h2 className="text-2xl font-extrabold text-white">
                        {lesson.title}
                    </h2>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Bookmark Button */}
                    <button
                        onClick={handleToggleBookmark}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${
                            bookmarked
                                ? 'bg-[#EC4899]/20 border-[#EC4899] text-[#EC4899]'
                                : 'bg-[#1A1028] border-white/10 text-[#B8B8C7] hover:text-white'
                        }`}
                    >
                        <BookmarkIcon size={14} className={bookmarked ? 'fill-[#EC4899]' : ''} />
                        {bookmarked ? 'Bookmarked' : 'Bookmark'}
                    </button>

                    {/* Download PDF Notes */}
                    <button
                        onClick={handleDownloadPdfNotes}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-xs font-bold hover:opacity-90 transition shadow-md"
                    >
                        <FileText size={14} />
                        Download PDF Notes
                    </button>

                    {lesson.duration && (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-800/40 text-xs font-semibold text-purple-300">
                            <Clock size={14} className="text-[#EC4899]" />
                            {lesson.duration}
                        </span>
                    )}
                </div>
            </div>

            {/* Rich Module & Lesson Overview Header Card */}
            <div className="bg-gradient-to-r from-purple-950/70 via-[#1A1028] to-pink-950/50 p-5 rounded-2xl border border-purple-800/40 shadow-lg space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#EC4899] uppercase tracking-wider">
                    <Sparkles size={16} /> Module Overview & Learning Outcomes
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-purple-100 font-medium">
                    {lesson.description || `In this module lesson, explore fundamental concepts, architectural patterns, and production-ready implementation strategies for ${lesson.title}.`}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="bg-purple-950/40 p-3 rounded-xl border border-purple-800/30 flex items-center gap-2.5 text-xs font-semibold text-purple-200">
                        <Target size={16} className="text-[#EC4899] shrink-0" />
                        <span>Industry Standards</span>
                    </div>
                    <div className="bg-purple-950/40 p-3 rounded-xl border border-purple-800/30 flex items-center gap-2.5 text-xs font-semibold text-purple-200">
                        <Code size={16} className="text-purple-400 shrink-0" />
                        <span>Hands-on Code Practice</span>
                    </div>
                    <div className="bg-purple-950/40 p-3 rounded-xl border border-purple-800/30 flex items-center gap-2.5 text-xs font-semibold text-purple-200">
                        <Award size={16} className="text-emerald-400 shrink-0" />
                        <span>Skills Certification Ready</span>
                    </div>
                </div>
            </div>

            {/* Lesson Detailed Content */}
            <div className="space-y-4 leading-8 text-[#B8B8C7] font-medium pt-2">
                {lesson.content && (
                    <div 
                        className="prose max-w-none prose-invert prose-violet"
                        dangerouslySetInnerHTML={{ __html: lesson.content }} 
                    />
                )}
            </div>

            {/* Student Personal Notes Section */}
            <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <FileText size={16} className="text-[#EC4899]" /> Student Personal Notes
                    </h3>
                    <button
                        onClick={handleSaveNote}
                        disabled={savingNote}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:text-white hover:bg-purple-900/60 text-xs font-semibold transition"
                    >
                        {noteSaved ? <Check size={14} className="text-emerald-400" /> : <Save size={14} />}
                        {savingNote ? 'Saving...' : noteSaved ? 'Saved!' : 'Save Notes'}
                    </button>
                </div>
                <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Take personal notes for this lesson here... (Notes are saved automatically to your profile)"
                    rows={4}
                    className="w-full rounded-xl bg-[#1A1028] border border-white/10 p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#EC4899] transition"
                />
            </div>

            {/* Reference Links */}
            {videoSrc && (
                <div className="pt-4 border-t border-white/10">
                    <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-3">Resources & References</h3>
                    <div className="flex flex-wrap gap-3">
                        <a 
                            href={
                                (videoSrc.startsWith('http') ? videoSrc : `https://${videoSrc}`)
                                .replace('youtube.com/embed/', 'youtube.com/watch?v=')
                            } 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-950/50 text-purple-300 rounded-xl border border-purple-800/40 hover:bg-purple-900/60 hover:text-white transition-colors text-xs font-medium"
                        >
                            <ExternalLink size={14} /> Watch Reference Video on YouTube
                        </a>
                        <a 
                            href={`https://www.google.com/search?q=${encodeURIComponent(lesson.title)}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-950/50 text-purple-300 rounded-xl border border-purple-800/40 hover:bg-purple-900/60 hover:text-white transition-colors text-xs font-medium"
                        >
                            <ExternalLink size={14} /> Search Documentation
                        </a>
                    </div>
                </div>
            )}

        </div>
    )
}