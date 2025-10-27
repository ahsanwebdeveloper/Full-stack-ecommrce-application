import React, { useState } from "react";
import Logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { saveAuthData } from "../../utils/auth";
import "./Sign.css";
import  { Link } from "react-router-dom";

function Signin() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const validateFields = () => {
  const newErrors = {};

  //  Allow spaces in full name
  if (!fullName.trim() || !/^[A-Za-z\s]+$/.test(fullName.trim())) {
    newErrors.fullName = "Please enter a valid name (letters only)";
  }

  // Proper email validation (your example is valid now)
  if (!email || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
    newErrors.email = "Please enter a valid email address";
  }

  //  Password validation (8+ chars & at least 1 number)
  if (!password) {
    newErrors.password = "Password is required";
  } else if (password.length < 8 || !/\d/.test(password)) {
    newErrors.password = "Password must be at least 8 characters long and contain a number";
  }

  return newErrors;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post("http://localhost:5000/api/customer/register", {
          name: fullName,
          email,
          password,
        });

        // Save token + user in localStorage
        saveAuthData(res.data.token, res.data.user);

        alert("Account created successfully!");
        navigate("/login");
      } catch (err) {
        alert(err.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="well text-center">
        <img className="w-25 top1" src={Logo} alt="Logo" />
        <h1 className="login">Create Account</h1>

        <form className="form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter name"
            className={`input1 p-2 ${submitted && errors.fullName ? "input-error" : ""}`}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {submitted && errors.fullName && <div className="error-text">{errors.fullName}</div>}

          <label>Email</label>
          <input
            type="email"
            placeholder="mail@website.com"
            className={`input1 p-2 ${submitted && errors.email ? "input-error" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {submitted && errors.email && <div className="error-text">{errors.email}</div>}

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Min 8 characters with number"
              className={`input2 p-2 ${submitted && errors.password ? "input-error" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {submitted && errors.password && <div className="error-text">{errors.password}</div>}

          <button type="submit" className="black p-2 mt-4 border-0">
            <b>Sign up</b>
          </button>
          <p className="mt-3">
            If you already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;