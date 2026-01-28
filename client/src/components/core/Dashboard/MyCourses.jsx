import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  deleteCourse,
  instructorCourses,
} from "../../../services/operations/courseAPI";
import { setLoading } from "../../../slices/authSlice";

import { TfiTimer } from "react-icons/tfi";
import {
  MdOutlinePublishedWithChanges,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import ConfirmationModal from "../../common/ConfirmationModal";

const MyCourses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [courses, setCourses] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // ================= FETCH COURSES =================
  const fetchInstructorCourses = async () => {
    try {
      dispatch(setLoading(true));
      const response = await dispatch(instructorCourses(token));
      if (response?.data?.data) {
        setCourses(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching instructor courses:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchInstructorCourses();
  }, []);

  // ================= DELETE COURSE =================
  const deleteCourseHandler = async (courseId) => {
    try {
      dispatch(setLoading(true));
      const response = await dispatch(deleteCourse(token, courseId));
      if (response?.data?.success) {
        setConfirmationModal(null);
        fetchInstructorCourses();
      }
    } catch (error) {
      console.log("Error deleting course:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deleteClickHandler = (courseId) => {
    setConfirmationModal({
      heading: "Delete Course?",
      text: "Students may already be enrolled. This action is irreversible.",
      btn1: "Delete",
      btn2: "Cancel",
      btn1handler: () => deleteCourseHandler(courseId),
      btn2handler: () => setConfirmationModal(null),
    });
  };

  return (
    <div className="w-full mt-12  bg-richblack-900 min-h-screen">
      <div className="w-11/12 sm:w-10/12 mx-auto py-8 flex flex-col gap-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl text-white font-bold">
            My Courses
          </h2>

          <button
            onClick={() => navigate("/dashboard/add-course")}
            className="bg-yellow-25 hover:bg-yellow-200 rounded-md px-4 py-2 text-richblack-900 font-semibold w-fit"
          >
            + Add Course
          </button>
        </div>

        {/* DESKTOP TABLE HEADER */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] gap-6 px-4 py-2 text-richblack-300 text-sm font-semibold uppercase border-b border-richblack-700">
          <div>Course</div>
          <div className="text-center">Price</div>
          <div className="text-center">Actions</div>
        </div>

        {/* EMPTY STATE */}
        {courses.length === 0 && (
          <p className="text-richblack-300 mt-6">
            You haven’t created any courses yet.
          </p>
        )}

        {/* COURSE LIST */}
        <div className="flex flex-col gap-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="
                flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr]
                gap-4 md:gap-6
                bg-richblack-800
                border border-richblack-700
                rounded-xl p-4
              "
            >
              {/* COURSE INFO */}
              <div className="flex gap-4 items-start">
                <img
                  src={course.thumbnail}
                  alt="course thumbnail"
                  className="h-20 w-32 rounded-md object-cover"
                />

                <div className="flex flex-col gap-1">
                  <h3 className="text-white font-semibold">
                    {course.coursename}
                  </h3>

                  <p className="text-xs text-richblack-300">
                    Created on{" "}
                    {new Date(course.createdAt).toLocaleDateString()}
                  </p>

                  {/* STATUS */}
                  {course.status === "DRAFT" ? (
                    <span className="flex items-center gap-1 w-fit text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded-full">
                      <TfiTimer /> Draft
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 w-fit text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full">
                      <MdOutlinePublishedWithChanges /> Published
                    </span>
                  )}
                </div>
              </div>

              {/* PRICE */}
              <div className="md:text-center text-green-400 font-bold text-lg">
                ₹{course.price}
              </div>

              {/* ACTIONS */}
              <div className="flex md:justify-center gap-6 text-xl text-white">
                <MdEdit
                  className="cursor-pointer hover:text-yellow-25"
                  onClick={() =>
                    navigate(`/dashboard/edit-course/${course._id}`)
                  }
                />
                <MdDelete
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => deleteClickHandler(course._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {confirmationModal && <ConfirmationModal {...confirmationModal} />}
    </div>
  );
};

export default MyCourses;
