const CourseCardSkeleton = () => {
  return (
    <div
      className="
        w-full sm:w-[260px] lg:w-[300px]
        bg-richblack-800
        rounded-lg
        p-4
        animate-pulse
      "
    >
      {/* Image Skeleton */}
      <div className="h-[140px] sm:h-[150px] lg:h-[160px] bg-richblack-700 rounded-md"></div>

      {/* Text Skeleton */}
      <div className="mt-4 space-y-3">
        <div className="h-4 bg-richblack-700 rounded w-3/4"></div>
        <div className="h-3 bg-richblack-700 rounded w-1/2"></div>
        <div className="h-3 bg-richblack-700 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
