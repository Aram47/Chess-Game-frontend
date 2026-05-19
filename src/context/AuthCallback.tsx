import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { normalizeUserFromApi } from "../lib/auth/mapUser";
import { useTranslation } from "../hooks/useTranslation";

const AuthCallback = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const userJson = searchParams.get("user");

    if (userJson) {
      try {
        const userData = normalizeUserFromApi(
          JSON.parse(decodeURIComponent(userJson)),
        );
        if (!userData) {
          throw new Error("Invalid user payload");
        }

        setUser(userData);

        navigate("/profile");
      } catch (err) {
        console.error("Failed to parse user data", err);
        navigate("/");
      }
    }
  }, [searchParams, setUser, navigate]);

  return <div>{t("completing_login")}</div>;
};

export default AuthCallback;
