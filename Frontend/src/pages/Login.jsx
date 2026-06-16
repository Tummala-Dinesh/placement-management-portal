import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // --- MOCK LOGIC ---
    // Simulating that only 'test@student.nitw.ac.in' is a registered user right now.
    const isUserRegisteredInDatabase = formData.email === 'test@student.nitw.ac.in';

    if (!isUserRegisteredInDatabase) {
      setError("User is not registered. Please register first.");
    } else {
      alert("Login successful! Dashboard coming soon.");
    }
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