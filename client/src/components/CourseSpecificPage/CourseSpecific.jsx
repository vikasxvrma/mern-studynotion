import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RatingStars from "../catalog.jsx/RatingStars";
import { IoGlobeOutline } from "react-icons/io5";
import { FaRegShareSquare } from "react-icons/fa";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import Footer from "../common/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseSpecific } from "../../services/operations/courseAPI";
import { buyCourse } from "../../services/operations/studentFeaturesAPI";
import { addToCart } from "../../slices/cartSlice";
import toast from "react-hot-toast";
import copy from "copy-to-clipboard";

const CourseSpecific = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(null);

  /* ================= FETCH COURSE ================= */
  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      const res = await dispatch(getCourseSpecific(courseId));
      if (res) setCourse(res);
    };

    fetchCourse();
  }, [courseId, dispatch]);

  /* ================= CHECK ENROLLMENT ================= */
  useEffect(() => {
    if (course && user) {
      setIsEnrolled(course.studentsenrolled?.includes(user._id));
    }
  }, [course, user]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading course...
      </div>
    );
  }

  const totalLectures = course.sections.reduce(
    (acc, sec) => acc + sec.subSections.length,
    0
  );

  /* ================= HANDLERS ================= */
  const handleBuyNow = () => {
    if (!token) return navigate("/login"), toast.error("Login required");
    if (user.accountType !== "student")
      return toast.error("Instructors cannot buy courses");

    buyCourse(token, [course._id], user, navigate, dispatch);
  };

  const handleAddToCart = () => {
    if (!token) return navigate("/login"), toast.error("Login required");
    if (isEnrolled) return toast.error("Already enrolled");

    dispatch(
      addToCart({
        _id: course._id,
        coursename: course.coursename,
        price: course.price,
        thumbnail: course.thumbnail,
        category: course.category,
      })
    );
    navigate("/dashboard/cart");
  };

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Course link copied");
  };

  return (
    <div className="w-full bg-richblack-900 text-white">
      {/* ================= HERO ================= */}
      <section className="bg-richblack-800 py-10">
        <div className="w-11/12 lg:w-9/12 mx-auto flex flex-col lg:flex-row gap-10">
          {/* LEFT */}
          <div className="flex-1 space-y-5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              {course.coursename}
            </h1>

            <p className="text-richblack-200 text-base sm:text-lg">
              {course.coursedescription}
            </p>

            <div className="flex flex-col gap-2">
              <RatingStars courseId={courseId} />
              <p className="text-sm text-richblack-300">
                {course.studentsenrolled.length} students enrolled
              </p>
            </div>

            <div className="flex items-center gap-2 text-richblack-200">
              <IoGlobeOutline /> English
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="w-full lg:w-[360px] bg-richblack-900 rounded-xl p-5 space-y-4 lg:sticky lg:top-24">
            <img
              src={course.thumbnail}
              alt="thumbnail"
              className="rounded-lg h-48 w-full object-cover"
            />

            <p className="text-3xl font-bold">₹{course.price}</p>

            {isEnrolled ? (
              <button
                onClick={() => navigate("/dashboard/enrolled-courses")}
                className="w-full bg-yellow-25 text-black py-2 rounded-md font-bold"
              >
                Go to Course
              </button>
            ) : (
              <>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-yellow-25 text-black py-2 rounded-md font-bold"
                >
                  Buy Now
                </button>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-richblack-700 py-2 rounded-md"
                >
                  Add to Cart
                </button>
              </>
            )}

            <p className="text-xs text-richblack-400 text-center">
              30-day money-back guarantee
            </p>

            <div className="space-y-1 text-sm text-green-400">
              <p>✔ Lifetime access</p>
              <p>✔ Full HD content</p>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 text-yellow-25 text-sm"
            >
              <FaRegShareSquare /> Share
            </button>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="w-11/12 lg:w-9/12 mx-auto py-12 space-y-10">
        {/* LEARN */}
        <div className="border border-richblack-700 rounded-lg p-5">
          <h2 className="text-2xl font-bold mb-2">What you’ll learn</h2>
          <p className="text-richblack-300">{course.whatyouwilllearn}</p>
        </div>

        {/* COURSE CONTENT */}
        <div>
          <h2 className="text-2xl font-bold">Course Content</h2>
          <p className="text-sm text-richblack-400 mb-4">
            {course.sections.length} sections • {totalLectures} lectures
          </p>

          <div className="space-y-3">
            {course.sections.map((sec) => (
              <div
                key={sec._id}
                className="bg-richblack-800 rounded-lg p-4"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setActiveSectionId(
                      activeSectionId === sec._id ? null : sec._id
                    )
                  }
                >
                  <p className="font-semibold text-yellow-25">
                    {sec.sectionName}
                  </p>
                  {activeSectionId === sec._id ? (
                    <IoIosArrowDropup />
                  ) : (
                    <IoIosArrowDropdown />
                  )}
                </div>

                {activeSectionId === sec._id && (
                  <div className="mt-3 pl-3 space-y-1 text-richblack-300">
                    {sec.subSections.map((sub) => (
                      <p key={sub._id}>• {sub.title}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AUTHOR */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Instructor</h2>
          <div className="flex items-center gap-3">
            <img
              src={course.instructor.additionalDetails.image}
              alt="author"
              className="h-12 w-12 rounded-full object-cover"
            />
            <p className="text-cyan-300 font-semibold">
              {course.instructor.firstName} {course.instructor.lastName}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseSpecific;
