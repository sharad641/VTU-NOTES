// src/components/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-content">
          <h3>VTU-NOTES</h3>
          <p>Helping Engineering Students Succeed with High-Quality Notes & Resources</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="https://chat.whatsapp.com/GV4LJ4FE4I1KvCyM6DTbsG" target="_blank" rel="noopener noreferrer">Whatsapp 1</a></li>
            <li><a href="https://chat.whatsapp.com/IK3T3NpNZNWG9SY3ai1h8t" target="_blank" rel="noopener noreferrer">Whatsapp 2</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/vtuno_tes/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 VTU-NOTES | All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
