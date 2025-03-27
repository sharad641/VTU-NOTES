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

      {/* Features Section */}
      <section className="about-features">
        <h2>🚀 Why Choose VTU Notes?</h2>
        <p>
          At <strong>VTU Notes</strong>, we are dedicated to empowering students with top-notch resources designed to make your academic journey smoother and more successful. Here's why thousands of students trust us:
        </p>
        <ul>
          <li>
            <strong>📚 Comprehensive Study Materials:</strong> Gain access to semester- and branch-specific notes tailored for VTU, including CSE, ECE, Mechanical, and more. We ensure every topic is covered in detail to help you excel.
          </li>
          <li>
            <strong>🎯 Ace Your Exams:</strong> Prepare confidently with solved question papers, model exams, detailed solutions, and preparation guides crafted for VTU exams.
          </li>
          <li>
            <strong>🤝 Join a Thriving Community:</strong> Be a part of our learning ecosystem with active forums, group discussions, and exclusive WhatsApp groups to exchange ideas, seek help, and collaborate with peers.
          </li>
          <li>
            <strong>🔄 Always Up-to-Date:</strong> Stay ahead of the curve with content that's constantly updated to align with VTU's latest syllabus and academic requirements.
          </li>
          <li>
            <strong>🌟 Tailored for Success:</strong> From beginners to advanced learners, our resources are designed to cater to all learning levels, ensuring everyone can achieve their academic goals.
          </li>
          <li>
            <strong>💻 Tech-Enhanced Learning:</strong> Enjoy an intuitive and user-friendly platform optimized for seamless browsing on any device, making learning accessible anywhere, anytime.
          </li>
        </ul>
        <p>
          Choose <strong>VTU Notes</strong> and let us help you achieve your academic dreams with the right tools, guidance, and support!
        </p>
      </section>

      {/* Achievements Section */}
      <section className="about-achievements">
        <h2>🏆 Our Achievements</h2>
        <div className="achievement-cards">
          <div className="card">
            <h3>8k+ Users</h3>
            <p>Thousands of VTU students trust VTU Notes for their academic success.</p>
          </div>
          <div className="card">
           
            <p>Our platform has received over 32,000 visits from students across VTU branches.</p>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="about-support">
        <div className="support-container">
          <h2>💖 Join Us in Making Education Accessible for All</h2>
          <p>
            At <strong>VTU Notes</strong>, our mission is simple yet powerful: to provide free, high-quality academic resources to every student in need. 
            We believe that education is a right, not a privilege, and with your support, we can continue breaking barriers to knowledge.
          </p>
          <p>
            Your contribution isn’t just a donation—it’s an investment in the future of countless students who rely on these resources to excel in their studies. 
            Together, we can build a platform that inspires, educates, and empowers learners everywhere.
          </p>
          <p>
            Every small step makes a big impact. Whether it’s helping us add new features, enhance the user experience, or reach underserved students, 
            your generosity enables us to take VTU Notes to the next level. Let’s make a difference together!
          </p>
          <div className="donation-options">
            <h3>✨ How You Can Support Us</h3>
            <ul>
              <li>
                <strong>Paytm UPI:</strong> <code>6364060716@ptyes</code>
              </li>
              <li>
                <strong>PhonePe UPI:</strong> <code>6364060716@axl</code>
              </li>
            </ul>
          </div>
    
          
          <p className="thank-you">
            🌟 Every contribution, big or small, brings us closer to transforming education for all. 
            Thank you for being a part of this journey! Your kindness and support mean the world to us. 💙
          </p>
        </div>
      </section>

      {/* Developer Section */}
      <section className="about-developer">
        <h2>👨‍💻 About the Developer</h2>
        <p>
          VTU Notes was built by <strong>vtunotesforall team</strong>, a passionate Computer Science students aiming to make education 
          accessible through technology.
        </p>
        <ul>
          <li>Email: <a href="mailto:vtunotesforall@gmail.com">vtunotesforall@gmail.com</a></li>
          <li>Phone: <a href="tel:+916364060716" className="link">+91 6364060716</a></li>
        </ul>
      </section>

      {/* Call-to-Action Section */}
      <section className="about-call-to-action">
        <p>
          Ready to transform your academic journey? <strong>VTU Notes</strong> is here to guide you every step of the way. 
          Start exploring, learning, and achieving today!
        </p>
        <Link to="/" className="button">Get Started</Link>
      </section>
    </div>
  );
}

export default About;
