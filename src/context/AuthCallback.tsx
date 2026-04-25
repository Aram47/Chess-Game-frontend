import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  
  useEffect(() => {
    const userJson = searchParams.get("user");

    if (userJson) {
      try {
        const userData = JSON.parse(decodeURIComponent(userJson));

        setUser(userData);

        navigate("/profile");
      } catch (err) {
        console.error("Failed to parse user data", err);
        navigate("/");
      }
    }
  }, [searchParams, setUser, navigate]);

  return <div>Completing login...</div>;
};

export default AuthCallback;
