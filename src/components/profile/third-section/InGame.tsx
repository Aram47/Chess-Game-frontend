import { SectionWrapper } from "../../../hooks/sectionWrapper";
import search from "../../../assets/icons/profile/search.svg";
import type { FriendshipRow } from "../../../types/profile";

interface InGameProps {
  friends: FriendshipRow[];
}

const InGame = ({ friends }: InGameProps) => {
    console.log("InGame friends:", friends); // Debug log to check the friends data
  return (
    <div className="w-full flex-1">
      <SectionWrapper title="Friends Online">
        <div className="relative mb-4">
          <img
            src={search}
            width={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
            alt="search"
          />
          <input
            placeholder="Search friends..."
            className="w-full rounded-lg pl-10 py-2 bg-[#232323] text-xs focus:outline-none border border-transparent focus:border-[#E5CC7A]"
          />
        </div>

        <div className="flex flex-col gap-3">
          {friends.length === 0 ? (
            <div className="text-center py-10 bg-[#232323] rounded-xl">
              <p className="text-gray-500 text-sm">No friends yet</p>
              <button className="border border-[#B7A362] text-[#B7A362] px-4 py-1 rounded-full mt-2 text-xs hover:bg-[#B7A362] hover:text-black transition-all">
                Find Players
              </button>
            </div>
          ) : (
            friends.map((f) => (
              <div
                key={f.id}
                className="bg-[#232323] p-3 rounded-xl flex items-center justify-between border border-transparent hover:border-[#E5CC7A33]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#B7A362] flex items-center justify-center text-xs text-black">
                    {f.otherUser.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-bold">
                      {f.otherUser.name} {f.otherUser.surname}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      @{f.otherUser.username}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold">{f.otherUser.elo}</p>
                  <p className="text-[10px] text-green-500">Online</p>
                </div>
              </div>
            ))
          )}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default InGame;
