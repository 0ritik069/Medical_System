// // // // // import React from 'react'

// // // // // export default function Calander() {
// // // // //   return (
// // // // //     <div>
// // // // //       calander 
// // // // //     </div>
// // // // //   )
// // // // // }
// // // // import React, { useState, useEffect } from 'react';
// // // // // import './Calendar.css'; // Custom CSS for styling

// // // // const Calander = () => {
// // // //   const today = new Date();
// // // //   const [currentDate, setCurrentDate] = useState(today);

// // // //   const getMonthDays = (year, month) => {
// // // //     const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
// // // //     const daysInMonth = new Date(year, month + 1, 0).getDate();

// // // //     const dates = [];
// // // //     for (let i = 0; i < firstDay; i++) {
// // // //       dates.push(null); // Empty slots for previous month
// // // //     }
// // // //     for (let i = 1; i <= daysInMonth; i++) {
// // // //       dates.push(i);
// // // //     }
// // // //     return dates;
// // // //   };

// // // //   const monthNames = [
// // // //     'January', 'February', 'March', 'April', 'May', 'June',
// // // //     'July', 'August', 'September', 'October', 'November', 'December'
// // // //   ];

// // // //   const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// // // //   const dates = getMonthDays(currentDate.getFullYear(), currentDate.getMonth());

// // // //   return (
// // // //     <div className="calendar">
// // // //       <h2>
// // // //         {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
// // // //       </h2>

// // // //       <div className="calendar-grid">
// // // //         {days.map(day => (
// // // //           <div className="day-name" key={day}>{day}</div>
// // // //         ))}

// // // //         {dates.map((date, index) => {
// // // //           const isToday =
// // // //             date === today.getDate() &&
// // // //             currentDate.getMonth() === today.getMonth() &&
// // // //             currentDate.getFullYear() === today.getFullYear();

// // // //           return (
// // // //             <div
// // // //               key={index}
// // // //               className={`calendar-day ${isToday ? 'today' : ''}`}
// // // //             >
// // // //               {date || ''}
// // // //             </div>
// // // //           );
// // // //         })}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Calander;

// // // import React from 'react';
// // // import 'bootstrap/dist/css/bootstrap.min.css';

// // // const Calander = () => {
// // //   const appointments = [
// // //     {
// // //       time: "09:00 AM",
// // //       doctor: "Dr. Singh",
// // //       service: "Consultation"
// // //     },
// // //     {
// // //       time: "10:30 AM",
// // //       doctor: "Dr. Sharma",
// // //       service: "Eye Check-up"
// // //     },
// // //     {
// // //       time: "11:15 AM",
// // //       doctor: "Dr. Patel",
// // //       service: "Skin Therapy"
// // //     },
// // //     {
// // //       time: "01:00 PM",
// // //       doctor: "Dr. Mehta",
// // //       service: "General Check-up"
// // //     }
// // //   ];

// // //   return (
// // //     <div className="container mt-5">
// // //       <h2 className="mb-4 text-center">Today's Appointments</h2>
// // //       <table className="table table-striped table-bordered text-center">
// // //         <thead className="table-dark">
// // //           <tr>
// // //             <th>Time</th>
// // //             <th>Doctor</th>
// // //             <th>Service</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {appointments.map((appt, index) => (
// // //             <tr key={index}>
// // //               <td>{appt.time}</td>
// // //               <td>{appt.doctor}</td>
// // //               <td>{appt.service}</td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // };

// // // export default Calander;
// // import React from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// // const Calander = () => {
// //   const timeSlots = [
// //     "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
// //     "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
// //     "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM"
// //   ];

// //   const appointments = [
// //     {
// //       time: "09:00 AM",
// //       doctor: "Dr. Singh",
// //       service: "Consultation"
// //     },
// //     {
// //       time: "10:00 AM",
// //       doctor: "Dr. Sharma",
// //       service: "Eye Check-up"
// //     },
// //     {
// //       time: "11:00 AM",
// //       doctor: "Dr. Patel",
// //       service: "Skin Therapy"
// //     }
// //   ];

// //   // Helper to get note for a specific time slot
// //   const getAppointmentAtTime = (time) => {
// //     return appointments.find((appt) => appt.time === time);
// //   };

// //   return (
// //     <div className="container mt-5">
// //       <h3 className="mb-4 text-center">Doctor Appointment Calendar View</h3>
// //       <div className="row">
// //         <div className="col-md-12 border">
// //           {timeSlots.map((slot, index) => {
// //             const appointment = getAppointmentAtTime(slot);

// //             return (
// //               <div key={index} className="d-flex border-bottom p-2 align-items-center" style={{ height: '60px' }}>
// //                 <div style={{ width: '100px', fontWeight: 'bold' }}>{slot}</div>
// //                 <div className="flex-grow-1 ps-3">
// //                   {appointment ? (
// //                     <div className="p-2 bg-success text-white rounded">
// //                       {appointment.doctor} - {appointment.service}
// //                     </div>
// //                   ) : (
// //                     <div className="text-muted">No appointment</div>
// //                   )}
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Calander;
// // import React from 'react';
// // // import './CalendarGrid.css'; // custom styles
// // // import 'bootstrap/dist/css/bootstrap.min.css';

// // const Calander = () => {
// //   const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// //   const hours = Array.from({ length: 12 }, (_, i) => `${7 + i} ${7 + i < 12 ? 'AM' : 'PM'}`);

// //   const appointments = [
// //     {
// //       day: 'Mon',
// //       time: '9 AM',
// //       doctor: 'Dr. Tushar',
// //       service: 'Dental Check-up'
// //     },
// //     {
// //       day: 'Wed',
// //       time: '11 AM',
// //       doctor: 'Dr. Sharma',
// //       service: 'Eye Test'
// //     },
// //     {
// //       day: 'Fri',
// //       time: '2 PM',
// //       doctor: 'Dr. Patel',
// //       service: 'Skin Therapy'
// //     }
// //   ];

// //   const getAppointment = (day, hour) => {
// //     return appointments.find(app => app.day === day && app.time === hour);
// //   };

// //   return (
// //     <div className="container mt-4">
// //       <h4 className="mb-4 text-center">Weekly Appointment Calendar</h4>
// //       <div className="calendar-grid">
// //         <div className="calendar-row header">
// //           <div className="time-cell"></div>
// //           {days.map((day, i) => (
// //             <div className="day-header" key={i}>{day}</div>
// //           ))}
// //         </div>

// //         {hours.map((hour, i) => (
// //           <div className="calendar-row" key={i}>
// //             <div className="time-cell">{hour}</div>
// //             {days.map((day, j) => {
// //               const appointment = getAppointment(day, hour);
// //               return (
// //                 <div className="calendar-cell" key={j}>
// //                   {appointment && (
// //                     <div className="appointment">
// //                       <strong>{appointment.doctor}</strong><br />
// //                       <small>{appointment.service}</small>
// //                     </div>
// //                   )}
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Calander;
// import React from 'react';

// const Calander = () => {
//   const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   const hours = Array.from({ length: 12 }, (_, i) => `${7 + i} ${7 + i < 12 ? 'AM' : 'PM'}`);

//   const appointments = [
//     {
//       day: 'Mon',
//       startTime: '9 AM',
//       endTime: '11.59 AM',
//       doctor: 'Dr. Tushar',
//       service: 'Dental Check-up'
//     },
//     {
//       day: 'Wed',
//       startTime: '11 AM',
//       endTime: '1 PM',
//       doctor: 'Dr. Sharma',
//       service: 'Eye Test'
//     },
//     {
//       day: 'Fri',
//       startTime: '2 PM',
//       endTime: '4 PM',
//       doctor: 'Dr. Patel',
//       service: 'Skin Therapy'
//     }
//   ];

//   // Convert "9 AM" -> 9, "2 PM" -> 14
//   const convertTo24Hour = (timeStr) => {
//     const [hour, period] = timeStr.split(' ');
//     let h = parseInt(hour, 10);
//     if (period === 'PM' && h !== 12) h += 12;
//     if (period === 'AM' && h === 12) h = 0;
//     return h;
//   };

//   const isWithinAppointment = (day, hourLabel) => {
//     const hour24 = convertTo24Hour(hourLabel);
//     return appointments.find(app => {
//       if (app.day !== day) return false;
//       const start = convertTo24Hour(app.startTime);
//       const end = convertTo24Hour(app.endTime);
//       return hour24 >= start && hour24 < end;
//     });
//   };

//   return (
//     <div className="container mt-4">
//       <h4 className="mb-4 text-center">Weekly Appointment Calendar</h4>
//       <div className="calendar-grid">
//         <div className="calendar-row header">
//           <div className="time-cell"></div>
//           {days.map((day, i) => (
//             <div className="day-header" key={i}>{day}</div>
//           ))}
//         </div>

//         {hours.map((hour, i) => (
//           <div className="calendar-row" key={i}>
//             <div className="time-cell">{hour}</div>
//             {days.map((day, j) => {
//               const appointment = isWithinAppointment(day, hour);
//               return (
//                 <div
//                   className={`calendar-cell ${appointment ? 'highlight' : ''}`}
//                   key={j}
//                 >
//                   {/* Render content only at the start time */}
//                   {appointment && convertTo24Hour(appointment.startTime) === convertTo24Hour(hour) && (
//                     <div className="appointment">
//                       <strong>{appointment.doctor}</strong><br />
//                       <small>{appointment.service}</small>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </div>

//       {/* Add styles here or use an external CSS file */}
//       <style>{`
//         .calendar-grid {
//           display: flex;
//           flex-direction: column;
//         }
//         .calendar-row {
//           display: flex;
//         }
//         .day-header, .calendar-cell, .time-cell {
//           border: 1px solid #ccc;
//           padding: 8px;
//           flex: 1;
//           min-width: 100px;
//           min-height: 60px;
//           text-align: center;
//         }
//         .time-cell {
//           background: #f0f0f0;
//           font-weight: bold;
//           width: 100px;
//         }
//         .highlight {
//           background-color: #d0f0ff;
//         }
//         .appointment {
//           font-size: 12px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Calander;
// import React from 'react';

// const Calander = () => {
//   const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   const hours = Array.from({ length: 12 }, (_, i) => 7 + i); // 7 to 18 (7 AM to 6 PM)

//   const appointments = [
//     {
//       day: 'Mon',
//       startTime: '9 AM',
//       endTime: '11 AM',
//       doctor: 'Dr. Tushar',
//       service: 'Dental Check-up'
//     },
//     {
//       day: 'Wed',
//       startTime: '11 AM',
//       endTime: '1 PM',
//       doctor: 'Dr. Sharma',
//       service: 'Eye Test'
//     },
//     {
//       day: 'Fri',
//       startTime: '2 PM',
//       endTime: '4 PM',
//       doctor: 'Dr. Patel',
//       service: 'Skin Therapy'
//     }
//   ];

//   const convertTo24Hour = (timeStr) => {
//     const [hour, period] = timeStr.split(' ');
//     let h = parseInt(hour, 10);
//     if (period === 'PM' && h !== 12) h += 12;
//     if (period === 'AM' && h === 12) h = 0;
//     return h;
//   };

//   const getDayIndex = (day) => days.indexOf(day);

//   return (
//     <div className="calendar-container">
//       <h4 className="mb-3 text-center">Weekly Appointment Calendar</h4>
//       <div className="calendar-grid">
//         {/* Header Row */}
//         <div className="time-cell header-cell"></div>
//         {days.map((day, i) => (
//           <div key={i} className="day-header header-cell">{day}</div>
//         ))}

//         {/* Time + Empty Grid */}
//         {hours.map((hour, rowIdx) => (
//           <React.Fragment key={rowIdx}>
//             <div className="time-cell">{`${hour > 12 ? hour - 12 : hour} ${hour >= 12 ? 'PM' : 'AM'}`}</div>
//             {days.map((_, colIdx) => (
//               <div key={`${rowIdx}-${colIdx}`} className="calendar-cell"></div>
//             ))}
//           </React.Fragment>
//         ))}

//         {/* Appointments */}
//         {appointments.map((app, index) => {
//           const rowStart = convertTo24Hour(app.startTime) - 7 + 2; // +2 to skip header row + time column
//           const rowEnd = convertTo24Hour(app.endTime) - 7 + 2;
//           const rowSpan = rowEnd - rowStart;
//           const colStart = getDayIndex(app.day) + 2;

//           return (
//             <div
//               key={index}
//               className="appointment-block"
//               style={{
//                 gridRow: `${rowStart} / span ${rowSpan}`,
//                 gridColumn: `${colStart}`,
//               }}
//             >
//               <strong>{app.doctor}</strong><br />
//               <small>{app.service}</small>
//             </div>
//           );
//         })}
//       </div>

//       {/* Styles */}
//       <style>{`
//         .calendar-container {
//           max-width: 1000px;
//           margin: auto;
//         }

//         .calendar-grid {
//           display: grid;
//           grid-template-columns: 100px repeat(7, 1fr);
//           grid-auto-rows: 60px;
//           border: 1px solid #ccc;
//           position: relative;
//         }

//         .header-cell {
//           background: #f0f0f0;
//           font-weight: bold;
//           text-align: center;
//           padding: 8px;
//           border: 1px solid #ccc;
//         }

//         .time-cell {
//           border: 1px solid #ccc;
//           text-align: center;
//           padding: 8px;
//         }

//         .day-header {
//           border: 1px solid #ccc;
//           text-align: center;
//           padding: 8px;
//         }

//         .calendar-cell {
//           border: 1px solid #ccc;
//         }

//         .appointment-block {
//           background-color: #add8e6;
//           padding: 8px;
//           border-radius: 4px;
//           z-index: 1;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.2);
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Calander;
import React from 'react';

const Calander = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({ length: 12 }, (_, i) => 7 + i); // 7 AM to 6 PM

  const appointments = [
    {
      day: 'Mon',
      startTime: '9 AM',
      endTime: '11 AM',
      doctor: 'Dr. Tushar',
      service: 'Dental Check-up',
    },
    {
      day: 'Sun',
      startTime: '11 AM',
      endTime: '1 PM',
      doctor: 'Dr. Sharma',
      service: 'Eye Test',
    },
    {
      day: 'Fri',
      startTime: '2 PM',
      endTime: '4 PM',
      doctor: 'Dr. Patel',
      service: 'Skin Therapy',
    },
  ];

  const convertTo24Hour = (timeStr) => {
    const [hour, period] = timeStr.split(' ');
    let h = parseInt(hour, 10);
    if (period === 'PM' && h !== 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    return h;
  };

  const getDayIndex = (day) => days.indexOf(day);

  return (
    <div className="calendar-container">
      <h4 className="mb-3 text-center">Weekly Appointment Calendar</h4>
      <div className="calendar-grid">
        {/* Header Row */}
        <div className="header-cell time-cell"></div>
        {days.map((day, i) => (
          <div key={i} className="header-cell day-header">{day}</div>
        ))}

        {/* Time Labels and Empty Cells */}
        {hours.map((hour, rowIdx) => (
          <React.Fragment key={rowIdx}>
            {/* Time Label */}
            <div
              className="time-cell"
              style={{ gridRow: rowIdx + 2, gridColumn: 1 }}
            >
              {`${hour > 12 ? hour - 12 : hour} ${hour >= 12 ? 'PM' : 'AM'}`}
            </div>
            {/* Empty Day Cells */}
            {days.map((_, colIdx) => (
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

        {/* Appointment Blocks */}
        {appointments.map((app, index) => {
          const rowStart = convertTo24Hour(app.startTime) - 7 + 2; // 7 AM is row 2
          const rowEnd = convertTo24Hour(app.endTime) - 7 + 2;
          const rowSpan = rowEnd - rowStart;
          const colStart = getDayIndex(app.day) + 2; // Sunday is col 2

          return (
            <div
              key={index}
              className="appointment-block"
              style={{
                gridRow: `${rowStart} / span ${rowSpan}`,
                gridColumn: `${colStart}`,
              }}
            >
              <strong>{app.doctor}</strong><br />
              <small>{app.service}</small>
            </div>
          );
        })}
      </div>

      {/* CSS */}
      <style>{`
        .calendar-container {
          max-width: 1000px;
          margin: auto;
          padding: 20px;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: 100px repeat(7, 1fr);
          grid-auto-rows: 60px;
          border: 1px solid #ccc;
          position: relative;
        }

        .header-cell {
          background: #f0f0f0;
          font-weight: bold;
          text-align: center;
          padding: 8px;
          border: 1px solid #ccc;
        }

        .time-cell {
          border: 1px solid #ccc;
          text-align: center;
          padding: 8px;
          background-color: #fafafa;
        }

        .day-header {
          border: 1px solid #ccc;
          text-align: center;
          padding: 8px;
        }

        .calendar-cell {
          border: 1px solid #ccc;
        }

        .appointment-block {
          background-color: #add8e6;
          padding: 8px;
          border-radius: 4px;
          z-index: 1;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Calander;
