export default function Spinner({ size = 6 }) {
  return (
    <div
      className={`border-2 border-blue-600 border-t-transparent rounded-full animate-spin w-${size} h-${size}`}
    />
  );
}