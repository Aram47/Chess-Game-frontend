import TopLeaders from "./TopLeaders";
import InGame from "./InGame";
import type { FriendshipRow } from "../../../types/profile";

interface ThirdSectionProps {
  friends: FriendshipRow[];
}

const ThirdSection = ({ friends }: ThirdSectionProps) => {
  return (
    <section className="w-full flex flex-col lg:flex-row gap-x-8">
      <InGame friends={friends} />
      <TopLeaders />
    </section>
  );
};

export default ThirdSection;
