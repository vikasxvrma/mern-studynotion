import React from "react";
import RendersStep from "./RendersStep";

const AddCourse = () => {
  return (
    <div className="w-full mt-12  bg-richblack-900">
      <div
        className="
          w-11/12 sm:w-10/12 lg:w-9/12
          mx-auto
          py-10
          flex flex-col lg:flex-row
          gap-8
        "
      >
        {/* LEFT MAIN CONTENT */}
        <div className="flex flex-col gap-4 w-full lg:w-[70%]">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Add Course
          </h1>

          {/* Progress + Form */}
          <RendersStep />
        </div>

        {/* RIGHT SIDE TIPS (Desktop only) */}
        <div
          className="
            hidden lg:flex
            w-[30%]
            h-fit
            flex-col gap-3
            bg-richblack-800
            border border-white/10
            rounded-lg
            px-6 py-4
            sticky top-24
          "
        >
          <h2 className="text-xl text-white font-semibold text-center">
            Course Upload Tips
          </h2>

          <ul className="flex flex-col gap-2 mt-2 list-disc list-inside">
            <li className="text-white text-sm opacity-70 italic">
              Set the course price or mark it free
            </li>
            <li className="text-white text-sm opacity-70 italic">
              Standard thumbnail size: 1024 × 572
            </li>
            <li className="text-white text-sm opacity-70 italic">
              Video sections control course flow
            </li>
            <li className="text-white text-sm opacity-70 italic">
              Use the course builder to organize content
            </li>
            <li className="text-white text-sm opacity-70 italic">
              Add notes for all students when needed
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
