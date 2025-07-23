import React, { useState } from "react";
import axios from "axios";
import { baseurl } from "../../Baseurl";

export default function Changepassword() {
  const [formValues, setFormValues] = useState({
    old: "",
    password: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    password: false,
    confirm: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const userId =JSON.parse(localStorage.getItem("userMedical"))?.id 

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{9,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { old, password, confirm } = formValues;

    if (old === password) {
      setError("Old password and new password must not be the same.");
      return;
    }

    if (password !== confirm) {
      setError("New password and confirm password must match.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 9 characters and contain uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
       // 🔁 Replace this with dynamic user id

      const response = await axios.post(
        `${baseurl}changePassword/${userId}`,
        {
          oldPassword: old,
          newPassword: password,
          confirmNewPassword: confirm,
        }
      );

      setSuccess(response.data.message || "Password changed successfully.");
      setFormValues({ old: "", password: "", confirm: "" });
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="pc-container">
      <div className="pc-content ">
        <div className="card p-4">
          <h4 className="mb-3">Change Password</h4>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Old Password */}
              <div className="col-md-6">
                <label htmlFor="old" className="form-label">
                  Old Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword.old ? "text" : "password"}
                    className="form-control"
                    name="old"
                    value={formValues.old}
                    onChange={handleChange}
                    placeholder="Enter Old Password"
                    required
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => togglePassword("old")}
                  >
                    <i
                      className={`bi ${
                        showPassword.old ? "bi-eye-slash" : "bi-eye"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="col-md-6">
                <label htmlFor="password" className="form-label">
                  New Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword.password ? "text" : "password"}
                    className="form-control"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="Enter New Password"
                    required
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => togglePassword("password")}
                  >
                    <i
                      className={`bi ${
                        showPassword.password ? "bi-eye-slash" : "bi-eye"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="col-md-6">
                <label htmlFor="confirm" className="form-label">
                  Confirm Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    className="form-control"
                    name="confirm"
                    value={formValues.confirm}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => togglePassword("confirm")}
                  >
                    <i
                      className={`bi ${
                        showPassword.confirm ? "bi-eye-slash" : "bi-eye"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>

              {/* Password Guidelines */}
              <div className="col-md-6">
                <h5 className="mb-2">New Password must contain:</h5>
                <ul className="list-group">
                  <li className="list-group-item">At least 9 characters</li>
                  <li className="list-group-item">
                    At least 1 lowercase letter (a-z)
                  </li>
                  <li className="list-group-item">
                    At least 1 uppercase letter (A-Z)
                  </li>
                  <li className="list-group-item">At least 1 number (0-9)</li>
                  <li className="list-group-item">
                    At least 1 special character (!@#$...)
                  </li>
                </ul>
              </div>

              <div className="col-12 mt-3 text-center">
                <button type="submit" className="btn btn-primary px-4" >
                  Update Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
