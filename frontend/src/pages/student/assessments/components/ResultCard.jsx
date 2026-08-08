import { Trophy } from "lucide-react";

export default function ResultCard({
  score,
  total,
}) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="bg-[#201233] border border-white/10 rounded-2xl shadow-xl p-8 text-center text-white">

      <Trophy
        className="mx-auto text-amber-400"
        size={60}
      />

      <h1 className="text-3xl font-extrabold mt-5 text-white">
        Quiz Completed
      </h1>

      <p className="text-xl mt-3 text-[#B8B8C7] font-semibold">
        {score} / {total}
      </p>

      <h2 className="text-5xl font-extrabold text-[#EC4899] mt-5">
        {percentage}%
      </h2>

    </div>
  );
}