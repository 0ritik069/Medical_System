import { useLocation } from "react-router-dom";
export default function Vierappointment() {
  const location = useLocation();
  const personalinfo = location?.state?.data;
  console.log(personalinfo);
  return (
    <div className="pc-container">
      <div className="pc-content">
        <div>
          <div className="row">
            {/* Left Section */}
            <div className="col-md-12">
              {/* Personal Info */}
              <div className="card mb-3" style={{ position: "relative" }}>
                <div className="personaimg text-center">
                </div>
                <div>
                  <h5 className="card-title">View Appointment</h5>
                  <div className="row p20 g-3">
                    <div className="col-md-6">
                      <label className="form-label">Doctor Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={personalinfo.doctorName}
                        placeholder="File Number"
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Patient Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        disabled
                        value={personalinfo.patientName}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Start Time</label>
                      <input
                        type="text"
                        disabled
                        value={personalinfo.startTime}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">End Time</label>
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        value={personalinfo.endTime}
                        placeholder="Nationality"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Date</label>
                      <input
                        type="date"
                        disabled
                        className="form-control"
                        value={
                          personalinfo?.appointmentDate
                            ? new Date(personalinfo?.appointmentDate)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Civil ID"
                        disabled
                        value={personalinfo.status}
                      />
                    </div>
                    {/* <div className="col-md-3">
                      <label className="form-label d-block">Gender</label>
                      <div className="d-flex">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="Male"
                            id="male"
                            // checked={personalinfo.gender === "Male"}
                          />
                          <label className="form-check-label" htmlFor="male">
                            Male
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="Female"
                            id="female"
                            // checked={
                            //   personalinfo.gender === "Female"
                            // }
                          />
                          <label className="form-check-label" htmlFor="female">
                            Female
                          </label>
                        </div>
                      </div>
                    </div> */}

                    {/* <div className="col-md-6">
                      <label className="form-label">Passport ID</label>
                      <input
                        type="text"
                        // value={personalinfo.passportNumber}
                        className="form-control"
                        disabled
                        placeholder=" Passport ID"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Nationality</label>
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        // value={personalinfo.nationality}
                        placeholder="Nationality"
                      />
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              {/* <div className="card mb-3">
                <div>
                  <h5 className="card-title">Contact Details</h5>
                  <div className="row p20">
                    <div className="col-md-6">
                      <label className="form-label">Mobile</label>
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        placeholder="Mobile"
                        // value={personalinfo.mobileNumber}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        disabled
                        className="form-control"
                        placeholder="Phone"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        disabled
                        // value={personalinfo.email}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        // value={personalinfo.address}
                        placeholder="Address"
                      />
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Right Section */}
            <div className="col-md-4 rightSidePer">
              {/* Visit Info */}

              {/* Emergency Contact */}

              {/* <div className="card mb-3">
                <div>
                  <h5 className="card-title">Documents</h5>
                  <div className="p20">
                    <div className="row ">
                      <div className="col-lg-12 docPatient">
                        <div className="mb-1">
                          <label className="form-label mb-3"> CPR Scan </label>
                          {/* {personalinfo.CPR_scan_doc ? (
                                        <a
                                          href={`${baseurImage}/${personalinfo.CPR_scan_doc}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="borderBtn"
                                        >
                                          View CPR Scan
                                        </a>
                                      ) : (
                                        <span>No document available</span>
                                      )} */}
              {/* </div>
                      </div>
                      <div className="col-lg-12 docPatient">
                        <div className="mb-1">
                          <label className="form-label mb-3">
                            Passport Copy
                          </label> */}

              {/* {personalinfo.passport_copy ? (
                                        <a
                                          href={`${baseurImage}/${personalinfo.passport_copy}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="borderBtn"
                                        >
                                          View Passport
                                        </a>
                                      ) : (
                                        <span>No document available</span>
                                      )} */}
              {/* </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className="card mb-3 ">
                <div className="card-body  p-3">
                  <div className="d-flex">
                    <p>
                      <label className="form-label">Last Visit:</label>{" "}
                      {/* {new Date(
                                    personalinfo.lastVisitDate
                                  ).toLocaleDateString("en-GB") === "01/01/1970"
                                    ? ""
                                    : new Date(
                                        personalinfo.lastVisitDate
                                      ).toLocaleDateString("en-GB")} */}
              {/* </p> */}
              {/* <p className="ps-2">
                                  <strong>First Visit:</strong> {new Date(personalinfo.firstVisitDate).toLocaleDateString("en-GB")}
                                </p> */}
              {/* </div>
                  <p>
                    <label className="form-label">File Opening:</label>{" "}
                    {/* {new Date(
                                  personalinfo.fileOpenedDate
                                ).toLocaleDateString("en-GB")} */}
              {/* </p>
                  <label className="form-label">Primary Doctor</label>
                  <select className="form-select" disabled>
                    {/* <option>{personalinfo.Primary_Doctor}</option> */}
              {/* </select>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
