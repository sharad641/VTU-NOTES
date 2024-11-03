import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';
import googleLogo from '../assets/goo.png'; // Import the image

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      }
    });

    return () => unsubscribe();
  }, [setIsAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful", userCredential.user);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error("Login failed", error.message);
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Login successful", result.user);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error("Google Login failed", error.message);
      setError("Failed to login with Google. Please try again.");
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
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="signup-notice">
        Don't have an account? <a href="/signup">sign up here</a>.
      </p>
      <div className="google-login-notice">
        <p>Or use your Google account to log in:</p>
      </div>
      <button onClick={handleGoogleLogin} className="google-login-button">
        <img src={googleLogo} alt="Google Logo" className="google-logo" />
        google
      </button>
    </div>
  );
};

export default Login;
