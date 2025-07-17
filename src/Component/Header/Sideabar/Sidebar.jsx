import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
export default function Sidebar({isOpen, onToggle }) {
  const [notifOpen, setNotifOpen] = useState(false);
 
  const navigate = useNavigate();
  const notifRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handlelogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="pc-header" >
      <div className="header-wrapper  bg-light">
        <div className="me-auto pc-mob-drp">
          <ul className="list-unstyled">
            <li className="pc-h-item pc-sidebar-collapse"  onClick={onToggle}>
              
              <div className="pc-head-link ms-0" id="sidebar-hide">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 7h18M3 12h18M3 17h18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </li>
            <li className="pc-h-item pc-sidebar-popup">
              <a href="#" className="pc-head-link ms-0" id="mobile-collapse">
                <i className="ti ti-menu-2" />
              </a>
            </li>
            <li className="d-flex align-items-center ps-3">
              <div style={{ position: "relative", width: "220px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="gray"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="search"
                  placeholder="Ctr+K"
                  style={{
                    padding: "10px 8px 10px 35px", // left padding for icon space
                    width: "100%",
                    border: "1px solid #bec8d0",
                    borderRadius: "8px",
                    fontSize: "14px",
                    background:"#f8f9fa"
                  }}
                />
              </div>
            </li>
          </ul>
        </div>
        <div className="ms-auto">
          <ul className="list-unstyled">
            <li  className="dropdown pc-h-item">
              <div
                className="pc-head-link"
              onClick={()=>{navigate('/Admin/ManageStaff')}}
                role="button"
                aria-haspopup="true"
              >
                <div className="pc-icon" >
                  {/* <use xlinkHref="#custom-notification" /> */}
                  <i className="fas fa-atom fs-4"></i>
                </div>
              </div>
              <div
                className={`dropdown-menu dropdown-notification dropdown-menu-end pc-h-dropdown ${
                  notifOpen ? "show" : ""
                }`}
                style={{ height: "60vh" }}
              >
              <div className="dropdown-header d-flex align-items-center justify-content-between">
                  <h5 className="m-0">Notifications</h5>
                  <a href="#!" className="btn btn-link btn-sm">
                    Mark all read
                  </a>
                </div>
                
              
              </div>
            </li>
            <li ref={notifRef} className="dropdown pc-h-item">
              <a
                href="#!"
                className="pc-head-link"
                onClick={(e) => {
                  e.preventDefault();
                  setNotifOpen(!notifOpen);
                }}
                role="button"
                aria-haspopup="true"
                aria-expanded={notifOpen}
              >
                <svg className="pc-icon">
                  <use xlinkHref="#custom-notification" />
                </svg>
                <span className="badge bg-success pc-h-badge">3</span>
              </a>
              <div
                className={`dropdown-menu dropdown-notification dropdown-menu-end pc-h-dropdown ${
                  notifOpen ? "show" : ""
                }`}
                style={{ height: "60vh" }}
              >
                <div className="dropdown-header d-flex align-items-center justify-content-between">
                  <h5 className="m-0">Notifications</h5>
                  <a href="#!" className="btn btn-link btn-sm">
                    Mark all read
                  </a>
                </div>
                <div
                  className="dropdown-body text-wrap header-notification-scroll position-relative"
                  style={{ height: "60vh" }}
                >
                  <p className="text-span">Today</p>
                  <div className="card mb-2">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <svg className="pc-icon text-primary">
                            <use xlinkHref="#custom-layer" />
                          </svg>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <span className="float-end text-sm text-muted">
                            2 min ago
                          </span>
                          <h5 className="text-body mb-2">UI/UX Design</h5>
                          <p className="mb-0">
                            Lorem Ipsum has been the industry's standard dummy
                            text ever since the 1500s, when an unknown printer
                            took a galley of type and scrambled it to make a
                            type
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center py-2">
                  <a href="#!" className="link-danger">
                    Clear all Notifications
                  </a>
                </div>
              </div>
            </li>
            <li className="dropdown pc-h-item header-user-profile">
              <a
                className="pc-head-link dropdown-toggle arrow-none me-0"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="false"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                <img
                  src="../assets/images/user/avatar-2.jpg"
                  alt="user-image"
                  className="user-avtar"
                />
              </a>
              <div className="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown">
                <div className="dropdown-header d-flex align-items-center justify-content-between">
                  <h5 className="m-0">Profile</h5>
                </div>
                <div className="dropdown-body">
                  <div
                    className="profile-notification-scroll position-relative"
                    style={{ height: "65vh" }}
                  >
                    <div className="d-flex mb-1">
                      <div className="flex-shrink-0">
                        <img
                          src="../assets/images/user/avatar-2.jpg"
                          alt="user-image"
                          className="user-avtar wid-35"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="mb-1">Carson Darrin 🖖</h6>
                        <span>
                          <a
                            href="../index.html"
                            className="__cf_email__"
                            data-cfemail="88ebe9fafbe7e6a6ece9fafae1e6c8ebe7e5f8e9e6f1a6e1e7"
                          >
                            [email protected]
                          </a>
                        </span>
                      </div>
                    </div>
                    <hr className="border-secondary border-opacity-50" />
                    <div className="card">
                      <div className="card-body py-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="mb-0 d-inline-flex align-items-center">
                            <svg className="pc-icon text-muted me-2">
                              <use xlinkHref="#custom-notification-outline" />
                            </svg>
                            Notification
                          </h5>
                          <div className="form-check form-switch form-check-reverse m-0">
                            <input
                              className="form-check-input f-18"
                              type="checkbox"
                              role="switch"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-span">Manage</p>
                    <NavLink to="/Admin/myprofile" className="dropdown-item">
                      <span>
                        <svg className="pc-icon text-muted me-2">
                          <use xlinkHref="#custom-setting-outline" />
                        </svg>{" "}
                        <span>Settings</span>{" "}
                      </span>
                    </NavLink>
                    <a href="#" className="dropdown-item">
                      <span>
                        <svg className="pc-icon text-muted me-2">
                          <use xlinkHref="#custom-share-bold" />
                        </svg>{" "}
                        <span>Share</span>{" "}
                      </span>
                    </a>
                    <NavLink
                      to="/Admin/Changepassword"
                      className="dropdown-item"
                    >
                      <span>
                        <svg className="pc-icon text-muted me-2">
                          <use xlinkHref="#custom-lock-outline" />
                        </svg>{" "}
                        <span>Change Password</span>
                      </span>
                    </NavLink>
                    <hr className="border-secondary border-opacity-50" />
                    <div className="d-grid mb-3">
                      <button
                        className="btn btn-primary"
                        onClick={handlelogout}
                      >
                        <svg className="pc-icon me-2">
                          <use xlinkHref="#custom-logout-1-outline" />
                        </svg>
                        Logout
                      </button>
                    </div>
                    <hr className="border-secondary border-opacity-50" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
