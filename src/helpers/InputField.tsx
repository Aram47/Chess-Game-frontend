import { useTheme } from "../context/ThemeContext";

export const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  rightElement,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightElement?: React.ReactNode;
}) => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col gap-2">
      <label
        className={`text-sm font-medium text-[var(--text)]`}
      >
        {label}
      </label>
      <div className="relative flex items-center h-full">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full border-[rgba(206,184,110,0.2)] border border-solid rounded-lg py-3 pl-4 text-sm
                   focus:outline-none focus:border-[#c8a84b] transition-colors cursor-pointer ${theme === "dark" ? "text-white bg-[#1a1a1a] placeholder-[rgba(163, 149, 137, 1)]" : "text-black bg-[#F5F5F5] placeholder-[#6B6B6B]"}`}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-500 h-full flex justify-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};
