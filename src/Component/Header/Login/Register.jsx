
import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { baseurl } from "../../../Baseurl";
import { toast, ToastContainer } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const { email, password, role } = formData;


    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

  if (!role) {
  newErrors.role = "role is required";
} 


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClick = async () => {
    if (validate()) {
      try {
        const response = await axios.post(`${baseurl}userSignup`, formData);
        if (response.status === 201) {
          toast.success("Registration successful");
          setTimeout(()=>{
              navigate("/"); // Redirect after registration
          },[1000])
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Registration failed");
        console.error("Register failed:", error);
      }
    } else {
      console.log("Validation failed");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container">
      <div
        className="login-box mx-auto mt-5 p-4 bg-white rounded shadow"
        style={{ maxWidth: "420px" }}
      >
        <div className="text-center mb-3">
          <span className="brand-name text-primary fw-bold fs-4">
            Able <sup>pro</sup>
          </span>
        </div>
        <h4 className="login-title fw-bold">Register</h4>
        <p className="text-end small">
          <NavLink to="/">Already have an account?</NavLink>
        </p>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control bg-light"
            name="email"
            placeholder="admin@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control bg-light"
            name="password"
            placeholder="••••••"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>

       <div className="mb-3">
  <label className="form-label">Role</label>
  <select
    className="form-select bg-light"
    name="role"
    value={formData.role}
    onChange={handleChange}
  >
    <option value="">Select Role</option>
    <option value="admin">Admin</option>
    <option value="subadmin">Subadmin</option>
    <option value="doctor">Doctor</option>
    <option value="receptionist">Receptionist</option>
  </select>
  {errors.role && (
    <small className="text-danger">{errors.role}</small>
  )}
</div>


        <button className="btn btn-primary w-100" onClick={handleClick}>
          Register
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
