import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = params.get("user");

    if (token && user) {
      // Save first
      localStorage.setItem("token", token);
      localStorage.setItem("user", user); 

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 100);
    } else {
      alert("Login failed! Try again.");
      navigate("/signin", { replace: true });
    }
  }, [navigate]);

  return <p>Signing you in...</p>;
};

export default AuthSuccess;
