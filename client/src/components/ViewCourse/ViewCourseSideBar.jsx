import { useEffect, useMemo, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AddReviewModal from "./AddReviewModal";
import {
  createRating,
  updateRating,
} from "../../services/operations/ratingAPI";
import { resetViewCourseState } from "../../slices/viewCourseSlice";

const ViewCourseSideBar = ({ courseDetails }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subSectionId } = useParams();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { completedLectures } = useSelector((state) => state.viewcourse);

  const [activeSectionId, setActiveSectionId] = useState(null);
  const [activeSubSectionId, setActiveSubSectionId] = useState(null);
  const [reviewModalData, setReviewModalData] = useState(null);

  /* ================= TOTAL LECTURES ================= */
  const totalLectures = useMemo(() => {
    if (!courseDetails?.sections) return 0;
    return courseDetails.sections.reduce(
      (acc, sec) => acc + sec.subSections.length,
      0
    );
  }, [courseDetails]);

  /* ================= ACTIVE SECTION ================= */
  useEffect(() => {
    if (!courseDetails || !subSectionId) return;

    const parent = courseDetails.sections.find((sec) =>
      sec.subSections.some((sub) => sub._id === subSectionId)
    );

    if (parent) {
      setActiveSectionId(parent._id);
      setActiveSubSectionId(subSectionId);
    }
  }, [courseDetails, subSectionId]);

  /* ================= USER REVIEW ================= */
  const userReview = useMemo(() => {
    if (!courseDetails?.ratingandreview || !user) return null;

    return courseDetails.ratingandreview.find(
      (rev) => String(rev.user?._id || rev.user) === String(user._id)
    );
  }, [courseDetails, user]);

  /* ================= HANDLERS ================= */
  const toggleSection = (id) => {
    setActiveSectionId((prev) => (prev === id ? null : id));
  };

  const addReview = async (rating, comment) => {
    const res = await dispatch(
      createRating(courseDetails._id, token, comment, rating)
    );
    if (res) setReviewModalData(null);
  };

  const editReview = async (rating, comment) => {
    const res = await dispatch(
      updateRating(userReview._id, rating, comment, token)
    );
    if (res) setReviewModalData(null);
  };

  const handleReviewClick = () => {
    setReviewModalData({
      title: userReview ? "Edit Your Review" : "Add Your Review",
      initialRating: userReview?.rating || 0,
      initialComment: userReview?.comment || "",
      onSave: userReview ? editReview : addReview,
    });
  };

  const handleBack = () => {
    dispatch(resetViewCourseState());
    navigate("/dashboard/enrolled-courses");
  };

  /* ================= JSX ================= */
  return (
    <aside
      className="
        w-full sm:w-[320px] lg:w-[340px]
        h-auto lg:h-[calc(100vh-3.5rem)]
        max-h-[85vh] lg:max-h-none
        bg-richblack-800
        flex flex-col
        border-r border-richblack-700
        overflow-hidden
        rounded-t-2xl lg:rounded-none
        shadow-lg lg:shadow-none
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-richblack-700">
        <FaArrowCircleLeft
          className="text-white text-2xl cursor-pointer hover:text-yellow-25 transition"
          onClick={handleBack}
        />

        <button
          onClick={handleReviewClick}
          className="bg-yellow-25 text-richblack-900 px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-yellow-50 transition"
        >
          {userReview ? "Edit Review" : "Add Review"}
        </button>
      </div>

      {/* COURSE INFO */}
      <div className="px-4 py-3 border-b border-richblack-700">
        <h2 className="text-white font-bold text-lg line-clamp-2">
          {courseDetails?.coursename}
        </h2>
        <p className="text-sm text-richblack-300 mt-1">
          Progress: {completedLectures.length}/{totalLectures}
        </p>
      </div>

      {/* SECTIONS */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 scrollbar-hide">
        {courseDetails?.sections?.map((sec) => (
          <div
            key={sec._id}
            className="bg-richblack-700 rounded-lg p-3"
          >
            <div
              onClick={() => toggleSection(sec._id)}
              className="flex justify-between items-center cursor-pointer"
            >
              <p className="text-yellow-25 font-semibold text-sm">
                {sec.sectionName}
              </p>
              {activeSectionId === sec._id ? (
                <IoIosArrowDropup className="text-yellow-25" />
              ) : (
                <IoIosArrowDropdown className="text-yellow-25" />
              )}
            </div>

            {activeSectionId === sec._id && (
              <div className="mt-3 flex flex-col gap-1">
                {sec.subSections.map((sub) => {
                  const isCompleted = completedLectures.includes(sub._id);
                  const isActive = activeSubSectionId === sub._id;

                  return (
                    <div
                      key={sub._id}
                      onClick={() =>
                        navigate(
                          `/viewcourse/${courseDetails._id}/section/${sec._id}/subsection/${sub._id}`
                        )
                      }
                      className={`
                        flex items-center gap-2 px-2 py-1.5 rounded-md
                        cursor-pointer transition
                        ${
                          isActive
                            ? "bg-richblack-900"
                            : "hover:bg-richblack-800"
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        readOnly
                        className="accent-green-500 cursor-not-allowed"
                      />
                      <p
                        className={`text-sm ${
                          isCompleted
                            ? "text-green-400 line-through"
                            : "text-white"
                        }`}
                      >
                        {sub.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* REVIEW MODAL */}
      {reviewModalData && (
        <AddReviewModal
          title={reviewModalData.title}
          initialRating={reviewModalData.initialRating}
          initialComment={reviewModalData.initialComment}
          onSave={reviewModalData.onSave}
          onClose={() => setReviewModalData(null)}
        />
      )}
    </aside>
  );
};

export default ViewCourseSideBar;
