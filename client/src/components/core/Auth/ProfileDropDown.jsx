import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

import { logOut } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../common/ConfirmationModal";

const ProfileDropDown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleLogout = () => {
    setConfirmationModal({
      heading: "Are you sure?",
      text: "You will be logged out of your account.",
      btn1: "Logout",
      btn2: "Cancel",
      btn1handler: () => {
        dispatch(logOut());
        setConfirmationModal(null);
      },
      btn2handler: () => setConfirmationModal(null),
    });
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative " ref={dropdownRef}>
      {/* TRIGGER */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex items-center gap-2
          bg-richblack-700 hover:bg-richblack-600
          px-2 py-1 rounded-md
          transition-all
          cursor-pointer
        "
      >
        {/* Avatar */}
        <img
          src={user?.additionalDetails?.image}
          alt="profile"
          className="h-8 w-8 rounded-full object-cover border border-richblack-600"
        />

        {/* Name (hidden on very small screens) */}
        <span className="hidden sm:block text-white font-semibold text-sm">
          {user
            ? `${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`
            : "Profile"}
        </span>

        {/* Arrow */}
        <span className="text-white text-xl">
          {open ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
        </span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute right-0 mt-3
            w-48 sm:w-56
            bg-white rounded-lg shadow-xl
            z-[200]
            overflow-hidden
            animate-dropdown
          "
        >
          {/* USER INFO */}
          <div className="px-4 py-3 border-b border-richblack-200">
            <p className="font-semibold text-richblack-900">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-richblack-600 truncate">
              {user?.email}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col p-1">
            <button
              onClick={() => {
                navigate("/dashboard/my-profile");
                setOpen(false);
              }}
              className="
                px-4 py-2 text-left text-richblack-700
                hover:bg-richblack-700 hover:text-white
                rounded-md transition-all
                cursor-pointer
              "
            >
              Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="
                px-4 py-2 text-left text-red-600
                hover:bg-red-600 hover:text-white
                rounded-md transition-all
                cursor-pointer
              "
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL */}
      {confirmationModal && (
        <ConfirmationModal
          heading={confirmationModal.heading}
          text={confirmationModal.text}
          btn1={confirmationModal.btn1}
          btn2={confirmationModal.btn2}
          btn1handler={confirmationModal.btn1handler}
          btn2handler={confirmationModal.btn2handler}
        />
      )}
    </div>
  );
};

export default ProfileDropDown;
