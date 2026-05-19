import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "../../hooks/useTranslation";
import Modal from "../../helpers/Modal";
import type { IFormData } from "../../types/authType";
import { getApiUrl } from "../../api/clients";

interface ISignUp {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignUpModal({ onClose, onSwitchToLogin }: ISignUp) {
  const { login, register } = useAuth();
  const { t } = useTranslation();

  const [formData, setFormData] = useState<IFormData>({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { ...payload } = formData;
    const success = await register(payload);

    if (success) {
      alert(t("registration_success"));
      await login({
        login: formData.email,
        password: formData.password,
      });
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = getApiUrl("/auth/google");
  };

  return (
    <Modal
      onClose={onClose}
      onSwitch={onSwitchToLogin}
      onSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      isRegister={true}
      text1={t("join_chessmaster")}
      subtitle={t("create_account_subtitle")}
      text2={t("create_account")}
      text3={t("header_signin")}
      text4={t("google")}
      handleGoogle={handleGoogleLogin}
    />
  );
}
