import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import AdminDashboard from './components/AdminDashboard';
import SgpaCalculator from './components/SgpaCalculator';
import ProjectEnquiry from './components/ProjectEnquiry'; // ✅ Import ProjectEnquiry

import { auth, database } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get, update } from 'firebase/database';
import './App.css';

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    const updateAnalytics = async () => {
      try {
        const analyticsRef = ref(database, "analytics");
        const snapshot = await get(analyticsRef);
        const analyticsData = snapshot.exists() ? snapshot.val() : {};

        const today = new Date().toISOString().split('T')[0];
        const totalPageViews = (analyticsData.totalPageViews || 0) + 1;
        const visits = {
          ...(analyticsData.visits || {}),
          [today]: ((analyticsData.visits && analyticsData.visits[today]) || 0) + 1
        };
        const topPages = {
          ...(analyticsData.topPages || {}),
          [location.pathname]: ((analyticsData.topPages && analyticsData.topPages[location.pathname]) || 0) + 1
        };

        await update(analyticsRef, { totalPageViews, visits, topPages });
      } catch (error) {
        console.error("Error updating analytics:", error);
      }
    };

    updateAnalytics();
  }, [location.pathname]);

  return null;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const adminEmail = "sp1771838@gmail.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setUserEmail(user?.email || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const RedirectAuthenticatedUser = ({ element }) => {
    if (isAuthenticated && userEmail === adminEmail) {
      return <Navigate to="/admin-dashboard" />;
    }
    return isAuthenticated ? <Navigate to="/" /> : element;
  };

  const AdminRoute = ({ element }) =>
    isAuthenticated && userEmail === adminEmail ? element : <Navigate to="/" />;

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
      <AnalyticsTracker />
      <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <button className="theme-toggle-button" onClick={toggleDarkMode}>
          {darkMode ? '🌞' : '🌙'}
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

          {/* Authenticated routes */}
          <Route path="/placement-guide" element={isAuthenticated ? <PlacementGuide /> : <Navigate to="/login" />} />
          <Route path="/study-planner" element={isAuthenticated ? <StudyPlanner /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />

          <Route path="/calculator" element={<Calculator />} />
          <Route path="/sgpa-calculator" element={<SgpaCalculator />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/comments" element={<CommentSection />} />
          <Route path="/test" element={<TestPage />} />

          {/* ✅ Project Enquiry */}
          <Route path="/project-enquiry" element={<ProjectEnquiry />} />

          <Route path="/login" element={<RedirectAuthenticatedUser element={<Login setIsAuthenticated={setIsAuthenticated} />} />} />
          <Route path="/signup" element={<RedirectAuthenticatedUser element={<Signup />} />} />

          <Route path="/admin-dashboard" element={<AdminRoute element={<AdminDashboard />} />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
