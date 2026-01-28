import React from "react";
import CTAButton from "./CTAButton";
import { TypeAnimation } from "react-type-animation";

const CodeBlock = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  codecolor,
  colorgradient,
}) => {
  const lines = codeblock.split("\n");

  const sequence = [];
  let current = "";

  lines.forEach((line) => {
    current += line + "\n";
    sequence.push(current);
    sequence.push(50);
  });

  return (
    <div
      className={`
        w-full max-w-[1200px] mx-auto
        flex flex-col ${position}
        gap-10 lg:gap-16
        px-4 sm:px-6
      `}
    >
      {/* ================= LEFT SECTION ================= */}
      <div className="flex flex-col gap-4 w-full lg:w-[45%]">
        {heading}

        <p className="text-richblack-300 text-sm sm:text-base md:text-lg opacity-80 leading-relaxed">
          {subheading}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            {ctabtn1.text}
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.text}
          </CTAButton>
        </div>
      </div>

      {/* ================= RIGHT SECTION (CODE) ================= */}
      <div
        className={`
          relative
          w-full lg:w-[520px]
          min-h-[220px] sm:min-h-[260px] md:min-h-[320px]
          rounded-xl
          border border-white/10
          overflow-hidden
          shadow-lg
          ${colorgradient}
        `}
      >
        <div className="flex h-full backdrop-blur-sm bg-black/10">

          {/* Line Numbers (hide on very small screens) */}
          <div className="hidden sm:flex w-[10%] py-4 pl-3 flex-col text-richblack-400 font-mono text-xs sm:text-sm">
            {Array.from({ length: 12 }).map((_, i) => (
              <p key={i}>{i + 1}</p>
            ))}
          </div>

          {/* Code Animation */}
          <div
            className={`
              ${codecolor}
              w-full h-full
              font-mono
              overflow-hidden
              px-3 py-4
            `}
          >
            <TypeAnimation
              sequence={sequence}
              wrapper="div"
              className="
                whitespace-pre-line
                leading-6 sm:leading-7
                text-xs sm:text-sm md:text-base
              "
              repeat={Infinity}
              cursor
              omitDeletionAnimation
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
