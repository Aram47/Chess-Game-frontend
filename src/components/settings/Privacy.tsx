import { Section } from "./Section";
import { ToggleRow } from "../../helpers/ToggleRow";
import privacyIcon from "../../assets/icons/settings/privacy.svg";

interface PrivacyProps {
  privacy: {
    showOnlineStatus: boolean;
  };
  setPrivacy: React.Dispatch<
    React.SetStateAction<{
      showOnlineStatus: boolean;
    }>
  >;
}

const Privacy = ({ privacy, setPrivacy }: PrivacyProps) => {
  return (
    <Section
      icon={<img src={privacyIcon} alt="privacy" />}
      title="Privacy"
      subtitle="Control who can see your activity"
    >
      <ToggleRow
        name="Show Online Status"
        desc="Let others know when you're online"
        checked={privacy.showOnlineStatus}
        onChange={(v) =>
          setPrivacy((prev) => ({ ...prev, showOnlineStatus: v }))
        }
        last
      />
    </Section>
  );
};

export default Privacy;
