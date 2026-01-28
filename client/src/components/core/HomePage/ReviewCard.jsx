import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <div
      className="
        bg-richblack-800 
        border border-richblack-700 
        rounded-xl 
        p-5 
        flex flex-col gap-4
        shadow-md
        hover:shadow-lg
        transition-all duration-300
        h-full
      "
    >
      {/* USER INFO */}
      <div className="flex items-center gap-3">
        <img
          src={review?.user?.additionalDetails?.image}
          alt="profile"
          className="h-10 w-10 rounded-full object-cover border border-richblack-600"
        />

        <div className="flex flex-col">
          <p className="text-white font-semibold text-sm">
            {review.user.firstName} {review.user.lastName}
          </p>
          <p className="text-xs text-richblack-400">
            {review?.course?.coursename}
          </p>
        </div>
      </div>

      {/* RATING */}
      <div className="flex items-center gap-1">
        {Array.from({ length: review.rating }).map((_, i) => (
          <FaStar key={i} className="text-yellow-25 text-sm" />
        ))}
        <span className="text-xs text-richblack-300 ml-2">
          {review.rating}/5
        </span>
      </div>

      {/* COMMENT */}
      <p className="text-richblack-100 text-sm leading-relaxed line-clamp-4">
        “{review.comment}”
      </p>
    </div>
  );
};

export default ReviewCard;
