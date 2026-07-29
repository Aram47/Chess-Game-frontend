import { useState } from "react";
import { PasswordField } from "../../helpers/PasswordField";
import { Section } from "./Section";
import { useTranslation } from "../../hooks/useTranslation";

import { PasswordIcon } from "../../assets/icons/settings/password";

const Security = () => {
  const { t } = useTranslation();
  const [passwords, setPasswords] = useState({
    current: "",
    newPw: "",
    confirm: "",
  });
  return (
    <Section
      icon={<PasswordIcon />}
      title={t("password_security")}
      subtitle={t("password_security_subtitle")}
    >
      <div className="space-y-3.5 mt-8">
        <PasswordField
          label={t("current_password")}
          placeholder={t("placeholder_current_password")}
          value={passwords.current}
          onChange={(v) => setPasswords({ ...passwords, current: v })}
        />
        <PasswordField
          label={t("new_password")}
          placeholder={t("placeholder_new_password")}
          value={passwords.newPw}
          onChange={(v) => setPasswords({ ...passwords, newPw: v })}
        />
        <PasswordField
          label={t("confirm_new_password")}
          placeholder={t("placeholder_confirm_new_password")}
          value={passwords.confirm}
          onChange={(v) => setPasswords({ ...passwords, confirm: v })}
        />
      </div>
    </Section>
  );
};

export default Security;
