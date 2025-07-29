
// import axios from "axios";
// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { baseurl } from "../../../Baseurl";
// import { toast, ToastContainer } from "react-toastify";
// import Swal from "sweetalert2";
// import logo from '../../../assests/Image.jpg';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const newErrors = {};
//     if (!email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Email is invalid";
//     }

//     if (!password) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleClick = async () => {
//     if (validate()) {
//       const userData = {
//         email: email,
//         password: password,
//       };

//       try {
//         const response = await axios.post(`${baseurl}userLogin`, userData);
//         console.log(response);

//         if (response.status === 200) {
//           toast.success("Login successful");
//           localStorage.setItem("userMedical", JSON.stringify(response.data));
//           Swal.fire("Success!!", "Admin Login Successfully.", "success");
//           navigate("/Homepage");
//         }
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Login failed");
//         console.error("Login failed:", error.response?.data?.message || error.message);
//       }
//     } else {
//       console.log("Validation failed");
//     }
//   };

//   return (
//     <div className="mainLogin">
//       <div className="container loginBgColor">
//         <div className="login-box mx-auto bg-white">
//           <div className="text-center mb-3">
//             <span className="brand-name text-primary fw-bold fs-4">
//               <img src={logo} alt="Logo" className="logo-image mb-2" style={{ width: "139px", height: "100px" }} />
//             </span>
//           </div>
//           <h4 className="login-title">Login</h4>
//           {/* <p className="text-end small">
//             <NavLink to="/Register">Don't have an account?</NavLink>
//           </p> */}

//           <div className="mb-3">
//             <label className="form-label">Email Address</label>
//             <input
//               type="email"
//               className="form-control bg-light"
//               placeholder="admin@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {errors.email && <small className="text-danger">{errors.email}</small>}
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <div className="input-group">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="form-control bg-light"
//                 placeholder="••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button
//                 className="btn btn-outline-secondary"
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//               >
//                 {showPassword ? <VisibilityOffIcon /> : "👁"}
//               </button>
//             </div>
//             {errors.password && <small className="text-danger">{errors.password}</small>}
//           </div>

//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <div>
//               <input type="checkbox" id="remember" />
//               <label htmlFor="remember" className="ms-1 small">
//                 Keep me sign in
//               </label>
//             </div>
//             <a href="#" className="small">
//               Forgot Password?
//             </a>
//           </div>

//           <button className="btn btn-primary w-100" onClick={handleClick}>
//             Login
//           </button>
//         </div>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// }
import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { baseurl } from "../../../Baseurl";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import logo from '../../../assests/Image.jpg';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state

  const validate = () => {
    const newErrors = {};
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClick = async () => {
    if (validate()) {
      setLoading(true); 
      const userData = {
        email: email,
        password: password,
      };

      try {
        const response = await axios.post(`${baseurl}userLogin`, userData);
        console.log(response);

        if (response.status === 200) {
          toast.success("Login successful");
          localStorage.setItem("userMedical", JSON.stringify(response.data));
          Swal.fire("Success!!", "Admin Login Successfully.", "success");
          navigate("/Homepage");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
        console.error("Login failed:", error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Validation failed");
    }
  };
  return (
    <div className="mainLogin">
      <div className="container loginBgColor">
        <div className="login-box mx-auto bg-white">
          <div className="text-center mb-3">
            <span className="brand-name text-primary fw-bold fs-4">
              <img
                src={logo}
                alt="Logo"
                className="logo-image mb-2"
                style={{ width: "139px", height: "100px" }}
              />
            </span>
          </div>
          <h4 className="login-title">Login</h4>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control bg-light"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control bg-light"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <VisibilityOffIcon /> : "👁"}
              </button>
            </div>
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="ms-1 small">
                Keep me sign in
              </label>
            </div>
            <a href="#" className="small">
              Forgot Password?
            </a>
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={handleClick}
            disabled={loading} // Disable button if loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
