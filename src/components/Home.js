// src/components/Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';
import CommentSection from './CommentSection'; 
import Calculator from './Calculator';
import UploadForm from './UploadForm';
import './Home.css';
import ChatBot from './ChatBot'; // Importing the ChatBot component

const Home = () => {
    const [showChatbot, setShowChatbot] = useState(false);

    // Toggle the visibility of the chatbot
    const toggleChatbot = () => setShowChatbot(!showChatbot);

    // Log placement test notification
    React.useEffect(() => {
        logEvent(analytics, 'homepage_view');
    }, []);

    return (
        <div className="home-container">
            {/* Headline with marquee effect */}
            <div className="headline-message">
                <div className="marquee-text">
                    A new feature has been added for placement test login. Please review it.
                </div>
            </div>

            {/* About VTU Notes */}
            <section className="info-box">
                <h2>About VTU Notes</h2>
                <p>VTU-NOTES is your go-to resource for academic success! We provide curated notes, question banks, and essential questions to help you excel in your exams with ease.</p>
                <p>Our notes are tailored to match the VTU syllabus, ensuring that you stay on track and well-prepared for your academic journey.</p>
            </section>
             {/* Scheme Selection */}
             <section className="info-box">
                <h2>Select Scheme For Notes</h2>
                <p>Access notes specific to your academic scheme. Choose the right one for a seamless learning experience.</p>
                <p>Our library is regularly updated with the latest materials for maximum relevance.</p>
                <Link to="/branch-selection/2022" className="button">Access 2022 Scheme</Link>
            </section>


            {/* Placement Preparation Section */}
            <section className="info-box">
                <h2>Placement Preparation Guide & Internship Opportunities</h2>
                <p>We bring you a complete placement preparation guide, covering mock interviews, aptitude tests, and tips to ace your technical rounds.</p>
                <p>Additionally, explore exclusive internship opportunities that help you gain real-world experience and boost your career prospects.</p>
                <Link to="/placement-guide" className="button">👉 Placement & Internship Guide</Link>
                <div className="test-link-container">
                    <p>Take practice tests crafted for top company placements and get an edge over others.</p>
                    <Link to="/test" className="button">Take the Practice Test</Link>
                </div>
            </section>

           
           


            {/* ChatBot Section */}
            <div className="chatbot-button-container">
                <button className="button" onClick={toggleChatbot}>
                    {showChatbot ? 'Hide Chatbot' : 'Chat with Us!'}
                </button>
            </div>
            {showChatbot && <ChatBot />}




           {/* Add the Calculator section */}
           <div className="calculator-section my-6">
                <Calculator />
            </div>
          
            <div className="calculator-section my-6">
        <UploadForm /> {/* Add the upload form here */}
        </div>
         {/* FAQs Section */}
         <div className="calculator-section my-6">
         <section className="info-box">
                <h2>Frequently Asked Questions (FAQs)</h2>
                <p>Need help? Our comprehensive FAQ section addresses all your common queries and concerns.</p>
                <p>Stay informed with clear and concise answers to help you make the most of VTU Notes.</p>
                <Link to="/faqs" className="button">Go to FAQs</Link>
            </section>

            {/* Study Planner */}
            <section className="info-box">
                <h2>Study Planner</h2>
                <p>Stay organized and efficient with our customizable Study Planner tool.</p>
                <p>Set goals, create schedules, and track your progress for a stress-free study experience.</p>
                <Link to="/study-planner" className="button">Go to Study Planner</Link>
            </section>
            </div>
            <div className="calculator-section my-6">
        <div class="vtu-links-section1">
  <h2>VTU Links</h2>
  <div class="vtu-links-container">
   
    <div class="vtu-link-card">
      <h3>VTU Results</h3>
      <p>Check your semester results online.</p>
      <a href="https://results.vtu.ac.in" target="_blank" rel="noopener noreferrer" class="button">
        View Results
      </a>
    </div>
    
    <div class="vtu-link-card">
      <h3>VTU Syllabus</h3>
      <p>Download the latest syllabus for all courses.</p>
      <a href="https://vtu.ac.in/b-e-scheme-syllabus/" target="_blank" rel="noopener noreferrer" class="button">
        View Syllabus
      </a>
    </div>
    
    <div class="vtu-link-card">
      <h3>Model Question Papers</h3>
      <p>Access model question papers for your exams.</p>
      <a href="https://vtu.ac.in/model-question-paper-b-e-b-tech-b-arch/" target="_blank" rel="noopener noreferrer" class="button">
        View Papers
      </a>
    </div>
   
    <div class="vtu-link-card">
      <h3>Academic Calendar</h3>
      <p>Stay updated with the latest academic schedule.</p>
      <a href="https://vtu.ac.in/academic-calendar/" target="_blank" rel="noopener noreferrer" class="button">
        View Calendar
      </a>
    </div>
    
    <div class="vtu-link-card">
      <h3>Notifications & Circulars</h3>
      <p>Check the latest updates and circulars from VTU.</p>
      <a href="https://vtu.ac.in/en/administration/circular/" target="_blank" rel="noopener noreferrer" class="button">
        View Notifications
      </a>
    </div>
  </div>
</div>
</div>

     
<div className="calculator-section my-6">
       <section className="info-box">
    <h2>Contact</h2>
    <p>Have questions or suggestions? Reach out to us for support and guidance.</p>
    <p>Email: <a href="mailto:vtunotesforall@gmail.com" className="link">vtunotesforall@gmail.com</a></p>
    <p>Phone: <a href="tel:+916364060716" className="link">+91 6364060716</a></p>
    <div className="button-group">
        <a href="https://chat.whatsapp.com/GV4LJ4FE4I1KvCyM6DTbsG" 
           target="_blank" 
           rel="noopener noreferrer" 
           className="button">
            WhatsApp Group 1
        </a>
        <a href="https://chat.whatsapp.com/IK3T3NpNZNWG9SY3ai1h8t" 
           target="_blank" 
           rel="noopener noreferrer" 
           className="button">
            WhatsApp Group 2
        </a>
    </div>
    
    
</section>
</div>
 {/* Add the comment section here */}
 <CommentSection />
       {/* Contact Section */}
       </div>
       
    );
};

export default Home;
