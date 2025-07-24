import React, { useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assests/logo.png";
import home from "../../../src/assests/sideImg/home.png";
import dash from "../../../src/assests/sideImg/HOME-DASH.png";
import appoint from "../../../src/assests/sideImg/appointments.png";
import bill from "../../../src/assests/sideImg/billing.png";
import lab from "../../../src/assests/sideImg/labs.png";
import pharmacy from "../../../src/assests/sideImg/pharmacy.png";
import medical from "../../../src/assests/sideImg/medicals.png";
import doctor from "../../../src/assests/sideImg/doctors.png";
import treatment from "../../../src/assests/sideImg/treatment.png";
import vital from "../../../src/assests/sideImg/vitals.png";
import file from "../../../src/assests/sideImg/files.png";
import stats from "../../../src/assests/sideImg/stats.png";
 
export default function Header({ isOpen }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };
  const sidebarMenu = [
    // {
    //   path: "/Homepage",
    //   text: "Home",
    //   icon:home,
    // },
    {
      path: "/Homepage",
      text: "Home",
      icon: dash,
    },
 {
     path: "/Admin/dashboard",
     text: "Dashboard",
      icon:stats,
    },
    {
      path: "/Admin/patient",
      text: "Patients",
      icon:file,
    },
    {
      path: "/Admin/appointment2",
      text: "Appointments",
      icon:appoint,
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
      icon: lab,
    },
    {
      path: "/Admin/Billing",
      text: "Billing",
      icon: bill,
    },
    {
      path: "/Admin/Pharmacy",
      text: "Pharmacy",
      icon:pharmacy,
    },
    {
      path: "/Admin/Medicals",
      text: "Medicals",
      icon: medical,
    },
    // {
    //   path: "/Admin/calander",
    //   text: "calander",
    //   icon: "fas fa-laptop-medical",
    // },
    {
      path: "/Admin/Insurance",
      text: "Insurance",
      icon: vital,
    },
    {
      path: "/Admin/Service",
      text: "Services",
      icon: treatment,
    },
    {
      path: "/Admin/ReportsInc",
      text: "Reports",
      icon: file,
    },
  ];
  const handleclicklogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    // <nav
    //   className={`pc-sidebar ${isOpen ? "" : "newSide"}`}
    //   style={{
    //     width: isOpen ? "250px" : "67px",
    //     transition: "width 0.3s ease",
    //   }}
    // >
      <nav className="pc-sidebar"> 
      <div className="navbar-wrapper">
        {/* <div className="m-header ">
          <Link to="/Admin/dashboard" className="b-brand text-primary">
            <img src={logo} className="logo-lg bg-light" alt="logo" />
          </Link>
        </div> */}
        <div className="navbar-content">
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
                      <img src={item.icon} alt={item.text} />
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
