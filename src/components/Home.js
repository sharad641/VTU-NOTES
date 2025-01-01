// src/components/Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';

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

           
            {/* SGPA Calculator */}
            <section className="info-box">
                <h2>VTU Calculators</h2>
                <p>Make use of our accurate SGPA and CGPA calculators to track your academic progress effortlessly.</p>
                <p>Plan ahead by knowing where you stand and aim for excellence with confidence.</p>
                <Link to="/calculator" className="button">Go to SGPA Calculator</Link>
            </section>

            {/* Upload Notes */}
            <section className="info-box">
                <h2>Upload Your Notes</h2>
                <p>Join our mission to help students excel by sharing your valuable notes and study materials.</p>
                <p>Your contributions will make a significant difference in the learning journey of your peers.</p>
                <Link to="/upload" className="button">Upload Notes</Link>
            </section>

            {/* FAQs Section */}
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

            {/* ChatBot Section */}
            <div className="chatbot-button-container">
                <button className="button" onClick={toggleChatbot}>
                    {showChatbot ? 'Hide Chatbot' : 'Chat with Us!'}
                </button>
            </div>
            {showChatbot && <ChatBot />}

            {/* Contact Section */}
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


            {/* Discussion Section */}
            <section className="info-box">
                <h2>Share Your Thoughts</h2>
                <p>We value your feedback and ideas! Participate in discussions and share your thoughts with us.</p>
                <p>Let your voice be heard and contribute to improving the VTU Notes platform.</p>
                <Link to="/comments" className="button">Explore Discussions</Link>
            </section>
        </div>
    );
};

export default Home;
