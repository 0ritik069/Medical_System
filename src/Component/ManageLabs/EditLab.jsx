import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { baseurl } from "../../Baseurl";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function EditLab() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    request_id: "",
    patient_name: "",
    lab_name: "",
    test_type: "",
    description: "",
    status: "",
    cost: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch labs for dropdown
    fetchLabs();
    
    // If we have lab data from location state, use it
    if (location.state?.labRequest) {
      setFormData(location.state.labRequest);
      setLoading(false);
    } else if (id) {
      // Otherwise fetch by ID
      fetchLabRequest();
    }
  }, [location.state, id]);

  const fetchLabs = async () => {
    try {
      const res = await axios.get(`${baseurl}getAllLabs`);
      if (res.data.success && Array.isArray(res.data.data)) {
        setLabs(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch labs", err);
    }
  };

  const fetchLabRequest = async () => {
    try {
      const res = await axios.get(`${baseurl}getLabRequestById/${id}`);
      if (res.data.success) {
        setFormData(res.data.data);
      } else {
        console.error("Failed to fetch lab request:", res.data.message);
      }
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch lab request", err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const err = {};
    if (!formData.patient_name?.trim()) err.patient_name = "Patient name is required";
    if (!formData.lab_name?.trim()) err.lab_name = "Lab name is required";
    if (!formData.test_type?.trim()) err.test_type = "Test type is required";
    if (!formData.description?.trim()) err.description = "Description is required";
    if (!formData.status?.trim()) err.status = "Status is required";
    if (formData.cost && isNaN(formData.cost)) err.cost = "Cost must be a number";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const foundErrors = validate();
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      setSubmitted(false);
      return;
    }

    try {
      const response = await axios.put(`${baseurl}updateLabRequest/${formData.request_id}`, formData);

      if (response.data.success === true) {
        setSubmitted(true);
        Swal.fire("Success!", "Lab request updated successfully!", "success");
        toast.success("Lab request updated successfully!");
        navigate("/Admin/ManageLabs");
      } else {
        alert("Update failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Update failed: " + (error.response?.data?.message || error.message));
    }
  };

  if (loading) {
    return (
      <div className="pc-container">
        <div className="pc-content">
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
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
                Edit Lab Request
              </h5>
            </div>

            {submitted && (
              <div className="alert alert-success">Lab request updated successfully!</div>
            )}

            <form onSubmit={handleSubmit} className="row g-3 px-3 py-2 mb-3">
              {/* Patient Name */}
              <div className="col-md-6">
                <label className="form-label">Patient Name</label>
                <input
                  type="text"
                  name="patient_name"
                  className="form-control"
                  value={formData.patient_name || ""}
                  onChange={handleChange}
                />
                {errors.patient_name && (
                  <p className="text-danger">{errors.patient_name}</p>
                )}
              </div>

              {/* Lab Name */}
              <div className="col-md-6">
                <label className="form-label">Lab Name</label>
                <select
                  name="lab_name"
                  value={formData.lab_name || ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Lab</option>
                  {labs.map((lab) => (
                    <option key={lab.id} value={lab.name}>{lab.name}</option>
                  ))}
                </select>
                {errors.lab_name && (
                  <p className="text-danger">{errors.lab_name}</p>
                )}
              </div>

              {/* Test Type */}
              <div className="col-md-6">
                <label className="form-label">Test Type</label>
                <input
                  type="text"
                  name="test_type"
                  className="form-control"
                  value={formData.test_type || ""}
                  onChange={handleChange}
                />
                {errors.test_type && (
                  <p className="text-danger">{errors.test_type}</p>
                )}
              </div>

              {/* Status */}
              <div className="col-md-6">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={formData.status || ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Not Sent">Not Sent</option>
                  <option value="Sent">Sent</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                {errors.status && (
                  <p className="text-danger">{errors.status}</p>
                )}
              </div>

              {/* Cost */}
              <div className="col-md-6">
                <label className="form-label">Cost</label>
                <input
                  type="number"
                  name="cost"
                  className="form-control"
                  value={formData.cost || ""}
                  onChange={handleChange}
                />
                {errors.cost && (
                  <p className="text-danger">{errors.cost}</p>
                )}
              </div>

              {/* Description */}
              <div className="col-md-12">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  value={formData.description || ""}
                  onChange={handleChange}
                />
                {errors.description && (
                  <p className="text-danger">{errors.description}</p>
                )}
              </div>

              {/* Notes */}
              <div className="col-md-12">
                <label className="form-label">Notes</label>
                <textarea
                  name="notes"
                  className="form-control"
                  rows="3"
                  value={formData.notes || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 text-center">
                <button type="submit" className="bgBtn">
                  Update Lab Request
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
} 