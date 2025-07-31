import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ViewNurse() {
  const location = useLocation();
  const navigate = useNavigate();
  const nurse = location.state?.nurse;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  if (!nurse) {
    return (
      <div className="pc-container">
        <div className="pc-content">
          <div className="col-12">
            <div className="card table-card">
              <div className="tableHeader">
                <h5 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{ cursor: 'pointer', color: '#007bff', fontWeight: 'bold', fontSize: '1.5rem' }}
                    onClick={() => navigate(-1)}
                    title="Back"
                  >
                    &larr;
                  </span>
                  Nurse Details
                </h5>
              </div>
              <div className="card-body text-center">
                <p>No nurse data available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="col-12">
          <div className="card table-card">
            <div className="tableHeader">
              <h5 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{ cursor: 'pointer', color: '#007bff', fontWeight: 'bold', fontSize: '1.5rem' }}
                  onClick={() => navigate(-1)}
                  title="Back"
                >
                  &larr;
                </span>
                Nurse Details
              </h5>
            </div>
            <div className="card-body" style={{ margin: "15px" }}>
              <div className="row justify-content-center mb-4">
                <div className="col-md-4 text-center">
                  <img
                    src="../assets/images/user/avatar-2.jpg"
                    alt={nurse.fullName}
                    className="img-fluid rounded"
                    style={{ maxHeight: "250px", objectFit: "contain" }}
                  />
                </div>
              </div>

              <div className="row">
                {[
                  ["Full Name", nurse.fullName],
                  ["Email", nurse.email],
                  ["Phone Number", nurse.phoneNumber],
                  ["Civil ID", nurse.civilId],
                  ["Date of Birth", formatDate(nurse.dateOfBirth)],
                  ["Gender", nurse.gender],
                  ["Role", nurse.role],
                  ["License ID", nurse.licenseId || "N/A"],
                  ["Passport", nurse.passport || "N/A"],
                  ["Specialty", nurse.specialty || "N/A"],
                  ["Prefix", nurse.prefix || "N/A"],
                  ["Short Name", nurse.shortName || "N/A"],
                ].map(([label, value], idx) => (
                  <div className="col-md-6 mb-3" key={idx}>
                    <label className="form-label fw-bold">{label}</label>
                    <input
                      type="text"
                      className="form-control"
                      value={value ?? ""}
                      disabled
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 