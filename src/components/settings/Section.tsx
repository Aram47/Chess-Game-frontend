import { useTheme } from "../../context/ThemeContext";
import type { SectionProps } from "../../types/settingsType";

export const Section = ({ icon, title, subtitle, children }: SectionProps) => {
  const { theme } = useTheme();
  return (
    <div
      className={`${theme === "dark" ? "bg-[#FFFFFF0D]" : "bg-[#F0F0F0]"} border border-[#CEB86E26] rounded-[24px] p-8 
`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[var(--text-h)] rounded-xl flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <p className={`${theme ==="dark" ? "text-[#CFCFCF]" : "text-[#1C1C1C]"} text-md font-semibold`}>{title}</p>
            <p className={`${theme === "dark" ? "text-[#A39589]" : "text-[#6B6B6B"} text-sm mt-0.5`}>{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
};
