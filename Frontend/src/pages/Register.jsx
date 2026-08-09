import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Auth.css';
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the error message if the user starts typing again
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check college email format
    if (!formData.email.endsWith("@student.nitw.ac.in")) {
      setError("Please use your official @student.nitw.ac.in email address.");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        email: formData.email,
        password: formData.password,
      });

      // Save token and role if returned upon registration
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.user?.role || "student");
      }

      navigate("/setup-profile"); 

    } catch (err) {
      console.error("Registration request failed:", err);

      // Handle backend errors (e.g., email already exists, 400 bad request, etc.)
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to process registration. Please try again later.");
      }
    }
  };

  return (
    <div className="auth-page">
      <Navbar />
      
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Student Registration</h2>
            <p>Create your account using your NITW email.</p>
          </div>

          {/* Conditional Error Rendering */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">College Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="form-input" 
                value={formData.email}
                placeholder="username@student.nitw.ac.in" 
                required 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                className="form-input" 
                value={formData.password}
                placeholder="••••••••" 
                required 
                onChange={handleChange} 
              />
            </div>

            <button type="submit" className="auth-submit-btn">Create Account</button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/login" className="auth-link">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;