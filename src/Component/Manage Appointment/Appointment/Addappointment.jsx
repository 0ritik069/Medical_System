import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../../../Baseurl";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
const AddAppointment = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    startTime: "",
    endTime: "",
    reason: "",
    status: "Scheduled",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [patientList, setPatientList] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);
  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${baseurl}getAllPatients`);
      if (response.data.success) {
        setPatientList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${baseurl}getActiveDoctors`);
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  const validate = () => {
    const newErrors = {};
    if (!formData.patientId) newErrors.patientId = "Patient is required";
    if (!formData.appointmentDate)
      newErrors.appointmentDate = "Date is required";
    if (!formData.reason.trim()) newErrors.reason = "Reason is required";
    if (!formData.doctorId) newErrors.doctorId = "Doctor is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (formData.startTime && formData.endTime) {
      const start = new Date(`2020-01-01T${formData.startTime}`);
      const end = new Date(`2020-01-01T${formData.endTime}`);
      const diffInMs = end - start;
      const diffInHours = diffInMs / (1000 * 60 * 60);
      if (diffInHours <= 0) {
        newErrors.endTime = "End time must be after start time";
      } else if (diffInHours > 5) {
        newErrors.endTime = "Appointment can't be more than 5 hours";
      }
    }
    setErrors(newErrors);
    return newErrors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) return;
    try {
      const response = await axios.post(`${baseurl}createAppointment`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/Admin/appointment2");
        }, 1500);
        setFormData({
          patientId: "",
          doctorId: "",
          appointmentDate: "",
          startTime: "",
          endTime: "",
          reason: "",
          status: "Scheduled",
          status: "",
        });
        setErrors({});
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };
  const patientOptions = patientList.map((patient) => ({
    value: patient.id,
    label: `${patient.firstName} ${patient.lastName}`,
    mobileNumber: patient.mobileNumber || "",
    civilIdNumber: patient.civilIdNumber || "",
    email: patient.email || "",
    age: patient.age || "",
  }));
  const customFilterOption = (option, inputValue) => {
    const searchValue = inputValue.toLowerCase();
    return (
      option.data.label.toLowerCase().includes(searchValue) ||
      option.data.mobileNumber.toLowerCase().includes(searchValue) ||
      option.data.civilIdNumber.toLowerCase().includes(searchValue) ||
      option.data.email.toLowerCase().includes(searchValue) ||
      option.data.age.toString().includes(searchValue)
    );
  };
  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="table-card patientCardHeader">
          <div className="tableHeader">
            <h5>
              <i
                className="fa fa-arrow-left"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/Admin/appointment2")}
              ></i>{" "}
              Add Appointment
            </h5>
          </div>
          <div className="row g-3 px-3 py-2 mb-3">
            <div className="col-lg-6">
              <label className="form-label">Patient</label>
              <Select
                classNamePrefix="react-select"
                className={` ${errors.patientId ? "is-invalid" : ""}`}
                name="patientId"
                options={patientOptions}
                value={
                  patientOptions.find(
                    (option) => option.value === formData.patientId
                  ) || null
                }
                getOptionLabel={(e) => e.label}
                getOptionValue={(e) => e.value}
                onChange={(selectedOption) =>
                  handleChange({
                    target: {
                      name: "patientId",
                      value: selectedOption ? selectedOption.value : "",
                    },
                  })
                }
                placeholder="Select Patient"
                isSearchable={true}
                filterOption={customFilterOption}
              />
              <div className="invalid-feedback">{errors.patientId}</div>
            </div>
            <div className="col-lg-6">
              <label className="form-label">Doctor</label>
              <select
                className={`form-select ${errors.doctorId ? "is-invalid" : ""}`}
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
              >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.fullName}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{errors.doctorId}</div>
            </div>
            <div className="col-lg-6">
              <label className="form-label">Appointment Date</label>
              <input
                type="date"
                className={`form-control ${errors.appointmentDate ? "is-invalid" : ""}`}
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.appointmentDate}</div>
            </div>
            <div className="col-lg-6">
              <label className="form-label">Appointment Type</label>
              <div className="d-flex align-items-center gap-3 mb-3">
                <label className="form-check-label d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    name="status"
                    value="Waiting"
                    onChange={handleChange}
                    checked={formData.status === "Waiting"}
                    style={{ cursor: "pointer" }}
                  />
                  Waiting
                </label>
                <label className="form-check-label d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    name="status"
                    value="Emergency"
                    onChange={handleChange}
                    checked={formData.status === "Emergency"}
                    style={{ cursor: "pointer" }}
                  />
                  Emergency
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Start Time</label>
              <input
                type="time"
                className={`form-control ${errors.startTime ? "is-invalid" : ""}`}
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.startTime}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">End Time</label>
              <input
                type="time"
                className={`form-control ${errors.endTime ? "is-invalid" : ""}`}
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.endTime}</div>
            </div>
            <div className="col-lg-12">
              <label className="form-label">Notes</label>
              <input
                type="text"
                placeholder="Enter Notes"
                className={`form-control ${errors.reason ? "is-invalid" : ""}`}
                name="reason"
                value={formData.reason}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.reason}</div>
            </div>
            <div className="text-center">
              <button className="cancelBtn me-2" onClick={() => navigate(-1)}>Cancel</button>
              <button className="bgBtn" onClick={handleSubmit}>
                Add 
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default AddAppointment;
