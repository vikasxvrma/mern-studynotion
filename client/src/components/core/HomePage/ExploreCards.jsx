import React from "react";
import { IoPeopleCircle } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";

const ExploreCards = ({ courses, clickedCard, setClickedCard }) => {
  const limitWords = (str, limit = 18) => {
    const words = str.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : str;
  };

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6 md:gap-8
        mt-12
        w-full
        select-none
      "
    >
      {courses.map((course, index) => (
        <div
          key={index}
          onClick={() => setClickedCard(course)}
          className={`
            flex flex-col justify-between
            w-full
            min-h-[260px] sm:min-h-[280px] lg:min-h-[300px]
            p-5 sm:p-6
            rounded-xl
            transition-all duration-300 ease-out
            cursor-pointer
            border
            ${
              clickedCard === course
                ? "bg-white text-richblack-700 border-blue-200 shadow-xl"
                : "bg-richblack-700 text-richblue-100 border-richblack-600 hover:border-yellow-25/40"
            }
            hover:scale-[1.02]
          `}
        >
          {/* TITLE */}
          <h2 className="text-base sm:text-lg font-bold leading-snug">
            {course.heading}
          </h2>

          {/* DESCRIPTION */}
          <p className="text-sm sm:text-md mt-3 opacity-90 flex-grow">
            {limitWords(course.description)}
          </p>

          {/* DIVIDER */}
          <div className="w-full h-px bg-richblack-300/40 my-4" />

          {/* FOOTER */}
          <div className="flex justify-between text-xs sm:text-sm opacity-90">
            <span className="flex items-center gap-1">
              <IoPeopleCircle className="text-lg" />
              {course.level}
            </span>

            <span className="flex items-center gap-1">
              <CiVideoOn className="text-lg" />
              {course.lessionNumber} Lessons
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExploreCards;
