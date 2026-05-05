import { useState } from "react";
import PlayModal from "../../helpers/PlayModal";
import { RoomCard } from "./roomCard";
import { activeRooms } from "./data";
import { Link } from "react-router-dom";
import plusIcon from "../../assets/icons/play/plus.svg";
import joinIcon from "../../assets/icons/play/join.svg";

type ModalType = "create" | "join" | null;

interface Props {
  onClose: () => void;
  onStartLive: () => void;
}

const LivePlayer = ({ onClose, onStartLive }: Props) => {
  const [subModal, setSubModal] = useState<ModalType>(null);
  const [onHover] = useState(false);
  const handleJoinGame = () => {
    onStartLive(); // This triggers findMatch and navigation
  };
  return (
    <div className="flex items-center justify-center gap-x-8 mt-10">
      {subModal === "create" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <PlayModal
            onClose={onClose}
            title="Create New Room"
            text1="Cancel"
            text2="Create"
          >
            <input
              type="text"
              placeholder="Enter room name"
              className="border border-[#CEB86E33] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5CC7A] py-3 pl-4 bg-[#1c1c1c] text-white"
            />
          </PlayModal>
        </div>
      )}

      <RoomCard
        icon={<img src={plusIcon} alt="plus-icon" />}
        title="Create Room"
        description="Start a private game and invite a friend."
        onClick={() => setSubModal("create")}
        onHover={onHover}
      />

      {subModal === "join" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <PlayModal onClose={onClose} title="Active Rooms">
            <div className="flex flex-col gap-y-4 overflow-y-scroll max-h-[500px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {activeRooms.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between bg-[#333] rounded-lg px-4 border border-[#CEB86E33]"
                >
                  <div className="flex flex-col py-4">
                    <span className="text-white font-normal">{room.name}</span>
                    <p className="flex gap-x-1 items-center text-[#A39589] font-normal text-xs">
                      {room.players}/2 players <span>&#9679;</span> {room.type}
                    </p>
                  </div>
                  <Link
                    to="/play/game"
                    onClick={handleJoinGame}
                    className="bg-[#E5CC7A] text-black hover:bg-[#d4b86a] py-3 px-6 rounded-3xl text-sm font-semibold"
                  >
                    Join
                  </Link>
                </div>
              ))}
            </div>
          </PlayModal>
        </div>
      )}

      <RoomCard
        icon={<img src={joinIcon} alt="Join" className="fill-[#D4AF37]" />}
        title="Join Room"
        description="Join an existing game and make your move."
        onClick={() => setSubModal("join")}
        onHover={onHover}
      />
    </div>
  );
};

export default LivePlayer;
