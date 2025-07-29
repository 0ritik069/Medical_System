import { useEffect, useState } from "react";
import { baseurl } from "../../../Baseurl";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Staff() {
  const [openmodal, setOpenmodal] = useState(false);
  const [openmodal2, setOpenmodal2] = useState(false);
  const [allDoctors, setAllDoctors] = useState([]);
  const [dataDoctor, setDataDoctor] = useState("");
  const [files1, setFiles1] = useState(null);
  const navigate = useNavigate();
  const handleclick = () => {
    setOpenmodal(true);
  };
  const handleclick123 = () => {
    setOpenmodal2(true);
  };
  const handleClose = () => {
    setOpenmodal(false);
  };
  const handleClose2 = () => {
    setOpenmodal2(false);
  };

  const handlefilechnage = (e) => {
    const file = e.target.files[0];
    setFiles1(file);
  };

  const AddDocotor = async () => {
    try {
      if (!dataDoctor.email || !dataDoctor.fullName || !files1) {
        return alert("Please fill all required fields");
      }
      const formData = new FormData();
      formData.append("email", dataDoctor.email);
      formData.append("password", dataDoctor.password);
      formData.append("role", dataDoctor.role || "doctor");
      formData.append("fullName", dataDoctor.fullName);
      formData.append("shortName", dataDoctor.shortName);
      formData.append("prefix", dataDoctor.prefix);
      formData.append("dateOfBirth", dataDoctor.dateOfBirth);
      formData.append("licenseId", dataDoctor.licenseId);
      formData.append("civilId", dataDoctor.civilId);
      formData.append("passport", dataDoctor.passport);
      formData.append("gender", dataDoctor.gender);
      formData.append("specialty", dataDoctor.specialty);
      formData.append("personalPhoto", files1);
      console.log("✅ Ready FormData:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      const response = await axios.post(
        `${baseurl}addDoctorDetails`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success === true) {
        toast.success(response.data.message);
        console.log("✅ Doctor added successfully:", response.data);
        setOpenmodal(false);
      } else {
        toast.error("❌ Something went wrong:", response.data.message);
      }
    } catch (error) {
      console.error("🚨 Error while adding doctor:", error);
    }
  };
  const handlechaneg = (e) => {
    const { name, value } = e.target;
    setDataDoctor({ ...dataDoctor, [name]: value });
  };
  useEffect(() => {
    getalldoctor();
  }, []);
  const getalldoctor = async () => {
    try {
      const response = await axios.get(`${baseurl}getAllDoctors`);
      if (response.data.success === true) {
        setAllDoctors(response.data.data);
      } else {
        console.log("fgsfdgsdf");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handlenavigate = (id) => {
    navigate("/Admin/DoctorBooking", { state: { data: id } });
  };

  const handlefilterdata = () => {
    navigate("/Admin/DoctorDashboard");
  };

  const cardCount = 6;

  const handleStatusChange = async (doctorId, newStatus) => {
    console.log(doctorId, newStatus);
    console.log("Update status:", doctorId, newStatus);

    // Example logic (replace with actual API or state update)
    setAllDoctors((prevDoctors) =>
      prevDoctors.map((doc) =>
        doc.id === doctorId ? { ...doc, status: newStatus } : doc
      )
    );

    // Optional: Call backend API to save status
    try {
      const response = await axios.post(
        `${baseurl}changeDoctorStatus/${doctorId}`,
        { status: parseInt(newStatus) }
      );
      console.log(response);
      if (response.data.success === true) {
        getalldoctor();
        Swal.fire("success", "Status Changed Successfully", "success");
      } else {
        Swal.fire("error", "something went wrong", "error");
      }
    } catch (error) {
      const err = error.response.data.message;
      Swal.fire("error", err, "error");
    }
  };
  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="container mt-5 border rounded p-3">
          <ul
            className="nav nav-pills nav-fill mb-3 hr"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="personaldata-tab"
                data-bs-toggle="tab"
                data-bs-target="#personaldata"
                type="button"
                role="tab"
                aria-controls="personaldata"
                aria-selected="true"
              >
                All
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="Appointment-tab"
                data-bs-toggle="tab"
                data-bs-target="#Appointment"
                type="button"
                role="tab"
                aria-controls="Appointment"
                aria-selected="false"
              >
                Staff
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="vitalsings-tab"
                data-bs-toggle="tab"
                data-bs-target="#vitalsings"
                type="button"
                role="tab"
                aria-controls="vitalsings"
                aria-selected="false"
              >
                Doctor
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="medicalhistory-tab"
                data-bs-toggle="tab"
                data-bs-target="#medicalhistory"
                type="button"
                role="tab"
                aria-controls="medicalhistory"
                aria-selected="false"
              >
                Nurse
              </button>
            </li>
          </ul>
          <div className="tab-content p-3  border-top-0" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="personaldata"
              role="tabpanel"
              aria-labelledby="personaldata-tab"
            >
              <div className="col-12">
                <div className="card table-card">
                  <div className="card-header">
                    <div className="d-sm-flex align-items-center justify-content-between">
                      <h5 className="mb-3 mb-sm-0">All User list</h5>
                      <div></div>
                    </div>
                  </div>
                  <div className="card-body pt-3">
                    <div className="table-responsive">
                      <table className="table table-hover" id="pc-dt-simple">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Departments</th>
                            <th>Qualification</th>
                            <th>Mobile</th>
                            <th>Joining Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <img
                                    src="../assets/images/user/avatar-2.jpg"
                                    alt="user image"
                                    className="img-radius wid-40"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-0">Ashton Cox</h6>
                                </div>
                              </div>
                            </td>
                            <td>Junior Technical</td>
                            <td>B.COM., M.COM.</td>
                            <td>(123) 4567 890</td>
                            <td>2023/12/24</td>
                            <td>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-eye f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-edit f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-trash f-20" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <img
                                    src="../assets/images/user/avatar-3.jpg"
                                    alt="user image"
                                    className="img-radius wid-40"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-0">Bradley Greer</h6>
                                </div>
                              </div>
                            </td>
                            <td>Sales Assistant</td>
                            <td>B.A, B.C.A</td>
                            <td>(123) 4567 890</td>
                            <td>2022/09/19</td>
                            <td>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-eye f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-edit f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-trash f-20" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <img
                                    src="../assets/images/user/avatar-4.jpg"
                                    alt="user image"
                                    className="img-radius wid-40"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-0">Brielle Williamson</h6>
                                </div>
                              </div>
                            </td>
                            <td>JavaScript Developer</td>
                            <td>B.A, B.C.A</td>
                            <td>(123) 4567 890</td>
                            <td>2022/08/22</td>
                            <td>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-eye f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-edit f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-trash f-20" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <img
                                    src="../assets/images/user/avatar-5.jpg"
                                    alt="user image"
                                    className="img-radius wid-40"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-0">Airi Satou</h6>
                                </div>
                              </div>
                            </td>
                            <td>Developer</td>
                            <td>B.COM., M.COM.</td>
                            <td>(123) 4567 890</td>
                            <td>2023/09/12</td>
                            <td>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-eye f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-edit f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-trash f-20" />
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Staff Tab */}
            <div
              className="tab-pane fade"
              id="Appointment"
              role="tabpanel"
              aria-labelledby="Appointment-tab"
            >
              <div className="col-12">
                <div className="card table-card">
                  <div className="card-header">
                    <div className="d-sm-flex align-items-center justify-content-between">
                      <h5 className="mb-3 mb-sm-0">Staff list</h5>
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={handleclick123}
                        >
                          Add Staff
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body pt-3">
                    <div className="table-responsive">
                      <table className="table table-hover" id="pc-dt-simple">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>DOB</th>
                            <th>License Id</th>
                            <th>Gender</th>
                            <th>Specialty</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <img
                                    src="../assets/images/user/avatar-1.jpg"
                                    alt="user image"
                                    className="img-radius wid-40"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-0">John Smith</h6>
                                </div>
                              </div>
                            </td>
                            <td>1990/05/15</td>
                            <td>STAFF001</td>
                            <td>Male</td>
                            <td>Administration</td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="toggle-staff-1"
                                  checked={true}
                                />
                                <label
                                  className="form-check-label ms-2"
                                  htmlFor="toggle-staff-1"
                                >
                                  Active
                                </label>
                              </div>
                            </td>
                            <td>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-eye f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-edit f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-trash f-20" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <img
                                    src="../assets/images/user/avatar-2.jpg"
                                    alt="user image"
                                    className="img-radius wid-40"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-0">Sarah Johnson</h6>
                                </div>
                              </div>
                            </td>
                            <td>1985/12/20</td>
                            <td>STAFF002</td>
                            <td>Female</td>
                            <td>Reception</td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="toggle-staff-2"
                                  checked={true}
                                />
                                <label
                                  className="form-check-label ms-2"
                                  htmlFor="toggle-staff-2"
                                >
                                  Active
                                </label>
                              </div>
                            </td>
                            <td>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-eye f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-edit f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-trash f-20" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <img
                                    src="../assets/images/user/avatar-3.jpg"
                                    alt="user image"
                                    className="img-radius wid-40"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-0">Mike Wilson</h6>
                                </div>
                              </div>
                            </td>
                            <td>1988/08/10</td>
                            <td>STAFF003</td>
                            <td>Male</td>
                            <td>IT Support</td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="toggle-staff-3"
                                  checked={false}
                                />
                                <label
                                  className="form-check-label ms-2"
                                  htmlFor="toggle-staff-3"
                                >
                                  Inactive
                                </label>
                              </div>
                            </td>
                            <td>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-eye f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-edit f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-trash f-20" />
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {openmodal2 && (
                <div
                  className="modal fade show"
                  aria-labelledby="staticBackdropLabel"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "block",
                  }}
                >
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header bg-primary text-white p-2 rounded-top">
                        <h5 className="modal-title">Add Staff</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={handleClose2}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="container mt-4">
                          <form className="border p-4 rounded-bottom bg-white">
                            <div className="row mb-3">
                              <div className="col-md-2 d-flex align-items-start justify-content-center">
                                <div
                                  className="rounded-circle bg-light border"
                                  style={{ width: "100px", height: "100px" }}
                                ></div>
                              </div>

                              <div className="col-md-10">
                                <div className="row g-3">
                                  <div className="col-md-4">
                                    <label className="form-label">
                                      First Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <label className="form-label">
                                      Middle Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <label className="form-label">
                                      Last Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>

                                  <div className="col-md-4">
                                    <label className="form-label">
                                      Civil ID
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <label className="form-label">
                                      Passport
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <label className="form-label">
                                      Date of Birth
                                    </label>
                                    <input
                                      type="date"
                                      className="form-control"
                                    />
                                  </div>

                                  <div className="col-md-4">
                                    <label className="form-label">Gender</label>
                                    <div>
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="gender"
                                          value="male"
                                        />
                                        <label className="form-check-label">
                                          Male
                                        </label>
                                      </div>
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="gender"
                                          value="female"
                                        />
                                        <label className="form-check-label">
                                          Female
                                        </label>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-md-4">
                                    <label className="form-label">Email</label>
                                    <input
                                      type="email"
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <label className="form-label">
                                      Phone Number
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>

                                  <div className="col-md-4">
                                    <label className="form-label">Role</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <label className="form-label">
                                      Speciality
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <label className="form-label">
                                      License ID
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>

                                  <div className="col-md-4">
                                    <label className="form-label">
                                      User ID
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <label className="form-label">
                                      Password
                                    </label>
                                    <input
                                      type="password"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="text-center mt-3">
                              <button
                                type="submit"
                                className="btn btn-primary me-2"
                              >
                                Add
                              </button>
                              <button type="button" className="btn btn-danger">
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className="tab-pane fade"
              id="vitalsings"
              role="tabpanel"
              aria-labelledby="vitalsings-tab"
            >
              <div className="col-12">
                <div className="card table-card">
                  <div className="card-header">
                    <div className="d-sm-flex align-items-center justify-content-between">
                      <h5 className="mb-3 mb-sm-0">Doctor's list</h5>
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={handleclick}
                        >
                          Add Doctor
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body pt-3">
                    <div className="table-responsive">
                      <table className="table table-hover" id="pc-dt-simple">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>DOB</th>
                            <th>License Id</th>
                            <th>Gender</th>
                            <th>Specialty </th>
                            <th>Status </th>
                            <th>View Appointment </th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allDoctors &&
                            allDoctors.length > 0 &&
                            allDoctors.map((item, idex) => {
                              console.log(item);
                              return (
                                <>
                                  <tr key={idex}>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                          <img
                                            src="../assets/images/user/avatar-1.jpg"
                                            alt="user image"
                                            className="img-radius wid-40"
                                          />
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                          <h6 className="mb-0">
                                            {item.fullName}
                                          </h6>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      {new Date(
                                        item.dateOfBirth
                                      ).toLocaleDateString("en-GB")}
                                    </td>
                                    <td>{item.licenseId}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.specialty}</td>
                                    {/* <td>{item.}</td> */}
                                 <td>
  <div className="form-check form-switch">
    <input
      className="form-check-input"
      type="checkbox"
      role="switch"
      id={`toggle-${item.id}`}
      checked={Number(item.is_active) === 1}
      onChange={(e) =>
        handleStatusChange(item.id, e.target.checked ? 1 : 0)
      }
    />
    <label
      className="form-check-label ms-2"
      htmlFor={`toggle-${item.id}`}
    >
      {Number(item.is_active) === 1 ? "Active" : "Inactive"}
    </label>
  </div>
</td>
                                    <td>
                                      <div
                                        onClick={() => {
                                          handlenavigate(item.id);
                                        }}
                                        className="avtar avtar-xs btn-link-secondary"
                                      >
                                        <i className="ti ti-eye f-20" />{" "}
                                      </div>
                                    </td>
                                    <td>
                                      <div
                                        onClick={() => {
                                          handlefilterdata();
                                        }}
                                        className="avtar avtar-xs btn-link-secondary"
                                      >
                                        <i className="ti ti-eye f-20" />{" "}
                                      </div>
                                      <a
                                        href="#"
                                        className="avtar avtar-xs btn-link-secondary"
                                      >
                                        <i className="ti ti-edit f-20" />{" "}
                                      </a>
                                      <a
                                        href="#"
                                        className="avtar avtar-xs btn-link-secondary"
                                      >
                                        <i className="ti ti-trash f-20" />
                                      </a>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* add Doctor */}
              {openmodal && (
                <div
                  className="modal fade show"
                  aria-labelledby="staticBackdropLabel"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "block",
                  }}
                >
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Add Doctor</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={handleClose}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="row">
                          <div className="mb-3 col-4">
                            <label htmlFor="doctorName" className="form-label">
                              Prefix
                            </label>
                            <br />
                            <select
                              className="w-100 bg-white py-1 rounded"
                              name="prefix"
                              onChange={handlechaneg}
                            >
                              <option>Miss</option>
                              <option>Mr</option>
                              <option>Mrs</option>
                            </select>
                          </div>
                          <div className="mb-3 col-4">
                            <label htmlFor="doctorName" className="form-label">
                              First Name
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              placeholder="Name"
                              className="form-control"
                              id="doctorName"
                              onChange={handlechaneg}
                            />
                          </div>
                          <div className="mb-3 col-4">
                            <label htmlFor="doctorName" className="form-label">
                              {" "}
                              Last Name
                            </label>
                            <input
                              type="text"
                              name="shortName"
                              placeholder="Last Name"
                              className="form-control"
                              id="doctorName"
                              onChange={handlechaneg}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-4">
                            <label
                              htmlFor="specialization"
                              className="form-label"
                            >
                              email
                            </label>
                            <input
                              type="email"
                              name="email"
                              placeholder="doctor@gmail.com"
                              className="form-control"
                              id="specialization"
                              onChange={handlechaneg}
                            />
                          </div>
                          <div className="mb-3 col-4">
                            <label
                              htmlFor="specialization"
                              className="form-label"
                            >
                              Gender
                            </label>
                            <select
                              className="w-100 form-label py-1 rounded bg-white"
                              name="gender"
                              onChange={handlechaneg}
                            >
                              <option>Select</option>
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                            </select>
                          </div>
                          <div className="mb-3 col-4">
                            <label
                              htmlFor="specialization"
                              className="form-label"
                            >
                              Password
                            </label>
                            <input
                              type="passowrd"
                              name="password"
                              placeholder="123456"
                              className="form-control"
                              id="specialization"
                              onChange={handlechaneg}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-4">
                            <label htmlFor="doctorName" className="form-label">
                              Date Of Birth
                            </label>
                            <input
                              type="date"
                              name="dateOfBirth"
                              className="form-control"
                              id="doctorName"
                              onChange={handlechaneg}
                            />
                          </div>
                          <div className="mb-3 col-4">
                            <label
                              htmlFor="specialization"
                              className="form-label"
                            >
                              License Id
                            </label>
                            <input
                              type="text"
                              placeholder="License Number"
                              name="licenseId"
                              className="form-control"
                              id="specialization"
                              onChange={handlechaneg}
                            />
                          </div>
                          <div className="mb-3 col-4">
                            <label htmlFor="doctorName" className="form-label">
                              Civil Id
                            </label>
                            <input
                              type="text"
                              name="civilId"
                              className="form-control"
                              placeholder="Civil Id"
                              id="doctorName"
                              onChange={handlechaneg}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-4">
                            <label htmlFor="doctorName" className="form-label">
                              Passport
                            </label>
                            <input
                              type="text"
                              name="passport"
                              placeholder="passport number"
                              className="form-control"
                              id="doctorName"
                              onChange={handlechaneg}
                            />
                          </div>
                          <div className="mb-3 col-4">
                            <label htmlFor="doctorName" className="form-label">
                              Specialty
                            </label>
                            <input
                              type="text"
                              placeholder="Aurthopedic"
                              name="specialty"
                              className="form-control"
                              id="doctorName"
                              onChange={handlechaneg}
                            />
                          </div>
                          <div className="mb-3 col-4">
                            <label htmlFor="doctorName" className="form-label">
                              Photo
                            </label>
                            <input
                              type="file"
                              name="personalPhoto"
                              className="form-control"
                              id="doctorName"
                              onChange={handlefilechnage}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={AddDocotor}
                          >
                            Add Doctor
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className="tab-pane fade"
              id="medicalhistory"
              role="tabpanel"
              aria-labelledby="medicalhistory-tab"
            >
              <div className="col-12">
                <div className="card table-card">
                  <div className="card-header">
                    <div className="d-sm-flex align-items-center justify-content-between">
                      <h5 className="mb-3 mb-sm-0">Nurse list</h5>
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={handleclick}
                        >
                          Add Nurse
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body pt-3">
                    <div className="table-responsive">
                      <table className="table table-hover" id="pc-dt-simple">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Departments</th>
                            <th>Qualification</th>
                            <th>Mobile</th>
                            <th>Joining Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <img
                                    src="../assets/images/user/avatar-1.jpg"
                                    alt="user image"
                                    className="img-radius wid-40"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-0">Airi Satou</h6>
                                </div>
                              </div>
                            </td>
                            <td>Developer</td>
                            <td>B.COM., M.COM.</td>
                            <td>(123) 4567 890</td>
                            <td>2023/09/12</td>
                            <td>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-eye f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-edit f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-trash f-20" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <img
                                    src="../assets/images/user/avatar-2.jpg"
                                    alt="user image"
                                    className="img-radius wid-40"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-0">Ashton Cox</h6>
                                </div>
                              </div>
                            </td>
                            <td>Junior Technical</td>
                            <td>B.COM., M.COM.</td>
                            <td>(123) 4567 890</td>
                            <td>2023/12/24</td>
                            <td>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-eye f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-edit f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-trash f-20" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <img
                                    src="../assets/images/user/avatar-3.jpg"
                                    alt="user image"
                                    className="img-radius wid-40"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-0">Bradley Greer</h6>
                                </div>
                              </div>
                            </td>
                            <td>Sales Assistant</td>
                            <td>B.A, B.C.A</td>
                            <td>(123) 4567 890</td>
                            <td>2022/09/19</td>
                            <td>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-eye f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-edit f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-trash f-20" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <img
                                    src="../assets/images/user/avatar-4.jpg"
                                    alt="user image"
                                    className="img-radius wid-40"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-0">Brielle Williamson</h6>
                                </div>
                              </div>
                            </td>
                            <td>JavaScript Developer</td>
                            <td>B.A, B.C.A</td>
                            <td>(123) 4567 890</td>
                            <td>2022/08/22</td>
                            <td>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-eye f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-edit f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-trash f-20" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                  <img
                                    src="../assets/images/user/avatar-5.jpg"
                                    alt="user image"
                                    className="img-radius wid-40"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-0">Airi Satou</h6>
                                </div>
                              </div>
                            </td>
                            <td>Developer</td>
                            <td>B.COM., M.COM.</td>
                            <td>(123) 4567 890</td>
                            <td>2023/09/12</td>
                            <td>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-eye f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-edit f-20" />{" "}
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-trash f-20" />
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
