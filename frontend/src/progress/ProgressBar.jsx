export default function ProgressBar({ value }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3">

      <div
        className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] h-3 rounded-full transition-all"
        style={{
          width: `${value}%`,
        }}
      />

    </div>
  );
}