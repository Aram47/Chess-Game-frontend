import passwordIcon from "../assets/icons/modal/password.svg";
import hoverPassword from "../assets/icons/modal/hoverPassword.svg";

export const PasswordToggleIcon = ({ 
  visible, 
  onClick 
}: { 
  visible: boolean; 
  onClick: () => void; 
}) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
  >
    <img src={visible ? hoverPassword : passwordIcon} alt="toggle-password" />
  </button>
);