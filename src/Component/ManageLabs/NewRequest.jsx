import axios from "axios";
import { baseurl } from "../../Baseurl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NewRequest() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [patients, setPatients] = useState([]);
  const [labs, setLabs] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState({ patients: true, labs: true, doctors: true });
  const [apiError, setApiError] = useState({ patients: false, labs: false, doctors: false });
  const [formData, setFormData] = useState({
    patient_id: "",
    lab_id: "",
    doctor_id: "",
    title: "",
    description: "",
    sent_by: "",
  });


  const [selectedPatientId, setSelectedPatientId] = useState("");

  useEffect(() => {
    console.log("Fetching patients from:", `${baseurl}getAllPatients`);
    setLoading(prev => ({ ...prev, patients: true }));
    setApiError(prev => ({ ...prev, patients: false }));
    
    axios.get(`${baseurl}getAllPatients`)
      .then(res => {
        console.log("Patients API response:", res.data);
        if (res.data.success && Array.isArray(res.data.data)) {
          console.log("Setting patients:", res.data.data);
          setPatients(res.data.data);
        } else {
          console.log("Patients API failed or no data:", res.data);
          setApiError(prev => ({ ...prev, patients: true }));
        }
        setLoading(prev => ({ ...prev, patients: false }));
      })
      .catch(err => {
        console.error("Failed to fetch patients", err);
        console.error("Error details:", err.response?.data);
        setApiError(prev => ({ ...prev, patients: true }));
        setLoading(prev => ({ ...prev, patients: false }));
      });
  }, []);

  useEffect(() =>{
    console.log("Fetching labs from:", `${baseurl}getAllActiveLabs`);
    setLoading(prev => ({ ...prev, labs: true }));
    setApiError(prev => ({ ...prev, labs: false }));
    
    axios.get(`${baseurl}getAllActiveLabs`)
    .then(res => {
        console.log("Labs API response:", res.data);
        if(res.data.success && Array.isArray(res.data.data)) {
            console.log("Setting labs:", res.data.data);
            setLabs(res.data.data);
        } else {
            console.log("Labs API failed or no data:", res.data);
            setApiError(prev => ({ ...prev, labs: true }));
        }
        setLoading(prev => ({ ...prev, labs: false }));
    })
    .catch(err =>{
        console.error("Failed to fetch labs", err);
        console.error("Error details:", err.response?.data);
        setApiError(prev => ({ ...prev, labs: true }));
        setLoading(prev => ({ ...prev, labs: false }));
    });
  },[]);

  useEffect(() => {
    // Test if API server is reachable
    console.log("Testing API server connection...");
    axios.get(`${baseurl}`)
      .then(res => {
        console.log("API server is reachable:", res.data);
      })
      .catch(err => {
        console.error("API server not reachable:", err);
      });
      
    console.log("Fetching doctors from:", `${baseurl}getActiveDoctors`);
    setLoading(prev => ({ ...prev, doctors: true }));
    setApiError(prev => ({ ...prev, doctors: false }));
    
    axios.get(`${baseurl}getActiveDoctors`)
      .then(res => {
        console.log("Doctors API response:", res.data);
        if (res.data.success && Array.isArray(res.data.data)) {
          console.log("Setting doctors:", res.data.data);
          setDoctors(res.data.data);
        } else {
          console.log("Doctors API failed or no data:", res.data);
          setApiError(prev => ({ ...prev, doctors: true }));
        }
        setLoading(prev => ({ ...prev, doctors: false }));
      })
      .catch(err => {
        console.error("Failed to fetch doctors", err);
        console.error("Error details:", err.response?.data);
        setApiError(prev => ({ ...prev, doctors: true }));
        setLoading(prev => ({ ...prev, doctors: false }));
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  const handlePatientChange = (e) => {
    const selectedId = e.target.value;
    const selectedPatient = patients.find(p => String(p.id) === selectedId);
    setSelectedPatientId(selectedId);
    setFormData((prev) => ({
      ...prev,
      patient: selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastName}` : "",
      patient_id: selectedId, // Use the actual MySQL id for API
      patient_civil_id: selectedPatient ? selectedPatient.civilIdNumber : "", // For display
    }));
  };

  const validate = () => {
    const err = {};
    if (!formData.patient_id) err.patient_id = "Patient ID is required";
    if (!formData.lab_id) err.lab_id = "Lab is required";
    if (!formData.doctor_id) err.doctor_id = "Doctor is required";
    if (!formData.title) err.title = "Title is required";
    if (!formData.description) err.description = "Description is required";
    if (!formData.sent_by) err.sent_by = "Sent By is required";
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
    
    console.log("Submitting form data:", formData);
    
    try {
      const response = await axios.post(
        `${baseurl}addLabRequest`,
        formData
      );
      if (response.data.success) {
        setSubmitted(true);
        Swal.fire("Success", "New Request added successfully!", "success");
        setFormData({
          patient_id: "",
          lab_id: "",
          doctor_id: "",
          title: "",
          description: "",
          sent_by: "",
        });
        setSelectedPatientId("");
        setErrors({});
      } else {
        Swal.fire("Error", response.data.message || "Something went wrong", "error");
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error);
      Swal.fire("Error", "Server error while adding request", "error");
    }
  };
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
                Add New Request
              </h5>
            </div>
            {submitted && (
              <div className="alert alert-success">
                New Request added successfully!
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className="row g-3 px-3 py-2 mb-3"
            >
              <div className="col-md-6">
                <label className="form-label">Patient</label>
                <select
                  className="form-control"
                  name="patient_id"
                  value={selectedPatientId}
                  onChange={handlePatientChange}
                  disabled={loading.patients}
                >
                  <option value="">{loading.patients ? "Loading patients..." : "Select Patient"}</option>
                  {!loading.patients && !apiError.patients && patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.firstName} {p.lastName}
                    </option>
                  ))}
                </select>
                {apiError.patients && (
                  <p className="text-danger">Failed to load patients. Please try again.</p>
                )}
                {errors && errors.patient_id && (
                  <p className="text-danger">{errors.patient_id}</p>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">Patient ID</label>
                <input
                  type="text"
                  name="patient_civil_id"
                  value={formData.patient_civil_id || ""}
                  className="form-control"
                  placeholder="Patient ID"
                  readOnly
                />
                {errors && errors.patient_id && (
                  <p className="text-danger">{errors.patient_id}</p>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">Lab</label>
                <select
                  className="form-control"
                  name="lab_id"
                  value={formData.lab_id}
                  onChange={handleChange}
                  disabled={loading.labs}
                >
                  <option value="">{loading.labs ? "Loading labs..." : "Select Lab"}</option>
                  {!loading.labs && !apiError.labs && labs.map((lab) => (
                    <option key={lab.id} value={lab.id}>
                      {lab.lab_name}
                    </option>
                  ))}
                </select>
                {apiError.labs && (
                  <p className="text-danger">Failed to load labs. Please try again.</p>
                )}
                {errors && errors.lab_id && (
                  <p className="text-danger">{errors.lab_id}</p>
                )}
              </div>

              {/* Doctor dropdown */}
              <div className="col-md-6">
                <label className="form-label">Doctor</label>
                <select
                  className="form-control"
                  name="doctor_id"
                  value={formData.doctor_id}
                  onChange={handleChange}
                  disabled={loading.doctors}
                >
                  <option value="">{loading.doctors ? "Loading doctors..." : "Select Doctor"}</option>
                  {console.log("Rendering doctors dropdown with:", doctors.length, "doctors")}
                  {!loading.doctors && !apiError.doctors && doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.fullName}
                    </option>
                  ))}
                </select>
                {apiError.doctors && (
                  <p className="text-danger">Failed to load doctors. Please try again.</p>
                )}
                {errors && errors.doctor_id && (
                  <p className="text-danger">{errors.doctor_id}</p>
                )}
              </div>

              {/* Other fields */}
              {["title", "description", "sent_by"].map((field) => (
                <div className="col-md-6" key={field}>
                  <label className="form-label">
                    {field.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                  </label>
                  <input
                    type={field === "days" ? "number" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="form-control"
                    placeholder={field.replace(/_/g, " ")}
                  />
                  {errors && errors[field] && (
                    <p className="text-danger">{errors[field]}</p>
                  )}
                </div>
              ))}
              <div className="col-12 mb-3 text-center">
                <button type="submit" className="bgBtn">
                  Add Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}