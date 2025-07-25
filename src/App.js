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
import Calculator from './components/Calculator';
import PlacementGuide from './components/PlacementGuide';
import FAQs from './components/FAQs';
import ChatBot from './components/ChatBot';
import TestPage from './components/TestPage';
import CommentSection from './components/CommentSection';
import StudyPlanner from './components/StudyPlanner';
import Profile from './components/Profile';
import ModelPapers from './components/ModelPapers';
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import AdSenseAd from './components/AdSenseAd';

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const RedirectAuthenticatedUser = ({ element }) => (
    isAuthenticated ? <Navigate to="/" /> : element
  );

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-container">
          <div className="loader-wrapper">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <button className="theme-toggle-button" onClick={toggleDarkMode}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>

        <Navbar />
        <AdSenseAd adClient="ca-pub-9499544849301534" adSlot="3936951010" />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bee-scene" element={<BeeScene />} />
          <Route path="/branch-selection/:scheme" element={<BranchSelection />} />
          <Route path="/branch/:branch" element={<Branch />} />
          <Route path="/branch/:branch/:semester" element={<Subjects />} />
          <Route path="/branch/:branch/:semester/modules/:subjectName" element={<ModuleDetail />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/pdf/:pdfUrl" element={<PdfViewer />} />
          <Route path="/model-papers" element={<ModelPapers />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/placement-guide" element={isAuthenticated ? <PlacementGuide /> : <Navigate to="/login" />} />
          <Route path="/study-planner" element={isAuthenticated ? <StudyPlanner /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/comments" element={<CommentSection />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/login" element={<RedirectAuthenticatedUser element={<Login setIsAuthenticated={setIsAuthenticated} />} />} />
          <Route path="/signup" element={<RedirectAuthenticatedUser element={<Signup />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;