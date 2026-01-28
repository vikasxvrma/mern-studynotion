import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";

// ================= COMMON =================
import Navbar from "./components/common/Navbar";
import Loader from "./components/common/Loader";

// ================= PUBLIC PAGES =================
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";
import Catalog from "./pages/Catalog";

// ================= COURSE =================
import CourseSpecific from "./components/CourseSpecificPage/CourseSpecific";
import ViewCourse from "./pages/ViewCourse";
import LecturePlayer from "./components/ViewCourse/LecturePlayer";

// ================= DASHBOARD =================
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourse from "./components/core/Dashboard/EnrolledCourse";
import Cart from "./components/core/Dashboard/Cart";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import InstructorDashboard from "./components/core/Dashboard/InstructorDashboard";

// ================= AUTH =================
import { getUserDetails } from "./services/operations/authAPI";

function App() {
  const dispatch = useDispatch();

  const { loading, token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  // Fetch user details once token is available
  useEffect(() => {
    if (token) {
      dispatch(getUserDetails());
    }
  }, [token, dispatch]);

  return (
    <div className="w-screen min-h-screen flex flex-col bg-richblack-900 font-inter overflow-hidden">
      <Navbar />
      {loading && <Loader />}

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route
          path="/catalog/:categoryName/:categoryId"
          element={<Catalog />}
        />

        <Route
          path="/courses/:courseId"
          element={<CourseSpecific />}
        />

        {/* ================= PASSWORD FLOW ================= */}
        <Route path="/resetpassword" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />
        <Route path="/verifyotp" element={<VerifyOtp />} />

        {/* ================= DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="settings" element={<Settings />} />

          {/* STUDENT ROUTES */}
          {user?.accountType === "student" && (
            <>
              <Route
                path="enrolled-courses"
                element={<EnrolledCourse />}
              />
              <Route path="cart" element={<Cart />} />
            </>
          )}

          {/* INSTRUCTOR ROUTES */}
          {user?.accountType === "instructor" && (
            <>
              <Route
                path="instructor"
                element={<InstructorDashboard />}
              />
              <Route path="add-course" element={<AddCourse />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route
                path="edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}
        </Route>

        {/* ================= VIEW COURSE ================= */}
        <Route
          path="/viewcourse/:courseId"
          element={
            <ProtectedRoute>
              <ViewCourse />
            </ProtectedRoute>
          }
        >
          <Route
            path="section/:sectionId/subsection/:subSectionId"
            element={<LecturePlayer />}
          />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
