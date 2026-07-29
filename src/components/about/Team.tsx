import Aram from "../../assets/icons/about/Aram.png";
import Tigran from "../../assets/icons/about/Tigran.png";
import Arthur from "../../assets/icons/about/Arthur.jpg";
import Sona from "../../assets/icons/about/Sona.png";
import Nver from "../../assets/icons/about/Nver.png";
import { useTranslation } from "../../hooks/useTranslation";
import type { StringKey } from "../../constants/strings";
import { useTheme } from "../../context/ThemeContext";

const Team = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const team: {
    name: string;
    roleKey: StringKey;
    bioKey: StringKey;
    img: string;
  }[] = [
    {
      name: "Nver Stepanyan",
      roleKey: "team_role_founder",
      bioKey: "team_bio_nver",
      img: Nver,
    },
    {
      name: "Aram Minasyan",
      roleKey: "team_role_software_engineer",
      bioKey: "team_bio_aram",
      img: Aram,
    },
    {
      name: "Tigran Yavroyan",
      roleKey: "team_role_software_developer",
      bioKey: "team_bio_tigran",
      img: Tigran,
    },
    {
      name: "Arthur Baghdanyan",
      roleKey: "team_role_front_end_developer",
      bioKey: "team_bio_arthur",
      img: Arthur,
    },
    {
      name: "Sona Gevorgyan",
      roleKey: "team_role_product_designer",
      bioKey: "team_bio_sona",
      img: Sona,
    },
  ];

  const renderMember = (member: (typeof team)[0], idx: number) => (
    <div
      key={idx}
      className={`max-w-[250px] w-full backdrop-blur-md border border-[#FFFFFF0D] rounded-[20px] p-6 text-center flex flex-col gap-y-2 items-center ${
        theme === "dark" ? "bg-white/[0.03]" : "bg-white/90"
      }`}
    >
      <img
        src={member.img}
        alt={member.name}
        className="w-20 h-20 bg-white/5 border-none object-cover rounded-full overflow-hidden"
        style={idx === 0 ? { objectPosition: "0 -3px" } : undefined}
      />
      <div>
        <h4
          className={`font-medium text-xl`}
          style={{
            color: theme === "dark" ? "#E5CC7A" : "#A45941",
          }}
        >
          {member.name}
        </h4>
        <p className="text-sm capitalize tracking-wider"
         style={{
            color: theme === "dark" ? "#A39589" : "#5E6470",
          }}
        >
          {t(member.roleKey)}
        </p>
      </div>
      <p className="text-sm leading-relaxed" style={{
            color: theme === "dark" ? "#A39589" : "#5E6470",
          }}>
        {t(member.bioKey)}
      </p>
    </div>
  );

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-medium text-[#E5CC7A] text-center mb-5.5">
        {t("meet_our_team")}
      </h2>
      <div className="flex justify-center w-full">
        {team.slice(0, 1).map((member, idx) => renderMember(member, idx))}
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.slice(1).map((member, idx) => renderMember(member, idx))}
      </div>
    </section>
  );
};

export default Team;
