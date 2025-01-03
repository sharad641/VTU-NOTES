import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      {/* Introduction Section */}
      <section className="about-intro">
        <h1>📚 About Us</h1>
        <p>
          Welcome to <strong>VTU Notes</strong>—your dedicated platform for academic excellence. 
          We are committed to empowering engineering students of Visvesvaraya Technological University (VTU) with easy access to top-quality notes, 
          study resources, and tools to make learning seamless and effective.
        </p>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <h2>🎯 Our Mission</h2>
        <p>
          Our mission is to make education more accessible by providing high-quality study materials tailored to the needs of VTU students. 
          We strive to bridge the gap between students and essential academic resources, ensuring success in every semester and academic pursuit.
        </p>
      </section>

      {/* Features Section */}
      <section className="about-features">
        <h2>🚀 Why Choose VTU Notes?</h2>
        <p>Here’s what sets VTU Notes apart:</p>
        <ul>
          <li><strong>Comprehensive Notes:</strong> Explore semester-wise and branch-specific notes, including CSE, ECE, ME, and more.</li>
          <li><strong>Study Resources:</strong> Access solved assignments, model question papers, and exam preparation guides to excel in your academics.</li>
          <li><strong>Community Support:</strong> Engage with peers through forums, group discussions, and exclusive WhatsApp study groups.</li>
          <li><strong>Regular Updates:</strong> Stay aligned with the latest syllabus and curated content tailored for VTU's evolving academic requirements.</li>
        </ul>
      </section>

      {/* Community Section */}
      <section className="about-community">
        <h2>🤝 Join Our Community</h2>
        <p>
          VTU Notes isn’t just a study resource; it's a thriving community where students collaborate, share ideas, and grow together. 
          By joining VTU Notes, you gain access to a network of like-minded learners focused on academic excellence and mutual support.
        </p>
      </section>

      {/* Developer Section */}
      <section className="about-developer">
        <h2>👨‍💻 About the Developer</h2>
        <p>
          VTU Notes is proudly developed by <strong>Sharad</strong>, a Sharad, a 5th-semester Computer Science & Engineering student specializing in ICB, is passionate about making education accessible to everyone. I am dedicated to leveraging technology to simplify learning for students like us.
        </p>
        <p>
          For feedback, queries, or collaborations, feel free to reach out to me at:
        </p>
        <ul>
          <li>Email: <a href="mailto:sharad@example.com">vtunotesforall@gmail.com</a></li>
          <li>Phone: <a href="tel:+916364060716" className="link">+91 6364060716</a></li>
          <li>LinkedIn: <a href="https://linkedin.com/in/sharad" target="_blank" rel="noopener noreferrer">l</a></li>
        </ul>
      </section>

      {/* Call-to-Action Section */}
      <section className="about-call-to-action">
        <p>
          Whether you’re just starting your academic journey or preparing for final exams, <strong>VTU Notes</strong> is your trusted companion. 
          Join us today and take the first step toward academic excellence!
        </p>
        <p>
          Together, let’s make learning smarter, faster, and better. Explore, learn, and excel with VTU Notes.
        </p>
      </section>
    </div>
  );
}

export default About;
