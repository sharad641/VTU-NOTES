import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { analytics, auth } from '../firebase';
import { logEvent } from 'firebase/analytics';

// Sub-components
import BranchSelection from './BranchSelection';
import ModelPapers from './ModelPapers';
import UploadForm from './UploadForm';
import Contact from './Contact';
import CommentSection from './CommentSection';
import SgpaCalculator from './SgpaCalculator';

import {
  FaLaptopCode,
  FaRobot,
  FaMicrochip,
  FaLightbulb,
  FaRocket,
  FaQuestionCircle,
  FaComments,
  FaArrowRight,
  FaCheckCircle,
  FaBookOpen,
  FaChalkboardTeacher,
  FaClock,
  FaCalculator
} from 'react-icons/fa';

import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logEvent(analytics, 'homepage_view');
  }, []);

  // ✅ Secure navigation
  const handleProjectNavigation = () => {
    if (!auth.currentUser) {
      localStorage.setItem('redirectAfterLogin', '/project-enquiry');
      navigate('/login');
    } else {
      navigate('/project-enquiry');
    }
  };

  const projectTypes = [
    {
      icon: <FaLaptopCode />,
      title: 'Fullstack Development',
      desc: 'Build scalable web & mobile apps using React, Node.js, and Modern Tech.',
      color: '#2563eb',
    },
    {
      icon: <FaRobot />,
      title: 'AI / Machine Learning',
      desc: 'Design smart systems with Python, TensorFlow & Computer Vision.',
      color: '#4f46e5',
    },
    {
      icon: <FaMicrochip />,
      title: 'IoT & Automation',
      desc: 'Connect the world using ESP32, Arduino, and smart sensors.',
      color: '#0891b2',
    },
    {
      icon: <FaLightbulb />,
      title: 'Research & Innovation',
      desc: 'Turn your unique ideas into reality with expert mentorship.',
      color: '#f59e0b',
    },
  ];

  return (
    <main className="home-container">

      {/* 🔔 Announcement Banner */}
      <div className="modern-news-bar">
        <div className="news-content">
          <span className="news-badge">
            <span className="badge-pulse"></span>
            NEW UPDATE
          </span>
          <p className="news-text">
            🚀 <strong>Placement Test Login</strong> is now live! &nbsp;
            <span className="divider">|</span> &nbsp;
            📚 <strong>6th Sem Notes (2022)</strong> added.
          </p>
          <Link to="/latest-updates" className="news-link">
            Check it out <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* 🌳 Branch & Papers */}
      <section className="core-section">
        <BranchSelection />
        <ModelPapers />
      </section>

      {/* 🛠 Project Section */}
      <section className="project-section-wrapper">
        <div className="section-header">
          <span className="section-pill">Build Your Future</span>
          <h2>
            Bring Your <span className="highlight-blue">Project Idea</span> to Life
          </h2>
          <p>Expert mentorship for Fullstack, AI/ML, and IoT projects.</p>
        </div>

        <div className="project-grid">
          {projectTypes.map((type, idx) => (
            <div key={idx} className="feature-card">
              <div
                className="icon-circle"
                style={{ color: type.color, background: `${type.color}15` }}
              >
                {type.icon}
              </div>
              <h3>{type.title}</h3>
              <p>{type.desc}</p>
              <button
                onClick={handleProjectNavigation}
                className="text-link-btn"
                style={{ color: type.color }}
              >
                Start Project <FaArrowRight />
              </button>
            </div>
          ))}
        </div>

        {/* 💡 Info Grid */}
        <div className="info-grid-layout">
          <div className="info-col">
            <h3>🎓 What We Provide</h3>
            <ul className="check-list">
              <li><FaCheckCircle /> Web & Mobile Apps</li>
              <li><FaCheckCircle /> AI Models & Analytics</li>
              <li><FaCheckCircle /> IoT Integration</li>
              <li><FaCheckCircle /> Documentation & Reports</li>
              <li><FaCheckCircle /> Final Year Support</li>
            </ul>
          </div>

          <div className="info-col">
            <h3>💡 Why Choose Us?</h3>
            <div className="reasons-grid">
              <div className="reason-item">
                <FaBookOpen />
                <div>
                  <strong>Practical Learning</strong>
                  <p>Hands-on coding.</p>
                </div>
              </div>
              <div className="reason-item">
                <FaChalkboardTeacher />
                <div>
                  <strong>Expert Mentors</strong>
                  <p>Industry guidance.</p>
                </div>
              </div>
              <div className="reason-item">
                <FaClock />
                <div>
                  <strong>Fast Delivery</strong>
                  <p>On-time results.</p>
                </div>
              </div>
              <div className="reason-item">
                <FaRocket />
                <div>
                  <strong>Affordable</strong>
                  <p>Student pricing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="cta-banner">
          <div>
            <h3>Ready to start your project?</h3>
            <p>Free consultation available.</p>
          </div>
          <button onClick={handleProjectNavigation} className="cta-btn-primary">
            <FaRocket /> Launch Project Enquiry
          </button>
        </div>
      </section>

      {/* 🧮 Tools Section */}
      <section className="tools-section">
        <div className="tools-header">
          <div className="tools-icon">
            <FaCalculator />
          </div>
          <h2>
            Academic <span className="highlight-blue">Tools</span>
          </h2>
          <p>Essential calculators and utilities for your academic success</p>
        </div>
        
        <div className="calculator-widget-container">
          <SgpaCalculator mode="widget" />
        </div>
        
        <div className="tools-cta">
          <Link to="/tools" className="tools-link">
            View All Tools <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* 📤 Upload */}
      <section className="contribute-section">
        <UploadForm />
      </section>

      {/* ❓ Support */}
      <section className="support-section">
        <div className="support-card">
          <FaQuestionCircle />
          <h3>Have Questions?</h3>
          <Link to="/faqs" className="btn-outline">Visit FAQs</Link>
        </div>
        <div className="support-card">
          <FaComments />
          <h3>Community</h3>
          <a href="#comments" className="btn-outline">View Comments</a>
        </div>
      </section>

      <div id="comments">
        <CommentSection />
      </div>

      <Contact />
    </main>
  );
};

export default Home;