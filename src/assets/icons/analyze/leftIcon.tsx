export const LeftIcon = ({ theme }: { theme?: "dark" | "light" | string }) => {
  const fillColor = theme === "dark" ? "#E5CC7A" : "#DA7756";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5L5 12L12 19M5 12H19"
        stroke={fillColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
