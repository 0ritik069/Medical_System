import React, { useState } from "react";
import axios from "axios";
import { baseurl } from "../../Baseurl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddInventory() {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${baseurl}/addInventory`, formData);

      if (response.data.success) {
        Swal.fire("Success", "Inventory item added successfully!", "success");
        navigate("/Admin/InventoryList"); // Adjust route if needed
      } else {
        Swal.fire("Error", response.data.message || "Something went wrong", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server error while adding inventory", "error");
      console.error(error);
    }
  };

  return (
    // <div className="container mt-4">
    //   <h5 className="mb-4">Add Inventory Item</h5>

    //   <div className="row">
    //     {[
    //       { label: "Name", name: "name" },
    //       { label: "Substance", name: "substance" },
    //       { label: "Unit of Measurement", name: "unit_of_measurement" },
    //       { label: "Company", name: "company" },
    //       { label: "Quality", name: "quality" },
    //       { label: "Expiration Date", name: "expiration_date", type: "date" },
    //       { label: "Cost", name: "cost", type: "number" },
    //       { label: "Price", name: "price", type: "number" },
    //       { label: "Category", name: "category" },
    //       { label: "Strength", name: "strength" },
    //     ].map((field) => (
    //       <div className="col-md-6 mb-3" key={field.name}>
    //         <label className="form-label">{field.label}</label>
    //         <input
    //           type={field.type || "text"}
    //           name={field.name}
    //           value={formData[field.name]}
    //           onChange={handleChange}
    //           className="form-control"
    //         />
    //       </div>
    //     ))}
    //   </div>

    //   <button className="btn btn-primary" onClick={handleSubmit}>
    //     Submit
    //   </button>
    // </div>
    <div className="pc-container">
      <div className="pc-content">
        <div className="col-12">
          <div className="card table-card">
            <div className="tableHeader">
              <div className="d-sm-flex align-items-center justify-content-between">
                <h5>Add Inventory Item</h5>
              </div>
            </div>

            {/* Success Alert (optional) */}
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
              {[
                { label: "Name", name: "name" },
                { label: "Substance", name: "substance" },
                { label: "Unit of Measurement", name: "unit_of_measurement" },
                { label: "Company", name: "company" },
                { label: "Quality", name: "quality" },
                {
                  label: "Expiration Date",
                  name: "expiration_date",
                  type: "date",
                },
                { label: "Cost", name: "cost", type: "number" },
                { label: "Price", name: "price", type: "number" },
                { label: "Category", name: "category" },
                { label: "Strength", name: "strength" },
              ].map((field) => (
                <div className="col-md-6" key={field.name}>
                  <label className="form-label">{field.label}</label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="form-control"
                    placeholder={field.label}
                  />
                  {errors && errors[field.name] && (
                    <p className="text-danger">{errors[field.name]}</p>
                  )}
                </div>
              ))}

              {/* Optional: File upload field if needed in future */}
              {/* <div className="col-md-6">
            <label className="form-label">Upload File</label>
            <input
              type="file"
              name="itemFile"
              className="form-control"
              onChange={handleFileChange}
            />
          </div> */}

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
