import { SectionWrapper } from "../../../hooks/sectionWrapper";

const TopLeaders = () => {
  return (
    <div className="w-full flex flex-1 items-center gap-x-8">
      <SectionWrapper title="Top 10 ELO Leaders">
        <div className="flex-1 flex flex-col gap-2">
          {[
            { rank: 1, name: "Magnus Carlsen", elo: 2830, change: 12 },
            { rank: 2, name: "Ding Liren", elo: 2799, change: 8 },
            {
              rank: 3,
              name: "Ian Nepomniachtchi",
              elo: 2799,
              change: -2,
            },
            {
              rank: 4,
              name: "Ian Nepomniachtchi",
              elo: 2799,
              change: -2,
            },
          ].map((leader) => (
            <div
              key={leader.rank}
              className="bg-[#232323] p-4 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <span className="text-gray-500 font-bold w-4">
                  {leader.rank}
                </span>
                <div>
                  <p className="text-sm font-bold">{leader.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase">NOR</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold">{leader.elo}</span>
                <span
                  className={`text-[10px] ${leader.change > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {leader.change > 0 ? `+${leader.change}` : leader.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default TopLeaders;
