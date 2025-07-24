
// import { NavLink, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { baseurImage, baseurl } from "../../../Baseurl";
// import axios from "axios";
// import Swal from "sweetalert2";

// export default function Patient() {
//   const navigate = useNavigate();
//   const [patients, setPatients] = useState([]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     getdata();
//   }, []);

//   const getdata = async () => {
//     try {
//       const response = await axios.get(`${baseurl}getAllPatients`);
//       if (response.data.success === true) {
//         setPatients(response.data.data);
//       } else {
//         console.error("Failed to fetch patient data:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching patient data:", error.message);
//     }
//   };

//   const handledelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await axios.delete(`${baseurl}deletePatient/${id}`);
//         Swal.fire("Deleted!", "Patient has been deleted.", "success");
//         getdata();
//       } catch (error) {
//         Swal.fire("Error!", "Something went wrong while deleting.", "error");
//       }
//     }
//   };

//   // Filter + Pagination Logic
//   const filteredPatients = patients.filter(
//     (item) =>
//       `${item.firstName} ${item.lastName}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       item.fileNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.gender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.mobileNumber?.toString().includes(searchTerm) ||
//       // item.fileNumber?.toString().includes(searchTerm) ||
//       item.gender?.toString().includes(searchTerm) ||
//       item.primaryDoctor?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const currentPatients = filteredPatients.slice(indexOfFirst, indexOfLast);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1); // Reset to page 1 on search
//   };

//   return (
//     <div className="pc-container ">
//       <div className="pc-content">
//         <div className="row">
//           <div className="col-12 searchParent">
//             <h5 className="">Patient list</h5>
//           </div>
//           <div className="col-md-12">
//             <div className="card table-card patientCardHeader">
//               <div className="tableHeader">
//                 <div className="d-sm-flex align-items-center justify-content-between">
//                   <div className="tableSearch">
//                     <input
//                       type="text"
//                       placeholder="Search by name, or mobile"
//                       className="form-control"
//                       value={searchTerm}
//                       onChange={handleSearchChange}
//                     />
//                     <span className="searchIcon">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="18"
//                         height="18"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="gray"
//                         style={{
//                           position: "absolute",
//                           top: "50%",
//                           left: "10px",
//                           transform: "translateY(-50%)",
//                           pointerEvents: "none",
//                         }}
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
//                         />
//                       </svg>
//                     </span>
//                   </div>
//                   <div className="tableHeaderBtn">
//                     {/* <button className="borderBtn">Applied Student List</button> */}
//                     <button
//                       className="bgBtn"
//                       onClick={() => navigate("/Admin/addPatient")}
//                     >
//                       <i className="fas fa-plus me-2"></i>
//                       Patient Registration
//                     </button>
//                     <button className="export">
                   
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="28"
//                         height="28"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         style={{ marginTop: 4, marginRight: 4, marginLeft: 4 }}
//                       >
//                         <path
//                           d="M9 17.75c-.1 0-.19-.02-.29-.06a.74.74 0 0 1-.46-.69v-6c0-.41.34-.75.75-.75s.75.34.75.75v4.19l.72-.72c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-2 2c-.14.14-.34.22-.53.22Z"
//                           fill="currentColor"
//                         />
//                         <path
//                           d="M9 17.751c-.19 0-.38-.07-.53-.22l-2-2a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2 2c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22Z"
//                           fill="currentColor"
//                         />
//                         <path
//                           d="M15 22.75H9c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h5c.41 0 .75.34.75.75s-.34.75-.75.75H9C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25v-5c0-.41.34-.75.75-.75s.75.34.75.75v5c0 5.43-2.32 7.75-7.75 7.75Z"
//                           fill="currentColor"
//                         />
//                         <path
//                           d="M22 10.748h-4c-3.42 0-4.75-1.33-4.75-4.75v-4c0-.3.18-.58.46-.69.28-.12.6-.05.82.16l8 8a.751.751 0 0 1-.53 1.28Zm-7.25-6.94v2.19c0 2.58.67 3.25 3.25 3.25h2.19l-5.44-5.44Z"
//                           fill="currentColor"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="card-body pb-0">
//                 <div className="table-responsive table-striped">
//                   <table className="table">
//                     <thead>
//                       <tr>
//                         <th>Nmae</th>
//                         <th>File No.</th>
                 
//                         <th>Gender</th>
//                         <th>Age</th>
//                         <th>Mobile</th>
//                         <th>Primary Doctor</th>
//                         <th>Last Visit</th>
//                         <th>Balance</th>
//                         <th className="text-center">Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {currentPatients.length > 0 ? (
//                         currentPatients.map((item, index) => (
//                           <tr key={index}>
//                             <td>
//                               <img
//                                 src={`${baseurImage}${item.profileImage}`}
//                                 alt="No Img"
//                                 className="img-radius"
//                               />
//                               <span className="ms-2">
//                                  {item.firstName} {item.lastName}
//                               </span>
//                             </td>
//                             <td>{item.fileNumber}</td>
                             
//                             <td>{item.gender}</td>
//                             <td>{item.age}</td>
//                             <td>{item.mobileNumber}</td>
//                             <td>{item.Primary_Doctor || "-"}</td>
//                             <td>
//                               {item.lastVisitDate &&
//                               !isNaN(new Date(item.lastVisitDate))
//                                 ? new Date(
//                                     item.lastVisitDate
//                                   ).toLocaleDateString("en-GB")
//                                 : "-"}
//                             </td>
//                             <td>{item.balance || "-"}</td>
//                             {/* <td>
//                               <NavLink
//                                 to="/Admin/Manageappointment"
//                                 state={{ patientid: item }}
//                                 className="avtar avtar-xs btn-link-secondary viewIcon"
//                               >
//                                 <i className="ti ti-eye f-20" />
//                               </NavLink>
//                               <a
//                                 href="#"
//                                 className="avtar avtar-xs btn-link-secondary editIcon"
//                               >
//                                 <i className="ti ti-edit f-20" />
//                               </a>
//                               <div
//                                 style={{ cursor: "pointer" }}
//                                 className="avtar avtar-xs btn-link-secondary deleteIcon"
//                                 onClick={() => handledelete(item.id)}
//                               >
//                                 <i className="ti ti-trash f-20" />
//                               </div>
//                             </td> */}
//                             <td>
//                               <NavLink
//                                 to="/Admin/Manageappointment"
//                                 state={{ patientid: item }}
//                                 className="avtar avtar-xs btn-link-secondary viewIcon"
//                               >
//                                 <i className="ti ti-eye f-20" />
//                                 <span>View</span>
//                               </NavLink>
//                               <div
//                                 onClick={() => navigate("/Admin/EditPatient", { state: { patientid: item } })}
//                                 style={{ cursor: "pointer" }}
//                                 className="avtar avtar-xs btn-link-secondary editIcon"
//                               >
//                                 <i className="ti ti-edit f-20" />
//                               <span>Edit</span>
//                               </div>
//                               <div
//                                 style={{ cursor: "pointer" }}
//                                 className="avtar avtar-xs btn-link-secondary deleteIcon"
//                                 onClick={() => handledelete(item.id)}
//                               >
//                                 <i className="ti ti-trash f-20" />
//                                 <span>Delete</span>
//                               </div>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="10" className="text-center">
//                            <div class="loader-container">
//   <div class="loader"></div>
// </div>
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <nav className="tablepagination">
//                     <ul className="pagination justify-content-end mb-0 me-3">
//                       <li
//                         className={`page-item ${
//                           currentPage === 1 ? "disabled" : ""
//                         }`}
//                       >
//                         <button
//                           className="page-link"
//                           onClick={() =>
//                             currentPage > 1 && setCurrentPage(currentPage - 1)
//                           }
//                         >
//                           &laquo;
//                         </button>
//                       </li>
//                       <li className="pageNmbr">{totalPages}</li>
//                       <li
//                         className={`page-item ${
//                           currentPage === totalPages ? "disabled" : ""
//                         }`}
//                       >
//                         <button
//                           className="page-link"
//                           onClick={() =>
//                             currentPage < totalPages &&
//                             setCurrentPage(currentPage + 1)
//                           }
//                         >
//                           &raquo;
//                         </button>
//                       </li>
//                     </ul>
//                   </nav>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseurImage, baseurl } from "../../../Baseurl";
import axios from "axios";
import Swal from "sweetalert2";

export default function Patient() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    try {
      const response = await axios.get(`${baseurl}getAllPatients`);
      if (response.data.success === true) {
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

  // Filter + Pagination Logic
  const filteredPatients = patients.filter(
    (item) =>
      `${item.firstName} ${item.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.fileNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.gender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Primary_Doctor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobileNumber?.toString().includes(searchTerm) ||
      item.age?.toString().includes(searchTerm) ||
      // item.fileNumber?.toString().includes(searchTerm) ||
      // item.gender?.toString().includes(searchTerm) ||
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

  return (
    <div className="pc-container ">
      <div className="pc-content">
        <div className="row">
          <div className="col-12 searchParent">
            <h5 className="">Patient list</h5>
          </div>
          <div className="col-md-12">
            <div className=" table-card patientCardHeader">
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
                      onClick={() => navigate("/Admin/addPatient")}
                    >
                      <i className="fas fa-plus me-2"></i>
                      Patient Registration
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
                        <th>Name</th>
                        <th>File No.</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Mobile</th>
                        <th>Primary Doctor</th>
                        <th>Last Visit</th>
                        <th>Balance</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPatients.length > 0 ? (
                        currentPatients.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <img
                                src={`${baseurImage}${item.profileImage}`}
                                alt=".."
                                className="img-radius"
                              />
                              <span className="ms-2">
                                 {item.firstName} {item.lastName}
                              </span>
                            </td>
                            <td>{item.fileNumber}</td>
                             
                            <td>{item.gender}</td>
                            <td>{item.age}</td>
                            <td>{item.mobileNumber}</td>
                            <td>{item.Primary_Doctor || "-"}</td>
                            <td>
                              {item.lastVisitDate &&
                              !isNaN(new Date(item.lastVisitDate))
                                ? new Date(
                                    item.lastVisitDate
                                  ).toLocaleDateString("en-GB")
                                : "-"}
                            </td>
                            <td>{item.balance || "-"}</td>
                            <td>
                              <NavLink
                                to="/Admin/Manageappointment"
                                state={{ patientid: item }}
                                className="avtar avtar-xs btn-link-secondary viewIcon"
                              >
                                <i className="ti ti-eye f-20" />
                                <span>View</span>
                              </NavLink>
                              <div
                                onClick={() => navigate("/Admin/EditPatient", { state: { patientid: item } })}
                                style={{ cursor: "pointer" }}
                                className="avtar avtar-xs btn-link-secondary editIcon"
                              >
                                <i className="ti ti-edit f-20" />
                              <span>Edit</span>
                              </div>
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
                           <div class="loader-container">
  <div class="loader"></div>
</div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
