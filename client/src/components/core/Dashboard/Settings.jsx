import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineFileUpload, MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { changePassword } from "../../../services/operations/authAPI";
import {
  deleteProfile,
  updateProfile,
  updateProfilePicture,
} from "../../../services/operations/profileAPI";
import ConfirmationModal from "../../common/ConfirmationModal";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  /* ---------------- STATE ---------------- */
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    about: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmpassword: "",
  });

  const [file, setFile] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  /* ---------------- PREFILL ---------------- */
  useEffect(() => {
    if (!user) return;
    setUserData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      gender: user?.additionalDetails?.gender || "",
      dob: user?.additionalDetails?.dob || "",
      about: user?.additionalDetails?.about || "",
      phone: user?.additionalDetails?.phone || "",
    });
  }, [user]);

  /* ---------------- HANDLERS ---------------- */
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(token, userData));
  };

  const handlePasswordSave = async () => {
    if (passwordData.password !== passwordData.confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }
    const ok = await dispatch(
      changePassword(passwordData.password, passwordData.confirmpassword)
    );
    if (ok) setPasswordData({ password: "", confirmpassword: "" });
  };

  const handleProfileSubmit = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }
    const fd = new FormData();
    fd.append("profilepic", file);
    const ok = await dispatch(updateProfilePicture(token, fd));
    if (ok) setFile(null);
  };

  const handleDeleteProfile = async () => {
    const ok = await dispatch(deleteProfile(token));
    if (ok) navigate("/");
  };

  return (
    <div className="w-full min-h-screen bg-richblack-900 px-4 sm:px-8 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">

        {/* ================= PROFILE IMAGE ================= */}
        <section className="bg-richblack-800 rounded-xl border border-richblack-700 p-6 flex flex-col sm:flex-row gap-6 items-center">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : user?.additionalDetails?.image || "/default-avatar.png"
            }
            alt="profile"
            className="h-20 w-20 rounded-full object-cover border border-richblack-600"
          />

          <div className="flex flex-col gap-3 w-full">
            <h3 className="text-xl text-white font-semibold">
              Change Profile Picture
            </h3>

            <div className="flex flex-wrap gap-3">
              <input
                type="file"
                id="profilepic"
                hidden
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <button
                type="button"
                onClick={() => document.getElementById("profilepic").click()}
                className="bg-richblack-700 text-white px-4 py-2 rounded-md hover:bg-richblack-600"
              >
                Select
              </button>

              <button
                type="button"
                onClick={handleProfileSubmit}
                className="bg-yellow-25 text-richblack-900 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-yellow-50"
              >
                Upload <MdOutlineFileUpload />
              </button>
            </div>
          </div>
        </section>

        {/* ================= PROFILE INFO ================= */}
        <form
          onSubmit={handleUserSubmit}
          className="bg-richblack-800 rounded-xl border border-richblack-700 p-6 flex flex-col gap-6"
        >
          <h2 className="text-xl font-semibold text-white">
            Profile Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              ["First Name", "firstName"],
              ["Last Name", "lastName"],
              ["Phone", "phone"],
              ["About", "about"],
            ].map(([label, key]) => (
              <input
                key={key}
                placeholder={label}
                value={userData[key]}
                onChange={(e) =>
                  setUserData({ ...userData, [key]: e.target.value })
                }
                className="bg-richblack-900 border border-richblack-700 px-4 py-2 rounded-md text-white"
              />
            ))}

            <select
              value={userData.gender}
              onChange={(e) =>
                setUserData({ ...userData, gender: e.target.value })
              }
              className="bg-richblack-900 border border-richblack-700 px-4 py-2 rounded-md text-white"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to say</option>
            </select>

            <input
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData({ ...userData, dob: e.target.value })
              }
              className="bg-richblack-900 border border-richblack-700 px-4 py-2 rounded-md text-white"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() =>
                setUserData({
                  firstName: "",
                  lastName: "",
                  gender: "",
                  dob: "",
                  about: "",
                  phone: "",
                })
              }
              className="bg-richblack-600 px-5 py-2 rounded-md text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-yellow-25 px-6 py-2 rounded-md text-black font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* ================= PASSWORD ================= */}
        <section className="bg-richblack-800 rounded-xl border border-richblack-700 p-6 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-white">
            Update Password
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {["password", "confirmpassword"].map((key, i) => (
              <input
                key={key}
                type="password"
                placeholder={i === 0 ? "New Password" : "Confirm Password"}
                value={passwordData[key]}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, [key]: e.target.value })
                }
                className="bg-richblack-900 border border-richblack-700 px-4 py-2 rounded-md text-white"
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() =>
                setPasswordData({ password: "", confirmpassword: "" })
              }
              className="bg-richblack-600 px-5 py-2 rounded-md text-white"
            >
              Cancel
            </button>

            <button
              onClick={handlePasswordSave}
              className="bg-yellow-25 px-6 py-2 rounded-md text-black font-semibold"
            >
              Save Password
            </button>
          </div>
        </section>

        {/* ================= DELETE ACCOUNT ================= */}
        <section className="bg-red-50 border border-red-300 rounded-xl p-6">
          <div className="flex gap-4 items-start">
            <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center">
              <MdDelete className="text-white text-2xl" />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-red-700">
                Delete Account
              </h3>
              <p className="text-red-600 text-sm">
                This action is permanent and cannot be undone.
              </p>

              <button
                onClick={() =>
                  setConfirmationModal({
                    heading: "Delete Account?",
                    text: "All your data will be permanently removed.",
                    btn1: "Delete",
                    btn2: "Cancel",
                    btn1handler: handleDeleteProfile,
                    btn2handler: () => setConfirmationModal(null),
                  })
                }
                className="text-red-700 font-semibold underline w-fit"
              >
                I understand, delete my account
              </button>
            </div>
          </div>
        </section>
      </div>

      {confirmationModal && <ConfirmationModal {...confirmationModal} />}
    </div>
  );
};

export default Settings;
