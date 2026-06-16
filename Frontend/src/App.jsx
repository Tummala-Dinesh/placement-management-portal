import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<div style={{ textAlign: 'center', padding: '5rem', fontSize: '1.5rem' }}>Student Login Page Coming Soon</div>} />
        <Route path="/register" element={<div style={{ textAlign: 'center', padding: '5rem', fontSize: '1.5rem' }}>Student Registration Page Coming Soon</div>} />
      </Routes>
    </Router>
  );
}

export default App;