import { Section } from "./Section";
import { ToggleRow } from "../../helpers/ToggleRow";
import { useTranslation } from "../../hooks/useTranslation";
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
  const { t } = useTranslation();

  return (
    <Section
      icon={<img src={privacyIcon} alt="privacy" />}
      title={t("privacy_title")}
      subtitle={t("privacy_subtitle")}
    >
      <ToggleRow
        name={t("show_online_status")}
        desc={t("show_online_status_desc")}
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
