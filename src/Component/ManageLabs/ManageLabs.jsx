import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { baseurl, baseurImage} from "../../Baseurl"

export default function ManageLabs() {
  const navigate = useNavigate();
  const [labRequests, setLabRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Not Sent"); 
  const [labs, setLabs] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportLabId, setReportLabId] = useState(null);
  const [reportFile, setReportFile] = useState(null);
  const [reportName, setReportName] = useState("");
  const [reportStatus, setReportStatus] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({ request_id: null, lab_id: '', title: '', description: '' });
  const [editAttachments, setEditAttachments] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .post(`${baseurl}getLabRequestsByStatus`, { status: selectedTab })
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
    axios.get(`${baseurl}getAllLabs`).then(res => {
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
          .delete(`${baseurl}deleteLabRequest/${request_id}`)
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

  const handleAddReportClick = (labId) => {
    setReportLabId(labId);
    setShowReportModal(true);
    setReportFile(null);
    setReportName("");
    setReportStatus("");
  };

  const handleEditClick = (lab) => {
    setEditData({
      request_id: lab.request_id,
      lab_id: lab.lab_id || '',
      title: lab.title || '',
      description: lab.description || '',
    });
    setShowEditModal(true);
    
    // Fetch attachments for this lab request
    axios.get(`${baseurl}getLabRequestAttachmentsByLabRequestId/${lab.request_id}`)
      .then((res) => {
        if (res.data.success) {
          setEditAttachments(res.data.data);
        } else {
          setEditAttachments([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching attachments:", err);
        setEditAttachments([]);
      });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${baseurl}editLabRequest/${editData.request_id}`, {
        lab_id: editData.lab_id,
        title: editData.title,
        description: editData.description,
      });
      if (res.data.success) {
        setLabRequests((prev) => prev.map((item) =>
          item.request_id === editData.request_id
            ? { ...item, lab_id: editData.lab_id, title: editData.title, description: editData.description }
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

  const handleDeleteAttachment = async (attachmentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this attachment!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`${baseurl}deleteLabRequestAttachment/${attachmentId}`);
          if (res.data.success) {
            setEditAttachments((prev) => prev.filter((att) => att.attachment_id !== attachmentId));
            Swal.fire('Deleted!', 'The attachment has been deleted.', 'success');
          } else {
            Swal.fire('Error', res.data.message || 'Failed to delete attachment', 'error');
          }
        } catch {
          Swal.fire('Error', 'Server error while deleting attachment', 'error');
        }
      }
    });
  };

  const handleReportFileChange = (e) => {
    setReportFile(e.target.files[0] || null);
  };

  const handleReportUpload = async () => {
    if (!reportFile || !reportName || !reportStatus) {
      Swal.fire('Error', 'Please select file, enter name and status', 'error');
      return;
    }
    const formData = new FormData();
    formData.append('file', reportFile);
    formData.append('name', reportName);
    formData.append('report_status', reportStatus);
    try {
      const res = await axios.post(`${baseurl}addLabRequestAttachment/${reportLabId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        setShowReportModal(false);
        Swal.fire('Success', 'Attachment uploaded successfully', 'success');
      } else {
        Swal.fire('Error', res.data.message || 'Failed to upload', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'Server error while uploading', 'error');
    }
  };

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="d-flex gap-2" >
          <div>
            <button className="btn btn-primary  px-4 my-3"  onClick={() => navigate("/Admin/newrequest")}>
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
              Labs
            </button>
          </div>
        </div>
        <div class="my-12">
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
                                        console.log('Original dropdown change:', e.target.value);
                                        const newStatus = e.target.value === 'Cancel' ? 'Cancelled' : e.target.value;
                                        try {
                                          const res = await axios.post(`${baseurl}updateLabRequestStatus/${lab.request_id}`, { status: newStatus });
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
                                       <option value={lab.status} disabled>
                                         {lab.status === "Pending" ? "Sent" : lab.status}
                                       </option>
                                       {lab.status !== "Not Sent" && <option value="Not Sent">Not Sent</option>}
                                       {lab.status !== "Pending" && <option value="Pending">Sent</option>}
                                       {lab.status !== "Cancel" && <option value="Cancel">Cancel</option>}
                                     </select>
                                  </td>
                                  <td>
                                    <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); navigate(`/Admin/ViewLab/${lab.request_id}`); }}>
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
                                      console.log('Pending dropdown change:', e.target.value);
                                      const newStatus = e.target.value === 'Cancel' ? 'Cancelled' : e.target.value;
                                      try {
                                        const res = await axios.post(`${baseurl}updateLabRequestStatus/${lab.request_id}`, { status: newStatus });
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
                                     <option value={lab.status} disabled>
                                       {lab.status === "Pending" ? "Sent" : lab.status === "Received" ? "Completed" : lab.status}
                                     </option>
                                     {lab.status !== "Pending" && <option value="Pending">Sent</option>}
                                     {lab.status !== "Received" && <option value="Received">Completed</option>}
                                     {lab.status !== "Cancel" && <option value="Cancel">Cancel</option>}
                                   </select>
                                </td>
                                <td>
                                  <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); navigate(`/Admin/ViewLab/${lab.request_id}`); }}>
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
                                      console.log('Received dropdown change:', e.target.value);
                                      const newStatus = e.target.value === 'Cancel' ? 'Cancelled' : e.target.value;
                                      try {
                                        const res = await axios.post(`${baseurl}updateLabRequestStatus/${lab.request_id}`, { status: newStatus });
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
                                     <option value={lab.status} disabled>
                                       {lab.status === "Received" ? "Completed" : lab.status}
                                     </option>
                                     {lab.status !== "Received" && <option value="Received">Completed</option>}
                                     {lab.status !== "Result" && <option value="Result">Result</option>}
                                     {lab.status !== "Cancel" && <option value="Cancel">Cancel</option>}
                                   </select>
                                </td>
                                <td>
                                  <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); navigate(`/Admin/ViewLab/${lab.request_id}`); }}>
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
                            <th>Attachments</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr><td colSpan="12">Loading...</td></tr>
                          ) : error ? (
                            <tr><td colSpan="12" className="text-danger">{error}</td></tr>
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
                                  <button
                                    className="btn btn-sm btn-outline-primary"
                                    style={{ minWidth: 90, fontSize: '0.85em', padding: '2px 8px', height: '1.8em' }}
                                    onClick={() => handleAddReportClick(lab.request_id)}
                                  >
                                    Add Report
                                  </button>
                                </td>
                                <td>
                                  <a href="#" className="avtar avtar-xs btn-link-secondary" onClick={e => { e.preventDefault(); navigate(`/Admin/ViewLab/${lab.request_id}`); }}>
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
          <div className="mb-3">
            <label className="form-label">Select File</label>
            <input
              type="file"
              className="form-control form-control-sm"
              onChange={handleReportFileChange}
              accept="image/*,application/pdf"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={reportName}
              onChange={e => setReportName(e.target.value)}
              placeholder="Report Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select form-select-sm"
              value={reportStatus}
              onChange={e => setReportStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Positive">Positive</option>
              <option value="Negative">Negative</option>
            </select>
          </div>
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
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={editData.title}
                onChange={handleEditChange}
                placeholder="Enter title"
                required
              />
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
            
            {/* Attachments Section */}
            {editAttachments.length > 0 && (
              <div className="mb-3">
                <label className="form-label">Attachments ({editAttachments.length})</label>
                <div className="table-responsive">
                  <table className="table table-sm table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>File</th>
                        <th>Status</th>
                        <th>Uploaded At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editAttachments.map((attachment) => (
                        <tr key={attachment.attachment_id}>
                          <td>{attachment.attachment_name}</td>
                          <td>
                            {attachment.filename ? (
                              <a 
                                href={`${baseurImage}${attachment.filename}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline-primary"
                              >
                                View File
                              </a>
                            ) : 'No file'}
                          </td>
                          <td>{attachment.report_status}</td>
                          <td>{new Date(attachment.uploaded_at).toLocaleDateString()}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteAttachment(attachment.attachment_id)}
                            >
                              <i className="ti ti-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
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
    </div>
  );
}
