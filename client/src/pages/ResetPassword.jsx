import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/operations/authApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updated = await dispatch(
      resetPassword(token, formData.newPassword, formData.confirmPassword)
    );

    if (!updated) return;

    navigate("/login");
  };

  return (
    <div className="w-full min-h-screen bg-richblack-900 flex items-center justify-center px-4">
      <div
        className="
          w-full max-w-[420px]
          bg-richblack-900
          p-5 sm:p-6
          flex flex-col gap-4
          rounded-md
        "
      >
        {/* Heading */}
        <h2 className="text-lg sm:text-xl text-white font-semibold">
          Choose a New Password
        </h2>

        <p className="text-white opacity-70 text-sm">
          Enter your new password below.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-2">
          {/* New Password */}
          <div className="relative flex flex-col gap-1">
            <label className="text-white text-sm">
              New Password
            </label>

            <input
              type={visible1 ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="bg-richblack-800 p-3 rounded-md w-full text-white"
              required
            />

            <span
              className="absolute right-4 top-[38px] cursor-pointer text-white"
              onClick={() => setVisible1((p) => !p)}
            >
              {visible1 ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative flex flex-col gap-1">
            <label className="text-white text-sm">
              Confirm Password
            </label>

            <input
              type={visible2 ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="bg-richblack-800 p-3 rounded-md w-full text-white"
              required
            />

            <span
              className="absolute right-4 top-[38px] cursor-pointer text-white"
              onClick={() => setVisible2((p) => !p)}
            >
              {visible2 ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-yellow-25 p-2 rounded-md cursor-pointer text-black font-semibold w-full"
          >
            Reset Password
          </button>
        </form>

        {/* Back to login */}
        <div
          onClick={() => navigate("/login")}
          className="flex gap-2 justify-center items-center cursor-pointer mt-2"
        >
          <FaArrowLeftLong className="text-white text-sm" />
          <p className="text-white text-sm">Back to Login</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
