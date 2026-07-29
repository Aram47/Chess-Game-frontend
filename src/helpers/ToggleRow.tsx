import { useTheme } from "../context/ThemeContext";
import { Toggle } from "./Toggle";

interface ToggleRowProps {
  name: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

export const ToggleRow = ({
  name,
  desc,
  checked,
  onChange,
}: ToggleRowProps) => {
  const { theme } = useTheme();
  return (
    <div className={`flex items-center justify-between py-2.5`}>
      <div>
        <p
          className={`${theme === "dark" ? "text-[#CFCFCF]" : "text-[#6B6B6B]"} font-medium`}
        >
          {name}
        </p>
        <p className={`${theme === "dark" ? "text-[#A39589]" : "text-[#6B6B6B]"} text-sm mt-0.5`}>{desc}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
};
