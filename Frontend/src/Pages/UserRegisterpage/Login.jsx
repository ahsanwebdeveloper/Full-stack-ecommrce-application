import React, { useState } from "react";
import Logo from "../../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { saveAuthData } from "../../utils/auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    // Try admin login first
    const adminRes = await axios.post("http://localhost:5000/api/admin/login", { email, password });

    if (adminRes.data?.user?.role === "admin") {
      localStorage.setItem("token", adminRes.data.token);
      localStorage.setItem("user", JSON.stringify(adminRes.data.user));
      navigate("/admin");
      return;
    }
  } catch (err) {
    // Ignore admin login failure and try customer login
  }

  try {
    const userRes = await axios.post("http://localhost:5000/api/customer/login", { email, password });

    if (userRes.data?.user?.role === "customer") {
      localStorage.setItem("token", userRes.data.token);
      localStorage.setItem("user", JSON.stringify(userRes.data.user));
      navigate("/");
      return;
    }
  } catch (err) {
    alert(err.response?.data?.message || "Invalid credentials");
  }
};

  return (
    <div className="signin-wrapper">
      <div className="well text-center">
        <img className="w-25 top1" src={Logo} alt="Logo" />
        <h1 className="login">Log in</h1>

        <form className="form" onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="mail@website.com"
            className="input1 p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="min 8 characters"
            className="input2 p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="black p-2 mt-4 border-0">
            <b>Log in</b>
          </button>

          <p className="mt-3">
            Don’t have an account?{" "}
            <Link to="/signin" style={{ textDecoration: "none" }}>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;