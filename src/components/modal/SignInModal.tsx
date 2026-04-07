import { useState } from "react";
import Modal from "../../hooks/Modal";
import { useAuth } from "../../context/AuthContext";
import type { IFormData } from "../../types/authType";

interface ISignIn {
  onClose: () => void;
  onLoginSuccess: () => void;
  onSwitchToRegister: () => void;
  onSwitchToReset: () => void;
}

export default function SignInModal({
  onClose,
  onLoginSuccess,
  onSwitchToRegister,
  onSwitchToReset,
}: ISignIn) {
  const { login } = useAuth();

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
      onLoginSuccess();
      onClose();
    }
  };

  return (
    <Modal
      onClose={onClose}
      onSwitch={onSwitchToRegister}
      onSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      text1="Welcome back!"
      text2="Log In"
      text3="Sign Up"
      text4="Google"
      isOpen={onSwitchToReset}
    />
  );
}
