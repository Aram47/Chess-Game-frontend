import { Link } from "react-router-dom";
import PlayModal from "../../helpers/PlayModal";
import { useState } from "react";

const PlatformCard = ({
  activeTab,
  onClose,
}: {
  activeTab?: string;
  onClose: () => void;
}) => {
  const [selected, setSelected] = useState("easy");

  return (
    <PlayModal
      onClose={onClose}
      className={`${activeTab === "platform" ? "w-full mx-20" : "max-w-md"}`}
      style={{
        background: "rgba(28, 28, 28, 0.80)",
        border: "1px solid rgba(206, 184, 110, 0.20)",
        boxShadow: "0px 8px 32px 0px rgba(28, 28, 28, 0.50)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="flex flex-col items-center gap-y-6 p-6">
        <h2 className="mx-auto text-xl font-bold mb-4">Select Difficulty</h2>

        <div className="w-full grid grid-cols-3 items-center gap-x-6">
          <div
            onClick={() => setSelected("easy")}
            className={`flex flex-col items-center rounded-[90px] py-2.5 cursor-pointer transition-all duration-300 border ${
              selected === "easy"
                ? "bg-[#7FC4741A] -translate-y-1 border-[#307D24]"
                : "bg-[#7FC4741A] border-transparent"
            }`}
          >
            <h2 className="text-[#307D24]">Easy</h2>
            <span className="text-[#A39589]">Begginer Friendly</span>
          </div>

          <div
            onClick={() => setSelected("medium")}
            className={`flex flex-col items-center rounded-[90px] py-2.5 cursor-pointer transition-all duration-300 border ${
              selected === "medium"
                ? "bg-[#B7A3621A] -translate-y-1 border-[#B7A362]"
                : "bg-[#B7A3621A] border-transparent"
            }`}
          >
            <h2 className="text-[#B7A362]">Medium</h2>
            <span className="text-[#A39589]">Begginer Friendly</span>
          </div>

          <div
            onClick={() => setSelected("hard")}
            className={`flex flex-col items-center rounded-[90px] py-2.5 cursor-pointer transition-all duration-300 border ${
              selected === "hard"
                ? "bg-[#AD14141A] -translate-y-1 border-[#AD1414]"
                : "bg-[#AD14141A] border-transparent"
            }`}
          >
            <h2 className="text-[#AD1414]">Hard</h2>
            <span className="text-[#A39589]">Begginer Friendly</span>
          </div>
        </div>

        <Link
          to="/play/game"
          className="max-w-[382px] w-full bg-blue-500 py-4.5 mt-4.5 rounded-[90px] hover:bg-blue-600 transition text-[#1C1C1C] font-semibold text-center"
          style={{
            background: "linear-gradient(180deg, #E5CC7A 0%, #F4E09E 100%)",
            boxShadow: "0px 4px 20px 0px #E5CC7A4D",
          }}
        >
          Start Game
        </Link>
      </div>
    </PlayModal>
  );
};

export default PlatformCard;
