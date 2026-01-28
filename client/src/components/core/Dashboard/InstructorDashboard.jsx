import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { instructorCourses } from "../../../services/operations/courseAPI";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { TfiTimer } from "react-icons/tfi";
import { setLoading } from "../../../slices/authSlice";
import InstructorChart from "./InstructorChart";

const InstructorDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  // ================= FETCH COURSES =================
  const fetchInstructorCourses = async () => {
    try {
      dispatch(setLoading(true));
      const res = await dispatch(instructorCourses(token));
      if (res?.data?.data) {
        setCourses(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching instructor courses:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (token) fetchInstructorCourses();
  }, [token]);

  // ================= STATS =================
  const stats = useMemo(() => ({
    totalCourses: courses.length,
    totalStudents: courses.reduce(
      (acc, c) => acc + (c.studentsenrolled?.length || 0),
      0
    ),
    totalIncome: courses.reduce(
      (acc, c) =>
        acc + (c.price || 0) * (c.studentsenrolled?.length || 0),
      0
    ),
  }), [courses]);

  // ================= CHART DATA =================
  const chartData = useMemo(() => ({
    labels: courses.map((c) => c.coursename),
    students: courses.map((c) => c.studentsenrolled?.length || 0),
    income: courses.map(
      (c) => (c.price || 0) * (c.studentsenrolled?.length || 0)
    ),
  }), [courses]);

  const topCourses = courses.slice(0, 3);

  return (
    <div className="w-full mt-12  bg-richblack-900 min-h-screen">
      <div className="w-11/12 sm:w-10/12 mx-auto py-8 flex flex-col gap-10">

        {/* GREETING */}
        <div>
          <h1 className="text-white text-2xl sm:text-3xl font-bold">
            Hi, {user?.firstName} 👋
          </h1>
          <p className="text-richblack-300 text-sm sm:text-lg">
            Let’s start something new today
          </p>
        </div>

        {/* CHART + STATS */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* CHART */}
          <div className="w-full lg:w-8/12">
            {chartData.labels.length > 0 ? (
              <InstructorChart
                labels={chartData.labels}
                students={chartData.students}
                income={chartData.income}
              />
            ) : (
              <div className="bg-richblack-800 rounded-xl p-10 text-center text-richblack-300">
                No analytics data available
              </div>
            )}
          </div>

          {/* STATS */}
          <div className="w-full lg:w-4/12 bg-richblack-800 rounded-xl p-6">
            <h2 className="text-white text-xl font-bold mb-6">
              Statistics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <Stat label="Total Courses" value={stats.totalCourses} />
              <Stat label="Total Students" value={stats.totalStudents} />
              <Stat
                label="Total Income"
                value={`₹ ${stats.totalIncome}`}
                green
              />
            </div>
          </div>
        </div>

        {/* COURSES */}
        <div className="bg-richblack-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-xl font-bold">
              Your Courses
            </h2>
            <button
              onClick={() => navigate("/dashboard/my-courses")}
              className="text-yellow-25 hover:underline"
            >
              View all
            </button>
          </div>

          {topCourses.length === 0 ? (
            <p className="text-richblack-300">
              You haven’t created any courses yet.
            </p>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-2">
              {topCourses.map((course) => (
                <div
                  key={course._id}
                  className="
                    min-w-[260px] sm:min-w-[300px]
                    bg-richblack-700 rounded-lg overflow-hidden
                    cursor-pointer hover:scale-[1.02]
                    transition-all
                  "
                  onClick={() =>
                    navigate(`/dashboard/edit-course/${course._id}`)
                  }
                >
                  <img
                    src={course.thumbnail}
                    alt={course.coursename}
                    className="h-40 w-full object-cover"
                  />

                  <div className="p-4 flex flex-col gap-3">
                    <h3 className="text-white font-semibold line-clamp-2">
                      {course.coursename}
                    </h3>

                    <div className="flex justify-between items-center">
                      {course.status === "DRAFT" ? (
                        <span className="flex items-center gap-1 text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded-full">
                          <TfiTimer /> Draft
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full">
                          <MdOutlinePublishedWithChanges /> Published
                        </span>
                      )}

                      <span className="text-green-400 font-bold">
                        ₹{course.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default InstructorDashboard;

const Stat = ({ label, value, green }) => (
  <div>
    <p className="text-richblack-300 text-sm">{label}</p>
    <p
      className={`text-2xl sm:text-3xl font-bold ${
        green ? "text-green-400" : "text-white"
      }`}
    >
      {value}
    </p>
  </div>
);
