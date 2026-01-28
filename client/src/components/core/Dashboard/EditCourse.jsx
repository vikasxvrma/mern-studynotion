import React, { useEffect } from "react";
import RendersStep from "./RendersStep";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourseDetails } from "../../../services/operations/courseAPI";
import { setCourse, setEditCourse } from "../../../slices/courseSlice";

const EditCourse = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  useEffect(() => {
    const populateCourseDetails = async () => {
      const result = await dispatch(getCourseDetails(token, courseId));
      if (result) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result));
      }
    };

    if (courseId && token) {
      populateCourseDetails();
    }
  }, [courseId, token, dispatch]);

  return (
    <div className="w-full bg-richblack-900 min-h-screen">
      <div
        className="
          w-11/12 sm:w-10/12 lg:w-9/12
          mx-auto
          py-10
          flex flex-col gap-6
        "
      >
        {/* HEADING */}
        <h2 className="text-white font-bold text-2xl sm:text-3xl">
          Edit Course
        </h2>

        {/* CONTENT */}
        {course ? (
          <RendersStep />
        ) : (
          <div className="flex justify-center items-center min-h-[300px]">
            <p className="text-white text-xl opacity-60">
              Course not found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditCourse;
