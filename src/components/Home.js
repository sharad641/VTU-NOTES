// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { analytics, auth } from '../firebase';
import { logEvent } from 'firebase/analytics';

import BranchSelection from './BranchSelection';
import ModelPapers from './ModelPapers';
import UploadForm from './UploadForm';
import Contact from './Contact';
import CommentSection from './CommentSection';
import ChatBot from './ChatBot';
import SgpaCalculator from './SgpaCalculator';

import { FaLaptopCode, FaRobot, FaMicrochip, FaLightbulb } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    logEvent(analytics, 'homepage_view');
  }, []);

  const toggleChatbot = () => setShowChatbot(prev => !prev);

  const projectTypes = [
    {
      icon: <FaLaptopCode size={40} />,
      title: 'Fullstack Development',
      desc: 'Create modern, scalable web & mobile apps using React, Node.js, MongoDB & more.',
      color: '#3b82f6',
    },
    {
      icon: <FaRobot size={40} />,
      title: 'AI / Machine Learning',
      desc: 'Design smart ML/AI systems using Python, TensorFlow & computer vision.',
      color: '#2563eb',
    },
    {
      icon: <FaMicrochip size={40} />,
      title: 'Internet of Things (IoT)',
      desc: 'Build IoT automation with ESP32, Arduino, sensors & smart integrations.',
      color: '#1e40af',
    },
    {
      icon: <FaLightbulb size={40} />,
      title: 'Innovative Ideas',
      desc: 'Turn your creative or research-based concepts into reality with expert guidance.',
      color: '#60a5fa',
    },
  ];

  // ✅ Secure navigation to ProjectEnquiry page
  const handleProjectNavigation = () => {
    if (!auth.currentUser) {
      localStorage.setItem('redirectAfterLogin', '/project-enquiry');
      navigate('/login');
    } else {
      navigate('/project-enquiry');
    }
  };

  return (
    <main className="home-container">
      {/* 🔔 Announcement Banner */}
      <div className="headline-message88">
        <div className="marquee-text">
          🚀 New Placement Test Login feature live! <br />
          📚 6th Semester (2022) Notes added — Access them free & share with peers.
        </div>
      </div>

      {/* 🛠 Modern Project Section */}
      <section className="project-section">
        <h2 className="section-title">🛠 Bring Your Project Idea to Life!</h2>
        <p className="section-subtitle">
          Work with mentors to design and develop impactful projects in Fullstack, AI/ML, or IoT.
        </p>

        {/* Project Cards */}
        <div className="project-grid">
          {projectTypes.map((type, idx) => (
            <div
              key={idx}
              className="project-card"
              style={{
                borderTop: `4px solid ${type.color}`,
                boxShadow: `0 4px 20px ${type.color}30`,
              }}
            >
              <div className="icon-wrapper" style={{ color: type.color }}>
                {type.icon}
              </div>
              <h3>{type.title}</h3>
              <p>{type.desc}</p>
              <button
                onClick={handleProjectNavigation}
                className="cta-btn"
                style={{
                  background: `linear-gradient(90deg, ${type.color}, #60a5fa)`,
                  color: '#fff',
                }}
              >
                Request Project →
              </button>
            </div>
          ))}
        </div>

        {/* 🎓 Projects We Offer */}
        <section className="projects-offer-section">
          <h3 className="section-heading">🎓 Mini & College Projects We Provide</h3>
          <div className="projects-list-grid">
            <div className="project-item">
              <span className="project-icon">💻</span>
              <p>Web & Mobile Projects (React, Node.js, Flutter)</p>
            </div>
            <div className="project-item">
              <span className="project-icon">🤖</span>
              <p>AI & ML Projects (Python, TensorFlow, OpenCV)</p>
            </div>
            <div className="project-item">
              <span className="project-icon">📡</span>
              <p>IoT Automation Projects (ESP32, Arduino, Sensors)</p>
            </div>
            <div className="project-item">
              <span className="project-icon">💡</span>
              <p>Innovative Research & Final Year Projects</p>
            </div>
            <div className="project-item">
              <span className="project-icon">📊</span>
              <p>Data Science Projects with Real-world Datasets</p>
            </div>
          </div>
        </section>

        {/* 💡 Why Choose Us */}
        <section className="why-choose-section">
          <h3 className="section-heading">💡 Why Work With Us?</h3>
          <div className="why-grid">
            <div className="why-card">
              <h4>🌟 Practical Ideas</h4>
              <p>Projects are designed to solve real-world problems and enhance your resume.</p>
            </div>
            <div className="why-card">
              <h4>🧠 Expert Guidance</h4>
              <p>Get mentorship from experienced developers and engineers throughout your project.</p>
            </div>
            <div className="why-card">
              <h4>📘 Learn by Building</h4>
              <p>Hands-on learning experience with source code, explanation, and documentation.</p>
            </div>
            <div className="why-card">
              <h4>⚡ Fast & Reliable</h4>
              <p>Quick project delivery with complete report, video, and implementation support.</p>
            </div>
            <div className="why-card">
              <h4>💰 Affordable</h4>
              <p>We offer cost-effective solutions tailored for students with 24/7 assistance.</p>
            </div>
          </div>
        </section>

        {/* CTA Button */}
        <div className="cta-container">
          <button className="big-cta-btn" onClick={handleProjectNavigation}>
            🚀 Submit Your Project Requirement
          </button>
        </div>
      </section>

      {/* 🌿 Other Sections */}
      <BranchSelection />
      <ModelPapers />

      {/* 🤖 Chatbot */}
      <div className="chatbot-button-container">
        <button className="chatbot-toggle-btn hover-scale" onClick={toggleChatbot}>
          {showChatbot ? 'Hide Chatbot' : '💬 Chat with Us!'}
        </button>
      </div>
      {showChatbot && <ChatBot />}

      <SgpaCalculator />

      {/* 🔗 VTU Resources */}
      <section className="info-box modern-boxs23">
        <UploadForm />
      </section>

      {/* 📖 FAQs */}
      <section className="info-box modern-box-new">
        <h2>📖 Frequently Asked Questions</h2>
        <p>Find quick answers to your common queries.</p>
        <Link to="/faqs" className="button modern-button-nw">Go to FAQs →</Link>
      </section>

      <Contact />
      <CommentSection />
    </main>
  );
};

export default Home;
