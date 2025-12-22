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
  Mail,
  Sparkles,
  Target,
  Heart,
  ArrowRight,
  GraduationCap,
  Shield
} from "lucide-react";
import "./About.css";

const stats = [
  { label: "Views", value: "100K+", icon: <Globe /> },
  { label: "Active Users", value: "30K+", icon: <Users /> },
  { label: "Downloads", value: "42K+", icon: <BookOpen /> },
  { label: "Search Rank", value: "Top 3", icon: <TrendingUp /> },
];

const features = [
  {
    title: "Comprehensive Materials",
    desc: "Notes & Question Papers specifically tailored for CSE, ECE, and other VTU branches.",
    icon: <BookOpen className="feature-icon" />,
    color: "var(--primary)"
  },
  {
    title: "Smart Calculators",
    desc: "Instant SGPA, CGPA, and percentage calculations built for VTU grading logic.",
    icon: <Calculator className="feature-icon" />,
    color: "var(--accent)"
  },
  {
    title: "Exam Ready",
    desc: "Official model question papers and solved guides to boost your confidence.",
    icon: <CheckCircle className="feature-icon" />,
    color: "var(--success)"
  },
  {
    title: "High Performance",
    desc: "Blazing fast speeds with lazy loading, CDN caching, and modern code-splitting.",
    icon: <Zap className="feature-icon" />,
    color: "var(--warning)"
  },
  {
    title: "Always Updated",
    desc: "Regularly updated content aligned with the latest VTU syllabus and patterns.",
    icon: <Sparkles className="feature-icon" />,
    color: "var(--purple)"
  },
  {
    title: "Mobile First",
    desc: "Fully responsive design that works perfectly on all devices and screen sizes.",
    icon: <Code className="feature-icon" />,
    color: "var(--info)"
  },
];

function About() {
  return (
    <div className="about-container">
      
      {/* 1. Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <div className="badge-container">
            <span className="pill-badge">
              <Sparkles size={14} /> v 2.0.0 · 2025 Edition
            </span>
            <span className="pill-badge secondary">
              <Heart size={14} /> Made with Love
            </span>
          </div>
          <h1 className="hero-title">
            The Ultimate Academic Hub for <span className="gradient-text">VTU Students</span>
          </h1>
          <p className="hero-subtitle">
            Simplify your engineering journey with top-quality notes, 
            smart tools, and a student-first ecosystem designed for success.
          </p>
          <div className="hero-buttons">
            <Link to="/branch-selection/2022" className="btn btn-primary">
              <BookOpen size={20} /> Explore Notes <ArrowRight size={18} />
            </Link>
            <a href="#mission" className="btn btn-secondary">
              Learn More <ArrowRight size={18} />
            </a>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="decoration-circle"></div>
          <div className="decoration-circle"></div>
          <div className="decoration-circle"></div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-icon-wrapper">
                {stat.icon}
              </div>
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
              <div className="stat-progress"></div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Mission Section */}
      <section id="mission" className="mission-section">
        <div className="mission-content">
          <div className="mission-icon">
            <Target size={32} />
          </div>
          <h2 className="mission-title">Our Mission & Vision</h2>
          <p className="mission-text">
            We are dedicated to creating a <span className="highlight">student-friendly ecosystem</span> where learners find everything—from 
            <strong> notes and model papers</strong> to <strong>calculators and community support</strong>—under one roof.
            Our vision is to empower every VTU student with accessible, high-quality educational resources.
          </p>
          <div className="mission-points">
            <div className="mission-point">
              <Shield size={20} />
              <span>Free & Accessible Education</span>
            </div>
            <div className="mission-point">
              <GraduationCap size={20} />
              <span>Quality Learning Materials</span>
            </div>
            <div className="mission-point">
              <Users size={20} />
              <span>Community Driven</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Features Grid */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose VTU Notes?</h2>
          <p className="section-subtitle">Built by students, for students — with modern technology.</p>
        </div>
        <div className="features-grid">
          {features.map((item, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon-wrapper" style={{ backgroundColor: `${item.color}15` }}>
                <div className="feature-icon-inner" style={{ color: item.color }}>
                  {item.icon}
                </div>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="feature-hover"></div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Developer & CTA */}
      <section className="developer-section">
        <div className="dev-container">
          <div className="dev-card">
            <div className="dev-header">
              <div className="dev-avatar">V</div>
              <div>
                <h2>About the Team</h2>
                <p className="dev-subtitle">Passionate students making education accessible</p>
              </div>
            </div>
            <p className="dev-description">
              Proudly developed by the <strong>vtunotesforall team</strong> — passionate students from 
              <strong> The BVSS Maratha Student's Home</strong>. We are united by a commitment 
              to education and collaboration, building tools that students actually need.
            </p>
            <div className="dev-footer">
              <a href="mailto:vtunotesforall@gmail.com" className="email-link">
                <Mail size={18} /> vtunotesforall@gmail.com
              </a>
              <div className="social-links">
                <span>Follow us: </span>
                <a href="#" className="social-link">GitHub</a>
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">Instagram</a>
              </div>
            </div>
          </div>

          <div className="final-cta">
            <div className="cta-content">
              <h3>Ready to elevate your grades?</h3>
              <p>Join thousands of successful VTU students today</p>
              <div className="cta-buttons">
                <Link to="/" className="btn btn-primary btn-large">
                  Get Started Now <ArrowRight size={20} />
                </Link>
                <Link to="/branch-selection/2022" className="btn btn-outline">
                  Browse All Notes
                </Link>
              </div>
              <div className="trust-badges">
                <span>✓ 100% Free</span>
                <span>✓ No Ads</span>
                <span>✓ Open Source</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer Note */}
      <footer className="about-footer">
        <p>
          Made with <Heart size={16} /> by VTU Students for VTU Students. 
          This project is open source and community-driven.
        </p>
      </footer>

    </div>
  );
}

export default About;