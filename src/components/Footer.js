import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaChevronRight } from "react-icons/fa";
import "./FooterModern.css";

const Footer = ({ handleBranchClick }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-modern">
      <div className="footer-glass-mesh"></div>

      <div className="footer-container">
        <div className="footer-top-section">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <div className="footer-brand-header">
              <div className="brand-logo-glow">VTU</div>
              <div className="brand-info">
                <h3>Notes For All</h3>
                <p>Curated VTU Excellence</p>
              </div>
            </div>
            <p className="brand-philosophy">
              Elevating the academic experience for VTU students. We provide more than just notes; we provide a clear path to exam success with curated, high-quality resources.
            </p>
            <div className="brand-contact-glass">
              <div className="glass-item">
                <FaEnvelope className="glass-icon" />
                <span>support@vtunotesforall.in</span>
              </div>
              <div className="glass-item">
                <FaMapMarkerAlt className="glass-icon" />
                <span>Karnataka, India</span>
              </div>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="footer-col nav-col">
            <h4 className="footer-title-modern">Quick Navigation</h4>
            <ul className="footer-links-modern">
              <li><Link to="/"><FaChevronRight className="link-arrow" /> Home Dashboard</Link></li>
              <li><Link to="/about"><FaChevronRight className="link-arrow" /> Our Story</Link></li>
              <li><Link to="/faq"><FaChevronRight className="link-arrow" /> FAQs</Link></li>
              <li><Link to="/contact"><FaChevronRight className="link-arrow" /> Help Center</Link></li>
              <li><Link to="/project-enquiry"><FaChevronRight className="link-arrow" /> Projects Hub</Link></li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div className="footer-col nav-col">
            <h4 className="footer-title-modern">Student Tools</h4>
            <ul className="footer-links-modern">
              <li><Link to="/sgpa-calculator"><FaChevronRight className="link-arrow" /> SGPA Calculator</Link></li>
              <li><Link to="/model-papers"><FaChevronRight className="link-arrow" /> Model Papers</Link></li>
              <li><Link to="/privacy-policy"><FaChevronRight className="link-arrow" /> Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Community & Newsletter */}
          <div className="footer-col highlight-col">
            <h4 className="footer-title-modern">Join Community</h4>
            <p className="newsletter-hint">Stay ahead with the latest VTU updates and resources.</p>

            <div className="social-glass-buttons">
              <a href="#" className="social-pill instagram"><FaInstagram /></a>
              <a href="#" className="social-pill whatsapp"><FaWhatsapp /></a>
              <a href="#" className="social-pill linkedin"><FaLinkedin /></a>
            </div>

            <button className="footer-cta-btn">
              Explore Projects <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="footer-divider-modern"></div>

        <div className="footer-bottom-modern">
          <div className="bottom-left">
            <p>© {currentYear} VTU Notes For All. Crafted for Excellence.</p>
          </div>
          <div className="bottom-right">
            <Link to="/terms-and-conditions" className="footer-legal-link">Terms of Service</Link>
            <span className="dot-sep">•</span>
            <Link to="/privacy-policy" className="footer-legal-link">Privacy</Link>
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