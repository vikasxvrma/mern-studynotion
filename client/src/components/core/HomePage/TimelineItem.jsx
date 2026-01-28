import React from "react";

const TimelineItem = ({ icon, title, desc }) => {
  return (
    <div className="flex gap-4 sm:gap-6 items-center">
      {/* Circle Icon */}
      <div className="relative h-12 w-12 sm:h-14 sm:w-14 bg-white rounded-full flex justify-center items-center">
        <img src={icon} className="h-4 sm:h-5" />

        {/* Progress line */}
        <div
          className="
            absolute top-full left-1/2 -translate-x-1/2 mt-2
            flex flex-col gap-0.5
          "
        >
          {Array(9)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-1 w-1 bg-richblack-300"></div>
            ))}
        </div>
      </div>

      {/* Text */}
      <div className="w-full flex flex-col gap-1">
        <p className="text-lg sm:text-xl font-bold">{title}</p>
        <p className="text-xs sm:text-sm">{desc}</p>
      </div>
    </div>
  );
};

export default TimelineItem;
