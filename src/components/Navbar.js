import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  FaSearch, FaBars, FaTimes, FaHome, FaBook, FaGraduationCap,
  FaCalculator, FaRocket, FaBriefcase, FaChevronDown
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
    { 
      name: "Placement", 
      path: "/placement-guide", // Default path
      icon: <FaBriefcase />,
      submenu: [
        { name: "Guide & Roadmap", path: "/placement-guide" },
        // { name: "Resume Builder", path: "/resume-builder" },
        { name: "Success Stories", path: "/placement-stories" },
        { name: "Share Experience", path: "/share-experience" },
        { name: "Mock Tests", path: "/test" }
      ]
    },
    { name: "Model Papers", path: "/model-papers", icon: <FaGraduationCap /> },
    { name: "Career & Tools", path: "/career-tools", icon: <FaRocket /> },
    { name: "SGPA", path: "/sgpa-calculator", icon: <FaCalculator /> },
    { name: "Projects", path: "/project-enquiry", icon: <FaRocket /> },
  ];

  return (
    <header className={`nav-portal-layer ${scrolled ? "layer-scrolled" : ""}`}>
      {/* Dynamic News Ticker */}
      <div className="nav-ticker-bar">
        <div className="ticker-track">
          <p>
            <span className="ticker-badge">UPDATED 2026</span>
            All Computer Science (CSE) modules updated for Academic Year 2026.
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
          {/* Brand Removed as per user request */}

          {/* Desktop Navigation */}
          <div className="nav-links-hub">
            <ul className="nav-list-desktop" onMouseLeave={() => setHoveredPath(location.pathname)}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.submenu && link.submenu.some(sub => location.pathname === sub.path));
                const hasSubmenu = !!link.submenu;

                return (
                  <li 
                    key={link.name} 
                    className={hasSubmenu ? "nav-item-dropdown-wrapper" : ""}
                    onMouseEnter={() => setHoveredPath(link.path)}
                  >
                    <Link
                      to={link.path}
                      className={`nav-link-item ${isActive ? "is-active" : ""}`}
                    >
                      <span style={{ position: "relative", zIndex: 10, display: 'flex', alignItems: 'center', gap: '5px' }}>
                        {link.name} 
                        {hasSubmenu && <FaChevronDown style={{ fontSize: '0.7em', opacity: 0.7 }} />}
                      </span>
                      
                      {hoveredPath === link.path && !hasSubmenu && (
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
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      {isActive && !hasSubmenu && (
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

                    {/* Dropdown Menu */}
                    {hasSubmenu && (
                      <div className="nav-dropdown-menu">
                        {link.submenu.map((subItem) => (
                          <Link key={subItem.name} to={subItem.path} className="nav-dropdown-item">
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
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

              <button className="nav-mobile-switch" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Navigation Menu">
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
                <button className="mobile-close-btn" onClick={closeMenu} aria-label="Close Menu"><FaTimes /></button>
              </div>

              <div className="mobile-menu-items">
                {navLinks.map((link) => (
                  <MobileNavItem 
                    key={link.name} 
                    link={link} 
                    closeMenu={closeMenu} 
                    isActive={location.pathname === link.path || (link.submenu && link.submenu.some(sub => location.pathname === sub.path))}
                    location={location}
                  />
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
      <MobileBottomNav isMobileMenuOpen={isOpen} />
    </header>
  );
};

// Helper Component for Mobile Nav Items
const MobileNavItem = ({ link, closeMenu, isActive, location }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubmenu = !!link.submenu;

  return (
    <div className="mobile-nav-group">
      <div className={`mobile-menu-row ${isActive ? "active" : ""}`}>
        <Link
          to={link.path}
          onClick={closeMenu}
          className="mobile-link-content"
          style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}
        >
          <span className="item-icon">{link.icon}</span>
          <span className="item-label">{link.name}</span>
        </Link>
        
        {hasSubmenu && (
          <button 
            className="mobile-submenu-toggle"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'white', 
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronDown />
            </motion.div>
          </button>
        )}
      </div>

      <AnimatePresence>
        {hasSubmenu && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="mobile-submenu-container" style={{ 
                background: 'rgba(255,255,255,0.03)', 
                margin: '0 1rem 1rem', 
                borderRadius: '12px',
                padding: '0.5rem'
            }}>
              {link.submenu.map((sub) => (
                <Link
                  key={sub.name}
                  to={sub.path}
                  onClick={closeMenu}
                  className="mobile-submenu-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.8rem 1rem',
                    color: '#ccc',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    marginBottom: '2px',
                    borderRadius: '8px',
                    transition: 'background 0.2s'
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: location.pathname === sub.path ? '#00F0FF' : '#555', marginRight: '10px' }}></span>
                  {sub.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;