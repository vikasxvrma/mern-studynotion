import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import CourseCard from "./CourseCard";
import { Navigation } from "swiper/modules";

const CourseSlider = ({ courses = [] }) => {
  if (!courses.length) {
    return <p className="text-richblack-300">No courses available.</p>;
  }

  return (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={16}                 // tighter spacing on mobile
      slidesPerView={1.05}              // mobile peek
      breakpoints={{
        480: {
          slidesPerView: 1.3,
          spaceBetween: 16,
        },
        640: {
          slidesPerView: 2.2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      }}
      className="
        pb-10
        px-1 sm:px-0        /* mobile edge breathing room */
      "
    >
      {courses.map((course) => (
        <SwiperSlide key={course._id} className="flex justify-center">
          <CourseCard courseData={course} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CourseSlider;
