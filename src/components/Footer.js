import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-logo">VTU-NOTES</h3>
        <p className="footer-description">
          Helping Engineering Students Succeed with High-Quality Notes & Resources
        </p>
      </div>

      <div className="footer-links">
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
        </ul>
      </div>

      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com/vtuno_tes/" target="_blank" rel="noreferrer" className="social-icon">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/in/sharad-patil-691902259?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer" className="social-icon">
          <i className="fab fa-linkedin-in"></i>
          
        </a>
        
      </div>
       {/* Follow Us Section */}
    <h4>Follow Us</h4>
    <ul className="follow-us-list">
    <li><a href="https://chat.whatsapp.com/GV4LJ4FE4I1KvCyM6DTbsG" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp"></i>Whatsapp </a></li>
    <li><a href="https://chat.whatsapp.com/IK3T3NpNZNWG9SY3ai1h8t" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp"></i>Whatsapp </a></li>
    
    
</ul>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} VTU-NOTES | All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
