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
      const response = await axios.post(
        `${baseurl}appointmentByDoctorId/${location.state.data}`
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
                      <th>Name</th>
                      <th>doctorName </th>
                      <th>Date</th>
                      <th>Status</th>
                      {/* <th>Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {dataAppointment && dataAppointment.length > 0 ? (
                      dataAppointment.map((item, index) => {
                        return (
                          <>
                            <tr key={index}>
                              {/* <td>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0"><img src="../assets/images/user/avatar-1.jpg" alt="user image" className="img-radius wid-40" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Airi Satou</h6>
                    </div>
                  </div>
                </td> */}
                              <td>{item.patientName}</td>
                              <td>{item.doctorName}</td>
                              <td>
                                {new Date(
                                  item.appointmentDate
                                ).toLocaleDateString("en-GB")}
                              </td>
                              <td>{item.status}</td>
                              {/* <td>
                                <a
                                  href="#"
                                  className="avtar avtar-xs btn-link-secondary"
                                >
                                  <i className="ti ti-eye f-20" />{" "}
                                </a>
                                <a
                                  href="#"
                                  className="avtar avtar-xs btn-link-secondary"
                                >
                                  <i className="ti ti-edit f-20" />{" "}
                                </a>
                                <a
                                  href="#"
                                  className="avtar avtar-xs btn-link-secondary"
                                >
                                  <i className="ti ti-trash f-20" />
                                </a>
                              </td> */}
                            </tr>
                          </>
                        );
                      })
                    ) : (
                     <td className="">
                        No Data Found
                     </td>
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
