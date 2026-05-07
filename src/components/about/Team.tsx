import Aram from "../../assets/icons/about/aram.png";
import Tigran from "../../assets/icons/about/tigran.png";
import Arthur from "../../assets/icons/about/arthur.jpg";
import Sona from "../../assets/icons/about/sona.png";
import Nver from "../../assets/icons/about/nver.png";

const Team = () => {
  const team = [
    {
      name: "Nver Stepanyan",
      role: "Founder",
      bio: "Chess professional based on 32 years of experience, creating innovative training platform that helps players at all levels.",
      img: Nver,
    },
    {
      name: "Aram Minasyan",
      role: "Software engineer",
      bio: "Leads the technical architecture and product development of ChessMaster platform.",
      img: Aram,
    },
    {
      name: "Tigran Yavroyan",
      role: "Software developer",
      bio: "Expert software developer specializing in backend systems and AI integration.",
      img: Tigran,
    },
    {
      name: "Arthur Baghdanyan",
      role: "Front End Developer",
      bio: "Frontend specialist crafting beautiful and responsive user interfaces.",
      img: Arthur,
    },
    {
      name: "Sona Gevorgyan",
      role: "Product Designer",
      bio: "UX/UI specialist focused on creating intuitive learning experiences for chess players of all levels.",
      img: Sona,
    },
  ];
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-medium text-[#E5CC7A] text-center mb-5.5">
        Meet Our Team
      </h2>
      <div className="flex justify-center w-full">
        {team.slice(0, 1).map((member, idx) => (
          <div
            key={idx}
            className="max-w-[250px] bg-white/[0.03] backdrop-blur-md border border-[#FFFFFF0D] rounded-[20px] p-6 text-center flex flex-col gap-y-2 items-center"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-20 h-20 bg-white/5 border-none object-cover rounded-full overflow-hidden"
              style={{ objectPosition: "0 -3px" }}
            />
            <div>
              <h3 className="font-medium text-[#E5CC7A] text-xl">
                {member.name}
              </h3>
              <p className="text-sm text-[#A39589] capitalize tracking-wider">
                {member.role}
              </p>
            </div>
            <p className="text-sm text-[#A39589] leading-relaxed">
              {member.bio}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.slice(1).map((member, idx) => (
          <div
            key={idx}
            className="max-w-[250px] w-full bg-white/[0.03] backdrop-blur-md border border-[#FFFFFF0D] rounded-[20px] p-6 text-center flex flex-col gap-y-2 items-center"
          >
            {/* Placeholder for "AB" style circle if no image exists */}
            {member.img ? (
              <img
                src={member.img}
                alt={member.name}
                className="w-20 h-20 bg-white/5 border-none object-cover rounded-full overflow-hidden"
              />
            ) : (
              <div className="w-20 h-20 bg-[#E5CC7A] rounded-full flex items-center justify-center text-[#1a1a1a] font-bold text-xl">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
            <div>
              <h3 className="font-medium text-[#E5CC7A] text-xl">
                {member.name}
              </h3>
              <p className="text-sm text-[#A39589] capitalize tracking-wider">
                {member.role}
              </p>
            </div>
            <p className="text-sm text-[#A39589] leading-relaxed">
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
