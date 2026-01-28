import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";

import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import CodeBlock from "../components/core/HomePage/CodeBlock";
import TimelineItem from "../components/core/HomePage/TimelineItem";
import ReviewSlider from "../components/core/HomePage/ReviewSlider";
import Footer from "../components/common/Footer";

import Banner from "../Asset/Image/banner.mp4";

import logo1 from "../Asset/TimeLineLogo/Logo1.svg";
import logo2 from "../Asset/TimeLineLogo/Logo2.svg";
import logo3 from "../Asset/TimeLineLogo/Logo3.svg";
import logo4 from "../Asset/TimeLineLogo/Logo4.svg";

import progress from "../Asset/Image/Know_your_progress.png";
import comparewithothers from "../Asset/Image/Compare_with_others.png";
import planyourlesson from "../Asset/Image/Plan_your_lessons.png";
import TimelineImage from "../Asset/Image/TimelineImage.png";
import instructor from "../Asset/Image/Instructor.png";

import { getAllRating } from "../services/operations/ratingAPI";

import "../App.css";

const Home = () => {
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState();

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await dispatch(getAllRating());
      if (res) setReviews(res);
    };
    fetchReviews();
  }, [dispatch]);

  return (
    <div className="w-full mt-24 select-none overflow-x-hidden">
      {/* ========================== SECTION 1 (HERO) ========================== */}
      <section className="w-full">
        <div className="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto flex flex-col items-center gap-10 text-white">
          {/* Instructor CTA */}
          <div className="flex items-center gap-2 px-8 sm:px-12 py-2 font-bold rounded-full bg-richblack-800 hover:scale-95 transition">
            <p>Become an Instructor</p>
            <FaArrowRight />
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
            Empower Your Future With <HighlightText text="Coding Skills" />
          </h1>
          

          {/* Subheading */}
          <p className="max-w-[95%] sm:max-w-[80%] text-center text-sm sm:text-base md:text-lg text-richblack-200 opacity-70">
            Learn at your own pace with hands-on projects, expert instructors,
            and real-world feedback.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <CTAButton active linkto="/signup">Learn More</CTAButton>
            <CTAButton active={false} linkto="/login">Book Demo</CTAButton>
          </div>

          {/* Video */}
          <div className="w-full sm:w-10/12 lg:w-9/12 mt-16">
            <video muted autoPlay loop className="w-full h-auto shadow-xl">
              <source src={Banner} />
            </video>
          </div>

          {/* Code Blocks */}
          <div className="space-y-20 w-full">
            <CodeBlock
              position="flex flex-col lg:flex-row"
              heading={
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Unlock your <HighlightText text="coding potential" />
                </div>
              }
              subheading="Industry-led courses designed for real skills."
              ctabtn1={{ active: true, text: "Try it Yourself", linkto: "/signup" }}
              ctabtn2={{ active: false, text: "Learn More", linkto: "/login" }}
              codeblock={`<!DOCTYPE html>\n<html></html>`}
            />

            <CodeBlock
              position="flex flex-col lg:flex-row-reverse"
              heading={
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Start <HighlightText text="coding instantly" />
                </div>
              }
              subheading="Practice real code from lesson one."
              ctabtn1={{
                active: true,
                text: (
                  <div className="flex items-center gap-2">
                    Continue Lesson <FaArrowRight />
                  </div>
                ),
                linkto: "/signup",
              }}
              ctabtn2={{ active: false, text: "Learn More", linkto: "/login" }}
              codeblock={`function App(){ return <h1>Hello</h1>; }`}
            />
          </div>

          <ExploreMore />
        </div>
      </section>

      {/* ========================== SECTION 2 ========================== */}
      <section className="w-full bg-pure-greys-5 pb-16 overflow-x-hidden">
        {/* CTA Banner */}
        <div className="homepage_bg h-[300px] sm:h-[400px] flex justify-center items-center">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-24">
            <CTAButton active linkto="/signup">
              Explore Full Catalog <FaArrowRight />
            </CTAButton>
            <CTAButton active={false} linkto="/login">
              Learn More
            </CTAButton>
          </div>
        </div>

        <div className="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto pt-12">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Get the skills you need for a{" "}
            <HighlightText text="job that is in demand." />
          </h2>

          {/* Timeline */}
          <div className="flex flex-col lg:flex-row gap-12 mt-16">
            {/* Left */}
            <div className="flex flex-col gap-10">
              <TimelineItem icon={logo1} title="Leadership" desc="Fully committed" />
              <TimelineItem icon={logo2} title="Responsibility" desc="Students first" />
              <TimelineItem icon={logo3} title="Flexibility" desc="Always adaptive" />

              {/* Fourth item */}
              <div className="flex gap-4 items-center">
                <div className="h-12 w-12 bg-white rounded-full flex justify-center items-center">
                  <img src={logo4} className="h-5" />
                </div>
                <div>
                  <p className="font-bold">Solve the problem</p>
                  <p className="text-sm">Code your way to a solution</p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="relative w-full sm:w-[500px] mx-auto min-h-auto sm:min-h-[400px] pb-24 sm:pb-0">
              <img
                src={TimelineImage}
                className="static sm:absolute w-full sm:w-auto sm:bottom-4 sm:right-4"
              />

              <div className="static sm:absolute sm:-bottom-6 sm:left-6 bg-caribbeangreen-700 w-full sm:w-[500px] min-h-[100px] flex items-center justify-around text-white">
                <div>
                  <p className="text-2xl font-bold">10</p>
                  <p className="text-sm">Years Experience</p>
                </div>
                <div className="h-10 w-[1px] bg-caribbeangreen-300" />
                <div>
                  <p className="text-2xl font-bold">250</p>
                  <p className="text-sm">Courses</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="pt-20 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Your swiss knife for{" "}
              <HighlightText text="learning any language" />
            </h2>

            <p className="mt-4 text-richblack-500">
              Learn 20+ languages with realistic voice-over and tracking.
            </p>

            <div className="relative mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 min-h-auto sm:min-h-[520px]">
              <img
                src={progress}
                className="static sm:absolute sm:w-[220px] w-[350px] sm:-left-10 sm:rotate-[18deg]"
              />
              <img
                src={comparewithothers}
                className="static sm:absolute sm:w-[220px] w-[350px] sm:left-1/2 sm:-translate-x-1/2 z-10"
              />
              <img
                src={planyourlesson}
                className="static sm:absolute sm:w-[220px] w-[390px] sm:-right-10 sm:-rotate-[15deg]"
              />
            </div>

            <div className="mt-16 max-w-[150px] mx-auto">
              <CTAButton active linkto="/signup">Learn More</CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* ========================== SECTION 3 ========================== */}
      <section className="w-full bg-richblack-900 py-20">
        <div className="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <img
              src={instructor}
              className="w-full max-w-[500px]"
            />

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold">
                Become an <HighlightText text="Instructor" />
              </h2>
              <CTAButton active linkto="/signup">
                Start Teaching Today <FaArrowRight />
              </CTAButton>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl text-white text-center mt-24">
            Reviews From Learners
          </h2>
        </div>

        <div className="overflow-hidden">
          <ReviewSlider reviews={reviews} />
        </div>
      </section>

      {/* ========================== FOOTER ========================== */}
      <Footer />
    </div>
  );
};

export default Home;
