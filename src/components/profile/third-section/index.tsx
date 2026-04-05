import TopLeaders from "./TopLeaders";
import InGame from "./InGame";

const ThirdSection = () => {
  return (
    <section className="w-full flex flex-col lg:flex-row gap-x-8">
      <InGame />
      <TopLeaders />
    </section>
  );
};

export default ThirdSection;
