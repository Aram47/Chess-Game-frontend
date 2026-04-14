
import React from "react";

interface NavButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const NavButton = React.forwardRef<HTMLButtonElement, NavButtonProps>(
  ({ icon, onClick, className }, ref) => (
    <button 
      type="button" 
      ref={ref} 
      onClick={onClick} 
      className={className}
    >
      {icon}
    </button>
  )
);

NavButton.displayName = "NavButton";