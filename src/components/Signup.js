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
  FaArrowRight, FaCheckCircle, FaRocket 
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoWarning } from "react-icons/io5";
import "./Signup.css";

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
    <div className="signup-container">
      
      {/* Toast Notification */}
      <div className={`toast-notification ${toast.show ? 'show' : ''} ${toast.type}`}>
        {toast.type === "success" ? <FaCheckCircle /> : <IoWarning />}
        {toast.msg}
      </div>

      {/* --- LEFT SIDE: HERO --- */}
      <div className="signup-hero">
        <div className="hero-mesh"></div>
        <div className="hero-content">
          <div className="logo-pill">
            <FaRocket className="rocket-icon" /> <span>START YOUR JOURNEY</span>
          </div>
          <h1>Join the <br /><span className="text-highlight">Elite Community</span></h1>
          <p>
            Create an account to unlock exclusive VTU notes, track your academic progress, 
            and collaborate with over 30,000 engineers.
          </p>
          
          <div className="feature-list">
            <div className="feature-item">
              <div className="check-box"><FaCheckCircle /></div>
              <span>Free access to 500+ Model Papers</span>
            </div>
            <div className="feature-item">
              <div className="check-box"><FaCheckCircle /></div>
              <span>Real-time SGPA/CGPA Calculator</span>
            </div>
            <div className="feature-item">
              <div className="check-box"><FaCheckCircle /></div>
              <span>Community Discussion Forum</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: FORM --- */}
      <div className="signup-form-wrapper">
        <div className="form-box">
          
          <div className="form-head">
            <h2>Create Account</h2>
            <p>It's free and takes less than a minute.</p>
          </div>

          <form onSubmit={handleSignup} onKeyDown={handleKeyDown}>
            
            {/* Full Name */}
            <div className="input-row">
              <label>Full Name</label>
              <div className="input-shell">
                <FaUser className="shell-icon" />
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="input-row">
              <label>Email Address</label>
              <div className="input-shell">
                <FaEnvelope className="shell-icon" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@college.edu"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="input-row">
              <label>Password</label>
              <div className="input-shell">
                <FaLock className="shell-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
                <button 
                  type="button" 
                  className="eye-btn" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              {/* Strength Meter */}
              {formData.password && (
                <div className="strength-meter">
                  <div className={`bar ${passwordStrength >= 1 ? 'filled' : ''}`}></div>
                  <div className={`bar ${passwordStrength >= 3 ? 'filled' : ''}`}></div>
                  <div className={`bar ${passwordStrength >= 5 ? 'filled' : ''}`}></div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="input-row">
              <label>Confirm Password</label>
              <div className="input-shell">
                <FaLock className="shell-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            {/* Caps Lock Warning */}
            <div className={`caps-warning ${capsLock ? 'visible' : ''}`}>
              <IoWarning /> Caps Lock is ON
            </div>

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? <div className="spinner-white"></div> : <>Get Started <FaArrowRight /></>}
            </button>
          </form>

          <div className="divider-text"><span>OR REGISTER WITH</span></div>

          <button className="google-btn-full" onClick={handleGoogleSignup} disabled={loading}>
            <FcGoogle size={22} /> Sign up with Google
          </button>

          <div className="footer-login">
            Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;