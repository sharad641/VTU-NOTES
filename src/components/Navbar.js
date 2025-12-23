import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth, database } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";
import {
  Rocket,
  LogIn,
  Sparkles,
  Home,
  BookOpen,
  Layers,
  Calculator,
  Briefcase,
  X,
  Menu,
  User,
  ChevronRight,
  Search,
  FileText,
  Users,
  Contact,
  Info,
  GraduationCap,
  Mail
} from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ initials: "", photoURL: "" });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  // --- 1. Handle Responsive Breakpoints ---
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768 && menuOpen) {
        closeMenu();
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  // --- 2. Scroll Effect ---
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- 3. Auth State Listener ---
  useEffect(() => {
    return onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        return;
      }
      setUser(currentUser);

      if (currentUser.isAnonymous) {
        setProfile({ initials: "G", photoURL: "" });
        return;
      }

      try {
        const snap = await get(ref(database, `users/${currentUser.uid}`));
        const data = snap.exists() ? snap.val() : {};
        const nameParts = (data?.name || currentUser.displayName || "User").split(" ");
        const initials = nameParts.map((n) => n[0]).join("").substring(0, 2).toUpperCase();

        setProfile({
          initials,
          photoURL: data.photoURL || currentUser.photoURL || "",
        });
      } catch (err) {
        setProfile({ initials: "U", photoURL: "" });
      }
    });
  }, []);

  // --- 4. Menu Handlers ---
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? "hidden" : "auto";
      return newState;
    });
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  // --- 5. Navigation Config ---
  const mainLinks = [
    { to: "/", label: "Home", icon: <Home size={20} /> },
    
    { to: "/sgpa-calculator", label: "SGPA Calculator", icon: <Calculator size={20} /> },
    
    { to: "/model-papers", label: "Model QP & PYQPs", icon: <BookOpen size={20} /> },
    { to: "/branch/cse", label: "CSE Stream", icon: <GraduationCap size={20} /> },
   
    { to: "/sgpa-calculator", label: "SGPA Calculator", icon: <Calculator size={20} /> },
    { to: "/project-enquiry", label: "🚀 Project Enquiry", icon: <Rocket size={20} /> },
  ];

  const contactLink = { to: "/contact", label: "Contact", icon: <Contact size={20} /> };
  const placementLink = { to: "/placement-stories", label: "Placements Stories", icon: <Users size={20} /> };

  // --- 6. Profile Render ---
  const renderProfile = () => (
    <div className="profile-badge">
      {profile.photoURL ? (
        <img src={profile.photoURL} alt="User" className="profile-img" />
      ) : (
        <div className="avatar-placeholder">{profile.initials}</div>
      )}
    </div>
  );

  // Desktop navigation links (show first 4 links + placements + contact)
  const desktopMainLinks = [
    ...mainLinks.slice(0, 4), // First 4 links: Home, About, Notes, Model Papers
    placementLink, // Placements link
    contactLink // Contact link
  ];

  return (
    <>
      {/* =========== DESKTOP NAVBAR =========== */}
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <Sparkles size={20} />
            </div>
            
          </Link>

          {/* Center Navigation */}
          <nav className="desktop-nav">
            {desktopMainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-item ${location.pathname === link.to ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="navbar-actions">
            {/* Search on Desktop */}
            <Link to="/search" className="search-btn" aria-label="Search">
              <Search size={20} />
            </Link>

            {/* CTA Button (Project Enquiry) */}
            <Link to="/project-enquiry" className="cta-button">
              <Rocket size={18} />
              <span>Projects</span>
            </Link>

            {/* Profile */}
            <Link to={user ? "/profile" : "/login"} className="auth-trigger">
              {user ? renderProfile() : (
                <div className="login-btn">
                  <LogIn size={18} />
                  <span>Login</span>
                </div>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button className="menu-toggle" onClick={toggleMenu} aria-label="Menu">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* =========== MOBILE DRAWER =========== */}
      <div className={`drawer-overlay ${menuOpen ? "visible" : ""}`} onClick={closeMenu} />
      
      <aside className={`drawer ${menuOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <Link to="/" className="drawer-logo" onClick={closeMenu}>
            <Sparkles size={20} />
            <span>VTU Notes</span>
          </Link>
          <button className="close-btn" onClick={closeMenu} aria-label="Close">
            <X size={24} />
          </button>
        </div>

        <div className="drawer-content">
          {user && (
            <Link to="/profile" className="drawer-user-card" onClick={closeMenu}>
              {renderProfile()}
              <div className="user-info">
                <span className="name">{user.displayName || "Student"}</span>
                <span className="email">{user.email?.split('@')[0]}</span>
              </div>
            </Link>
          )}

          <div className="drawer-links">
            <span className="section-title">Navigation</span>
            {mainLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className={`drawer-item ${location.pathname === link.to ? "active" : ""}`}
                onClick={closeMenu}
              >
                <span className="icon-wrapper">{link.icon}</span>
                {link.label}
                <ChevronRight size={16} className="arrow" />
              </Link>
            ))}
            
            {/* Contact Link in drawer */}
            <Link 
              to={contactLink.to} 
              className={`drawer-item ${location.pathname === contactLink.to ? "active" : ""}`}
              onClick={closeMenu}
            >
              <span className="icon-wrapper">{contactLink.icon}</span>
              {contactLink.label}
              <ChevronRight size={16} className="arrow" />
            </Link>
          </div>

          <div className="drawer-footer">
            {!user ? (
              <Link to="/login" className="drawer-btn primary" onClick={closeMenu}>
                <LogIn size={18} /> Sign In
              </Link>
            ) : (
              <Link to="/profile" className="drawer-btn secondary" onClick={closeMenu}>
                <User size={18} /> My Profile
              </Link>
            )}
            
            {/* Quick Actions */}
            <div className="quick-actions">
              <Link to="/search" className="quick-action" onClick={closeMenu}>
                <Search size={18} /> Search
              </Link>
              <Link to="/help" className="quick-action" onClick={closeMenu}>
                <Briefcase size={18} /> Help
              </Link>
              <Link to="/contact" className="quick-action" onClick={closeMenu}>
                <Mail size={18} /> Contact
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* =========== MOBILE BOTTOM NAV =========== */}
      {isMobile && (
        <nav className="mobile-bottom-nav">
          <div className="bottom-nav-container">
            {[
              { to: "/", icon: <Home size={22} />, label: "Home" },
               { to: "/placement-stories", icon: <Users size={22} />, label: "Placements" },
             
              { to: "/search", icon: <Search size={22} />, label: "Search" },
              { to: "/model-papers", icon: <BookOpen size={22} />, label: "QP" },
            { to: "/sgpa-calculator", label: "Calculator", icon: <Calculator size={20} /> },
              { to: user ? "/profile" : "/login", icon: user ? renderProfile() : <User size={22} />, label: user ? "Me" : "Login" }
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`bottom-nav-item ${location.pathname === item.to ? "active" : ""}`}
              >
                <div className="nav-icon">{item.icon}</div>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;