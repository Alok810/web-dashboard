import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EyeIcon from "../assets/Images/eye.png";
import HiddenIcon from "../assets/Images/hidden.png";
import ReCAPTCHA from "react-google-recaptcha";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [formData, setFormData] = useState({
    signup_name: "",
    signup_email: "",
    signup_password: "",
    signup_otp: "",
    email: "",
    password: "",
  });
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateOtp = () => {
    const { signup_name, signup_email, signup_password } = formData;

    if (!signup_name || !signup_email || !signup_password) {
      setError("Please fill in all fields before generating OTP.");
      return;
    }

    const exists = localStorage.getItem(`user:${signup_email}`);
    if (exists) {
      setError("User already exists.");
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setShowOtpInput(true);
    setError("");

    if (window.location.hostname === "localhost") {
      toast.info(`Your OTP is: ${otp}`, {
        position: "top-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      alert(`Your OTP is: ${otp}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isSigningIn) {
      const { email, password } = formData;

      if (!captchaVerified) return setError("Please complete the CAPTCHA");

      const user = localStorage.getItem(`user:${email}`);
      if (!user) return setError("No user found.");
      const parsed = JSON.parse(user);
      if (parsed.password !== password) return setError("Wrong password.");

      localStorage.setItem("auth", JSON.stringify({ email }));
      navigate("/");
    } else {
      const {
        signup_name: name,
        signup_email: email,
        signup_password: password,
        signup_otp: otp,
      } = formData;

      if (!otp || otp !== generatedOtp) return setError("Invalid OTP");

      const newUser = { name, email, password };
      localStorage.setItem(`user:${email}`, JSON.stringify(newUser));
      localStorage.setItem("auth", JSON.stringify({ email }));

      const savedPasswords =
        JSON.parse(localStorage.getItem("passwords")) || [];
      const updatedPasswords = [
        { site: email, username: name, password },
        ...savedPasswords,
      ];
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));

      navigate("/");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center border border-gray-200 rounded-xl overflow-hidden p-4"
      style={{
        background:
          "linear-gradient(135deg, #fce7f3 0%, #e0f2fe 50%, #fef9c3 100%)",
        color: "#3e67c8",
      }}
    >
      <ToastContainer />
      <div
        className="relative w-full max-w-[880px] h-[620px] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, #d6f8df 0%, #ffd6e8 40%, #d6f8df 100%)",
        }}
      >
        {/* Sign In Form */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full px-12 py-10 flex flex-col justify-center text-[#3e67c8] z-10 transition-all duration-700 ease-in-out ${isSigningIn ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <h2 className="text-3xl font-bold mb-4">Sign in</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              name="email"
              type="email"
              onChange={handleChange}
              required
              placeholder="Email"
              autoComplete="off"
              className="px-4 py-2 border rounded bg-gray-100"
            />
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                required
                placeholder="Password"
                autoComplete="current-password"
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />
              <img
                src={showPassword ? EyeIcon : HiddenIcon}
                alt="toggle visibility"
                onClick={() => setShowPassword(!showPassword)}
                className="w-5 h-5 absolute top-2 right-3 cursor-pointer"
              />
            </div>
            <ReCAPTCHA
              sitekey="6LelQXsrAAAAAJoPiN9K9r45MZE5jJJR_FjlDXo_"
              onChange={() => setCaptchaVerified(true)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-full mt-2 hover:bg-blue-600 transition"
            >
              SIGN IN
            </button>
            {isSigningIn && error && (
              <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
          </form>
        </div>

        {/* Sign Up Form */}
        <div
          className={`absolute top-0 right-0 w-1/2 h-full px-12 py-10 flex flex-col justify-center text-[#3e67c8] z-10 transition-all duration-700 ease-in-out ${isSigningIn ? "translate-x-full" : "translate-x-0"
            }`}
        >
          <h2 className="text-3xl font-bold mb-4">Create Account</h2>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="flex flex-col gap-3"
          >
            <input
              name="signup_name"
              onChange={handleChange}
              required
              placeholder="Name"
              autoComplete="off"
              className="px-4 py-2 border rounded bg-gray-100"
            />
            <input
              name="signup_email"
              type="email"
              onChange={handleChange}
              required
              placeholder="Email"
              autoComplete="off"
              className="px-4 py-2 border rounded bg-gray-100"
            />
            <div className="relative">
              <input
                name="signup_password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                required
                placeholder="Password"
                autoComplete="new-password"
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />
              <img
                src={showPassword ? HiddenIcon : EyeIcon}
                alt="toggle visibility"
                onClick={() => setShowPassword(!showPassword)}
                className="w-5 h-5 absolute top-2 right-3 cursor-pointer"
              />
            </div>

            {!showOtpInput ? (
              <button
                type="button"
                onClick={generateOtp}
                className="bg-blue-500 text-white py-2 rounded-full mt-2 hover:bg-sky transition"
              >
                Generate OTP
              </button>
            ) : (
              <>
                <input
                  name="signup_otp"
                  onChange={handleChange}
                  required
                  placeholder="Enter OTP"
                  autoComplete="off"
                  className="px-4 py-2 border rounded bg-gray-100"
                />
                <button
                  type="submit"
                  className="bg-sky-500 text-white py-2 rounded-full mt-2 hover:bg-blue-600 transition"
                >
                  SIGN UP
                </button>
              </>
            )}
            {!isSigningIn && error && (
              <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
          </form>
        </div>

        {/* Right Panel */}
        <div
          className={`absolute top-0 right-0 w-1/2 h-full px-12 py-10 flex flex-col justify-center items-center text-white bg-gradient-to-r from-[#3e67c8] to-sky-400 z-20 transition-all duration-700 ease-in-out ${isSigningIn ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <h2 className="text-2xl font-bold mb-4">Hello, Friend!</h2>
          <p className="mb-4 text-center">
            Enter your personal details and start your journey with us
          </p>
          <button
            onClick={() => {
              setIsSigningIn(false);
              setError("");
              setShowOtpInput(false);
              setFormData({
                signup_name: "",
                signup_email: "",
                signup_password: "",
                signup_otp: "",
                email: "",
                password: "",
              });
            }}
            className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-500 transition"
          >
            SIGN UP
          </button>
        </div>

        {/* Left Panel */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full px-12 py-10 flex flex-col justify-center items-center text-white bg-gradient-to-l from-[#3e67c8] to-sky-400 z-20 transition-all duration-700 ease-in-out ${isSigningIn ? "-translate-x-full" : "translate-x-0"
            }`}
        >
          <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
          <p className="mb-4 text-center">
            To keep connected with us please login with your personal info
          </p>
          <button
            onClick={() => {
              setIsSigningIn(true);
              setError("");
              setFormData({
                signup_name: "",
                signup_email: "",
                signup_password: "",
                signup_otp: "",
                email: "",
                password: "",
              });
              setShowOtpInput(false);
            }}
            className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-500 transition"
          >
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
