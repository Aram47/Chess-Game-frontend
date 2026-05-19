import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "../../hooks/useTranslation";
import Modal from "../../helpers/Modal";

interface IResetPasword {
  onClose: () => void;
  onResetSuccess: () => void;
  onSwitchToLogin: () => void;
}

const ResetPasswordModal = ({
  onClose,
  onResetSuccess,
  onSwitchToLogin,
}: IResetPasword) => {
  const { resetPassword } = useAuth();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await resetPassword({ email });

    if (success) {
      onResetSuccess();
      onClose();
    }
  };

  return (
    <Modal
      onClose={onClose}
      onSubmit={handleSubmit}
      onSwitch={onSwitchToLogin}
      text1={t("reset_password")}
      subtitle={t("reset_password_subtitle")}
      text2={t("send_reset_link")}
      text3={t("back_to_sign_in")}
      isReset={true}
      resetEmail={email}
      setResetEmail={setEmail}
    />
  );
};

export default ResetPasswordModal;
