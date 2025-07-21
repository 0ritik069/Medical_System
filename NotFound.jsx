

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../../Baseurl";
import Swal from "sweetalert2";

export default function EditInventory() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    substance: "",
    unit_of_measurement: "",
    company: "",
    quality: "",
    expiration_date: "",
    cost: "",
    price: "",
    category: "",
    strength: "",
  });

  // 🟡 useEffect to populate formData if passed via navigation state
  useEffect(() => {
    if (location.state?.drug) {
      setFormData({ ...location.state.drug });
    }
  }, [location.state]);

  // 🔵 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // 🔴 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${baseurl}/updateInventory/${formData.id}`, // use `id` from formData
        formData
      );

      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        text: response.data.message,
        timer: 2000,
      });

      navigate("/Admin/InventoryList");
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update inventory.",
      });
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Edit Inventory Item</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Add more input fields in the same way as below */}
        <div className="mb-3">
          <label className="form-label">Substance:</label>
          <input
            type="text"
            className="form-control"
            name="substance"
            value={formData.substance}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Company:</label>
          <input
            type="text"
            className="form-control"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        {/* Repeat for other fields like price, cost, category, etc. */}

        <button type="submit" className="btn btn-primary">
          Update Inventory
        </button>
      </form>
    </div>
  );
}
