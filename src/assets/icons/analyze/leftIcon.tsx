export const LeftIcon = ({ theme }: { theme?: string }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path 
        d="M12 19L5 12M5 12L12 5M5 12H19" 
        stroke={theme ? "#E5CC7A" : "#da7756"} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};