import React, { useState } from "react";
import { API_BASE } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // after successful login (you can add API call here)
    navigate("/events"); // redirects to Events page
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      navigate("/events");  // <--- navigate to events
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #4B0082, #6A0DAD)", // elegant purple gradient
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Optional abstract shapes */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          top: "-50px",
          left: "-50px",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          bottom: "-100px",
          right: "-100px",
        }}
      ></div>

      {/* Login Card */}
      <div
        className="card p-5 shadow-lg"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          zIndex: 1,
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            color: "#4B0082",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
          }}
        >
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-3"
          style={{
            backgroundColor: "#ECF0F1",
            border: "none",
            borderRadius: "10px",
            padding: "10px",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-4"
          style={{
            backgroundColor: "#ECF0F1",
            border: "none",
            borderRadius: "10px",
            padding: "10px",
          }}
        />
        <button
          onClick={handleLogin}
          className="btn w-100"
          style={{
            backgroundColor: "#6A0DAD",
            color: "#FFFFFF",
            borderRadius: "10px",
            padding: "10px",
            fontWeight: 600,
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
