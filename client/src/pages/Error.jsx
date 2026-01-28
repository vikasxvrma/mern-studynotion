import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Error = () => {
  return (
    <div className="min-h-screen bg-richblack-900 flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center gap-6 max-w-[600px]">
        {/* Error Code */}
        <h1 className="text-7xl sm:text-8xl font-extrabold text-red-600 tracking-wide">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Page Not Found
        </h2>

        <p className="text-sm sm:text-md text-richblack-300">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* CTA */}
        <Link
          to="/"
          className="
            mt-4
            flex items-center gap-2
            px-6 py-3
            bg-yellow-50 text-richblack-900
            font-semibold rounded-lg
            hover:bg-yellow-100
            transition-all duration-200
          "
        >
          <FaArrowLeft />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
