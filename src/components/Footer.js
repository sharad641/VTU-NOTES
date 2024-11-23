// src/components/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>VTU-NOTES</h3>
        <p>Helping Engineering Students Succeed with High-Quality Notes & Resources</p>
      </div>
      
      <div className="footer-links">
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
        </ul>
      </div>

     

      <div className="footer-bottom">
        <p>&copy; 2024 VTU-NOTES | All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
