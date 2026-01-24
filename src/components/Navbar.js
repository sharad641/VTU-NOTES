import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  FaSearch, FaBars, FaTimes, FaHome, FaBook, FaGraduationCap,
  FaCalculator, FaRocket, FaBriefcase
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import MobileBottomNav from "./MobileBottomNav";
import "./NavbarModern.css";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(location.pathname);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setHoveredPath(location.pathname);
  }, [location.pathname]);

  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Notes", path: "/branch-selection/2022", icon: <FaBook /> },
    { name: "Placement", path: "/placement-stories", icon: <FaBriefcase /> },
    { name: "Model Papers", path: "/model-papers", icon: <FaGraduationCap /> },
    { name: "SGPA", path: "/sgpa-calculator", icon: <FaCalculator /> },
    { name: "Projects", path: "/project-enquiry", icon: <FaRocket /> },
  ];

  return (
    <header className={`nav-portal-layer ${scrolled ? "layer-scrolled" : ""}`}>
      {/* Dynamic News Ticker */}
      <div className="nav-ticker-bar">
        <div className="ticker-track">
          <p>
            <span className="ticker-badge">UPDATED 2024</span>
            All Computer Science (CSE) modules updated for Academic Year 2024-25.
            <span className="ticker-sep">•</span>
            SGPA Calculator now supports latest VTU schemes.
            <span className="ticker-sep">•</span>
            New PYQs added for 7th & 8th Semesters.
          </p>
        </div>
      </div>

      <nav className="nav-main-island">
        <div className="nav-flex-container">
          {/* Futuristic Brand Logo */}
          <Link to="/" className="nav-brand-area" onClick={closeMenu}>
            <div className="nav-logo-wrapper">
              <img
                src="/Gemini_Generated_Image_rxara5rxara5rxar.png"
                alt="VTU Portal Logo"
                className="nav-logo-image"
              />
            </div>
            <div className="nav-brand-info">
              <h1 className="nav-brand-title">VTU<span className="accent-glow">NOTESFORALL</span></h1>
              <p className="nav-brand-tagline">Study Smart. Lead More.</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links-hub">
            <ul className="nav-list-desktop" onMouseLeave={() => setHoveredPath(location.pathname)}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`nav-link-item ${isActive ? "is-active" : ""}`}
                      onMouseEnter={() => setHoveredPath(link.path)}
                    >
                      <span style={{ position: "relative", zIndex: 10 }}>{link.name}</span>
                      {hoveredPath === link.path && (
                        <motion.div
                          layoutId="navbar-spotlight"
                          className="nav-item-bg"
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(255, 255, 255, 0.1)",
                            borderRadius: "50px",
                            zIndex: 0,
                          }}
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="nav-item-active-ring"
                          style={{
                             position: "absolute",
                             inset: 0,
                             border: "1px solid rgba(124, 58, 237, 0.5)",
                             borderRadius: "50px",
                             zIndex: 2,
                             boxShadow: "0 0 15px rgba(124, 58, 237, 0.2)"
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Action Cluster */}
          <div className="nav-action-cluster">
            <div className="nav-btn-group">
              <Link to={user ? "/profile" : "/login"} className="nav-auth-premium">
                {user ? (
                  <div className="nav-user-avatar">
                    <img src={user.photoURL || "https://ui-avatars.com/api/?name=User"} alt="User" />
                  </div>
                ) : (
                  <span className="nav-login-btn">Login</span>
                )}
              </Link>

              <button className="nav-mobile-switch" onClick={() => setIsOpen(!isOpen)}>
                <div className={`nav-burger ${isOpen ? "open" : ""}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="nav-mobile-overlay"
            onClick={closeMenu}
          >
            <div className="mobile-overlay-glass"></div>
            <motion.div
              className="mobile-menu-container"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-menu-header">
                <div className="nav-brand-title">VTU<span className="accent-glow">PORTAL</span></div>
                <button className="mobile-close-btn" onClick={closeMenu}><FaTimes /></button>
              </div>

              <div className="mobile-menu-items">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={closeMenu}
                    className={`mobile-menu-row ${location.pathname === link.path ? "active" : ""}`}
                  >
                    <span className="item-icon">{link.icon}</span>
                    <span className="item-label">{link.name}</span>
                  </Link>
                ))}
              </div>

              <div className="mobile-menu-action">
                <Link to={user ? "/profile" : "/login"} className="mobile-cta-premium" onClick={closeMenu}>
                  {user ? "View Dashboard" : "Get Started Now"}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <MobileBottomNav />
    </header>
  );
};

export default Navbar;