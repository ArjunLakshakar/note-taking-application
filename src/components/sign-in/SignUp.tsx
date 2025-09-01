import React, { useState, useEffect } from "react";
import axios from "axios";

interface FormData {
  name: string;
  dob: string;
  email: string;
  otp: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    dob: "",
    email: "",
    otp: "",
  });

  const [step, setStep] = useState<number>(1);
  const [cooldown, setCooldown] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // countdown for resend OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleGetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.dob || !formData.email) {
      alert("Please fill all fields!");
      return;
    }
    try {
      await axios.post("https://note-taking-application-jws4.onrender.com/api/auth/signup-otp", {
        email: formData.email,
      });
      setStep(2);
      setCooldown(30);
      alert("OTP sent successfully!");
    } catch (error: any) {
      alert(
        "Failed to send OTP! " + (error.response?.data?.msg || error.message)
      );
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.otp) {
      alert("Enter OTP to continue!");
      return;
    }

    try {
      const res = await axios.post(
        "https://note-taking-application-jws4.onrender.com/api/auth/signup",
        formData
      );
      alert("Signup successful!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Signup failed!");
    }
  };

  return (
    <div className="min-h-screen sm:flex">
      {/* Left Side - Form */}
      <div className="sm:relative flex flex-col justify-center w-full lg:w-2/5 md:w-2/4 px-10 sm:py-12 py-8">
        
        <div className="sm:absolute sm:top-6 sm:left-10 flex items-center justify-center space-x-4">
          <img src="/logo.png" alt="logo" className="w-7 h-7" />
          <span className="font-semibold text-2xl">HD</span>
        </div>

        {/* Form Section */}
        <div className="flex flex-col sm:items-start items-center sm:mt-12 mt-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center sm:text-left">
            Sign up
          </h2>
          <p className="text-gray-500 text-sm mb-6 text-center sm:text-left">
            Sign up to enjoy the features of HD
          </p>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />

          {step === 2 && (
            <input
              type="text"
              name="otp"
              placeholder="OTP"
              value={formData.otp}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          )}

          {step === 1 ? (
            <button
              onClick={handleGetOtp}
              disabled={cooldown > 0}
              className={`w-full py-3 rounded-lg transition ${
                cooldown > 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {cooldown > 0 ? `Wait ${cooldown}s` : "Get OTP"}
            </button>
          ) : (
            <>
              <button
                onClick={handleSignUp}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Sign up
              </button>

              <button
                onClick={handleGetOtp}
                disabled={cooldown > 0}
                className={`w-full mt-2 py-2 rounded-lg transition ${
                  cooldown > 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
              </button>
            </>
          )}
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center sm:text-left">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 font-medium">
            Sign in
          </a>
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="hidden sm:block lg:w-3/5 md:w-2/4">
        <img
          src="/container.png"
          alt="HD Illustration"
          className="w-full h-screen object-fit rounded-lg p-2"
        />
      </div>
    </div>
  );
};

export default SignUp;
