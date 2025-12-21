import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  googleAuthProvider,
  signInAnonymously,
} from "../firebase";
import { onAuthStateChanged } from "firebase/auth"; // Import auth listener
import { 
  FaEnvelope, FaLock, FaEye, FaEyeSlash, 
  FaUserSecret, FaShieldAlt, FaArrowRight, 
  FaGlobe, FaUsers, FaDownload 
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoWarning } from "react-icons/io5";
import "./Login.css";

const Login = ({ setIsAuthenticated, setIsAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true); // Prevents flash of login screen
  const [capsLock, setCapsLock] = useState(false);
  const [greeting, setGreeting] = useState("Welcome Back");
  
  // Toast State
  const [toast, setToast] = useState({ show: false, msg: "", type: "" });

  const navigate = useNavigate();
  const location = useLocation();
  const adminEmail = "sp1771838@gmail.com";
  
  // Determine where to redirect (default to home)
  const from = location.state?.from?.pathname || "/";

  // --- 1. PERSISTENT LOGIN LOGIC ---
  useEffect(() => {
    // Set dynamic greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    // Check if user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const isAdmin = currentUser.email === adminEmail;
        setIsAuthenticated(true);
        setIsAdmin(isAdmin);
        // Redirect immediately
        navigate(isAdmin ? "/admin-dashboard" : from, { replace: true });
      } else {
        // No user found, show login form
        setPageLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate, from, setIsAuthenticated, setIsAdmin]);

  // --- HANDLERS ---
  const showToast = (msg, type = "error") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "" }), 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will handle the redirect
      showToast("Login Successful!", "success");
    } catch (err) {
      setLoading(false);
      showToast("Invalid email or password.");
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleAuthProvider);
      // onAuthStateChanged will handle the redirect
    } catch (err) {
      setLoading(false);
      showToast("Google sign-in canceled.");
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      await signInAnonymously(auth);
      // onAuthStateChanged will handle the redirect
    } catch (err) {
      setLoading(false);
      showToast("Guest login unavailable.");
    }
  };

  const handleKeyDown = (e) => {
    setCapsLock(e.getModifierState("CapsLock"));
  };

  // --- RENDER LOADING SCREEN ---
  if (pageLoading) {
    return (
      <div className="page-loader">
        <div className="spinner-dots"></div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      
      {/* TOAST NOTIFICATION */}
      <div className={`toast-notification ${toast.show ? 'show' : ''} ${toast.type}`}>
        {toast.msg}
      </div>

      {/* --- LEFT SIDE (Retained as requested) --- */}
      <div className="auth-showcase">
        <div className="animated-background"></div>
        <div className="showcase-content">
          <div className="brand-pill"><span className="dot"></span> SECURE ACADEMIC HUB</div>
          <h1 className="hero-title">VTU Notes <br /><span className="text-gradient">2024–2025</span></h1>
          <p className="hero-desc">Empowering engineering students with a full-stack academic hub. Access model papers, notes, and calculation tools in one place.</p>
          <div className="glass-stats-card">
            <div className="stat-item">
              <div className="icon-box"><FaGlobe /></div>
              <div className="stat-text"><h3>100K+</h3><p>Global Views</p></div>
            </div>
            <div className="divider-vertical"></div>
            <div className="stat-item">
              <div className="icon-box"><FaUsers /></div>
              <div className="stat-text"><h3>30K+</h3><p>Active Users</p></div>
            </div>
            <div className="divider-vertical"></div>
            <div className="stat-item">
              <div className="icon-box"><FaDownload /></div>
              <div className="stat-text"><h3>42K+</h3><p>Downloads</p></div>
            </div>
          </div>
          <div className="social-proof">
             <div className="avatar-group">
               <img src="https://i.pravatar.cc/100?img=11" alt="User" />
               <img src="https://i.pravatar.cc/100?img=12" alt="User" />
               <img src="https://i.pravatar.cc/100?img=33" alt="User" />
               <img src="https://i.pravatar.cc/100?img=47" alt="User" />
             </div>
             <p>Ranked Top 3 on Google Search</p>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: MODERN FORM (Cleaned & Improved) --- */}
      <div className="auth-form-wrapper">
        <div className="form-card-clean">
          
          <div className="form-header-clean">
            <h2>{greeting}, Student <span className="wave-emoji">👋</span></h2>
            <p>Enter your credentials to access your workspace.</p>
          </div>

          <form onSubmit={handleLogin} onKeyDown={handleKeyDown} className="form-animate-enter">
            
            {/* Email Field */}
            <div className="clean-input-group">
              <label>Email Address</label>
              <div className="input-wrapper-clean">
                <FaEnvelope className="field-icon-clean" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="clean-input-group">
              <label>Password</label>
              <div className="input-wrapper-clean">
                <FaLock className="field-icon-clean" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  className="eye-toggle-btn-clean" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Caps Lock Alert */}
            <div className={`caps-alert ${capsLock ? 'show' : ''}`}>
              <IoWarning /> Caps Lock is ON
            </div>

            {/* Options */}
            <div className="form-options-row">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark-box"></span>
                Remember me
              </label>
              <span className="link-forgot">Forgot Password?</span>
            </div>

            {/* Main Action */}
            <button type="submit" className="btn-modern-primary" disabled={loading}>
              {loading ? <div className="spinner-dots-white"></div> : <>Sign In <FaArrowRight /></>}
            </button>

            {/* Divider */}
            <div className="divider-clean"><span>OR</span></div>

            {/* Social Actions */}
            <div className="social-stack">
              <button type="button" className="social-btn-modern google" onClick={handleGoogleLogin}>
                <FcGoogle size={20} /> <span>Continue with Google</span>
              </button>
              <button type="button" className="social-btn-modern guest" onClick={handleGuestLogin}>
                <FaUserSecret size={18} /> <span>Continue as Guest</span>
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="footer-clean">
            <p>Don't have an account? <span onClick={() => navigate("/signup")} className="highlight-link">Sign up free</span></p>
            <button className="admin-trigger-clean" onClick={handleGoogleLogin}>
               <FaShieldAlt /> Admin Access
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;