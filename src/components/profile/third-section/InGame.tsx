import { SectionWrapper } from "../../../helpers/sectionWrapper";
import search from "../../../assets/icons/profile/search.svg";
import people from "../../../assets/icons/profile/people.svg";

import type { FriendshipRow } from "../../../types/profile";

interface InGameProps {
  friends: FriendshipRow[];
}

const InGame = ({ friends }: InGameProps) => {
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
            className="w-full rounded-lg pl-10 py-2 bg-[#252525] text-xs focus:outline-none border border-transparent focus:border-[#E5CC7A] rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-3">
          {friends.length === 0 ? (
            <div className="text-center py-10 rounded-xl">
              <div className="w-[42px] h-[42px] rounded-full flex justify-center items-center border border-[#E5CC7A26] mx-auto bg-[#E5CC7A14]">
                <img src={people} alt="people" width={24} height={24} />
              </div>
              <div className="flex flex-col gap-y-2 mt-4">
                <p className="text-[#F0EDE8] text-sm">No friends yet</p>
                <p className="text-[#888888]">
                  Connect with other players to see when they're online
                </p>
              </div>

              <button className="border border-[#E5CC7A] text-[#CFCFCF] px-6 py-2.5 mt-4 rounded-full font-semibold text-xs cursor-pointer transition-transform duration-400 hover:-translate-y-[2px] hover:bg-[#E5CC7A1A]">
                Find Players
              </button>
            </div>
          ) : (
            friends.map((f) => (
              <div
                key={f.id}
                    className="bg-[#232323] p-3 rounded-xl flex items-center justify-between border-1 border-solid border-[#CEB86E33]"
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
