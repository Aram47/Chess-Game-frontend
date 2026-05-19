import { useState } from "react";
import Modal from "../../helpers/Modal";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "../../hooks/useTranslation";
import type { IFormData } from "../../types/authType";
import { getApiUrl } from "../../api/clients";

interface ISignIn {
  onClose: () => void;
  onLoginSuccess?: () => void;
  onSwitchToRegister?: () => void;
  onSwitchToReset?: () => void;
}

export default function SignInModal({
  onClose,
  onLoginSuccess,
  onSwitchToRegister,
  onSwitchToReset,
}: ISignIn) {
  const { login } = useAuth();
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
    const success = await login({
      login: formData.email || formData.username,
      password: formData.password,
    });
    if (success) {
      onLoginSuccess?.();
      onClose();
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = getApiUrl("/auth/google");
  };

  return (
    <Modal
      onClose={onClose}
      onSwitch={onSwitchToRegister}
      onSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      text1={t("welcome_back")}
      text2={t("log_in")}
      text3={t("sign_up")}
      text4={t("google")}
      isOpen={onSwitchToReset}
      handleGoogle={handleGoogleRegister}
    />
  );
}
