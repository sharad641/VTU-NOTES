import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  googleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup
} from "../firebase";
import { updateProfile } from "firebase/auth";
import {
  FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash,
  FaArrowRight, FaCheckCircle, FaRocket, FaStar
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoWarning } from "react-icons/io5";
import "./AuthModern.css"; // CHANGED: Modern CSS

const Signup = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [capsLock, setCapsLock] = useState(false);

  // Toast State
  const [toast, setToast] = useState({ show: false, msg: "", type: "" });

  // --- HELPERS ---
  const showToast = (msg, type = "error") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "" }), 4000);
  };

  const checkStrength = (pass) => {
    let score = 0;
    if (pass.length > 5) score++; // Length
    if (pass.length > 8) score++; // Good Length
    if (/[A-Z]/.test(pass)) score++; // Uppercase
    if (/[0-9]/.test(pass)) score++; // Number
    if (/[^A-Za-z0-9]/.test(pass)) score++; // Symbol
    setPasswordStrength(score);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "password") checkStrength(value);
  };

  const handleKeyDown = (e) => {
    setCapsLock(e.getModifierState("CapsLock"));
  };

  // --- HANDLERS ---
  const handleSignup = async (e) => {
    e.preventDefault();

    // 1. Validation
    if (formData.password !== formData.confirmPassword) {
      return showToast("Passwords do not match.", "error");
    }
    if (passwordStrength < 3) {
      return showToast("Please choose a stronger password.", "warning");
    }

    setLoading(true);

    try {
      // 2. Create User
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // 3. Update Profile (Add Name)
      await updateProfile(userCredential.user, {
        displayName: formData.fullName
      });

      showToast("Account created successfully!", "success");

      // 4. Redirect
      setTimeout(() => navigate("/"), 1000);

    } catch (err) {
      console.error(err);
      let msg = "Signup failed.";
      if (err.code === "auth/email-already-in-use") msg = "Email is already registered.";
      if (err.code === "auth/weak-password") msg = "Password should be at least 6 characters.";
      if (err.code === "auth/invalid-email") msg = "Invalid email address.";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      googleAuthProvider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(auth, googleAuthProvider);
      showToast("Google Signup Successful!", "success");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      showToast("Google signup canceled.", "error");
    } finally {
      setLoading(false);
    }
  };

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
            <FaStar /> JOIN THE ELITE
          </div>
          <h1 className="hero-title-large">
            Unlock Your <br />
            True Potential.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#94A3B8', lineHeight: 1.6 }}>
            Join a community of top achievers. Get free access to premium resources, track your growth, and land your dream job.
          </p>

          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
              <FaCheckCircle style={{ color: '#6366F1', fontSize: '1.2rem' }} />
              <span style={{ color: 'white', fontWeight: '500' }}>Unlimited Model Papers & Notes</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
              <FaCheckCircle style={{ color: '#EC4899', fontSize: '1.2rem' }} />
              <span style={{ color: 'white', fontWeight: '500' }}>Real-time SGPA & Placement Tracking</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
              <FaCheckCircle style={{ color: '#10B981', fontSize: '1.2rem' }} />
              <span style={{ color: 'white', fontWeight: '500' }}>Exclusive Engineering Community</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Form Side */}
      <div className="auth-form-side">
        <div className="auth-bg-engine">
          <div className="auth-blob one" style={{ background: '#DB2777', top: '20%' }}></div>
          <div className="auth-blob two" style={{ background: '#6366F1', bottom: '20%' }}></div>
        </div>

        <div className="form-glass-card">
          <div className="form-header-auth">
            <h2>Create Account</h2>
            <p>Start your journey in less than 30 seconds.</p>
          </div>

          <form onSubmit={handleSignup} onKeyDown={handleKeyDown}>
            <div className="auth-input-group">
              <label className="auth-label">Full Name</label>
              <div className="auth-input-wrapper">
                <FaUser className="auth-input-icon" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="auth-input"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrapper">
                <FaEnvelope className="auth-input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="auth-input"
                  placeholder="john@college.edu"
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="auth-input"
                  placeholder="Create a password"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {/* Strength Meter */}
              {formData.password && (
                <div style={{ display: 'flex', gap: '4px', marginTop: '8px', height: '4px' }}>
                  <div style={{ flex: 1, borderRadius: '2px', background: passwordStrength >= 1 ? '#EF4444' : '#334155' }}></div>
                  <div style={{ flex: 1, borderRadius: '2px', background: passwordStrength >= 3 ? '#F59E0B' : '#334155' }}></div>
                  <div style={{ flex: 1, borderRadius: '2px', background: passwordStrength >= 5 ? '#10B981' : '#334155' }}></div>
                </div>
              )}
            </div>

            <div className="auth-input-group">
              <label className="auth-label">Confirm Password</label>
              <div className="auth-input-wrapper">
                <FaLock className="auth-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="auth-input"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            {capsLock && <div style={{ color: '#F59E0B', fontSize: '0.8rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}><IoWarning /> Caps Lock ON</div>}

            <button type="submit" className="btn-auth-primary" disabled={loading}>
              {loading ? "Creating Account..." : <>Get Started <FaArrowRight /></>}
            </button>

            <div className="divider-auth"><span>OR REGISTER WITH</span></div>

            <button type="button" className="btn-auth-social" onClick={handleGoogleSignup}>
              <FcGoogle size={20} /> Sign up with Google
            </button>
          </form>

          <div className="auth-footer-link">
            Already have an account? <span onClick={() => navigate('/login')} className="link-highlight">Log in</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;