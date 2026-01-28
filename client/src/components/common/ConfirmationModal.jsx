import React from "react";
import { createPortal } from "react-dom";

const ConfirmationModal = ({
  heading,
  text,
  btn1,
  btn2,
  btn1handler,
  btn2handler,
}) => {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div
        className="
          w-full max-w-[420px]
          bg-richblack-900
          border border-white
          rounded-md
          px-5 py-4 sm:px-6 sm:py-5
          flex flex-col gap-6 sm:gap-8
          items-center
          text-center
        "
      >
        <h2 className="text-xl sm:text-3xl font-bold text-white">
          {heading}
        </h2>

        <p className="text-sm sm:text-md text-white opacity-60">
          {text}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full justify-center">
          <button
            onClick={btn1handler}
            className="bg-yellow-25 text-richblack-900 px-5 py-2 rounded-md hover:bg-red-700 w-full sm:w-auto cursor-pointer"
          >
            {btn1}
          </button>

          <button
            onClick={btn2handler}
            className="bg-richblack-600 text-white px-5 py-2 rounded-md hover:bg-cyan-300 w-full sm:w-auto cursor-pointer"
          >
            {btn2}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
