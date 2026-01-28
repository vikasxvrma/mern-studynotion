import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import CartItem from "./CartItem";
import { buyCourse } from "../../../services/operations/studentFeaturesAPI";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { items } = useSelector((state) => state.cart);

  // Total price
  const totalPrice = items.reduce((acc, course) => acc + course.price, 0);

  const courseIds = items.map((course) => course._id).filter(Boolean);

  const handleBuyNow = () => {
    if (!token) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    if (user.accountType !== "student") {
      toast.error("Instructors cannot buy courses");
      return;
    }

    buyCourse(token, courseIds, user, navigate, dispatch);
  };

  return (
    <div className="w-full mt-12 bg-richblack-900 min-h-screen">
      <div
        className="
          w-11/12 sm:w-10/12 lg:w-9/12
          mx-auto
          py-10
          flex flex-col
          gap-6
        "
      >
        {/* HEADER */}
        <div>
          <h2 className="text-white text-2xl sm:text-3xl font-semibold">
            My Wishlist
          </h2>
          <p className="text-white opacity-60 text-sm sm:text-lg">
            {items.length} item{items.length !== 1 && "s"} in your wishlist
          </p>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: CART ITEMS */}
          <div className="flex flex-col gap-4 w-full lg:w-[65%]">
            {items.length === 0 ? (
              <p className="text-richblack-200">
                Your wishlist is empty.
              </p>
            ) : (
              items.map((course, index) => (
                <CartItem
                  key={course._id || `cart-${index}`}
                  course={course}
                />
              ))
            )}
          </div>

          {/* RIGHT: TOTAL */}
          <div
            className="
              w-full lg:w-[35%]
              bg-richblack-800
              p-6
              rounded-lg
              h-fit
              sticky top-24
            "
          >
            <h3 className="text-white text-lg mb-1">Total</h3>
            <p className="text-green-400 text-3xl font-bold mb-4">
              ₹ {totalPrice}
            </p>

            <button
              disabled={items.length === 0}
              onClick={handleBuyNow}
              className="
                w-full
                bg-yellow-50
                text-black
                py-2
                rounded-md
                font-semibold
                hover:bg-yellow-25
                disabled:opacity-50
                transition-all
              "
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
