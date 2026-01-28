import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import Footer from "../components/common/Footer";
import CTAButton from "../components/core/HomePage/CTAButton";

import frameImage from "../Asset/Image/frame.png";
import loginImage from "../Asset/Image/aboutus1.webp";

import { sendOtp } from "../services/operations/authApi";
import { setSignUpData } from "../slices/authSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState("student");

  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);

  const setToggle1 = () => {
    setVisible1((p) => !p);
    setEye1((p) => !p);
  };

  const setToggle2 = () => {
    setVisible2((p) => !p);
    setEye2((p) => !p);
  };

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmpassword: "",
    accountType: user,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    const finalData = { ...formData, accountType: user };
    dispatch(setSignUpData(finalData));

    const otpsent = await dispatch(sendOtp(formData.email));
    if (!otpsent) return;

    navigate("/verifyotp");
  };

  return (
    <div className="w-full bg-richblack-900 overflow-x-hidden">
      <div
        className="
          w-11/12 sm:w-10/12 lg:w-9/12 mx-auto
          flex flex-col-reverse lg:flex-row
          gap-12 py-12
          items-center
        "
      >
        {/* LEFT CONTENT */}
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Join the millions learning to code with StudyNotion for free
          </h2>

          <p className="text-sm sm:text-lg md:text-xl text-white leading-6">
            Build skills for today, tomorrow, and beyond.
            <span className="italic text-cyan-300">
              {" "}Education to future-proof your career.
            </span>
          </p>

          {/* Account Type Selector */}
          <div
            className="
              w-full sm:w-8/12 lg:w-7/12
              bg-richblack-800 border border-white/20
              rounded-full flex justify-between
              px-2 py-2
            "
          >
            <div
              onClick={() => setUser("student")}
              className={`
                flex-1 text-center py-2 rounded-full cursor-pointer text-white
                ${user === "student" ? "bg-richblack-900" : "opacity-70"}
              `}
            >
              Student
            </div>

            <div
              onClick={() => setUser("instructor")}
              className={`
                flex-1 text-center py-2 rounded-full cursor-pointer text-white
                ${user === "instructor" ? "bg-richblack-900" : "opacity-70"}
              `}
            >
              Instructor
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 w-full sm:w-10/12 lg:w-8/12"
          >
            {/* Names */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-white text-sm">
                  First Name <sup className="text-red-600">*</sup>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-richblack-800 p-3 rounded-md text-white"
                  placeholder="First Name"
                  required
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label className="text-white text-sm">
                  Last Name <sup className="text-red-600">*</sup>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="bg-richblack-800 p-3 rounded-md text-white"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm">
                Email Address <sup className="text-red-600">*</sup>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-richblack-800 p-3 rounded-md text-white"
                placeholder="xyz@gmail.com"
                required
              />
            </div>

            {/* Passwords */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex flex-col gap-2 w-full">
                <label className="text-white text-sm">
                  Password <sup className="text-red-600">*</sup>
                </label>
                <input
                  type={visible1 ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-richblack-800 p-3 rounded-md text-white"
                  placeholder="Enter Password"
                  required
                />
                <div
                  className="absolute bottom-3 right-3 cursor-pointer text-white"
                  onClick={setToggle1}
                >
                  {eye1 ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>

              <div className="relative flex flex-col gap-2 w-full">
                <label className="text-white text-sm">
                  Confirm Password <sup className="text-red-600">*</sup>
                </label>
                <input
                  type={visible2 ? "text" : "password"}
                  name="confirmpassword"
                  value={formData.confirmpassword}
                  onChange={handleChange}
                  className="bg-richblack-800 p-3 rounded-md text-white"
                  placeholder="Confirm Password"
                  required
                />
                <div
                  className="absolute bottom-3 right-3 cursor-pointer text-white"
                  onClick={setToggle2}
                >
                  {eye2 ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>

            <div className="w-full sm:w-6/12">
              <CTAButton active type="submit">
                Create Account
              </CTAButton>
            </div>
          </form>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-[220px] sm:w-[320px] lg:w-[420px] mx-auto">
          <img src={frameImage} alt="frame" className="w-full" />
          <img
            src={loginImage}
            alt="signup"
            className="absolute top-3 right-3 w-[85%] sm:w-9/12"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;
