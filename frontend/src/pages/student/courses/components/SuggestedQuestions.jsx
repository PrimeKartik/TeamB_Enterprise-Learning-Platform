export default function SuggestedQuestions({
    onSelect
}) {

    const questions = [

        "Explain this lesson",

        "Summarize this lesson",

        "Give interview questions",

        "Generate quiz",

        "Show real-world example"

    ];

    return (

        <div className="flex flex-wrap gap-2">

            {questions.map(question => (

                <button

                    key={question}

                    onClick={() => onSelect(question)}

                    className="border border-white/10 bg-[#201233] text-purple-200 rounded-full px-4 py-2 text-xs font-semibold hover:border-[#EC4899] hover:text-white transition"

                >

                    {question}

                </button>

            ))}

        </div>

    );

}