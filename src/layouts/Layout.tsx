import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import SignUpModal from "../components/modal/SignUpModal";
import SignInModal from "../components/modal/SignInModal";
import ResetPasswordModal from "../components/modal/PasswordModal";
// import Footer from "../components/footer/Footer";

import "./style.css";

const Layout: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeModal, setActiveModal] = useState<
    "signup" | "signin" | "reset" | null
  >(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="app-container">
      <Header setActiveModal={setActiveModal} />

      <main className={`${currentPath === "/" ? "absolute top-0 bottom-0" : "static"} main-content`}>
        <Outlet />
      </main>
      <div className="relative z-10 w-full max-w-md max-h-[100vh] rounded-2xl">
        {activeModal === "signup" && (
          <SignUpModal
            onClose={closeModal}
            onSwitchToLogin={() => setActiveModal("signin")}
          />
        )}
        {activeModal === "signin" && (
          <SignInModal
            onClose={closeModal}
            onSwitchToReset={() => setActiveModal("reset")}
            onLoginSuccess={closeModal}
            onSwitchToRegister={() => setActiveModal("signup")}
          />
        )}
        {activeModal === "reset" && (
          <ResetPasswordModal
            onClose={closeModal}
            onResetSuccess={closeModal}
            onSwitchToLogin={() => setActiveModal("signin")}
          />
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
