import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../../../Baseurl";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const AddAppointment = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    startTime: "",
    endTime: "",
    reason: "",
    status: "Scheduled",
    apptype: "",
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
    if (!formData.apptype) newErrors.apptype = "Appointment type is required";
    if (formData.apptype === "Emergency") {
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
        } else if (diffInHours > 2) {
          newErrors.endTime = "Appointment can't be more than 2 hours";
        }
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
      const response = await axios.post(
        `${baseurl}createAppointment`,
        formData
      );
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
          apptype: "",
        });
        setErrors({});
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
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
              <select
                className={`form-select ${
                  errors.patientId ? "is-invalid" : ""
                }`}
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
              >
                <option value="">Select Patient</option>
                {patientList.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.firstName} {patient.lastName}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{errors.patientId}</div>
            </div>
            {formData.apptype === "Emergency" && (
              <div className="col-lg-6">
                <label className="form-label">Doctor</label>
                <select
                  className={`form-select ${
                    errors.doctorId ? "is-invalid" : ""
                  }`}
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
            )}
            <div className="col-lg-6">
              <label className="form-label">Appointment Date</label>
              <input
                type="date"
                className={`form-control ${
                  errors.appointmentDate ? "is-invalid" : ""
                }`}
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.appointmentDate}</div>
            </div>
            <div className="col-lg-6">
              <label className="form-label">Appointment Type</label>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="form-check">
                  <input
                    type="radio"
                    id="waiting"
                    name="apptype"
                    value="Waiting"
                    onChange={handleChange}
                    className="form-check-input"
                    checked={formData.apptype === "Waiting"}
                  />
                  <label htmlFor="waiting" className="form-check-label">
                    Waiting
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    id="emergency"
                    name="apptype"
                    value="Emergency"
                    onChange={handleChange}
                    className="form-check-input"
                    checked={formData.apptype === "Emergency"}
                  />
                  <label htmlFor="emergency" className="form-check-label">
                    Emergency
                  </label>
                </div>
              </div>
              {errors.apptype && (
                <div className="text-danger mb-3">{errors.apptype}</div>
              )}
            </div>
            {formData.apptype === "Emergency" && (
              <>
                <div className="col-md-6">
                  <label className="form-label">Start Time</label>
                  <input
                    type="time"
                    min="12:00"
                    max="23:59"
                    className={`form-control ${
                      errors.startTime ? "is-invalid" : ""
                    }`}
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
                    min="12:00"
                    max="23:59"
                    className={`form-control ${
                      errors.endTime ? "is-invalid" : ""
                    }`}
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.endTime}</div>
                </div>
              </>
            )}
            <div className="col-lg-12">
              <label className="form-label">Reason</label>
              <input
                type="text"
                className={`form-control ${errors.reason ? "is-invalid" : ""}`}
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Enter Reason"
              />
              <div className="invalid-feedback">{errors.reason}</div>
            </div>
            <div className="text-center">
              <button className="bgBtn" onClick={handleSubmit}>
                Add Appointment
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
