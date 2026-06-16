import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="#home" className="nav-logo">
        <GraduationCap size={32} />
        <span>PlacementPortal</span>
      </a>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#features">Features</a>
        <a href="#about">About Us</a>
      </div>

      <div className="nav-auth">
        <Link to="/login" className="btn-login">Log in</Link>
        <Link to="/register" className="btn-register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;