import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../../Baseurl";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function EditInventory() {
  const location = useLocation();
  const data = location.state?.inventoryItem;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: data?.name || "",
    substance: data?.substance || "",
    unit_of_measurement: data?.unit_of_measurement || "",
    company: data?.company || "",
    quality: data?.quality || "",
    expiration_date: data?.expiration_date || "",
    cost: data?.cost || "",
    price: data?.price || "",
    category: data?.category || "",
    strength: data?.strength || "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const err = {};
    if (!formData.name.trim()) err.name = "Name is required";
    if (!formData.substance.trim()) err.substance = "Substance is required";
    if (!formData.unit_of_measurement.trim()) err.unit_of_measurement = "Unit is required";
    if (!formData.company.trim()) err.company = "Company is required";
    if (!formData.quality.trim()) err.quality = "Quality is required";
    if (!formData.expiration_date.trim()) err.expiration_date = "Expiration date is required";
    if (!formData.cost || isNaN(formData.cost)) err.cost = "Cost must be a number";
    if (!formData.price || isNaN(formData.price)) err.price = "Price must be a number";
    if (!formData.category.trim()) err.category = "Category is required";
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
      const response = await axios.put(`${baseurl}updateInventory/${data.id}`, formData);
      if (response.data.success === true) {
        setSubmitted(true);
        Swal.fire("Success!", "Inventory updated successfully!", "success");
        toast.success("Inventory updated successfully!");
        navigate("/Admin/inventory");
      } else {
        alert("Update failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Update failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="col-12">
          <div className="card table-card">
            <div className="tableHeader">
              <div className="d-sm-flex align-items-center justify-content-between">
                <h5>Edit Inventory</h5>
              </div>
            </div>

            {submitted && (
              <div className="alert alert-success">Inventory updated successfully!</div>
            )}

            <form onSubmit={handleSubmit} className="row g-3 px-3 py-2 mb-3">

              <div className="col-md-6">
                <label className="form-label">Item Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-danger">{errors.name}</p>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Substance</label>
                <input
                  type="text"
                  name="substance"
                  className="form-control"
                  value={formData.substance}
                  onChange={handleChange}
                />
                {errors.substance && <p className="text-danger">{errors.substance}</p>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Unit of Measurement</label>
                <input
                  type="text"
                  name="unit_of_measurement"
                  className="form-control"
                  value={formData.unit_of_measurement}
                  onChange={handleChange}
                />
                {errors.unit_of_measurement && <p className="text-danger">{errors.unit_of_measurement}</p>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Company</label>
                <input
                  type="text"
                  name="company"
                  className="form-control"
                  value={formData.company}
                  onChange={handleChange}
                />
                {errors.company && <p className="text-danger">{errors.company}</p>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Quality</label>
                <input
                  type="text"
                  name="quality"
                  className="form-control"
                  value={formData.quality}
                  onChange={handleChange}
                />
                {errors.quality && <p className="text-danger">{errors.quality}</p>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Expiration Date</label>
                <input
                  type="date"
                  name="expiration_date"
                  className="form-control"
                  value={formData.expiration_date}
                  onChange={handleChange}
                />
                {errors.expiration_date && <p className="text-danger">{errors.expiration_date}</p>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Cost</label>
                <input
                  type="number"
                  name="cost"
                  className="form-control"
                  value={formData.cost}
                  onChange={handleChange}
                />
                {errors.cost && <p className="text-danger">{errors.cost}</p>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={formData.price}
                  onChange={handleChange}
                />
                {errors.price && <p className="text-danger">{errors.price}</p>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                />
                {errors.category && <p className="text-danger">{errors.category}</p>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Strength</label>
                <input
                  type="text"
                  name="strength"
                  className="form-control"
                  value={formData.strength}
                  onChange={handleChange}
                />
                {errors.strength && <p className="text-danger">{errors.strength}</p>}
              </div>

              <div className="col-12 text-center">
                <button type="submit" className="bgBtn">Update Inventory</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
