import type { Game } from "../types/gameType";

export const SectionWrapper = ({
  title,
  children,
  extra,
  complete,
  className,
  games = [],
}: {
  title?: string;
  children: React.ReactNode;
  extra?: string;
  complete?: string;
  className?: string;
  games?: Game[]
}) => (
  <div
    className={`w-full bg-[#1C1C1C] border border-[#CEB86E33] rounded-[20px] p-6 h-full flex flex-col gap-y-6 min-h-[261px] ${className || ""}`}
  >
    <div className="flex justify-between items-center">
      <h3 className="text-[#F0EDE8] text-lg font-medium flex flex-col ">
        {title}{" "}
        {extra && games?.length > 0 && (
          <span className="text-[#676767] text-xs font-normal">{extra}</span>
        )}
      </h3>

      {complete && (
        <div className="flex justify-center items-center font-medium text-sm py-2.5 px-4.5 text-[#E5CC7A]">
          {complete}
        </div>
      )}
    </div>

    {children}
  </div>
);
