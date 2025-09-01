import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = params.get("user");

    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);

      navigate("/", { replace: true });
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  return <p>Signing you in...</p>;
};

export default AuthSuccess;
