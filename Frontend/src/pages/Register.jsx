import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Auth.css';
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Catch any errors passed back from the VerifyEmail page
  const errorMessage = location.state?.error;

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check college email[cite: 4]
    if (!formData.email.endsWith("@student.nitw.ac.in")) {
      alert("Please use your official @student.nitw.ac.in email address.");
      return;
    }

    try {
      // Environment Toggle: Production vs Local
      if (import.meta.env.PROD === "production") {
        
        // DEPLOYED: Directly register the user and skip OTP
        await api.post("/auth/register", {
          email: formData.email,
          password: formData.password,
        });

        // Skip the verify page and go directly to setup[cite: 4]
        navigate("/setup-profile"); 

      } else {
        
        // LOCAL: Send email + password to backend to trigger Nodemailer[cite: 4]
        await api.post("/auth/send-otp", {
          email: formData.email,
          password: formData.password,
        });

        // OTP sent successfully → go to verification page[cite: 4]
        navigate("/verify-email", {
          state: {
            email: formData.email,
          },
        });
      }

    } catch (error) {
      console.error("Registration request failed:", error);

      alert(
        error.response?.data?.message ||
        "Failed to process registration"
      );
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

          {/* Display verification failure errors here */}
          {errorMessage && (
            <div className="error-message" style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', border: '1px solid #fecaca', fontSize: '0.9rem', textAlign: 'center' }}>
              {errorMessage}
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