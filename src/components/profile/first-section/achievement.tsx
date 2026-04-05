import type { AchievementProps } from "../../../types/profileTypes";

export const Achievement = ({
  icon,
  label,
  count,
  unlocked,
}: AchievementProps) => (
  <div
    className={`w-[90px] h-[90px] flex flex-col items-center justify-center p-3 gap-y-3 rounded-2xl border ${unlocked ? "bg-[#2A261D] border-[#E5CC7A33]" : "bg-[#1C1C1C] border-[#E5CC7A33] opacity-40"}`}
  >
    <div>{icon}</div>
    <div className="flex items-center gap-x-1">
      {count && <span className="text-xs text-[#E5CC7A]">{count}</span>}
      <span className="text-xs text-center text-[#E5CC7A] font-medium">
        {label}
      </span>
    </div>
  </div>
);
