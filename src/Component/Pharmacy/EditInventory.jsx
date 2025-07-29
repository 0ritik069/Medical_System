import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../../Baseurl";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function EditInventory() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    _id: "",
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
    image: "", 
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const drug = location.state?.drug;
    if (drug) {
      setFormData({ ...drug });
    }
    fetchCategories(); 
  }, [location.state]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

      // Append all text fields except barcode (barcode should not be editable)
      Object.keys(formData).forEach((key) => {
        if (key !== 'barcode') {
          data.append(key, formData[key]);
        }
      });

      // Append image only if selected
      if (imageFile) {
        data.append("image", imageFile);
      }

      const response = await axios.put(`${baseurl}updateDrug/${formData.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success === true) {
        setSubmitted(true);
        Swal.fire("Success!", "Inventory updated successfully!", "success");
        toast.success("Inventory updated successfully!");
        navigate("/Admin/Pharmacy");
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
              <h5 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{ cursor: 'pointer', color: '#007bff', fontWeight: 'bold', fontSize: '1.5rem' }}
                  onClick={() => navigate(-1)}
                  title="Back"
                >
                  &larr;
                </span>
                Edit Inventory
              </h5>
            </div>

            {submitted && (
              <div className="alert alert-success">Inventory updated successfully!</div>
            )}

            <form onSubmit={handleSubmit} className="row g-3 px-3 py-2 mb-3">
              {/* Render all fields except category as before */}
              {["name", "substance", "unit_of_measurement", "company", "quantity", "expiration_date", "cost", "price", "strength"].map((field) => (
                <div className="col-md-6" key={field}>
                  <label className="form-label">{field.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</label>
                  <input
                    type={field === "expiration_date" ? "date" : (field === "cost" || field === "price" ? "number" : "text")}
                    name={field}
                    className="form-control"
                    value={formData[field]}
                    onChange={handleChange}
                  />
                  {errors[field] && (
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
                {errors.category && (
                  <p className="text-danger">{errors.category}</p>
                )}
              </div>

              {/* Show Existing Image */}
              {formData.image && (
                <div className="col-md-6">
                  <label className="form-label">Current Image:</label><br />
                  <img
                    src={`${baseurl}${formData.image}`}
                    alt="Current"
                    style={{ width: "100px", height: "100px", objectFit: "contain" }}
                  />
                </div>
              )}

              {/* Upload New Image */}
              <div className="col-md-6">
                <label className="form-label">Update Image (optional)</label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>

              <div className="col-12 text-center">
                <button type="submit" className="bgBtn">
                  Update Inventory
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
