import ProfileSection from "./ProfileSection";
import SectionList from "./sectionList";

const FirstSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-y-8 items-stretch gap-x-8 mt-24">
      <ProfileSection />
      <SectionList />
    </div>
  );
};

export default FirstSection;
