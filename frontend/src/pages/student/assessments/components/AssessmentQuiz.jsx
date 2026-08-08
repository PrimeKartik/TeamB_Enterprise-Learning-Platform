import { useState } from 'react'
import { X, ArrowRight, ArrowLeft, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react'

export default function AssessmentQuiz({ assessment, onClose, onComplete, onRetake }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(() => Array(assessment.questions.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const question = assessment.questions[step]
  const isLastQuestion = step === assessment.questions.length - 1

  function selectAnswer(optionIndex) {
    setAnswers((prev) => {
      const next = [...prev]
      next[step] = optionIndex
      return next
    })
  }

  function handleSubmit() {
    const score = answers.reduce(
      (acc, ans, i) => acc + (ans === assessment.questions[i].correctIndex ? 1 : 0),
      0
    )
    setSubmitted(true)
    onComplete(score, assessment.questions.length)
  }

  function retake() {
    if (onRetake) {
      // Ask the parent to fetch a brand-new AI-generated question set —
      // every attempt must get fresh questions, not the same ones reused.
      onRetake()
      return
    }
    setAnswers(Array(assessment.questions.length).fill(null))
    setStep(0)
    setSubmitted(false)
  }

  const score = submitted
    ? answers.reduce((acc, ans, i) => acc + (ans === assessment.questions[i].correctIndex ? 1 : 0), 0)
    : 0

  const percentage = Math.round((score / assessment.questions.length) * 100)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-panel border border-soft p-6 shadow-2xl relative">

        <div className="mb-6 flex items-center justify-between border-b border-soft pb-4">
          <div>
            <h2 className="text-lg font-bold text-heading">{assessment.title}</h2>
            <p className="text-xs text-muted">SkillSphere Verified Evaluation</p>
          </div>
          <button onClick={onClose} className="rounded-xl p-2 text-muted hover:bg-soft hover:text-heading transition">
            <X size={20} />
          </button>
        </div>

        {!submitted ? (
          <>
            <div className="flex items-center justify-between text-xs text-muted mb-2 font-medium">
              <span>Question {step + 1} of {assessment.questions.length}</span>
              <span>{Math.round(((step + 1) / assessment.questions.length) * 100)}% Progress</span>
            </div>

            <div className="mb-6 h-2 w-full rounded-full bg-base border border-soft/50 overflow-hidden">
              <div
                className="h-full rounded-full bg-brand-gradient transition-all duration-300"
                style={{ width: `${((step + 1) / assessment.questions.length) * 100}%` }}
              />
            </div>

            <h3 className="mb-5 text-base font-bold text-heading leading-relaxed">{question.question}</h3>

            <div className="space-y-2.5">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  className={`w-full rounded-xl border p-4 text-left text-sm transition flex items-center justify-between ${
                    answers[step] === i
                      ? 'border-primary bg-primary/10 text-heading font-semibold shadow-sm'
                      : 'border-soft bg-base/50 text-muted hover:text-heading hover:bg-soft'
                  }`}
                >
                  <span>{opt}</span>
                  {answers[step] === i && (
                    <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between pt-4 border-t border-soft">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-muted hover:text-heading disabled:opacity-30"
              >
                <ArrowLeft size={15} /> Back
              </button>

              {isLastQuestion ? (
                <button
                  onClick={handleSubmit}
                  disabled={answers[step] === null}
                  className="rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 transition disabled:opacity-40 shadow-md"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={answers[step] === null}
                  className="flex items-center gap-1.5 rounded-xl bg-brand-gradient px-6 py-2.5 text-xs font-semibold text-white hover:opacity-90 transition disabled:opacity-40 shadow-md"
                >
                  Next Question <ArrowRight size={15} />
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-base border border-soft text-center relative overflow-hidden">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Award size={30} />
              </div>
              <p className="text-xs uppercase tracking-widest text-muted font-medium">Evaluation Complete</p>
              <h2 className="text-4xl font-extrabold text-heading mt-1">
                {score} / {assessment.questions.length}
              </h2>
              <p className={`mt-2 text-xs font-bold ${percentage >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {percentage}% Score · {percentage >= 70 ? 'Passed & Certificate Eligible 🎉' : 'Keep practicing!'}
              </p>
            </div>

            <div className="space-y-3">
              {assessment.questions.map((q, i) => {
                const correct = answers[i] === q.correctIndex
                return (
                  <div key={i} className="rounded-xl border border-soft bg-base/50 p-4">
                    <div className="flex items-start gap-3">
                      {correct ? (
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                      ) : (
                        <XCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
                      )}
                      <div>
                        <p className="text-xs font-semibold text-heading leading-relaxed">{q.question}</p>
                        {!correct && (
                          <p className="mt-1.5 text-xs text-emerald-400 font-medium">
                            Correct answer: {q.options[q.correctIndex]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={retake}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-soft bg-base py-2.5 text-xs font-semibold text-heading hover:bg-soft transition"
              >
                <RotateCcw size={15} /> Retake Assessment
              </button>
              <button
                onClick={onClose}
                className="flex-1 rounded-xl bg-brand-gradient py-2.5 text-xs font-semibold text-white hover:opacity-90 transition shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
