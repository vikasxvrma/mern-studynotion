import { Link } from "react-router-dom";

const CTAButton = ({ children, active, linkto, type }) => {
  const baseClasses = `
    inline-flex items-center justify-center
    px-5 sm:px-6 py-2.5 sm:py-3
    rounded-lg font-semibold
    text-sm sm:text-base
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-yellow-25/60
    active:scale-95
    cursor-pointer
    ${
      active
        ? "bg-yellow-50 text-black shadow-md hover:shadow-lg hover:bg-yellow-100 cursor-pointer"
        : "bg-richblack-700 text-white hover:bg-richblack-600 cursor-pointer"
    }
  `;

  // CASE 1: Submit button
  if (type) {
    return (
      <button type={type} className={baseClasses}>
        {children}
      </button>
    );
  }

  // CASE 2: Navigation button
  return (
    <Link to={linkto} className="inline-block">
      <div className={baseClasses}>{children}</div>
    </Link>
  );
};

export default CTAButton;
