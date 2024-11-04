import React, { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithPhoneNumber 
} from 'firebase/auth';
import { auth } from '../firebase'; 
import { useNavigate } from 'react-router-dom';
import './Login.css';
import googleLogo from '../assets/goo.png'; 

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isMFA, setIsMFA] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [setIsAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful", userCredential.user);

      if (userCredential.user.multiFactor.enrolledFactors.length > 0) {
        setIsMFA(true);
      } else {
        setIsAuthenticated(true);
        navigate('/');
      }
    } catch (error) {
      console.error("Login failed", error.message);
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleMFA = async (e) => {
    e.preventDefault();
    setError('');
    
    window.recaptchaVerifier = new window.firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: () => {},
    });
    
    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult; 
      console.log("SMS sent");
    } catch (error) {
      console.error("SMS not sent", error.message);
      setError("Failed to send verification code. Please try again.");
    }
  };

  const verifyCode = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const confirmationResult = window.confirmationResult; 
      await confirmationResult.confirm(verificationCode);
      console.log("MFA successful");
      setIsAuthenticated(true); 
      navigate('/');
    } catch (error) {
      console.error("Invalid verification code", error.message);
      setError("Invalid verification code. Please try again.");
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
      {!isMFA ? (
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
      ) : (
        <form onSubmit={verifyCode}>
          <div className="form-group">
            <label>Phone Number:</label>
            <input 
              type="tel" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              required 
              className="input-field"
            />
          </div>
          <button type="button" onClick={handleMFA} className="login-button">Send Verification Code</button>
          <div className="form-group">
            <label>Verification Code:</label>
            <input 
              type="text" 
              value={verificationCode} 
              onChange={(e) => setVerificationCode(e.target.value)} 
              required 
              className="input-field"
            />
          </div>
          <button type="submit" className="login-button">Verify Code</button>
        </form>
      )}
      <div id="recaptcha-container"></div>
      <p className="signup-notice">
        Don't have an account? <a href="/signup">sign up here</a>.
      </p>
      <button onClick={handleGoogleLogin} className="google-login-button">
        <img src={googleLogo} alt="Google Logo" className="google-logo" />
        Google
      </button>
    </div>
  );
};

export default Login;
