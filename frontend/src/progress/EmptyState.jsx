import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "No Data Found",
  description = "Nothing to display.",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16">

      <Inbox
        size={60}
        className="text-gray-400"
      />

      <h2 className="mt-4 text-xl font-semibold">
        {title}
      </h2>

      <p className="text-gray-500 mt-2">
        {description}
      </p>

    </div>
  );
}