import React from "react";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="w-full h-[calc(100vh-3.5rem)] bg-richblack-900 flex">
   
      <Sidebar />

      
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
