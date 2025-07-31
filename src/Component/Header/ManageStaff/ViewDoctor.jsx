import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ViewDoctor() {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  if (!doctor) {
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
                  Doctor Details
                </h5>
              </div>
              <div className="card-body text-center">
                <p>No doctor data available</p>
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
                Doctor Details
              </h5>
            </div>
            <div className="card-body" style={{ margin: "15px" }}>
              <div className="row justify-content-center mb-4">
                <div className="col-md-4 text-center">
                  <img
                    src="../assets/images/user/avatar-2.jpg"
                    alt={doctor.fullName}
                    className="img-fluid rounded"
                    style={{ maxHeight: "250px", objectFit: "contain" }}
                  />
                </div>
              </div>

              <div className="row">
                {[
                  ["Full Name", doctor.fullName],
                  ["Email", doctor.email],
                  ["Phone Number", doctor.phoneNumber],
                  ["Civil ID", doctor.civilId],
                  ["Date of Birth", formatDate(doctor.dateOfBirth)],
                  ["Gender", doctor.gender],
                  ["Role", doctor.role],
                  ["License ID", doctor.licenseId || "N/A"],
                  ["Passport", doctor.passport || "N/A"],
                  ["Specialty", doctor.specialty || "N/A"],
                  ["Prefix", doctor.prefix || "N/A"],
                  ["Short Name", doctor.shortName || "N/A"],
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