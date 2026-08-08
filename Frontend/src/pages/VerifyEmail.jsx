import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api'; // Added API import for backend call
import '../styles/Auth.css';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  // Extract the email passed from the Register page[cite: 5]
  const email = location.state?.email;

  // Security check: If someone tries to manually type /verify-email in the URL 
  // without registering first, kick them back to the register page.[cite: 5]
  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Connect to the backend API to verify the real OTP
      await api.post('/auth/verify-otp', { email, otp });

      // Success! Proceed to profile setup[cite: 5]
      navigate('/setup-profile'); 
      
    } catch (error) {
      // Failure! Kick them back to the register page with an error message
      navigate('/register', { 
        state: { 
          error: error.response?.data?.message || "Verification failed. Incorrect OTP entered." 
        } 
      });
    }
  };

  if (!email) return null; // Prevent flicker while redirecting[cite: 5]

  return (
    <div className="auth-page">
      <Navbar />
      
      <div className="auth-container">
        <div className="auth-card" style={{ maxWidth: '450px' }}>
          <div className="auth-header">
            <h2>Verify Your Email</h2>
            <p>We sent a 6-digit code to <strong>{email}</strong></p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="otp">Enter Verification Code</label>
              <input 
                type="text" 
                id="otp" 
                name="otp" 
                className="form-input" 
                placeholder="123456" 
                maxLength="6"
                required 
                value={otp}
                onChange={(e) => setOtp(e.target.value)} 
                style={{ textAlign: 'center', letterSpacing: '0.25em', fontSize: '1.25rem' }}
              />
            </div>

            <button type="submit" className="auth-submit-btn">Verify & Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;