import React, { useState } from "react";

import monitor from "../../assets/icons/play/platform.svg";
import user from "../../assets/icons/play/player.svg";

import LivePlayer from "./player";
import PlatformCard from "./platformCard";

type Tab = "platform" | "live" | null;

const ReadyToPlay: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(null);

  const handleClose = () => setActiveTab(null);

  return (
    <section className="max-w-5xl w-full flex flex-col rounded-[20px] mt-25 mx-auto font-barlow relative">
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
          <div
            onClick={() => setActiveTab("platform")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeTab === "platform"
                ? "bg-[#E5CC7A] text-black"
                : "text-white"
            }`}
          >
            <div className="rounded-[5px] w-6 h-6 flex items-center justify-center bg-[#E5CC7A33]">
              <img src={monitor} alt="monitor" className="w-4.5 h-4" />
            </div>
            <span className="font-medium text-xl">vs Platform</span>
          </div>

          <div
            onClick={() => setActiveTab("live")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeTab === "live" ? "bg-[#E5CC7A] text-black" : "text-white"
            }`}
          >
            <div className="rounded-[5px] w-6 h-6 flex items-center justify-center bg-[#E5CC7A33]">
              <img
                src={user}
                alt="user"
                className="w-4.5 h-4"
                style={{
                  filter: activeTab === "live" ? "brightness(0)" : "none",
                }}
              />
            </div>

            <span className="font-medium text-xl">vs Live Player</span>
          </div>
        </div>
      </div>

      {/* Conditionally Render Components */}
      {activeTab === "platform" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <PlatformCard onClose={handleClose} activeTab="platform" />
        </div>
      )}

      {activeTab === "live" && <LivePlayer onClose={handleClose} />}
    </section>
  );
};

export default ReadyToPlay;
