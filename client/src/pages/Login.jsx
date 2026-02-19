import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
    
    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
        return;
    }

    const resultAction = await dispatch(loginUser(formData));

        if (loginUser.fulfilled.match(resultAction)) {
            navigate("/dashboard", { replace: true });
        }
    };


  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">
          Login to continue to your dashboard
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="button-primary login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <p style={{ color: "red", marginTop: "12px" }}>
              {error}
            </p>
          )}
        </form>

        <p className="login-footer">
          Don't have an account? <span>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
