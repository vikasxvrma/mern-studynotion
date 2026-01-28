import React, { useState } from "react";
import HighlightText from "./HighlightText";
import ExploreCards from "./ExploreCards";
import { HomePageExplore } from "../../../data/homepage-explore";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState("Free");

  // Selected tab data
  const selectedCard = HomePageExplore.find(
    (item) => item.tag.toLowerCase() === currentTab.toLowerCase()
  );

  // Active card
  const [clickedCard, setClickedCard] = useState(
    selectedCard.courses[0]
  );

  return (
    <div className="w-full sm:w-10/12 lg:w-9/12 mx-auto mt-8 mb-8 px-2 sm:px-0">
      {/* ================= HEADING ================= */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
        Unlock The <HighlightText text="Power Of Code" />
      </h2>

      <h3 className="text-richblack-300 font-bold text-center text-sm sm:text-lg opacity-75 mt-2">
        Learn to build anything you imagine
      </h3>

      {/* ================= TABS ================= */}
      <div
        className="
          flex overflow-x-auto
          justify-start sm:justify-around
          gap-3 sm:gap-6
          px-2 sm:px-6 py-2 mt-6
          rounded-full
          bg-richblack-800 opacity-70
          border-b border-white
          text-white
          scrollbar-hide
        "
      >
        {tabsName.map((tab, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentTab(tab);

              const newCourses = HomePageExplore.find(
                (item) => item.tag.toLowerCase() === tab.toLowerCase()
              ).courses;

              setClickedCard(newCourses[0]);
            }}
            className={`
              whitespace-nowrap px-4 py-2 rounded-full
              text-sm sm:text-md
              transition-all duration-300 ease-in-out
              ${
                tab === currentTab
                  ? "bg-richblack-900 font-semibold"
                  : "opacity-70 hover:opacity-100"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ================= CARDS ================= */}
      <div
        className="
          relative
          mt-10
          bg-richblack-900
          min-h-auto sm:min-h-[300px]
          overflow-hidden
        "
      >
        {/*
          IMPORTANT RESPONSIVE FIX:
          - Mobile: static → normal document flow (NO overlap)
          - Desktop: absolute → layered animation layout
        */}
        <div className="static sm:absolute inset-0 transition-opacity duration-300">
          <ExploreCards
            courses={selectedCard.courses}
            clickedCard={clickedCard}
            setClickedCard={setClickedCard}
          />
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
