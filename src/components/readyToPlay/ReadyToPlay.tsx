import React, { useState } from "react";
import { usePlay } from "../../hooks/PlayContext";

import monitor from "../../assets/icons/play/monitor.svg";
import user from "../../assets/icons/play/person.svg";

import LivePlayer from "./player";
import PlatformCard from "./platformCard";

type Tab = "platform" | "live";

const ReadyToPlay: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("live");
  const { showModal, setShowModal } = usePlay();

  return (
    <section className="max-w-5xl w-full flex flex-col rounded-2xl mt-25 mx-auto font-barlow relative">
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
            <span className="font-medium text-xl">vs Platform</span>
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

      {activeTab === "live" && (
        <LivePlayer showModal={showModal} setShowModal={setShowModal} />
      )}

      {activeTab === "platform" && (
        <div className="fixed inset-0 top-50 z-50 flex items-start justify-center bg-black/50">
          <PlatformCard
            activeTab="platform"
            onClose={() => setActiveTab("live")}
          />
        </div>
      )}
    </section>
  );
};

export default ReadyToPlay;
