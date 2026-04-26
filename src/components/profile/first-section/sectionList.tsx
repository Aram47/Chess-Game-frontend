import { Achievement } from "./achievement";
import { SectionWrapper } from "../../../helpers/sectionWrapper";
import pawn from "../../../assets/icons/profile/profile/pawn.svg";
import star from "../../../assets/icons/profile/profile/star.svg";
import cup from "../../../assets/icons/profile/profile/cup.svg";
import problems from "../../../assets/icons/profile/profile/problems.svg";
import expert from "../../../assets/icons/profile/profile/expert.svg";
import master from "../../../assets/icons/profile/profile/master.svg";
import grandmaster from "../../../assets/icons/profile/profile/grandmaster.svg";
import speed from "../../../assets/icons/profile/profile/speed.svg";
import elo from "../../../assets/icons/profile/profile/elo.svg";
import legend from "../../../assets/icons/profile/profile/legend.svg";

const SectionList = () => {
  return (
    <div className="w-full flex flex-col gap-y-8">
      <SectionWrapper
        title="Achievements"
        extra="5 of 10 unlocked"
        complete="50% Complete"
      >
        <div className="relative flex items-center w-full h-2.5">
          <div className="w-full h-2 rounded-full border border-[#CEB86E]/40 bg-black/60 backdrop-blur-md overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent h-2.5"></div>

            <div className="absolute left-1/2 top-0 w-1 h-full bg-[#CEB86E]/20"></div>
          </div>

          <div className="absolute left-0 w-2 h-2 rounded-full bg-gradient-to-b from-[#FFEBB0] via-[#CEB86E] to-[#A88B45] shadow-[0_0_8px_rgba(206,184,110,0.6)] border border-[#FFF5D1]/50"></div>
        </div>
        <div className="flex gap-4 overflow-visible p-y-6 scrollbar-hide">
          <Achievement
            icon={<img src={pawn} alt="pawn" width={35} height={35} />}
            label="First Win"
            text="Win your first chess game"
            unlocked={true}
          />
          <Achievement
            icon={<img src={star} alt="star" />}
            label="5 Wins"
            text="Achieve total 5 victories"
            unlocked={true}
          />
          <Achievement
            icon={<img src={cup} alt="cup" />}
            label="10 Wins"
            text="Achieve total 10 victories"
            unlocked={true}
          />
          <Achievement
            icon={<img src={problems} alt="problems" />}
            label="Problems"
            text="Solve 50 chess puzzles"
            count="5"
            unlocked={true}
          />
          <Achievement
            icon={<img src={expert} alt="expert" />}
            label="Expert"
            text="Win 100 total games"
            unlocked={true}
          />
          <Achievement
            icon={<img src={master} alt="master" />}
            label="Master"
            text="Win 10 hard games in a raw"
            unlocked={false}
          />
          <Achievement
            icon={
              <img src={grandmaster} alt="grandmaster" width={35} height={35} />
            }
            label="Grandmaster"
            text="Reach ELO rating of 2500"
            unlocked={false}
          />
          <Achievement
            icon={<img src={speed} alt="speed" width={35} height={35} />}
            label="Speed"
            text="Win a game under 3 minutes"
            unlocked={false}
          />
          <Achievement
            icon={<img src={elo} alt="elo" width={35} height={35} />}
            label="Elo 2000"
            text="Achieve Elo rating of 2000"
            unlocked={false}
          />
          <Achievement
            icon={<img src={legend} alt="legend" width={35} height={35} />}
            label="Legend"
            text="Win 500 total games"
            unlocked={false}
          />
        </div>
      </SectionWrapper>
    </div>
  );
};

export default SectionList;
