import React, { useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assests/logo.png";
export default function Header({ isOpen }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };
  const sidebarMenu = [
    {
      path: "/Homepage",
      text: "Home",
      icon: "fas fa-home",
    },
    {
      path: "/Admin/dashboard",
      text: "Dashboard",
      icon: "fas fa-tachometer-alt",
    },

    {
      path: "/Admin/patient",
      text: "Patients",
      icon: "fas fa-crutch",
    },
    {
      path: "/Admin/appointment2",
      text: "Appointments",
      icon: "far fa-calendar-check",
    },
    // {
    //   path: "/Admin/Manageappointment",
    //   text: "Manage Appointment",
    //   icon: image1,
    // },
    // {
    //   path: "/Admin/ManageStaff",
    //   text: "Staff",
    //   icon: "fas fa-child",
    // },
    {
      path: "/Admin/ManageLabs",
      text: "Labs",
      icon: "fas fa-vial",
    },
    {
      path: "/Admin/Billing",
      text: "Billing",
      icon: "fas fa-money-bill",
    },
    {
      path: "/Admin/Pharmacy",
      text: "Pharmacy",
      icon: "fas fa-clinic-medical",
    },
    {
      path: "/Admin/Medicals",
      text: "Medicals",
      icon: "fas fa-laptop-medical",
    },
    // {
    //   path: "/Admin/calander",
    //   text: "calander",
    //   icon: "fas fa-laptop-medical",
    // },
    {
      path: "/Admin/Insurance",
      text: "Insurance",
      icon: "fas fa-user-shield",
    },
    {
      path: "/Admin/Service",
      text: "Services",
      icon: "fas fa-vial",
    },
    {
      path: "/Admin/ReportsInc",
      text: "Reports",
      icon: "fas fa-file-pdf",
    },
  ];
  const handleclicklogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <nav
   className={`pc-sidebar ${isOpen ? "" : "newSide"}`}
      style={{
        width: isOpen ? "250px" : "67px",  
        transition: "width 0.3s ease",
      }}
    >
      <div className="navbar-wrapper">
        <div className="m-header ">
          <Link to="/Admin/dashboard" className="b-brand text-primary">
            <img
              src={logo}
              className="logo-lg bg-light"
              alt="logo"
           />
          </Link>
        </div>
        <div className="navbar-content">
          {/*<div className="card pc-user-card">
           <div className="card-body">
             
              {userMenuOpen && (
                <div className="pc-user-links pt-3">
                  <NavLink>
                    <i className="ti ti-user" /> My Account
                  </NavLink>
                  <NavLink to="/Admin/myprofile">
                    <i className="ti ti-settings" /> Settings
                  </NavLink>
                  <NavLink to="/Admin/myprofile">
                    <i className="ti ti-lock" /> Lock Screen
                  </NavLink>
                  <div
                    onClick={handleclicklogout}
                    style={{ cursor: "pointer" }}>
                    <i className="ti ti-power" /> Logout
                  </div>
                </div>
              )}
            </div> 
          </div>
          */}
          <ul className="pc-navbar">
            {sidebarMenu.map((item, index) => (
              <li className="pc-item" key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `pc-link ${isActive ? "active-link" : ""}`
                  }
                  style={{ textDecoration: "none" }}
                >
                  <span className="pc-micon">
                    <div className="pc-icon">
                      <i className={item.icon}></i>
                    </div>
                  </span>
                  <span className="pc-mtext fw-800">{item.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
