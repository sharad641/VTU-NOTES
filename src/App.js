import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BeeScene from './components/BeeScene';
import BranchSelection from './components/BranchSelection';
import Branch from './components/Branch';
import Subjects from './components/Subjects';
import ModuleDetail from './components/ModuleDetail';
import PdfViewer from './components/PdfViewer';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import UploadForm from './components/UploadForm';
import Calculator from './components/Calculator';
import PlacementGuide from './components/PlacementGuide';
import FAQs from './components/FAQs';
import ChatBot from './components/ChatBot';
import TestPage from './components/TestPage';
import CommentSection from './components/CommentSection';
import StudyPlanner from './components/StudyPlanner';
import Profile from './components/Profile'; 

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check user authentication state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set authentication state based on user presence
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading for 2 seconds

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  // Redirect authenticated users away from login/signup
  const RedirectAuthenticatedUser = ({ element }) => (
    isAuthenticated ? <Navigate to="/" /> : element
  );

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-container">
          <div className="loader-wrapper">
            <div className="welcome-text">
              <h1>Welcome to VTU-NOTES</h1>
              <p>Please wait while we load the content...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/bee-scene" element={<BeeScene />} />
          <Route path="/branch-selection/:scheme" element={<BranchSelection />} />
          <Route path="/branch/:branch" element={<Branch />} />
          <Route path="/branch/:branch/:semester" element={<Subjects />} />
          <Route path="/branch/:branch/:semester/modules/:subjectName" element={<ModuleDetail />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/pdf/:pdfUrl" element={<PdfViewer />} />

          {/* Authenticated Routes */}
          <Route path="/placement-guide" element={isAuthenticated ? <PlacementGuide /> : <Navigate to="/login" />} />
          <Route path="/test" element={isAuthenticated ? <TestPage /> : <Navigate to="/login" />} />
          <Route path="/study-planner" element={isAuthenticated ? <StudyPlanner /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} /> {/* Protected Profile Route */}

          {/* Public Utility Routes */}
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/comments" element={<CommentSection />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<RedirectAuthenticatedUser element={<Login setIsAuthenticated={setIsAuthenticated} />} />} />
          <Route path="/signup" element={<RedirectAuthenticatedUser element={<Signup />} />} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
