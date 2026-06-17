import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import '../styles/Auth.css';

const SetupProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    branch: '',
    cgpa: '',
    backlogs: '',
    resumeUrl: '',
    skills: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send this data to your backend (e.g., PUT /api/students/profile)
    
    // Simulate successful profile save, then redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      {/* Simple header for onboarding */}
      <nav className="navbar" style={{ position: 'absolute', width: '100%' }}>
        <div className="nav-logo">
          <GraduationCap size={32} />
          <span>PlacementPortal</span>
        </div>
      </nav>

      <div className="auth-container" style={{ paddingTop: '8rem' }}>
        <div className="auth-card profile-card">
          <div className="auth-header">
            <h2>Complete Your Profile</h2>
            <p>Tell us about your academic background to find eligible jobs.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" className="form-input" placeholder="e.g. John Doe" required onChange={handleChange} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="branch">Branch</label>
                <select id="branch" name="branch" className="form-input" required onChange={handleChange}>
                  <option value="" disabled selected>Select your branch</option>
                  <option value="CSE">Computer Science (CSE)</option>
                  <option value="ECE">Electronics (ECE)</option>
                  <option value="EEE">Electrical (EEE)</option>
                  <option value="MECH">Mechanical (MECH)</option>
                  <option value="CIVIL">Civil Engineering</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cgpa">Current CGPA</label>
                <input type="number" id="cgpa" name="cgpa" className="form-input" placeholder="e.g. 8.5" step="0.01" min="0" max="10" required onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="backlogs">Active Backlogs</label>
                <input type="number" id="backlogs" name="backlogs" className="form-input" placeholder="0" min="0" required onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="resumeUrl">Resume URL (Optional)</label>
                <input type="url" id="resumeUrl" name="resumeUrl" className="form-input" placeholder="Drive or Portfolio link" onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="skills">Top Skills (Optional)</label>
              <input type="text" id="skills" name="skills" className="form-input" placeholder="e.g. React, Node.js, Python" onChange={handleChange} />
            </div>

            <button type="submit" className="auth-submit-btn">Save Profile & Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetupProfile;