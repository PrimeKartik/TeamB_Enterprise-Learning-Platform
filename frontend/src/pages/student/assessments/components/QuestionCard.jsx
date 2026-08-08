export default function QuestionCard({
  question,
  selectedAnswer,
  onAnswer,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="font-semibold text-lg mb-5">
        {question.question}
      </h2>

      <div className="space-y-3">

        {question.options.map((option, index) => (

          <label
            key={index}
            className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
          >

            <input
              type="radio"
              checked={selectedAnswer === option}
              onChange={() => onAnswer(option)}
            />

            {option}

          </label>

        ))}

      </div>

    </div>
  );
}