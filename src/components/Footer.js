// src/components/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>VTU-NOTES</h3>
        <p>Helping Engineering Students Succeed with High-Quality Notes & Resources</p>
       
        <div className="footer-links">
          
          <a href="/contact">Contact</a>
          
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 VTU-NOTES | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
