import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCirclePlay } from "react-icons/fa6";

const EnrolledCourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleWatch = () => {
    const firstSection = course.sections?.[0];
    const firstSubSection = firstSection?.subSections?.[0];
    if (!firstSection || !firstSubSection) return;

    navigate(
      `/viewcourse/${course._id}/section/${firstSection._id}/subsection/${firstSubSection._id}`
    );
  };

  return (
    <div
      className="
        w-full
        flex flex-col md:flex-row
        gap-4 md:gap-6
        px-4 py-4
        bg-richblack-800
        rounded-xl
        border border-richblack-700
        hover:border-yellow-25/50
        transition-all duration-300
      "
    >
      {/* LEFT : Thumbnail + Info */}
      <div className="flex gap-4 flex-1">
        <img
          src={course.thumbnail}
          alt="thumbnail"
          className="
            h-20 w-28
            md:h-16 md:w-24
            rounded-lg
            object-cover
            border border-richblack-700
            shrink-0
          "
        />

        <div className="flex flex-col gap-1">
          <h3 className="text-richblack-25 text-base md:text-lg font-semibold">
            {course.coursename}
          </h3>

          <p className="text-richblack-300 text-sm line-clamp-2">
            {course.coursedescription}
          </p>

          <span className="text-xs text-richblack-400 mt-1">
            {course.totalLectures} Lectures
          </span>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div
        className="
          flex flex-col
          sm:flex-row md:flex-col
          gap-3
          items-stretch
          md:items-end
          w-full md:w-auto
        "
      >
        {/* Continue Button */}
        <button
          onClick={handleWatch}
          className="
            flex items-center justify-center gap-2
            px-4 py-2
            rounded-lg
            bg-yellow-25
            text-richblack-900
            font-semibold
            hover:bg-yellow-50
            transition-all
            w-full sm:w-auto
          "
        >
          <FaRegCirclePlay className="text-lg" />
          Continue
        </button>

        {/* Progress */}
        <div className="w-full md:w-[160px]">
          <div className="flex justify-between text-xs text-richblack-300 mb-1">
            <span>Progress</span>
            <span>{course.progressPercentage}%</span>
          </div>

          <div className="w-full h-2 bg-richblack-700 rounded-full overflow-hidden">
            <div
              className="
                h-full
                bg-gradient-to-r from-yellow-25 to-yellow-100
                rounded-full
                transition-all duration-500
              "
              style={{ width: `${course.progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
