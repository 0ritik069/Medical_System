import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseurl } from "../../../Baseurl";

export default function DoctorBooking() {
  const location = useLocation();
  const [dataAppointment, setDataAppointment] = useState([]);
  console.log(location.state);
  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    try {
      const response = await axios.get(
        `${baseurl}getAppointmentsByDoctorId/${location.state.data}`
      );
      if (response.data.success == true) {
        setDataAppointment(response.data.data);
      } else {
        console.log("somethk");
      }
    } catch {
      console.log("console.log");
    }
  };
  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="col-12">
          <div className="card table-card">
            <div className="card-header">
              <div className="d-sm-flex align-items-center justify-content-between">
                <h5 className="mb-3 mb-sm-0">Doctor Appointment List</h5>
                {/* <div><a href="../admins/course-teacher-apply.html" className="btn btn-outline-secondary">Apply Teacher List</a> <a href="../admins/course-teacher-add.html" className="btn btn-primary">Add Teacher</a></div> */}
              </div>
            </div>
            <div className="card-body pt-3">
              <div className="table-responsive">
                <table className="table table-hover" id="pc-dt-simple">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Doctor Name</th>
                      <th>Date</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Reason</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataAppointment && dataAppointment.length > 0 ? (
                      dataAppointment.map((item, index) => {
                        return (
                          <>
                            <tr key={index}>
                              <td>{item.patientName}</td>
                              <td>{item.doctorName}</td>
                              <td>
                                {new Date(
                                  item.appointmentDate
                                ).toLocaleDateString("en-GB")}
                              </td>
                              <td>{item.startTime}</td>
                              <td>{item.endTime}</td>
                              <td>{item.reason}</td>
                              <td>
                                <span className={`badge ${
                                  item.status === 'Confirmed' ? 'bg-success' : 
                                  item.status === 'Completed' ? 'bg-primary' : 
                                  item.status === 'Pending' ? 'bg-warning' : 'bg-secondary'
                                }`}>
                                  {item.status}
                                </span>
                              </td>
                            </tr>
                          </>
                        );
                      })
                    ) : (
                     <tr>
                        <td colSpan="7" className="text-center">
                          No Data Found
                        </td>
                     </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
