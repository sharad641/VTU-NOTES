import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { auth, database } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileInfo, setProfileInfo] = useState({ photoURL: "", initials: "" });
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);

  // ✅ Auto close mobile menu when screen is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Firebase Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true);
        if (currentUser.isAnonymous) {
          setProfileInfo({
            photoURL:
              "https://www.pngmart.com/files/22/User-Avatar-Profile-Background-Isolated-PNG.png",
            initials: "G",
          });
        } else {
          const userRef = ref(database, `users/${currentUser.uid}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            const userPhotoURL = data.photoURL || currentUser.photoURL;
            const userInitials = data.name
              ? data.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "U";
            setProfileInfo({
              photoURL: userPhotoURL || "",
              initials: userInitials || "U",
            });
          } else {
            const userInitials = currentUser.displayName
              ? currentUser.displayName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "U";
            setProfileInfo({
              photoURL: currentUser.photoURL || "",
              initials: userInitials,
            });
          }
        }
      } else {
        setIsAuthenticated(false);
        setProfileInfo({ photoURL: "", initials: "" });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          VTU <span>Notes</span>
        </Link>

        {/* Navigation Links */}
        <ul className={`nav-links ${isMobileMenuOpen ? "mobile-nav-active" : ""}`}>
          {[
            { to: "/", text: "Home" },
            { to: "/about", text: "About" },
            { to: "/model-papers", text: "Model QP & PYQPs" },
            { to: "/branch/cse", text: "CSE Stream" },
            { to: "/sgpa-calculator", text: "SGPA Calculator" },
            { to: "/project-enquiry", text: "🚀 Project Enquiry" },
            { to: "/contact", text: "Contact" },
          ].map(({ to, text }) => (
            <li key={to}>
              <Link
                to={to}
                className={`nav-link ${location.pathname === to ? "active" : ""}`}
                onClick={closeMenu}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>

        {/* Profile / Login */}
        <Link
          to={isAuthenticated ? "/profile" : "/login"}
          className="profile-button"
          onClick={closeMenu}
        >
          {isAuthenticated ? (
            profileInfo.photoURL ? (
              <img src={profileInfo.photoURL} alt="Profile" className="profile-photo" />
            ) : (
              <div className="profile-initials">{profileInfo.initials}</div>
            )
          ) : (
            <span className="login-text">Login</span>
          )}
        </Link>

        {/* Hamburger Menu */}
        <div
          className={`navbar-hamburger ${isMobileMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
