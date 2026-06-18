import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Auth.css';
import api from "../services/api";

const Login = () => {
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
      try {
        const response = await api.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        navigate('/dashboard'); 

      } catch (error) {
        console.error(error);
      }
    
    // TODO: Replace this with your actual backend check.
    
    // --- MOCK LOGIC ---
    // Simulating that only 'test@student.nitw.ac.in' is registered for testing the UI
    //const isUserRegisteredInDatabase = formData.email === 'test@student.nitw.ac.in';
    
  };

  return (
    <div className="auth-page">
      <Navbar />
      
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Log in to access your placement dashboard.</p>
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

            <button type="submit" className="auth-submit-btn">Log In</button>
          </form>

          <div className="auth-footer">
            Don't have an account? <Link to="/register" className="auth-link">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;