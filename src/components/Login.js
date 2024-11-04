import React, { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import googleLogo from '../assets/goo.png';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        navigate('/'); // Redirect to home if logged in
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [setIsAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      navigate('/'); // Redirect to home on successful login
    } catch (error) {
      console.error("Login failed", error.message);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      setIsAuthenticated(true);
      navigate('/'); // Redirect to home on successful Google login
    } catch (error) {
      console.error("Google Login failed", error.message);
      setError("Failed to login with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="input-field"
            placeholder="Enter your email"
            aria-label="Email address"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="input-field"
            placeholder="Enter your password"
            aria-label="Password"
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="signup-notice">
        Don't have an account? <a href="/signup">Sign up here</a>.
      </p>
      <button onClick={handleGoogleLogin} className="google-login-button" aria-label="Login with Google" disabled={loading}>
        <img src={googleLogo} alt="Google Logo" className="google-logo" />
        {loading ? 'Logging in...' : 'Login with Google'}
      </button>
    </div>
  );
};

export default Login;
