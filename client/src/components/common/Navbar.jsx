import React, { useEffect, useState } from "react";
import smlogo from "../../Asset/Logo/Logo-Small-Light.png";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { NavbarLinks } from "../../data/Navbar-Link";
import { useDispatch, useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { logOut } from "../../services/operations/authAPI";
import ConfirmationModal from "../common/ConfirmationModal";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [subLinks, setSubLinks] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const isStudent = token && user?.accountType === "student";

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    const fetchSubLinks = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.categories || []);
      } catch {
        console.log("Category fetch failed");
      }
    };
    fetchSubLinks();
  }, []);

  const matchRoute = (route) =>
    matchPath({ path: route }, location.pathname);

  return (
    <>
      <nav className="sticky top-0 z-[1000] bg-richblack-800/90 backdrop-blur-md border-b border-white/10">
        {/* ================= MAIN BAR ================= */}
        <div className="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto h-16 flex justify-between items-center text-white">

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src={smlogo} className="h-6" alt="logo" />
            <span className="text-xl font-bold">StudyNotion</span>
          </div>

          {/* ================= DESKTOP LINKS ================= */}
          <div className="hidden lg:flex items-center gap-8">
            {NavbarLinks.map((link, index) => (
              <div
                key={index}
                className={`relative ${
                  matchRoute(link.path) ? "text-yellow-25" : "text-white"
                }`}
              >
                {link.title === "Catalog" ? (
                  <div className="group flex items-center cursor-pointer gap-1">
                    Catalog <MdKeyboardArrowDown className="text-xl" />
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[220px] bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="flex flex-col p-2">
                        {subLinks.map((cat) => (
                          <Link
                            key={cat._id}
                            to={`/catalog/${cat.categoryname}/${cat._id}`}
                            className="px-3 py-2 rounded-md text-richblack-800 hover:bg-richblack-800 hover:text-white"
                          >
                            {cat.categoryname}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>{link.title}</Link>
                )}
              </div>
            ))}

            <div className="flex items-center gap-2 px-4 py-1.5 bg-richblack-700 rounded-full cursor-not-allowed">
              <FaSearch />
              <span className="text-sm">Search</span>
            </div>
          </div>

          {/* ================= DESKTOP RIGHT ================= */}
          <div className="hidden lg:flex items-center gap-4">

            {/* STUDENT CART */}
            {isStudent && (
              <Link to="/dashboard/cart" className="relative">
                <FaCartShopping className="text-2xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-cyan-400 text-black rounded-full text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {/* AUTH */}
            {token ? (
              <ProfileDropDown />
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="navBtn cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="navBtn cursor-pointer"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {open && (
          <div className="lg:hidden bg-richblack-800 border-t border-white/10">
            <div className="flex flex-col items-center gap-5 py-6 text-white">

              {/* MOBILE LINKS */}
              {NavbarLinks.map((link, i) => {
                if (link.title === "Catalog") {
                  return (
                    <div key={i} className="w-full flex flex-col items-center gap-3">
                      <span className="text-lg font-semibold">Catalog</span>
                      <div className="w-10/12 flex flex-col gap-2">
                        {subLinks.map((cat) => (
                          <button
                            key={cat._id}
                            onClick={() => {
                              navigate(`/catalog/${cat.categoryname}/${cat._id}`);
                              setOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 rounded-md bg-richblack-700 hover:bg-richblack-600 transition"
                          >
                            {cat.categoryname}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={i}
                    to={link.path}
                    onClick={() => setOpen(false)}
                  >
                    {link.title}
                  </Link>
                );
              })}

              {/* MOBILE CART */}
              {isStudent && (
                <button
                  onClick={() => {
                    navigate("/dashboard/cart");
                    setOpen(false);
                  }}
                  className="navBtn w-7/12 flex items-center gap-2"
                >
                  <FaCartShopping />
                  Cart ({totalItems})
                </button>
              )}

              {/* AUTH */}
              {token ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/dashboard/my-profile");
                      setOpen(false);
                    }}
                    className="navBtn w-7/12"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={() =>
                      setConfirmationModal({
                        heading: "Are you sure?",
                        text: "You will be logged out of your account.",
                        btn1: "Logout",
                        btn2: "Cancel",
                        btn1handler: () => {
                          dispatch(logOut());
                          setConfirmationModal(null);
                          setOpen(false);
                        },
                        btn2handler: () => setConfirmationModal(null),
                      })
                    }
                    className="navBtn w-7/12 bg-red-500 hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="navBtn w-7/12"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="navBtn w-7/12"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {confirmationModal && <ConfirmationModal {...confirmationModal} />}
    </>
  );
};

export default Navbar;
