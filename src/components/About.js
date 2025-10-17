import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      {/* 🏫 Introduction Section */}
      <section className="about-intro">
        <h1>📚 About Us</h1>
        <p>
          Welcome to <strong>VTU Notes</strong> — your trusted academic hub for
          <strong> Visvesvaraya Technological University (VTU)</strong> students.
          Our mission is to simplify learning by providing top-quality notes,
          study materials, tools, and resources — all in one place.
        </p>
        <Link to="/branch-selection/2022" className="button">
          📘 Explore Notes
        </Link>
      </section>

      {/* 🎯 Mission Section */}
      <section className="about-mission">
        <h2>🎯 Our Mission</h2>
        <p>
          <strong>VTU Notes</strong> aims to make education more accessible,
          interactive, and impactful. We’re dedicated to creating a
          student-friendly ecosystem where learners can find everything — from
          notes and model papers to calculators and community support — under
          one platform.
        </p>
        <p>
          Our goal is to empower VTU students through smart tools, real-time
          learning experiences, and collaborative engagement for academic
          success.
        </p>
      </section>

      {/* 🚀 Features Section */}
      <section className="about-features">
        <h2>🚀 Why Choose VTU Notes?</h2>
        <p>
          Thousands of students rely on <strong>VTU Notes</strong> for reliable,
          updated, and easy-to-use learning resources:
        </p>
        <ul>
          <li>
            <strong>📚 Comprehensive Study Materials:</strong> Access notes and
            question papers tailored to VTU’s syllabus for CSE, ECE, Mechanical,
            and other branches.
          </li>
          <li>
            <strong>🧮 Smart Calculators:</strong> Instantly calculate your SGPA,
            CGPA, and percentage — built specifically for VTU grading systems.
          </li>
          <li>
            <strong>📝 Real Exam Practice:</strong> Study with official model
            question papers and solved guides to boost your exam confidence.
          </li>
          <li>
            <strong>🤝 Student Community:</strong> Collaborate with peers and
            share academic insights to learn better together.
          </li>
          <li>
            <strong>💻 Tech-Optimized Platform:</strong> Enjoy a fast, responsive,
            and modern design with smooth browsing across all devices.
          </li>
        </ul>
      </section>

      {/* 🏆 Achievements Section */}
      <section className="about-achievements">
        <h2>🏆 Our Achievements</h2>
        <div className="achievement-cards">
          <div className="card">
            <h3>VTU Notes (2024–2025)</h3>
            <p>
              Built a full-stack academic hub featuring VTU notes, model papers,
              and SGPA/CGPA calculators — all designed to help engineering
              students learn smarter.
            </p>
            <ul>
              <li>
                🌐 Achieved <strong>100K+ views</strong>, <strong>30K+ users</strong>, and{" "}
                <strong>42K+ downloads</strong>, ranking in the <strong>Top 3</strong> Google
                search results for VTU notes.
              </li>
              <li>
                🔥 Integrated <strong>Firebase Authentication</strong>,
                <strong> Firestore</strong> (real-time DB), <strong>Firebase Storage</strong>,
                and <strong>Google Drive</strong> for secure, scalable hosting.
              </li>
              <li>
                ⚡ Optimized performance with lazy loading, CDN caching, and
                code-splitting to reduce page load times.
              </li>
              <li>
                📊 Implemented SEO, Google Analytics, and monetization via{" "}
                <strong>Google AdSense</strong>.
              </li>
              <li>
                🚀 Deployed on <strong>Netlify</strong> with a custom
                <strong> GoDaddy domain</strong> and HTTPS, including
                role-based access control for admins.
              </li>
              <li>
                🔗 Website:{" "}
                <a
                  href="https://vtunotesforall.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  vtunotesforall.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 👨‍💻 Developer Section */}
      <section className="about-developer">
        <h2>👨‍💻 About the Developers</h2>
        <p>
          <strong>VTU Notes</strong> was proudly developed by the{" "}
          <strong>vtunotesforall team</strong> — passionate Computer Science
          students from <strong>The BVSS Maratha Students Home</strong>, driven
          by the vision of making academic resources accessible to all VTU
          learners.
        </p>
        <ul>
          <li>
            📧 Email:{" "}
            <a href="mailto:vtunotesforall@gmail.com">
              vtunotesforall@gmail.com
            </a>
          </li>
          <li>
            📞 Phone:{" "}
           
          </li>
        </ul>
      </section>

      {/* 🚀 Call-to-Action Section */}
      <section className="about-call-to-action">
        <p>
          Ready to elevate your academic journey? Join thousands of VTU students
          learning smarter with <strong>VTU Notes</strong>. Start exploring your
          branch materials today and experience next-level learning!
        </p>
        <Link to="/" className="button">
          Get Started
        </Link>
      </section>
    </div>
  );
}

export default About;
