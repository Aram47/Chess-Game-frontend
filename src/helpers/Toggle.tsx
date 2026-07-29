import { useTheme } from "../context/ThemeContext";

interface ToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
}

export const Toggle = ({ checked, onChange }: ToggleProps) => {
  const { theme } = useTheme();
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-[48px] h-[24px] rounded-full transition-all duration-300 flex-shrink-0 ${
        checked && theme === "dark"
          ? "bg-gradient-to-r from-[#E5CC7A] to-[#F4E09E]"
          : !checked && theme === "light"
            ? "border border-[#DA775680] bg-transparent"
            : "bg-[#FFFFFF0D]"
      }`}
      style={
        checked && theme === "light"
          ? {
              background:
                "linear-gradient(180deg, #DA7756 0%, #D77554 8.33%, #D47251 16.67%, #D1704F 25%, #CF6E4D 33.33%, #CC6C4A 41.67%, #C96948 50%, #C66746 58.33%, #C36543 66.67%, #C06341 75%, #BE603F 83.33%, #BB5E3C 91.67%, #B85C3A 100%)",
            }
          : undefined
      }
    >
      <span
        className={`absolute top-[50%] right-[28px] -translate-y-1/2 w-[18px] h-[18px] rounded-full transition-all duration-300 ${
          checked
            ? "translate-x-[21px] bg-[#1C1C1C]"
            : "translate-x-[3px] bg-[#676767]"
        }`}
      />
    </button>
  );
};
