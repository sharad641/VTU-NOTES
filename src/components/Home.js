// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';

import CommentSection from './CommentSection';
import BranchSelection from './BranchSelection';
import ModelPapers from './ModelPapers';

import Calculator from './Calculator';

import Contact from './Contact';
import ChatBot from './ChatBot';

import './Home.css';

const Home = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    logEvent(analytics, 'homepage_view');
  }, []);

  const toggleChatbot = () => {
    setShowChatbot((prev) => !prev);
  };

  return (
    <div className="home-container">

      {/* 🔔 Announcement Marquee */}
      <div className="headline-message88">
        <div className="marquee-text">
          🚀 A new feature has been added for placement test login. Review it now and take your preparation to the next level!
          <br />
          📚 All notes are now updated, including the 6th Semester (2022) syllabus! Access them freely and share with your friends.
        </div>
      </div>
 <BranchSelection /> 
      
 <ModelPapers/>
     

   

      {/* 💼 Placement Guide */}
      <section className="info-box">
        <h2>Placement Preparation Guide & Internship Opportunities</h2>
        <p>Preparing for placements or internships? Here's how we help:</p>
        <ul>
          <li><strong>Mock Interviews</strong> with expert feedback.</li>
          <li><strong>Aptitude Tests</strong> for all core skills.</li>
          <li><strong>Technical Prep</strong> including coding and system design.</li>
          <li><strong>Partner Companies</strong> offering real-world internships.</li>
          <li><strong>Skill Workshops</strong> on live projects.</li>
          <li><strong>Certifications</strong> to enhance your profile.</li>
        </ul>
        <Link to="/placement-guide" className="button">👉 Explore Placement & Internship Guide</Link>
        <div className="test-link-container">
          <p>🎯 Simulate real placement tests and get performance analytics. Prepare for Google, Infosys, TCS and more.</p>
          <Link to="/test" className="button">📊 Take the Practice Test</Link>
        </div>
      </section>

     
      {/* 🤖 ChatBot Toggle */}
      <div className="chatbot-button-container">
        <button className="chatbot-toggle-btn" onClick={toggleChatbot}>
          {showChatbot ? 'Hide Chatbot' : 'Chat with Us!'}
        </button>
      </div>
      {showChatbot && <ChatBot />}


      {/* 📖 FAQs */}
      <section className="info-box modern-box">
        <h2>📖 Frequently Asked Questions (FAQs)</h2>
        <p>Quick answers to your most common concerns.</p>
        <Link to="/faqs" className="button modern-button">🔗 Go to FAQs</Link>
      </section>

      {/* 🔗 VTU Resources */}
      <section className="info-box modern-box">
        <h2>🔗 VTU Links</h2>
        <div className="vtu-links-container">
          {[
            { title: "VTU Results", desc: "View semester results.", link: "https://results.vtu.ac.in" },
            { title: "VTU Syllabus", desc: "Download the latest syllabus.", link: "https://vtu.ac.in/b-e-scheme-syllabus/" },
            { title: "Model Question Papers", desc: "Practice with real exam papers.", link: "https://vtu.ac.in/model-question-paper-b-e-b-tech-b-arch/" },
            { title: "Academic Calendar", desc: "Know your semester dates.", link: "https://vtu.ac.in/academic-calendar/" },
            { title: "Notifications & Circulars", desc: "Latest university updates.", link: "https://vtu.ac.in/en/administration/circular/" },
          ].map((item, index) => (
            <div key={index} className="vtu-link-card modern-card">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="button modern-button">
                🔗 Visit
              </a>
            </div>
          ))}
        </div>
      </section>
      
      {/* 🧮 Calculator */}
      <Calculator />
    

      {/* 📞 Contact Us */}
      <Contact />
 

      {/* 💬 Comments */}
      <CommentSection />
    </div>
  );
};

export default Home;
