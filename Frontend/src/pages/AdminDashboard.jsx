import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, LayoutDashboard, Briefcase, Users, Plus, ShieldCheck } from 'lucide-react';
import '../styles/Navbar.css'; 
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');

  // Dummy Placement Stats
  const stats = {
    totalStudents: 1250,
    eligibleStudents: 850,
    activeJobs: 14,
    offersExtended: 320
  };

  // Mock Job Data matching DB Schema exactly
  const [jobs, setJobs] = useState([
    { 
      id: "44bfd283-...", 
      company_name: "Google", 
      role_title: "Software Engineer", 
      min_cgpa: "8.00", 
      max_backlogs: 0, 
      allowed_branches: "CSE, IT", 
      ctc: "25.00", 
      job_description: "Backend and Full Stack Development", 
      deadline: "2027-07-30", 
      apply_link: "https://careers.google.com" 
    },
    { 
      id: "ccb2a2e8-...", 
      company_name: "TCS", 
      role_title: "Digital Engineer", 
      min_cgpa: "7.00", 
      max_backlogs: 1, 
      allowed_branches: "CSE, IT, ECE, EEE, MECH", 
      ctc: "7.50", 
      job_description: "Digital Engineering Role", 
      deadline: "2027-08-15", 
      apply_link: "https://nextstep.tcs.com" 
    }
  ]);

  // Form State mapping to DB columns (excluding id, created_by, created_at)
  const initialJobForm = { 
    company_name: '', 
    role_title: '', 
    min_cgpa: '', 
    max_backlogs: '', 
    allowed_branches: '', 
    ctc: '', 
    job_description: '', 
    deadline: '', 
    apply_link: '' 
  };
  const [jobForm, setJobForm] = useState(initialJobForm);

  const handleLogout = () => {
    // Clear auth token logic here
    navigate('/login');
  };

  const handleJobFormChange = (e) => {
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });
  };

  const handleSaveJob = (e) => {
    e.preventDefault();
    // API logic to save/update job goes here
    alert("Job saved successfully!");
    setIsFormOpen(false);
    setJobForm(initialJobForm);
  };

  const handleDeleteJob = (id) => {
    if(window.confirm("Are you sure you want to delete this job posting?")) {
      // API logic to delete job goes here
      alert(`Job deleted.`);
    }
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    if (!newAdminEmail.endsWith('@student.nitw.ac.in')) {
      alert("Admin privileges can only be granted to official college email addresses.");
      return;
    }
    // API logic to grant admin rights goes here
    alert(`${newAdminEmail} has been granted Admin rights!`);
    setNewAdminEmail('');
  };

  return (
    <div className="dashboard-page">
      <nav className="navbar">
        <div className="nav-logo">
          <GraduationCap size={32} />
          <span>Admin Portal</span>
        </div>
        <div className="nav-auth">
          <button onClick={handleLogout} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Placement Cell Administrator</h1>
          <p>Manage job postings, view statistics, and control portal access.</p>
        </div>

        <div className="dashboard-tabs">
          <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => {setActiveTab('overview'); setIsFormOpen(false);}}>
            <LayoutDashboard size={20} /> Overview
          </button>
          <button className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`} onClick={() => setActiveTab('jobs')}>
            <Briefcase size={20} /> Manage Jobs
          </button>
          <button className={`tab-btn ${activeTab === 'admins' ? 'active' : ''}`} onClick={() => {setActiveTab('admins'); setIsFormOpen(false);}}>
            <ShieldCheck size={20} /> Manage Admins
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Total Registered Students</span>
              <span className="stat-value">{stats.totalStudents}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Eligible for Placements</span>
              <span className="stat-value">{stats.eligibleStudents}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Active Job Postings</span>
              <span className="stat-value">{stats.activeJobs}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Offers Extended</span>
              <span className="stat-value" style={{ color: '#16a34a' }}>{stats.offersExtended}</span>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div>
            {!isFormOpen ? (
              <>
                <button className="btn-primary" onClick={() => setIsFormOpen(true)} style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus size={18} /> Post New Job
                </button>
                <div className="jobs-grid">
                  {jobs.map(job => (
                    <div key={job.id} className="job-card" style={{ display: 'flex', flexDirection: 'column' }}>
                      <div className="job-company">{job.company_name}</div>
                      <h3 className="job-title" style={{ marginBottom: '1rem' }}>{job.role_title}</h3>
                      <div className="job-details" style={{ fontSize: '0.9rem', marginBottom: '1rem', flexGrow: 1 }}>
                        <p><strong>CTC:</strong> {job.ctc} LPA</p>
                        <p><strong>Deadline:</strong> {job.deadline}</p>
                        <p><strong>Min CGPA:</strong> {job.min_cgpa}</p>
                        <p><strong>Max Backlogs:</strong> {job.max_backlogs}</p>
                      </div>
                      <div className="action-buttons">
                        <button className="btn-edit" onClick={() => { setJobForm(job); setIsFormOpen(true); }}>Edit</button>
                        <button className="btn-delete" onClick={() => handleDeleteJob(job.id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="profile-view" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{jobForm.id ? 'Edit Job Posting' : 'Create New Job Posting'}</h2>
                  <button onClick={() => {setIsFormOpen(false); setJobForm(initialJobForm);}} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Cancel</button>
                </div>
                
                <form onSubmit={handleSaveJob} className="auth-form">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="form-group">
                      <label>Company Name</label>
                      <input type="text" name="company_name" value={jobForm.company_name} onChange={handleJobFormChange} required className="form-input" />
                    </div>
                    <div className="form-group">
                      <label>Role Title</label>
                      <input type="text" name="role_title" value={jobForm.role_title} onChange={handleJobFormChange} required className="form-input" />
                    </div>
                    <div className="form-group">
                      <label>CTC (LPA)</label>
                      <input type="number" step="0.01" name="ctc" value={jobForm.ctc} onChange={handleJobFormChange} required className="form-input" />
                    </div>
                    <div className="form-group">
                      <label>Deadline Date</label>
                      <input type="date" name="deadline" value={jobForm.deadline} onChange={handleJobFormChange} required className="form-input" />
                    </div>
                    <div className="form-group">
                      <label>Min CGPA</label>
                      <input type="number" step="0.01" name="min_cgpa" value={jobForm.min_cgpa} onChange={handleJobFormChange} required className="form-input" />
                    </div>
                    <div className="form-group">
                      <label>Max Backlogs Allowed</label>
                      <input type="number" name="max_backlogs" value={jobForm.max_backlogs} onChange={handleJobFormChange} required className="form-input" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Allowed Branches (comma separated)</label>
                    <input type="text" name="allowed_branches" value={jobForm.allowed_branches} onChange={handleJobFormChange} placeholder="e.g. CSE, IT, ECE" required className="form-input" />
                  </div>

                  <div className="form-group">
                    <label>Job Description</label>
                    <textarea name="job_description" value={jobForm.job_description} onChange={handleJobFormChange} rows="3" required className="form-input" style={{ resize: 'vertical' }}></textarea>
                  </div>

                  <div className="form-group">
                    <label>Application Link (Optional)</label>
                    <input type="url" name="apply_link" value={jobForm.apply_link || ''} onChange={handleJobFormChange} placeholder="https://..." className="form-input" />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
                    {jobForm.id ? 'Save Changes' : 'Publish Job'}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {activeTab === 'admins' && (
          <div className="profile-view" style={{ maxWidth: '600px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Grant Admin Privileges</h2>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>Enter the registered email of the user you want to promote to Placement Administrator.</p>
            
            <form onSubmit={handleAddAdmin} className="auth-form">
              <div className="form-group">
                <label>User Email Address</label>
                <input 
                  type="email" 
                  value={newAdminEmail} 
                  onChange={(e) => setNewAdminEmail(e.target.value)} 
                  placeholder="student@student.nitw.ac.in" 
                  required 
                  className="form-input" 
                />
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
                <Users size={18} style={{ marginRight: '0.5rem' }} /> Make Admin
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;  