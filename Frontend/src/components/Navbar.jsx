import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();

    if (location.pathname !== '/') {
      window.location.href = `/${targetId}`;
    } else {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="navbar">
      <a href="#home" className="nav-logo" onClick={(e) => handleNavClick(e, '#home')}>
        <GraduationCap size={32} />
        <span>PlacementPortal</span>
      </a>

      <div className="nav-links">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a>
        <a href="#features" onClick={(e) => handleNavClick(e, '#features')}>Platform Access</a>
        <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About Us</a>
      </div>

      <div className="nav-auth">
        <Link to="/login" className="btn-login">Log in</Link>
        <Link to="/register" className="btn-register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;