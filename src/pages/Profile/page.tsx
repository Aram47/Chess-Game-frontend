import { useAuth } from "../../context/AuthContext";

import ThirdSection from "../../components/profile/third-section";
import SecondSection from "../../components/profile/sec-section";
import FirstSection from "../../components/profile/first-section";

const ProfileDashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="text-white p-8">Loading profile...</div>;
  }
  return (
    <div className="w-full min-h-screen p-8 text-white font-barlow mx-auto flex flex-col gap-y-8 mb-10 mt-13">
      <FirstSection user={user} />

      <SecondSection />

      <ThirdSection />
    </div>
  );
};

export default ProfileDashboard;
