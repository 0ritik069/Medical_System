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
      <div className="main-content">
        <Sidebar onToggle={handleToggleSidebar} />

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
