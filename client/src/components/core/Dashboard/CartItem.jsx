import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAverageRating } from "../../../services/operations/ratingAPI";
import ReactStars from "react-stars";
import { TiDelete } from "react-icons/ti";
import { removeFromCart } from "../../../slices/cartSlice";

const CartItem = ({ course }) => {
  const dispatch = useDispatch();
  const [rate, setRate] = useState(0);

  useEffect(() => {
    if (course?._id) {
      dispatch(getAverageRating(course._id)).then((r) => {
        setRate(Number(r) || 0);
      });
    }
  }, [course?._id, dispatch]);

  return (
    <div
      className="
        bg-richblack-800
        p-4
        rounded-lg
        flex flex-col sm:flex-row
        sm:items-center
        justify-between
        gap-4
      "
    >
      {/* LEFT */}
      <div className="flex gap-4 items-center">
        <img
          src={course.thumbnail}
          alt="thumbnail"
          className="
            h-16 w-24 sm:h-14 sm:w-20
            rounded-md
            object-cover
          "
        />

        <div className="flex flex-col gap-1">
          <p className="text-white font-semibold text-base sm:text-lg">
            {course.coursename}
          </p>

          <p className="text-white opacity-60 text-xs sm:text-sm">
            {course?.category?.categoryname || "General"}
          </p>

          <div className="flex items-center gap-2">
            <ReactStars
              count={5}
              value={rate}
              size={16}
              edit={false}
              color2="#ffd700"
            />
            <span className="text-richblack-100 text-xs sm:text-sm">
              {Number(rate).toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
        <button
          onClick={() => dispatch(removeFromCart(course._id))}
          className="
            flex items-center gap-1
            text-red-400 hover:text-red-500
            text-sm
            cursor-pointer
            transition-all
          "
        >
          <TiDelete size={20} />
          <span>Remove</span>
        </button>

        <div className="text-lg sm:text-xl text-yellow-400 font-semibold">
          ₹ {course.price}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
