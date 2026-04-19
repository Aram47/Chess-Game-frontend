import { useState } from "react";
import { PasswordToggleIcon } from "./PasswordToggleIcon";

interface PasswordFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}

export const PasswordField = ({
  label,
  placeholder,
  value,
  onChange,
}: PasswordFieldProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="font-barlow">
      <label className="text-xs font-medium text-[#F7F7F7] mb-2 block">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#1C1C1C] border border-[#CEB86E33] rounded-xl py-3 pl-4 pr-10 text-sm text-[#A39589] placeholder:text-[#4A4A4A] focus:border-[#B7A362] outline-none transition-colors"
        />
        <PasswordToggleIcon visible={show} onClick={() => setShow(!show)} />
      </div>
    </div>
  );
};
