import React from "react";

export const NavButton = React.forwardRef<
  HTMLButtonElement,
  {
    icon: React.ReactNode;
    label: string;
    isLight?: boolean;
    onClick?: () => void;
  }
>(({ icon, label, isLight, onClick }, ref) => (
  <button
    type="button"
    ref={ref}
    onClick={onClick}
    className={`
      flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer
      ${
        isLight
          ? "bg-[#e9cf8b]/80 hover:bg-[#e9cf8b] text-black"
          : "bg-[#2a2a2a] hover:bg-[#333] text-gray-200"
      }
    `}
  >
    {icon}
    <span className="font-semibold">{label}</span>
  </button>
));

NavButton.displayName = "NavButton";
