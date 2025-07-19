import React, { useState } from "react";
import axios from "axios";
import { baseurl } from "../../Baseurl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddRxList() {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    medicine_name: "",
    strength: "",
    unit: "",
    pharmaceutical_form: "",
    frequency: "",
    duration: "",
    notes: "",
    route: "",
    product_type: "",
    active_substances: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const requiredFields = [
      "medicine_name",
      "strength",
      "unit",
      "pharmaceutical_form",
      "frequency",
      "duration",
      "notes",
      "route",
      "product_type",
      "active_substances",
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/_/g, " ")} is required`;
      }
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }

    try {
      const response = await axios.post(`${baseurl}/addRxList`, formData);
      if (response.data.success) {
        setSubmitted(true);
        Swal.fire("Success", "RX Item added successfully!", "success");
        navigate("/Admin/RxList"); // Adjust route if needed
      } else {
        Swal.fire("Error", response.data.message || "Something went wrong", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Server error while adding RX item", "error");
    }
  };

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="col-12">
          <div className="card table-card">
            <div className="tableHeader">
              <div className="d-sm-flex align-items-center justify-content-between">
                <h5>Add RX List Item</h5>
              </div>
            </div>

            {submitted && (
              <div className="alert alert-success">
                RX item added successfully!
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="row g-3 px-3 py-2 mb-3"
            >
              {[
                { label: "Medicine Name", name: "medicine_name" },
                { label: "Strength", name: "strength" },
                { label: "Unit", name: "unit" },
                { label: "Pharmaceutical Form", name: "pharmaceutical_form" },
                { label: "Frequency", name: "frequency" },
                { label: "Duration", name: "duration" },
                { label: "Notes", name: "notes" },
                { label: "Route", name: "route" },
                { label: "Product Type", name: "product_type" },
                { label: "Active Substances", name: "active_substances" },
              ].map((field) => (
                <div className="col-md-6" key={field.name}>
                  <label className="form-label">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="form-control"
                    placeholder={field.label}
                  />
                  {errors[field.name] && (
                    <p className="text-danger">{errors[field.name]}</p>
                  )}
                </div>
              ))}

              <div className="col-12 mb-3 text-center">
                <button type="submit" className="bgBtn">
                  Add RX Item
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
