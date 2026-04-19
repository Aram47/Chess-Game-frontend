import { useState } from "react";
import { PasswordField } from "../../helpers/PasswordField";
import { Section } from "./Section";

import passwordIcon from "../../assets/icons/settings/password.svg";

const Security = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    newPw: "",
    confirm: "",
  });
  return (
    <Section
      icon={<img src={passwordIcon} alt="passwordIcon" />}
      title="Password & Security"
      subtitle="Update your password to keep your account secure"
    >
      <div className="space-y-3.5 mt-8">
        <PasswordField
          label="Current Password"
          placeholder="Enter current password"
          value={passwords.current}
          onChange={(v) => setPasswords({ ...passwords, current: v })}
        />
        <PasswordField
          label="New Password"
          placeholder="Enter new password"
          value={passwords.newPw}
          onChange={(v) => setPasswords({ ...passwords, newPw: v })}
        />
        <PasswordField
          label="Confirm New Password"
          placeholder="Confirm New Password"
          value={passwords.confirm}
          onChange={(v) => setPasswords({ ...passwords, confirm: v })}
        />
      </div>
    </Section>
  );
};

export default Security;
