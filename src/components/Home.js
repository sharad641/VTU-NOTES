// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { analytics } from '../firebase';
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

  useEffect(() => {
    logEvent(analytics, 'homepage_view');
  }, []);

  const toggleChatbot = () => setShowChatbot(prev => !prev);

  const projectTypes = [
    {
      icon: <FaLaptopCode size={40} />,
      title: 'Fullstack',
      desc: 'Web & mobile apps using React, Node.js, MongoDB, etc.',
      color: '#3b82f6',
    },
    {
      icon: <FaRobot size={40} />,
      title: 'ML / AI',
      desc: 'Machine Learning & AI projects built with Python & TensorFlow.',
      color: '#2563eb',
    },
    {
      icon: <FaMicrochip size={40} />,
      title: 'IoT',
      desc: 'Smart devices, sensors, and automation using ESP32, Arduino, and more.',
      color: '#1e40af',
    },
    {
      icon: <FaLightbulb size={40} />,
      title: 'Other',
      desc: 'Custom innovative ideas & research-based projects.',
      color: '#60a5fa',
    },
  ];

  return (
    <main className="home-container">

      {/* 🔔 Announcement Marquee */}
      <div className="headline-message88">
        <div className="marquee-text">
          🚀 New placement test login feature! Check it out to level up your preparation.
          <br />
          📚 Notes updated including 6th Semester (2022). Access freely and share with friends.
        </div>
      </div>

      {/* 🛠 Project Enquiry Section */}
      <section className="project-section home-project-section">
        <h2>🛠 Bring Your Project Idea to Life!</h2>
        <p className="project-intro">
          Get expert guidance for Fullstack, ML/AI, or IoT projects. Learn, implement, and showcase your skills professionally!
        </p>

        {/* Project Types Cards */}
        <div className="project-types-container">
          {projectTypes.map((type, idx) => (
            <div
              key={idx}
              className="project-type-card"
              style={{ borderTop: `4px solid ${type.color}` }}
            >
              <div className="icon-wrapper" style={{ color: type.color }}>
                {type.icon}
              </div>
              <h3>{type.title}</h3>
              <p>{type.desc}</p>
              <Link to="/project-enquiry" className="cta-btn" style={{ color: type.color }}>
                Request Project
              </Link>
            </div>
          ))}
        </div>

        {/* Mini Projects & College Projects */}
        <div className="mini-projects-section">
          <h3>🎓 Mini & College Projects We Provide</h3>
          <ul>
            <li>💻 Web & Mobile Mini Projects (React, Node.js, Flutter)</li>
            <li>🤖 AI & ML Mini Projects (Python, TensorFlow, OpenCV)</li>
            <li>📡 IoT College Projects (ESP32, Arduino, Sensors & Automation)</li>
            <li>💡 Research & Innovative College Projects</li>
            <li>📊 Data Science Projects with real-world datasets</li>
          </ul>
        </div>

        {/* Why Choose Us */}
        <div className="why-choose-us">
          <h3>💡 Why Work With Us?</h3>
          <ul>
            <li>🌟 Innovative & practical project ideas</li>
            <li>🧠 Guidance from experienced developers</li>
            <li>📘 Learn while building your project</li>
            <li>⏱ Fast delivery with full support</li>
            <li>💰 Affordable & student-friendly pricing</li>
          </ul>
        </div>

        {/* Big CTA Button */}
        <div className="project-enquiry-btn-container">
          <Link to="/project-enquiry">
            <button className="project-enquiry-btn hover-scale">
              🛠 Submit Your Project Requirement →
            </button>
          </Link>
        </div>
      </section>

      {/* Branch Selection */}
      <BranchSelection />

      {/* Model Papers */}
      <ModelPapers />

      {/* 🤖 ChatBot Toggle */}
      <div className="chatbot-button-container">
        <button className="chatbot-toggle-btn hover-scale" onClick={toggleChatbot}>
          {showChatbot ? 'Hide Chatbot' : 'Chat with Us!'}
        </button>
      </div>
      {showChatbot && <ChatBot />}

      {/* 🎓 SGPA Calculator */}
      <SgpaCalculator />

      {/* 🔗 VTU Resources & Upload Notes */}
      <section className="info-box modern-box">
        <h2>🔗 VTU Links</h2>
        <div className="vtu-links-container">
          {[ /* Add VTU Links here */].map((item, index) => (
            <div key={index} className="vtu-link-card modern-card">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="button modern-button">
                🔗 Visit
              </a>
            </div>
          ))}
        </div>
        <UploadForm />
      </section>

      {/* 📖 FAQs */}
      <section className="info-box modern-box-new">
        <h2>📖 Frequently Asked Questions (FAQs)</h2>
        <p>Quick answers to your most common concerns.</p>
        <Link to="/faqs" className="button modern-button-nw">🔗 Go to FAQs</Link>
      </section>

      {/* 📞 Contact */}
      <Contact />

      {/* 💬 Comments */}
      <CommentSection />

    </main>
  );
};

export default Home;
