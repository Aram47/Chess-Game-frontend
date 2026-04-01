import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import type { ISignUp } from "../../types/authType";

import closeIcon from "../../assets/icons/modal/close.svg";
// import emailIcon from "../../../public/icons/email.svg";
import passwordIcon from "../../assets/icons/modal/password.svg";
import google from "../../assets/icons/google.svg";

const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  rightElement,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightElement?: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-white text-sm font-medium font-barlow">
      {label}
    </label>
    <div className="relative flex items-center h-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-[#1a1a1a] text-white border-[rgba(206,184,110,0.2)] border border-solid rounded-lg py-3 pl-4 text-sm
                   focus:outline-none focus:border-[#c8a84b] placeholder-[rgba(163, 149, 137, 1)] transition-colors cursor-pointer"
      />
      {rightElement && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-500 h-full flex justify-center">
          {rightElement}
        </div>
      )}
    </div>
  </div>
);

const PasswordToggleIcon = ({ visible }: { visible: boolean }) =>
  visible ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <img src={passwordIcon} alt="password-icon" />
  );

const Modal = ({
  onClose,
  onSubmit,
  onSwitch,
  text1,
  text2,
  text3,
  text4,
  subtitle,
  formData,
  isRegister = false,
  setFormData,
  isReset = false,
  resetEmail = "",
  setResetEmail,
  isOpen,
}: ISignUp) => {
  const { loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div
        className={`relative max-w-[448px] w-full rounded-2xl border border-[#2e2e2e] shadow-[0px_8px_32px_0px_#1C1C1C80] backdrop-blur-[100px] bg-[#1C1C1CCC]`}
        style={{ padding: "2rem" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl text-gray-500 hover:text-[var(--text)] transition-colors cursor-pointer"
        >
          <img src={closeIcon} alt="close-icon" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-3xl font-bold font-barlow">{text1}</h1>
          {subtitle && (
            <p className="text-[var(--muted)] text-sm mt-2">{subtitle}</p>
          )}
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5 mt-7" onSubmit={onSubmit}>
          {/* Reset mode — email only */}
          {isReset && (
            <>
              <InputField
                label="Email"
                type="email"
                placeholder="your.email@example.com"
                value={resetEmail}
                onChange={(e) => setResetEmail?.(e.target.value)}
              />
            </>
          )}

          {/* Register / Login fields */}
          {!isReset && (
            <>
              {isRegister && (
                <InputField
                  label="Username"
                  type="text"
                  placeholder="Choose a username"
                  value={formData?.username ?? ""}
                  onChange={(e) =>
                    setFormData?.((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                />
              )}

              <InputField
                label="Email"
                type="email"
                placeholder="your.email@example.com"
                value={formData?.email ?? ""}
                onChange={(e) =>
                  setFormData?.({ ...formData!, email: e.target.value })
                }
              />

              <InputField
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData?.password ?? ""}
                onChange={(e) =>
                  setFormData?.({ ...formData!, password: e.target.value })
                }
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    <PasswordToggleIcon visible={showPassword} />
                  </button>
                }
              />

              {isRegister && (
                <InputField
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData?.confirmPassword ?? ""}
                  onChange={(e) =>
                    setFormData?.({
                      ...formData!,
                      confirmPassword: e.target.value,
                    })
                  }
                  rightElement={
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="hover:text-gray-300 transition-colors cursor-pointer"
                    >
                      <PasswordToggleIcon visible={showConfirmPassword} />
                    </button>
                  }
                />
              )}

              {!isRegister && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-[var(--muted)] text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData?.rememberMe ?? false}
                      onChange={(e) =>
                        setFormData?.((prev) => ({
                          ...prev,
                          rememberMe: e.target.checked,
                        }))
                      }
                      className="w-4.5 h-4.5 rounded border border-[#676767] accent-[#c8a84b] appearance-none checked:appearance-auto bg-transparent cursor-pointer"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="text-[#c8a84b] text-sm hover:underline font-barlow"
                    onClick={isOpen}
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[linear-gradient(180deg,#E5CC7A_0%,#F4E09E_100%)] hover:bg-[#b8963e] text-[var(--bg)] font-bold py-4 rounded-full transition-colors mt-1 text-sm tracking-wide disabled:opacity-60 hover:translate-y-[-5px] cursor-pointer font-barlow"
          >
            {loading ? "Processing..." : text2}
          </button>
        </form>

        {/* Switch link */}
        <div className="flex flex-col gap-y-6">
          <p className="text-center text-sm text-gray-500 mt-5">
            {isReset
              ? "Remember your password? "
              : isRegister
                ? "Already have an account? "
                : "Don't have an account? "}
            <button
              className="text-[#c8a84b] font-semibold hover:underline cursor-pointer"
              onClick={onSwitch}
            >
              {text3}
            </button>
          </p>
          <div className="flex items-center gap-x-3">
            <span className="w-[35%] h-auto border-t text-[#E5CC7A33]"></span>
            <p className="text-[var(--muted)] font-normal text-xs leading-4">
              or continue with
            </p>
            <span className="w-[35%] h-auto border-t text-[#E5CC7A33]"></span>
          </div>
          <div className="flex items-center justify-center gap-x-2 py-3 px-6 border-[var(--bg)] border-1 rounded-3xl bg-[var(--bg)] cursor-pointer">
            <img src={google} alt="google" />
            <button className="font-medium text-sm text-[var(--text)] font-barlow cursor-pointer">
              {text4}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
