import { Search } from "lucide-react";

export default function StudentFilters({
  search,
  setSearch,
  department,
  setDepartment,
  status,
  setStatus,
}) {
  return (
    <div className="bg-panel border border-soft rounded-2xl p-5 shadow-xl grid md:grid-cols-3 gap-4">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          className="w-full bg-base border border-soft rounded-xl pl-10 pr-4 py-2.5 text-xs text-heading outline-none focus:border-primary transition"
          placeholder="Search student by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select
        className="bg-base border border-soft rounded-xl px-4 py-2.5 text-xs font-semibold text-heading outline-none focus:border-primary"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="">All Departments</option>
        <option value="Computer Science">Computer Science (CSE)</option>
        <option value="IT">Information Technology (IT)</option>
        <option value="ECE">Electronics (ECE)</option>
        <option value="Data Science">Data Science & AI</option>
      </select>

      <select
        className="bg-base border border-soft rounded-xl px-4 py-2.5 text-xs font-semibold text-heading outline-none focus:border-primary"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="active">Active Students</option>
        <option value="inactive">Inactive Students</option>
      </select>
    </div>
  );
}