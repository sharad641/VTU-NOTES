import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BeeScene from './components/BeeScene'; // Import the BeeScene component
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
import CommentSection from './components/CommentSection'; // Import the CommentSection component
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check user authentication state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsAuthenticated(!!user); // Set authentication state based on user
    });

    // Set a timer to keep the spinner on screen for 5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 4 seconds for loading screen

    return () => {
      unsubscribe();
      clearTimeout(timer); // Clean up timeout on unmount
    };
  }, []);

  // Protected route wrapper to reduce repetition
  const ProtectedRoute = ({ element }) => (
    isAuthenticated ? element : <Navigate to="/login" />
  );

  // Guest route wrapper to allow access without authentication
  const GuestRoute = ({ element }) => element;

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
          <Route path="/" element={<GuestRoute element={<Home />} />} />
          <Route path="/bee-scene" element={<GuestRoute element={<BeeScene />} />} />
          <Route path="/branch-selection/:scheme" element={<GuestRoute element={<BranchSelection />} />} />
          <Route path="/branch/:branch" element={<GuestRoute element={<Branch />} />} />
          <Route path="/branch/:branch/:semester" element={<GuestRoute element={<Subjects />} />} />
          <Route path="/branch/:branch/:semester/modules/:subjectName" element={<GuestRoute element={<ModuleDetail />} />} />
          <Route path="/faqs" element={<GuestRoute element={<FAQs />} />} />

          {/* PDF Viewing Route */}
          <Route path="/pdf/:pdfUrl" element={<GuestRoute element={<PdfViewer />} />} />

          {/* Authenticated Routes */}
          <Route path="/placement-guide" element={<ProtectedRoute element={<PlacementGuide />} />} />
          <Route path="/test" element={<ProtectedRoute element={<TestPage />} />} />

          {/* Other Public Routes */}
          <Route path="/upload" element={<GuestRoute element={<UploadForm />} />} />
          <Route path="/calculator" element={<GuestRoute element={<Calculator />} />} />

          {/* Chatbot Route */}
          <Route path="/chatbot" element={<GuestRoute element={<ChatBot />} />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<RedirectAuthenticatedUser element={<Login setIsAuthenticated={setIsAuthenticated} />} />} />
          <Route path="/signup" element={<RedirectAuthenticatedUser element={<Signup />} />} />

          {/* Comment Section Route */}
          <Route path="/comments" element={<GuestRoute element={<CommentSection />} />} />

          {/* Catch-All Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
