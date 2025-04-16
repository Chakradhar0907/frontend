import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("patient"); // Default to patient
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://localhost:7263/api/Authentication/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Store token in localStorage

      // Redirect based on user type
      if (userType === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/patient-dashboard"); // Redirect to Patient Dashboard
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>User Type</label>
            <select value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="doctor">Login as a Doctor</option>
              <option value="patient">Login as a Patient</option>
            </select>
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        {userType === "patient" && (
          <>
            <p className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </p>
            <p className="sign-up">
              Don't have an account? <a href="/sign-up">Sign Up</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;