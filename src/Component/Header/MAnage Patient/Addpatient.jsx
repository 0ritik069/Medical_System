// import React, { use, useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { baseurl } from "../../../Baseurl";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
// import TextField from "@mui/material/TextField";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";
// const AddPatientForm = () => {
//   const navigate = useNavigate();
//   const [patients12, setPatients12] = useState([]);
//   const [value, setValue] = React.useState(dayjs("2022-04-17"));
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     dateOfBirth: "",
//     gender: "",
//     nationality: "",
//     lastVisitDate: "",
//     civilNumber: "",
//     passportNumber: "",
//     mobileNumber: "",
//     email: "",
//     address: "",
//     fileOpenedDate: "",
//     firstVisitDate: "",
//     defaultDoctorId: "",
//     emergencyContactName: "",
//     emergencyContactRelation: "",
//     emergencyContactPhone1: "",
//     emergencyContactPhone2: "",
//   });

//   const [files, setFiles] = useState({
//     profileImage: null,
//     cprScan: null,
//     passportCopy: null,
//   });

//   const [submitted, setSubmitted] = useState(false);
//   const [doctors, setDoctors] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files: selectedFiles } = e.target;
//     setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
//   };

//   useEffect(() => {
//     getdata12();
//   }, []);

//   const getdata12 = async () => {
//     try {
//       const response = await axios.get(`${baseurl}getNationalitiesList`);
//       if (response.data.success === true) {
//         console.log(response.data.data);
//         setPatients12(response.data.data);
//       } else {
//         console.error("Failed to fetch patient data:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching patient data:", error.message);
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]{8,15}$/;
//     const today = new Date().toISOString().split("T")[0];
//     if (!formData.firstName.trim())
//       newErrors.firstName = "First name is required";
//     if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
//     if (!formData.email) newErrors.email = "Email is required";
//     if (!formData.dateOfBirth)
//       newErrors.dateOfBirth = "Date of birth is required";
//     else if (formData.dateOfBirth > today)
//       newErrors.dateOfBirth = "Date of birth cannot be in future";
//     if (!formData.gender) newErrors.gender = "Gender is required";
//     if (!formData.nationality)
//       newErrors.nationality = "Nationality is required";
//     if (!formData.civilNumber.trim())
//       newErrors.civilNumber = "Civil ID is required";
//     if (!formData.mobileNumber.trim())
//       newErrors.mobileNumber = "Mobile number is required";
//     else if (!phoneRegex.test(formData.mobileNumber))
//       newErrors.mobileNumber = "Invalid phone number";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     else if (!emailRegex.test(formData.email))
//       newErrors.email = "Invalid email format";
//     // if (
//     //   formData.emergencyContactPhone1 &&
//     //   !phoneRegex.test(formData.emergencyContactPhone1)
//     // )
//     //   newErrors.emergencyContactPhone1 = "Invalid emergency contact phone";
//     // if (
//     //   formData.emergencyContactPhone2 &&
//     //   !phoneRegex.test(formData.emergencyContactPhone2)
//     // )
//     //   newErrors.emergencyContactPhone2 = "Invalid emergency contact phone";
//     // if (formData.fileOpenedDate && formData.fileOpenedDate > today)
//     //   newErrors.fileOpenedDate = "File opened date cannot be in the future";
//     if (formData.firstVisitDate && formData.firstVisitDate > today)
//       newErrors.firstVisitDate = "First visit date cannot be in the future";
//     if (!formData.defaultDoctorId)
//       newErrors.defaultDoctorId = "Doctor selection is required";
//     if (!formData.address) newErrors.address = "Address is required";
//     console.log(newErrors)
//     return newErrors;
//   };
//   const [errors, setErrors] = useState({});
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("1")
//     const foundErrors = validate();
//     if (Object.keys(foundErrors).length > 0) {
//       setErrors(foundErrors);
//       setSubmitted(false);
//       return;
//     }
//     console.log("12")
//     const data = new FormData();
//     data.append("firstName", formData.firstName);
//     data.append("lastName", formData.lastName);
//     data.append("dateOfBirth", formData.dateOfBirth);
//     data.append("gender", formData.gender);
//     data.append("nationality", formData.nationality);
//     data.append("civilIdNumber", formData.civilNumber);
//     data.append("passportNumber", formData.passportNumber);
//     data.append("mobileNumber", formData.mobileNumber);
//     data.append("email", formData.email);
//     data.append("address", formData.address || "");
//     data.append("fileOpenedDate", formData.fileOpenedDate);
//     data.append("firstVisitDate", formData.firstVisitDate);
//     data.append("defaultDoctorId", formData.defaultDoctorId);
//     data.append("emContactName", formData.emergencyContactName);
//     data.append("emContactRelation", formData.emergencyContactRelation);
//     data.append("emContactPhone1", formData.emergencyContactPhone1);
//     data.append("emContactPhone2", formData.emergencyContactPhone2);
//     data.append("lastVisitDate", formData.lastVisitDate);
//     if (files.profileImage) data.append("profileImage", files.profileImage);
//     if (files.cprScan) data.append("cprScan", files.cprScan);
//     if (files.passportCopy) data.append("passportCopy", files.passportCopy);
//     try {
//       const response = await axios.post(`${baseurl}registerPatient`, data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       if (response.data.success === true) {
//         setSubmitted(true);
//         Swal.fire(
//           "Success!!",
//           "Patient has been Added Successfully.",
//           "success"
//         );
//         navigate("/Admin/patient");
//         toast.success("Patient added successfully!");
//       } else {
//         alert("Submission failed: " + response.data.message);
//       }
//     } catch (error) {
//       console.error("Submit error:", error);
//       alert(
//         "Submission failed: " + (error.response?.data?.message || error.message)
//       );
//     }
//   };

//   useEffect(() => {
//     getDoctors();
//   }, []);
//   const getDoctors = async () => {
//     try {
//       const response = await axios.get(`${baseurl}getActiveDoctors`);
//       if (response.data.success === true) {
//         setDoctors(response.data.data);
//       } else {
//         console.log("epi error");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div className="pc-container">
//       <div className="pc-content">
//         <div className="col-12">
//           <div className="card table-card">
//             <div className="card-header">
//               <div className="d-sm-flex align-items-center justify-content-between">
//                 <h5 className=" my-2"> Register Patient</h5>
//               </div>
//             </div>
           
//             <form
//               onSubmit={handleSubmit}
//               encType="multipart/form-data"
//               className="row g-3 px-3 py-2 mb-3"
//             >
//               <div className="col-md-4">
//                 <label className="form-label">First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   className="form-control"
//                   placeholder="First Name"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                 />
//                 {errors.firstName && (
//                   <p className="text-danger">{errors.firstName}</p>
//                 )}
//               </div>

//               <div className="col-md-4">
//                 <label className="form-label">Last Name</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   className="form-control"
//                   value={formData.lastName}
//                   placeholder="Last Name"
//                   onChange={handleChange}
//                 />
//                 {errors.lastName && (
//                   <p className="text-danger">{errors.lastName}</p>
//                 )}
//               </div>
//               <div className="col-md-4">
//                 <div className="col-md-12">
//                   <label className="form-label">Date of Birth</label>
//                   <br />
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DatePicker
//                       label="Select Date"
//                       value={
//                         formData.dateOfBirth
//                           ? dayjs(formData.dateOfBirth)
//                           : null
//                       }
//                       className="w-100"
//                       onChange={(newValue) => {
//                         setFormData((prev) => ({
//                           ...prev,
//                           dateOfBirth: newValue
//                             ? dayjs(newValue).format("YYYY-MM-DD")
//                             : "",
//                         }));
//                       }}
//                       renderInput={(params) => (
//                         <TextField {...params} fullWidth />
//                       )}
//                     />
//                   </LocalizationProvider>
//                   {errors.dateOfBirth && (
//                     <p className="text-danger">{errors.dateOfBirth}</p>
//                   )}
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <label className="form-label">Gender</label>
//                 <select
//                   name="gender"
//                   className="form-control"
//                   value={formData.gender}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                 </select>
//                 {errors.gender && (
//                   <p className="text-danger">{errors.gender}</p>
//                 )}
//               </div>

//               <div className="col-md-4">
//                 <label className="form-label">Nationality</label>
//                 <select
//                   name="nationality"
//                   className="form-control"
//                   value={formData.nationality}
//                   onChange={handleChange}
//                 >
//                   <option>select</option>
//                   {patients12 &&
//                     patients12.length > 0 &&
//                     patients12.map((item, index) => {
//                       return (
//                         <>
//                           <option key={index} value={item.id}>
//                             {item.nationality}
//                           </option>
//                         </>
//                       );
//                     })}
//                 </select>
//                 {errors.nationality && (
//                   <p className="text-danger">{errors.nationality}</p>
//                 )}
//               </div>
//               <div className="col-md-4">
//                 <label className="form-label">Civil ID Number</label>
//                 <input
//                   type="text"
//                   name="civilNumber"
//                   placeholder="Civil ID Number"
//                   className="form-control"
//                   value={formData.civilNumber}
//                   onChange={handleChange}
//                 />
//                 {errors.civilNumber && (
//                   <p className="text-danger">{errors.civilNumber}</p>
//                 )}
//               </div>

//               <div className="col-md-4">
//                 <label className="form-label">Passport Number</label>
//                 <input
//                   type="text"
//                   name="passportNumber"
//                   className="form-control"
//                   value={formData.passportNumber}
//                   placeholder="Passport Number"
//                   onChange={handleChange}
//                 />
//                 {errors.passportNumber && (
//                   <p className="text-danger">{errors.passportNumber}</p>
//                 )}
//               </div>
//               <div className="col-md-4">
//                 <label className="form-label">Mobile Number</label>
//                 <input
//                   type="text"
//                   name="mobileNumber"
//                   className="form-control"
//                   value={formData.mobileNumber}
//                   placeholder="Mobile Number"
//                   onChange={handleChange}
//                 />
//                 {errors.mobileNumber && (
//                   <p className="text-danger">{errors.mobileNumber}</p>
//                 )}
//               </div>
//               <div className="col-md-4">
//                 <label className="form-label">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   className="form-control"
//                   placeholder="test@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//                 {errors.email && <p className="text-danger">{errors.email}</p>}
//               </div>
//               <div className="col-md-4">
//                 <label className="form-label">Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   className="form-control"
//                   placeholder="Address"
//                   value={formData.address}
//                   onChange={handleChange}
//                 />
//                 {errors.address && (
//                   <p className="text-danger">{errors.address}</p>
//                 )}
//               </div>
//               <div className="col-md-4">
//                 <label className="form-label">File Opened Date</label>
//                  <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DatePicker
//                       label="Select Date"
//                       value={
//                         formData.fileOpenedDate
//                           ? dayjs(formData.fileOpenedDate)
//                           : null
//                       }
//                       className="w-100 form-control"
//                       onChange={(newValue) => {
//                         setFormData((prev) => ({
//                           ...prev,
//                           fileOpenedDate: newValue
//                             ? dayjs(newValue).format("YYYY-MM-DD")
//                             : "",
//                         }));
//                       }}
//                       renderInput={(params) => (
//                         <TextField {...params} fullWidth />
//                       )}
//                     />
//                   </LocalizationProvider>
//               </div>

//               <div className="col-md-4">
//                 <label className="form-label"> Doctor ID</label>
//                 <br />
//                 <select
//                   name="defaultDoctorId"
//                   className="form-control"
//                   value={formData.defaultDoctorId}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Doctor</option>
//                   {doctors &&
//                     doctors.length > 0 &&
//                     doctors.map((item, index) => {
//                       // console.log(item);
//                       return (
//                         <>
//                           <option value={item.id}>{item?.fullName}</option>
//                         </>
//                       );
//                     })}
//                 </select>
//                 {errors.defaultDoctorId && (
//                   <p className="text-danger">{errors.defaultDoctorId}</p>
//                 )}
//               </div>
//               <div className="col-md-4">
//                 <label className="form-label">Emergency Contact Name</label>
//                 <input
//                   type="text"
//                   name="emergencyContactName"
//                   placeholder="Emergency Contact Name"
//                   className="form-control"
//                   value={formData.emergencyContactName}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="col-md-4">
//                 <label className="form-label">Emergency Contact Relation</label>
//                 <input
//                   type="text"
//                   name="emergencyContactRelation"
//                   placeholder="Emergency Contact Relation"
//                   className="form-control"
//                   value={formData.emergencyContactRelation}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="col-md-4">
//                 <label className="form-label">Emergency Phone 1</label>
//                 <input
//                   type="text"
//                   placeholder="Emergency Phone 1"
//                   name="emergencyContactPhone1"
//                   className="form-control"
//                   value={formData.emergencyContactPhone1}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="col-md-4">
//                 <label className="form-label">Emergency Phone 2</label>
//                 <input
//                   type="text"
//                   name="emergencyContactPhone2"
//                   className="form-control"
//                   placeholder="Emergency Phone 2"
//                   value={formData.emergencyContactPhone2}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="col-md-4">
//                 <label className="form-label">Patient Photo</label>
//                 <input
//                   type="file"
//                   name="profileImage"
//                   className="form-control"
//                   onChange={handleFileChange}
//                 />
//               </div>
//               <div className="col-md-4">
//                 <label className="form-label">CPR Scan</label>
//                 <input
//                   type="file"
//                   name="cprScan"
//                   className="form-control"
//                   onChange={handleFileChange}
//                 />
//               </div>
//               <div className="col-md-4">
//                 <label className="form-label">Passport Copy</label>
//                 <input
//                   type="file"
//                   name="passportCopy"
//                   className="form-control"
//                   onChange={handleFileChange}
//                 />
//               </div>
//               <div className="col-12 mb-3">
//                 <button type="submit" className="btn btn-primary">
//                   Patient Register
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default AddPatientForm;
import React, { use, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { baseurl } from "../../../Baseurl";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
const AddPatientForm = () => {
  const navigate = useNavigate();
  const [patients12, setPatients12] = useState([]);
  const [value, setValue] = React.useState(dayjs("2022-04-17"));
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    lastVisitDate: "",
    civilNumber: "",
    passportNumber: "",
    mobileNumber: "",
    email: "",
    address: "",
    fileOpenedDate: "",
    firstVisitDate: "",
    defaultDoctorId: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone1: "",
    emergencyContactPhone2: "",
  });

  const [files, setFiles] = useState({
    profileImage: null,
    cprScan: null,
    passportCopy: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
  };

  useEffect(() => {
    getdata12();
  }, []);

  const getdata12 = async () => {
    try {
      const response = await axios.get(`${baseurl}getNationalitiesList`);
      if (response.data.success === true) {
        console.log(response.data.data);
        setPatients12(response.data.data);
      } else {
        console.error("Failed to fetch patient data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching patient data:", error.message);
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{8,15}$/;
    const today = new Date().toISOString().split("T")[0];
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    else if (formData.dateOfBirth > today)
      newErrors.dateOfBirth = "Date of birth cannot be in future";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.nationality)
      newErrors.nationality = "Nationality is required";
    if (!formData.civilNumber.trim())
      newErrors.civilNumber = "Civil ID is required";
    if (!formData.mobileNumber.trim())
      newErrors.mobileNumber = "Mobile number is required";
    else if (!phoneRegex.test(formData.mobileNumber))
      newErrors.mobileNumber = "Invalid phone number";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";
    // if (
    //   formData.emergencyContactPhone1 &&
    //   !phoneRegex.test(formData.emergencyContactPhone1)
    // )
    //   newErrors.emergencyContactPhone1 = "Invalid emergency contact phone";
    // if (
    //   formData.emergencyContactPhone2 &&
    //   !phoneRegex.test(formData.emergencyContactPhone2)
    // )
    //   newErrors.emergencyContactPhone2 = "Invalid emergency contact phone";
    // if (formData.fileOpenedDate && formData.fileOpenedDate > today)
    //   newErrors.fileOpenedDate = "File opened date cannot be in the future";
    if (formData.firstVisitDate && formData.firstVisitDate > today)
      newErrors.firstVisitDate = "First visit date cannot be in the future";
    if (!formData.defaultDoctorId)
      newErrors.defaultDoctorId = "Doctor selection is required";
    if (!formData.address) newErrors.address = "Address is required";
    console.log(newErrors)
    return newErrors;
  };
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("1")
    const foundErrors = validate();
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      setSubmitted(false);
      return;
    }
    console.log("12")
    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("dateOfBirth", formData.dateOfBirth);
    data.append("gender", formData.gender);
    data.append("nationality", formData.nationality);
    data.append("civilIdNumber", formData.civilNumber);
    data.append("passportNumber", formData.passportNumber);
    data.append("mobileNumber", formData.mobileNumber);
    data.append("email", formData.email);
    data.append("address", formData.address || "");
    data.append("fileOpenedDate", formData.fileOpenedDate);
    data.append("firstVisitDate", formData.firstVisitDate);
    data.append("defaultDoctorId", formData.defaultDoctorId);
    data.append("emContactName", formData.emergencyContactName);
    data.append("emContactRelation", formData.emergencyContactRelation);
    data.append("emContactPhone1", formData.emergencyContactPhone1);
    data.append("emContactPhone2", formData.emergencyContactPhone2);
    data.append("lastVisitDate", formData.lastVisitDate);
    if (files.profileImage) data.append("profileImage", files.profileImage);
    if (files.cprScan) data.append("cprScan", files.cprScan);
    if (files.passportCopy) data.append("passportCopy", files.passportCopy);
    try {
      const response = await axios.post(`${baseurl}registerPatient`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success === true) {
        setSubmitted(true);
        Swal.fire(
          "Success!!",
          "Patient has been Added Successfully.",
          "success"
        );
        navigate("/Admin/patient");
        toast.success("Patient added successfully!");
      } else {
        alert("Submission failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert(
        "Submission failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);
  const getDoctors = async () => {
    try {
      const response = await axios.get(`${baseurl}getActiveDoctors`);
      if (response.data.success === true) {
        setDoctors(response.data.data);
      } else {
        console.log("epi error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="col-12">
          <div className="card table-card">
            <div className="tableHeader">
              <div className="d-sm-flex align-items-center justify-content-between">
                <h5> Register Patient</h5>
              </div>
            </div>
           
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="row g-3 px-3 py-2 mb-3"
            >
              <div className=" col-md-6">
                <label className="form-label">First Name <span style={{color: "red"}}>* </span></label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="text-danger">{errors.firstName}</p>
                )}
              </div>

              <div className=" col-md-6">
                <label className="form-label">Last Name  <span style={{color: "red"}}>* </span></label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  placeholder="Last Name"
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="text-danger">{errors.lastName}</p>
                )}
              </div>
              <div className=" col-md-6">
                <div className="col-md-12">
                  <label className="form-label">Date of Birth <span style={{color: "red"}}>* </span></label>
                  <br />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                      value={
                        formData.dateOfBirth
                          ? dayjs(formData.dateOfBirth)
                          : null
                      }
                      className="w-100"
                      onChange={(newValue) => {
                        setFormData((prev) => ({
                          ...prev,
                          dateOfBirth: newValue
                            ? dayjs(newValue).format("YYYY-MM-DD")
                            : "",
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                  {errors.dateOfBirth && (
                    <p className="text-danger">{errors.dateOfBirth}</p>
                  )}
                </div>
              </div>
              <div className=" col-md-6">
                <label className="form-label">Gender <span style={{color: "red"}}>* </span></label>
                <select
                  name="gender"
                  className="form-control"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-danger">{errors.gender}</p>
                )}
              </div>

              <div className=" col-md-6">
                <label className="form-label">Nationality <span style={{color: "red"}}>* </span></label>
                <select
                  name="nationality"
                  className="form-control"
                  value={formData.nationality}
                  onChange={handleChange}
                >
                  <option>select</option>
                  {patients12 &&
                    patients12.length > 0 &&
                    patients12.map((item, index) => {
                      return (
                        <>
                          <option key={index} value={item.id}>
                            {item.nationality}
                          </option>
                        </>
                      );
                    })}
                </select>
                {errors.nationality && (
                  <p className="text-danger">{errors.nationality}</p>
                )}
              </div>
              <div className=" col-md-6">
                <label className="form-label">Civil ID Number <span style={{color: "red"}}>* </span></label>
                <input
                  type="text"
                  name="civilNumber"
                  placeholder="Civil ID Number"
                  className="form-control"
                  value={formData.civilNumber}
                  onChange={handleChange}
                />
                {errors.civilNumber && (
                  <p className="text-danger">{errors.civilNumber}</p>
                )}
              </div>

              <div className=" col-md-6">
                <label className="form-label">Passport Number</label>
                <input
                  type="text"
                  name="passportNumber"
                  className="form-control"
                  value={formData.passportNumber}
                  placeholder="Passport Number"
                  onChange={handleChange}
                />
                {errors.passportNumber && (
                  <p className="text-danger">{errors.passportNumber}</p>
                )}
              </div>
              <div className=" col-md-6">
                <label className="form-label">Mobile Number <span style={{color: "red"}}>* </span></label>
                <input
                  type="text"
                  name="mobileNumber"
                  className="form-control"
                  value={formData.mobileNumber}
                  placeholder="Mobile Number"
                  onChange={handleChange}
                />
                {errors.mobileNumber && (
                  <p className="text-danger">{errors.mobileNumber}</p>
                )}
              </div>
              <div className=" col-md-6">
                <label className="form-label">Email <span style={{color: "red"}}>* </span></label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="test@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </div>
              <div className=" col-md-6">
                <label className="form-label">Address <span style={{color: "red"}}>* </span></label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && (
                  <p className="text-danger">{errors.address}</p>
                )}
              </div>
              <div className=" col-md-6">
                <label className="form-label">File Opened Date</label>
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      
                      value={
                        formData.fileOpenedDate
                          ? dayjs(formData.fileOpenedDate)
                          : null
                      }
                      className="w-100 form-control"
                      onChange={(newValue) => {
                        setFormData((prev) => ({
                          ...prev,
                          fileOpenedDate: newValue
                            ? dayjs(newValue).format("YYYY-MM-DD")
                            : "",
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
              </div>

              <div className=" col-md-6">
                <label className="form-label"> Doctor ID <span style={{color: "red"}}>* </span></label>
                <br />
                <select
                  name="defaultDoctorId"
                  className="form-control"
                  value={formData.defaultDoctorId}
                  onChange={handleChange}
                >
                  <option value="">Select Doctor</option>
                  {doctors &&
                    doctors.length > 0 &&
                    doctors.map((item, index) => {
                      return (
                        <>
                          <option value={item.id}>{item?.fullName}</option>
                        </>
                      );
                    })}
                </select>
                {errors.defaultDoctorId && (
                  <p className="text-danger">{errors.defaultDoctorId}</p>
                )}
              </div>
              <div className=" col-md-6">
                <label className="form-label">Emergency Contact Name</label>
                <input
                  type="text"
                  name="emergencyContactName"
                  placeholder="Emergency Contact Name"
                  className="form-control"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                />
              </div>
              <div className=" col-md-6">
                <label className="form-label">Emergency Contact Relation</label>
                <input
                  type="text"
                  name="emergencyContactRelation"
                  placeholder="Emergency Contact Relation"
                  className="form-control"
                  value={formData.emergencyContactRelation}
                  onChange={handleChange}
                />
              </div>
              <div className=" col-md-6">
                <label className="form-label">Emergency Phone 1</label>
                <input
                  type="text"
                  placeholder="Emergency Phone 1"
                  name="emergencyContactPhone1"
                  className="form-control"
                  value={formData.emergencyContactPhone1}
                  onChange={handleChange}
                />
              </div>
              <div className=" col-md-6">
                <label className="form-label">Emergency Phone 2</label>
                <input
                  type="text"
                  name="emergencyContactPhone2"
                  className="form-control"
                  placeholder="Emergency Phone 2"
                  value={formData.emergencyContactPhone2}
                  onChange={handleChange}
                />
              </div>
              <div className=" col-md-6">
                <label className="form-label">Patient Photo</label>
                <input
                  type="file"
                  name="profileImage"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
              <div className=" col-md-6">
                <label className="form-label">CPR Scan</label>
                <input
                  type="file"
                  name="cprScan"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
              <div className=" col-md-12">
                <label className="form-label">Passport Copy</label>
                <input
                  type="file"
                  name="passportCopy"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
              <div className="col-12 mb-3 text-center">
                <button type="submit" className="bgBtn">
                  Patient Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddPatientForm;
