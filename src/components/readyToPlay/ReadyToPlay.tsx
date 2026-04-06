import React, { useState } from "react";
import monitor from "../../assets/icons/play/monitor.svg";
import user from "../../assets/icons/play/person.svg";
import plusIcon from "../../assets/icons/play/plus.svg";
import joinIcon from "../../assets/icons/play/join.svg";
import { RoomCard } from "./roomCard";

type Tab = "platform" | "live";

const ReadyToPlay: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("live");

  return (
    <section className="max-w-5xl w-full flex flex-col rounded-2xl mt-25 mx-auto font-barlow">
      <div className="flex flex-col items-center gap-y-8">
        <div className="flex flex-col items-center gap-y-8">
          <h1 className="text-5xl font-medium text-[var(--color-gold)]">
            Ready To Play ?
          </h1>
          <p className="text-xl font-medium text-[var(--muted)]">
            Choose your opponent, set the challenge, and start playing.
          </p>
        </div>

        {/* Tabs */}
        <div className="inline-flex bg-[#2a2a2a] border-1 border-[#CEB86E33] rounded-full gap-1 py-2.5 px-6">
          <button
            onClick={() => setActiveTab("platform")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeTab === "platform"
                ? "bg-[#E5CC7A] text-black"
                : "bg-transparent text-white hover:text-gray-300"
            }`}
          >
            <img src={monitor} alt="Monitor" />
            <span className="font-medium text-xl">
                vs Platform
            </span>
          </button>
          <button
            onClick={() => setActiveTab("live")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeTab === "live"
                ? "bg-[#E5CC7A] text-black"
                : "bg-transparent hover:text-gray-300"
            }`}
          >
            <img src={user} alt="user" />
            vs Live Player
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="flex items-center justify-center gap-x-8 mt-10">
        {}
        <RoomCard
          icon={<img src={plusIcon} alt="plus-icon" />}
          title="Create Room"
          description="Start a private game and invite a friend."
        />
        <RoomCard
          icon={<img src={joinIcon} alt="Join" />}
          title="Join Room"
          description="Join an existing game and make your move."
        />
      </div>
    </section>
  );
};

export default ReadyToPlay;
