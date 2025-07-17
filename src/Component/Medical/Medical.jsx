// // import axios from "axios";
// // import React, { useEffect, useState } from "react";
// // import { baseurl } from "../../Baseurl";
// // import { toast, ToastContainer } from "react-toastify";
// // import dayjs from "dayjs";
// // export default function Medical() {
// //   const [modalopen, setModalOpen] = useState(false);
// //   const [waitngData, setWaitngData] = useState([]);
// //   const [showModalDoctor, setShowModalDoctor] = useState(false);
// //   const [appointmentpatiemt, setAppointmentPatient] = useState([]);
// //   const [showdata, setShowdata] = useState(false);
// //   const [eid, setEid] = useState("");
// //   const [doctorsdata, setDoctorsdata] = useState([]);
// //   const [datamodalappointment, setDatamodalappointment] = useState("");
// //   const [doctors, setDoctors] = useState("");
// //   const [appointmentdata, setAppointmentdata] = useState([]);

// //   const handleclose = () => {
// //     setModalOpen(false);
// //     waitingAppointmentList1();
// //   };
// //   useEffect(() => {
// //     waitingAppointmentList1();
// //   }, []);
// //   useEffect(() => {
// //     fetchDoctors();
// //   }, []);
// //   const waitingAppointmentList1 = async () => {
// //     try {
// //       const response = await axios.get(`${baseurl}getWaitingAppointments`);
// //       if (response.data.success === true) {
// //         setWaitngData(response.data.data);
// //       } else {
// //         console.log("some thing went wrong");
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };
// //   useEffect(() => {
// //     getdata();
// //   }, []);
// //   const getdata = async () => {
// //     try {
// //       const response = await axios.get(`${baseurl}getAllAppointments`);
// //       if (response.data.success === true) {
// //         setAppointmentdata(response.data.data);
// //       } else {
// //         console.log("somenthing went wrng");
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };
// //   useEffect(() => {
// //     getallActiveDoctor();
// //   }, []);
// //   const getallActiveDoctor = async () => {
// //     const response = await axios.get(`${baseurl}getActiveDoctors`);
// //     setDoctorsdata(response.data.data);
// //   };

// //   const handleclickchange = () => {
// //     setShowdata(false);
// //   };
// //   const handleclickchange11 = () => {
// //     setShowdata(true);
// //   };
// //   const hours = Array.from({ length: 12 }, (_, i) => i + 12); // 7 AM to 6 PM
// //   const convertToHourFromTimeString = (timeStr) => {
// //     if (!timeStr) return 0;
// //     const [hour, minute, second] = timeStr.split(":").map(Number);
// //     return hour; // Returns 24-hour format
// //   };
// //   const getUniqueDoctors = (appointments) => {
// //     const doctorSet = new Set();
// //     appointments.forEach((app) =>
// //       doctorSet.add(app.doctorName?.trim().toLowerCase())
// //     );
// //     return Array.from(doctorSet);
// //   };
// //   const getCalendarData = async () => {
// //     try {
// //       const response = await axios.get(`${baseurl}getConfirmedAppointments`);
// //       if (response.data.success === true) {
// //         console.log(response);
// //         setAppointmentPatient(response.data.data);
// //       } else {
// //         console.log("Something went wrong");
// //       }
// //     } catch (error) {
// //       console.log(error?.response?.data?.message || error.message);
// //     }
// //   };
// //   useEffect(() => {
// //     getCalendarData();
// //   }, []);
// //   const [value, setValue] = React.useState(dayjs("2022-04-17T15:30"));
// //   const doctorNames = getUniqueDoctors(appointmentpatiemt);
// //   // pratima
// //   const [showCalendarModal, setShowCalendarModal] = useState(false);

// //   const Openmodalfunction = (app) => {
// //     console.log(true, app);
// //     setShowCalendarModal(true);
// //     setDatamodalappointment(app);
// //   };
// //   const handleclose111 = () => {
// //     setShowModalDoctor(false);
// //   };
// //   const fetchDoctors = async () => {
// //     try {
// //       const response = await axios.get(`${baseurl}getActiveDoctors`);
// //       if (response.data.success) {
// //         setDoctors(response.data.data);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching doctors:", error);
// //     }
// //   };

// //   return (
// //     <div className="pc-container">
// //       <div className="pc-content">
// //         <div className="col-12">
// //           <div className="d-flex justify-content-between">
// //             <h5 className="mainTitle">Appointments</h5>
// //             <div
// //               className="d-flex justify-content-end calenderListIcon"
// //               style={{ marginBottom: "25px" }}
// //             >
// //               <div
// //                 className="me-3"
// //                 style={{ cursor: "pointer" }}
// //                 onClick={handleclickchange}
// //               >
// //                 <i class="fa fa-calendar fs-4" aria-hidden="true"></i>
// //               </div>
// //               <div style={{ cursor: "pointer" }} onClick={handleclickchange11}>
// //                 <i class="fa fa-list fs-4" aria-hidden="true"></i>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="patientCardHeaderd">
// //             <div
// //               className="tableHeader py-2"
// //               style={{
// //                 border: "1px solid #d2d2d2",
// //                 background: "#fff",
// //                 borderRadius: "8px 8px 0px 0px",
// //                 borderBottom: "unset",
// //               }}
// //             ></div>

// //             {showdata ? (
// //               ""
// //             ) : (
// //               <div className="calendar-container">
// //                 <div className="calendar-grid">
// //                   <div className="header-cell time-cell"></div>
// //                   {doctorNames.map((doc, i) => (
// //                     <div key={i} className="header-cell day-header">
// //                       {doc}
// //                     </div>
// //                   ))}
// //                   {hours.map((hour, rowIdx) => (
// //                     <React.Fragment key={rowIdx}>
// //                       <div
// //                         className="time-cell"
// //                         style={{ gridRow: rowIdx + 2, gridColumn: 1 }}
// //                       >
// //                         {`${hour > 12 ? hour - 12 : hour} ${
// //                           hour >= 12 ? "PM" : "AM"
// //                         }`}
// //                       </div>

// //                       {/* Empty Cells */}
// //                       {doctorNames.map((_, colIdx) => (
// //                         <div
// //                           key={`${rowIdx}-${colIdx}`}
// //                           className="calendar-cell"
// //                           style={{
// //                             gridRow: rowIdx + 2,
// //                             gridColumn: colIdx + 2,
// //                           }}
// //                         />
// //                       ))}
// //                     </React.Fragment>
// //                   ))}

// //                   {appointmentpatiemt.map((app, index) => {
// //                     console.log(app);
// //                     const doctorIndex = doctorNames.findIndex(
// //                       (doc) =>
// //                         doc?.trim().toLowerCase() ===
// //                         app.doctorName?.trim().toLowerCase()
// //                     );
// //                     console.log(`Rendering appointment ${index}:`, {
// //                       doctor: app.doctorName,
// //                       patient: app.patientName,
// //                       reason: app.reason,
// //                       startTime: app.startTime,
// //                       endTime: app.endTime,
// //                       doctorIndex,
// //                     });
// //                     if (doctorIndex === -1) return null;
// //                     const rowStart =
// //                       convertToHourFromTimeString(app.startTime) - 7 + 2;
// //                     const rowEnd =
// //                       convertToHourFromTimeString(app.endTime) - 7 + 2;
// //                     const rowSpan = rowEnd - rowStart;
// //                     if (rowStart < 2 || rowSpan <= 0) return null;
// //                     return (
// //                       <div
// //                         onClick={() => {
// //                           Openmodalfunction(app); 
// //                         }}
// //                         key={index}
// //                         className={
// //                           app.status === "Confirmed"
// //                             ? "appointment-block"
// //                             : "appointment-block1"
// //                         }
// //                         style={{
// //                           gridRow: `${rowStart} / span ${rowSpan}`,
// //                           gridColumn: `${doctorIndex + 2}`,
// //                         }}
// //                       >
// //                         <strong>{app.patientName}</strong>
// //                         <br />
// //                         <small>{app.reason}</small>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //                 <style>
// //                   {`
// //              .calendar-container {
// //                 }
// //                 .calendar-grid {
// //             display: grid;
// //             grid-template-columns: 100px repeat(${doctorNames.length}, 1fr);
// //       grid-auto-rows: 60px;
// //             }
// //     .header-cell, .time-cell, .calendar-cell {
// //               border: 1px solid #ccc;
// //       text-align: center;
// //               padding: 8px;
// //     }
// //             .header-cell {
// //     background: rgb(248 249 250);
// //             font-weight: bold;
// //         }`}
// //                 </style>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //       <ToastContainer />
// //     </div>
// //   );
// // }
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { baseurl } from "../../Baseurl";
// import { toast, ToastContainer } from "react-toastify";
// import dayjs from "dayjs";

// export default function Medical() {
//   const [modalopen, setModalOpen] = useState(false);
//   const [waitngData, setWaitngData] = useState([]);
//   const [showModalDoctor, setShowModalDoctor] = useState(false);
//   const [appointmentpatiemt, setAppointmentPatient] = useState([]);
//   const [showdata, setShowdata] = useState(false);
//   const [eid, setEid] = useState("");
//   const [doctorsdata, setDoctorsdata] = useState([]);
//   const [datamodalappointment, setDatamodalappointment] = useState("");
//   const [doctors, setDoctors] = useState("");
//   const [appointmentdata, setAppointmentdata] = useState([]);
//   const [showCalendarModal, setShowCalendarModal] = useState(false);
//   const [value, setValue] = React.useState(dayjs("2022-04-17T15:30"));

//   const handleclose = () => {
//     setModalOpen(false);
//     waitingAppointmentList1();
//   };

//   useEffect(() => {
//     waitingAppointmentList1();
//     getdata();
//     getallActiveDoctor();
//     fetchDoctors();
//     getCalendarData();
//   }, []);

//   const waitingAppointmentList1 = async () => {
//     try {
//       const response = await axios.get(`${baseurl}getWaitingAppointments`);
//       if (response.data.success === true) {
//         setWaitngData(response.data.data);
//       } else {
//         console.log("some thing went wrong");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getdata = async () => {
//     try {
//       const response = await axios.get(`${baseurl}getAllAppointments`);
//       if (response.data.success === true) {
//         setAppointmentdata(response.data.data);
//       } else {
//         console.log("somenthing went wrng");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getallActiveDoctor = async () => {
//     const response = await axios.get(`${baseurl}getActiveDoctors`);
//     setDoctorsdata(response.data.data);
//   };

//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get(`${baseurl}getActiveDoctors`);
//       if (response.data.success) {
//         setDoctors(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     }
//   };

//   const getCalendarData = async () => {
//     try {
//       const response = await axios.get(`${baseurl}getConfirmedAppointments`);
//       if (response.data.success === true) {
//         setAppointmentPatient(response.data.data);
//       } else {
//         console.log("Something went wrong");
//       }
//     } catch (error) {
//       console.log(error?.response?.data?.message || error.message);
//     }
//   };

//   const handleclickchange = () => {
//     setShowdata(false);
//   };

//   const handleclickchange11 = () => {
//     setShowdata(true);
//   };

//   const convertToHourFromTimeString = (timeStr) => {
//     if (!timeStr) return null;
//     const [hour, minute] = timeStr.split(":").map(Number);
//     return { hour, minute };
//   };

//   const getUniqueDoctors = (appointments) => {
//     const doctorSet = new Set();
//     appointments.forEach((app) =>
//       doctorSet.add(app.doctorName?.trim().toLowerCase())
//     );
//     return Array.from(doctorSet);
//   };

//   const Openmodalfunction = (app) => {
//     setShowCalendarModal(true);
//     setDatamodalappointment(app);
//   };

//   const doctorNames = getUniqueDoctors(appointmentpatiemt);
//   const hours = Array.from({ length: 12 }, (_, i) => i + 7); // 7 AM to 6 PM

//   return (
//     <div className="pc-container">
//       <div className="pc-content">
//         <div className="col-12">
//           <div className="d-flex justify-content-between">
//             <h5 className="mainTitle">Appointments</h5>
//             <div
//               className="d-flex justify-content-end calenderListIcon"
//               style={{ marginBottom: "25px" }}
//             >
//               <div
//                 className="me-3"
//                 style={{ cursor: "pointer" }}
//                 onClick={handleclickchange}
//               >
//                 <i className="fa fa-calendar fs-4" aria-hidden="true"></i>
//               </div>
//               <div style={{ cursor: "pointer" }} onClick={handleclickchange11}>
//                 <i className="fa fa-list fs-4" aria-hidden="true"></i>
//               </div>
//             </div>
//           </div>

//           <div className="patientCardHeaderd">
//             <div
//               className="tableHeader py-2"
//               style={{
//                 border: "1px solid #d2d2d2",
//                 background: "#fff",
//                 borderRadius: "8px 8px 0px 0px",
//                 borderBottom: "unset",
//               }}
//             ></div>

//             {!showdata && (
//               <div className="calendar-container">
//                 <div className="calendar-grid">
//                   <div className="header-cell time-cell"></div>
//                   {doctorNames.map((doc, i) => (
//                     <div key={i} className="header-cell day-header">
//                       {doc}
//                     </div>
//                   ))}

//                   {hours.map((hour, rowIdx) => (
//                     <React.Fragment key={rowIdx}>
//                       <div
//                         className="time-cell"
//                         style={{ gridRow: rowIdx + 2, gridColumn: 1 }}
//                       >
//                         {`${hour > 12 ? hour - 12 : hour} ${
//                           hour >= 12 ? "PM" : "AM"
//                         }`}
//                       </div>
//                       {doctorNames.map((_, colIdx) => (
//                         <div
//                           key={`${rowIdx}-${colIdx}`}
//                           className="calendar-cell"
//                           style={{
//                             gridRow: rowIdx + 2,
//                             gridColumn: colIdx + 2,
//                           }}
//                         />
//                       ))}
//                     </React.Fragment>
//                   ))}

//                   {appointmentpatiemt.map((app, index) => {
//                     const doctorIndex = doctorNames.findIndex(
//                       (doc) =>
//                         doc?.trim().toLowerCase() ===
//                         app.doctorName?.trim().toLowerCase()
//                     );
//                     if (doctorIndex === -1) return null;

//                     const start = convertToHourFromTimeString(app.startTime);
//                     const end = convertToHourFromTimeString(app.endTime);
//                     if (!start || !end) return null;

//                     const rowStart = start.hour - 7 + 2;
//                     let rowEnd = end.hour - 7 + 2;

//                     let rowSpan = rowEnd - rowStart;
//                     if (rowSpan <= 0) rowSpan = 1;

//                     if (rowStart < 2 || rowStart > 13) return null;

//                     return (
//                       <div
//                         key={index}
//                         onClick={() => Openmodalfunction(app)}
//                         className={
//                           app.status === "Confirmed"
//                             ? "appointment-block"
//                             : "appointment-block1"
//                         }
//                         style={{
//                           gridRow: `${rowStart} / span ${rowSpan}`,
//                           gridColumn: `${doctorIndex + 2}`,
//                         }}
//                       >
//                         <strong>{app.patientName}</strong>
//                         <br />
//                         <small>{app.reason}</small>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 <style>
//                   {`
//                   .calendar-grid {
//                     display: grid;
//                     grid-template-columns: 100px repeat(${doctorNames.length}, 1fr);
//                     grid-auto-rows: 60px;
//                   }
//                   .header-cell, .time-cell, .calendar-cell {
//                     border: 1px solid #ccc;
//                     text-align: center;
//                     padding: 8px;
//                   }
//                   .header-cell {
//                     background: rgb(248 249 250);
//                     font-weight: bold;
//                   }
//                   .appointment-block {
//                     background-color: #4caf50;
//                     color: white;
//                     padding: 5px;
//                     border-radius: 5px;
//                     cursor: pointer;
//                   }
//                   .appointment-block1 {
//                     background-color: #ffc107;
//                     color: #000;
//                     padding: 5px;
//                     border-radius: 5px;
//                     cursor: pointer;
//                   }
//                 `}
//                 </style>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseurl } from "../../Baseurl";
import { toast, ToastContainer } from "react-toastify";
import dayjs from "dayjs";

export default function Medical() {
  const [modalopen, setModalOpen] = useState(false);
  const [waitngData, setWaitngData] = useState([]);
  const [showModalDoctor, setShowModalDoctor] = useState(false);
  const [appointmentpatiemt, setAppointmentPatient] = useState([]);
  const [showdata, setShowdata] = useState(false);
  const [eid, setEid] = useState("");
  const [doctorsdata, setDoctorsdata] = useState([]);
  const [datamodalappointment, setDatamodalappointment] = useState("");
  const [doctors, setDoctors] = useState("");
  const [appointmentdata, setAppointmentdata] = useState([]);

  const handleclose = () => {
    setModalOpen(false);
    waitingAppointmentList1();
  };

  useEffect(() => {
    waitingAppointmentList1();
    fetchDoctors();
    getdata();
    getallActiveDoctor();
    getCalendarData();
  }, []);

  const waitingAppointmentList1 = async () => {
    try {
      const response = await axios.get(`${baseurl}getWaitingAppointments`);
      if (response.data.success === true) {
        setWaitngData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getdata = async () => {
    try {
      const response = await axios.get(`${baseurl}getAllAppointments`);
      if (response.data.success === true) {
        setAppointmentdata(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getallActiveDoctor = async () => {
    const response = await axios.get(`${baseurl}getActiveDoctors`);
    setDoctorsdata(response.data.data);
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

  const handleclickchange = () => setShowdata(false);
  const handleclickchange11 = () => setShowdata(true);

  // Hours from 12 PM to 12 AM (24-hour format)
  const hours = Array.from({ length: 12 }, (_, i) => i + 12); // 12 to 23

  const convertToHourFromTimeString = (timeStr) => {
    if (!timeStr) return 0;
    const [hour] = timeStr.split(":").map(Number);
    return hour;
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
        setAppointmentPatient(response.data.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
    }
  };

  const Openmodalfunction = (app) => {
    setShowCalendarModal(true);
    setDatamodalappointment(app);
  };

  const handleclose111 = () => {
    setShowModalDoctor(false);
  };

  const [value, setValue] = React.useState(dayjs("2022-04-17T15:30"));
  const doctorNames = getUniqueDoctors(appointmentpatiemt);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <h5 className="mainTitle">Appointments</h5>
            <div className="d-flex justify-content-end calenderListIcon" style={{ marginBottom: "25px" }}>
              <div className="me-3" style={{ cursor: "pointer" }} onClick={handleclickchange}>
                <i className="fa fa-calendar fs-4" aria-hidden="true"></i>
              </div>
              <div style={{ cursor: "pointer" }} onClick={handleclickchange11}>
                <i className="fa fa-list fs-4" aria-hidden="true"></i>
              </div>
            </div>
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
                  {hours.map((hour, rowIdx) => (
                    <React.Fragment key={rowIdx}>
                      <div
                        className="time-cell"
                        style={{ gridRow: rowIdx + 2, gridColumn: 1 }}
                      >
                        {`${hour > 12 ? hour - 12 : hour} ${
                          hour >= 12 ? "PM" : "AM"
                        }`}
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
                    const doctorIndex = doctorNames.findIndex(
                      (doc) =>
                        doc?.trim().toLowerCase() ===
                        app.doctorName?.trim().toLowerCase()
                    );
                    if (doctorIndex === -1) return null;

                    const startHour = convertToHourFromTimeString(app.startTime);
                    const endHour = convertToHourFromTimeString(app.endTime);

                    if (startHour < 12 || endHour > 23 || endHour <= startHour)
                      return null;

                    const rowStart = startHour - 12 + 2;
                    const rowEnd = endHour - 12 + 2;
                    const rowSpan = rowEnd - rowStart;

                    return (
                      <div
                        onClick={() => Openmodalfunction(app)}
                        key={index}
                        className={
                          app.status === "Confirmed"
                            ? "appointment-block"
                            : "appointment-block1"
                        }
                        style={{
                          gridRow: `${rowStart} / span ${rowSpan}`,
                          gridColumn: `${doctorIndex + 2}`,
                        }}
                      >
                        <strong>{app.patientName}</strong>
                        <br />
                        <small>{app.reason}</small>
                      </div>
                    );
                  })}
                </div>
                <style>
                  {`
                    .calendar-grid {
                      display: grid;
                      grid-template-columns: 100px repeat(${doctorNames.length}, 1fr);
                      grid-auto-rows: 60px;
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
      </div>
      <ToastContainer />
    </div>
  );
}
