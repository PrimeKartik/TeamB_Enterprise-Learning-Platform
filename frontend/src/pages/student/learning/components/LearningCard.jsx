import { BookOpen, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LearningCard({
  course,
  onContinue,
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#201233] border border-white/10 rounded-2xl shadow-xl hover:border-[#EC4899]/40 transition text-white overflow-hidden">

      <img
        src={course.imageUrl || "/images/full-stack-development.svg"}
        alt={course.courseTitle}
        className="w-full h-44 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/full-stack-development.svg";
        }}
      />

      <div className="p-5">

        <h2 className="font-extrabold text-lg text-white">
          {course.courseTitle}
        </h2>

        <div className="flex items-center mt-3 text-[#B8B8C7] text-sm">

          <BookOpen size={18} className="text-[#EC4899]" />

          <span className="ml-2 font-medium">
            {course.progress}% Completed
          </span>

        </div>

        <div className="w-full bg-[#1A1028] rounded-full h-2 mt-4 overflow-hidden border border-white/5">

          <div
            className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] h-2 rounded-full transition-all duration-500"
            style={{
              width: `${course.progress}%`,
            }}
          />

        </div>

        <button
          onClick={() => onContinue(course.courseId)}
          className="mt-5 w-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:opacity-90 text-white font-bold py-3 rounded-xl shadow-lg transition-all cursor-pointer"
        >
          Continue Learning
        </button>

      </div>

    </div>
  );
}