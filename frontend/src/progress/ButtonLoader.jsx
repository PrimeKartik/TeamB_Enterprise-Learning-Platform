export default function ButtonLoader({
  loading,
  text,
  loadingText = "Please Wait...",
}) {
  return (
    <button
      disabled={loading}
      className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white px-5 py-2 rounded-xl font-bold disabled:opacity-60 shadow-md hover:opacity-90 transition cursor-pointer"
    >
      {loading ? loadingText : text}
    </button>
  );
}