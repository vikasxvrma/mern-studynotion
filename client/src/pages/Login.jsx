import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import CTAButton from "../components/core/HomePage/CTAButton";
import Footer from "../components/common/Footer";

import frameImage from "../Asset/Image/frame.png";
import loginImage from "../Asset/Image/aboutus1.webp";

import { logIn } from "../services/operations/authAPI";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Password visibility
  const [visible, setVisible] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loggedIn = await dispatch(
      logIn(formData.email, formData.password)
    );

    if (!loggedIn) return;

    navigate("/dashboard/my-profile");
  };

  return (
    <div className="min-h-screen bg-richblack-900 flex flex-col">
      {/* ================= MAIN ================= */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div
          className="
            w-full max-w-6xl
            flex flex-col-reverse lg:flex-row
            items-center justify-between
            gap-12
          "
        >
          {/* ================= FORM ================= */}
          <div className="w-full max-w-[420px] bg-richblack-800 m-4 p-6 sm:p-8 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Welcome Back 👋
            </h2>

            <p className="text-sm sm:text-md text-richblack-300 mt-2">
              Build skills for today, tomorrow, and beyond.
              <span className="text-cyan-300 italic font-semibold">
                {" "}Future-proof your career.
              </span>
            </p>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-6"
            >
              {/* Email */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-sm text-richblack-100"
                >
                  Email Address <sup className="text-red-500">*</sup>
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="
                    bg-richblack-700
                    px-4 py-3 rounded-lg
                    text-white placeholder:text-richblack-400
                    outline-none
                    focus:ring-2 focus:ring-cyan-300
                  "
                />
              </div>

              {/* Password */}
              <div className="relative flex flex-col gap-1">
                <label
                  htmlFor="password"
                  className="text-sm text-richblack-100"
                >
                  Password <sup className="text-red-500">*</sup>
                </label>

                <input
                  type={visible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="
                    bg-richblack-700
                    px-4 py-3 rounded-lg
                    text-white placeholder:text-richblack-400
                    outline-none
                    focus:ring-2 focus:ring-cyan-300
                  "
                />

                <button
                  type="button"
                  onClick={() => setVisible((prev) => !prev)}
                  className="absolute right-4 top-9 text-richblack-200 hover:text-white"
                >
                  {visible ? <FaEye /> : <FaEyeSlash />}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/resetpassword")}
                  className="self-end text-sm text-cyan-300 mt-2 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <CTAButton active type="submit">
                Sign In
              </CTAButton>
            </form>
          </div>

          {/* ================= IMAGE ================= */}
          <div className="relative w-[220px] sm:w-[320px] lg:w-[420px]">
            <img
              src={frameImage}
              alt="frame"
              className="w-full"
            />
            <img
              src={loginImage}
              alt="login"
              className="
                absolute
                top-3 right-3
                w-[85%]
                rounded-lg
              "
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
