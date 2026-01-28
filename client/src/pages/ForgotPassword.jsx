import React, { useState } from "react";
import CTAButton from "../components/core/HomePage/CTAButton";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPassWordToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(getPassWordToken(email, setEmailSent));
  };

  return (
    <div className="w-full min-h-screen bg-richblack-900 flex items-center justify-center px-4">
      <div className="w-full max-w-[520px] flex flex-col gap-6 items-center">
        {loading ? (
          <div className="text-white">loading...</div>
        ) : (
          <>
            {/* Heading */}
            <h2 className="text-center text-2xl sm:text-3xl text-white font-semibold">
              {emailSent ? "Check Your Email" : "Reset Your Password"}
            </h2>

            {/* Subtext */}
            {!emailSent ? (
              <p className="text-sm sm:text-md text-center opacity-80 text-white">
                Have no FEAR. We’ll email you instructions to reset your password.
                If you don’t have access to your email, we can try account recovery.
              </p>
            ) : (
              <p className="text-sm sm:text-md text-center opacity-80 text-white">
                {`We have sent an email to "${email}"`}
              </p>
            )}

            {/* Email Input */}
            {!emailSent && (
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-3"
              >
                <label className="text-white text-sm">
                  Email Address <sup className="text-red-600">*</sup>
                </label>

                <input
                  type="email"
                  name="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="bg-richblack-800 p-3 rounded-md text-white"
                />
              </form>
            )}

            {/* Buttons */}
            <div className="flex flex-col gap-3 w-full items-center">
              {!emailSent ? (
                <button
                  onClick={handleSubmit}
                  className="w-full bg-yellow-50 cursor-pointer rounded-md px-6 py-2 text-richblack-900 font-semibold"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={() => setEmailSent(false)}
                  className="w-full bg-yellow-50 cursor-pointer rounded-md px-6 py-2 text-richblack-900 font-semibold"
                >
                  Resend Email
                </button>
              )}

              {/* Back to login */}
              <div
                onClick={() => navigate("/login")}
                className="flex gap-2 items-center cursor-pointer"
              >
                <FaArrowLeftLong className="text-white text-sm" />
                <p className="text-white text-sm">Back to Login</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
