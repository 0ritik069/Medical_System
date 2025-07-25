// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// const labsData = [
//   {
//     id: 1,
//     date: "2024-06-15",
//     patient: "John Doe",
//     patientId: "P1001",
//     lab: "LabCorp",
//     title: "Blood Test",
//     description: "Routine blood work",
//     days: 2,
//     sentBy: "Dr. Smith",
//     status: "New",
//     avatar: require("../../assests/patients2.png"),
//   },
//   {
//     id: 2,
//     date: "2024-06-14",
//     patient: "Jane Smith",
//     patientId: "P1002",
//     lab: "Quest Diagnostics",
//     title: "Urine Test",
//     description: "Urinalysis",
//     days: 1,
//     sentBy: "Dr. Adams",
//     status: "New",
//     avatar: require("../../assests/patients2.png"),
//   },
//   {
//     id: 3,
//     date: "2024-06-13",
//     patient: "Alice Johnson",
//     patientId: "P1003",
//     lab: "BioReference",
//     title: "X-Ray",
//     description: "Chest X-Ray",
//     days: 3,
//     sentBy: "Dr. Lee",
//     status: "New",
//     avatar: require("../../assests/patients2.png"),
//   },
// ];
// export default function ManageLabs() {
//   const navigate = useNavigate();
//   const [labRequests, setLabRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedTab, setSelectedTab] = useState("Not Sent"); // 'Not Sent', 'Pending', 'Received', 'Result'
//   const [resultInputs, setResultInputs] = useState({}); // { [request_id]: resultText }
//   const [attachments, setAttachments] = useState({}); // { [request_id]: [File, ...] }

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     axios
//       .post("https://sisccltd.com/medical_app/api/getLabRequestsByStatus", { status: selectedTab })
//       .then((res) => {
//         if (res.data.success && Array.isArray(res.data.data)) {
//           setLabRequests(res.data.data);
//         } else {
//           setLabRequests([]);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Failed to fetch lab requests");
//         setLoading(false);
//       });
//   }, [selectedTab]);

//   // Add delete handler
//   const handleDelete = (request_id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You will not be able to recover this request!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'Cancel',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios
//           .delete(`https://sisccltd.com/medical_app/api/deleteLabRequest/${request_id}`)
//           .then((res) => {
//             if (res.data.success) {
//               setLabRequests((prev) => prev.filter((item) => item.request_id !== request_id));
//               Swal.fire('Deleted!', 'The request has been deleted.', 'success');
//             } else {
//               Swal.fire('Error', res.data.message || 'Failed to delete request', 'error');
//             }
//           })
//           .catch(() => {
//             Swal.fire('Error', 'Server error while deleting request', 'error');
//           });
//       }
//     });
//   };
//   return (
//     <div className="pc-container">
//       <div className="pc-content">
//         <div className="d-flex justify-content-between">
//           <div>
//             <button className="btn btn-primary mx-2 px-4 my-3" onClick={() => navigate("/Admin/newrequest")}>
//               {" "}
//               New Request
//             </button>
//           </div>
//           <div>
//             <button
//               className="btn btn-primary mx-2 px-4 my-3"
//               onClick={() => {
//                 navigate("/Admin/addlabs");
//               }}>
//               Add Labs
//             </button>
//           </div>
//         </div>
//         <div class="container my-12">
//           <div className="w-100 border rounded p-2">
//             <ul className="nav nav-pills w-100" id="pills-tab" role="tablist">
//               <li className="nav-item" role="presentation">
//                 <button
//                   className={`nav-link${selectedTab === "Not Sent" ? " active" : ""}`}
//                   id="pills-home-tab"
//                   data-bs-toggle="pill"
//                   data-bs-target="#pills-home"
//                   type="button"
//                   role="tab"
//                   onClick={() => setSelectedTab("Not Sent")}
//                 >
//                   New
//                 </button>
//               </li>
//               <li className="nav-item" role="presentation">
//                 <button
//                   className={`nav-link${selectedTab === "Pending" ? " active" : ""}`}
//                   id="pills-profile-tab"
//                   data-bs-toggle="pill"
//                   data-bs-target="#pills-profile"
//                   type="button"
//                   role="tab"
//                   onClick={() => setSelectedTab("Pending")}
//                 >
//                   Pending
//                 </button>
//               </li>
//               <li className="nav-item" role="presentation">
//                 <button
//                   className={`nav-link${selectedTab === "Received" ? " active" : ""}`}
//                   id="pills-contact-tab"
//                   data-bs-toggle="pill"
//                   data-bs-target="#pills-contact"
//                   type="button"
//                   role="tab"
//                   onClick={() => setSelectedTab("Received")}
//                 >
//                   Received
//                 </button>
//               </li>
//               <li className="nav-item" role="presentation">
//                 <button
//                   className={`nav-link${selectedTab === "Result" ? " active" : ""}`}
//                   id="pills-result-tab"
//                   data-bs-toggle="pill"
//                   data-bs-target="#pills-result"
//                   type="button"
//                   role="tab"
//                   onClick={() => setSelectedTab("Result")}
//                 >
//                   Result
//                 </button>
//               </li>
//             </ul>
//           </div>
//           <div class="tab-content" id="pills-tabContent">
//             <div
//               className={`tab-pane fade${selectedTab === "Not Sent" ? " show active" : ""}`}
//               id="pills-home"
//               role="tabpanel"
//               aria-labelledby="pills-home-tab"
//             >
//                 <div className="col-12">
//                   <div className="card table-card">
//                     <div className="card-header">
//                       <div className="d-sm-flex align-items-center justify-content-between">
//                         <h5 className="mb-3 mb-sm-0">New List</h5>
//                       </div>
//                     </div>
//                     <div className="card-body pt-3">
//                       <div className="table-responsive">
//                         <table className="table table-hover" id="pc-dt-simple">
//                           <thead>
//                             <tr>
//                               <th>ID</th>
//                               <th>Date</th>
//                               <th>Patient</th>
//                               <th>Patient ID</th>
//                               <th>Lab</th>
//                               <th>Title</th>
//                               <th>Description</th>
//                               <th>Days</th>
//                               <th>Sent By</th>
//                               <th>Status</th>
//                               <th>Actions</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {loading ? (
//                               <tr><td colSpan="11">Loading...</td></tr>
//                             ) : error ? (
//                               <tr><td colSpan="11" className="text-danger">{error}</td></tr>
//                             ) : (
//                               labRequests.map((lab) => (
//                                 <tr key={lab.request_id}>
//                                   <td>{lab.request_id}</td>
//                                   <td>{lab.request_date ? lab.request_date.split('T')[0] : ''}</td>
//                                   <td>{lab.patient_name}</td>
//                                   <td>{lab.patient_civil_id}</td>
//                                   <td>{lab.lab_name}</td>
//                                   <td>{lab.title}</td>
//                                   <td>{lab.description}</td>
//                                   <td>{lab.days_since_request ?? ''}</td>
//                                   <td>{lab.sent_by}</td>
//                                   <td>
//                                     <select
//                                       id={`status-select-new-${lab.request_id}`}
//                                       className="form-select form-select-sm border-primary shadow-sm px-1 py-0"
//                                       style={{ minWidth: 90, fontWeight: 500, fontSize: '0.85em', height: '1.8em', backgroundColor: '#f8f9fa' }}
//                                       value={lab.status}
//                                       title="Change status to Not Sent or Pending"
//                                       onChange={async e => {
//                                         const newStatus = e.target.value;
//                                         try {
//                                           const res = await axios.post(`https://sisccltd.com/medical_app/api/updateLabRequestStatus/${lab.request_id}`, { status: newStatus });
//                                           if (res.data.success) {
//                                             setLabRequests(prev => prev.map(item => item.request_id === lab.request_id ? { ...item, status: newStatus } : item));
//                                             Swal.fire('Success', 'Status updated successfully', 'success');
//                                           } else {
//                                             Swal.fire('Error', res.data.message || 'Failed to update status', 'error');
//                                           }
//                                         } catch {
//                                           Swal.fire('Error', 'Server error while updating status', 'error');
//                                         }
//                                       }}
//                                     >
//                                       <option value="Not Sent">Not Sent</option>
//                                       <option value="Pending">Pending</option>
//                                     </select>
//                                   </td>
//                                   <td>
//                                     <a href="#" className="avtar avtar-xs btn-link-secondary">
//                                       <i className="ti ti-eye f-20" />{" "}
//                                     </a>
//                                     <a href="#" className="avtar avtar-xs btn-link-secondary">
//                                       <i className="ti ti-edit f-20" />{" "}
//                                     </a>
//                                     <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); handleDelete(lab.request_id); }}>
//                                       <i className="ti ti-trash f-20" />
//                                     </a>
//                                   </td>
//                                 </tr>
//                               ))
//                             )}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//             </div>
//             <div
//               className={`tab-pane fade${selectedTab === "Pending" ? " show active" : ""}`}
//               id="pills-profile"
//               role="tabpanel"
//               aria-labelledby="pills-profile-tab"
//             >
//               <div className="col-12">
//                 <div className="card table-card">
//                   <div className="card-header">
//                     <div className="d-sm-flex align-items-center justify-content-between">
//                       <h5 className="mb-3 mb-sm-0">Pending list</h5>
//                       {/* <div><a href="../admins/course-teacher-apply.html" className="btn btn-outline-secondary">Apply Teacher List</a> <a href="../admins/course-teacher-add.html" className="btn btn-primary">Add Teacher</a></div> */}
//                     </div>
//                   </div>
//                   <div className="card-body pt-3">
//                     <div className="table-responsive">
//                       <table className="table table-hover" id="pc-dt-simple">
//                         <thead>
//                           <tr>
//                               <th>ID</th>
//                               <th>Date</th>
//                               <th>Patient</th>
//                               <th>Patient ID</th>
//                               <th>Lab</th>
//                               <th>Title</th>
//                               <th>Description</th>
//                               <th>Days</th>
//                               <th>Sent By</th>
//                               <th>Status</th>
//                               <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                           {loading ? (
//                             <tr><td colSpan="11">Loading...</td></tr>
//                           ) : error ? (
//                             <tr><td colSpan="11" className="text-danger">{error}</td></tr>
//                           ) : (
//                             labRequests.map((lab) => (
//                               <tr key={lab.request_id}>
//                                 <td>{lab.request_id}</td>
//                                 <td>{lab.request_date ? lab.request_date.split('T')[0] : ''}</td>
//                                 <td>{lab.patient_name}</td>
//                                 <td>{lab.patient_civil_id}</td>
//                                 <td>{lab.lab_name}</td>
//                                 <td>{lab.title}</td>
//                                 <td>{lab.description}</td>
//                                 <td>{lab.days_since_request ?? ''}</td>
//                                 <td>{lab.sent_by}</td>
//                                 <td>
//                                   <select
//                                     id={`status-select-pending-${lab.request_id}`}
//                                     className="form-select form-select-sm border-primary shadow-sm px-1 py-0"
//                                     style={{ minWidth: 90, fontWeight: 500, fontSize: '0.85em', height: '1.8em', backgroundColor: '#f8f9fa' }}
//                                     value={lab.status}
//                                     title="Change status to Pending or Received"
//                                     onChange={async e => {
//                                       const newStatus = e.target.value;
//                                       try {
//                                         const res = await axios.post(`https://sisccltd.com/medical_app/api/updateLabRequestStatus/${lab.request_id}`, { status: newStatus });
//                                         if (res.data.success) {
//                                           setLabRequests(prev => prev.map(item => item.request_id === lab.request_id ? { ...item, status: newStatus } : item));
//                                           Swal.fire('Success', 'Status updated successfully', 'success');
//                                         } else {
//                                           Swal.fire('Error', res.data.message || 'Failed to update status', 'error');
//                                         }
//                                       } catch {
//                                         Swal.fire('Error', 'Server error while updating status', 'error');
//                                       }
//                                     }}
//                                   >
//                                     <option value="Pending">Pending</option>
//                                     <option value="Received">Received</option>
//                                   </select>
//                                 </td>
//                                 <td>
//                                   <a href="#" className="avtar avtar-xs btn-link-secondary">
//                                     <i className="ti ti-eye f-20" />{" "}
//                                   </a>
//                                   <a href="#" className="avtar avtar-xs btn-link-secondary">
//                                     <i className="ti ti-edit f-20" />{" "}
//                                   </a>
//                                   <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); handleDelete(lab.request_id); }}>
//                                     <i className="ti ti-trash f-20" />
//                                   </a>
//                                 </td>
//                               </tr>
//                             ))
//                           )}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div
//               className={`tab-pane fade${selectedTab === "Received" ? " show active" : ""}`}
//               id="pills-contact"
//               role="tabpanel"
//               aria-labelledby="pills-contact-tab"
//             >
//               <div className="col-12">
//                 <div className="card table-card">
//                   <div className="card-header">
//                     <div className="d-sm-flex align-items-center justify-content-between">
//                       <h5 className="mb-3 mb-sm-0">Received list</h5>
//                       {/* <div><a href="../admins/course-teacher-apply.html" className="btn btn-outline-secondary">Apply Teacher List</a> <a href="../admins/course-teacher-add.html" className="btn btn-primary">Add Teacher</a></div> */}
//                     </div>
//                   </div>
//                   <div className="card-body pt-3">
//                     <div className="table-responsive">
//                       <table className="table table-hover" id="pc-dt-simple">
//                         <thead>
//                           <tr>
//                             <th>ID</th>
//                             <th>Date</th>
//                             <th>Patient</th>
//                             <th>Patient ID</th>
//                             <th>Lab</th>
//                             <th>Title</th>
//                             <th>Description</th>
//                             <th>Days</th>
//                             <th>Sent By</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {loading ? (
//                             <tr><td colSpan="11">Loading...</td></tr>
//                           ) : error ? (
//                             <tr><td colSpan="11" className="text-danger">{error}</td></tr>
//                           ) : (
//                             labRequests.map((lab) => (
//                               <tr key={lab.request_id}>
//                                 <td>{lab.request_id}</td>
//                                 <td>{lab.request_date ? lab.request_date.split('T')[0] : ''}</td>
//                                 <td>{lab.patient_name}</td>
//                                 <td>{lab.patient_civil_id}</td>
//                                 <td>{lab.lab_name}</td>
//                                 <td>{lab.title}</td>
//                                 <td>{lab.description}</td>
//                                 <td>{lab.days_since_request ?? ''}</td>
//                                 <td>{lab.sent_by}</td>
//                                 <td>{lab.status}</td>
//                                 <td>
//                                   <a href="#" className="avtar avtar-xs btn-link-secondary">
//                                     <i className="ti ti-eye f-20" />{" "}
//                                   </a>
//                                   <a href="#" className="avtar avtar-xs btn-link-secondary">
//                                     <i className="ti ti-edit f-20" />{" "}
//                                   </a>
//                                   <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); handleDelete(lab.request_id); }}>
//                                     <i className="ti ti-trash f-20" />
//                                   </a>
//                                 </td>
//                               </tr>
//                             ))
//                           )}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div
//               className={`tab-pane fade${selectedTab === "Result" ? " show active" : ""}`}
//               id="pills-result"
//               role="tabpanel"
//               aria-labelledby="pills-result-tab"
//             >
//               <div className="col-12">
//                 <div className="card table-card">
//                   <div className="card-header">
//                     <div className="d-sm-flex align-items-center justify-content-between">
//                       <h5 className="mb-3 mb-sm-0">Result List</h5>
//                     </div>
//                   </div>
//                   <div className="card-body pt-3">
//                     <div className="table-responsive">
//                       <table className="table table-hover" id="pc-dt-simple">
//                         <thead>
//                           <tr>
//                             <th>ID</th>
//                             <th>Date</th>
//                             <th>Patient</th>
//                             <th>Patient ID</th>
//                             <th>Lab</th>
//                             <th>Title</th>
//                             <th>Description</th>
//                             <th>Days</th>
//                             <th>Sent By</th>
//                             <th>Status</th>
//                             <th>Attachments</th>
//                             <th>Actions</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {loading ? (
//                             <tr><td colSpan="13">Loading...</td></tr>
//                           ) : error ? (
//                             <tr><td colSpan="13" className="text-danger">{error}</td></tr>
//                           ) : (
//                             labRequests.map((lab) => (
//                               <tr key={lab.request_id}>
//                                 <td>{lab.request_id}</td>
//                                 <td>{lab.request_date ? lab.request_date.split('T')[0] : ''}</td>
//                                 <td>{lab.patient_name}</td>
//                                 <td>{lab.patient_civil_id}</td>
//                                 <td>{lab.lab_name}</td>
//                                 <td>{lab.title}</td>
//                                 <td>{lab.description}</td>
//                                 <td>{lab.days_since_request ?? ''}</td>
//                                 <td>{lab.sent_by}</td>
//                                 <td>
//                                   <select
//                                     className="form-select"
//                                     value={lab.status === 'Positive' || lab.status === 'Negative' ? lab.status : ''}
//                                     onChange={e => {
//                                       // Optionally, handle status change here (e.g., update backend or local state)
//                                       setLabRequests(prev => prev.map(item => item.request_id === lab.request_id ? { ...item, status: e.target.value } : item));
//                                     }}
//                                   >
//                                     <option value="">Select</option>
//                                     <option value="Positive">Positive</option>
//                                     <option value="Negative">Negative</option>
//                                   </select>
//                                 </td>
//                                 <td>
//                                   <input
//                                     type="file"
//                                     className="form-control"
//                                     multiple
//                                     onChange={e => setAttachments(prev => ({ ...prev, [lab.request_id]: Array.from(e.target.files) }))}
//                                   />
//                                 </td>
//                                 <td>
//                                   <a href="#" className="avtar avtar-xs btn-link-secondary">
//                                     <i className="ti ti-eye f-20" />{" "}
//                                   </a>
//                                   <a href="#" className="avtar avtar-xs btn-link-secondary">
//                                     <i className="ti ti-edit f-20" />{" "}
//                                   </a>
//                                   <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); handleDelete(lab.request_id); }}>
//                                     <i className="ti ti-trash f-20" />
//                                   </a>
//                                 </td>
//                               </tr>
//                             ))
//                           )}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { baseurl} from "../../Baseurl"

export default function ManageLabs() {
  const navigate = useNavigate();
  const [labRequests, setLabRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Not Sent"); 
  const [resultInputs, setResultInputs] = useState({}); 
  const [attachments, setAttachments] = useState({}); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({ request_id: null, lab_id: '', description: '' });
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [labs, setLabs] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportLabId, setReportLabId] = useState(null);
  const [reportFiles, setReportFiles] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .post("https://sisccltd.com/medical_app/api/getLabRequestsByStatus", { status: selectedTab })
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setLabRequests(res.data.data);
        } else {
          setLabRequests([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch lab requests");
        setLoading(false);
      });
  }, [selectedTab, refreshFlag]);

  useEffect(() => {
    // Fetch labs for the edit modal dropdown
    axios.get("https://sisccltd.com/medical_app/api/getAllLabs").then(res => {
      if (res.data.success && Array.isArray(res.data.data)) {
        setLabs(res.data.data);
      }
    });
  }, []);

  // Add delete handler
  const handleDelete = (request_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this request!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://sisccltd.com/medical_app/api/deleteLabRequest/${request_id}`)
          .then((res) => {
            if (res.data.success) {
              setLabRequests((prev) => prev.filter((item) => item.request_id !== request_id));
              Swal.fire('Deleted!', 'The request has been deleted.', 'success');
            } else {
              Swal.fire('Error', res.data.message || 'Failed to delete request', 'error');
            }
          })
          .catch(() => {
            Swal.fire('Error', 'Server error while deleting request', 'error');
          });
      }
    });
  };

  const handleEditClick = (lab) => {
    setEditData({
      request_id: lab.request_id,
      lab_id: lab.lab_id || '',
      description: lab.description || '',
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`https://sisccltd.com/medical_app/api/editLabRequest/${editData.request_id}`, {
        lab_id: editData.lab_id,
        description: editData.description,
      });
      if (res.data.success) {
        setLabRequests((prev) => prev.map((item) =>
          item.request_id === editData.request_id
            ? { ...item, lab_id: editData.lab_id, description: editData.description }
            : item
        ));
        setShowEditModal(false);
        Swal.fire('Success', 'Lab request updated successfully', 'success');
      } else {
        Swal.fire('Error', res.data.message || 'Failed to update lab request', 'error');
      }
    } catch {
      Swal.fire('Error', 'Server error while updating lab request', 'error');
    }
  };

  const handleViewClick = (lab) => {
    setViewData(lab);
    setShowViewModal(true);
  };

  const handleAddReportClick = (labId) => {
    setReportLabId(labId);
    setShowReportModal(true);
    setReportFiles([]);
  };

  const handleReportFileChange = (e) => {
    setReportFiles(Array.from(e.target.files));
  };

  const handleReportUpload = () => {
    // Implement upload logic here (e.g., send reportFiles to backend for reportLabId)
    setShowReportModal(false);
    Swal.fire('Success', 'Report(s) uploaded successfully', 'success');
  };

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="d-flex justify-content-between">
          <div>
            <button className="btn btn-primary mx-2 px-4 my-3" onClick={() => navigate("/Admin/newrequest")}>
              {" "}
              New Request
            </button>
          </div>
          <div>
            <button
              className="btn btn-primary mx-2 px-4 my-3"
              onClick={() => {
                navigate("/Admin/addlabs");
              }}>
              Add Labs
            </button>
          </div>
        </div>
        <div class="container my-12">
          <div className="w-100 border rounded p-2">
            <ul className="nav nav-pills w-100" id="pills-tab" role="tablist"> 
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link${selectedTab === "Not Sent" ? " active" : ""}`}
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  onClick={() => setSelectedTab("Not Sent")}
                >
                  New
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link${selectedTab === "Pending" ? " active" : ""}`}
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  onClick={() => setSelectedTab("Pending")}
                >
                  Pending
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link${selectedTab === "Received" ? " active" : ""}`}
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  onClick={() => setSelectedTab("Received")}
                >
                  Received
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link${selectedTab === "Result" ? " active" : ""}`}
                  id="pills-result-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-result"
                  type="button"
                  role="tab"
                  onClick={() => setSelectedTab("Result")}
                >
                  Result
                </button>
              </li>
            </ul>
          </div>
          <div class="tab-content" id="pills-tabContent">
            <div
              className={`tab-pane fade${selectedTab === "Not Sent" ? " show active" : ""}`}
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
                <div className="col-12">
                  <div className="card table-card">
                    <div className="card-header">
                      <div className="d-sm-flex align-items-center justify-content-between">
                        <h5 className="mb-3 mb-sm-0">New List</h5>
                      </div>
                    </div>
                    <div className="card-body pt-3">
                      <div className="table-responsive">
                        <table className="table table-hover" id="pc-dt-simple">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Date</th>
                              <th>Patient</th>
                              <th>Patient ID</th>
                              <th>Lab</th>
                              <th>Title</th>
                              <th>Description</th>
                              <th>Days</th>
                              <th>Sent By</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr><td colSpan="11">Loading...</td></tr>
                            ) : error ? (
                              <tr><td colSpan="11" className="text-danger">{error}</td></tr>
                            ) : (
                              labRequests.map((lab) => (
                                <tr key={lab.request_id}>
                                  <td>{lab.request_id}</td>
                                  <td>{lab.request_date ? lab.request_date.split('T')[0] : ''}</td>
                                  <td>{lab.patient_name}</td>
                                  <td>{lab.patient_civil_id}</td>
                                  <td>{lab.lab_name}</td>
                                  <td>{lab.title}</td>
                                  <td>{lab.description}</td>
                                  <td>{lab.days_since_request ?? ''}</td>
                                  <td>{lab.sent_by}</td>
                                  <td>
                                    <select
                                      id={`status-select-new-${lab.request_id}`}
                                      className="form-select form-select-sm border-primary shadow-sm px-1 py-0"
                                      style={{ minWidth: 90, fontWeight: 500, fontSize: '0.85em', height: '1.8em', backgroundColor: '#f8f9fa' }}
                                      value={lab.status}
                                      title="Change status"
                                      onChange={async e => {
                                        const newStatus = e.target.value === 'Cancel' ? 'Cancelled' : e.target.value;
                                        try {
                                          const res = await axios.post(`https://sisccltd.com/medical_app/api/updateLabRequestStatus/${lab.request_id}`, { status: newStatus });
                                          if (res.data.success) {
                                            setRefreshFlag(f => f + 1);
                                            Swal.fire('Success', 'Status updated successfully', 'success');
                                          } else {
                                            Swal.fire('Error', res.data.message || 'Failed to update status', 'error');
                                          }
                                        } catch {
                                          Swal.fire('Error', 'Server error while updating status', 'error');
                                        }
                                      }}
                                    >
                                      <option value="Not Sent">Not Sent</option>
                                      <option value="Pending">Pending</option>
                                      <option value="Cancel">Cancel</option>
                                    </select>
                                  </td>
                                  <td>
                                    <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); handleViewClick(lab); }}>
                                      <i className="ti ti-eye f-20" />{" "}
                                    </a>
                                    <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); handleEditClick(lab); }}>
                                      <i className="ti ti-edit f-20" />{" "}
                                    </a>
                                    <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); handleDelete(lab.request_id); }}>
                                      <i className="ti ti-trash f-20" />
                                    </a>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div
              className={`tab-pane fade${selectedTab === "Pending" ? " show active" : ""}`}
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className="col-12">
                <div className="card table-card">
                  <div className="card-header">
                    <div className="d-sm-flex align-items-center justify-content-between">
                      <h5 className="mb-3 mb-sm-0">Pending list</h5>
                      {/* <div><a href="../admins/course-teacher-apply.html" className="btn btn-outline-secondary">Apply Teacher List</a> <a href="../admins/course-teacher-add.html" className="btn btn-primary">Add Teacher</a></div> */}
                    </div>
                  </div>
                  <div className="card-body pt-3">
                    <div className="table-responsive">
                      <table className="table table-hover" id="pc-dt-simple">
                        <thead>
                          <tr>
                              <th>ID</th>
                              <th>Date</th>
                              <th>Patient</th>
                              <th>Patient ID</th>
                              <th>Lab</th>
                              <th>Title</th>
                              <th>Description</th>
                              <th>Days</th>
                              <th>Sent By</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr><td colSpan="11">Loading...</td></tr>
                          ) : error ? (
                            <tr><td colSpan="11" className="text-danger">{error}</td></tr>
                          ) : (
                            labRequests.map((lab) => (
                              <tr key={lab.request_id}>
                                <td>{lab.request_id}</td>
                                <td>{lab.request_date ? lab.request_date.split('T')[0] : ''}</td>
                                <td>{lab.patient_name}</td>
                                <td>{lab.patient_civil_id}</td>
                                <td>{lab.lab_name}</td>
                                <td>{lab.title}</td>
                                <td>{lab.description}</td>
                                <td>{lab.days_since_request ?? ''}</td>
                                <td>{lab.sent_by}</td>
                                <td>
                                  <select
                                    id={`status-select-pending-${lab.request_id}`}
                                    className="form-select form-select-sm border-primary shadow-sm px-1 py-0"
                                    style={{ minWidth: 90, fontWeight: 500, fontSize: '0.85em', height: '1.8em', backgroundColor: '#f8f9fa' }}
                                    value={lab.status}
                                    title="Change status"
                                    onChange={async e => {
                                      const newStatus = e.target.value === 'Cancel' ? 'Cancelled' : e.target.value;
                                      try {
                                        const res = await axios.post(`https://sisccltd.com/medical_app/api/updateLabRequestStatus/${lab.request_id}`, { status: newStatus });
                                        if (res.data.success) {
                                          setRefreshFlag(f => f + 1);
                                          Swal.fire('Success', 'Status updated successfully', 'success');
                                        } else {
                                          Swal.fire('Error', res.data.message || 'Failed to update status', 'error');
                                        }
                                      } catch {
                                        Swal.fire('Error', 'Server error while updating status', 'error');
                                      }
                                    }}
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="Received">Received</option>
                                    <option value="Cancel">Cancel</option>
                                  </select>
                                </td>
                                <td>
                                  <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); handleViewClick(lab); }}>
                                    <i className="ti ti-eye f-20" />{" "}
                                  </a>
                                  <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); handleEditClick(lab); }}>
                                    <i className="ti ti-edit f-20" />{" "}
                                  </a>
                                  <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); handleDelete(lab.request_id); }}>
                                    <i className="ti ti-trash f-20" />
                                  </a>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`tab-pane fade${selectedTab === "Received" ? " show active" : ""}`}
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
            >
              <div className="col-12">
                <div className="card table-card">
                  <div className="card-header">
                    <div className="d-sm-flex align-items-center justify-content-between">
                      <h5 className="mb-3 mb-sm-0">Received list</h5>
                      {/* <div><a href="../admins/course-teacher-apply.html" className="btn btn-outline-secondary">Apply Teacher List</a> <a href="../admins/course-teacher-add.html" className="btn btn-primary">Add Teacher</a></div> */}
                    </div>
                  </div>
                  <div className="card-body pt-3">
                    <div className="table-responsive">
                      <table className="table table-hover" id="pc-dt-simple">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Patient</th>
                            <th>Patient ID</th>
                            <th>Lab</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Days</th>
                            <th>Sent By</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr><td colSpan="11">Loading...</td></tr>
                          ) : error ? (
                            <tr><td colSpan="11" className="text-danger">{error}</td></tr>
                          ) : (
                            labRequests.map((lab) => (
                              <tr key={lab.request_id}>
                                <td>{lab.request_id}</td>
                                <td>{lab.request_date ? lab.request_date.split('T')[0] : ''}</td>
                                <td>{lab.patient_name}</td>
                                <td>{lab.patient_civil_id}</td>
                                <td>{lab.lab_name}</td>
                                <td>{lab.title}</td>
                                <td>{lab.description}</td>
                                <td>{lab.days_since_request ?? ''}</td>
                                <td>{lab.sent_by}</td>
                                <td>
                                  <select
                                    id={`status-select-received-${lab.request_id}`}
                                    className="form-select form-select-sm border-primary shadow-sm px-1 py-0"
                                    style={{ minWidth: 90, fontWeight: 500, fontSize: '0.85em', height: '1.8em', backgroundColor: '#f8f9fa' }}
                                    value={lab.status}
                                    title="Change status"
                                    onChange={async e => {
                                      const newStatus = e.target.value === 'Cancel' ? 'Cancelled' : e.target.value;
                                      try {
                                        const res = await axios.post(`https://sisccltd.com/medical_app/api/updateLabRequestStatus/${lab.request_id}`, { status: newStatus });
                                        if (res.data.success) {
                                          setRefreshFlag(f => f + 1);
                                          Swal.fire('Success', 'Status updated successfully', 'success');
                                        } else {
                                          Swal.fire('Error', res.data.message || 'Failed to update status', 'error');
                                        }
                                      } catch {
                                        Swal.fire('Error', 'Server error while updating status', 'error');
                                      }
                                    }}
                                  >
                                    <option value="Received">Received</option>
                                    <option value="Result">Result</option>
                                    <option value="Cancel">Cancel</option>
                                  </select>
                                </td>
                                <td>
                                  <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); handleViewClick(lab); }}>
                                    <i className="ti ti-eye f-20" />{" "}
                                  </a>
                                  <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); handleEditClick(lab); }}>
                                    <i className="ti ti-edit f-20" />{" "}
                                  </a>
                                  <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); handleDelete(lab.request_id); }}>
                                    <i className="ti ti-trash f-20" />
                                  </a>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`tab-pane fade${selectedTab === "Result" ? " show active" : ""}`}
              id="pills-result"
              role="tabpanel"
              aria-labelledby="pills-result-tab"
            >
              <div className="col-12">
                <div className="card table-card">
                  <div className="card-header">
                    <div className="d-sm-flex align-items-center justify-content-between">
                      <h5 className="mb-3 mb-sm-0">Result List</h5>
                    </div>
                  </div>
                  <div className="card-body pt-3">
                    <div className="table-responsive">
                      <table className="table table-hover" id="pc-dt-simple">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Patient</th>
                            <th>Patient ID</th>
                            <th>Lab</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Days</th>
                            <th>Sent By</th>
                            <th>Status</th>
                            <th>Attachments</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr><td colSpan="13">Loading...</td></tr>
                          ) : error ? (
                            <tr><td colSpan="13" className="text-danger">{error}</td></tr>
                          ) : (
                            labRequests.map((lab) => (
                              <tr key={lab.request_id}>
                                <td>{lab.request_id}</td>
                                <td>{lab.request_date ? lab.request_date.split('T')[0] : ''}</td>
                                <td>{lab.patient_name}</td>
                                <td>{lab.patient_civil_id}</td>
                                <td>{lab.lab_name}</td>
                                <td>{lab.title}</td>
                                <td>{lab.description}</td>
                                <td>{lab.days_since_request ?? ''}</td>
                                <td>{lab.sent_by}</td>
                                <td>
                                  <select
                                    id={`status-select-result-${lab.request_id}`}
                                    className="form-select form-select-sm border-primary shadow-sm px-1 py-0"
                                    style={{ minWidth: 90, fontWeight: 500, fontSize: '0.85em', height: '1.8em', backgroundColor: '#f8f9fa' }}
                                    value={lab.status}
                                    title="Change status"
                                    onChange={async e => {
                                      const newStatus = e.target.value === 'Cancel' ? 'Cancelled' : e.target.value;
                                      try {
                                        const res = await axios.post(`https://sisccltd.com/medical_app/api/updateLabRequestStatus/${lab.request_id}`, { status: newStatus });
                                        if (res.data.success) {
                                          setRefreshFlag(f => f + 1);
                                          Swal.fire('Success', 'Status updated successfully', 'success');
                                        } else {
                                          Swal.fire('Error', res.data.message || 'Failed to update status', 'error');
                                        }
                                      } catch {
                                        Swal.fire('Error', 'Server error while updating status', 'error');
                                      }
                                    }}
                                  >
                                    <option value="Positive">Positive</option>
                                    <option value="Negative">Negative</option>
                                    <option value="Cancel">Cancel</option>
                                  </select>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-sm btn-outline-primary"
                                    style={{ minWidth: 90, fontSize: '0.85em', padding: '2px 8px', height: '1.8em' }}
                                    onClick={() => handleAddReportClick(lab.request_id)}
                                  >
                                    Add Report
                                  </button>
                                </td>
                                <td>
                                  <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); handleViewClick(lab); }}>
                                    <i className="ti ti-eye f-20" />{" "}
                                  </a>
                                  <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); handleEditClick(lab); }}>
                                    <i className="ti ti-edit f-20" />{" "}
                                  </a>
                                  <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); handleDelete(lab.request_id); }}>
                                    <i className="ti ti-trash f-20" />
                                  </a>
                                </td>
                              </tr>
                            ))
                          )}
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
      {showEditModal && (
  <div
    className="modal fade show"
    style={{
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "block",
    }}
  >
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Lab Request</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowEditModal(false)}
          ></button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleEditSubmit}>
            <div className="mb-3">
              <label className="form-label">Lab</label>
              <select
                className="form-select"
                name="lab_id"
                value={editData.lab_id}
                onChange={handleEditChange}
                required
              >
                <option value="">Select Lab</option>
                {labs.map(lab => (
                  <option key={lab.id} value={lab.id}>{lab.lab_name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={editData.description}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)}
{showViewModal && viewData && (
  <div
    className="modal fade show"
    style={{
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "block",
    }}
  >
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Lab Request Details</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowViewModal(false)}
          ></button>
        </div>
        <div className="modal-body">
          <div className="mb-2"><strong>ID:</strong> {viewData.request_id}</div>
          <div className="mb-2"><strong>Date:</strong> {viewData.request_date ? viewData.request_date.split('T')[0] : ''}</div>
          <div className="mb-2"><strong>Patient:</strong> {viewData.patient_name}</div>
          <div className="mb-2"><strong>Patient ID:</strong> {viewData.patient_civil_id}</div>
          <div className="mb-2"><strong>Lab ID:</strong> {viewData.lab_id}</div>
          <div className="mb-2"><strong>Lab Name:</strong> {viewData.lab_name}</div>
          <div className="mb-2"><strong>Doctor:</strong> {viewData.doctor_name}</div>
          <div className="mb-2"><strong>Title:</strong> {viewData.title}</div>
          <div className="mb-2"><strong>Description:</strong> {viewData.description}</div>
          <div className="mb-2"><strong>Days Since Request:</strong> {viewData.days_since_request ?? ''}</div>
          <div className="mb-2"><strong>Sent By:</strong> {viewData.sent_by}</div>
          <div className="mb-2"><strong>Status:</strong> {viewData.status}</div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={() => setShowViewModal(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}
{showReportModal && (
  <div
    className="modal fade show"
    style={{ backgroundColor: "rgba(0,0,0,0.5)", display: "block" }}
  >
    <div className="modal-dialog modal-md">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Report Attachment</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowReportModal(false)}
          ></button>
        </div>
        <div className="modal-body">
          <input
            type="file"
            className="form-control form-control-sm"
            multiple
            onChange={handleReportFileChange}
          />
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={() => setShowReportModal(false)}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleReportUpload}>
            Upload
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
