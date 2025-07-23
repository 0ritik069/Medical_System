import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import Ract3d from "./Ract3d";
import axios from "axios";
import { baseurImage, baseurl } from "../../Baseurl";
import Swal from "sweetalert2";
import perImg from "../../../src/assests/profile.jpg";
export default function ManageAppointment() {
  const tableCell = (value) => <td>{value}</td>;
  const location = useLocation();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [addpatinemodal, setAddpatinemodal] = useState(false);
  const [openVital, setOpenVital] = useState(false);
  const [openVital121, setOpenVital121] = useState(false);
  const [diagonisemodal, setDiagonisemodal] = useState(false);
  const [vitaldatas, setVitaldatas] = useState([]);
  const [personalinfo, setPersonalinfo] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [openmodaltest, setOpenmodaltest] = useState(false)
  const [diagnosis, setDiagnosis] = useState([]);
  const [diagnosis11, setDiagnosis11] = useState([]);
  const [patientservice, setpatientservice] = useState([]);
  const [getservice, setGetservice] = useState([]);
  const [patients, setPatients] = useState([]);
  const [inpval, setInpval] = useState("");
  const [dataAppointment, setDataAppointment] = useState([]);
const [data2,setData2]=useState([])
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];
  const handleclick = () => {
    setModalOpen(true);
  };
  const datauser = location.state.patientid.id;
  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    try {
      const response = await axios.post(
        `${baseurl}appointmentByPatientId/${location?.state?.patientid.id}`
      );
      if (response.data.success === true) {
        setDataAppointment(response.data.data);
      } else {
        console.log("something went worng");
      }
    } catch (error) {
      console.error(
        "Error while fetching appointment data:",
        error.response?.data || error.message
      );
    }
  };

  const handleclickopenvital = () => {
    setOpenVital(true);
  };
  const handleclickopenvital11 = () => {
    setOpenVital121(true);
  };
  const handlecloseVital = () => {
    setOpenVital(false);
  };
  const hndleclosemodalservice = () => {
    setOpenVital121(false);
  };
  const hndleclosddddd = () => {
    setDiagonisemodal(false);
  };
  const services = [
    {
      sn: "221",
      doctor: "Dr Ali",
      category: "Dental",
      service: "Root Canal Treatment",
      price: "100.000BHD",
      discount: "0",
      total: "0%",
      deductible: "100.000BHD",
      copat: "30 BHD",
      coins: "30 BHD",
      status: "Pending",
    },
    {
      sn: "221",
      doctor: "Dr Ali",
      category: "Dental",
      service: "Root Canal Treatment",
      price: "100.000BHD",
      discount: "0",
      total: "0%",
      deductible: "100.000BHD",
      copat: "30 BHD",
      coins: "30 BHD",
      status: "Approved",
    },
  ];

  const insuranceCards = [
    {
      status: "Active",
      company: "Next Care Will",
      policy: "345683246",
      patient: "John Ward",
      issue: "31-09-25",
      expiry: "31-09-25",
      deductible: "3000",
      copatient: "20%",
      coins: "50%",
    },
    {
      status: "Expired",
      company: "Next Care Will",
      policy: "345683246",
      patient: "John Ward",
      issue: "31-09-25",
      expiry: "31-09-25",
      deductible: "3000",
      copatient: "20%",
      coins: "50%",
    },
  ];
  const invoices = [
    {
      id: "INV221",
      date: "xx/MM/yy",
      services: "P221P224#A22S",
      amount: "230.00BHD",
      vat: "10.00BHD",
      discount: "0",
      insurance: "No",
      status: "Paid",
    },
    {
      id: "INV221",
      date: "xx/MM/yy",
      services: "P221P224#A22S",
      amount: "230.00BHD",
      vat: "10.00BHD",
      discount: "0",
      insurance: "No",
      status: "Paid",
    },
    {
      id: "INV221",
      date: "xx/MM/yy",
      services: "P221P224#A22S",
      amount: "230.00BHD",
      vat: "10.00BHD",
      discount: "0",
      insurance: "No",
      status: "Paid",
    },
  ];

  const paymentPlans = [
    { sn: 1, name: "Ortho", duration: "600.0", paid: "18", remaining: "200" },
  ];

  const paymentInvoices = [
    {
      sn: 32,
      invoiceId: "INV221",
      date: "xx/MM/yy",
      amount: "230.00BHD",
      method: "Cash",
      transaction: "C3467667",
      cashier: "Eikane",
    },
  ];

  const handlechange = (e) => {
    const { name, value } = e.target;
    setInpval({ ...inpval, [name]: value });
  };

  const handlesavevital123 = async () => {
    try {
      const dataPost = {
        patientId: location?.state?.patientid.id,
        doctor_id: inpval.doctor_id,
        serviceId: inpval.service_id,
        amount: inpval.amount,
        insurance: inpval.insurance,
        vat: inpval.vat,
      };
      const response = await axios.post(
        `${baseurl}AddPatientServices`,
        dataPost
      );

      // Optional: check status and show success
      if (response.status === 200 || response.status === 201) {
        hndleclosemodalservice();
        console.log("Service Added successfully:", response.data);
        setOpenVital121(false);
        Swal.fire("Success", "Service Added successfully.", "success");
      } else {
        console.warn("Unexpected response:", response);
        Swal.fire(
          "error",
          "Unexpected server response. Please try again.",
          "error"
        );
      }
    } catch (error) {
      if (error.response) {
        // Backend responded with error
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert(
          "No response from server. Please check your internet connection."
        );
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };
  const handlesavevital = async () => {
    try {
      if (
        !location?.state?.patientid.id ||
        !inpval.nurse ||
        !inpval.recorded_at
      ) {
        console.warn("Missing required fields");
        alert("Please fill in all required fields.");
        return;
      }
      const dataPost = {
        patient_id: parseInt(location?.state?.patientid.id),
        nurse: inpval.nurse,
        recorded_at: inpval.recorded_at,
        blood_pressure_systolic: inpval.blood_pressure_systolic,
        blood_pressure_diastolic: inpval.blood_pressure_diastolic,
        heart_rate: inpval.heart_rate,
        respiratory_rate: inpval.respiratory_rate,
        temperature: inpval.temperature,
        weight: inpval.weight,
        height: inpval.height,
        bmi: inpval.bmi,
        oxygen_saturation: inpval.oxygen_saturation,
        notes: inpval.notes,
      };

      const response = await axios.post(
        `${baseurl}recordPatientVitals`,
        dataPost
      );

      // Optional: check status and show success
      if (response.status === 200 || response.status === 201) {
        handlecloseVital();
        console.log("Vitals recorded successfully:", response.data);
        Swal.fire("success", "Vitals add Successfully", "success");
      } else {
        console.warn("Unexpected response:", response);
      }
    } catch (error) {
      if (error.response) {
        // Backend responded with error
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
      } else {
        // Other errors
        console.error("Error setting up request:", error.message);
      }
    }
  };

  const handlemodaldiagonise = () => {
    setDiagonisemodal(true);
  };
  const userddertails = JSON.parse(localStorage.getItem("userMedical"));
  console.log(userddertails);
  useEffect(() => {
    getDataa();
  }, []);

  const getDataa = async () => {
      try {
      const response = await axios.get(
        `${baseurl}getPatientVitalsByPatientId/${location?.state?.patientid.id}`
      );

      if (response.data?.success === true) {
        console.log("Vitals fetched successfully:", response.data);
        setVitaldatas(response.data.vitals);
      } else {
        console.warn("Vitals not found or invalid status:", response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("API error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error in request setup:", error.message);
      }
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
        console.log("something went worng");
      }
    } catch (error) {
      console.log(error.response.data.data);
    }
  };
  useEffect(() => {
    getDiagnosis();
  }, []);
  const getDiagnosis = async () => {
    try {
      const response = await axios.get(`${baseurl}getDiagnosisList`);
      if (response.data.success === true) {
        setDiagnosis(response.data.data);
        console.log(response.data.data);
      } else {
        console.log("something went worng");
      }
    } catch (error) {
      console.log(error.response.data.data);
    }
  };
  const handlesavediagonise = async () => {
    try {
      if (!inpval.icd10_id || !inpval.notes || !inpval.doctor_id) {
        Swal.fire("Error", "Please fill in all fields.", "error");
        return;
      }
      const dataPost = {
        patient_id: parseInt(location?.state?.patientid.id),
        icd10_id: inpval.icd10_id,
        doctor_id: inpval.doctor_id,
        notes: inpval.notes,
        diagnosis_date: inpval.diagnosis_date,
      };
      const response = await axios.post(
        `${baseurl}recordPatientDiagnosis`,
        dataPost
      )
      if (response.data.success === true) {
        setDiagonisemodal(false);
        Swal.fire("Success", "Diagnosis saved successfully.", "success");
        // Optionally, you can refresh the diagnosis list or perform other actions
      } else {
        Swal.fire(
          "Error",
          "Failed to save diagnosis. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error saving diagnosis:", error);
      Swal.fire(
        "Error",
        "Failed to save diagnosis. Please try again.",
        "error"
      );
    }
  };
  useEffect(() => {
    getrecordDiagpise();
  }, []);
  const getrecordDiagpise = async () => {
    try {
      const response = await axios.get(
        `${baseurl}getPatientDiagnosisByPatientId/${location?.state?.patientid.id}`
      );
      if (response.data.success === true) {
        console.log("Diagnosis fetched successfully:", response.data);
        setDiagnosis11(response.data.data);
      } else {
        console.warn("Diagnosis not found or invalid status:", response.data);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    getservices();
  }, []);
  const getservices = async () => {
    try {
      const response = await axios.get(`${baseurl}getServices`);
      if (response.data.success === true) {
        setGetservice(response.data.data);
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error.response.data.data.message);
    }
  };
  useEffect(() => {
    Servicedata11();
  }, []);
  const Servicedata11 = async () => {
    try {
      const response = await axios.get(`${baseurl}getServices`);
      if (response.data.success === true) {
        console.log("Patient data fetched successfully:", response.data.data);
        setPatients(response.data.data);
      } else {
        console.error("Failed to fetch patient data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching patient data:", error.message);
    }
  };
  const getPatientAppointment = async () => {
    try {
      const response = await axios.get(
        `${baseurl}getPatientById/${location?.state?.patientid.id}`
      );
      if (response.data.success === true) {
        console.log(
          "Patient appointment fetched successfully:",
          response.data.data
        );
        setPersonalinfo(response.data.data);
      } else {
        console.error(
          "Failed to fetch patient appointment:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error fetching patient appointment:", error.message);
    }
  };
  useEffect(() => {
    getPatientAppointment();
  }, []);
  const getPatientservice = async () => {
    try {
      const response = await axios.get(
        `${baseurl}GetPatientServices/${location?.state?.patientid.id}`
      );
      console.log(response);
      if (response.status === 200) {
        // console.log(
        //   "Patient service fetched successfully:",
        //   response.data.data
        // );
        setpatientservice(response.data.data);
      } else {
        console.error(
          "Failed to fetch patient service:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error fetching patient service:", error.message);
    }
  };
  useEffect(() => {
    getPatientservice();
  }, []);
  ////////////////////////////////////// const vital form///////////////////////////
  const [formData, setFormData] = useState({
    systolic: "",
    diastolic: "",
    bpPosition: [],
    respiratoryRate: "",
    pulse: "",
    temperature: "",
    spO2: "",
    rbsMg: "",
    rbsMmol: "",
    weight: "",
    height: "",
    riskOfFall: "",
    urgency: "",
    notes: "",
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(e.target);
    setFormData({ ...formData, [name]: value });
  };
  const calculateBMI = () => {
    const weight = parseFloat(formData.weight);
    const heightInMeters = parseFloat(formData.height) / 100;
    if (!weight || !heightInMeters || heightInMeters === 0) return "";
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };
  const getColorCode = (field, value) => {
    const val = parseFloat(value);
    switch (field) {
      case "systolic":
        if (val < 90) return "low";
        if (val > 140) return "high";
        return "normal";
      case "diastolic":
        if (val < 60) return "low";
        if (val > 90) return "high";
        return "normal";
      case "respiratoryRate":
        if (val < 12) return "low";
        if (val > 20) return "high";
        return "normal";
      case "pulse":
        if (val < 60) return "low";
        if (val > 100) return "high";
        return "normal";
      case "temperature":
        if (val < 36.1) return "low";
        if (val > 37.8) return "high";
        return "normal";
      case "spO2":
        if (val < 95) return "low";
        return "normal";
      default:
        return "";
    }
  };
  const getColorStyle = (status) => {
    switch (status) {
      case "low":
        return { backgroundColor: "#d6eaffff" };
      case "normal":
        return { backgroundColor: "#d4edda" };
      case "high":
        return { backgroundColor: "#f8cfd1ff" };
      default:
        return {};
    }
  };
  const handleapisubmit = async () => {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0];
    const recordedAt = `${date} ${time}`;
    const validations = [
      { name: "Systolic BP", value: formData.systolic, min: 40, max: 300 },
      { name: "Diastolic BP", value: formData.diastolic, min: 20, max: 180 },
      {
        name: "Respiratory Rate",
        value: formData.respiratoryRate,
        min: 5,
        max: 50,
      },
      { name: "Pulse", value: formData.pulse, min: 10, max: 400 },
      { name: "Temperature", value: formData.temperature, min: 10, max: 60 },
      { name: "SpO2", value: formData.spO2, min: 0, max: 100 },
      { name: "RBS mg/dl", value: formData.rbsMg, min: 10, max: 800 },
      { name: "RBS mmol/l", value: formData.rbsMmol, min: 0.5, max: 50 },
      { name: "Weight", value: formData.weight, min: 0, max: 1000 },
      { name: "Height", value: formData.height, min: 0, max: 300 },
    ];
    for (const field of validations) {
      const num = parseFloat(field.value);
      if (isNaN(num) || num < field.min || num > field.max) {
        return Swal.fire(
          "Invalid Input",
          `${field.name} must be between ${field.min} and ${field.max}`,
          "warning"
        );
      }
    }
    const payload = {
      patient_id: location?.state?.patientid.id,
      blood_pressure_systolic: parseInt(formData.systolic),
      blood_pressure_diastolic: parseInt(formData.diastolic),
      bp_position: formData.bpPosition,
      respiratory_rate: parseInt(formData.respiratoryRate),
      pulse: parseInt(formData.pulse),
      age: location.state.patientid.age,
      spo2: parseInt(formData.spO2),
      rbs_mg: parseFloat(formData.rbsMg),
      rbs_nmol: parseFloat(formData.rbsMmol),
      temperature: parseFloat(formData.temperature),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      risk_of_fall: formData.riskOfFall,
      urgency: formData.urgency,
      notes: formData.notes,
      recorded_at: recordedAt,
      doctor_id: location.state.patientid.defaultDoctorId,
    };
    try {
      const response = await axios.post(
        `${baseurl}recordPatientVitals`,
        payload
      );

      if (response.data.success === true) {
        getDataa();
        Swal.fire("Success", "Vitals added successfully", "success");
        setFormData(null);
        handlecloseVital();
        getDataa();
      } else {
        Swal.fire("Oops!", "Something went wrong!", "error");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };
  const handleclickdeletevital = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this vital?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${baseurl}deletePatientVital/${id}/${location.state.patientid.id}`
        );
        if (response.data.success === true) {
          getDataa();
          Swal.fire("Deleted!", "Vital deleted successfully.", "success");
        } else {
          Swal.fire("Oops!", "Something went wrong.", "error");
        }
      } catch (error) {
        Swal.fire(
          "Error",
          error?.response?.data?.message || "Something went wrong",
          "error"
        );
      }
    }
  };
  const handleclikdeleteapp = async (item) => {
    console.log(item);
    try {
      const response = await axios.delete(
        `${baseurl}deleteAppointments/${item.id}/${location.state.patientid.id}`
      );
      if (response.data.success === true) {
        getdata();
        Swal.fire(
          "success",
          "Patient Appointment delete successfully",
          "success"
        );
      } else {
        Swal.fire("error", "Something went Wrong", "error");
      }
    } catch (error) {
      const err = error.response.data.message;
      Swal.fire("error", err, "error");
    }
  };
  const handleclickpopusopenn = () => {
    setAddpatinemodal(true);
  };
  const handleclickpopusopenn11 = () => {
    setAddpatinemodal(false);
  };
  // ////////////////////////////////////////////////// add appointment////////////////////////
  const [formData1, setFormData1] = useState({
    patientId: location?.state?.patientid?.id,
    doctorId: "",
    appointmentDate: "",
    startTime: "",
    endTime: "",
    reason: "",
    status: "Scheduled",
    apptype: "",
  });
  const [errors, setErrors] = useState({});
  const [doctors1, setDoctors1] = useState([]);
  useEffect(() => {
    fetchDoctors();
  }, []);
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${baseurl}getActiveDoctors`);
      if (response.data.success) {
        setDoctors1(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  const validate = () => {
    const newErrors = {};
    if (!formData1.appointmentDate)
      newErrors.appointmentDate = "Date is required";
    if (!formData1.reason.trim()) newErrors.reason = "Reason is required";
    if (!formData1.doctorId) newErrors.doctorId = "Doctor is required";
    if (!formData1.startTime) newErrors.startTime = "Start time is required";
    if (!formData1.endTime) newErrors.endTime = "End time is required";
    if (formData1.startTime && formData1.endTime) {
      const start = new Date(`2020-01-01T${formData1.startTime}`);
      const end = new Date(`2020-01-01T${formData1.endTime}`);
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
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) return;
    console.log(formData1);
    try {
      const response = await axios.post(
        `${baseurl}createAppointment`,
        formData1
      );
      if (response.data.success) {
        handleclickpopusopenn11();
        getdata()
        Swal.fire("Success", "Appointment Added Successfuly", "success");
        setFormData1({
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
  ////////////////////////////////////////////////// labs code////////////////////////////////////////////////////////
  const handleclickopentestadd =()=>{
    setOpenmodaltest(true)
  }
  const closeModaladdtest =()=>{
    setOpenmodaltest(false)
  }
    useEffect(() => {
      getDataset();
    }, []);
    const getDataset = async () => {
      try {
        const response = await axios.get(`${baseurl}getAllLabs`);
        if (response.data.success === true) {
          console.log(response.data.data)
          setData2(response.data.data);
        } else {
          Swal.fire("Error", "Something went wrong", "error");
        }
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "Failed to fetch labs", "error");
      }
    };

    const handletest =()=>{
      const obj ={
        patientId:location.state.patientid.id,
      title: inpval.title,
      description: inpval.description,
      category: inpval.category,
      }
      console.log(obj )
    }
  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="patientTab">
          <div>
            <ul
              className="nav justify-content-between nav-tabs"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="personaldata-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#personaldata"
                  type="button"
                  role="tab"
                  aria-controls="personaldata"
                  aria-selected="false"
                >
                  Personal Data
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="Appointment-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Appointment"
                  type="button"
                  role="tab"
                  aria-controls="Appointment"
                  aria-selected="false"
                >
                  Appointment
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="vitalsings-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#vitalsings"
                  type="button"
                  role="tab"
                  aria-controls="vitalsings"
                  aria-selected="false"
                >
                  Vital Signs
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="labs-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#labs"
                  type="button"
                  role="tab"
                  aria-controls="labs"
                  aria-selected="false"
                >
                  Labs
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="medicalhistory-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#medicalhistory"
                  type="button"
                  role="tab"
                  aria-controls="medicalhistory"
                  aria-selected="false"
                >
                  Medical
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="dental-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#dental"
                  type="button"
                  role="tab"
                  aria-controls="dental"
                  aria-selected="false"
                >
                  Dental
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="service-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#service"
                  type="button"
                  role="tab"
                  aria-controls="service"
                  aria-selected="false"
                >
                  Service
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link "
                  id="insurance-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#insurance"
                  type="button"
                  role="tab"
                  aria-controls="insurance"
                  aria-selected="true"
                >
                  Insurance
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="billing-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#billing"
                  type="button"
                  role="tab"
                  aria-controls="billing"
                  aria-selected="false"
                >
                  Billing
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade  "
                id="insurance"
                role="tabpanel"
                aria-labelledby="insurance-tab"
              >
                <div className="col-12">
                  <div className="table-card patientCardHeader">
                    <div
                      className="tableHeader"
                      style={{ borderBottom: "1px solid #e8ebee" }}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <h5>Services History</h5>
                        <div>
                          <div className="d-flex">
                            <button className="borderBtn me-2">
                              New Claims
                            </button>
                            <button className="bgBtn ">Add Insurance</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="row p-4">
                        <div className="col-lg-8">
                          <div className="borderInsure">
                            <div className="serviceHis">
                              <div className="d-flex justify-content-between tableHeader  secClaim">
                                <div className="d-flex align-items-center">
                                  <div>
                                    <span>
                                      {" "}
                                      <strong>Claims :</strong> #3290
                                    </span>
                                    <span className="text-muted">(Sent)</span>
                                  </div>
                                  <div className="ps-3">
                                    <span>
                                      <strong>Balance:</strong> 300BHD
                                    </span>
                                  </div>
                                </div>

                                <div className="d-flex gap- align-items-center iconTab">
                                  <i class="ti ti-printer"></i>
                                  <i class="ti ti-edit "></i>
                                  <i class="ti ti-trash "></i>
                                  <button className="borderBtn me-2">
                                    Send
                                  </button>
                                  <button className="bgBtn">Pay</button>
                                </div>
                              </div>
                            </div>
                            <div className="card-body p-0 mt-0">
                              <div className="table-responsive mt-0">
                                <table>
                                  <thead>
                                    <tr>
                                      <th>Sn</th>
                                      <th>Doctor</th>
                                      <th>Category</th>
                                      <th>Service</th>
                                      <th>Price</th>
                                      <th>Discount</th>
                                      <th>Total</th>
                                      <th>Deductable</th>
                                      <th>Co-Pat</th>
                                      <th>Co-Ins</th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {services.map((item, index) => (
                                      <tr key={index}>
                                        <td>{item.sn}</td>
                                        <td>{item.doctor}</td>
                                        <td>{item.category}</td>
                                        <td>{item.service}</td>
                                        <td>{item.price}</td>
                                        <td>{item.discount}</td>
                                        <td>{item.total}</td>
                                        <td>{item.deductible}</td>
                                        <td>{item.copat}</td>
                                        <td>{item.coins}</td>
                                        <td>{item.status}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>

                              {/* Table Footer Action */}
                              <div className="d-flex justify-content-end align-items-center px-3 py-2">
                                <div>
                                  <span>
                                    <strong className="pe-2">Total:</strong> 132
                                    BHD
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          {insuranceCards.map((card, idx) => (
                            <div
                              className={`insureCard mb-3`}
                              key={idx}
                              style={{
                                backgroundColor:
                                  card.status === "Active"
                                    ? "#fef5e6"
                                    : "#fff7f5",
                              }}
                            >
                              <div className="d-flex justify-content-between align-items-center tableHeader cardInsureAlign">
                                <div>
                                  <h5>Insurance Card {idx + 1}</h5>
                                </div>

                                <p
                                  className={`ms-2 badge bg-${
                                    card.status === "Active"
                                      ? "success"
                                      : "secondary"
                                  }`}
                                >
                                  Status {card.status}
                                </p>
                              </div>
                              <div className="p20">
                                <p className="mb-1">
                                  <strong>Company Name:</strong> {card.company}
                                </p>
                                <p className="mb-1">
                                  <strong>Policy Number:</strong> {card.policy}
                                </p>
                                <p className="mb-1">
                                  <strong>Patient Name:</strong> {card.patient}
                                </p>
                                <p className="mb-1">
                                  <strong>Issue Date:</strong> {card.issue}
                                </p>
                                <p className="mb-1">
                                  <strong>Expiry Date:</strong> {card.expiry}
                                </p>
                                <p className="mb-1">
                                  <strong>Deductable:</strong> {card.deductible}
                                </p>
                                <p className="mb-1">
                                  <strong>Co-Patient:</strong> {card.copatient}
                                </p>
                                <p className="mb-1">
                                  <strong>Co-Insurance:</strong> {card.coins}
                                </p>
                                <p className="mb-0">
                                  <strong>Scan Copy:</strong>{" "}
                                  <i className="bi bi-paperclip"></i>
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="billing"
                role="tabpanel"
                aria-labelledby="billing-tab"
              >
                <div className="col-12">
                  <div className="table-card patientCardHeader">
                    <div className="row p-4">
                      <div className="col-lg-8">
                        <div className="borderInsure">
                          <div className="tableHeader  d-flex justify-content-between align-items-center">
                            <h5>Invoices</h5>
                            <div className="d-flex align-items-center iconTab">
                              <button
                                className="invoiceHeaderIcon"
                                title="Settings"
                              >
                                <i class="ti ti-settings"></i>
                              </button>
                              <button
                                className="invoiceHeaderIcon"
                                title="Filter"
                              >
                                <i class="ti ti-filter"></i>
                              </button>
                              <button className="borderBtn">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="feather feather-plus me-1"
                                >
                                  <line x1="12" y1="5" x2="12" y2="19"></line>
                                  <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                New Invoice
                              </button>
                            </div>
                          </div>
                          <div className="card-body p-0">
                            <div className="table-responsive">
                              <table className="table table-hover">
                                <thead>
                                  <tr>
                                    <th className="">Inv#</th>
                                    <th className="">Date</th>
                                    <th className="">Services</th>
                                    <th className="">Amount</th>
                                    <th className="">VAT</th>
                                    <th className="">Discount</th>
                                    <th className="">Insurance</th>
                                    <th className="">Status</th>
                                    <th className=" text-center">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {invoices.map((invoice, index) => (
                                    <tr key={index}>
                                      <td>{invoice.id}</td>
                                      <td>{invoice.date}</td>
                                      <td>{invoice.services}</td>
                                      <td>{invoice.amount}</td>
                                      <td>{invoice.vat}</td>
                                      <td>{invoice.discount}</td>
                                      <td>{invoice.insurance}</td>
                                      <td>
                                        <span className="badge bg-success-subtle text-success fw-normal px-3 py-2 rounded-pill">
                                          {invoice.status}
                                        </span>
                                      </td>
                                      <td className="py-3 text-center">
                                        <button
                                          className="btn btn-link p-0 text-decoration-none me-2"
                                          title="View"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-eye text-primary"
                                          >
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle
                                              cx="12"
                                              cy="12"
                                              r="3"
                                            ></circle>
                                          </svg>
                                        </button>
                                        <button
                                          className="btn btn-link p-0 text-decoration-none me-2"
                                          title="Print"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-printer text-secondary"
                                          >
                                            <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                            <rect
                                              x="6"
                                              y="14"
                                              width="12"
                                              height="8"
                                            ></rect>
                                          </svg>
                                        </button>
                                        <button
                                          className="btn btn-link p-0 text-decoration-none"
                                          title="Delete"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-trash-2 text-danger"
                                          >
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            <line
                                              x1="10"
                                              y1="11"
                                              x2="10"
                                              y2="17"
                                            ></line>
                                            <line
                                              x1="14"
                                              y1="11"
                                              x2="14"
                                              y2="17"
                                            ></line>
                                          </svg>
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        <div className="borderInsure mt-3">
                          <div className="tableHeader">
                            <div className="d-flex justify-content-between align-items-center">
                              <h5 className=" mb-0">Payment Invoices</h5>
                              <button className="borderBtn">Payment</button>
                            </div>
                          </div>
                          <div>
                            <div className="table-responsive">
                              <table className="table table-hover">
                                <thead>
                                  <tr>
                                    <th>Sn</th>
                                    <th>Invoice ID</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Method</th>
                                    <th>Transaction</th>
                                    <th>Cashier</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {paymentInvoices.map((payment, index) => (
                                    <tr key={index}>
                                      <td>{payment.sn}</td>
                                      <td>{payment.invoiceId}</td>
                                      <td>{payment.date}</td>
                                      <td>{payment.amount}</td>
                                      <td>{payment.method}</td>
                                      <td>{payment.transaction}</td>
                                      <td>{payment.cashier}</td>
                                      <td className="py-3 text-center">
                                        <button
                                          className="btn btn-link p-0 text-decoration-none me-2"
                                          title="View"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-eye text-primary"
                                          >
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle
                                              cx="12"
                                              cy="12"
                                              r="3"
                                            ></circle>
                                          </svg>
                                        </button>
                                        <button
                                          className="btn btn-link p-0 text-decoration-none"
                                          title="Edit"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-edit-2 text-secondary"
                                          >
                                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                          </svg>
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Summary & Payment Plans */}
                      <div className="col-lg-4">
                        {/* Summary Card */}
                        <div className="borderInsure mb-3">
                          <div className="tableHeader">
                            <div className="d-flex justify-content-between align-items-center ">
                              <h5 className="mb-0">Summary</h5>

                              <button className="borderBtn"> Edit</button>
                            </div>
                          </div>
                          <div className="card-body bg-white rounded-bottom-4 p-3">
                            <p className="mb-2">
                              <span className="fw-semibold">Name :</span> Ahmed
                              Ali Khan
                            </p>
                            <p className="mb-2">
                              <span className="fw-semibold">
                                Pending Balance :
                              </span>{" "}
                              50.000 BHD
                            </p>
                            <p className="mb-2">
                              <span className="fw-semibold">
                                Total Payments :
                              </span>{" "}
                              450.000 BHD
                            </p>
                            <p className="mb-2">
                              <span className="fw-semibold">
                                Insurance Balance :
                              </span>{" "}
                              0.0 BHD
                            </p>
                            <p className="mb-0">
                              <span className="fw-semibold">
                                Last Payment :
                              </span>{" "}
                              03/02/2025
                            </p>
                          </div>
                        </div>

                        {/* Payment Plans Card */}
                        <div className="borderInsure">
                          <div className="tableHeader">
                            <div className="d-flex justify-content-between">
                              <h5>Payment Plans</h5>
                              <button className="borderBtn">
                                Payment Plan
                              </button>
                            </div>
                          </div>
                          <div className="card-body p-0 bg-white rounded-bottom-4">
                            <div className="table-responsive">
                              <table className="table table-hover">
                                <thead className="bg-light">
                                  <tr>
                                    <th>Sn</th>
                                    <th>Name</th>
                                    <th>Duration</th>
                                    <th>Paid</th>
                                    <th>Remaining</th>
                                    <th className=" text-center">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {paymentPlans.map((plan, index) => (
                                    <tr key={index}>
                                      <td>{plan.sn}</td>
                                      <td>{plan.name}</td>
                                      <td>{plan.duration}</td>
                                      <td>{plan.paid}</td>
                                      <td>{plan.remaining}</td>
                                      <td className="py-3 text-center">
                                        <button
                                          className="btn btn-link p-0 text-decoration-none me-2"
                                          title="View"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-eye text-primary"
                                          >
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle
                                              cx="12"
                                              cy="12"
                                              r="3"
                                            ></circle>
                                          </svg>
                                        </button>
                                        <button
                                          className="btn btn-link p-0 text-decoration-none"
                                          title="Edit"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-edit-2 text-secondary"
                                          >
                                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                          </svg>
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade show active"
                id="personaldata"
                role="tabpanel"
                aria-labelledby="personaldata-tab analytics-tab-1"
                tabIndex={0}
              >
                <div className="col-12">
                  <div>
                    <div className="card-header">
                      <div className="d-sm-flex align-items-center justify-content-between">
                        {/* <div><a href="../admins/course-teacher-apply.html" className="btn btn-outline-secondary">Apply Teacher List</a> <a href="../admins/course-teacher-add.html" className="btn btn-primary">Add Teacher</a></div> */}
                      </div>
                    </div>

                    <div className="mt-5 commonCard pt-5">
                      <div className="row g-3">
                        {/* Left Section */}
                        <div className="col-md-8">
                          {/* Personal Info */}
                          <div
                            className="card mb-3"
                            style={{ position: "relative" }}
                          >
                            <div className="personaimg text-center">
                              <img
                                style={{ width: "100px", height: "100px" }}
                                src={
                                  personalinfo.profileImage === null
                                    ? perImg
                                    : ` ${baseurImage}${personalinfo.profileImage}`
                                }
                                alt="1"
                              />
                            </div>
                            <div>
                              <h5 className="card-title">Personal Info</h5>
                              <div className="row p20">
                                <div className="col-md-6">
                                  <label className="form-label">
                                    File Number
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={personalinfo.fileNumber}
                                    placeholder="File Number"
                                    disabled
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    disabled
                                    value={personalinfo.firstName}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">
                                    Medical ID
                                  </label>
                                  <input
                                    type="text"
                                    disabled
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">
                                    Date of Birth
                                  </label>
                                  <input
                                    type="date"
                                    disabled
                                    className="form-control"
                                    value={
                                      personalinfo.dateOfBirth
                                        ? new Date(personalinfo.dateOfBirth)
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                    }
                                  />
                                  {/* <input type="date" className="form-control" value={personalinfo.dateOfBirth} /> */}
                                </div>
                                <div className="col-md-4">
                                  <label className="form-label">Age</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={personalinfo.age}
                                    disabled
                                    placeholder="Age"
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label className="form-label">Civil ID</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Civil ID"
                                    disabled
                                    value={personalinfo.civilIdNumber}
                                  />
                                </div>
                                <div className="col-md-3">
                                  <label className="form-label d-block">
                                    Gender
                                  </label>
                                  <div className="d-flex">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Civil ID"
                                      disabled
                                      value={personalinfo.gender}
                                    />
                                    {/* <div className="form-check form-check-inline">
                                      <input
                                      type="text"
                                        className="form-check-input"
                                        name="gender"
                                        value={personalinfo.gender}
                                        // checked={personalinfo.gender === "Male"}
                                      />
                                      {/* <label
                                        className="form-check-label"
                                        htmlFor="male"
                                      >
                                        Male
                                      </label> */}
                                    {/* </div> */}
                                    {/* <div className="form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        id="female"
                                        checked={
                                          personalinfo.gender === "Female"
                                        }
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="female"
                                      >
                                        Female
                                      </label>
                                    </div> */}
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <label className="form-label">
                                    Passport ID
                                  </label>
                                  <input
                                    type="text"
                                    value={personalinfo.passportNumber}
                                    className="form-control"
                                    disabled
                                    placeholder=" Passport ID"
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">
                                    Nationality
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    disabled
                                    value={personalinfo.nationality}
                                    placeholder="Nationality"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Contact Details */}
                          <div className="card mb-3">
                            <div>
                              <h5 className="card-title">Contact Details</h5>
                              <div className="row p20">
                                <div className="col-md-6">
                                  <label className="form-label">Mobile</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    disabled
                                    placeholder="Mobile"
                                    value={personalinfo.mobileNumber}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">Phone</label>
                                  <input
                                    type="text"
                                    disabled
                                    className="form-control"
                                    placeholder="Phone"
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">Email</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    disabled
                                    value={personalinfo.email}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">Address</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    disabled
                                    value={personalinfo.address}
                                    placeholder="Address"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Section */}
                        <div className="col-md-4 rightSidePer">
                          {/* Visit Info */}

                          {/* Emergency Contact */}
                          <div className="card mb-3">
                            <div>
                              <h5 className="card-title">Emergency Contact</h5>
                              <div className="p20">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <label class="form-label">Name</label>
                                    <input
                                      type="text"
                                      value={personalinfo.emContactName}
                                      className="form-control"
                                      disabled
                                      placeholder="Name"
                                    />
                                  </div>
                                  <div className="col-lg-6">
                                    <label class="form-label">Relation</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      disabled
                                      value={personalinfo.emContactRelation}
                                      placeholder="Relation"
                                    />
                                  </div>
                                  <div className="col-lg-6">
                                    <label class="form-label">Phone 1</label>
                                    <input
                                      type="text"
                                      disabled
                                      className="form-control"
                                      value={personalinfo.emContactPhone1}
                                      placeholder="Phone 1"
                                    />
                                  </div>
                                  <div className="col-lg-6">
                                    <label class="form-label">Phone 2</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      disabled
                                      placeholder="Phone 2"
                                      value={personalinfo.emContactPhone2}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card mb-3">
                            <div>
                              <h5 className="card-title">Documents</h5>
                              <div className="p20">
                                <div className="row ">
                                  <div className="col-lg-12 docPatient">
                                    <div className="mb-1">
                                      <label className="form-label mb-3">
                                        {" "}
                                        CPR Scan{" "}
                                      </label>
                                      {personalinfo.CPR_scan_doc ? (
                                        <a
                                          href={`${baseurImage}/${personalinfo.CPR_scan_doc}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="borderBtn"
                                        >
                                          View CPR Scan
                                        </a>
                                      ) : (
                                        <span>No document available</span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-lg-12 docPatient">
                                    <div className="mb-1">
                                      <label className="form-label mb-3">
                                        Passport Copy
                                      </label>

                                      {personalinfo.passport_copy ? (
                                        <a
                                          href={`${baseurImage}/${personalinfo.passport_copy}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="borderBtn"
                                        >
                                          View Passport
                                        </a>
                                      ) : (
                                        <span>No document available</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card mb-3 ">
                            <div className="card-body  p-3">
                              <div className="d-flex">
                                <p>
                                  <label className="form-label">
                                    Last Visit:
                                  </label>{" "}
                                  {new Date(
                                    personalinfo.lastVisitDate
                                  ).toLocaleDateString("en-GB") === "01/01/1970"
                                    ? ""
                                    : new Date(
                                        personalinfo.lastVisitDate
                                      ).toLocaleDateString("en-GB")}
                                </p>
                                {/* <p className="ps-2">
                                  <strong>First Visit:</strong> {new Date(personalinfo.firstVisitDate).toLocaleDateString("en-GB")}
                                </p> */}
                              </div>
                              <p>
                                <label className="form-label">
                                  File Opening:
                                </label>{" "}
                                {new Date(
                                  personalinfo.fileOpenedDate
                                ).toLocaleDateString("en-GB")}
                              </p>
                              <label className="form-label">
                                Primary Doctor
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                disabled
                                placeholder="Phone 2"
                                value={personalinfo.Primary_Doctor}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="Appointment"
                role="tabpanel"
                aria-labelledby="Appointment-tab"
              >
                <div className="col-12">
                  <div className="table-card patientCardHeader">
                    <div className="tableHeader">
                      <div className="d-flex justify-content-end">
                        <button
                          className="bgBtn"
                          onClick={handleclickpopusopenn}
                          // onClick={() => {
                          //   navigate("/Admin/Addappointment");
                          // }}
                        >
                          New Appointment
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive mt-0">
                        <table className="table table-hover" id="pc-dt-simple">
                          <thead>
                            <tr>
                              <th>Doctor Name</th>
                              <th>Start Time</th>
                              <th>End Time</th>
                              <th>Reason</th>
                              <th>Appointment Status</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataAppointment && dataAppointment.length > 0 ? (
                              dataAppointment.map((item, index) => {
                                // console.log(item);
                                return (
                                  <tr key={index}>
                                    <td>{item.doctorName}</td>
                                    <td>{item.startTime}</td>
                                    <td>{item.endTime}</td>
                                    <td>{item.reason}</td>
                                    <td>{item.status}</td>
                                    <td className="text-center">
                                      {/* <a */}
                                      {/* //   href="#"
                                      //   className=" viewIcon avtar avtar-xs btn-link-secondary"
                                      // >
                                      //   <i className="ti ti-eye f-20" />
                                      //   <span>View</span>
                                      // </a>
                                      // <a */}
                                      {/* //   href="#"
                                      //   className="avtar avtar-xs btn-link-secondary editIcon"
                                      // >
                                      //   <i className="ti ti-edit f-20" />
                                      //   <span>Edit</span>
                                      // </a> */}
                                      <div
                                        className="avtar avtar-xs btn-link-secondary deleteIcon"
                                        onClick={() => {
                                          handleclikdeleteapp(item);
                                        }}
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
                                <td
                                  colSpan="6"
                                  className="text-center text-muted"
                                >
                                  No data found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        {addpatinemodal && (
                          <div
                            className="modal fade show"
                            style={{
                              backgroundColor: "rgba(56, 53, 53, 0.5)",
                              display: "block",
                            }}
                          >
                            <div className="modal-dialog modal-lg">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title">Add Appointment</h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleclickpopusopenn11}
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  <div className="row g-3 px-3 py-2 mb-3">
                                    {/* <div className="col-lg-6">
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
            </div> */}
                                    <div className="col-lg-6">
                                      <label className="form-label">
                                        Doctor
                                      </label>
                                      <select
                                        className={`form-select ${
                                          errors.doctorId ? "is-invalid" : ""
                                        }`}
                                        name="doctorId"
                                        value={formData1.doctorId}
                                        onChange={handleChange1}
                                      >
                                        <option value="">Select Doctor</option>
                                        {doctors1.map((doctor) => (
                                          <option
                                            key={doctor.id}
                                            value={doctor.id}
                                          >
                                            {doctor.fullName}
                                          </option>
                                        ))}
                                      </select>
                                      <div className="invalid-feedback">
                                        {errors.doctorId}
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <label className="form-label">
                                        Appointment Date
                                      </label>
                                      <input
                                        type="date"
                                        className={`form-control ${
                                          errors.appointmentDate
                                            ? "is-invalid"
                                            : ""
                                        }`}
                                        name="appointmentDate"
                                        value={formData1.appointmentDate}
                                        onChange={handleChange1}
                                      />
                                      <div className="invalid-feedback">
                                        {errors.appointmentDate}
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <label className="form-label">
                                        Appointment Type
                                      </label>
                                      <div className="d-flex align-items-center gap-3 mb-3">
                                        <label
                                          className="form-check-label d-flex align-items-center gap-2"
                                          style={{ cursor: "pointer" }}
                                        >
                                          <input
                                            type="radio"
                                            name="apptype"
                                            value="Waiting"
                                            onChange={handleChange1}
                                            style={{cursor:"pointer"}}
                                            checked={
                                              formData1.apptype === "Waiting"
                                            }
                                            // className="form-check-input"
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
                                            value="Emergency"
                                            onChange={handleChange1}
                                            style={{cursor:"pointer"}}
                                            checked={
                                              formData1.apptype === "Emergency"
                                            }
                                            // className="form-check-input"
                                          />
                                          Emergency
                                        </label>
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <label className="form-label">
                                        Start Time
                                      </label>
                                      <input
                                        type="time"
                                        className={`form-control ${
                                          errors.startTime ? "is-invalid" : ""
                                        }`}
                                        name="startTime"
                                        value={formData1.startTime}
                                        onChange={handleChange1}
                                      />
                                      <div className="invalid-feedback">
                                        {errors.startTime}
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">
                                        End Time
                                      </label>
                                      <input
                                        type="time"
                                        className={`form-control ${
                                          errors.endTime ? "is-invalid" : ""
                                        }`}
                                        name="endTime"
                                        value={formData1.endTime}
                                        onChange={handleChange1}
                                      />
                                      <div className="invalid-feedback">
                                        {errors.endTime}
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <label className="form-label">
                                        Notes
                                      </label>
                                      <input
                                        type="text"
                                        className={`form-control ${
                                          errors.reason ? "is-invalid" : ""
                                        }`}
                                        name="reason"
                                        value={formData1.reason}
                                        onChange={handleChange1}
                                        placeholder="Enter Notes"
                                      />
                                      <div className="invalid-feedback">
                                        {errors.reason}
                                      </div>
                                    </div>
                                    <div className="text-center">
                                      <button
                                        className="bgBtn"
                                        onClick={handleSubmit}
                                      >
                                        Add Appointment
                                      </button>
                                    </div>
                                  </div>
                                  <div className="modal-footer my-3">
                                    {/* <button */}
                                    {/* type="button"
                                            className="btn btn-primary"
                                            onClick={handlesavediagonise}
                                          >
                                            Add Diagonise
                                          </button> */}
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
              <div
                className="tab-pane fade"
                id="labs"
                role="labs"
                aria-labelledby="lab-tab"
              >
                <div className="col-12">
                
                        <div className="row">
                                <div className="col-12 searchParent">
                                  {/* <h5 className="">Service list</h5> */}
                                </div>
                                <div className="col-md-12">
                                  <div className="card table-card patientCardHeader">
                                    <div className="tableHeader">
                                      <div className="d-sm-flex align-items-center justify-content-between">
                                        <div className="tableSearch">
                                          <input
                                            type="text"
                                            placeholder="Search by name, or mobile"
                                            className="form-control"
                                            // value={searchTerm}
                                            // onChange={handleSearchChange}
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
                                        <div className="tableHeaderBtn">
                                          {/* <button className="borderBtn">Applied Student List</button> */}
                                          <button
                                            className="bgBtn"
                                             onClick={handleclickopentestadd}
                                          >
                                            <i className="fas fa-plus me-2"></i>
                                         Add Test
                                          </button>
                                          {/* <button className="export">
                                         
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="28"
                                              height="28"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              style={{ marginTop: 4, marginRight: 4, marginLeft: 4 }}
                                            >
                                              <path
                                                d="M9 17.75c-.1 0-.19-.02-.29-.06a.74.74 0 0 1-.46-.69v-6c0-.41.34-.75.75-.75s.75.34.75.75v4.19l.72-.72c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-2 2c-.14.14-.34.22-.53.22Z"
                                                fill="currentColor"
                                              />
                                              <path
                                                d="M9 17.751c-.19 0-.38-.07-.53-.22l-2-2a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2 2c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22Z"
                                                fill="currentColor"
                                              />
                                              <path
                                                d="M15 22.75H9c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h5c.41 0 .75.34.75.75s-.34.75-.75.75H9C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25v-5c0-.41.34-.75.75-.75s.75.34.75.75v5c0 5.43-2.32 7.75-7.75 7.75Z"
                                                fill="currentColor"
                                              />
                                              <path
                                                d="M22 10.748h-4c-3.42 0-4.75-1.33-4.75-4.75v-4c0-.3.18-.58.46-.69.28-.12.6-.05.82.16l8 8a.751.751 0 0 1-.53 1.28Zm-7.25-6.94v2.19c0 2.58.67 3.25 3.25 3.25h2.19l-5.44-5.44Z"
                                                fill="currentColor"
                                              />
                                            </svg>
                                          </button> */}
                                        </div>
                                      </div>
                                    </div>
                      
                                    <div className="card-body pb-0">
                                      <div className="table-responsive table-striped">
                                        <table className="table">
                                          <thead>
                                            <tr>
                                              <th>Code</th>
                                              <th>Service Name</th>
                                       
                                              <th>Duration</th>
                                              <th>Insurance Price</th>
                                              <th>Type</th>
                                              {/* <th>Primary Doctor</th>
                                              <th>Balance</th> */}
                                              <th className="text-center">Action</th>
                                            </tr>
                                          </thead>
                                          {/* <tbody>
                                            {data2.length > 0 ? (
                                              data2.map((item, index) => (
                                                <tr key={index}>
                                                  <td>{item.code}</td>
                                                  <td>{item.name}</td>
                                                  <td>{item.duration}</td>
                                                  <td>{item.insurance_price}</td>
                                                  <td>{item.type}</td>
                                                  <td>
                                                    <NavLink
                                                      to="/Admin/Manageappointment"
                                                      state={{ patientid: item }}
                                                      className="avtar avtar-xs btn-link-secondary viewIcon"
                                                    >
                                                      <i className="ti ti-eye f-20" />
                                                      <span>View</span>
                                                    </NavLink>
                                                    <a
                                                      href="#"
                                                      className="avtar avtar-xs btn-link-secondary editIcon"
                                                    >
                                                      <i className="ti ti-edit f-20" />
                                                    <span>Edit</span>
                                                    </a>
                                                    <div
                                                      style={{ cursor: "pointer" }}
                                                      className="avtar avtar-xs btn-link-secondary deleteIcon"
                                                      onClick={() => handledelete(item.id)}
                                                    >
                                                      <i className="ti ti-trash f-20" />
                                                      <span>Delete</span>
                                                    </div>
                                                  </td>
                                                </tr>
                                              ))
                                            ) : (
                                              <tr>
                                                <td colSpan="10" className="text-center">
                                                  No patients found.
                                                </td>
                                              </tr>
                                            )}
                                          </tbody> */}
                                        </table>
                                      </div>
                                      {/* Pagination */}
                                      {/* {totalPages > 1 && (
                                        <nav className="tablepagination">
                                          <ul className="pagination justify-content-end mb-0 me-3">
                                            <li
                                              className={`page-item ${
                                                currentPage === 1 ? "disabled" : ""
                                              }`}
                                            >
                                              <button
                                                className="page-link"
                                                onClick={() =>
                                                  currentPage > 1 && setCurrentPage(currentPage - 1)
                                                }
                                              >
                                                &laquo;
                                              </button>
                                            </li>
                                            <li className="pageNmbr">{totalPages}</li>
                                            <li
                                              className={`page-item ${
                                                currentPage === totalPages ? "disabled" : ""
                                              }`}
                                            >
                                              <button
                                                className="page-link"
                                                onClick={() =>
                                                  currentPage < totalPages &&
                                                  setCurrentPage(currentPage + 1)
                                                }
                                              >
                                                &raquo;
                                              </button>
                                            </li>
                                          </ul>
                                        </nav>
                                      )} */}
                                    </div>
                                    {openmodaltest && (
                                              <div
                                                className="modal fade show"
                                                style={{
                                                  backgroundColor: "rgba(81, 81, 81, 0.5)",
                                                  display: "block",
                                                }}
                                              >
                                                <div className="modal-dialog modal-lg">
                                                  <div className="modal-content">
                                                    <div className="modal-header">
                                                      <h5 className="modal-title">Add Test</h5>
                                                      <button
                                                        type="button"
                                                        className="btn-close"
                                                        onClick={closeModaladdtest}
                                                      ></button>
                                                    </div>
                                                    <div className="modal-body">
                                                      <div className="row">
                                                        <div className="col-md-6">
                                                          <label className="form-label">
                                                          Title
                                                          </label>
                                                          <input
                                                            type="text"
                                                            name="title"
                                                            onChange={handlechange}
                                                            placeholder="Enter Title"
                                                            className="form-control"
                                                          />
                                                        </div>
                                                        <div className="col-md-6">
                                                          <label className="form-label">
                                                            Description
                                                          </label>
                                                          <input
                                                            type="text"
                                                            name="description"
                                                            placeholder="Enter Description"
                                                            onChange={handlechange}
                                                            className="form-control"
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="row">
                                                           <div className="col-md-6">
                                                          <label className="form-label">
                                                            Select Lab
                                                          </label>
                                                          <select className="form-control py-2" name="category" onChange={handlechange}>
                                                           <option>Select</option>
                                                           {
                                                            data2 && data2 && data2.map((item,index)=>{
                                                              console.log(item)
                                                              return(
                                                                <>
                                                                <option key={index} value={item.id} >{item.lab_name}</option>
                                                                
                                                                </>
                                                              )
                                                            })
                                                           }
                                                          </select>
                                                        </div>
                                                        {/* <div className="col-md-6">
                                                          <label className="form-label">
                                                            Duration
                                                          </label>
                                                          <input
                                                            type="text"
                                                            name="durationMinutes"
                                                            placeholder="Enter Duration in Minutes"
                                                            onChange={handlechange}
                                                            className="form-control"
                                                          />
                                                        </div> */}
                                                      </div>
                                                      {/* <div className="row">
                                                        <div className="col-md-6">
                                                          <label className="form-label">
                                                            Standard Cost
                                                          </label>
                                                          <input
                                                            type="text"
                                                            name="standardCost"
                                                            onChange={handlechange}
                                                            placeholder="Enter Standard Cost"
                                                            className="form-control"
                                                          />
                                                        </div>
                                                        <div className="col-md-6">
                                                          <label className="form-label">
                                                            Secondary Cost
                                                          </label>
                                                          <input
                                                            type="text"
                                                            name="secondaryCost"
                                                            placeholder="Enter Secondary Cost"
                                                            onChange={handlechange}
                                                            className="form-control"
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="row">
                                                        <div className="col-md-6">
                                                          <label className="form-label">
                                                            Service Code
                                                          </label>
                                                          <input
                                                            type="text"
                                                            name="serviceCode"
                                                              placeholder="Enter Service Code"
                                                            onChange={handlechange}
                                                            className="form-control"
                                                          />
                                                        </div>
                                                        <div className="col-md-6">
                                                          <label className="form-label">
                                                            Insurance Cost
                                                          </label>
                                                          <input
                                                            type="text"
                                                            name="insuranceCost"
                                                              placeholder="Enter Insurance Cost"
                                                            onChange={handlechange}
                                                            className="form-control"
                                                          />
                                                        </div>
                                                      </div> */}
                      
                                                      <div className="modal-footer my-3 justify-content-center">
                                                        <button
                                                          type="button"
                                                          className="btn btn-primary"
                                                          onClick={handletest}
                                                        >
                                                          Add test
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
              <div
                className="tab-pane fade"
                id="vitalsings"
                role="tabpanel"
                aria-labelledby="vitalsings-tab"
              >
                <div className="col-12">
                  <div className="table-card patientCardHeader">
                    <div className=" borderShapeTab tableHeader">
                      <div className="d-sm-flex align-items-center justify-content-end ">
                        <div>
                          <button
                            className="bgBtn"
                            onClick={handleclickopenvital}
                          >
                            Add Vitals
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive mt-0 mb-0">
                        <table className="table table-hover" id="pc-dt-simple">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Time</th>
                              <th>Nurse</th>
                              <th>Respiratory Rate</th>
                              <th>spo2</th>
                              <th>Temp </th>
                              <th>RR </th>
                              <th>Weight</th>
                              <th>Height </th>
                              <th className="text-center">Action </th>
                            </tr>
                          </thead>
                          <tbody>
                            {vitaldatas &&
                              vitaldatas.length > 0 &&
                              vitaldatas.map((item, index) => {
                                // console.log(item);
                                return (
                                  <>
                                    <tr key={index}>
                                      <td>
                                        {new Date(
                                          item.recorded_at
                                        ).toLocaleDateString("en-GB")}
                                      </td>
                                      <td>
                                        {new Date(
                                          item.recorded_at
                                        ).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          second: "2-digit",
                                        })}
                                      </td>
                                      <td>{item.nurse}</td>
                                      <td>{item.blood_pressure}</td>
                                      <td>{item.respiratory_rate}</td>
                                      <td>{item.temperature}</td>
                                      <td>{item.respiratory_rate}</td>
                                      <td>{item.weight}</td>
                                      <td>{item.height}</td>
                                      <td className="text-center">
                                        {/* <a
                                          href="#"
                                          className="avtar avtar-xs btn-link-secondary viewIcon"
                                        >
                                          <i className="ti ti-eye f-20" />{" "}
                                          <span>View</span>
                                        </a> */}
                                        <a
                                          href="#"
                                          className="avtar avtar-xs btn-link-secondary editIcon"
                                        >
                                          <i className="ti ti-edit f-20" />{" "}
                                          <span>Edit</span>
                                        </a>
                                        <div
                                          onClick={() => {
                                            handleclickdeletevital(item.id);
                                          }}
                                          className="avtar avtar-xs btn-link-secondary deleteIcon"
                                        >
                                          <i className="ti ti-trash f-20" />
                                          <span>Delete</span>
                                        </div>
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {openVital && (
                  <div
                    className="modal fade show"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.5)",
                      display: "block",
                    }}
                  >
                    <div
                      className="modal-dialog modal-lg"
                      style={{ height: "650px" }}
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Add Vital</h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={handlecloseVital}
                          ></button>
                        </div>
                        <div className="container mt-4">
                          <div className="row">
                            <div className="d-flex justify-content-center">
                              <div className="col-3">
                                Name:{" "}
                                {location?.state?.patientid?.firstName +
                                  " " +
                                  location?.state?.patientid?.lastName}
                                <br />
                                Nurse:{userddertails?.role}
                                <br />
                                Doctor:
                                {location?.state?.patientid?.Primary_Doctor}
                              </div>
                              <div className="col-7"></div>
                              Age:{location?.state?.patientid?.age}
                              <br />
                              Date:{date}
                              <br />
                              Time:{time}
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">
                                Systolic (40-300):
                              </label>
                              <input
                                type="number"
                                name="systolic"
                                min={40}
                                max={200}
                                value={formData?.systolic}
                                onChange={handleChange}
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">
                                Diastolic (20-180):
                              </label>
                              <input
                                type="number"
                                name="diastolic"
                                value={formData?.diastolic}
                                onChange={handleChange}
                                min={20}
                                max={180}
                                // style={getColorStyle(
                                //   getColorCode("diastolic", formData.diastolic)
                                // )}
                                className="form-control"
                              />
                            </div>
                            <div className="col-12 mb-3">
                              <label className="form-label">BP Position:</label>
                              <br />
                              {[
                                "Right Arm",
                                "Left Arm",
                                "Right Leg",
                                "Left Leg",
                              ].map((pos) => (
                                <label className="me-3" key={pos}>
                                  <input
                                    type="radio"
                                    name="bpPosition" // All radios must share the same name
                                    value={pos}
                                    style={{cursor:"pointer"}}
                                    // className="form-label"
                                    checked={formData?.bpPosition === pos}
                                    onChange={handleChange}
                                  />{" "}
                                  <span className="form-label">{pos}</span>
                                </label>
                              ))}
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">
                                Respiratory Rate (5-50):
                              </label>
                              <input
                                type="number"
                                name="respiratoryRate"
                                value={formData.respiratoryRate}
                                onChange={handleChange}
                                className="form-control"
                                min="5"
                                max="50"
                                step="1"
                                // style={getColorStyle(
                                //   getColorCode(
                                //     "respiratoryRate",
                                //     formData.respiratoryRate
                                //   )
                                // )}
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">
                                Pulse (10-400 BPM):
                              </label>
                              <input
                                type="number"
                                name="pulse"
                                value={formData.pulse}
                                onChange={handleChange}
                                className="form-control"
                                min="10"
                                max="400"
                                step="1"
                                // style={getColorStyle(
                                //   getColorCode("pulse", formData.pulse)
                                // )}
                              />
                            </div>

                            <div className="col-md-6 mb-3">
                              <label className="form-label">
                                Temperature (10-600) (°C):
                              </label>
                              <input
                                type="number"
                                name="temperature"
                                value={formData.temperature}
                                onChange={handleChange}
                                className="form-control"
                                min="10"
                                max="60"
                                step="0.1"
                                // style={getColorStyle(
                                //   getColorCode(
                                //     "temperature",
                                //     formData.temperature
                                //   )
                                // )}
                              />
                            </div>

                            <div className="col-md-6 mb-3">
                              <label className="form-label">
                                SpO2 (0-100) (%):
                              </label>
                              <input
                                type="number"
                                name="spO2"
                                value={formData.spO2}
                                onChange={handleChange}
                                className="form-control"
                                min="0"
                                max="100"
                                step="1"
                                // style={getColorStyle(
                                //   getColorCode("spO2", formData.spO2)
                                // )}
                              />
                            </div>

                            <div className="col-md-6 mb-3">
                              <label className="form-label">
                                RBS (10-800) (mg/dl):
                              </label>
                              <input
                                type="number"
                                name="rbsMg"
                                value={formData.rbsMg}
                                onChange={handleChange}
                                className="form-control"
                                min="10"
                                max="800"
                                step="1"
                                // style={getColorStyle(
                                //   getColorCode("rbsMg", formData.rbsMg)
                                // )}
                              />
                            </div>

                            <div className="col-md-6 mb-3">
                              <label className="form-label">
                                RBS (0.5-50) (mmol/l):
                              </label>
                              <input
                                type="number"
                                name="rbsMmol"
                                value={formData.rbsMmol}
                                onChange={handleChange}
                                className="form-control"
                                min="0.5"
                                max="50"
                                step="0.1"
                                // style={getColorStyle(
                                //   getColorCode("rbsMmol", formData.rbsMmol)
                                // )}
                              />
                            </div>

                            <div className="col-md-6 mb-3">
                              <label className="form-label">
                                Weight (0-1000) (kg):
                              </label>
                              <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="form-control"
                                min="0"
                                max="1000"
                                step="0.1"
                                // style={getColorStyle(
                                // getColorCode("weight", formData.weight)
                                // )}
                              />
                            </div>

                            <div className="col-md-6 mb-3">
                              <label className="form-label">
                                Height (0-300) (cm):
                              </label>
                              <input
                                type="number"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                className="form-control"
                                min="0"
                                max="300"
                                step="0.1"
                                // style={getColorStyle(
                                //   getColorCode("height", formData.height)
                                // )}
                              />
                            </div>

                            <div className="col-md-6 mb-3">
                              <label className="form-label">
                                BMI (auto-calculated):
                              </label>
                              <input
                                type="text"
                                value={calculateBMI()}
                                readOnly
                                className="form-control bg-light"
                              />
                            </div>
                            {/* <div className="col-md-6 mb-3">
                              <label>Risk of Fall:</label>
                              <br />
                              {["Low", "Medium", "High"].map((option) => (
                                <label className="me-3" key={option}>
                                  <input
                                    type="radio"
                                    name="riskOfFall"
                                    value={option}
                                    checked={formData.riskOfFall === option}
                                    onChange={handleChange}
                                  />{" "}
                                  {option}
                                </label>
                              ))}
                            </div> */}
                            <div className="col-md-6 mb-3">
                              <label className="form-label form-label">
                                Risk of Fall:
                              </label>
                              <br />
                              {["Low", "Medium", "High"].map((option) => {
                                // Determine color class based on the option and selection
                                const getColorClass = () => {
                                  if (formData.riskOfFall !== option) return "";
                                  if (option === "High") return "text-danger"; // Red
                                  if (option === "Medium")
                                    return "text-success"; // Green
                                  if (option === "Low") return "text-warning"; // Yellow
                                };

                                return (
                                  <label
                                    className={`me-3 form-label ${getColorClass()}`}
                                    key={option}
                                  >
                                    <input
                                      type="radio"
                                      name="riskOfFall"
                                      value={option}
                                      checked={formData.riskOfFall === option}
                                      onChange={handleChange}
                                    />{" "}
                                    <span className="form-label">{option}</span>
                                  </label>
                                );
                              })}
                            </div>

                            {/* <div className="col-md-6 mb-3">
                              <label>Urgency:</label>
                              <br />
                              {["Normal", "Moderate", "High"].map((option) => (
                                <label className="me-3" key={option}>
                                  <input
                                    type="radio"
                                    name="urgency"
                                    value={option}
                                    checked={formData.urgency === option}
                                    onChange={handleChange}
                                  />{" "}
                                  {option}
                                </label>
                              ))}
                            </div> */}
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Urgency:</label>
                              <br />
                              {["Normal", "Moderate", "High"].map((option) => {
                                // Determine color class for selected option
                                const getColorClass = () => {
                                  if (formData.urgency !== option) return "";
                                  if (option === "High") return "text-danger"; // Red
                                  if (option === "Moderate")
                                    return "text-warning"; // Yellow
                                  if (option === "Normal")
                                    return "text-success"; // Green
                                };

                                return (
                                  <label
                                    className={`me-3 form-label ${getColorClass()}`}
                                    key={option}
                                  >
                                    <input
                                      type="radio"
                                      name="urgency"
                                      value={option}
                                      checked={formData.urgency === option}
                                      onChange={handleChange}
                                    />{" "}
                                    {option}
                                  </label>
                                );
                              })}
                            </div>

                            <div className="col-12 mb-3">
                              <label className="form-label">Notes:</label>
                              <textarea
                                name="notes"
                                rows="3"
                                className="form-control"
                                value={formData?.notes}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="d-flex justify-content-center">
                            <button
                              type="submit"
                              onClick={handleapisubmit}
                              className="btn btn-primary"
                            >
                              Add Vital
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="tab-pane fade"
                id="medicalhistory"
                role="tabpanel"
                aria-labelledby="medicalhistory-tab"
              >
                <div className="col-12">
                  <div className="table-card">
                    <div className="card-header">
                      <div className="d-sm-flex align-items-center justify-content-between">
                        {/* <h5 className="mb-3 mb-sm-0">Insurance </h5> */}
                        {/* <div><a href="../admins/course-teacher-apply.html" className="btn btn-outline-secondary">Apply Teacher List</a> <a href="../admins/course-teacher-add.html" className="btn btn-primary">Add Teacher</a></div> */}
                      </div>
                    </div>
                    <div>
                      <div className="row mt-4">
                        {/* Visit History */}
                        <div className="col-md-5 mb-4">
                          <div className="card h-100">
                            <div className="card-header">Visit History</div>
                            <div className="table-responsive p-0 mt-0">
                              <table className="table table-sm mb-0">
                                <thead className="table-light">
                                  <tr>
                                    <th>Date</th>
                                    <th>Doctor</th>
                                    <th>Notes</th>
                                    <th>Service</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    {tableCell("xx/xx/yy")}
                                    {tableCell("Dr Ali")}
                                    {tableCell("Consultation Visit for RCT")}
                                    {tableCell("RCT #1 Molar")}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        {/* Diagnosis */}
                        <div className="col-md-4 mb-4">
                          <div className="card h-100">
                            <div className="card-header d-flex justify-content-between">
                              <span>Diagnosis (ICD-10)</span>
                              <button className=" iconAdd">
                                <i
                                  class="fas fa-plus"
                                  onClick={handlemodaldiagonise}
                                ></i>
                              </button>
                            </div>
                            <div className="p-0 table-responsive mt-0">
                              <table className="table table-sm mb-0 ">
                                <thead className="table-light">
                                  <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Dated</th>
                                    <th>Notes</th>
                                    <th>Edit</th>
                                  </tr>
                                </thead>
                                <table>
                                  <thead></thead>
                                  <tbody>
                                    {Array.isArray(diagnosis11) &&
                                    diagnosis11.length > 0 ? (
                                      diagnosis11.map((item, index) => (
                                        <tr key={index}>
                                          <td>{item.name_en}</td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan={1}>No Diagnosis Found</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </table>
                              {diagonisemodal && (
                                <div
                                  className="modal fade show"
                                  style={{
                                    backgroundColor: "rgba(63, 26, 26, 0.5)",
                                    display: "block",
                                  }}
                                >
                                  <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title">
                                          Add Diagnosis
                                        </h5>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          onClick={hndleclosddddd}
                                        ></button>
                                      </div>
                                      <div className="modal-body">
                                        {/* Form for adding doctor */}
                                        <div className="row">
                                          <div className="col-md-6">
                                            <label className="form-label">
                                              Doctor
                                            </label>
                                            <select
                                              name="doctor_id"
                                              onChange={handlechange}
                                              className="form-control"
                                            >
                                              <option>Select</option>
                                              {doctors &&
                                                doctors.length > 0 &&
                                                doctors.map((items, index) => {
                                                  console.log(items);
                                                  return (
                                                    <option
                                                      key={index}
                                                      value={items.id}
                                                    >
                                                      {items.fullName}
                                                    </option>
                                                  );
                                                })}
                                            </select>
                                          </div>
                                          <div className="col-md-6">
                                            <label className="form-label">
                                              Diagnosis
                                            </label>
                                            <select
                                              name="icd10_id"
                                              onChange={handlechange}
                                              className="form-control"
                                            >
                                              <option
                                                style={{ width: "300px" }}
                                              >
                                                Select
                                              </option>
                                              {diagnosis &&
                                                diagnosis.length > 0 &&
                                                diagnosis.map(
                                                  (items, index) => {
                                                    console.log(items);
                                                    return (
                                                      <option
                                                        style={{
                                                          width: "300px",
                                                        }}
                                                        value={items.id}
                                                      >
                                                        {items.code} /{" "}
                                                        {items.name_en}
                                                      </option>
                                                    );
                                                  }
                                                )}
                                            </select>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <label className="form-label">
                                              Diagnosis Date
                                            </label>
                                            <input
                                              type="date"
                                              name="diagnosis_date"
                                              onChange={handlechange}
                                              className="form-control"
                                            />
                                          </div>
                                          <div className="col-md-6">
                                            <label className="form-label">
                                              Notes
                                            </label>
                                            <input
                                              type="text"
                                              name="notes"
                                              placeholder="Enter notes"
                                              onChange={handlechange}
                                              className="form-control"
                                            />
                                          </div>
                                        </div>
                                        <div className="modal-footer my-3">
                                          <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={handlesavediagonise}
                                          >
                                            Add Diagonise
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
                        {/* Allergies */}
                        <div className="col-md-3 mb-4">
                          <div className="card h-100">
                            <div className="card-header d-flex justify-content-between">
                              <span>Allergies</span>
                              <button className="iconAdd">
                                <i class="fas fa-plus"></i>
                              </button>
                            </div>
                            <div className="table-responsive p-0 mt-0 mt-0">
                              <table className="table table-sm mb-0">
                                <thead className="table-light">
                                  <tr>
                                    <th>Sn</th>
                                    <th>Allergy</th>
                                    <th>Reaction</th>
                                    <th>Reaction</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {[...Array(3)].map((_, i) => (
                                    <tr key={i}>
                                      {tableCell(i + 1)}
                                      {tableCell("Penicillin")}
                                      {tableCell("N/A")}
                                      {tableCell("Active")}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {/* Chief Complaints */}
                        <div className="col-md-5 mb-4">
                          <div className="card h-100">
                            <div className="card-header d-flex justify-content-between">
                              <span>Chief Complaints</span>
                              <button className="iconAdd">
                                <i class="fas fa-plus"></i>
                              </button>
                            </div>
                            <div className="table-responsive p-0 mt-0 mt-0">
                              <table className="table table-sm mb-0">
                                <thead className="table-light">
                                  <tr>
                                    <th>Date</th>
                                    <th>Doctor</th>
                                    <th>Complaint</th>
                                    <th>Area</th>
                                    <th>Vitals</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {[...Array(3)].map((_, i) => (
                                    <tr key={i}>
                                      {tableCell("xx/xx/yy")}
                                      {tableCell("Dr Ali")}
                                      {tableCell("Migraine")}
                                      {tableCell("Head")}
                                      {tableCell("Open")}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        {/* Prescription */}
                        <div className="col-md-4 mb-4">
                          <div className="card h-100">
                            <div className="card-header">Prescription</div>
                            <div className="table-responsive p-0 mt-0 mt-0">
                              <table className="table table-sm mb-0">
                                <thead className="table-light">
                                  <tr>
                                    <th>Date</th>
                                    <th>Doctor</th>
                                    <th>Drugs</th>
                                    <th className="text-center">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {[...Array(2)].map((_, i) => (
                                    <tr key={i}>
                                      {tableCell("dd/mm/yy")}
                                      {tableCell("Dr Morson")}
                                      {tableCell("Paracetamol & Brufen")}
                                      <td className="text-center">
                                        <div className="tableIcon">
                                          <a href="" className="editIcon">
                                            <i className="fas fa-pencil-alt me-2"></i>
                                            <span>Edit</span>
                                          </a>
                                          <a href="" className="deleteIcon">
                                            <i className="fas fa-trash"></i>
                                            <span>Delete</span>
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 mb-4">
                          <div className="card h-100">
                            <div className="card-header d-flex justify-content-between">
                              <span>X-Ray & Radiology</span>
                              <button className="iconAdd">
                                <i class="fas fa-plus"></i>
                              </button>
                            </div>
                            <div className="table-responsive p-0 mt-0 mt-0">
                              <table className="table table-sm mb-0">
                                <thead className="table-light">
                                  <tr>
                                    <th>Date</th>
                                    <th>File</th>
                                    <th>Type</th>
                                    <th>View</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {[...Array(3)].map((_, i) => (
                                    <tr key={i}>
                                      {tableCell("xx/xx/yy")}
                                      {tableCell("MRI")}
                                      {tableCell("Scan")}
                                      {tableCell("Scan")}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="card h-100">
                            <div className="card-header d-flex justify-content-between">
                              <span>Lab Test</span>
                              <button className="iconAdd">
                                <i class="fas fa-plus"></i>
                              </button>
                            </div>
                            <div className="table-responsive mt-0 p-0">
                              <table className="table table-sm mb-0">
                                <thead className="table-light">
                                  <tr>
                                    <th>Date</th>
                                    <th>Doctor</th>
                                    <th>Complaint</th>
                                    <th>Area</th>
                                    <th>Vitals</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {[...Array(2)].map((_, i) => (
                                    <tr key={i}>
                                      {tableCell("xx/xx/yy")}
                                      {tableCell("Dr Ali")}
                                      {tableCell("Migraine")}
                                      {tableCell("Head")}
                                      {tableCell("Open")}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        {["Attachment", "Consent Form", "Medical report"].map(
                          (title, i) => (
                            <div className="col-md-2 mb-4" key={i}>
                              <div className="card h-100">
                                <div
                                  className="card-header text-white"
                                  style={{
                                    background: "#1f6fb8",
                                    borderRadius: "20px 20px 0px 0px",
                                  }}
                                >
                                  {title}
                                </div>
                                <div className="card-body table-responsive text-center text-muted">
                                  No Data
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="service"
                role="tabpanel"
                aria-labelledby="service-tab"
              >
                <div className="col-12">
                  <div className="table-card patientCardHeader ">
                    <div className="tableHeader">
                      <div className="d-sm-flex align-items-center justify-content-end">
                        <button
                          className="bgBtn me-2 my-2"
                          onClick={handleclickopenvital11}
                        >
                          Add Services
                        </button>
                      </div>
                    </div>
                    {openVital121 && (
                      <div
                        className="modal fade show"
                        style={{
                          backgroundColor: "rgba(66, 62, 62, 0.5)",
                          display: "block",
                        }}
                      >
                        <div className="modal-dialog modal-md">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Add Services</h5>
                              <button
                                type="button"
                                className="btn-close"
                                onClick={hndleclosemodalservice}
                              ></button>
                            </div>
                            <div className="modal-body">
                              <label className="form-label">Service</label>
                              <select
                                name="service_id"
                                onChange={handlechange}
                                className="form-select"
                              >
                                <option value="">Select Service</option>
                                {getservice && getservice.length > 0 ? (
                                  getservice.map((item, index) => (
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  ))
                                ) : (
                                  <option value="">
                                    No Services Available
                                  </option>
                                )}
                              </select>
                              <label className="form-label mt-2">
                                Select Doctor
                              </label>
                              <select
                                name="doctor_id"
                                onChange={handlechange}
                                className="form-select"
                              >
                                <option value="">Select Doctor</option>
                                {doctors && doctors.length > 0 ? (
                                  doctors.map((item, index) => (
                                    <option key={index} value={item.id}>
                                      {item.fullName}
                                    </option>
                                  ))
                                ) : (
                                  <option value="">
                                    No Services Available
                                  </option>
                                )}
                              </select>
                              <div className="col-md-12">
                                <label className="form-label">Amount</label>
                                <input
                                  type="text"
                                  name="amount"
                                  placeholder="Enter Amount"
                                  className="form-control"
                                  onChange={handlechange}
                                />
                              </div>
                              <div className="col-md-12">
                                <label className="form-label">Insurance</label>
                                <input
                                  type="text"
                                  name="insurance"
                                  placeholder="Insurance"
                                  className="form-control"
                                  onChange={handlechange}
                                />
                              </div>
                              <div className="col-md-12">
                                <label className="form-label">VAT</label>
                                <input
                                  type="text"
                                  name="vat"
                                  placeholder="Enter VAT"
                                  className="form-control"
                                  onChange={handlechange}
                                />
                              </div>
                              <div className="modal-footer my-3">
                                <button
                                  type="button"
                                  className="borderBtn"
                                  onClick={handlesavevital123}
                                >
                                  Add Service
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="card-body pb-0">
                      <div className="table-responsive table-striped">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Code</th>
                              <th>Service</th>
                              <th>Insurance</th>
                              <th>Duration</th>
                              <th>type</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {patientservice && patientservice.length > 0 ? (
                              patientservice.map((item, index) => {
                                console.log(item);
                                return (
                                  <tr key={index}>
                                    <td>{item.serviceCode}</td>
                                    <td>{item.serviceName}</td>
                                    <td>{item.insurance || "-"}</td>
                                    <td>{item.durationMinutes || "-"}</td>
                                    <td>{item.type || "-"}</td>
                                    <td className="text-center">
                                      <div className="tableIcon">
                                        <a href="" className="editIcon">
                                          <i className="fas fa-pencil-alt me-2"></i>
                                          <span>Edit</span>
                                        </a>
                                        <a href="" className="editIcon">
                                          <i className="fas fa-trash"></i>
                                          <span>Delete</span>
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colSpan="6" className="text-center">
                                  No services found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="dental"
                  role="tabpanel"
                  aria-labelledby="dental-tab"
                >
                  <h4>Dental Tab</h4>
                  <p>3d view</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
