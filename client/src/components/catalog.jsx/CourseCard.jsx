import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

const CourseCard = ({ courseData }) => {
  return (
    <Link
      to={`/courses/${courseData._id}`}
      className="
        w-full sm:w-[260px] lg:w-[300px]
        bg-richblack-800
        rounded-xl
        overflow-hidden
        cursor-pointer
        transition-all duration-300 ease-out
        hover:-translate-y-2
        hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)]
        group
      "
    >
      {/* ================= IMAGE ================= */}
      <div className="relative overflow-hidden">
        <img
          src={courseData.thumbnail}
          alt="thumbnail"
          className="
            h-[160px] sm:h-[170px] lg:h-[180px]
            w-full
            object-cover
            transition-transform duration-500 ease-out
            group-hover:scale-105
          "
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-4 flex flex-col gap-2">
        {/* Title */}
        <h2
          className="
            text-white
            font-semibold
            text-base sm:text-lg
            leading-snug
            line-clamp-2
            group-hover:text-yellow-25
            transition-colors duration-200
          "
        >
          {courseData.coursename}
        </h2>

        {/* Instructor */}
        {courseData?.instructor && (
          <div className="flex gap-2 items-center">
            <p className="text-xs sm:text-sm text-richblack-300 font-bold">
              By Mr.
              <span className="text-cyan-300 italic">
                {" "}
                {courseData.instructor.firstName}{" "}
                {courseData.instructor.lastName}
              </span>
            </p>
            <img
              src={courseData?.instructor?.additionalDetails?.image}
              alt="profilepic"
              className="h-5 w-5 sm:h-6 sm:w-6 rounded-full object-cover"
            />
          </div>
        )}

        {/* Category */}
        {courseData?.category && (
          <p className="text-xs sm:text-sm text-white">
            {courseData.category?.categoryname}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2">
          <RatingStars courseId={courseData._id} />
          {courseData?.ratingandreview && (
            <span className="text-xs sm:text-sm text-richblack-400">
              ({courseData.ratingandreview.length})
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-richblack-200 text-xs sm:text-sm">Price</p>
          <p className="text-yellow-25 font-bold text-lg sm:text-xl">
            ₹{courseData.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
