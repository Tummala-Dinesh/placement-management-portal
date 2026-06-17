import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, Briefcase, User } from 'lucide-react';
import '../styles/Navbar.css'; // For the navbar styles
import '../styles/Dashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('jobs');

  // MOCK DATA: Later, fetch this from backend using your JWT
  const studentProfile = {
    fullName: "Alex Carter",
    email: "alex@student.nitw.ac.in",
    branch: "Computer Science (CSE)",
    cgpa: "8.8",
    backlogs: "0",
    skills: "React, Node.js, PostgreSQL"
  };

  const eligibleJobs = [
    { id: 1, company: "Google", role: "Software Engineer Intern", ctc: "1.2 Lakhs/month", cutoff: "8.0 CGPA" },
    { id: 2, company: "Microsoft", role: "SDE 1", ctc: "45 LPA", cutoff: "8.5 CGPA" },
    { id: 3, company: "Amazon", role: "Frontend Developer", ctc: "30 LPA", cutoff: "7.5 CGPA" }
  ];

  const handleLogout = () => {
    // TODO: Clear JWT token from localStorage here
    // localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      {/* Student Specific Navbar */}
      <nav className="navbar">
        <div className="nav-logo">
          <GraduationCap size={32} />
          <span>Student Portal</span>
        </div>
        <div className="nav-auth">
          <button onClick={handleLogout} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome, {studentProfile.fullName.split(' ')[0]}</h1>
          <p>Here are your placement updates and eligible drives.</p>
        </div>

        {/* Custom Tabs */}
        <div className="dashboard-tabs">
          <button className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`} onClick={() => setActiveTab('jobs')}>
            <Briefcase size={20} /> Eligible Jobs
          </button>
          <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <User size={20} /> My Profile
          </button>
        </div>

        {/* Tab Content Rendering */}
        {activeTab === 'jobs' && (
          <div className="jobs-grid">
            {eligibleJobs.map(job => (
              <div key={job.id} className="job-card">
                <div className="job-company">{job.company}</div>
                <h3 className="job-title">{job.role}</h3>
                <div className="job-details">
                  <span><strong>Package:</strong> {job.ctc}</span>
                  <span><strong>Eligibility Cutoff:</strong> {job.cutoff}</span>
                </div>
                <button className="btn-apply">Apply Now</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-view">
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Academic Details</h2>
            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />
            
            <div className="profile-data-grid">
              <div className="data-group">
                <label>Full Name</label>
                <p>{studentProfile.fullName}</p>
              </div>
              <div className="data-group">
                <label>College Email</label>
                <p>{studentProfile.email}</p>
              </div>
              <div className="data-group">
                <label>Branch</label>
                <p>{studentProfile.branch}</p>
              </div>
              <div className="data-group">
                <label>Current CGPA</label>
                <p>{studentProfile.cgpa}</p>
              </div>
              <div className="data-group">
                <label>Active Backlogs</label>
                <p>{studentProfile.backlogs}</p>
              </div>
              <div className="data-group">
                <label>Top Skills</label>
                <p>{studentProfile.skills}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;