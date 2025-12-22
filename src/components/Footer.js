import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaChevronRight } from "react-icons/fa";
import "./Footer.css";

const Footer = ({ handleBranchClick }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="modern-footer">
      <div className="footer-content">
        
        {/* Column 1: Brand & About */}
        <div className="footer-col brand-col">
          <h2 className="footer-logo">VTU <span className="highlight">Notes</span></h2>
          <p className="footer-desc">
            Your one-stop destination for VTU engineering resources. 
            We simplify learning with curated notes, question papers, and 
            project guidance for all semesters.
          </p>
          <div className="contact-mini">
            <div className="icon-row"><FaEnvelope /> support@vtunotesforall.in</div>
            <div className="icon-row"><FaMapMarkerAlt /> Karnataka, India</div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/"><FaChevronRight /> Home</Link></li>
            <li><Link to="/about"><FaChevronRight /> About Us</Link></li>
            <li><Link to="/contact"><FaChevronRight /> Contact</Link></li>
            <li><Link to="/project-enquiry"><FaChevronRight /> Projects</Link></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div className="footer-col">
          <h4>Resources</h4>
          <ul className="footer-links">
           
            <li><Link to="/sgpa-calculator"><FaChevronRight /> SGPA Calculator</Link></li>
            <li><Link to="/model-papers"><FaChevronRight /> Model Papers</Link></li>
          </ul>
        </div>

        {/* Column 4: Socials & Legal */}
        <div className="footer-col">
          <h4>Stay Connected</h4>
          <p className="social-text">Join our community for updates.</p>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="sc-icon"><FaInstagram /></a>
            <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="sc-icon"><FaWhatsapp /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="sc-icon"><FaLinkedin /></a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="bottom-container">
          <p>© {currentYear} VTU Notes For All. All rights reserved.</p>
          <div className="legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="separator">•</span>
            <Link to="/terms-and-conditions">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  handleBranchClick: PropTypes.func.isRequired,
};

export default Footer;