import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Component/Header/Header"; // Left sidebar
import Sidebar from "./Component/Header/Sideabar/Sidebar"; // Top navbar

export default function Admin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Left sidebar */}
      <Header isOpen={isSidebarOpen} />

      {/* Main content area */}
      {/* <div
        className="main-content"
        style={{
          marginLeft: isSidebarOpen ? "240px" : "50px", // Space for sidebar
          width: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 50px)",
          transition: "all 0.3s ease",
        }}
      > */}
        <div
        className="main-content"> 
        <Sidebar onToggle={handleToggleSidebar} />

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
