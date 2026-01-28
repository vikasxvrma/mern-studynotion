import React from "react";
import { useSelector } from "react-redux";
import { LiaEdit } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-richblack-900">
      <div className="w-11/12 sm:w-10/12 mt-12 lg:w-9/12 mx-auto py-8 flex flex-col gap-8">

        {/* HEADING */}
        <h2 className="text-white text-2xl sm:text-3xl font-semibold tracking-wide">
          My Profile
        </h2>

        {/* SECTION 1 : PROFILE */}
        <div className="bg-richblack-800 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-richblack-700">
          {/* LEFT */}
          <div className="flex gap-4 items-center">
            <img
              src={user?.additionalDetails?.image}
              alt="profile"
              className="h-16 w-16 rounded-full object-cover border border-richblack-600"
            />

            <div className="flex flex-col gap-1">
              <p className="text-richblack-25 text-lg font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-richblack-100 text-sm">
                {user?.email}
              </p>
            </div>
          </div>

          {/* EDIT */}
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="flex items-center gap-2 bg-yellow-25 text-richblack-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-100 transition"
          >
            <LiaEdit />
            Edit
          </button>
        </div>

        {/* SECTION 2 : ABOUT */}
        <div className="bg-richblack-800 rounded-xl p-5 flex flex-col sm:flex-row justify-between gap-4 border border-richblack-700">
          <div className="flex flex-col gap-3 sm:max-w-[75%]">
            <h3 className="text-richblack-25 text-xl font-medium">
              About
            </h3>
            <p className="text-richblack-100 text-sm leading-relaxed">
              {user?.additionalDetails?.about
                ? user.additionalDetails.about
                : "Write something about yourself"}
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard/settings")}
            className="flex items-center gap-2 bg-yellow-25 text-richblack-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-100 transition h-fit"
          >
            <LiaEdit />
            Edit
          </button>
        </div>

        {/* SECTION 3 : PERSONAL DETAILS */}
        <div className="bg-richblack-800 rounded-xl p-5 flex flex-col sm:flex-row justify-between gap-6 border border-richblack-700">
          <div className="flex flex-col gap-6 w-full">
            <h3 className="text-richblack-25 text-xl font-medium">
              Personal Details
            </h3>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
              <Detail label="First Name" value={user?.firstName?.toUpperCase()} />
              <Detail label="Last Name" value={user?.lastName?.toUpperCase()} />
              <Detail label="Email" value={user?.email || "xyz@gmail.com"} />
              <Detail
                label="Phone Number"
                value={user?.additionalDetails?.phone || "XXXXXXXXXX"}
              />
              <Detail
                label="Gender"
                value={user?.additionalDetails?.gender || "Not Set"}
              />
              <Detail
                label="Date of Birth"
                value={user?.additionalDetails?.dob || "--/--/----"}
              />
            </div>
          </div>

          <button
            onClick={() => navigate("/dashboard/settings")}
            className="flex items-center gap-2 bg-yellow-25 text-richblack-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-100 transition h-fit"
          >
            <LiaEdit />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

/* ================= HELPER ================= */

const Detail = ({ label, value }) => (
  <div>
    <p className="text-richblack-100 text-sm mb-1">
      {label}
    </p>
    <p className="text-white text-lg font-semibold">
      {value}
    </p>
  </div>
);
