import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <section className="about-intro">
        <h1>📚 About Us</h1>
        <p>
          Welcome to <strong>VTU Notes</strong>—your dedicated platform for academic excellence. We are committed to empowering engineering students of Visvesvaraya Technological University (VTU) with easy access to top-quality notes, study resources, and tools to make learning seamless and effective.
        </p>
      </section>
      
      <section className="about-mission">
        <h2>🎯 Our Mission</h2>
        <p>
          Our mission is simple yet impactful: to make education more accessible and provide high-quality study materials tailored to the needs of VTU students. We strive to bridge the gap between students and essential academic resources, ensuring success in every semester.
        </p>
      </section>
      
      <section className="about-features">
        <h2>🚀 Why Choose VTU Notes?</h2>
        <p>Here’s what we offer to help you on your academic journey:</p>
        <ul>
          <li><strong>Comprehensive Notes:</strong> Find notes for all semesters and branches, including CSE, ECE, and more.</li>
          <li><strong>Study Resources:</strong> Access solved assignments, model question papers, and exam preparation guides.</li>
          <li><strong>Community Support:</strong> Participate in forums, group discussions, and WhatsApp groups to connect with peers.</li>
          <li><strong>Regular Updates:</strong> Stay updated with the latest curriculum and study materials, ensuring you're always prepared.</li>
        </ul>
      </section>
      
      <section className="about-community">
        <h2>🤝 Join Our Community</h2>
        <p>
          VTU Notes is more than just a study platform; it's a collaborative ecosystem where students can share, learn, and grow together. By joining VTU Notes, you become part of a vibrant community dedicated to academic excellence and mutual growth.
        </p>
      </section>
      
      <section className="about-call-to-action">
        <p>
          Whether you’re just starting your journey or preparing for your final exams, <strong>VTU Notes</strong> is your trusted companion for success. Explore, learn, and excel with VTU Notes!
        </p>
        <p>
          Join us today and take the first step toward building a brighter future. Together, let’s make learning smarter, faster, and better.
        </p>
      </section>
    </div>
  );
}

export default About;
