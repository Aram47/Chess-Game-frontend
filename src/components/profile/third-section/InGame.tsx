import { SectionWrapper } from "../../../hooks/sectionWrapper";

import search from "../../../assets/icons/profile/search.svg";

const InGame = () => {
  return (
    <div className="w-full flex-1 flex items-center gap-x-8">
      <SectionWrapper title="Friends Online">
        <div className="relative rounded-lg border-[#FFFFFF12] py-2 px-3 bg-[#232323] flex gap-x-3">
          <img
            src={search}
            width={16}
            height={16}
            alt="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
          />
          <input
            placeholder="Search friends..."
            className="w-full rounded-lg pl-6 text-xs focus:outline-none focus:border-[#E5CC7A]"
          />
        </div>
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="bg-[#232323] p-3 rounded-xl flex items-center justify-between border border-transparent hover:border-[#E5CC7A33]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs">
                  A
                </div>
                <div>
                  <p className="text-xs font-bold">Alexandra Chen</p>
                  <p className="text-[10px] text-gray-500">@alex_chess</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold">2458</p>
                <p className="text-[10px] text-green-500">Online</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default InGame;
