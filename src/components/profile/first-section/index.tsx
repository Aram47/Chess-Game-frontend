import type { AuthResponse } from "../../../types/authType";
import type { MyProfile } from "../../../types/profile"; // Import your profile type
import ProfileSection from "./ProfileSection";
import SectionList from "./sectionList";

interface FirstSectionProps extends AuthResponse {
  profile: MyProfile;
}

const FirstSection = ({ profile }: FirstSectionProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-y-8 items-stretch gap-x-8 mt-24">
      <ProfileSection profile={profile} />
      <SectionList />
    </div>
  );
};

export default FirstSection;
