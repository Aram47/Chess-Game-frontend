import { useState } from "react";
import { useProfile } from "../../../context/ProfileContext";
import { useTranslation } from "../../../hooks/useTranslation";

import { EditIcon } from "../../../assets/icons/profile/editIcon";
import { useTheme } from "../../../context/ThemeContext";
import { CameraIcon } from "../../../assets/icons/profile/camera";

const ProfileSection = () => {
  const { t } = useTranslation();
  const { profile, updateProfile } = useProfile();
  const { theme } = useTheme();
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
    <div
      className={`w-[23%] bg-[var(--bg)]] border border-[#CEB86E33] rounded-[20px] p-6 flex flex-col items-center gap-y-6 relative ${theme === "dark" ? "bg-[#2A2A2A4D]" : "bg-[#FFFFFF]"}`}
    >
      <div
        className={`w-[54px] h-[54px] border-1 rounded-full flex items-center justify-center text-[var(--text-h)] text-[32px] font-normal
        ${theme === "dark" ? "border-[#CEB86E33] bg-[#FFFFFF1A]" : "border-[#C155364D] bg-[#C155364D]"}`}
      >
        {profile.username.charAt(0).toUpperCase()}
      </div>
      <span
        className={`text-sm font-normal ${theme === "dark" ? "text-[#676767]" : "text-[#3D4350]"}`}
      >
        @{profile.username}
      </span>
      <div
        className={`py-1 px-3 rounded-xl flex gap-x-2 items-center text-xs text-gray-500 ${theme === "dark" ? "bg-[#252525]" : "bg-[#F4ECE7]"}`}
      >
        {/* Real ELO from API */}
        <span
          className={`${theme === "dark" ? "text-[#B7A362]" : "text-[#DA7756]"}`}
        >
          {profile.elo}
        </span>
        <div className="gap-x-2 flex">
          <span>{t("elo_rating")}</span>
          <span>|</span>
          <div className="gap-x-1 flex items-baseline">
            <span className="text-[8px]">AM</span>
            <span>{t("armenia")}</span>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#CEB86E33]"></div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full py-2.5 bg-[var(--text-h)] text-[var(--bg)] rounded-full font-semibold flex items-center justify-center gap-x-3 cursor-pointer hover:shadow-[0px_4px_20px_0px_#E5CC7A4D] hover:duration-700"
      >
        <span>{t("edit_profile")}</span>
        <EditIcon />
      </button>

      {isModalOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 bg-[#2A2A2ACC]/80 shadow-[0px_8px_32px_0px_#00000080]`}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={`max-w-[600px] p-8 rounded-[20px] w-[502px] border border-[#CEB86E33] relative ${theme === "dark" ? "bg-[#202020]" : "bg-[#FFFFFF]"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header & Close Icon */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="w-full pl-8 pb-6 text-2xl text-[#E5CC7A] font-medium border-b-1 border-b-[#E5CC7A1A]">
                {t("edit_profile")}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#A39589] hover:text-[var(--text-h)] cursor-pointer absolute top-6 right-6"
              >
                ✕
              </button>
            </div>

            {/* Profile Picture Placeholder */}
            <div className="flex flex-col items-center mb-8">
              <div
                className={`w-[100px] h-[100px] rounded-full flex items-center justify-center text-4xl border border-[#B7A362]/20 relative ${theme === "dark" ? "bg-[#252525] text-[#B7A362]" : "bg-[#FFFFFF] text-[#DA7756]"}`}
              >
                {profile.username.charAt(0).toUpperCase()}
                <div
                  className={`absolute bottom-0 right-0 p-1.5 rounded-full border-2 ${theme === "dark" ? "border-[#202020] bg-[#B7A362]" : "border-[#DA775614] bg-[#DA775614]"}`}
                >
                  {/* Camera Icon placeholder - you can use an SVG here */}
                  <CameraIcon />
                </div>
              </div>
              <p className="text-sm text-[#A39589] mt-3">
                {t("upload_photo_hint")}
              </p>
            </div>

            {/* Input Fields */}
            <div className="space-y-5">
              <div>
                <label
                  className={`${theme === "dark" ? "text-[#F7F7F7]" : "text-[#1C1C1C]"} text-sm font-medium mb-2 block`}
                >
                  {t("nickname_label")}
                </label>
                <input
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className={`w-full text-sm border py-3 pl-4 rounded-xl  focus:border-[#B7A362] outline-none ${theme === "dark" ? "bg-[#1C1C1C] text-[#A39589] placeholder:text-[#A39589] border-[#333333]" : "bg-[#F5F5F5] text-[#6B6B6B] placeholder:text-[#6B6B6B] border-[#E5E5E5]"}`}
                  placeholder={t("placeholder_choose_username")}
                />
              </div>

              <div>
                <label
                  className={`${theme === "dark" ? "text-[#F7F7F7]" : "text-[#1C1C1C]"} text-sm font-medium mb-2 block`}
                >
                  {t("email_label")}
                </label>
                <input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full text-sm border py-3 pl-4 rounded-xl  focus:border-[#B7A362] outline-none ${theme === "dark" ? "bg-[#1C1C1C] text-[#A39589] placeholder:text-[#A39589] border-[#333333]" : "bg-[#F5F5F5] text-[#6B6B6B] placeholder:text-[#6B6B6B] border-[#E5E5E5]"}`}
                  placeholder={t("placeholder_email")}
                />
              </div>

              <div>
                <label
                  className={`${theme === "dark" ? "text-[#F7F7F7]" : "text-[#1C1C1C]"} text-sm font-medium mb-2 block`}
                >
                  {t("country_label")}
                </label>
                <input
                  className={`w-full text-sm border py-3 pl-4 rounded-xl  focus:border-[#B7A362] outline-none ${theme === "dark" ? "bg-[#1C1C1C] text-[#A39589] placeholder:text-[#A39589] border-[#333333]" : "bg-[#F5F5F5] text-[#6B6B6B] placeholder:text-[#6B6B6B] border-[#E5E5E5]"}`}
                  placeholder={t("placeholder_choose_country")}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-x-3 mt-8 pr-8 pt-6 border-t-1 border-t-[#E5CC7A1A]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="py-3 px-6 text-[#A39589] rounded-full hover:text-[var(--text-h)] hover:bg-[#2A2A2ACC] font-medium cursor-pointer transition-all duration-800 hover:-translate-y-1 hover:shadow-[0px_4px_20px_0px_#E5CC7A4D]"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleSaveChanges}
                className="py-3 px-6 bg-[var(--text-h)] text-[var(--bg)] rounded-full hover:bg-[var(--text-h)] font-semibold text-sm cursor-pointer transition-all duration-800 hover:-translate-y-1 hover:shadow-[0px_4px_20px_0px_#E5CC7A4D]"
              >
                {t("save_changes")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
