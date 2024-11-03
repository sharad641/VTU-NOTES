// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const provider = new GoogleAuthProvider(); // Initialize GoogleAuthProvider

  useEffect(() => {
    // Check user authentication state on component mount
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // User is signed in
        // Remove automatic navigation to avoid redirecting prematurely
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [setIsAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful", userCredential.user);
      setIsAuthenticated(true); // Update authentication state
      navigate('/'); // Redirect to home after successful login
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
      setIsAuthenticated(true); // Update authentication state
      navigate('/'); // Redirect to home after successful login
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
      <div className="google-login-notice">
        <p>Or use your Google account to log in:</p>
      </div>
      <button onClick={handleGoogleLogin} className="google-login-button">Login with Google</button>
      <div className="signup-option">
        <p>Don't have an account? <a href="/signup">Sign up here</a></p>
      </div>
    </div>
  );
};

export default Login;
