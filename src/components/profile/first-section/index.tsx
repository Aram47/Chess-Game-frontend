import type { AuthResponse } from "../../../types/authType";
import ProfileSection from "./ProfileSection";
import SectionList from "./sectionList";

const FirstSection = ({ user }: AuthResponse) => {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-y-8 items-stretch gap-x-8 mt-24">
      <ProfileSection user={user} />
      <SectionList />
    </div>
  );
};

export default FirstSection;
