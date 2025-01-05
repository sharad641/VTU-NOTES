import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      {/* Introduction Section */}
      <section className="about-intro">
        <h1>📚 About Us</h1>
        <p>
          Welcome to <strong>VTU Notes</strong>—your go-to platform for academic excellence. 
          We empower engineering students of Visvesvaraya Technological University (VTU) with top-quality notes, study resources, 
          and tools to simplify learning.
        </p>
        <Link to="/branch-selection/2022" className="button">
          📘 Explore Notes
        </Link>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <h2>🎯 Our Mission</h2>
        <p>
          At <strong>VTU Notes</strong>, our mission is to revolutionize the learning experience for VTU students. 
          We aim to make high-quality education accessible, engaging, and seamless. Our platform bridges the gap between students 
          and essential academic resources, ensuring that every learner has the tools to succeed academically and professionally.
        </p>
        <p>
          By leveraging technology and fostering a collaborative community, we are committed to empowering students with the 
          confidence and knowledge to excel in their engineering journey.
        </p>
      </section>

      {/* Achievements Section */}
      <section className="about-achievements">
        <h2>🏆 Our Achievements</h2>
        <div className="achievement-cards">
          <div className="card">
            <h3>3k+ Users</h3>
            <p>Thousands of VTU students trust VTU Notes for their academic success.</p>
          </div>
          <div className="card">
            <h3>10k+ Views</h3>
            <p>Our platform has received over 10,000 visits from students across VTU branches.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features">
        <h2>🚀 Why Choose VTU Notes?</h2>
        <p>Here’s what makes VTU Notes stand out:</p>
        <ul>
          <li><strong>Comprehensive Notes:</strong> Semester- and branch-specific notes, including CSE All Steams.</li>
          <li><strong>Exam Prep Resources:</strong> Access solved assignments, model papers, and preparation guides.</li>
          <li><strong>Community Engagement:</strong> Join forums, group discussions, and exclusive WhatsApp groups.</li>
          <li><strong>Always Updated:</strong> Stay in sync with VTU’s evolving syllabus and requirements.</li>
        </ul>
      </section>

      

      {/* Community Section */}
      <section className="about-community">
        <h2>🤝 Join Our Community</h2>
        <p>
          VTU Notes is more than a resource; it's a collaborative platform where students connect, share ideas, 
          and achieve academic goals together. 
        </p>
        <a
          href="https://chat.whatsapp.com/IK3T3NpNZNWG9SY3ai1h8t"
          target="_blank"
          rel="noopener noreferrer"
          className="button modern-button"
        >
          Join now
        </a>
      </section>

      {/* Developer Section */}
      <section className="about-developer">
        <h2>👨‍💻 About the Developer</h2>
        <p>
          VTU Notes was built by <strong>Sharad</strong>, a passionate Computer Science student aiming to make education 
          accessible through technology.
        </p>
        <ul>
          <li>Email: <a href="mailto:vtunotesforall@gmail.com">vtunotesforall@gmail.com</a></li>
          <li>Phone: <a href="tel:+916364060716" className="link">+91 6364060716</a></li>
          <li>LinkedIn: <a href="https://www.linkedin.com/in/sharad-patil-691902259" target="_blank" rel="noopener noreferrer">Sharad on LinkedIn</a></li>
        </ul>
      </section>

      {/* Call-to-Action Section */}
      <section className="about-call-to-action">
        <p>
          Ready to transform your academic journey? <strong>VTU Notes</strong> is here to guide you every step of the way. 
          Start exploring, learning, and achieving today!
        </p>
        <Link to="/" className="button">get started</Link>
      </section>
    </div>
  );
}

export default About;
