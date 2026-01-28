import React, { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const InstructorChart = ({ labels = [], students = [], income = [] }) => {
  const [mode, setMode] = useState("students");

  const data = {
    labels,
    datasets: [
      {
        data: mode === "students" ? students : income,
        backgroundColor: [
          "#6366F1",
          "#22C55E",
          "#F59E0B",
          "#EF4444",
          "#06B6D4",
        ],
        borderWidth: 1,
        borderColor: "#1f2937",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#E5E7EB",
          boxWidth: 12,
          padding: 16,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return mode === "students"
              ? `${value} students`
              : `₹ ${value}`;
          },
        },
      },
    },
  };

  return (
    <div
      className="
        w-full
        bg-richblack-800
        border border-richblack-700
        rounded-xl
        p-4 sm:p-6
      "
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h2 className="text-white text-lg font-semibold">
          Course Analytics
        </h2>

        {/* TOGGLE */}
        <div className="flex bg-richblack-700 rounded-full p-1 w-fit">
          <button
            onClick={() => setMode("students")}
            className={`
              px-4 py-1 text-sm rounded-full
              transition-all duration-200
              ${
                mode === "students"
                  ? "bg-indigo-500 text-white shadow-md"
                  : "text-richblack-200 hover:text-white"
              }
            `}
          >
            Students
          </button>

          <button
            onClick={() => setMode("income")}
            className={`
              px-4 py-1 text-sm rounded-full
              transition-all duration-200
              ${
                mode === "income"
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-richblack-200 hover:text-white"
              }
            `}
          >
            Income
          </button>
        </div>
      </div>

      {/* PIE CHART */}
      <div className="relative h-[240px] sm:h-[280px] md:h-[320px] w-full">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default InstructorChart;
