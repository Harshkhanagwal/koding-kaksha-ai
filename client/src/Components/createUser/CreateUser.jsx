import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axiosInstance";
import Loader from "../Loader/Loader";
import "./CreateUser.css";

const CreateUser = ({ onCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    isReadOnly: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordStrength = useMemo(() => {
    const password = formData.password || "";
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 1) return "Weak";
    if (score <= 3) return "Medium";
    return "Strong";
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const generatePassword = () => {
    const chars =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*";
    let password = "";
    for (let i = 0; i < 12; i += 1) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
    setFormData((prev) => ({
      ...prev,
      password,
      confirmPassword: password,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        isReadOnly: formData.isReadOnly,
      };

      await axiosInstance.post("/users/register-user", payload);
      toast.success("User created successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student",
        isReadOnly: false,
      });

      if (typeof onCreated === "function") onCreated();
    } catch (error) {
      const validationErrors = error.response?.data?.errors;
      if (Array.isArray(validationErrors) && validationErrors.length > 0) {
        toast.error(validationErrors[0]?.msg || "Validation failed");
      } else {
        toast.error(error.response?.data?.message || "Failed to create user");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-user-page">
      {loading && <Loader />}

      <h2 className="page-title">Create New User</h2>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
          </div>

          <div className="form-group">
            <div className="password-title-row">
              <label>Password</label>
              <button
                type="button"
                className="ghost-btn"
                onClick={generatePassword}
              >
                Generate
              </button>
            </div>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
            <small className={`strength-text ${passwordStrength.toLowerCase()}`}>
              Strength: {passwordStrength}
            </small>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
            />
          </div>

          <div className="toggle-row">
            <span>Show Password</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
              <option value="admin">Admin</option>
              <option value="superAdmin">Super Admin</option>
            </select>
          </div>

          <div className="toggle-row">
            <span>Read Only Access</span>
            <label className="switch">
              <input
                type="checkbox"
                name="isReadOnly"
                checked={formData.isReadOnly}
                onChange={handleChange}
              />
              <span className="slider" />
            </label>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
