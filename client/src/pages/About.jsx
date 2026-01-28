import React, { useEffect, useState } from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import NewHighLightText from "../components/core/HomePage/NewHighLightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import Footer from "../components/common/Footer";
import ContactForm from "../components/core/About/ContactForm";
import ReviewSlider from "../components/core/HomePage/ReviewSlider";

import img1 from "../Asset/Image/aboutus1.webp";
import img2 from "../Asset/Image/aboutus2.webp";
import img3 from "../Asset/Image/aboutus3.webp";
import img4 from "../Asset/Image/FoundingStory.png";

import { useDispatch } from "react-redux";
import { getAllRating } from "../services/operations/ratingAPI";

const About = () => {
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState();

  useEffect(() => {
    const fetchAllReviews = async () => {
      const res = await dispatch(getAllRating());
      if (res) setReviews(res);
    };
    fetchAllReviews();
  }, [dispatch]);

  return (
    <section className="w-full bg-richblack-900 overflow-x-hidden">
      {/* ================= HERO ================= */}
      <div className="w-full bg-richblack-700 py-16">
        <div className="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-richblack-25">
            Driving Innovation in Online Education for a{" "}
            <HighlightText text="Brighter Future" />
          </h2>

          <p className="text-richblack-50 opacity-70 text-sm sm:text-lg">
            Studynotion is at the forefront of driving innovation in online
            education, offering cutting-edge courses and nurturing a vibrant
            learning community.
          </p>

          {/* Images */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <img src={img1} alt="" className="w-full sm:w-1/3 rounded-lg" />
            <img src={img2} alt="" className="w-full sm:w-1/3 rounded-lg" />
            <img src={img3} alt="" className="w-full sm:w-1/3 rounded-lg" />
          </div>
        </div>
      </div>

      {/* ================= BIG STATEMENT ================= */}
      <div className="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-20">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-semibold text-center text-richblack-25">
          We are passionate about revolutionizing the way we learn. Our platform{" "}
          <HighlightText text="combines technology" />,{" "}
          <NewHighLightText text="expertise" />, and community to create an{" "}
          <NewHighLightText text="unparalleled educational experience" />.
        </h2>
      </div>

      <div className="h-[1px] bg-richblack-700" />

      {/* ================= FOUNDING STORY ================= */}
      <div className="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-20 flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex flex-col gap-4">
          <NewHighLightText text="Our Founding Story" />
          <p className="text-richblack-100 opacity-70 text-sm sm:text-lg">
            Our platform was born from a vision to make education accessible,
            flexible, and impactful across the globe.
          </p>
          <p className="text-richblack-100 opacity-70 text-sm sm:text-lg">
            We believed education should not be confined to classrooms or
            geography.
          </p>
        </div>

        <img
          src={img4}
          alt=""
          className="w-full max-w-[450px] shadow-2xl shadow-red-700 rounded-lg"
        />
      </div>

      {/* ================= VISION & MISSION ================= */}
      <div className="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-16 flex flex-col lg:flex-row gap-16">
        <div className="flex flex-col gap-4">
          <NewHighLightText text="Our Vision" />
          <p className="text-richblack-100 opacity-70 text-sm sm:text-md">
            To revolutionize learning through technology-driven education.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <HighlightText text="Our Mission" />
          <p className="text-richblack-100 opacity-70 text-sm sm:text-md">
            Empower individuals worldwide with accessible and high-quality
            learning.
          </p>
        </div>
      </div>

      {/* ================= COUNTERS ================= */}
      <div className="w-full bg-richblack-700 py-12">
        <div className="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            ["5K", "Active Students"],
            ["10+", "Mentors"],
            ["200+", "Courses"],
            ["50+", "Awards"],
          ].map(([num, label], i) => (
            <div key={i}>
              <h2 className="text-white font-bold text-3xl">{num}</h2>
              <p className="text-white opacity-70">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= FEATURES GRID ================= */}
      <div className="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-20 flex flex-col lg:flex-row gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl sm:text-4xl font-semibold text-richblack-25">
            World-Class Learning for{" "}
            <HighlightText text="Anyone, Anywhere" />
          </h2>
          <p className="text-richblack-25 opacity-70">
            Partnering with universities and companies worldwide.
          </p>
          <CTAButton linkto="/" active>
            Learn More
          </CTAButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            "Curriculum Based on Industry Needs",
            "Our Learning Methods",
            "Certification",
            "Rating & Auto-grading",
            "Ready to Work",
          ].map((title, i) => (
            <div
              key={i}
              className={`p-6 ${
                i % 2 === 0 ? "bg-richblack-700" : "bg-richblack-800"
              }`}
            >
              <p className="text-white text-lg">{title}</p>
              <p className="text-white opacity-60 text-sm mt-2">
                Designed to align with modern industry demands.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CONTACT ================= */}
      <div className="w-11/12 sm:w-8/12 mx-auto py-20 text-center">
        <h2 className="text-white font-bold text-3xl sm:text-5xl">
          Get in Touch
        </h2>
        <p className="text-white opacity-60 mt-2">
          We'd love to hear from you.
        </p>
        <ContactForm />
      </div>

      {/* ================= REVIEWS ================= */}
      <div className="py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-white text-center mb-8">
          Reviews From Other Learners
        </h2>
        <ReviewSlider reviews={reviews} />
      </div>

      <Footer />
    </section>
  );
};

export default About;
