import deepIcon from "../../assets/icons/about/deep.svg";
import professionalIcon from "../../assets/icons/about/analysis.svg";
import feedbackIcon from "../../assets/icons/about/feedback.svg";

const OurStory = () => {
  return (
    <>
      <section
        className="bg-white/[0.03] backdrop-blur-md rounded-3xl p-8 md:p-10 mb-8"
        style={{
          borderImageSource:
            "linear-gradient(178.16deg, rgba(206, 184, 110, 0.2) 1.3%, rgba(104, 93, 56, 0.2) 97.77%)",
          borderImageSlice: 1,
          border: "1px solid transparent",
        }}
      >
        <h2 className="text-2xl font-medium text-[#E5CC7A] mb-4">Our Story</h2>
        <p className="text-md leading-relaxed text-[#A39589] my-3">
          ChessMaster started in 2026 when two friends — Jay and Erik (that's
          me!) — decided the world needed a better chess website. We met 10
          years earlier in college, where I first became addicted to chess — and
          Jay was the chess club president. We became friends through our shared
          passion for the game. There were places to play online, but none of
          them felt like home. We imagined a place where people could build
          their chess home online and all in one place: to play in a safe and
          friendly environment, find friends, save their games, tell their chess
          stories, share ideas, and learn from each other. Over the next several
          years.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-medium text-[#E5CC7A] mx-0">
              Our Mission
            </h2>
            <p className="text-md text-[#A39589] leading-relaxed mt-3">
              To democratize chess education by providing accessible, AI-powered
              training tools that help players understand the game at a deeper
              level.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex gap-x-4">
            <div className="bg-[#FFFFFF0D] rounded-full h-[40px] w-[40px] flex shrink-0 items-center justify-center">
              <img
                src={feedbackIcon}
                alt="Feedback Icon"
                width={20}
                height={20}
              />
            </div>
            <div>
              <h3 className="font-normal text-[#F7EFD6]">Instant Feedback</h3>
              <p className="text-md text-[#A39589] leading-relaxed my-2">
                Get real-time insights and alternative moves as you analyze your
                games.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex gap-x-4">
            <div className="bg-[#FFFFFF0D] rounded-full h-[40px] w-[40px] flex shrink-0 items-center justify-center">
              <img src={deepIcon} alt="deepIcon" width={20} height={20} />
            </div>
            <div>
              <h3 className="font-normal text-[#F7EFD6]">Deep Understanding</h3>
              <p className="text-md text-[#A39589] leading-relaxed my-2">
                We explain the "why" behind every move, not just the
                "what"—helping you develop genuine chess intuition.
              </p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex gap-x-4">
            <div className="bg-[#FFFFFF0D] rounded-full h-[40px] w-[40px] flex shrink-0 items-center justify-center">
              <img
                src={professionalIcon}
                alt="professionalIcon"
                width={20}
                height={20}
              />
            </div>
            <div>
              <h3 className="font-normal text-[#F7EFD6]">
                Professional Analysis
              </h3>
              <p className="text-md text-[#A39589] leading-relaxed my-2">
                Access the kind of analysis previously available only to elite
                players with personal coaches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStory;
