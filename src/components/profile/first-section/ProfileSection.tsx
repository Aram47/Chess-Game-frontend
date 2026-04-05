import type { AuthResponse } from "../../../types/authType";
import editIcon from "../../../assets/icons/profile/edit.svg";


const ProfileSection = ({user}: AuthResponse) => {
  return (
    <div className="w-[23%] bg-[#1C1C1C] border border-[#2E2E2E] rounded-2xl p-6 flex flex-col items-center gap-y-6">
      <div className="flex flex-col items-center gap-y-3">
        <div className="w-[54px] h-[54px] bg-[#B7A362] rounded-full flex items-center justify-center text-[#50472B] text-4xl font-normal">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-sm font-normal text-[#676767]">@{user.username}</h2>
        <div className="bg-[#252525] py-1 px-3 rounded-xl flex gap-x-2 items-center text-xs text-gray-500">
          <span className="text-[#B7A362]">847</span>
          <div className="gap-x-2 flex">
            <span>ELO Rating</span>
            <span>|</span>
            <div className="gap-x-1 flex items-baseline">
              <span className="text-[8px]">AM</span>
              <span>Armenia</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#CEB86E33]"></div>
      <button
        className="w-full py-2.5 bg-[#E5CC7A] text-[#1C1C1C] rounded-full font-semibold flex items-center justify-center gap-x-3 hover:bg-[#d4ba69] transition-colors text-sm"
        style={{ boxShadow: "0px 4px 20px 0px #E5CC7A4D" }}
      >
        <span>Edit Profile</span>
        <img src={editIcon} alt="edit" />
      </button>
    </div>
  );
};

export default ProfileSection;
