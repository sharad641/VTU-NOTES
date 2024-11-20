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
        
        <div className="footer-social">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="https://chat.whatsapp.com/GV4LJ4FE4I1KvCyM6DTbsG" target="_blank" rel="noopener noreferrer">Whatsapp 1</a></li>
            <li><a href="https://chat.whatsapp.com/IK3T3NpNZNWG9SY3ai1h8t" target="_blank" rel="noopener noreferrer">Whatsapp 2</a></li>
            <li><a href="https://www.linkedin.com/in/sharad-patil-691902259?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/vtuno_tes/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
        <div className="footer-discussion-box">
          <h4>Student Group Discussions</h4>
          <p>Join our community of students to discuss, share resources, and help each other succeed!</p>
          <ul>
            <li><a href="https://chat.whatsapp.com/GV4LJ4FE4I1KvCyM6DTbsG" target="_blank" rel="noopener noreferrer">WhatsApp Group 1</a></li>
            <li><a href="https://chat.whatsapp.com/IK3T3NpNZNWG9SY3ai1h8t" target="_blank" rel="noopener noreferrer">WhatsApp Group 2</a></li>
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
