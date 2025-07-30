// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { baseurl } from "../../Baseurl";
// import Swal from "sweetalert2";
// export default function Labs() {
//   const [hodalopen, setHodalopen] = useState(false);
//   const [formData, setFormData] = useState([]);
//   const [data, getData] = useState([]);
//   const openmodal = () => {
//     setHodalopen(true);
//   };
//   const handlecloseVital = () => {
//     setHodalopen(false);
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleapisubmit = () => {
//     try {
//       const response = axios.post(`${baseurl}addLabs`, formData);
//       if (response.data.success === true) {
//         handlecloseVital();
//         Swal.fire("success", "Lab Added Successfully", "Success");
//       } else {
//         Swal.fire("error", "Something went wrong", "error");
//       }
//     } catch (error) {
//       const err = error.response.data.message;
//       Swal.fire("error", err, "error");
//     }
//   };

//   useEffect(() => {
//     getDataset();
//   }, []);
//   const getDataset = () => {
//     try {
//       const response = axios.get(`${baseurl}getAllLabs`);
//       if (response.data.success === true) {
//         console.log(response.data.data);
//         getData(response.data.data);
//       } else {
//         Swal.fire("error", "some thing went worng", "error");
//       }
//     } catch (error) {
//         console.log(error)
//     //   const err = error.response.data.error;
//     //   Swal.fire("error", err, "error");
//     }
//   };
//   return (
//     <div className="pc-container">
//       <div className="pc-content">
//         <div className="d-flex justify-content-between">
//           <div></div>
//           <div>
//             <button
//               className="btn btn-primary mx-2 px-4 my-3"
//               onClick={openmodal}
//             >
//               Add Labs
//             </button>
//           </div>
//         </div>
//         <div class="container my-12">
//           <div className="col-12">
//             <div className="card table-card">
//               <div className="card-header">
//                 <div className="d-sm-flex align-items-center justify-content-between">
//                   <h5 className="mb-3 mb-sm-0">New Labs</h5>
//                 </div>
//               </div>
//               <div className="card-body pt-3">
//                 <div className="table-responsive">
//                   <table className="table table-hover" id="pc-dt-simple">
//                     <thead>
//                       <tr>
//                         <th>Name</th>
//                         <th>Departments</th>
//                         <th>Qualification</th>
//                         <th>Mobile</th>
//                         <th>Joining Date</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     {/* <tbody>
//                       {data &&
//                         data.length > 0 &&
//                         data.map((item, index) => {
//                           return (
//                             <>
//                               <tr key={index}>
//                                 <td>{item}</td>
//                                 <td>B.COM., M.COM.</td>
//                                 <td>(123) 4567 890</td>
//                                 <td>2023/09/12</td>
//                                 <td>
//                                   <a
//                                     href="#"
//                                     className="avtar avtar-xs btn-link-secondary"
//                                   >
//                                     <i className="ti ti-eye f-20" />{" "}
//                                   </a>
//                                   <a
//                                     href="#"
//                                     className="avtar avtar-xs btn-link-secondary"
//                                   >
//                                     <i className="ti ti-edit f-20" />{" "}
//                                   </a>
//                                   <a
//                                     href="#"
//                                     className="avtar avtar-xs btn-link-secondary"
//                                   >
//                                     <i className="ti ti-trash f-20" />
//                                   </a>
//                                 </td>
//                               </tr>
//                             </>
//                           );
//                         })}
//                     </tbody> */}
//                   </table>
//                 </div>
//                 {hodalopen && (
//                   <div
//                     className="modal fade show"
//                     style={{
//                       backgroundColor: "rgba(0,0,0,0.5)",
//                       display: "block",
//                     }}
//                   >
//                     <div
//                       className="modal-dialog modal-lg"
//                       style={{ height: "650px" }}
//                     >
//                       <div className="modal-content">
//                         <div className="modal-header">
//                           <h5 className="modal-title">Add Labs</h5>
//                           <button
//                             type="button"
//                             className="btn-close"
//                             onClick={handlecloseVital}
//                           ></button>
//                         </div>
//                         <div className="container mt-4">
//                           <div className="row">
//                             <div className="col-md-6 mb-3">
//                               <label className="form-label">Lab Name:</label>
//                               <input
//                                 type="text"
//                                 name="lab_name"
//                                 min={40}
//                                 max={200}
//                                 value={formData?.lab_name}
//                                 onChange={handleChange}
//                                 className="form-control"
//                               />
//                             </div>
//                             <div className="col-md-6 mb-3">
//                               <label className="form-label">Email:</label>
//                               <input
//                                 type="email"
//                                 name="email"
//                                 value={formData?.email}
//                                 onChange={handleChange}
//                                 min={20}
//                                 max={180}
//                                 // style={getColorStyle(
//                                 //   getColorCode("diastolic", formData.diastolic)
//                                 // )}
//                                 className="form-control"
//                               />
//                             </div>

//                             <div className="col-md-6 mb-3">
//                               <label className="form-label">Phone:</label>
//                               <input
//                                 type="number"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                                 className="form-control"
//                                 min="5"
//                                 max="50"
//                                 step="1"
//                                 // style={getColorStyle(
//                                 //   getColorCode(
//                                 //     "respiratoryRate",
//                                 //     formData.respiratoryRate
//                                 //   )
//                                 // )}
//                               />
//                             </div>
//                             <div className="col-md-6 mb-3">
//                               <label className="form-label">Address:</label>
//                               <input
//                                 type="text"
//                                 name="address"
//                                 value={formData.address}
//                                 onChange={handleChange}
//                                 className="form-control"
//                                 min="10"
//                                 max="400"
//                                 step="1"

//                                 // style={getColorStyle(
//                                 //   getColorCode("pulse", formData.pulse)
//                                 // )}
//                               />
//                             </div>

//                             <div className="col-md-6 mb-3">
//                               <label className="form-label">Speciality:</label>
//                               <input
//                                 type="text"
//                                 name="speciality"
//                                 value={formData.speciality}
//                                 onChange={handleChange}
//                                 className="form-control"
//                                 min="10"
//                                 max="60"
//                                 step="0.1"
//                                 // style={getColorStyle(
//                                 //   getColorCode(
//                                 //     "temperature",
//                                 //     formData.temperature
//                                 //   )
//                                 // )}
//                               />
//                             </div>

//                             <div className="col-md-6 mb-3">
//                               <label className="form-label">Notes:</label>
//                               <input
//                                 type="text"
//                                 name="notes"
//                                 value={formData.notes}
//                                 onChange={handleChange}
//                                 className="form-control"
//                                 min="0"
//                                 max="100"
//                                 step="1"
//                               />
//                             </div>
//                           </div>
//                           <div className="d-flex justify-content-center">
//                             <button
//                               type="submit"
//                               onClick={handleapisubmit}
//                               className="btn btn-primary my-3"
//                             >
//                               Add Vital
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { baseurl } from "../../Baseurl";
// import Swal from "sweetalert2";

// export default function Labs() {
//   const [hodalopen, setHodalopen] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [data, getData] = useState([]);

//   const openmodal = () => setHodalopen(true);
//   const handlecloseVital = () => setHodalopen(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleapisubmit = async () => {
//     try {
//       const response = await axios.post(`${baseurl}addLabs`, formData);
//       if (response.data.success === true) {
//         handlecloseVital();
//         Swal.fire("Success", "Lab Added Successfully", "success");
//         getDataset(); // refresh table
//       } else {
//         Swal.fire("Error", "Something went wrong", "error");
//       }
//     } catch (error) {
//       const err = error.response?.data?.message || "Unexpected error";
//       Swal.fire("Error", err, "error");
//     }
//   };

//   const getDataset = async () => {
//     try {
//       const response = await axios.get(`${baseurl}getAllLabs`);
//       if (response.data.success === true) {
//         getData(response.data.data);
//       } else {
//         Swal.fire("Error", "Something went wrong", "error");
//       }
//     } catch (error) {
//       console.log(error);
//       Swal.fire("Error", "Failed to fetch labs", "error");
//     }
//   };

//   const handleStatusChange = async (id, status) => {
//     try {
//       const response = await axios.put(`${baseurl}updateLabStatus`, {
//         id,
//         is_active: status,
//       });
//       if (response.data.success === true) {
//         Swal.fire("Success", "Status Updated", "success");
//         getDataset(); // refresh
//       } else {
//         Swal.fire("Error", "Failed to update status", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Something went wrong", "error");
//     }
//   };

//   useEffect(() => {
//     getDataset();
//   }, []);

//   const handleclick =(item)=>{
//         console.log(item)
//   }
//   return (
//     <div className="pc-container">
//       <div className="pc-content">
//         <div className="d-flex justify-content-end">
//           <button className="btn btn-primary mx-2 px-4 my-3" onClick={openmodal}>
//             Add Labs
//           </button>
//         </div>

//         <div className="container my-12">
//           <div className="col-12">
//             <div className="card table-card">
//               <div className="card-header">
//                 <h5 className="mb-3">New Labs</h5>
//               </div>
//               <div className="card-body pt-3">
//                 <div className="table-responsive">
//                   <table className="table table-hover">
//                     <thead>
//                       <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Phone</th>
//                         <th>Address</th>
//                         <th>Speciality</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {data.map((item, index) => (
//                         <tr key={index}>
//                           <td>{item.lab_name}</td>
//                           <td>{item.email}</td>
//                           <td>{item.phone_number	}</td>
//                           <td>{item.address}</td>
//                           <td>{item.speciality}</td>
//                           <td>
//                             <div className="form-check form-switch">
//                               <input
//                                 className="form-check-input custom-switch-info"
//                                 type="checkbox"
//                                 id={`toggle-${item.id}`}
//                                 checked={item.is_active === 1}
//                                 onChange={(e) =>
//                                   handleStatusChange(item.id, e.target.checked ? 1 : 0)
//                                 }
//                               />
//                               <label className="form-check-label ms-2" htmlFor={`toggle-${item.id}`}>
//                                 {item.is_active ? "Active" : "Inactive"}
//                               </label>
//                             </div>
//                           </td>
//                             <td>
//                                    <a
//                                      href="#"
//                                      className="avtar avtar-xs btn-link-secondary"
//                                    >
//                                      <i className="ti ti-eye f-20" />{" "}
//                                    </a>
//                                    <a
//                                      href="#"
//                                      className="avtar avtar-xs btn-link-secondary"
//                                    >
//                                      <i className="ti ti-edit f-20" />{" "}
//                                    </a>
//                                    <div
//                                         onClick={()=>{handleclick(item)}}
// className="avtar avtar-xs btn-link-secondary"
//                                    >
//                                      <i className="ti ti-trash f-20" />
//                                    </div>
//                                  </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 {hodalopen && (
//                   <div
//                     className="modal fade show"
//                     style={{ backgroundColor: "rgba(0,0,0,0.5)", display: "block" }}
//                   >
//                     <div className="modal-dialog modal-lg">
//                       <div className="modal-content">
//                         <div className="modal-header">
//                           <h5 className="modal-title">Add Labs</h5>
//                           <button type="button" className="btn-close" onClick={handlecloseVital}></button>
//                         </div>
//                         <div className="container mt-4">
//                           <div className="row">
//                             {[
//                               { label: "Lab Name", name: "lab_name", type: "text" },
//                               { label: "Email", name: "email", type: "email" },
//                               { label: "Phone", name: "phone", type: "number" },
//                               { label: "Address", name: "address", type: "text" },
//                               { label: "Speciality", name: "speciality", type: "text" },
//                               { label: "Notes", name: "notes", type: "text" },
//                             ].map((field, idx) => (
//                               <div className="col-md-6 mb-3" key={idx}>
//                                 <label className="form-label">{field.label}:</label>
//                                 <input
//                                   type={field.type}
//                                   name={field.name}
//                                   value={formData[field.name] || ""}
//                                   onChange={handleChange}
//                                   className="form-control"
//                                 />
//                               </div>
//                             ))}
//                           </div>

//                           <div className="d-flex justify-content-center">
//                             <button type="submit" onClick={handleapisubmit} className="btn btn-primary my-3">
//                               Add Lab
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import axios from "axios";
import { useEffect, useState } from "react";
import { baseurl } from "../../Baseurl";
import Swal from "sweetalert2";
export default function Labs() {
  const [hodalopen, setHodalopen] = useState(false);
  const [formData, setFormData] = useState({});
  const [data, getData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const openmodal = () => {
    setHodalopen(true);
    setFormData({});
    setEditMode(false);
  };
  const handlecloseVital = () => setHodalopen(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleapisubmit = async () => {
    try {
      if (editMode) {
        const response = await axios.put(`${baseurl}updateLabById/${formData.id}`, formData);
        if (response.data.success === true) {
          Swal.fire("Success", "Lab updated successfully", "success");
          getDataset();
          handlecloseVital();
        } else {
          Swal.fire("Error", "Failed to update lab", "error");
        }
      } else {
        const response = await axios.post(`${baseurl}addLabs`, formData);
        if (response.data.success === true) {
          Swal.fire("Success", "Lab added successfully", "success");
          getDataset();
          handlecloseVital();
        } else {
          Swal.fire("Error", "Something went wrong", "error");
        }
      }
    } catch (error) {
      const err = error.response?.data?.message || "Unexpected error";
      Swal.fire("Error", err, "error");
    }
  };
  useEffect(() => {
    getDataset();
  }, []);
  const getDataset = async () => {
    try {
      const response = await axios.get(`${baseurl}getAllLabs`);
      if (response.data.success === true) {
        getData(response.data.data);
      } else {
        Swal.fire("Error", "Something went wrong", "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to fetch labs", "error");
    }
  };
  const handleStatusChange = async (id, status) => {
    try {
      const response = await axios.put(`${baseurl}changeLabStatus/${id}`, {
        status: status,
      });
      if (response.data.success === true) {
        Swal.fire("Success", "Status Updated", "success");
        getDataset();
      } else {
        Swal.fire("Error", "Failed to update status", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };
  const handleEdit = (item) => {
    setFormData(item);
    setEditMode(true);
    setHodalopen(true);
  };
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the lab!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      try {
        const response = await axios.delete(`${baseurl}deleteLabById/${id}`);
        if (response.data.success === true) {
          Swal.fire("Deleted!", "Lab has been deleted.", "success");
          getDataset();
        } else {
          Swal.fire("Error", "Failed to delete lab", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Something went wrong", "error");
      }
    }
  };
  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary mx-2 px-4 my-3" onClick={openmodal}>
            Add Lab
          </button>
        </div>
        <div className="my-12">
          <div className="col-12">
            <div className="card table-card">
              <div className="card-header">
                <h5 className="mb-3">New Labs</h5>
              </div>
              <div className="card-body pt-3">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Speciality</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.lab_name}</td>
                          <td>{item.email}</td>
                          <td>{item.phone_number}</td>
                          <td>{item.address}</td>
                          <td>{item.speciality}</td>
                          <td>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input custom-switch-info"
                                type="checkbox"
                                id={`toggle-${item.id}`}
                                checked={item.is_active === 1}
                                onChange={(e) =>
                                  handleStatusChange(item.id, e.target.checked ? 1 : 0)
                                }
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor={`toggle-${item.id}`}
                              >
                                {item.is_active ? "Active" : "Inactive"}
                              </label>
                            </div>
                          </td>
                          <td className="d-flex gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                            >
                              <i className="ti ti-edit f-16" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                            >
                              <i className="ti ti-trash f-16 btn-danger" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {hodalopen && (
                  <div
                    className="modal fade show"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", display: "block" }}
                  >
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">{editMode ? "Edit Lab" : "Add Lab"}</h5>
                          <button type="button" className="btn-close" onClick={handlecloseVital}></button>
                        </div>
                        <div className="container mt-4">
                          <div className="row">
                            {[
                              { label: "Lab Name", name: "lab_name", type: "text" },
                              { label: "Email", name: "email", type: "email" },
                              { label: "Phone", name: "phone", type: "number" },
                              { label: "Address", name: "address", type: "text" },
                              { label: "Speciality", name: "speciality", type: "text" },
                              { label: "Notes", name: "notes", type: "text" },
                            ].map((field, idx) => (
                              <div className="col-md-6 mb-3" key={idx}>
                                <label className="form-label">{field.label}:</label>
                                <input
                                  type={field.type}
                                  name={field.name}
                                  value={formData[field.name] || ""}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                              </div>
                            ))}
                          </div>

                          <div className="d-flex justify-content-center">
                            <button type="submit" onClick={handleapisubmit} className="btn btn-primary my-3">
                              {editMode ? "Update Lab" : "Add Lab"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
