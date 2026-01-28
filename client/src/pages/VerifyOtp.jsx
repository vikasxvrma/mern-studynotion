import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineWatchLater } from "react-icons/md";

import { verifyOtp, signUp, sendOtp } from "../services/operations/authApi";
import OtpInput from "../components/common/OtpInput";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { signUpData } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState("");
  const [resetOtpBox, setResetOtpBox] = useState(0);

  // Redirect if no signup data present (refresh case)
  useEffect(() => {
    if (!signUpData) {
      navigate("/signup");
    }
  }, [signUpData, navigate]);

  if (!signUpData) return null;

  const email = signUpData.email;

  // Resend OTP
  const handleResendOtp = async () => {
    setOtp("");
    setResetOtpBox((prev) => prev + 1);

    const otpSent = await dispatch(sendOtp(email));
    if (!otpSent) return;
  };

  // Verify OTP + Signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    const verified = await dispatch(verifyOtp(email, otp));
    if (!verified) return;

    const created = await dispatch(signUp(signUpData));
    if (!created) return;

    navigate("/login");
  };

  return (
    <div className="w-full min-h-screen bg-richblack-900 flex items-center justify-center px-4">
      <div
        className="
          w-full max-w-[420px]
          bg-richblack-900
          flex flex-col gap-4
          p-5 sm:p-6
          rounded-md
        "
      >
        <h2 className="text-lg sm:text-xl text-white font-semibold">
          Verify Email
        </h2>

        <p className="text-white text-sm opacity-80">
          A verification code has been sent to your email.
          Enter the code below:
        </p>

        <OtpInput
          length={6}
          onOtpChange={setOtp}
          resetTrigger={resetOtpBox}
        />

        <button
          onClick={handleSubmit}
          className="
            bg-yellow-25
            px-6 py-2
            rounded-md
            font-semibold
            cursor-pointer
            w-full
          "
        >
          Verify OTP
        </button>

        <div className="flex justify-between items-center mt-4 text-sm text-cyan-300">
          <p
            onClick={() => navigate("/signup")}
            className="cursor-pointer hover:underline"
          >
            Back to Signup
          </p>

          <div
            onClick={handleResendOtp}
            className="cursor-pointer flex gap-1 items-center hover:underline"
          >
            <MdOutlineWatchLater />
            Resend OTP
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
