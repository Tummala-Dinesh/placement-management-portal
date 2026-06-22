import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, Briefcase, User, Edit2, Save, X, ExternalLink } from 'lucide-react';
import '../styles/Navbar.css'; 
import '../styles/Dashboard.css';
import api from "../services/api";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [activeTab, setActiveTab] = useState('jobs');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    branch: '',
    cgpa: '',
    resume_url:'',
    backlogs: '',
    skills: ''
  });

  const fetchProfile = async () => {
    try {
      const response = await api.get("/students/profile",
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        }
      );

      setProfileData({
        full_name: response.data.full_name,
        branch: response.data.branch,
        cgpa: response.data.cgpa,
        backlogs: response.data.backlogs,
        resume_url : response.data.resume_url,
        skills: Array.isArray(response.data.skills)
            ? response.data.skills.join(", ")
            : response.data.skills || ""
      });

    } catch (err) {
      console.log(err);
    }
  };

  const [eligibleJobs, setEligibleJobs] = useState([]);

  const fetchEligibleJobs = async () => {
    try {
      const response = await api.get("/jobs/eligible",
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      setEligibleJobs(response.data);
    }
    catch(err){
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await api.put(
          "/students/profile",
          {
            full_name: profileData.full_name,
            branch: profileData.branch,
            cgpa: profileData.cgpa,
            backlogs: profileData.backlogs,
            resume_url: profileData.resume_url,
            skills: profileData.skills
            ? profileData.skills.split(",").map(skill => skill.trim())
            : []
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      console.log(response.data);
      setIsEditingProfile(false);
      alert("Profile updated successfully!");
      fetchProfile();
      fetchEligibleJobs();
    }
    catch (error) {
        console.error(error);
    }
  };

  useEffect(() => {
      fetchProfile();
      fetchEligibleJobs();
  }, []);

  // FILTERING LOGIC: Only show jobs the student is actually eligible for
  const filteredJobs = useMemo(() => {
    const studentCgpa = parseFloat(profileData.cgpa) || 0;
    const studentBacklogs = parseInt(profileData.backlogs, 10) || 0;
    const studentBranchCode = profileData.branch;

    return eligibleJobs.filter(job => {
      const jobMinCgpa = parseFloat(job.min_cgpa);
      const jobMaxBacklogs = parseInt(job.max_backlogs, 10);
      
      const meetsCgpa = studentCgpa >= jobMinCgpa;
      const meetsBacklogs = studentBacklogs <= jobMaxBacklogs;
      
      // Safety check in case the database returns null for branches
      const branchesArray = Array.isArray(job.allowed_branches) ? job.allowed_branches : [];
      const meetsBranch = branchesArray.includes(studentBranchCode);

      return meetsCgpa && meetsBacklogs && meetsBranch;
    });
  }, [profileData, eligibleJobs]);

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
          <h1>
          Welcome, {profileData.full_name?.split(' ')[0]}
          </h1>
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
            {filteredJobs.length === 0 ? (
              <p>No eligible jobs found.</p>
            ) : (
              filteredJobs.map((job, index) => (
                <div
                  key={index}
                  className="job-card"
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <div className="job-company">
                    {job.company_name}
                  </div>

                  <h3
                    className="job-title"
                    style={{ marginBottom: '0.5rem' }}
                  >
                    {job.role_title}
                  </h3>

                  <p
                    style={{
                      color: '#64748b',
                      fontSize: '0.9rem',
                      marginBottom: '1.5rem',
                      lineHeight: '1.5',
                      flexGrow: 1
                    }}
                  >
                    {job.job_description}
                  </p>

                  <div
                    className="job-details"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.75rem',
                      marginBottom: '2rem',
                      fontSize: '0.9rem'
                    }}
                  >
                    <span>
                      <strong style={{ color: '#334155' }}>CTC:</strong>{' '}{job.ctc} LPA
                    </span>

                    <span>
                      <strong style={{ color: '#334155' }}>Deadline:</strong>{' '}{job.deadline}
                    </span>

                    <span>
                      <strong style={{ color: '#334155' }}>Min CGPA:</strong>{' '}{job.min_cgpa}
                    </span>

                    <span>
                      <strong style={{ color: '#334155' }}>Backlogs:</strong>{' '}{job.max_backlogs} Max
                    </span>

                    <span style={{ gridColumn: 'span 2' }}>
                      <strong style={{ color: '#334155' }}>Branches:</strong>{' '}{job.allowed_branches?.join(', ')}
                    </span>
                  </div>

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
                      <>
                        Apply Now <ExternalLink size={16} />
                      </>
                    ) : (
                      "Link Unavailable"
                    )}
                  </button>
                </div>
              ))
            )}
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
                  <input type="text" name="full_name" value={profileData.full_name} onChange={handleProfileChange} className="form-input" style={{ width: '100%', padding: '0.5rem' }} />
                ) : (
                  <p>{profileData.full_name}</p>
                )}
              </div>

              <div className="data-group">
                <label>Branch</label>
                {isEditingProfile ? (
                  <select name="branch" value={profileData.branch} onChange={handleProfileChange} className="form-input" style={{ width: '100%', padding: '0.5rem' }}>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
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