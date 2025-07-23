import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { baseurImage, baseurl } from "../../Baseurl";

export default function Service() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
 const [openVital121, setOpenVital121] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [inpval, setInpval] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    try {
      const response = await axios.get(`${baseurl}getServices`);
      if (response.data.success === true) {
        console.log("Patient data fetched successfully:", response.data.data);
        setPatients(response.data.data);
      } else {
        console.error("Failed to fetch patient data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching patient data:", error.message);
    }
  };

  const handledelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${baseurl}deletePatient/${id}`);
        Swal.fire("Deleted!", "Patient has been deleted.", "success");
        getdata();
      } catch (error) {
        Swal.fire("Error!", "Something went wrong while deleting.", "error");
      }
    }
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setInpval({ ...inpval, [name]: value });
  };

  // Filter + Pagination Logic
  const filteredPatients = patients.filter(
    (item) =>
      item.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.insurance_price?.toString().includes(searchTerm) ||
      item.duration?.toString().includes(searchTerm) ||
      item.type?.toLowerCase().includes(searchTerm.toLowerCase() )||
      item.primaryDoctor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirst, indexOfLast);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  const handleclickopenvital11 = () => {
    setOpenVital121(true);
  };
  const hndleclosemodalservice = () => {
    setOpenVital121(false);
  };

    const handlesavevital123 = async () => {
      try {
        const dataPost = {
          serviceName: inpval.serviceName,
          description: inpval.description,
          category: inpval.category,
          durationMinutes: parseInt(inpval.durationMinutes),
          standardCost: parseInt(inpval.standardCost),
          secondaryCost: parseInt(inpval.secondaryCost),
          insuranceCost: parseInt(inpval.insuranceCost),
          serviceCode: inpval.serviceCode,
        };
        const response = await axios.post(`${baseurl}addServices`, dataPost);
  
        // Optional: check status and show success
        if (response.status === 200 || response.status === 201) {
          hndleclosemodalservice();
          console.log(" recorded successfully:", response.data);
           getdata();
          Swal.fire("Success", "Service saved successfully.", "success");
        } else {
          console.warn("Unexpected response:", response);
          Swal.fire(
            "error",
            "Unexpected server response. Please try again.",
            "error"
          );
        }
      } catch (error) {
        if (error.response) {
          // Backend responded with error
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
          alert(
            "No response from server. Please check your internet connection."
          );
        } else {
          console.error("Error setting up request:", error.message);
        }
      }
    };
  return (
    <div className="pc-container ">
      <div className="pc-content">
        <div className="row">
          <div className="col-12 searchParent">
            <h5 className="">Service list</h5>
          </div>
          <div className="col-md-12">
            <div className="card table-card patientCardHeader">
              <div className="tableHeader">
                <div className="d-sm-flex align-items-center justify-content-between">
                  <div className="tableSearch">
                    <input
                      type="text"
                      placeholder="Search by name, or mobile"
                      className="form-control"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <span className="searchIcon">
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
                    </span>
                  </div>
                  <div className="tableHeaderBtn">
                    {/* <button className="borderBtn">Applied Student List</button> */}
                    <button
                      className="bgBtn"
                       onClick={handleclickopenvital11}
                    >
                      <i className="fas fa-plus me-2"></i>
                   Add service
                    </button>
                    <button className="export">
                   
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ marginTop: 4, marginRight: 4, marginLeft: 4 }}
                      >
                        <path
                          d="M9 17.75c-.1 0-.19-.02-.29-.06a.74.74 0 0 1-.46-.69v-6c0-.41.34-.75.75-.75s.75.34.75.75v4.19l.72-.72c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-2 2c-.14.14-.34.22-.53.22Z"
                          fill="currentColor"
                        />
                        <path
                          d="M9 17.751c-.19 0-.38-.07-.53-.22l-2-2a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2 2c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22Z"
                          fill="currentColor"
                        />
                        <path
                          d="M15 22.75H9c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h5c.41 0 .75.34.75.75s-.34.75-.75.75H9C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25v-5c0-.41.34-.75.75-.75s.75.34.75.75v5c0 5.43-2.32 7.75-7.75 7.75Z"
                          fill="currentColor"
                        />
                        <path
                          d="M22 10.748h-4c-3.42 0-4.75-1.33-4.75-4.75v-4c0-.3.18-.58.46-.69.28-.12.6-.05.82.16l8 8a.751.751 0 0 1-.53 1.28Zm-7.25-6.94v2.19c0 2.58.67 3.25 3.25 3.25h2.19l-5.44-5.44Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-body pb-0">
                <div className="table-responsive table-striped">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Service Name</th>
                 
                        <th>Duration</th>
                        <th>Insurance Price</th>
                        <th>Type</th>
                        {/* <th>Primary Doctor</th>
                        <th>Balance</th> */}
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPatients.length > 0 ? (
                        currentPatients.map((item, index) => (
                          <tr key={index}>
                            <td>{item.code}</td>
                            <td>{item.name}</td>
                            <td>{item.duration}</td>
                            <td>{item.insurance_price}</td>
                            <td>{item.type}</td>
                            <td>
                              <NavLink
                                to="/Admin/Manageappointment"
                                state={{ patientid: item }}
                                className="avtar avtar-xs btn-link-secondary viewIcon"
                              >
                                <i className="ti ti-eye f-20" />
                                <span>View</span>
                              </NavLink>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary editIcon"
                              >
                                <i className="ti ti-edit f-20" />
                              <span>Edit</span>
                              </a>
                              <div
                                style={{ cursor: "pointer" }}
                                className="avtar avtar-xs btn-link-secondary deleteIcon"
                                onClick={() => handledelete(item.id)}
                              >
                                <i className="ti ti-trash f-20" />
                                <span>Delete</span>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="10" className="text-center">
                            No patients found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="tablepagination">
                    <ul className="pagination justify-content-end mb-0 me-3">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            currentPage > 1 && setCurrentPage(currentPage - 1)
                          }
                        >
                          &laquo;
                        </button>
                      </li>
                      <li className="pageNmbr">{totalPages}</li>
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            currentPage < totalPages &&
                            setCurrentPage(currentPage + 1)
                          }
                        >
                          &raquo;
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
              {openVital121 && (
                        <div
                          className="modal fade show"
                          style={{
                            backgroundColor: "rgba(81, 81, 81, 0.5)",
                            display: "block",
                          }}
                        >
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">Add Services</h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  onClick={hndleclosemodalservice}
                                ></button>
                              </div>
                              <div className="modal-body">
                                {/* Form for adding doctor */}

                                <div className="row">
                             
                                 
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label className="form-label">
                                      Service Name
                                    </label>
                                    <input
                                      type="text"
                                      name="serviceName"
                                      onChange={handlechange}
                                      placeholder="Enter Service Name"
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label className="form-label">
                                      Description
                                    </label>
                                    <input
                                      type="text"
                                      name="description"
                                      placeholder="Enter Description"
                                      onChange={handlechange}
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                     <div className="col-md-6">
                                    <label className="form-label">
                                      Category
                                    </label>
                                    <select className="form-control py-2" name="category" onChange={handlechange}>
                                     <option>Select</option>
                                      <option value="Dental_Services" >Dental Services</option>
                                      <option value="Vision_Eye_Care" >Vision & Eye Care</option>
                                      <option value="Emergency_First_Aid" >Emergency & First Aid</option>
                                      <option value="Consultation_Services" >Consultation Services</option>
                                      <option value="Diagnostic_Lab_Services" >Diagnostic & Lab Services</option>
                                    </select>
                                  </div>
                                  <div className="col-md-6">
                                    <label className="form-label">
                                      Duration
                                    </label>
                                    <input
                                      type="text"
                                      name="durationMinutes"
                                      placeholder="Enter Duration in Minutes"
                                      onChange={handlechange}
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label className="form-label">
                                      Standard Cost
                                    </label>
                                    <input
                                      type="text"
                                      name="standardCost"
                                      onChange={handlechange}
                                      placeholder="Enter Standard Cost"
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label className="form-label">
                                      Secondary Cost
                                    </label>
                                    <input
                                      type="text"
                                      name="secondaryCost"
                                      placeholder="Enter Secondary Cost"
                                      onChange={handlechange}
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label className="form-label">
                                      Service Code
                                    </label>
                                    <input
                                      type="text"
                                      name="serviceCode"
                                        placeholder="Enter Service Code"
                                      onChange={handlechange}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label className="form-label">
                                      Insurance Cost
                                    </label>
                                    <input
                                      type="text"
                                      name="insuranceCost"
                                        placeholder="Enter Insurance Cost"
                                      onChange={handlechange}
                                      className="form-control"
                                    />
                                  </div>
                                </div>

                                <div className="modal-footer my-3">
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handlesavevital123}
                                  >
                                    Add Service
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
