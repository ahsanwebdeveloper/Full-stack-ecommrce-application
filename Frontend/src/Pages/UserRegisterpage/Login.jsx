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
    const { data } = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    if (data.user.isAdmin) {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
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