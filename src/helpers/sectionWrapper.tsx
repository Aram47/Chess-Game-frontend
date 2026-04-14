export const SectionWrapper = ({
  title,
  children,
  extra,
  complete,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  extra?: string;
  complete?: string;
  className?: string;
}) => (
    <div className={`w-full bg-[#1C1C1C] border border-[#CEB86E33] rounded-2xl p-6 h-full flex flex-col gap-y-6 min-h-[261px] ${className || ''}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-gray-400 text-lg font-medium flex flex-col ">
          {title}{" "}
          {extra && (
            <span className="text-[#676767] text-xs font-normal">{extra}</span>
          )}
        </h3>

        {complete && (
          <div className="bg-[#B7A362] rounded-md flex justify-center items-center font-medium text-sm py-2.5 px-4.5 text-[#1A1100]">
            {complete}
          </div>
        )}
      </div>

      {children}
    </div>
);
