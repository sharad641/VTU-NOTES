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
         {/* 📤 Upload Notes */}
      <UploadForm />
      </section>
      {/* 📖 FAQs */}
      <section className="info-box modern-box-new">
        <h2>📖 Frequently Asked Questions (FAQs)</h2>
        <p>Quick answers to your most common concerns.</p>
        <Link to="/faqs" className="button modern-button-nw">🔗 Go to FAQs</Link>
      </section>
      
      
    
       
       {/* 📞 Contact Us */}
      <Contact />

      {/* 💬 Comments */}
      <CommentSection />
      

    </div>
  );
};

export default Home;
