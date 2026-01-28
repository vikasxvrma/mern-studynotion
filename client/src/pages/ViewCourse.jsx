import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ViewCourseSideBar from "../components/ViewCourse/ViewCourseSideBar";
import { getUserCourseDetails } from "../services/operations/courseAPI";
import {
  setcourseEntireData,
  setcourseSectionData,
  setTotalNoofLectures,
  setCompletedLectures,
} from "../slices/viewCourseSlice";

const ViewCourse = () => {
  const { token } = useSelector((state) => state.auth);
  const { courseId, subSectionId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [courseDetails, setCourseDetails] = useState(null);

  // ================= FETCH COURSE =================
  useEffect(() => {
    const populateCourseDetails = async () => {
      const result = await dispatch(getUserCourseDetails(token, courseId));
      if (!result) return;

      setCourseDetails(result.course);

      dispatch(setcourseEntireData(result.course));
      dispatch(setcourseSectionData(result.course.sections));
      dispatch(setCompletedLectures(result.completedVideos || []));

      const totalLectures = result.course.sections.reduce(
        (acc, sec) => acc + sec.subSections.length,
        0
      );
      dispatch(setTotalNoofLectures(totalLectures));
    };

    if (courseId && token) {
      populateCourseDetails();
    }
  }, [courseId, token, dispatch]);

  // ================= AUTO NAVIGATE =================
  useEffect(() => {
    if (!courseDetails || subSectionId) return;

    const firstSection = courseDetails.sections?.[0];
    const firstSub = firstSection?.subSections?.[0];

    if (firstSection && firstSub) {
      navigate(
        `/viewcourse/${courseId}/section/${firstSection._id}/subsection/${firstSub._id}`,
        { replace: true }
      );
    }
  }, [courseDetails, subSectionId, courseId, navigate]);

  return (
    <div
      className="
        w-full min-h-screen bg-richblack-900
        flex flex-col lg:flex-row
        overflow-hidden
      "
    >
      {/* SIDEBAR */}
      <div className="w-full lg:w-[320px] shrink-0">
        <ViewCourseSideBar courseDetails={courseDetails} />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default ViewCourse;
