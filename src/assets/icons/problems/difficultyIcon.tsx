import React from "react";
import { useTheme } from "../../../context/ThemeContext";

export function DifficultyIcon(props: React.SVGProps<SVGSVGElement>) {
  const { theme } = useTheme();
  const strokeColor = theme === "dark" ? "#F7EFD6" : "#DA7756";

  return (
    <svg
      width="25"
      height="20"
      viewBox="0 0 25 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={strokeColor}
      {...props}
    >
      <path
        d="M4 4H13M4 10H11M4 16H11M15 13L18 16M18 16L21 13M18 16V4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
