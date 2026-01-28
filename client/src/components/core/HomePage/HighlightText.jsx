import React from "react";

const HighlightText = ({ text }) => {
  return (
    <span
      className="
        bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500
        bg-clip-text text-transparent
        font-extrabold
        text-2xl sm:text-3xl md:text-4xl lg:text-5xl
        tracking-tight
      "
    >
      {text}
    </span>
  );
};

export default HighlightText;
