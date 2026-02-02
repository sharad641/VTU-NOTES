import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  googleAuthProvider,
} from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  FaEnvelope, FaLock, FaEye, FaEyeSlash,
  FaUserSecret, FaShieldAlt, FaArrowRight,
  FaGlobe, FaUsers, FaDownload, FaRocket
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoWarning } from "react-icons/io5";
import "./AuthModern.css"; // CHANGED: Modern CSS

const Login = ({ setIsAuthenticated, setIsAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [capsLock, setCapsLock] = useState(false);
  const [greeting, setGreeting] = useState("Welcome Back");

  const [toast, setToast] = useState({ show: false, msg: "", type: "" });

  const navigate = useNavigate();
  const location = useLocation();
  const adminEmail = "sp1771838@gmail.com";

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const isAdmin = currentUser.email === adminEmail;
        setIsAuthenticated(true);
        setIsAdmin(isAdmin);
        navigate(isAdmin ? "/admin-dashboard" : from, { replace: true });
      } else {
        setPageLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate, from, setIsAuthenticated, setIsAdmin]);

  const showToast = (msg, type = "error") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "" }), 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
    } catch (err) {
      setLoading(false);
      showToast("Google sign-in canceled.");
    }
  };


  const handleKeyDown = (e) => {
    setCapsLock(e.getModifierState("CapsLock"));
  };

  if (pageLoading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        Loading Secure Environment...
      </div>
    );
  }

  return (
    <div className="auth-container">
      {/* Toast */}
      {toast.show && (
        <div style={{
          position: 'fixed', top: 20, right: 20, padding: '12px 24px',
          background: toast.type === 'success' ? '#10B981' : '#EF4444',
          color: 'white', borderRadius: '8px', zIndex: 1000, fontWeight: '600',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          {toast.msg}
        </div>
      )}

      {/* LEFT: Hero Side */}
      <div className="auth-sidebar-hero">
        <div className="hero-content-modern">
          <div className="brand-pill-glow">
            <FaRocket /> VTU NOTES PORTAL
          </div>
          <h1 className="hero-title-large">
            Master Your <br />
            Engineering Journey.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#94A3B8', lineHeight: 1.6 }}>
            Access premium notes, calculate SGPA instantly, and explore placement stories from top companies.
            Join 30,000+ engineers today.
          </p>

          <div className="hero-stats-modern">
            <div className="stat-glass-card">
              <span className="stat-val">100K+</span>
              <span className="stat-label">Resources Viewed</span>
            </div>
            <div className="stat-glass-card">
              <span className="stat-val">500+</span>
              <span className="stat-label">Model Papers</span>
            </div>
            <div className="stat-glass-card">
              <span className="stat-val">4.8/5</span>
              <span className="stat-label">Student Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Form Side */}
      <div className="auth-form-side">
        <div className="auth-bg-engine">
          <div className="auth-blob one"></div>
          <div className="auth-blob two"></div>
        </div>

        <div className="form-glass-card">
          <div className="form-header-auth">
            <h2>{greeting}, Scholar <span role="img" aria-label="wave">👋</span></h2>
            <p>Sign in to access your digital campus.</p>
          </div>

          <form onSubmit={handleLogin} onKeyDown={handleKeyDown}>
            <div className="auth-input-group">
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrapper">
                <FaEnvelope className="auth-input-icon" />
                <input
                  type="email"
                  className="auth-input"
                  placeholder="name@college.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrapper">
                <FaLock className="auth-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="auth-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {capsLock && <div style={{ color: '#F59E0B', fontSize: '0.8rem', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}><IoWarning /> Caps Lock ON</div>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#94A3B8', cursor: 'pointer' }}>
                <input type="checkbox" /> Remember me
              </label>
              <span className="link-highlight" style={{ fontSize: '0.9rem' }}>Forgot Password?</span>
            </div>

            <button type="submit" className="btn-auth-primary" disabled={loading}>
              {loading ? "Verifying..." : <>Sign In <FaArrowRight /></>}
            </button>

            <div className="divider-auth"><span>OR CONTINUE WITH</span></div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              <button type="button" className="btn-auth-social" onClick={handleGoogleLogin}>
                <FcGoogle size={20} /> Google
              </button>
            </div>
          </form>

          <div className="auth-footer-link">
            New here? <span onClick={() => navigate('/signup')} className="link-highlight">Create a free account</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;