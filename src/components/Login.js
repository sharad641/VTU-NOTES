import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  googleAuthProvider,
  signInAnonymously,
} from '../firebase';
import './Login.css';
import googleLogo from '../assets/goo.png';

const Login = ({ setIsAuthenticated, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const adminEmail = 'sp1771838@gmail.com';

  // Store where the user came from (default: home page)
  const from = location.state?.from?.pathname || '/';

  // Common redirect logic after successful login
  const handlePostLoginNavigation = (isAdmin) => {
    setIsAuthenticated(true);
    setIsAdmin(isAdmin);

    if (isAdmin) {
      navigate('/admin-dashboard', { replace: true });
    } else {
      // If user came from /project-enquiry → redirect there directly
      if (from === '/project-enquiry') {
        navigate('/project-enquiry', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  };

  // 🔹 Email-password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const isAdmin = userCred.user.email === adminEmail;
      handlePostLoginNavigation(isAdmin);
    } catch (err) {
      console.error('Login error:', err.message);
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Google login
  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const isAdmin = result.user.email === adminEmail;
      handlePostLoginNavigation(isAdmin);
    } catch (err) {
      console.error('Google login error:', err.message);
      setError('Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Admin-only Google login
  const handleAdminGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      if (result.user.email === adminEmail) {
        handlePostLoginNavigation(true);
      } else {
        setError('You are not authorized as Admin.');
      }
    } catch (err) {
      console.error('Admin login error:', err.message);
      setError('Admin Google login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Guest login (anonymous)
  const handleGuestLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await signInAnonymously(auth);
      handlePostLoginNavigation(false);
    } catch (err) {
      console.error('Guest login error:', err.message);
      setError('Guest login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-heading">Welcome Back 👋</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
            placeholder="Enter your email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
            placeholder="Enter your password"
          />
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="social-login">
          <button
            className="google-login-button"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <img src={googleLogo} alt="Google Logo" className="google-logo" />
            {loading ? 'Please wait...' : 'Login with Google'}
          </button>

          <button
            className="guest-login-button"
            onClick={handleGuestLogin}
            disabled={loading}
          >
            {loading ? 'Please wait...' : 'Login as Guest'}
          </button>

          <button
            className="admin-login-button"
            onClick={handleAdminGoogleLogin}
            disabled={loading}
          >
            {loading ? 'Please wait...' : 'Admin Login (Google)'}
          </button>
        </div>

        <p className="signup-text">
          Don't have an account?{' '}
          <span onClick={() => navigate('/signup')} className="signup-link">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
