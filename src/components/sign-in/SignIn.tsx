import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  otp: string;
}

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({ email: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const API_URL = "https://note-taking-application-jws4.onrender.com";

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  // Handle Google OAuth redirect (token + user in query params)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const userStr = urlParams.get("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));

        // Save Google login in localStorage (always)
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Clean URL (remove token/user params)
        window.history.replaceState({}, document.title, "/signin");

        // Redirect to homepage
        navigate("/", { replace: true });
      } catch (err) {
        console.error("Failed to parse user:", err);
        alert("Google login failed!");
      }
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return alert("Please enter your email!");
    try {
      await axios.post(`${API_URL}/api/auth/signin-otp`, { email: formData.email });
      setOtpSent(true);
      alert("OTP sent successfully!");
    } catch (error: any) {
      alert("Failed to send OTP! " + (error.response?.data?.msg || error.message));
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.otp) return alert("Please enter OTP!");
    try {
      const res = await axios.post(`${API_URL}/api/auth/verify-otp`, formData);

      // Save manually based on keepLoggedIn
      if (keepLoggedIn) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } else {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
      }

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Login failed!");
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  };

  return (
    <div className="min-h-screen sm:flex">
      {/* Left Side - Form */}
      <div className="sm:relative flex flex-col justify-center w-full lg:w-2/5 md:w-2/4 sm:4/7 px-10 sm:py-12 py-8">
        <div className="sm:absolute sm:top-6 sm:left-10 flex items-center justify-center space-x-4">
          <img src="/logo.png" alt="logo" className="w-7 h-7" />
          <span className="font-semibold text-2xl">HD</span>
        </div>

        <div className="sm:mt-12 mt-6">
          <div className="flex flex-col md:items-start items-center justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign in</h2>
            <p className="text-gray-500 text-sm mb-6">
              Please login to continue to your account.
            </p>
          </div>

          <form className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />

            {otpSent && (
              <input
                type="text"
                name="otp"
                placeholder="OTP"
                value={formData.otp}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              />
            )}

            {otpSent && (
              <button
                type="button"
                onClick={handleGetOtp}
                className="text-sm text-blue-500 hover:underline"
              >
                Resend OTP
              </button>
            )}

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="keepLoggedIn"
                checked={keepLoggedIn}
                onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                className="cursor-pointer"
              />
              <label htmlFor="keepLoggedIn" className="text-sm text-gray-600">
                Keep me logged in
              </label>
            </div>

            {!otpSent ? (
              <button
                onClick={handleGetOtp}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Get OTP
              </button>
            ) : (
              <button
                onClick={handleSignIn}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            )}
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 py-3 border rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Sign in with Google</span>
          </button>

          <p className="text-sm text-gray-500 mt-6">
            Need an account?{" "}
            <a href="/signup" className="text-blue-500 font-medium">
              Create one
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden sm:block lg:w-3/5 md:w-2/4 sm:w-3/7">
        <img
          src="/container.png"
          alt="HD Illustration"
          className="w-full h-screen object-fit rounded-lg p-2"
        />
      </div>
    </div>
  );
};

export default SignIn;
