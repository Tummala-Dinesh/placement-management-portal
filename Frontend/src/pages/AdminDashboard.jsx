import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, LayoutDashboard, Briefcase, Users, Plus, ShieldCheck } from 'lucide-react';
import '../styles/Navbar.css'; 
import '../styles/Dashboard.css';
import api from "../services/api";

const AdminDashboard = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [activeTab, setActiveTab] = useState('overview');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [editingJobId, setEditingJobId] = useState(null);

  // Dummy Placement Stats
  

  const [stats, setStats] = useState({
    totalStudents: 0,
    placedStudents: 0,
    unplacedStudents: 0,
    placementRate: 0,
    highestPackage: 0,
    averagePackage: 0,
    topRecruiters: []
  });

const fetchStats = async () => {
  try {
    const response = await api.get(
      "/admin/dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setStats(response.data);

  } catch (err) {
    console.log(err);
  }
};

  // Mock Job Data matching DB Schema exactly
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const response = await api.get("/jobs",
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      setJobs(response.data);
    }
    catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
         fetchStats();
          fetchJobs();
  }, []);

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
    // Clear auth token logic 
    localStorage.clear();
    navigate('/login');
  };

  const handleJobFormChange = (e) => {
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });
  };

    const handleCreateJob = async () => {
    try {
        await api.post("/jobs",{
            ...jobForm,
            allowed_branches: jobForm.allowed_branches
                .split(',')
                .map(b => b.trim())
        },
          {
          headers: {
              Authorization: `Bearer ${token}`,
            },
        } );
    }
    catch(err){
        console.log(err);
    }
};


    const handleUpdateJob = async () => {
    try {
        await api.put(`/jobs/${editingJobId}`
          ,{
          ...jobForm,
            allowed_branches: jobForm.allowed_branches
                .split(',')
                .map(b => b.trim())
          },
        {
          headers: {
              Authorization: `Bearer ${token}`,
            },
        });

        alert("Job updated successfully!");

        setIsFormOpen(false);
        setEditingJobId(null);

        fetchJobs();   // Refresh jobs
    }
    catch (err) {
        console.error(err);
    }
};

 const handleSaveJob = async (e) => {
    e.preventDefault();

    try {
        if (editingJobId) {
            await handleUpdateJob();
        } else {
            await handleCreateJob();
        }

        await fetchJobs();

        alert(
            editingJobId
                ? "Job updated successfully!"
                : "Job created successfully!"
        );

        setIsFormOpen(false);
        setEditingJobId(null);
        setJobForm(initialJobForm);

    } catch (err) {
        console.log(err);
    }
};

  const handleDeleteJob = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this job posting?"
  );

  if (!confirmDelete) return;

  try {
    const response = await api.delete(`/jobs/${id}`,{
      headers: {
              Authorization: `Bearer ${token}`,
            },
    });

    console.log(response.data);

    // Remove the deleted job from state
    setJobs(prevJobs =>
      prevJobs.filter(job => job.id !== id)
    );

    alert("Job deleted successfully!");
  }
  catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to delete job"
    );
  }
};

 const handleAddAdmin = async (e) => {
  e.preventDefault();

  try {
    const response = await api.put(
      "/admin/make-admin",
      {
        email: newAdminEmail,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.message);
    setNewAdminEmail('');

  } catch (err) {
    console.error(err);

    alert(
      err.response?.data?.message ||
      "Something went wrong."
    );
  }
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
              <span className="stat-label">Placed Students</span>
              <span className="stat-value">{stats.placedStudents}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">UnPlaced Students</span>
              <span className="stat-value">{stats.unplacedStudents}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">PlacementRate</span>
              <span className="stat-value" style={{ color: '#16a34a' }}>{stats.placementRate} %</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Highest Package</span>
              <span className="stat-value">{stats.highestPackage}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Average Package</span>
              <span className="stat-value">{stats.averagePackage}</span>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div>
            {!isFormOpen ? (
              <>
                <button className="btn-primary" onClick={() => {setEditingJobId(null);
    setJobForm(initialJobForm);setIsFormOpen(true);}} style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus size={18} /> Post New Job
                </button>
                <div className="jobs-grid">
                  {jobs.map(job => (
                    <div key={job.id} className="job-card" style={{ display: 'flex', flexDirection: 'column' }}>
                      <div className="job-company">{job.company_name}</div>
                      <h3 className="job-title" style={{ marginBottom: '1rem' }}>{job.role_title}</h3>
                      <div className="job-details" style={{ fontSize: '0.9rem', marginBottom: '1rem', flexGrow: 1 }}>
                        <p><strong>CTC:</strong> {job.ctc} LPA</p>
                        <p>
                          <strong>Deadline:</strong>{" "}
                          {new Date(job.deadline).toLocaleDateString()}
                        </p>
                        <p><strong>Min CGPA:</strong> {job.min_cgpa}</p>
                        <p><strong>Max Backlogs:</strong> {job.max_backlogs}</p>
                      </div>
                      <div className="action-buttons">
                        <button
                            className="btn-edit"
                            onClick={() => {
                              setJobForm({
                                  ...job,
                                  allowed_branches: Array.isArray(job.allowed_branches)
                                      ? job.allowed_branches.join(', ')
                                      : job.allowed_branches.replace(/[{}]/g, '')
                              });

                              setEditingJobId(job.id);
                              setIsFormOpen(true);
}}
                        >
                            Edit
                        </button>
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
                  <button
                    onClick={() => {
                      setIsFormOpen(false);
                      setEditingJobId(null);   // <-- Add this
                      setJobForm(initialJobForm);
                    }}
                    className="btn-secondary"
                    style={{ padding: '0.5rem 1rem' }}
                  >
                    Cancel
                  </button>
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