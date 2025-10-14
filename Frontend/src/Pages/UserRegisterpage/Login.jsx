import React, { useState } from "react";
import Logo from "../../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No account found. Please sign up first.");
      return;
    }

    if (storedUser.email === email && storedUser.password === password) {
      alert("Login successful!");
      navigate("/"); // home page redirect
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="well text-center">
        <div>
          <img className="w-25 top1" src={Logo} alt="Logo" />
        </div>

        <div className="top mb-5">
          <h1 className="login">Log in</h1>
        </div>

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
