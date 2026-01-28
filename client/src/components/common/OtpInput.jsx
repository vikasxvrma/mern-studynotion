import React, { useRef, useEffect } from "react";

const OtpInput = ({ length = 6, onOtpChange, resetTrigger }) => {
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    inputs.current[index].value = value;

    if (value && index < length - 1) {
      inputs.current[index + 1].focus();
    }

    const otp = inputs.current.map((input) => input.value).join("");
    onOtpChange(otp);
  };

  useEffect(() => {
    inputs.current.forEach((input) => {
      if (input) input.value = "";
    });
  }, [resetTrigger]);

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          maxLength={1}
          inputMode="numeric"
          onChange={(e) => handleChange(e.target.value, index)}
          className="
            w-10 h-10 sm:w-12 sm:h-12
            text-center
            text-lg sm:text-xl
            bg-richblack-800
            text-white
            rounded-md
            border border-white/20
            outline-none
            transition-all duration-200
            focus:border-yellow-25
            focus:ring-2 focus:ring-yellow-25/40
          "
        />
      ))}
    </div>
  );
};

export default OtpInput;
