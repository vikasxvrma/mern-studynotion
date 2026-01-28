import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { categories } from "../services/apis";
import { apiConnector } from "../services/apiconnector";
import CourseCardSkeleton from "../components/catalog.jsx/CourseCardSkeleton";
import CourseSlider from "../components/catalog.jsx/CourseSlider";
import Footer from "../components/common/Footer";

const SKELETON_COUNT = 6;

const Catalog = () => {
  const { categoryId } = useParams();

  const [category, setCategory] = useState(null);
  const [categoriesDetails, setCategoriesDetails] = useState(null);

  const [categoryLoading, setCategoryLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(true);

  // Fetch category info
  const fetchRequiredCategory = async () => {
    setCategoryLoading(true);
    try {
      const res = await apiConnector(
        "GET",
        `${categories.SINGLECATEGORY_API}/${categoryId}`
      );
      setCategory(res.data.data);
    } catch (error) {
      console.error("Error fetching category");
    } finally {
      setCategoryLoading(false);
    }
  };

  // Fetch category page data
  const getCategoryPageDetails = async () => {
    setCoursesLoading(true);
    try {
      const res = await apiConnector(
        "GET",
        `${categories.CATEGORYPAGEDETAILS_API}/${categoryId}`
      );
      setCategoriesDetails(res.data.data);
    } catch (error) {
      console.error("Error fetching category page details");
    } finally {
      setCoursesLoading(false);
    }
  };

  useEffect(() => {
    fetchRequiredCategory();
    getCategoryPageDetails();
  }, [categoryId]);

  const renderSkeletons = () =>
    Array.from({ length: SKELETON_COUNT }).map((_, i) => (
      <CourseCardSkeleton key={i} />
    ));

  return (
    <div className="w-full bg-richblack-900 overflow-x-hidden">
      {/* ================= HEADER ================= */}
      <div className="w-full bg-richblack-800">
        <div className="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto flex flex-col gap-3 py-6">
          {/* Breadcrumb */}
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
            <Link to="/" className="text-richblack-300 hover:text-yellow-25">
              Home /
            </Link>
            <Link
              to="/catalog"
              className="text-richblack-300 hover:text-yellow-25"
            >
              Catalog /
            </Link>
            <span className="text-yellow-25">
              {categoryLoading ? "Loading..." : category?.categoryname}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {categoryLoading ? "Loading..." : category?.categoryname}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-md opacity-50 text-white max-w-3xl">
            {categoryLoading
              ? "Please wait..."
              : category?.categorydescription}
          </p>
        </div>
      </div>

      {/* ================= SELECTED CATEGORY ================= */}
      <section className="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto px-1 sm:px-2 py-6">
        <h2 className="text-cyan-300 text-xl sm:text-2xl md:text-3xl font-bold mb-6">
          Courses To Get You Started
        </h2>

        {coursesLoading ? (
          <div className="flex gap-4 overflow-x-auto">
            {renderSkeletons()}
          </div>
        ) : (
          <CourseSlider
            courses={categoriesDetails?.selectedCategory?.courses || []}
          />
        )}
      </section>

      {/* ================= OTHER CATEGORIES ================= */}
      <section className="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto px-1 sm:px-2 py-6">
        <h2 className="text-cyan-300 text-xl sm:text-2xl md:text-3xl font-bold mb-6">
          Courses from Other Categories
        </h2>

        {coursesLoading ? (
          <div className="flex gap-4 overflow-x-auto">
            {renderSkeletons()}
          </div>
        ) : (
          <CourseSlider
            courses={
              categoriesDetails?.differentCategories?.flatMap(
                (cat) => cat.courses || []
              ) || []
            }
          />
        )}
      </section>

      {/* ================= TOP SELLING ================= */}
      <section className="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto px-1 sm:px-2 py-6">
        <h2 className="text-cyan-300 text-xl sm:text-2xl md:text-3xl font-bold mb-6">
          Top Selling Courses
        </h2>

        {coursesLoading ? (
          <div className="flex gap-4 overflow-x-auto">
            {renderSkeletons()}
          </div>
        ) : (
          <CourseSlider
            courses={categoriesDetails?.topSellingCourses || []}
          />
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Catalog;
