import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, Briefcase, User, Edit2, Save, X, ExternalLink } from 'lucide-react';
import '../styles/Navbar.css'; 
import '../styles/Dashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('jobs');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Profile data pre-filled with context for testing
  const [profileData, setProfileData] = useState({
    fullName: "Yelamanchali Rohit",
    email: "rohit@student.nitw.ac.in",
    branch: "Electrical and Electronics Engineering (EEE)",
    cgpa: "8.5",
    backlogs: "0",
    skills: "React, Node.js, Power Systems, ESP32"
  });

  // Mock data perfectly matching your PostgreSQL database schema
  const dbEligibleJobs = [
    { 
      company_name: "Google", 
      role_title: "Software Engineer", 
      min_cgpa: "8.00", 
      max_backlogs: 0, 
      allowed_branches: ["CSE", "IT"], 
      ctc: "25.00", 
      job_description: "Backend and Full Stack Development", 
      deadline: "2027-07-30", 
      apply_link: "https://careers.google.com" 
    },
    { 
      company_name: "Microsoft", 
      role_title: "Software Engineer", 
      min_cgpa: "8.50", 
      max_backlogs: 0, 
      allowed_branches: ["CSE", "IT"], 
      ctc: "22.00", 
      job_description: "Cloud and Backend Engineering", 
      deadline: "2027-08-10", 
      apply_link: "https://careers.microsoft.com" 
    },
    { 
      company_name: "TCS", 
      role_title: "Digital Engineer", 
      min_cgpa: "7.00", 
      max_backlogs: 1, 
      allowed_branches: ["CSE", "IT", "ECE", "EEE", "MECH"], 
      ctc: "7.50", 
      job_description: "Digital Engineering Role", 
      deadline: "2027-08-15", 
      apply_link: "https://nextstep.tcs.com" 
    },
    { 
      company_name: "Amazon", 
      role_title: "SDE", 
      min_cgpa: "7.00", 
      max_backlogs: 0, 
      allowed_branches: ["CSE", "EEE", "ECE"], 
      ctc: "18.50", 
      job_description: "Backend Development", 
      deadline: "2026-07-15", 
      apply_link: null // Testing the null handling from row 1 of your DB
    }
  ];

  const handleLogout = () => {
    // TODO: Clear JWT token from localStorage here
    navigate('/login');
  };

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleProfileSave = async () => {
    // TODO: Connect to backend PUT request here
    setIsEditingProfile(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="dashboard-page">
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
          <h1>Welcome, {profileData.fullName.split(' ')[0]}</h1>
          <p>Here are your placement updates and eligible drives.</p>
        </div>

        <div className="dashboard-tabs">
          <button className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`} onClick={() => setActiveTab('jobs')}>
            <Briefcase size={20} /> Eligible Jobs
          </button>
          <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <User size={20} /> My Profile
          </button>
        </div>

        {activeTab === 'jobs' && (
          <div className="jobs-grid">
            {dbEligibleJobs.map((job, index) => (
              <div key={index} className="job-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="job-company">{job.company_name}</div>
                <h3 className="job-title" style={{ marginBottom: '0.5rem' }}>{job.role_title}</h3>
                
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5', flexGrow: 1 }}>
                  {job.job_description}
                </p>

                {/* Using a tight CSS Grid to display the DB fields cleanly */}
                <div className="job-details" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem', fontSize: '0.9rem' }}>
                  <span><strong style={{ color: '#334155' }}>CTC:</strong> {job.ctc} LPA</span>
                  <span><strong style={{ color: '#334155' }}>Deadline:</strong> {job.deadline}</span>
                  <span><strong style={{ color: '#334155' }}>Min CGPA:</strong> {job.min_cgpa}</span>
                  <span><strong style={{ color: '#334155' }}>Backlogs:</strong> {job.max_backlogs} Max</span>
                  <span style={{ gridColumn: 'span 2' }}>
                    <strong style={{ color: '#334155' }}>Branches:</strong> {job.allowed_branches.join(', ')}
                  </span>
                </div>

                {/* Apply Button with Null Check */}
                <button 
                  className="btn-apply"
                  onClick={() => window.open(job.apply_link, '_blank')}
                  disabled={!job.apply_link}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    opacity: !job.apply_link ? 0.5 : 1, 
                    cursor: !job.apply_link ? 'not-allowed' : 'pointer' 
                  }}
                >
                  {job.apply_link ? (
                    <>Apply Now <ExternalLink size={16} /></>
                  ) : (
                    "Link Unavailable"
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-view">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Academic Details</h2>
              
              {!isEditingProfile ? (
                <button onClick={() => setIsEditingProfile(true)} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                  <Edit2 size={16} /> Edit Profile
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => setIsEditingProfile(false)} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem', borderColor: '#ef4444', color: '#ef4444' }}>
                    <X size={16} /> Cancel
                  </button>
                  <button onClick={handleProfileSave} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              )}
            </div>
            
            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />
            
            <div className="profile-data-grid">
              <div className="data-group">
                <label>Full Name</label>
                {isEditingProfile ? (
                  <input type="text" name="fullName" value={profileData.fullName} onChange={handleProfileChange} className="form-input" style={{ width: '100%', padding: '0.5rem' }} />
                ) : (
                  <p>{profileData.fullName}</p>
                )}
              </div>

              <div className="data-group">
                <label>College Email</label>
                {isEditingProfile ? (
                  <input type="email" name="email" value={profileData.email} disabled className="form-input" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#e2e8f0', cursor: 'not-allowed' }} />
                ) : (
                  <p>{profileData.email}</p>
                )}
              </div>

              <div className="data-group">
                <label>Branch</label>
                {isEditingProfile ? (
                  <select name="branch" value={profileData.branch} onChange={handleProfileChange} className="form-input" style={{ width: '100%', padding: '0.5rem' }}>
                    <option value="Computer Science (CSE)">Computer Science (CSE)</option>
                    <option value="Information Technology (IT)">Information Technology (IT)</option>
                    <option value="Electronics and Communication Engineering (ECE)">Electronics and Communication Engineering (ECE)</option>
                    <option value="Electrical and Electronics Engineering (EEE)">Electrical and Electronics Engineering (EEE)</option>
                    <option value="Mechanical Engineering (MECH)">Mechanical Engineering (MECH)</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                  </select>
                ) : (
                  <p>{profileData.branch}</p>
                )}
              </div>

              <div className="data-group">
                <label>Current CGPA</label>
                {isEditingProfile ? (
                  <input type="number" name="cgpa" value={profileData.cgpa} onChange={handleProfileChange} step="0.01" min="0" max="10" className="form-input" style={{ width: '100%', padding: '0.5rem' }} />
                ) : (
                  <p>{profileData.cgpa}</p>
                )}
              </div>

              <div className="data-group">
                <label>Active Backlogs</label>
                {isEditingProfile ? (
                  <input type="number" name="backlogs" value={profileData.backlogs} onChange={handleProfileChange} min="0" className="form-input" style={{ width: '100%', padding: '0.5rem' }} />
                ) : (
                  <p>{profileData.backlogs}</p>
                )}
              </div>

              <div className="data-group">
                <label>Top Skills</label>
                {isEditingProfile ? (
                  <input type="text" name="skills" value={profileData.skills} onChange={handleProfileChange} className="form-input" style={{ width: '100%', padding: '0.5rem' }} />
                ) : (
                  <p>{profileData.skills}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;