import { Achievement } from "./achievement";
import { SectionWrapper } from "../../../helpers/sectionWrapper";
import figure from "../../../assets/icons/figures/figure.png";
import problems from "../../../assets/icons/profile/problems.png";
import grandmaster from "../../../assets/icons/profile/grandmaster.png";
import elo from "../../../assets/icons/profile/elo.png";
import legend from "../../../assets/icons/profile/legend.png";

const SectionList = () => {
  return (
    <div className="w-full flex flex-col gap-y-8">
      <SectionWrapper
        title="Achievements"
        extra="5 of 10 unlocked"
        complete="50% Complete"
      >
        <div className="flex gap-4 overflow-x-auto p-y-6 scrollbar-hide">
          <Achievement
            icon={<img src={figure} alt="figure" width={35} height={35} />}
            label="First Win"
            unlocked={true}
          />
          <Achievement
            icon={<span style={{ fontSize: "25px" }}>🏆</span>}
            label="5 Wins"
            unlocked={true}
          />
          <Achievement
            icon={<span style={{ fontSize: "25px" }}>🏆</span>}
            label="10 Wins"
            unlocked={true}
          />
          <Achievement
            icon={<span style={{ fontSize: "25px" }}>🧩</span>}
            label="Problems"
            count="5"
            unlocked={true}
          />
          <Achievement
            icon={<span style={{ fontSize: "25px" }}>🔥</span>}
            label="Expert"
            unlocked={true}
          />
          <Achievement
            icon={
              <img src={grandmaster} alt="grandmaster" width={35} height={35} />
            }
            label="Hunter"
            unlocked={false}
          />
          <Achievement
            icon={<img src={problems} alt="problems" width={35} height={35} />}
            label="Hunter"
            unlocked={false}
          />
          <Achievement
            icon={<img src={elo} alt="elo" width={35} height={35} />}
            label="Hunter"
            unlocked={false}
          />
          <Achievement
            icon={<img src={legend} alt="legend" width={35} height={35} />}
            label="Hunter"
            unlocked={false}
          />
        </div>
      </SectionWrapper>
    </div>
  );
};

export default SectionList;
