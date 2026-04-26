import { useState } from "react";
import type { AchievementProps } from "../../../types/profileTypes";
import locked from "../../../assets/icons/profile/profile/locked.svg";

const HoverItem = ({
  label,
  text,
  unlocked,
}: {
  label: string;
  text?: string;
  unlocked: boolean;
}) => {
  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center px-2 py-2 w-[180px] border border-[#CEB86E66] rounded-xl shadow-2xl z-[100] pointer-events-none backdrop-blur-md transition-all duration-400 ease-out ${!unlocked ? "bg-[#1D1C16]  -top-[90px]" : "-top-[70px] bg-[#2A261D]"}`}
    >
      <span className="text-[#E5CC7A] text-sm font-bold tracking-tight text-center">
        {label}
      </span>

      {text && (
        <span className="text-[#676767] text-xs text-center leading-tight whitespace-normal">
          {text}
        </span>
      )}

      {!unlocked && <div className="w-full h-[1px] bg-[#CEB86E33] my-1"></div>}

      <div className={`flex items-center gap-x-2 text-sm italic font-medium`}>
        {!unlocked && (
          <>
            <img src={locked} alt="" />
            <span className="text-orange-400">Locked</span>
          </>
        )}
      </div>
    </div>
  );
};

export const Achievement = ({
  icon,
  label,
  text,
  count,
  unlocked,
}: AchievementProps) => {
  const [onHover, setOnHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      className={`relative w-[90px] h-[90px] flex flex-col items-center justify-center p-3 gap-y-3 rounded-[10px] border transition-all duration-500 ease-out 
        ${onHover ? "z-0 shadow-[0_0_40px_#CEB86E33] overflow-visible" : "z-0 scale-100 overflow-visible"}
        ${onHover && unlocked ? "bg-[#2A261D]" : null}
        ${unlocked ? "bg-[#2A261D] border-[#E5CC7A33]" : "bg-[#1C1C1C] border-[#E5CC7A33] opacity-40"}`}
    >
      {onHover && <HoverItem label={label} text={text} unlocked={unlocked} />}

      <div>{icon}</div>
      <div className="flex items-center gap-x-1">
        {count && <span className="text-xs text-[#E5CC7A]">{count}</span>}
        <span className="text-xs text-center text-[#E5CC7A] font-medium">
          {label}
        </span>
      </div>
    </div>
  );
};
