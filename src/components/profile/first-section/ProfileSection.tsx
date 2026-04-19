import { useState } from "react";
import { useProfile } from "../../../hooks/ProfileContext";

import camera from "../../../assets/icons/profile/camera.svg";
import editIcon from "../../../assets/icons/profile/edit.svg";

const ProfileSection = () => {
  const { profile, updateProfile } = useProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    username: profile?.username || "",
    email: profile?.email || "",
  });

  if (!profile) return null;

  const handleSaveChanges = async () => {
    await updateProfile(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="w-[23%] bg-[#1C1C1C] border border-[#CEB86E33] rounded-[20px] p-6 flex flex-col items-center gap-y-6 relative">
      <div className="w-[54px] h-[54px] bg-[#B7A362] rounded-full flex items-center justify-center text-[#50472B] text-4xl font-normal">
        {profile.username.charAt(0).toUpperCase()}
      </div>
      <h2 className="text-sm font-normal text-[#676767]">
        @{profile.username}
      </h2>
      <div className="bg-[#252525] py-1 px-3 rounded-xl flex gap-x-2 items-center text-xs text-gray-500">
        {/* Real ELO from API */}
        <span className="text-[#B7A362]">{profile.elo}</span>
        <div className="gap-x-2 flex">
          <span>ELO Rating</span>
          <span>|</span>
          <div className="gap-x-1 flex items-baseline">
            <span className="text-[8px]">AM</span>
            <span>Armenia</span>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#CEB86E33]"></div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full py-2.5 bg-[#E5CC7A] text-[#1C1C1C] rounded-full font-semibold flex items-center justify-center gap-x-3 cursor-pointer hover:shadow-[0px_4px_20px_0px_#E5CC7A4D] hover:duration-700"
      >
        <span>Edit Profile</span>
        <img src={editIcon} alt="edit" />
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-[#2A2A2ACC]/80 flex items-center justify-center z-50  font-barlow shadow-[0px_8px_32px_0px_#00000080]"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="max-w-[600px] bg-[#202020] p-8 rounded-[20px] w-[502px] border border-[#CEB86E33] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header & Close Icon */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="w-full pl-8 pb-6 text-2xl text-[#E5CC7A] font-medium border-b-1 border-b-[#E5CC7A1A]">
                Edit Profile
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#A39589] hover:text-[#E5CC7A] cursor-pointer absolute top-6 right-6"
              >
                ✕
              </button>
            </div>

            {/* Profile Picture Placeholder */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-[100px] h-[100px] bg-[#252525] rounded-full flex items-center justify-center text-[#B7A362] text-4xl border border-[#B7A362]/20 relative">
                {profile.username.charAt(0).toUpperCase()}
                <div className="absolute bottom-0 right-0 bg-[#B7A362] p-1.5 rounded-full border-2 border-[#202020]">
                  {/* Camera Icon placeholder - you can use an SVG here */}
                  <img src={camera} alt="" />
                </div>
              </div>
              <p className="text-sm text-[#A39589] mt-3">
                Click the camera icon to upload a new photo
              </p>
            </div>

            {/* Input Fields */}
            <div className="space-y-5">
              <div>
                <label className="text-sm text-[#F7F7F7] font-medium mb-2 block">
                  Nickname
                </label>
                <input
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full bg-[#1C1C1C] text-sm border border-[#333333] py-3 pl-4 rounded-xl text-[#A39589] placeholder:text-[#A39589] focus:border-[#B7A362] outline-none"
                  placeholder="Choose a username"
                />
              </div>

              <div>
                <label className="text-sm text-[#F7F7F7] font-medium mb-2 block">
                  Email
                </label>
                <input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full text-[#A39589] bg-[#181818] border border-[#333333] p-3.5 rounded-xl text-sm focus:border-[#B7A362] outline-none placeholder:text-[#A39589]"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="text-sm text-[#F7F7F7] font-medium mb-2 block">
                  Country
                </label>
                <input
                  className="w-full bg-[#181818] text-sm border border-[#333333] p-3.5 rounded-xl text-white focus:border-[#B7A362] outline-none placeholder:text-[#A39589]"
                  placeholder="Choose a country"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-x-3 mt-8 pr-8 pt-6 border-t-1 border-t-[#E5CC7A1A]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="py-3 px-6 text-[#A39589] rounded-full hover:text-[#E5CC7A] hover:bg-[#2A2A2ACC] font-medium cursor-pointer transition-all duration-800 hover:-translate-y-1 hover:shadow-[0px_4px_20px_0px_#E5CC7A4D]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="py-3 px-6 bg-[linear-gradient(180deg,#E5CC7A_0%,#F4E09E_100%)] text-[#1C1C1C] rounded-full hover:bg-[#d6be6f] font-semibold text-sm cursor-pointer transition-all duration-800 hover:-translate-y-1 hover:shadow-[0px_4px_20px_0px_#E5CC7A4D]"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
