import React, { useState } from "react";
import Logo from "../../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Sign.css";

function Signin() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Validation
  const validateFields = () => {
    const newErrors = {};

    if (!fullName.trim() || !/^[A-Za-z]+$/.test(fullName.trim())) {
      newErrors.fullName = "Please enter a valid name (alphabets only)";
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8 || !/\d/.test(password)) {
      newErrors.password = "Password must be at least 8 characters with a number";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // ✅ Save user data in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ fullName, email, password })
      );
      alert("Account created successfully!");
      navigate("/login"); // redirect to login
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="well text-center">
        <div>
          <img className="w-25 top1" src={Logo} alt="Logo" />
        </div>

        <div className="top mb-5">
          <h1 className="login">Create Account</h1>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {/* Full Name */}
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter text"
            className={`input1 p-2 ${submitted && errors.fullName ? "input-error" : ""}`}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {submitted && errors.fullName && <div className="error-text">{errors.fullName}</div>}

          {/* Email */}
          <label>Email</label>
          <input
            type="email"
            placeholder="mail@website.com"
            className={`input1 p-2 ${submitted && errors.email ? "input-error" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {submitted && errors.email && <div className="error-text">{errors.email}</div>}

          {/* Password */}
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

          {/* Button */}
          <button type="submit" className="black p-2 mt-4 border-0">
            <b>Sign up</b>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
