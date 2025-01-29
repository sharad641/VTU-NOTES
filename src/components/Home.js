// src/components/Home.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';
import CommentSection from './CommentSection';
import Calculator from './Calculator';
import UploadForm from './UploadForm';
import Contact from './Contact'; 


import './Home.css';

const Home = () => {
    // Log homepage view analytics
    useEffect(() => {
        logEvent(analytics, 'homepage_view');
    }, []);

    return (
      <div className="home-container">
          {/* Headline with marquee effect */}
          <div className="headline-message">
  <div className="marquee-text">
      🚀 A new feature has been added for placement test login. Review it now and take your preparation to the next level!
  </div>
</div>

{/* About VTU Notes */}
<section className="info-box">
  <h2>About VTU Notes</h2>
  <p>
      Welcome to VTU Notes – your ultimate academic partner! Our platform is tailored to meet the needs of VTU students, 
      offering a seamless learning experience through carefully curated resources. Here’s what makes us your best choice:
  </p>
  <ul>
      <li><strong>Curated Notes:</strong> Simplified and well-organized notes designed to cover every critical topic in the VTU syllabus.</li>
      <li><strong>Question Banks:</strong> Comprehensive collections of past year papers and model questions to help you prepare effectively.</li>
      <li><strong>Essential Questions:</strong> Pinpointed questions covering key topics likely to appear in your exams.</li>
      <li><strong>Subject-Wise Organization:</strong> All materials are categorized by subject and scheme for easy navigation.</li>
  </ul>
  <p>
      With VTU Notes, you no longer have to struggle to find the right study materials. Whether you’re preparing for exams or catching up on missed lectures, 
      we’ve got you covered.
  </p>
  <Link to="/branch-selection/2022" className="button">📘 Access 2022 Scheme</Link>
</section>

{/* Scheme Selection */}
<section className="info-box">
  <h2>Select Scheme for Notes</h2>
  <p>
      Your academic success starts here! Choose your specific scheme to access targeted resources tailored to your syllabus:
  </p>
  <ul>
      <li><strong>2022 Scheme:</strong> Fully updated notes and question banks aligned with the latest curriculum.</li>
      <li><strong></strong> A robust collection of resources for students in the previous academic structure.</li>
  </ul>
  <p>
      Stay ahead of your syllabus with our regularly updated library, ensuring you’re always equipped with the most relevant materials.
  </p>
  <Link to="/branch-selection/2022" className="button">📘 Access 2022 Scheme</Link>
</section>

<section className="info-box test-box">
    <h2>📝 Take a Practice Test</h2>
    <p>Boost your exam readiness with our interactive MCQ-based tests. Choose your subject, set the difficulty level, and get instant results!</p>
    
    <p>📚 **EVS Practice Tests (Module-wise):** Strengthen your Environmental Science concepts with module-based practice tests. Prepare systematically and track your progress.</p>
    
    <p>📖 **Model Question Paper Tests:** Solve past VTU Model Question Papers in an exam-like environment and improve your time management skills.</p>
    
    
    
    <div className="test-buttons11">
        <Link to="/test" className="button modern-button11">🎯 Start Test</Link>
        <Link to="/test?evsModule=EVS MCQ" className="button modern-button11">🌿 EVS Test</Link>
        
    </div>
</section>


{/* Placement Preparation Section */}
<section className="info-box">
  <h2>Placement Preparation Guide & Internship Opportunities</h2>
  <p>
      Preparing for placements or internships? We’ve got everything you need to stand out in competitive hiring processes. Explore our resources:
  </p>
  <ul>
      <li><strong>Mock Interviews:</strong> Practice realistic interview scenarios with detailed feedback to boost your confidence.</li>
      <li><strong>Aptitude Tests:</strong> Strengthen your reasoning, quantitative, and verbal skills through structured practice questions.</li>
      <li><strong>Technical Prep:</strong> Master coding challenges, system design concepts, and technical problem-solving strategies.</li>
  </ul>
  <p>Exclusive internship opportunities are just a click away:</p>
  <ul>
      <li><strong>Partner Companies:</strong> Connect with leading firms offering hands-on internships tailored to your field of study.</li>
      <li><strong>Skill-Building Workshops:</strong> Participate in real-world project-based learning to build job-ready skills.</li>
      <li><strong>Professional Certifications:</strong> Earn industry-recognized certifications that enhance your resume and career prospects.</li>
  </ul>
  <Link to="/placement-guide" className="button">👉 Explore Placement & Internship Guide</Link>
  <div className="test-link-container">
      <p>
          🎯 Ace your placements with expertly crafted practice tests. Simulate real-world exams and receive detailed analytics on your performance. 
          Prepare for top companies like Google, Infosys, and TCS!
      </p>
      <Link to="/test" className="button">📊 Take the Practice Test</Link>
  </div>
</section>

{/* Why Choose VTU Notes? */}
<section className="info-box">
  <h2>Why Choose VTU Notes?</h2>
  <p>
      VTU Notes isn’t just a study resource – it’s your complete academic ecosystem. Here’s what makes us stand out:
  </p>
  <ul>
      <li>
          <strong>Tailored for VTU Students:</strong> All resources are mapped to VTU's curriculum, ensuring 100% alignment with what you need to study.
      </li>
      <li>
          <strong>Interactive Features:</strong> Like, save, and comment on notes for a personalized and collaborative learning experience.
      </li>
      <li>
          <strong>All-in-One Platform:</strong> Access notes, question banks, placement guides, and internship opportunities under one roof.
      </li>
      <li>
          <strong>Community Support:</strong> Join a thriving community of learners where you can share doubts, participate in discussions, and exchange ideas.
      </li>
      <li>
          <strong>Regular Updates:</strong> Stay ahead of changes with our frequently updated resources that reflect the latest syllabus and exam trends.
      </li>
      <li>
          <strong>Expertly Curated Content:</strong> All materials are created and reviewed by subject matter experts and top-performing students.
      </li>
     
      <li>
          <strong>Mobile-Friendly Access:</strong> Study anytime, anywhere with a fully responsive website optimized for mobile devices.
      </li>
      <li>
          <strong>Placement Focus:</strong> Beyond academics, we prepare you for the future with a dedicated placement and career advancement section.
      </li>
  </ul>
  <p>
      With VTU Notes, you’re not just preparing for exams – you’re building a foundation for a successful academic and professional career. 
      Join thousands of students who trust VTU Notes to excel in their journey.
  </p>
  <Link to="/login" className="button">🚀 Get Started Now</Link>


</section>


         
         


          




         {/* Add the Calculator section */}
         
              <Calculator />
        
        
        
      {/* FAQs Section */}
<section className="info-box modern-box">
<h2>📖 Frequently Asked Questions (FAQs)</h2>
<p>Have questions? Our FAQ section provides quick, clear, and concise answers to your most common concerns.</p>
<p>Get the guidance you need to make the most out of VTU Notes!</p>
<Link to="/faqs" className="button modern-button">🔗 Go to FAQs</Link>
</section>



{/* VTU Links Section */}
<div className="info-box modern-box">
<h2>🔗 VTU Links</h2>
<div className="vtu-links-container">
  <div className="vtu-link-card modern-card">
    <h3>VTU Results</h3>
    <p>View your semester results instantly online.</p>
    <a href="https://results.vtu.ac.in" target="_blank" rel="noopener noreferrer" className="button modern-button">
      📋 View Results
    </a>
  </div>
  <div className="vtu-link-card modern-card">
    <h3>VTU Syllabus</h3>
    <p>Access and download the latest syllabus for all courses.</p>
    <a href="https://vtu.ac.in/b-e-scheme-syllabus/" target="_blank" rel="noopener noreferrer" className="button modern-button">
      📚 View Syllabus
    </a>
  </div>
  <div className="vtu-link-card modern-card">
    <h3>Model Question Papers</h3>
    <p>Prepare effectively with model question papers.</p>
    <a href="https://vtu.ac.in/model-question-paper-b-e-b-tech-b-arch/" target="_blank" rel="noopener noreferrer" className="button modern-button">
      📝 View Papers
    </a>
  </div>
  <div className="vtu-link-card modern-card">
    <h3>Academic Calendar</h3>
    <p>Stay informed about key dates and schedules.</p>
    <a href="https://vtu.ac.in/academic-calendar/" target="_blank" rel="noopener noreferrer" className="button modern-button">
      📅 View Calendar
    </a>
  </div>
  <div className="vtu-link-card modern-card">
    <h3>Notifications & Circulars</h3>
    <p>Check out the latest updates and notifications.</p>
    <a href="https://vtu.ac.in/en/administration/circular/" target="_blank" rel="noopener noreferrer" className="button modern-button">
      📢 View Notifications
    </a>
  </div>
</div>
</div>



      <UploadForm /> {/* Add the upload form here */}
     
      <Contact /> 
{/* Add the comment section here */}
<CommentSection />

     </div>
     
  );
};

export default Home;

