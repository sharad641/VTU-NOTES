import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, Calculator, Users, Zap, Globe, CheckCircle, Code,
  TrendingUp, Mail, Sparkles, Target, Heart, ArrowRight,
  GraduationCap, Shield, Github, Linkedin, Instagram
} from "lucide-react";
import "./AboutModern.css"; // CHANGED: Modern CSS

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
    icon: <BookOpen />,
    color: "#60A5FA" // blue-400
  },
  {
    title: "Smart Calculators",
    desc: "Instant SGPA, CGPA, and percentage calculations built for VTU grading logic.",
    icon: <Calculator />,
    color: "#F472B6" // pink-400
  },
  {
    title: "Exam Ready",
    desc: "Official model question papers and solved guides to boost your confidence.",
    icon: <CheckCircle />,
    color: "#34D399" // emerald-400
  },
  {
    title: "High Performance",
    desc: "Blazing fast speeds with lazy loading, CDN caching, and modern code-splitting.",
    icon: <Zap />,
    color: "#FBBF24" // amber-400
  },
];

function About() {
  return (
    <div className="about-container">

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-badge">
          <Sparkles size={16} /> Made for VTU 2025
        </div>
        <h1 className="about-title">
          The Ultimate Hub for <br />
          <span style={{ color: '#6366F1' }}>Smart Engineers</span>
        </h1>
        <p className="about-subtitle responsive-text-check">
          Simplify your engineering journey with top-quality notes,
          smart tools, and a student-first ecosystem designed for success.
          Built with precision, updated for the latest scheme.
        </p>

        <div className="about-stats-grid">
          {stats.map((stat, i) => (
            <div className="stat-card-modern" key={i}>
              <div style={{ color: '#6366F1', marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                {React.cloneElement(stat.icon, { size: 32 })}
              </div>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px', color: 'white' }}>Why Students Love Us</h2>
          <p style={{ color: '#94A3B8' }}>Crafted with care to solve real student problems.</p>
        </div>
        <div className="features-grid">
          {features.map((item, index) => (
            <div className="feature-card-glass" key={index}>
              <div className="feature-icon-box" style={{ color: item.color, background: `${item.color}20` }}>
                {React.cloneElement(item.icon, { size: 28 })}
              </div>
              <h3 className="responsive-text-check">{item.title}</h3>
              <p className="responsive-text-check">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="team-section">
        <div className="dev-highlight-card">
          <div className="dev-avatar-large">V</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: 'white' }}>Our Mission</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#CBD5E1', marginBottom: '40px' }} className="responsive-text-check">
            We are a team of passionate students from <strong>The BVSS Maratha Student's Home</strong>,
            dedicated to democratizing education. We believe every VTU student deserves
            free, high-quality resources to excel in their academic journey.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a href="mailto:vtunotesforall@gmail.com" style={{ background: '#6366F1', color: 'white', padding: '12px 24px', borderRadius: '100px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
              <Mail size={18} /> Contact Team
            </a>
            <Link to="/branch-selection/2022" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '12px 24px', borderRadius: '100px', textDecoration: 'none', fontWeight: '600' }}>
              Start Learning
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '40px 20px', textAlign: 'center', color: '#64748B' }}>
        <p>
          &copy; {new Date().getFullYear()} VTU Notes For All. Open Source Education.
        </p>
      </footer>

    </div>
  );
}

export default About;