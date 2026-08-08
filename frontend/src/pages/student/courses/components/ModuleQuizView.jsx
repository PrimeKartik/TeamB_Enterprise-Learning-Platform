import { useState } from 'react'

export default function ModuleQuizView({ quiz }) {
    const [answers, setAnswers] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [score, setScore] = useState(0)

    const handleSelectOption = (questionIndex, optionKey) => {
        if (submitted) return
        setAnswers({
            ...answers,
            [questionIndex]: optionKey
        })
    }

    const handleSubmit = () => {
        let correctCount = 0
        quiz.questions.forEach((q, idx) => {
            if (answers[idx] === q.correctAnswer) {
                correctCount++
            }
        })
        setScore(correctCount)
        setSubmitted(true)
    }

    const handleRetry = () => {
        setAnswers({})
        setSubmitted(false)
        setScore(0)
    }

    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
        return (
            <div className="bg-[#201233] p-8 rounded-2xl border border-white/10 text-center text-[#B8B8C7]">
                This quiz has no questions yet.
            </div>
        )
    }

    return (
        <div className="bg-[#201233] p-8 rounded-2xl shadow-xl border border-white/10">
            <div className="mb-8 border-b border-white/10 pb-4">
                <h2 className="text-2xl font-extrabold text-white">{quiz.title}</h2>
                {quiz.description && (
                    <p className="text-[#B8B8C7] mt-2">{quiz.description}</p>
                )}
            </div>

            {submitted && (
                <div className={`mb-8 p-6 rounded-xl text-center ${score === quiz.questions.length ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300' : 'bg-purple-950/60 border border-purple-800/40 text-purple-200'}`}>
                    <h3 className="text-2xl font-bold mb-2 text-white">
                        You scored {score} out of {quiz.questions.length}!
                    </h3>
                    <p className="text-sm text-[#B8B8C7] mb-4">
                        {score === quiz.questions.length ? 'Perfect score! Excellent job.' : 'Keep practicing! Review the correct answers below.'}
                    </p>
                    <button
                        onClick={handleRetry}
                        className="px-6 py-2 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-bold rounded-xl shadow-md hover:opacity-90 transition"
                    >
                        Retry Quiz
                    </button>
                </div>
            )}

            <div className="space-y-8">
                {quiz.questions.map((q, idx) => {
                    return (
                        <div key={idx} className="bg-[#1A1028] p-6 rounded-xl border border-white/10">
                            <p className="font-bold text-white mb-4 text-lg">
                                <span className="text-[#EC4899] mr-2">{idx + 1}.</span> 
                                {q.questionText}
                            </p>
                            
                            <div className="space-y-3">
                                {['A', 'B', 'C', 'D'].map((optKey) => {
                                    const optValue = q[`option${optKey}`]
                                    if (!optValue) return null

                                    const isSelected = answers[idx] === optKey
                                    const showCorrect = submitted && q.correctAnswer === optKey
                                    const showWrong = submitted && isSelected && !showCorrect

                                    let bgClass = "bg-[#201233] hover:border-purple-500/60 hover:bg-[#2A1740]"
                                    let borderClass = "border-white/10 text-[#B8B8C7]"
                                    
                                    if (isSelected && !submitted) {
                                        bgClass = "bg-purple-900/40"
                                        borderClass = "border-[#EC4899] text-white ring-1 ring-[#EC4899]"
                                    } else if (showCorrect) {
                                        bgClass = "bg-emerald-950/60"
                                        borderClass = "border-emerald-500 text-emerald-300 font-medium"
                                    } else if (showWrong) {
                                        bgClass = "bg-rose-950/60"
                                        borderClass = "border-rose-500 text-rose-300"
                                    } else if (submitted) {
                                        bgClass = "bg-[#201233] opacity-50"
                                    }

                                    return (
                                        <button
                                            key={optKey}
                                            onClick={() => handleSelectOption(idx, optKey)}
                                            disabled={submitted}
                                            className={`w-full text-left p-4 rounded-xl border transition font-medium ${bgClass} ${borderClass}`}
                                        >
                                            <span className="font-bold mr-3 inline-block w-6 text-purple-300">{optKey}.</span>
                                            {optValue}
                                        </button>
                                    )
                                })}
                            </div>

                            {submitted && !answers[idx] && (
                                <p className="mt-3 text-xs text-rose-400 font-medium">You didn't answer this question.</p>
                            )}
                        </div>
                    )
                })}
            </div>

            {!submitted && (
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={Object.keys(answers).length === 0}
                        className="px-8 py-3 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
                    >
                        Submit Answers
                    </button>
                </div>
            )}
        </div>
    )
}

