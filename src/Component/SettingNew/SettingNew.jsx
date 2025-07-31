import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SettingNew = () => {
  const navigate = useNavigate();
  const handleUsersClick = () => {
    navigate("/Admin/ManageStaff");
  };
  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="pt-4">
          <div className="row g-5">
            <div className="col-lg-3">
              <button
              className="settingCard w-100"
               onClick={() => navigate("/Admin/business_setting")}
              >
                <div className="settingIocn">
                  <i className="fas fa-business-time"></i>
                </div>
                <h5>Business Settings</h5>
              </button>
            </div>

            <div className="col-lg-3">
              <button className="settingCard w-100"  onClick={() => navigate("/Admin/finance")}>
                <div className="settingIocn">
                  <i className="fas fa-wallet"></i>
                </div>
                <h5>Finance</h5>
              </button>
            </div>

            <div className="col-lg-3">
              <button className="settingCard w-100">
                <div className="settingIocn">
                  <i className="fas fa-bell"></i>
                </div>
                <h5>Notification Center</h5>
              </button>
            </div>

            <div className="col-lg-3">
              <button className="settingCard w-100">
                <div className="settingIocn">
                  <i className="fas fa-lock"></i>
                </div>
                <h5>Security</h5>
              </button>
            </div>

            <div className="col-lg-3">
              <button className="settingCard w-100">
                <div className="settingIocn">
                  <i className="fas fa-briefcase-medical"></i>
                </div>
                <h5>Medical Safety</h5>
              </button>
            </div>

            <div className="col-lg-3">
              <button className="settingCard w-100">
                <div className="settingIocn">
                  <i className="fas fa-plug"></i>
                </div>
                <h5>
                  API's & Integration
                  <br />
                  <small>(Super admin only)</small>
                </h5>
              </button>
            </div>

            <div className="col-lg-3">
              <button className="settingCard w-100" onClick={handleUsersClick}>
                <div className="settingIocn">
                  <i className="fas fa-users"></i>
                </div>
                <h5>Users</h5>
              </button>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default SettingNew;
