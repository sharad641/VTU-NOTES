// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';
import SgpaCalculator from './SgpaCalculator';


import CommentSection from './CommentSection';
import BranchSelection from './BranchSelection';
import ModelPapers from './ModelPapers';
import UploadForm from './UploadForm';


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
     

   

     

     
      {/* 🤖 ChatBot Toggle */}
      <div className="chatbot-button-container">
        <button className="chatbot-toggle-btn" onClick={toggleChatbot}>
          {showChatbot ? 'Hide Chatbot' : 'Chat with Us!'}
        </button>
      </div>
      {showChatbot && <ChatBot />}

{/* 🎓 SGPA Calculator */}
<SgpaCalculator />

      {/* 🔗 VTU Resources */}
      {/* 🔗 VTU Resources & Upload Section */}
<section className="vtu-section">
  {/* VTU Links */}
  <div className="vtu-links-box">
    <h2 className="vtu-title">🔗 VTU Resources</h2>
    <p className="vtu-subtitle">Access all essential VTU academic resources in one place.</p>

    <div className="vtu-links-grid">
      {[
        { title: "VTU Results", desc: "View semester exam results instantly.", link: "https://results.vtu.ac.in" },
        { title: "VTU Syllabus", desc: "Download the latest syllabus for all branches.", link: "https://vtu.ac.in/b-e-scheme-syllabus/" },
        { title: "Model Question Papers", desc: "Prepare better with official model papers.", link: "https://vtu.ac.in/model-question-paper-b-e-b-tech-b-arch/" },
        { title: "Academic Calendar", desc: "Check important semester dates and events.", link: "https://vtu.ac.in/academic-calendar/" },
        { title: "Notifications & Circulars", desc: "Stay updated with official VTU announcements.", link: "https://vtu.ac.in/en/administration/circular/" },
      ].map((item, index) => (
        <div key={index} className="vtu-card">
          <div className="vtu-card-content">
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="vtu-btn"
            >
              Visit →
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* 📤 Upload Notes */}
  <div className="upload-section">
    <h2 className="upload-title">📤 Share VTU Notes</h2>
    <p className="upload-subtitle">Help others by uploading your organized notes and materials.</p>
    <UploadForm />
  </div>
</section>

{/* 📖 FAQs */}
<section className="faq-section">
  <div className="faq-box">
    <h2>📖 Frequently Asked Questions (FAQs)</h2>
    <p>Find quick answers to your most common queries about VTU resources.</p>
    <Link to="/faqs" className="faq-btn">
      Go to FAQs →
    </Link>
  </div>
</section>

    
       
       {/* 📞 Contact Us */}
      <Contact />

      {/* 💬 Comments */}
      <CommentSection />
      

    </div>
  );
};

export default Home;
