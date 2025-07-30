import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../Baseurl";
import { toast, ToastContainer } from "react-toastify";
import patient from "../../../src/assests/profile.jpg";
import DatePicker from "react-multi-date-picker";
import dayjs from "dayjs";
import AnalogClock from "../../Component/Appointment2/AnalogClock";
import Swal from "sweetalert2";
export default function Appointment2() {
  const [modalopen, setModalOpen] = useState(false);
  const [waitngData, setWaitngData] = useState([]);
  const [openmodal, setOpenmodal] = useState(false);
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [arrayuser, setArrayuser] = useState([]);
  const [showModalDoctor, setShowModalDoctor] = useState(false);
  const [showModaledit, setShowModaledit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [appointmentpatiemt, setAppointmentPatient] = useState([]);
  const [appointmentdata1, setAppointmentdata1] = useState({});
  const [showdata, setShowdata] = useState(false);
  const [eid, setEid] = useState("");
  const [doctorsdata, setDoctorsdata] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [dataConfirm, setDataConfirm] = useState("");
  const [datamodalappointment, setDatamodalappointment] = useState("");
  const [doctors, setDoctors] = useState("");
  const [appointmentdata, setAppointmentdata] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const handleclickmodal = () => {
    setModalOpen(true);
  };
  const handleclose = () => {
    setModalOpen(false);
    waitingAppointmentList1();
  };
  useEffect(() => {
    waitingAppointmentList1();
  }, []);
  useEffect(() => {
    fetchDoctors();
  }, []);
  const waitingAppointmentList1 = async () => {
    try {
      const response = await axios.get(`${baseurl}getWaitingAppointments`);
      if (response.data.success === true) {
        setWaitngData(response.data.data);
      } else {
        console.log("some thing went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    try {
      const response = await axios.get(`${baseurl}getAllAppointments`);
      if (response.data.success === true) {
        setAppointmentdata(response.data.data);
      } else {
        console.log("somenthing went wrng");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleclick = (id) => {
    setEid(id);
    setOpenmodal(true);
  };
  const handleclose22 = () => {
    setOpenmodal(false);
  };
  useEffect(() => {
    getallActiveDoctor();
  }, []);
  const getallActiveDoctor = async () => {
    const response = await axios.get(`${baseurl}getActiveDoctors`);
    setDoctorsdata(response.data.data);
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setDataConfirm({ ...dataConfirm, [name]: value });
  };
  const handlechange11 = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setSelectedDoctors((prevSelected) => {
      let updated;
      if (checked) {
        updated = [...prevSelected, value];
      } else {
        updated = prevSelected.filter((id) => id !== value);
      }
      setSelectAll(updated.length === doctors.length);
      setArrayuser(updated);
      return updated;
    });
  };
  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    if (checked) {
      const allDoctorIds = doctors.map((doc) => String(doc.id));
      setSelectedDoctors(allDoctorIds);
      setArrayuser(allDoctorIds);
    } else {
      setSelectedDoctors([]);
      setArrayuser([]);
    }
  };
  const setFunction = async () => {
    try {
      const response = await axios.post(`${baseurl}appointmentByDoctorId`, {
        doctorIds: arrayuser,
      });
      if (response.data.success === true) {
        handleclose111();
        setAppointmentPatient(response.data.data);
        setAppointmentdata(response.data.data);
      } else {
        console.log("something went wriong");
      }
    } catch (error) {
      console.log("Full error object:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      Swal.fire("Error", errorMessage, "error");
    }
  };
  const BookingConfirm = async () => {
    const start = new Date(`2020-01-01T${dataConfirm.startTime}`);
    const end = new Date(`2020-01-01T${dataConfirm.endTime}`);
    const startHour = start.getHours();
    const endHour = end.getHours();
    const startMin = start.getMinutes();
    const endMin = end.getMinutes();
    if (startHour < 12 || startHour > 23) {
      toast.error("Start time must be between 12:00 PM and 11:59 PM");
      return;
    }
    if (
      endHour < 12 ||
      endHour > 23 ||
      (endHour === 23 && endMin === 59 && startHour === 23 && startMin > endMin)
    ) {
      toast.error("End time must be between 12:00 PM and 11:59 PM");
      return;
    }
    if (end <= start) {
      toast.error("End time must be after start time");
      return;
    }
    const diffInMs = end - start;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    if (diffInHours > 2) {
      toast.error("Appointment can't be more than 2 hours");
      return;
    }
    const datapost = {
      doctorId: dataConfirm.doctorId,
      startTime: dataConfirm.startTime,
      endTime: dataConfirm.endTime,
    };
    try {
      const response = await axios.post(
        `${baseurl}bookingAppointment/${eid}`,
        datapost
      );
      if (response.data.success === true) {
        Swal.fire("Success!!", "Appointment added successfully.", "success");
        handleclose22();
        getCalendarData();
        handleclose();
        waitingAppointmentList1();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handlechangeDropdownData = (e, id) => {
    const { value } = e.target;
    uctioncall(value, id);
  };
  const uctioncall = async (value, id) => {
    const datapost = {
      status: value,
    };
    try {
      const response = await axios.post(
        `${baseurl}changeAppointmentStatus/${id}`,
        datapost
      );
      if (response.data.success === true) {
        getdata();
        console.log(response.data);
        toast.success(response.data.message);
      } else {
        console.log("aPi error");
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };
  const handledelet = async (id) => {
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
        await axios.delete(`${baseurl}deleteAppointments/${id}`);
        Swal.fire("Deleted!", "appointment has been deleted.", "success");
        getdata();
        waitingAppointmentList1();
      } catch (error) {
        Swal.fire("Error!", "Something went wrong while deleting.", "error");
      }
    }
  };
  const handleclickchange = () => {
    setShowdata(false);
  };
  const handleclickchange11 = () => {
    setShowdata(true);
  };
  const hours = Array.from({ length: 12 }, (_, i) => i + 12); // 7 AM to 6 PM
  const convertToHourFromTimeString = (timeStr) => {
    if (!timeStr) return 0;
    const [hour, minute, second] = timeStr.split(":").map(Number);
    return hour; // Returns 24-hour format
  };

  const getUniqueDoctors = (appointments) => {
    const doctorSet = new Set();
    appointments.forEach((app) =>
      doctorSet.add(app.doctorName?.trim().toLowerCase())
    );
    return Array.from(doctorSet);
  };
  const getCalendarData = async () => {
    try {
      const response = await axios.get(`${baseurl}getConfirmedAppointments`);
      if (response.data.success === true) {
        console.log(response);
        setAppointmentPatient(response.data.data);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    getCalendarData();
  }, []);
  const doctorNames = getUniqueDoctors(appointmentpatiemt);
  // pratima
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const Openmodalfunction = (app) => {
    console.log(true, app);
    setShowCalendarModal(true);
    setDatamodalappointment(app);
  };
  const closeCalendarModal = () => {
    setShowCalendarModal(false);
  };
  const filteredData = waitngData?.filter((item) =>
    item?.patientName?.toLowerCase().includes(searchText)
  );
  const timeSlots = Array.from({ length: 48 }, (_, index) => {
    const hour = Math.floor(index / 2);
    const minute = index % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });

  const getRowIndex = (time) => {
    if (!time) return 0;
    const [hourStr, minuteStr] = time.split(":");
    const hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);
    return hour * 2 + (minute >= 30 ? 1 : 0);
  };

  // const getCalendarData = async () => {
  //   try {
  //     const response = await axios.get(`${baseurl}getConfirmedAppointments`);
  //     if (response.data.success === true) {
  //       setAppointmentPatient(response.data.data);
  //     }
  //   } catch (error) {
  //     console.log(error?.response?.data?.message || error.message);
  //   }
  // };
  // end pratima
  // const hadlechangeByDate = async (e) => {
  //   try {
  //     const response = await axios.post(
  //       `${baseurl}getAppointmentsByDate?date=${e.target.value}`
  //     );
  //     if (response.data.success === true) {
  //       setAppointmentPatient(response.data.data);
  //       // getdata()
  //     } else {
  //       Swal.fire("error!!","Data not Found", "error");
  //     }
  //   } catch (error) {
  //     Swal.fire("error!!", error.response.data.error, "error");
  //   }
  // };
  // const hadlechangeByDate = async (e) => {
  //   const selectedDate = e.target.value;
  //   try {
  //     const response = await axios.post(
  //       `${baseurl}getAppointmentsByDate?date=${selectedDate}`
  //     );
  //     console.log(response);
  //     if (response.status === 205) {
  //       toast.error( "Data not found");
  //       setAppointmentPatient([]);
  //     } else {
  //       if (response.data.success === true) {
  //         setAppointmentPatient(response.data.data);
  //         setAppointmentdata(response.data.data);
  //         // Optional: getdata();
  //       } else {
  //         Swal.fire("Error!", "Data not found", "error");
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error.response.data);
  //     Swal.fire(
  //       "Error!",
  //       error?.response?.data?.message || "Something went wrong",
  //       "error"
  //     );
  //   }
  // };
  const handleMultiDateFilter = async () => {
    const formattedDates = selectedDates.map((date) =>
      date.format("YYYY-MM-DD")
    );
    console.log("Selected Dates:", formattedDates);
    try {
      const response = await axios.post(`${baseurl}getAppointmentsByDate`, {
        dates: formattedDates, // Send as array in body
      });

      if (response.data.success) {
        setAppointmentPatient(response.data.data);
        setAppointmentdata(response.data.data);
      } else {
        toast.error("No data found");
        setAppointmentPatient([]);
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error!", error.message, "error");
    }
  };
  const handleclickcancleapoointment = async (item) => {
    console.log("Cancelling appointment:", item);
    try {
      const response = await axios.put(
        `${baseurl}cancelAppointmentStatus/${item.id}`
      );
      if (response.data.success === true) {
        console.log("Appointment cancelled:", response);
        // getCalendarData();
        getCalendarData();
        setShowCalendarModal(false);
        Swal.fire("Success", "Appointment cancelled successfully", "success");
      } else {
        console.log("Cancellation failed:", response.data);
        Swal.fire(
          "Error",
          response.data.message || "Cancellation failed",
          "error"
        );
      }
    } catch (error) {
      console.log("Something went wrong:", error);
      Swal.fire("Error", "Something went wrong while cancelling", "error");
    }
  };
  const handlelcicktoopen = () => {
    setShowModalDoctor(true);
  };
  const handleclose111 = () => {
    setShowModalDoctor(false);
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
  const handleclick11111111 = (item) => {
    console.log(item);
    navigate("/Admin/viewappointment", { state: { data: item } });
  };

  //   const handleupdateconfirm =async(item)=>{
  // console.log(item)
  // const response = await axios.post(`${baseurl}changeAppointmentStatus/${item.id}`,{
  //     "status" : "Completed"
  // }
  //  )

  //  if(response.data.success===true){
  //   console.log(response.data.data)
  //  }else{
  //   console.log("something went wrong")
  //  }

  //   }
  const handleupdateconfirm = async (item) => {
    try {
      console.log("Updating appointment:", item);

      const response = await axios.post(
        `${baseurl}changeAppointmentStatus/${item.id}`,
        {
          status: "Confirmed",
        }
      );

      if (response.data.success === true) {
        console.log("Update successful:", response.data.data);
        closeCalendarModal();
        getCalendarData();
        Swal.fire("success", "Appointment Confirmed", "success");
      } else {
        console.log(
          "Something went wrong:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error while updating appointment status:", error.message);
    }
  };

  const handledopencllick = (item) => {
    closeCalendarModal();
    console.log("Editing appointment:", item);
    setAppointmentdata1(item);
    setShowModaledit(true);
  };
  const handleclose111dff = () => {
    setShowModaledit(false);
  };
  const handleChange23 = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setAppointmentdata1({ ...appointmentdata1, [name]: value });
  };

  const updateappointment = async () => {
    const obj = {
      appointmentDate: appointmentdata1.appointmentDate,
      startTime: appointmentdata1.startTime,
      endTime: appointmentdata1.endTime,
    };
    try {
      const response = await axios.put(
        `${baseurl}editAppointment/${appointmentdata1.id}`,
        obj
      );
      if (response.data.success === true) {
        handleclose111dff();
        getCalendarData();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const filteredPatients = appointmentdata.filter(
    (item) =>
      `${item.doctorName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.duration?.toString().includes(searchTerm) ||
      item.mobileNumber?.toString().includes(searchTerm) ||
      (item.appointmentDate &&
        new Date(item.appointmentDate)
          .toLocaleDateString("en-GB")
          .includes(searchTerm))
  );
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <h5 className="mainTitle">Appointments</h5>
          </div>
          <div className="patientCardHeaderd">
            <div
              className="tableHeader py-2"
              style={{
                border: "1px solid #d2d2d2",
                background: "#fff",
                borderRadius: "8px 8px 0px 0px",
                borderBottom: "unset",
              }}
            >
              <div className="d-flex flex-wrap justify-content-between calenderClock align-items-center">
                <div className="d-flex align-items-center start flex-wrap">
                  <div>
                    <button
                      className="bgBtn me-2 "
                      onClick={() => {
                        navigate("/Admin/Addappointment");
                      }}
                    >
                      New Appointment
                    </button>
                    <button
                      className="waitingBtn me-2"
                      onClick={handleclickmodal}
                    >
                      Waiting
                    </button>
                    <button className="borderBtn">Online Booking </button>
                  </div>
                </div>
                <div className="parentWatch">
                  <AnalogClock />
                </div>
                <div>
                  <div className="d-flex ">
                    <div className="d-flex justify-content-end calenderListIcon ">
                      <div className="filterDoc text-end mb-2">
                        <i
                          class="ti ti-adjustments-horizontal"
                          onClick={handlelcicktoopen}
                          style={{ cursor: "pointer" }}
                        ></i>
                        <i class="ti ti-printer"></i>
                      </div>
                      <div
                        className="me-2 listTableIcon"
                        style={{ cursor: "pointer" }}
                        onClick={handleclickchange}
                      >
                        <i class="fa fa-calendar" aria-hidden="true"></i>
                      </div>
                      <div
                        className="me-2 listTableIcon"
                        style={{ cursor: "pointer" }}
                        onClick={handleclickchange11}
                      >
                        <i class="fa fa-list" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div className="position-relative">
                      <DatePicker
                        multiple
                        value={selectedDates}
                        onChange={setSelectedDates}
                        format="YYYY-MM-DD"
                        placeholder="Select Dates"
                        inputClass="form-control py-2"
                        className="custom-calendar-style"
                      />
                      <i
                        className="fa fa-calendar position-absolute"
                        style={{
                          right: "10px",
                          top: "20px",
                          transform: "translateY(-50%)",
                          color: "#888",
                        }}
                      />
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          handleMultiDateFilter();
                        }}
                        className="btn btn-primary ms-1"
                      >
                        <span className="fa fa-search"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showModaledit && (
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
                      <h5 className="modal-title">Edit Appointment</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={handleclose111dff}
                      ></button>
                    </div>
                    <div className="modal-body appointmentDetails">
                      <div className="row g-3 px-3 py-2 mb-3">
                        <div className="col-lg-6">
                          <label className="form-label">Doctor</label>
                          <select
                            className={`form-select`}
                            name="doctorId"
                            value={appointmentdata1.doctorId}
                            onChange={handleChange23}
                          >
                            <option value="">Select Doctor</option>
                            {doctors.map((doctor) => (
                              <option key={doctor.id} value={doctor.id}>
                                {doctor.fullName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-lg-6">
                          <label className="form-label">Appointment Date</label>
                          {/* <input
                type="date"
                className={`form-control ${
                  errors.appointmentDate ? "is-invalid" : ""
                }`}
                name="appointmentDate"
                value={appointmentdata.appointmentDate}
                onChange={handleChange}
              /> */}
                          <input
                            type="date"
                            name="appointmentDate"
                            className={`form-control `}
                            onChange={handleChange23}
                            value={
                              appointmentdata1.appointmentDate
                                ? new Date(appointmentdata1.appointmentDate)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Start Time</label>
                          <input
                            type="time"
                            className={`form-control `}
                            name="startTime"
                            value={appointmentdata1.startTime}
                            onChange={handleChange23}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">End Time</label>
                          <input
                            type="time"
                            className={`form-control`}
                            name="endTime"
                            value={appointmentdata1.endTime}
                            onChange={handleChange23}
                          />
                        </div>
                        <div className="col-lg-6">
                          <label className="form-label">Appointment Type</label>
                          <div className="d-flex align-items-center gap-3 mb-3">
                            <label
                              className="form-check-label d-flex align-items-center gap-2"
                              style={{ cursor: "pointer" }}
                            >
                              <input
                                type="radio"
                                name="apptype"
                                style={{ cursor: "pointer" }}
                                value="Waiting"
                                onChange={handleChange23}
                                checked={appointmentdata1.apptype === "Waiting"}
                              />
                              Waiting
                            </label>

                            <label
                              className="form-check-label d-flex align-items-center gap-2"
                              style={{ cursor: "pointer" }}
                            >
                              <input
                                type="radio"
                                name="apptype"
                                style={{ cursor: "pointer" }}
                                value="Emergency"
                                onChange={handleChange23}
                                checked={
                                  appointmentdata1.apptype === "Emergency"
                                }
                              />
                              Emergency
                            </label>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <label className="form-label">Notes</label>
                          <input
                            type="text"
                            placeholder="Enter Notes"
                            className={`form-control`}
                            name="reason"
                            value={appointmentdata1.reason}
                            onChange={handleChange23}
                          />
                        </div>
                        <div className="text-center">
                          {/* <button className="bgBtn" onClick={()=>{handleclickddappointment()}}>
                                        Add Appointment
                                      </button> */}
                        </div>
                      </div>
                    </div>
                    <siv className="d-flex justify-content-center">
                      <button
                        className=" my-3 bgBtn"
                        onClick={() => {
                          updateappointment();
                        }}
                      >
                        Update Appointment
                      </button>
                    </siv>
                  </div>
                </div>
              </div>
            )}
            {showModalDoctor && (
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
                      <h5 className="modal-title">Filter By Doctor</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={handleclose111}
                      ></button>
                    </div>
                    {/* <div className="modal-body appointmentDetails">
                      <div className="row">
                        {doctors && doctors.length > 0 ? (
                          doctors.map((item, index) => (
                            <div className="col-md-4 mb-3" key={index}>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  style={{ cursor: "pointer" }}
                                  id={`doctor-${item.id}`}
                                  value={item.id}
                                  name="doctorIds"
                                  onChange={handlechange11}
                                />
                                <label
                                  className="form-check-label ms-2"
                                  htmlFor={`doctor-${item.id}`}
                                >
                                  {item.fullName}
                                </label>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-12">
                            <p>No doctors available</p>
                          </div>
                        )}
                      </div>
                    </div> */}
                    <div className="modal-body appointmentDetails">
                      <div className="row">
                        {doctors && doctors.length > 0 ? (
                          <>
                            <div className="col-12 mb-3">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  id="selectAllDoctors"
                                  className="form-check-input bg-secondary"
                                  checked={selectAll}
                                  onChange={handleSelectAll}
                                  style={{ cursor: "pointer" }}
                                />
                                <label
                                  className="form-check-label ms-2"
                                  htmlFor="selectAllDoctors"
                                >
                                  Select All Doctors
                                </label>
                              </div>
                            </div>
                            {doctors.map((item, index) => (
                              <div className="col-md-4 mb-3" key={index}>
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    id={`doctor-${item.id}`}
                                    value={item.id}
                                    name="doctorIds"
                                    style={{ cursor: "pointer" }}
                                    checked={selectedDoctors.includes(
                                      String(item.id)
                                    )}
                                    onChange={handlechange11}
                                  />
                                  <label
                                    className="form-check-label ms-2  bg-blue-important"
                                    htmlFor={`doctor-${item.id}`}
                                  >
                                    {item.fullName}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className="col-12">
                            <p>No doctors available</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <siv className="d-flex justify-content-center">
                      <button
                        className=" my-3 bgBtn"
                        onClick={() => {
                          setFunction();
                        }}
                      >
                        Filter{" "}
                      </button>
                    </siv>
                  </div>
                </div>
              </div>
            )}
            {showdata ? (
              <div className="card-body tableAppoint">
                <div className="calenderTableSea">
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
                </div>
                <div className="table-responsive">
                  <table className="table table-hover" id="pc-dt-simple">
                    <thead>
                      <tr>
                        <th>Appointment Date</th>
                        <th>Doctor</th>
                        <th>Patient</th>
                        <th>Reason</th>
                        <th>Time</th>
                        <th>Duration</th>
                        <th>Phone Number</th>
                        <th>Type</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients && filteredPatients.length > 0 ? (
                        filteredPatients.map((item, index) => {
                          console.log(item);
                          return (
                            <tr key={index}>
                              <td className="mb-0">
                                {new Date(
                                  item.appointmentDate
                                ).toLocaleDateString("en-GB")}
                              </td>
                              <td>{item.doctorName}</td>
                              <td>{item.patientName}</td>
                              <td>{item.reason}</td>
                              <td>
                                {item.startTime} {"/"} {item.endTime}
                              </td>
                              <td>{item?.duration}</td>
                              <td>{item.mobileNumber}</td>
                              <td>
                                <select
                                  onChange={(e) => {
                                    handlechangeDropdownData(e, item.id);
                                  }}
                                  name="status"
                                  value={item.status}
                                >
                                  <option value="">Select</option>
                                  <option value="No-show">No-show</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">Cancelled</option>
                                  <option value="Booked">Booked</option>
                                  <option value="Waiting">Waiting</option>
                                  <option value="Confirmed">Confirmed</option>
                                </select>
                              </td>
                              <td className="text-center">
                                <div
                                  className="avtar avtar-xs btn-link-secondary viewIcon"
                                  onClick={() => {
                                    handleclick11111111(item);
                                  }}
                                >
                                  <i className="ti ti-eye f-20" />
                                  <span>View</span>
                                </div>
                                <div
                                  onClick={() => {
                                    handledopencllick(item);
                                  }}
                                  className="avtar avtar-xs btn-link-secondary editIcon"
                                >
                                  <i className="ti ti-edit f-20" />
                                  <span>Edit</span>
                                </div>
                                <div
                                  onClick={() => {
                                    handledelet(item.id);
                                  }}
                                  className="avtar avtar-xs btn-link-secondary deleteIcon"
                                >
                                  <i className="ti ti-trash f-20" />
                                  <span>Delete</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center text-muted">
                            No Data Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="card-body tableAppoint">
                <div className="patientCardHeaderd">
                  <div
                    className="tableHeader py-2"
                    style={{
                      border: "1px solid #d2d2d2",
                      background: "#fff",

                      borderBottom: "unset",
                    }}
                  ></div>
                  {!showdata && (
                    <div className="calendar-container">
                      <div className="calendar-grid">
                        <div className="header-cell time-cell"></div>

                        {doctorNames.map((doc, i) => (
                          <div key={i} className="header-cell day-header">
                            {doc}
                          </div>
                        ))}
                        {timeSlots.map((time, rowIdx) => (
                          <React.Fragment key={rowIdx}>
                            <div
                              className="time-cell"
                              style={{ gridRow: rowIdx + 2, gridColumn: 1 }}
                            >
                              {dayjs(`2023-01-01T${time}`).format("hh:mm A")}
                            </div>
                            {doctorNames.map((_, colIdx) => (
                              <div
                                key={`${rowIdx}-${colIdx}`}
                                className="calendar-cell"
                                style={{
                                  gridRow: rowIdx + 2,
                                  gridColumn: colIdx + 2,
                                }}
                              />
                            ))}
                          </React.Fragment>
                        ))}
                        {appointmentpatiemt.map((app, index) => {
                          console.log(app);
                          const doctorIndex = doctorNames.findIndex(
                            (doc) =>
                              doc?.trim().toLowerCase() ===
                              app.doctorName?.trim().toLowerCase()
                          );
                          if (doctorIndex === -1) return null;
                          const rowStart = getRowIndex(app.startTime) + 2;
                          const rowEnd = getRowIndex(app.endTime) + 2;
                          const rowSpan = rowEnd - rowStart;
                          if (rowSpan <= 0) return null;
                          return (
                            <div
                              onClick={() => Openmodalfunction(app)}
                              key={index}
                              // className={
                              //   app.status === "Confirmed"
                              //     ? "appointment-block"
                              //     : "appointment-block1"
                              // }
                              className={
                                app.status === "Cancelled"
                                  ? "appointment-block1"
                                  : app.status === "Booked"
                                  ? "appointment-block"
                                  : "appointment-block2"
                              }
                              style={{
                                gridRow: `${rowStart} / span ${rowSpan}`,
                                gridColumn: `${doctorIndex + 2}`,
                              }}
                            >
                              <strong>{app.patientName}</strong>
                              <br />
                              <small>{app.reason}</small>
                              <br />
                              <small>{app.status}</small>
                              <br />
                            </div>
                          );
                        })}
                      </div>
                      <style>
                        {`
                                        .calendar-grid {
                                          display: grid;
                                          grid-template-columns: 100px repeat(${doctorNames.length}, 1fr);
                                          grid-auto-rows: 40px;
                                        }
                                        .header-cell, .time-cell, .calendar-cell {
                                          border: 1px solid #ccc;
                                          text-align: center;
                                          padding: 8px;
                                        }
                                        .header-cell {
                                          background: rgb(248 249 250);
                                          font-weight: bold;
                                        }
                                      `}
                      </style>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {showCalendarModal && (
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
                  <h5 className="modal-title">Appointment Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeCalendarModal}
                  ></button>
                </div>
                <div className="modal-body appointmentDetails">
                  <div className="d-flex justify-content-between">
                    <div className="parentDetailApp">
                      <div className="appImg">
                        <img src={patient} alt="" />
                      </div>
                      <div>
                        <p>
                          <strong>Date :</strong>{" "}
                          {new Date(
                            datamodalappointment?.appointmentDate
                          ).toLocaleDateString("en-GB")}
                        </p>
                        <p>
                          <strong>Time :</strong>
                          {datamodalappointment.startTime}
                        </p>
                        <p>
                          {" "}
                          <strong>Duration :</strong>{" "}
                          {datamodalappointment?.duration}
                        </p>
                        <p>
                          {" "}
                          <strong>Doctor Name :</strong>{" "}
                          {datamodalappointment?.doctorName}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex iconTab">
                      <i
                        className="ti ti-edit f-20"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handledopencllick(datamodalappointment);
                        }}
                      ></i>
                      <i className="ti ti-bell"></i>
                      <i
                        class="ti ti-file"
                        onClick={() => {
                          handleclick11111111(datamodalappointment);
                        }}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </div>
                  </div>
                  <hr />
                  <div className="patientApp mt-4">
                    <p>
                      <strong>Patient Name : </strong>{" "}
                      {datamodalappointment?.patientName}
                    </p>
                    <p>
                      <strong>Age :</strong>
                      {datamodalappointment?.age}
                    </p>
                    <p>
                      <strong>Notes :</strong>
                      {datamodalappointment?.reason}
                    </p>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button
                      className="cancelBtn  me-2"
                      onClick={() => {
                        handleclickcancleapoointment(datamodalappointment);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="borderBtn me-2"
                      onClick={() => {
                        handleupdateconfirm(datamodalappointment);
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {modalopen && (
          <div
            className="modal fade show"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", display: "block" }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Waiting List</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleclose}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3 d-flex justify-content-end">
                    <input
                      className="searchInput"
                      placeholder="Search..."
                      value={searchText}
                      onChange={(e) =>
                        setSearchText(e.target.value.toLowerCase())
                      }
                    ></input>
                  </div>
                  <table class="table table-striped">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>File </th>
                          <th>Name</th>
                          <th>Date</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData && filteredData.length > 0 ? (
                          filteredData.map((item, index) => {
                            console.log(item);
                            return (
                              <>
                                <tr key={index}>
                                  <td scope="row">{index + 1}</td>
                                  <td>{item.patientName}</td>

                                  <td>
                                    {new Date(
                                      item.appointmentDate
                                    ).toLocaleDateString("en-GB")}
                                  </td>
                                  <td className="text-center">
                                    <div className="d-flex justify-content-center">
                                      <div
                                        className="blueBadg me-2"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          handleclick(item.id);
                                        }}
                                      >
                                        Book
                                      </div>
                                      <div
                                        className="dangerBadg"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          handledelet(item.id);
                                        }}
                                      >
                                        Cancel
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center text-muted">
                              No Data Found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        {openmodal && (
          <div
            className="modal fade show"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", display: "block" }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Booking</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleclose22}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">Start Time</label>
                      <input
                        type="time"
                        name="startTime"
                        min="12:00"
                        max="23:59"
                        onChange={handlechange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">End Time</label>
                      <input
                        type="time"
                        name="endTime"
                        min="12:00"
                        max="23:59"
                        onChange={handlechange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">Doctor </label>
                      <br />
                      <select
                        className="w-100 py-2 bg-light rounded"
                        name="doctorId"
                        onChange={handlechange}
                      >
                        <option>Select...</option>
                        {doctorsdata &&
                          doctorsdata.length > 0 &&
                          doctorsdata.map((item, index) => {
                            console.log(item);
                            return (
                              <>
                                <option key={index} value={item.id}>
                                  {item.fullName}
                                </option>
                              </>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  {/* </table> */}

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleclose22()}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={BookingConfirm}
                    >
                      Add Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
