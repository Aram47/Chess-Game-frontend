import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../helpers/Modal";
import type { IFormData } from "../../types/authType";
import { getApiUrl } from "../../api/clients";

interface ISignUp {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignUpModal({ onClose, onSwitchToLogin }: ISignUp) {
  const { login, register } = useAuth();

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
      alert("Registration successful! Please sign in.");
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
      text1="Join ChessMaster"
      subtitle="Create an account to start mastering chess"
      text2="Create Account"
      text3="Sign In"
      text4="Google"
      handleGoogle={handleGoogleLogin}
    />
  );
}
