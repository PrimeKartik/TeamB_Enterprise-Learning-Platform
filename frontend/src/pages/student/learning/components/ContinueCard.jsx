export default function ContinueCard({ course, onContinue }) {

  return (

    <div className="bg-gradient-to-r from-[#7C3AED] via-purple-900 to-[#EC4899] text-white rounded-2xl p-8 shadow-xl border border-white/10">

      <h1 className="text-3xl font-extrabold tracking-tight">
        Continue Learning
      </h1>

      <p className="mt-3 text-white/90 text-base font-medium">
        {course.courseTitle}
      </p>

      <button
        onClick={() => onContinue(course.courseId)}
        className="mt-6 bg-white text-purple-950 px-6 py-3 rounded-xl font-extrabold hover:scale-105 transition shadow-lg cursor-pointer"
      >
        Resume
      </button>

    </div>

  );

}