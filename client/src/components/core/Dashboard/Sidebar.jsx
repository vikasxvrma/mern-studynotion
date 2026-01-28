import React, { useState } from "react";
import { sidebarLinks } from "../../../data/Dashboard-Link";
import { IoLogOut } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { Link, useLocation, matchPath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../common/ConfirmationModal";
import { FaBars } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [open, setOpen] = useState(false); // mobile

  const matchRoute = (route) => matchPath({ path: route }, location.pathname);

  return (
    <>
      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-20 left-4 z-[200] bg-richblack-800 p-3 rounded-md text-white"
      >
        <FaBars />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-[150] lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
    fixed lg:sticky
    top-[3.5rem]
    h-[calc(100vh-3.5rem)]
    w-[240px]
    bg-richblack-800
    flex flex-col
    px-4 py-5
    gap-3
    z-[200]
    transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
      >
        {/* LINKS */}
        <nav className="flex flex-col pt-12 gap-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = matchRoute(link.path);

            if (link.id !== 1 && link.type !== user?.accountType) return null;

            return (
              <Link
                key={link.id}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`
                  relative flex items-center gap-3
                  px-4 py-2 rounded-md
                  text-sm font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-yellow-25 text-richblack-900"
                      : "text-richblack-100 hover:bg-richblack-900 hover:text-white"
                  }
                `}
              >
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-yellow-300 rounded-r-md" />
                )}
                <Icon className="text-lg" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* FOOTER ACTIONS */}
        <div className="mt-auto flex flex-col gap-2">
          {/* SETTINGS */}
          <button
            onClick={() => {
              navigate("/dashboard/settings");
              setOpen(false);
            }}
            className="
              flex items-center gap-3
              px-4 py-2 rounded-md
              text-richblack-100
              hover:bg-richblack-900 hover:text-white
              transition-all
            "
          >
            <IoIosSettings className="text-lg" />
            Settings
          </button>

          {/* LOGOUT */}
          <button
            onClick={() =>
              setConfirmationModal({
                heading: "Logout?",
                text: "You will be logged out of your account.",
                btn1: "Logout",
                btn2: "Cancel",
                btn1handler: () => {
                  dispatch(logOut());
                  setConfirmationModal(null);
                },
                btn2handler: () => setConfirmationModal(null),
              })
            }
            className="
              flex items-center gap-3
              px-4 py-2 rounded-md
              text-red-400
              hover:bg-red-600 hover:text-white
              transition-all
            "
          >
            <IoLogOut className="text-lg" />
            Logout
          </button>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {confirmationModal && <ConfirmationModal {...confirmationModal} />}
    </>
  );
};

export default Sidebar;
