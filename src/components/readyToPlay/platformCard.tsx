import PlayModal from "../../helpers/PlayModal";

const PlatformCard = ({
  activeTab,
  onClose,
}: {
  activeTab?: string;
  onClose: () => void;
}) => {
  return (
    <PlayModal
      onClose={onClose}
      className={`${
        activeTab === "platform" ? "max-w-[1280px] w-full" : "max-w-md w-full"
      }`}
      style={{
        background: "rgba(28, 28, 28, 0.80)",
        border: "1px solid rgba(206, 184, 110, 0.20)",
        boxShadow: "0px 8px 32px 0px rgba(28, 28, 28, 0.50)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="flex flex-col items-center gap-y-6 p-6">
        <h2 className="mx-auto text-xl font-bold mb-4">Choose Difficulty</h2>

        <div className="w-full grid grid-cols-3 items-center gap-x-6">
          <div className="flex flex-col items-center bg-[#7FC4741A] rounded-[90px] py-2.5">
            <h2 className="text-[#307D24]">Easy</h2>
            <span className="text-[#A39589]">Begginer Friendly</span>
          </div>
          <div className="flex flex-col items-center bg-[#B7A3621A] rounded-[90px] py-2.5">
            <h2 className="text-[#B7A362]">Medium</h2>
            <span className="text-[#A39589]">Begginer Friendly</span>
          </div>
          <div className="flex flex-col items-center bg-[#AD14141A] rounded-[90px] py-2.5">
            <h2 className="text-[#AD1414]">Hard</h2>
            <span className="text-[#A39589]">Begginer Friendly</span>
          </div>
        </div>

        <button
          className="max-w-[382px] w-full bg-blue-500 py-4.5 mt-4.5 rounded-[90px] hover:bg-blue-600 transition text-[#1C1C1C] font-semibold"
          style={{
            background: "linear-gradient(180deg, #E5CC7A 0%, #F4E09E 100%)",
            boxShadow: "0px 4px 20px 0px #E5CC7A4D",
          }}
        >
          Start Game
        </button>
      </div>
    </PlayModal>
  );
};

export default PlatformCard;
