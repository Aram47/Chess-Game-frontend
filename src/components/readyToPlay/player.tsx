import PlayModal from "../../helpers/PlayModal";
import { activeRooms } from "./data";
import { RoomCard } from "./roomCard";

import plusIcon from "../../assets/icons/play/plus.svg";
import joinIcon from "../../assets/icons/play/join.svg";

interface LivePlayerProps {
  showModal: string | null;
  setShowModal: (value: string | null) => void;
}

const LivePlayer = ({ showModal, setShowModal }: LivePlayerProps) => {
  return (
    <div className="flex items-center justify-center gap-x-8 mt-10">
      {showModal === "create" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <PlayModal
            onClose={() => setShowModal(null)}
            title="Create New Room"
            text1="Cancel"
            text2="Create"
          >
            <input
              type="text"
              placeholder="Enter room name"
              className="border-1 border-[#CEB86E33] rounded-lg focus:outline-none focus:ring-2 focus:ring-[CEB86E33] py-3 pl-4"
            />
          </PlayModal>
        </div>
      )}
      <RoomCard
        icon={<img src={plusIcon} alt="plus-icon" />}
        title="Create Room"
        description="Start a private game and invite a friend."
        onClick={() => setShowModal("create")}
      />

      {showModal === "join" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
          <PlayModal onClose={() => setShowModal(null)} title="Active Rooms">
            <div className="flex flex-col gap-y-4 overflow-y-auto max-h-[500px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {activeRooms.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between bg-[#333] rounded-lg px-4 border-1 border-[#CEB86E33]"
                >
                  <div className="flex flex-col py-4">
                    <span className="text-white font-normal text-[#CFCFCF]">
                      {room.name}
                    </span>

                    <p className="flex gap-x-1 items-center text-[#A39589] font-normal text-xs">
                      {room.players}/2 players{" "}
                      <span className="text-xs">&#9679;</span> {room.type}
                    </p>
                  </div>

                  <button className="bg-[#E5CC7A] text-black hover:bg-[#d4b86a] py-3 px-6 rounded-3xl text-sm font-semibold">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </PlayModal>
        </div>
      )}
      <RoomCard
        icon={<img src={joinIcon} alt="Join" />}
        title="Join Room"
        description="Join an existing game and make your move."
        onClick={() => setShowModal("join")}
      />
    </div>
  );
};

export default LivePlayer;
