export default function SkillCard({ skill }) {
  return (
    <div className="bg-panel border border-soft rounded-2xl shadow-lg p-5">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-heading text-sm">
          {skill.name}
        </h3>
        <span className="text-xs font-semibold text-primary">
          {skill.progress}% Complete
        </span>
      </div>

      <div className="w-full bg-base h-2.5 rounded-full border border-soft/50 overflow-hidden">
        <div
          className="bg-brand-gradient h-full rounded-full transition-all duration-500"
          style={{ width: `${skill.progress}%` }}
        />
      </div>
    </div>
  );
}