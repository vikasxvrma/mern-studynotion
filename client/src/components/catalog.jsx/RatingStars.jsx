import React, { useEffect, useMemo, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getAverageRating } from "../../services/operations/ratingAPI";

const RatingStars = ({ courseId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState({ average: 0, count: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRating = async () => {
      setLoading(true);
      const result = await dispatch(getAverageRating(courseId));
      if (result) setRating(result);
      setLoading(false);
    };

    fetchRating();
  }, [courseId, dispatch]);

  const stars = useMemo(() => {
    const result = [];
    const avg = Number(rating?.average || 0);
    const rounded = Math.round(avg * 2) / 2;

    for (let i = 1; i <= 5; i++) {
      if (rounded >= i) {
        result.push(
          <FaStar
            key={i}
            className="text-yellow-25 text-xs sm:text-sm"
          />
        );
      } else if (rounded >= i - 0.5) {
        result.push(
          <FaStarHalfAlt
            key={i}
            className="text-yellow-25 text-xs sm:text-sm"
          />
        );
      } else {
        result.push(
          <FaRegStar
            key={i}
            className="text-richblack-400 text-xs sm:text-sm"
          />
        );
      }
    }
    return result;
  }, [rating]);

  if (loading) {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FaRegStar
            key={i}
            className="text-richblack-600 animate-pulse text-xs sm:text-sm"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <div className="flex gap-0.5 sm:gap-1">{stars}</div>

      {rating.count > 0 ? (
        <span className="text-xs sm:text-sm text-richblack-300">
          {rating.average} ({rating.count})
        </span>
      ) : (
        <span className="text-xs sm:text-sm text-richblack-400">
          No ratings yet
        </span>
      )}
    </div>
  );
};

export default RatingStars;
