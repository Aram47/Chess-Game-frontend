// Reusable Button Component for Bottom Nav
export const NavButton = ({
  icon,
  label,
  isLight,
}: {
  icon: React.ReactNode;
  label: string;
  isLight?: boolean;
}) => (
  <button
    className={`
    flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center
    ${
      isLight
        ? "bg-[#e9cf8b]/80 hover:bg-[#e9cf8b] text-black"
        : "bg-[#2a2a2a] hover:bg-[#333] text-gray-200"
    }
  `}
  >
    {icon}
    <span className="text-semibold text-text">{label}</span>
  </button>
);
