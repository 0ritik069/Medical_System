import React, { useRef, useState } from "react";
const SettingNew = () => {
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    const modal = window.bootstrap.Modal.getInstance(modalRef.current);
    modal.hide();
    setIsModalOpen(false);
  };
  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="pt-4">
          <div className="row g-5">
            <div className="col-lg-3">
              <button
              className="settingCard w-100"
                onClick={openModal}
              >
                <div className="settingIocn">
                  <i className="fas fa-business-time"></i>
                </div>
                <h5>Business Settings</h5>
              </button>
            </div>

            <div className="col-lg-3">
              <button className="settingCard w-100">
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
              <button className="settingCard w-100">
                <div className="settingIocn">
                  <i className="fas fa-users"></i>
                </div>
                <h5>Users</h5>
              </button>
            </div>
          </div>
          {/* first modal */}
          {/* Bootstrap Modal */}
          <div
            className="modal fade"
            tabIndex="-1"
            ref={modalRef}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    User Modal
                  </h5>
                  {/* Custom Close Button */}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>This is a Bootstrap modal controlled with React state!</p>
                </div>
                <div className="modal-footer justify-content-center">
                  <button type="button" className="bgBtn" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingNew;
