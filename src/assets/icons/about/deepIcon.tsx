import React from "react";
import { useTheme } from "../../../context/ThemeContext";

export function DeepIcon(props: React.SVGProps<SVGSVGElement>) {
  const { theme } = useTheme();
  const strokeColor = theme === "dark" ? "#F7EFD6" : "#DA7756";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={strokeColor}
      {...props}
    >
      <path
        d="M22 7L13.5 15.5L8.5 10.5L2 17"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 7H22V13"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}