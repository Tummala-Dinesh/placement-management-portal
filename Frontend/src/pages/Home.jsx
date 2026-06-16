import React from 'react';
import Navbar from '../components/Navbar';
import { ArrowRight, Briefcase, TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />

      <section id="home" className="hero-section">
        <div className="hero-grid">
          
          <div className="hero-content">
            <div className="tagline">Empowering the next generation</div>
            <h1 className="hero-title">
              Bridge the gap between <br/>
              <span className="highlight">Ambition</span> and <span className="highlight">Opportunity</span>.
            </h1>
            <p className="hero-subtitle">
              A centralized platform designed to streamline campus recruitment. Students discover top-tier roles, and our dedicated placement cell handles all corporate partnerships.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn-primary">
                <span>Student Registration</span>
                <ArrowRight size={20} />
              </Link>
              <a href="#about" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Students collaborating" 
                className="hero-image"
              />
              <div className="floating-badge hidden-mobile">
                <span className="badge-number">100%</span>
                <span className="badge-text">Placement Support</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Platform Access</h2>
          <p>Secure portals for students and placement administrators.</p>
        </div>

        <div className="features-grid">
          
          <div className="feature-card card-student">
            <div className="icon-wrapper">
              <Briefcase size={28} />
            </div>
            <h3 className="feature-title">For Students</h3>
            <p className="feature-text">Build your academic profile, track real-time application statuses, and apply to authorized company drives with a single click.</p>
            <Link to="/register" className="card-link">Apply Now <ChevronRight size={16} /></Link>
          </div>

          <div className="feature-card card-admin">
            <div className="icon-wrapper">
              <TrendingUp size={28} />
            </div>
            <h3 className="feature-title">For Admins</h3>
            <p className="feature-text">Manage corporate relationships, post jobs on behalf of companies, verify student eligibility, and generate placement reports.</p>
            <Link to="/login" className="card-link">Admin Portal <ChevronRight size={16} /></Link>
          </div>

        </div>
      </section>

      <section id="about" className="about-section">
        <div className="about-content">
          <h2>About the Placement Cell</h2>
          <p>
            Our objective is to provide a robust framework that connects our brightest minds with leading industry giants. 
            Corporate partners contact our on-campus administrators directly, ensuring a highly vetted, secure, and streamlined process 
            from job posting to final offer.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Home;