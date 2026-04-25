import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
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
      text1="Reset Password"
      subtitle="Enter your email address and we'll send you a link to reset your password."
      text2="Send Reset Link"
      text3="Back to Sign In"
      isReset={true}
      resetEmail={email}
      setResetEmail={setEmail}
    />
  );
};

export default ResetPasswordModal;
