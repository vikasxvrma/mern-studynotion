import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import ReviewCard from "./ReviewCard";

const ReviewSlider = ({ reviews = [] }) => {
  if (!reviews.length) {
    return (
      <p className="text-richblack-300 text-center py-10">
        No reviews available.
      </p>
    );
  }

  return (
    <div className="w-11/12 mx-auto mt-10 mb-10">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={24}
        slidesPerView={1.1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-10"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id} className="h-auto">
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
