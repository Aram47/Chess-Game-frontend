import { useState } from "react";
import Notifications from "./Notifications";
import Security from "./Security";
import Privacy from "./Privacy";
import { NavButton } from "../../helpers/buttons";

interface SettingsModalProps {
  onClose?: () => void;
}

const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const [notifications, setNotifications] = useState({
    gameInvites: true,
    friendRequests: false,
  });

  const [privacy, setPrivacy] = useState({
    showOnlineStatus: true,
  });

  const handleSave = () => {
    // handle save logic
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 bg-[#1C1C1C1A]/80 backdrop-blur-xs flex items-center justify-center z-50 font-barlow"
      onClick={onClose}
    >
      <div
        className="relative max-w-[600px] max-h-[90vh] overflow-y-scroll bg-[#2A2A2ACC] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full rounded-[20px] border border-[#CEB86E33] shadow-[0px_8px_32px_0px_#000000] bg-[#1C1C1CCC] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-y-8">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#A39589] hover:text-[#E5CC7A] transition-colors text-2xl cursor-pointer"
          >
            ✕
          </button>

          <div className="text-2xl font-medium text-[#E5CC7A] boder-b-1 border-b-[#E5CC7A]">
            <span className="pb-6">Settings</span>
          </div>

          {/* Password & Security */}
          <Security />

          {/* Notifications */}
          <Notifications
            notifications={notifications}
            setNotifications={setNotifications}
          />

          {/* Privacy */}
          <Privacy privacy={privacy} setPrivacy={setPrivacy} />

          {/* Footer */}
          <div className="flex justify-end gap-2.5 pt-6 border-t border-[#E5CC7A1A]">
            <NavButton
              onClick={onClose}
              className="py-2.5 px-5 text-[#A39589] rounded-full hover:text-[#E5CC7A] hover:bg-[#2A2A2ACC] font-medium cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_4px_20px_0px_#E5CC7A1A]"
              text="Cancel"
            />

            <NavButton
              onClick={handleSave}
              className="py-2.5 px-5 bg-[linear-gradient(180deg,#E5CC7A_0%,#F4E09E_100%)] text-[#1C1C1C] rounded-full font-semibold text-sm cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_4px_20px_0px_#E5CC7A4D]"
              text="Save changes"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
