import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../../Baseurl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddInventory() {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null); 
  const [categories, setCategories] = useState([]); // <-- Add this

  const [formData, setFormData] = useState({
    name: "",
    substance: "",
    unit_of_measurement: "",
    company: "",
    quantity: "",
    expiration_date: "",
    cost: "",
    price: "",
    category: "",
    strength: "",
  });

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${baseurl}getAllCategories`);
        if (res.data.success && Array.isArray(res.data.data)) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const validate = () => {
    const err = {};
    if (!formData.name.trim()) err.name = "Name is required";
    if (!formData.substance.trim()) err.substance = "Substance is required";
    if (!formData.unit_of_measurement.trim()) err.unit_of_measurement = "Unit is required";
    if (!formData.company.trim()) err.company = "Company is required";
    if (!formData.quantity.trim()) err.quantity = "Quantity is required";
    if (!formData.expiration_date.trim()) err.expiration_date = "Expiration date is required";
    if (!formData.cost || isNaN(formData.cost)) err.cost = "Cost must be a number";
    if (!formData.price || isNaN(formData.price)) err.price = "Price must be a number";
    if (!formData.category) err.category = "Category is required";
    if (!formData.strength.trim()) err.strength = "Strength is required";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const foundErrors = validate();
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      setSubmitted(false);
      return;
    }

    try {
      const data = new FormData();

      // Append form fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Append image if available
      if (imageFile) {
        data.append("image", imageFile);
      }

      console.log("Submitting data:");
      for (let pair of data.entries()) {
        console.log(pair[0]+ ': ' + pair[1]);
      }

      const response = await axios.post(`${baseurl}addDrug`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        Swal.fire("Success", "Inventory item added successfully!", "success");
        navigate("/Admin/Pharmacy");
      } else {
        Swal.fire("Error", response.data.message || "Something went wrong", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server error while adding inventory", "error");
      console.error(error);
    }
  };

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="col-12">
          <div className="card table-card">
            <div className="tableHeader">
              <h5 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{ cursor: 'pointer', color: '#007bff', fontWeight: 'bold', fontSize: '1.5rem' }}
                  onClick={() => navigate(-1)}
                  title="Back"
                >
                  &larr;
                </span>
                Add Inventory Item
              </h5>
            </div>

            {submitted && (
              <div className="alert alert-success">
                Inventory item added successfully!
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="row g-3 px-3 py-2 mb-3"
            >
              {/* Render all fields except category as before */}
              {["name", "substance", "unit_of_measurement", "company", "quantity", "expiration_date", "cost", "price", "strength"].map((field) => (
                <div className="col-md-6" key={field}>
                  <label className="form-label">{field.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</label>
                  <input
                    type={field === "expiration_date" ? "date" : (field === "cost" || field === "price" ? "number" : "text")}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="form-control"
                    placeholder={field.replace(/_/g, " ")}
                  />
                  {errors && errors[field] && (
                    <p className="text-danger">{errors[field]}</p>
                  )}
                </div>
              ))}

              {/* Category Dropdown */}
              <div className="col-md-6">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors && errors.category && (
                  <p className="text-danger">{errors.category}</p>
                )}
              </div>

              {/* Image Upload */}
              <div className="col-md-6">
                <label className="form-label">Upload Image</label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>

              <div className="col-12 mb-3 text-center">
                <button type="submit" className="bgBtn">
                  Add Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}