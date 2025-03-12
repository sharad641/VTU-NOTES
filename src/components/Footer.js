import React from "react";
import PropTypes from "prop-types";
import "./Footer.css";

const Footer = ({ handleBranchClick }) => {
  // Dynamic Social Links
  const socialLinks = [
    { href: "https://facebook.com", icon: "fab fa-facebook-f", label: "Facebook" },
    { href: "https://twitter.com", icon: "fab fa-twitter", label: "Twitter" },
    { href: "https://linkedin.com", icon: "fab fa-linkedin-in", label: "LinkedIn" },
  ];

  // Reusable Footer Link Component
  const FooterLink = ({ href, label }) => (
    <li>
      <a href={href}>{label}</a>
    </li>
  );

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Logo and Description */}
        <div className="footer-section footer-logo-section">
          <h2 className="footer-logo">VTU Notes</h2>
          <p className="footer-description">
  Discover a comprehensive collection of VTU engineering notes, study materials, and resources. Simplify your learning journey with easy access to high-quality content tailored for every branch and semester.
</p>

        </div>

        {/* Quick Links Section */}
        <div className="footer-section footer-links">
          <h4>Quick Links</h4>
          <ul>
            <FooterLink href="/about" label="About Us" />
            <FooterLink href="/contact" label="Contact" />
            <FooterLink href="/privacy-policy" label="Privacy Policy" />
            <FooterLink href="/terms-and-conditions" label="Terms and Conditions" />
          </ul>
        </div>

        {/* Study Resources Section */}
        <div className="footer-section footer-study-resources">
          <h4>Study Resources</h4>
          <ul>
            <li>
              <button
                className="button"
                onClick={() => handleBranchClick("first-year")}
                aria-label="1st Year Engineering"
              >
                1st Year Engineering
              </button>
            </li>
            <li>
              <button
                className="button"
                onClick={() => handleBranchClick("cse")}
                aria-label="CSE Stream"
              >
                CSE Stream
              </button>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-section footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="social-icon"
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to Top"
      >
        ↑ Back to Top
      </button>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} VTU Notes. All rights reserved. |{" "}
          <a href="/terms-and-conditions">Terms</a> |{" "}
          <a href="/privacy-policy">Privacy</a>
        </p>
      </div>
    </footer>
  );
};

// PropType Validation
Footer.propTypes = {
  handleBranchClick: PropTypes.func.isRequired,
};

// Exporting Component
export default Footer;
