import React from "react";

interface NavButtonProps {
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const NavButton = React.forwardRef<HTMLButtonElement, NavButtonProps>(
  ({ text, icon, onClick, className }, ref) => (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 transition-all cursor-pointer ${className}`}
    >
      {text && <span>{text}</span>}
      <span className="flex items-center justify-center">{icon}</span>
    </button>
  ),
);

NavButton.displayName = "NavButton";
