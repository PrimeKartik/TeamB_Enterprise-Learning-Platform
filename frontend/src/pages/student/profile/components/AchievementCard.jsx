import { Award } from "lucide-react";

export default function AchievementCard({ achievement }) {
  return (
    <div className="bg-panel border border-soft rounded-2xl shadow-lg p-5 flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
        <Award className="text-amber-400" size={24} />
      </div>

      <div>
        <h3 className="font-bold text-heading text-sm">
          {achievement.title}
        </h3>
        <p className="text-xs text-muted mt-1 leading-relaxed">
          {achievement.description}
        </p>
      </div>
    </div>
  );
}