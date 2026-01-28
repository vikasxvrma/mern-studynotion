import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateCompletedLectures } from "../../slices/viewCourseSlice";
import { fetchSubSection } from "../../services/operations/subSectionAPI";
import { updateCourseProgress } from "../../services/operations/courseProgressAPI";

import { FaCheckCircle, FaRedo } from "react-icons/fa";

const LecturePlayer = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const { token } = useSelector((state) => state.auth);
  const { completedLectures } = useSelector((state) => state.viewcourse);

  const [lecture, setLecture] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(true);

  const isCompleted = completedLectures.includes(subSectionId);

  /* ================= FETCH LECTURE ================= */
  useEffect(() => {
    const loadLecture = async () => {
      setLoading(true);
      setVideoEnded(false);

      const res = await dispatch(
        fetchSubSection(token, courseId, sectionId, subSectionId)
      );

      if (res?.videoUrl) {
        setLecture(res);
        setVideoUrl(res.videoUrl);
      }

      setLoading(false);
    };

    if (token && courseId && sectionId && subSectionId) {
      loadLecture();
    }
  }, [token, courseId, sectionId, subSectionId, dispatch]);

  /* ================= VIDEO HANDLERS ================= */
  const handleVideoEnd = () => setVideoEnded(true);

  const handleMarkComplete = async () => {
    if (isCompleted) return;

    await dispatch(updateCourseProgress(token, courseId, subSectionId));
    dispatch(updateCompletedLectures(subSectionId));
    setVideoEnded(false);
  };

  const handleRewatch = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setVideoEnded(false);
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-richblack-900 text-white">
        Loading lecture...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-richblack-900 px-4 sm:px-6 py-6">
      <div className="max-w-7xl mx-auto">

        {/* ================= DESKTOP LAYOUT ================= */}
        <div className="hidden md:grid grid-cols-[1.2fr_0.8fr] gap-8">

          {/* VIDEO (YouTube size) */}
          <div className="bg-richblack-800 rounded-2xl shadow-xl overflow-hidden">
            {videoUrl && (
              <div className="aspect-video bg-black">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  controls
                  onEnded={handleVideoEnd}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          {/* LECTURE DETAILS */}
          <div className="flex flex-col gap-4">
            <h1 className="text-white text-2xl font-bold leading-snug">
              {lecture?.title}
            </h1>

            <div className="h-[1px] bg-richblack-700" />

            <p className="text-richblack-300 text-base leading-relaxed">
              {lecture?.description}
            </p>
          </div>
        </div>

        {/* ================= MOBILE LAYOUT ================= */}
        <div className="md:hidden flex flex-col gap-5">

          <div className="bg-richblack-800 rounded-xl overflow-hidden shadow-lg">
            {videoUrl && (
              <div className="aspect-video bg-black">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  controls
                  onEnded={handleVideoEnd}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          <div className="bg-richblack-800 rounded-xl p-4 shadow-md">
            <h1 className="text-white text-lg font-semibold mb-2">
              {lecture?.title}
            </h1>
            <p className="text-richblack-300 text-sm leading-relaxed">
              {lecture?.description}
            </p>
          </div>
        </div>

        {/* ================= ACTION BAR ================= */}
        {videoEnded && (
          <div
            className="
              fixed 
              bottom-4 left-4 right-4 
              md:left-auto md:right-10 md:bottom-6
              bg-richblack-800 
              border border-richblack-700 
              rounded-2xl 
              shadow-2xl 
              p-4 
              flex justify-center md:justify-end
              animate-fadeIn
            "
          >
            {!isCompleted ? (
              <button
                onClick={handleMarkComplete}
                className="
                  flex items-center gap-2 
                  bg-green-500 hover:bg-green-600 
                  text-white font-semibold 
                  px-6 py-2 
                  rounded-xl 
                  transition-all
                "
              >
                <FaCheckCircle />
                Mark as Complete
              </button>
            ) : (
              <button
                onClick={handleRewatch}
                className="
                  flex items-center gap-2 
                  bg-yellow-25 hover:bg-yellow-50 
                  text-richblack-900 font-semibold 
                  px-6 py-2 
                  rounded-xl 
                  transition-all
                "
              >
                <FaRedo />
                Rewatch
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LecturePlayer;
