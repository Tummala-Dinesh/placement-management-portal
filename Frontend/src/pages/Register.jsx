import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Check } from 'lucide-react';
import '../styles/Auth.css';

const Register = () => {
  // Simplified state: just email and password
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add quick frontend validation to ensure the correct domain
    if (!formData.email.endsWith('@student.nitw.ac.in')) {
      alert("Please use your official @student.nitw.ac.in email address.");
      return;
    }

    // TODO: Connect your backend axios POST request here
    
    setIsRegistered(true);
  };

  return (
    <div className="auth-page">
      <Navbar />
      
      <div className="auth-container">
        <div className="auth-card">
          
          {isRegistered ? (
            /* --- SUCCESS VIEW --- */
            <div className="success-state">
              <div className="success-icon-wrapper">
                <Check size={40} />
              </div>
              <h3>Account Created!</h3>
              <p>Welcome to the Placement Portal. Your secure student account has been initialized.</p>
              <span className="highlight-text">Student Dashboard is coming soon...</span>
            </div>
          ) : (
            /* --- FORM VIEW --- */
            <>
              <div className="auth-header">
                <h2>Student Registration</h2>
                <p>Create your account using your NITW email.</p>
              </div>

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
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Register;