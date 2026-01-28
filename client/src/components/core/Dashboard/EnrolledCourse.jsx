import React, { useEffect, useState } from "react";
import { getEnrolledCourses } from "../../../services/operations/profileAPI";
import { useDispatch, useSelector } from "react-redux";
import EnrolledCourseCard from "./EnrolledCourseCard";

const EnrolledCourse = () => {
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const fetchEnrolledCourses = async () => {
    try {
      const result = await dispatch(getEnrolledCourses(token));
      if (result) setCourses(result);
    } catch (error) {
      console.log("Error fetching enrolled courses:", error);
    }
  };

  useEffect(() => {
    if (token) fetchEnrolledCourses();
  }, [dispatch, token]);

  return (
    <div className="w-full mt-12 bg-richblack-900 min-h-screen">
      <div
        className="
          w-11/12 sm:w-10/12 lg:w-9/12
          mx-auto
          py-10
          flex flex-col gap-6
        "
      >
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl text-white font-semibold">
          Enrolled Courses
        </h2>

        {/* TABLE HEADER (DESKTOP ONLY) */}
        <div
          className="
            hidden md:flex
            justify-between
            px-4 py-3
            bg-richblack-700
            rounded-md
            text-white font-semibold
          "
        >
          <span>Course Name</span>
          <span>Duration</span>
          <span>Progress</span>
        </div>

        {/* CONTENT */}
        {courses.length === 0 ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <p className="text-white text-xl sm:text-2xl opacity-70">
              You have not enrolled in any courses yet 🙂
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {courses.map((course) => (
              <EnrolledCourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourse;
