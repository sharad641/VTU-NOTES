import React from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Calculator, 
  Users, 
  Zap, 
  Globe, 
  CheckCircle,
  Code,
  Server,
  TrendingUp,
  Mail
} from "lucide-react";
import "./About.css";

const stats = [
  { label: "Views", value: "100K+", icon: <Globe size={20} /> },
  { label: "Active Users", value: "30K+", icon: <Users size={20} /> },
  { label: "Downloads", value: "42K+", icon: <BookOpen size={20} /> },
  { label: "Search Rank", value: "Top 3", icon: <TrendingUp size={20} /> },
];

const features = [
  {
    title: "Comprehensive Materials",
    desc: "Notes & Question Papers specifically tailored for CSE, ECE, and other VTU branches.",
    icon: <BookOpen className="feature-icon" />,
  },
  {
    title: "Smart Calculators",
    desc: "Instant SGPA, CGPA, and percentage calculations built for VTU grading logic.",
    icon: <Calculator className="feature-icon" />,
  },
  {
    title: "Exam Ready",
    desc: "Official model question papers and solved guides to boost your confidence.",
    icon: <CheckCircle className="feature-icon" />,
  },
  {
    title: "High Performance",
    desc: "Blazing fast speeds with lazy loading, CDN caching, and modern code-splitting.",
    icon: <Zap className="feature-icon" />,
  },
];

function About() {
  return (
    <div className="about-container">
      
      {/* 1. Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <span className="pill-badge">v 2.0.0 &middot; 2025 Edition</span>
          <h1 className="hero-title">
            The Ultimate Academic Hub for <span className="gradient-text">VTU Students</span>
          </h1>
          <p className="hero-subtitle">
            Simplify your engineering journey with top-quality notes, 
            smart tools, and a student-first ecosystem.
          </p>
          <div className="hero-buttons">
            <Link to="/branch-selection/2022" className="btn btn-primary">
              <BookOpen size={18} /> Explore Notes
            </Link>
            <a href="#mission" className="btn btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-icon-bg">{stat.icon}</div>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Mission Section */}
      <section id="mission" className="mission-section">
        <div className="mission-content">
          <h2>🎯 Our Mission</h2>
          <p>
            We are dedicated to creating a student-friendly ecosystem where learners find everything—from 
            <strong> notes and model papers</strong> to <strong>calculators and community support</strong>—under one roof.
            Our goal is to empower VTU students through smart tools and real-time learning experiences.
          </p>
        </div>
      </section>

      {/* 4. Features Grid */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose VTU Notes?</h2>
          <p>Built by students, for students.</p>
        </div>
        <div className="features-grid">
          {features.map((item, index) => (
            <div className="feature-card" key={index}>
              <div className="icon-wrapper">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Tech Stack & Achievements */}
      <section className="tech-section">
        <div className="tech-container">
          <div className="tech-text">
            <h2>🏆 Under the Hood</h2>
            <p>
              We built a robust full-stack platform ensuring security, scalability, and speed.
            </p>
            <ul className="tech-list">
              <li><Zap size={16} /> <strong>Performance:</strong> Lazy loading & CDN Caching</li>
              <li><Server size={16} /> <strong>Backend:</strong> Firebase Auth & Firestore DB</li>
              <li><Code size={16} /> <strong>Hosting:</strong> Netlify + Custom GoDaddy Domain</li>
              <li><TrendingUp size={16} /> <strong>Growth:</strong> SEO Optimized & Google AdSense</li>
            </ul>
          </div>
          <div className="tech-showcase">
            <div className="tech-badge">React JS</div>
            <div className="tech-badge">Firebase</div>
            <div className="tech-badge">Google Analytics</div>
            <div className="tech-badge">Netlify</div>
          </div>
        </div>
      </section>

      {/* 6. Developer & CTA */}
      <section className="developer-section">
        <div className="dev-card">
          <h2>👨‍💻 About the Team</h2>
          <p>
            Proudly developed by the <strong>vtunotesforall team</strong> — passionate students from 
            <strong> The BVSS Maratha Student's Home</strong>. We are united by a commitment 
            to education and collaboration.
          </p>
          <div className="contact-row">
            <a href="mailto:vtunotesforall@gmail.com" className="email-link">
              <Mail size={16} /> vtunotesforall@gmail.com
            </a>
          </div>
        </div>

        <div className="final-cta">
          <h3>Ready to elevate your grades?</h3>
          <Link to="/" className="btn btn-primary btn-large">
            Get Started Now
          </Link>
        </div>
      </section>

    </div>
  );
}

export default About;