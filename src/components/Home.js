import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineMagnifyingGlass, HiOutlineBookOpen, HiOutlineFire,
  HiOutlineClock, HiOutlineChevronRight, HiOutlineSparkles
} from 'react-icons/hi2';
import {
  FaRocket, FaShieldAlt, FaLightbulb, FaUserAstronaut,
  FaHeart, FaBolt, FaCrown, FaStar, FaChevronLeft, FaChevronRight,
  FaGraduationCap, FaLayerGroup, FaRobot, FaCalculator,
  FaTimes, FaCoffee, FaEye, FaCheckCircle
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { database } from '../firebase';
import './Home.css';
import './SupportPopup.css';

import { subjectsData } from '../data/subjectsData';
import CommentSection from './CommentSection';
import SupportSection from './SupportSection';
import SupportModal from './SupportModal';

const Home = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = React.useState(false);
  const itemsPerPage = 9;

  // Helper to generate gradients based on id
  const getGradient = (id) => {
    const gradients = [
      "linear-gradient(135deg, #6366F1 0%, #A855F7 100%)",
      "linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)",
      "linear-gradient(135deg, #0EA5E9 0%, #2DD4BF 100%)",
      "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
      "linear-gradient(135deg, #10B981 0%, #059669 100%)",
      "linear-gradient(135deg, #8B5CF6 0%, #D946EF 100%)"
    ];
    return gradients[id % gradients.length];
  };

  // Flatten and normalize data
  const getAllSubjects = () => {
    let allSubjects = [];
    let idCounter = 1;

    Object.keys(subjectsData).forEach(branch => {
      Object.keys(subjectsData[branch]).forEach(semester => {
        subjectsData[branch][semester].forEach(subject => {

          // Determine Category
          let category = 'General';
          if (branch === 'first-year') category = 'First Year';
          else if (branch === 'cse') category = 'CSE Core';
          else if (branch === 'ece') category = 'ECE Core';

          // Determine Semester String
          const semSuffix = (sem) => {
            if (sem == 1) return 'st';
            if (sem == 2) return 'nd';
            if (sem == 3) return 'rd';
            return 'th';
          };

          allSubjects.push({
            id: idCounter,
            title: subject.name,
            code: subject.code,
            description: subject.info || `${branch === 'first-year' ? 'First Year' : branch.toUpperCase()} ${semester} Semester Notes`,
            category: category,
            semester: `${semester}${semSuffix(semester)} Semester`,
            readTime: `${(subject.credits || 2) + 1} min read`, // dynamic read time based on credits
            views: `${(Math.random() * 20 + 5).toFixed(1)}K`, // Mock data
            likes: Math.floor(Math.random() * 200) + 50, // Mock data
            date: "Updated Recently",
            gradient: getGradient(idCounter), // cyclical gradients
            link: `/branch/${branch}/${semester}/modules/${subject.name}`
          });
          idCounter++;
        });
      });
    });
    return allSubjects;
  };

  const featuredSubjects = getAllSubjects();

  // Welcome Popup Logic
  React.useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('welcomePopupSeen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowWelcomePopup(true);
      }, 4000); // 4 second delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSupportClick = () => {
    setShowWelcomePopup(false);
    setIsPopupOpen(true);
    sessionStorage.setItem('welcomePopupSeen', 'true');
  };

  const closePopup = () => {
    setShowWelcomePopup(false);
    setIsPopupOpen(false);
    sessionStorage.setItem('welcomePopupSeen', 'true');
  };

  const categories = ['All', 'First Year', 'CSE Core', 'CSE Lab', 'CSE Elective', 'AI/ML', 'AIML-DS', 'ECE Core'];

  const filteredSubjects = featuredSubjects.filter(subject => {
    const matchesSearch = subject.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || subject.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSubjects = filteredSubjects.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="home-extreme-root">
      {/* --- Background Engine --- */}
      <div className="home-background-shapes">
        <div className="shape s1"></div>
        <div className="shape s2"></div>
        <div className="geo-shape hexagon geo-1"></div>
        <div className="geo-shape triangle geo-2"></div>
        <div className="geo-shape hexagon geo-3"></div>
        <div className="geo-shape triangle geo-4"></div>
      </div>

      <div className="home-container">
        {/* --- Extreme Hero Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="home-hero-card"
        >
          <div className="hero-mesh-bg"></div>

          <div className="hero-split-layout">
            <div className="hero-content-left">
              <div className="hero-badge">
                <FaBolt className="bolt-icon" />
                <span>VTU NOTES 3.0 EXTREME</span>
              </div>
              <h1>Ultimate Academic <span className="title-alt">Engine</span></h1>
              <p>Access high-fidelity notes, model papers, and analytics for your VTU journey.</p>

              <div className="hero-search-island">
                <HiOutlineMagnifyingGlass className="search-icon" />
                <input
                  type="text"
                  placeholder="Search subjects, codes, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-btn">EXPLORE</button>
              </div>
            </div>

            <div className="hero-content-right">
               <motion.div
                 animate={{ y: [0, -20, 0] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="hero-logo-wrapper-col"
               >
                 <div className="hero-logo-container">
                   <img
                     src="/Gemini_Generated_Image_rxara5rxara5rxar.png"
                     alt="VTU Portal Futuristic Logo"
                     className="hero-main-logo"
                   />
                   <div className="logo-glow-underlay"></div>
                 </div>

                 {/* Support Button */}
                 <button
                    onClick={() => setIsPopupOpen(true)}
                    className="hero-support-pill"
                    style={{ cursor: 'pointer', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)' }}
                 >
                    <FaHeart className="support-icon-pulse" />
                    <span>Support Platform</span>
                    <div className="pill-gleam"></div>
                 </button>
               </motion.div>
            </div>
          </div>
        </motion.div>

        {/* --- Feature Highlights Grid --- */}
        <div className="feature-highlights-grid">
          {[
            { icon: <FaGraduationCap />, title: "Curated Notes", desc: "Expert-verified study material", color: "var(--neon-blue)" },
            { icon: <FaLayerGroup />, title: "Model Papers", desc: "Previous years & predicted questions", color: "var(--neon-purple)" },
            { icon: <FaCalculator />, title: "SGPA Tools", desc: "Instant GPA & CGPA calculations", color: "var(--neon-green)" },
            { icon: <FaRobot />, title: "AI Assistant", desc: "Powered by Gemini for instant help", color: "var(--neon-rose)" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              className="feature-card-modern"
            >
              <div className="feature-icon-wrapper" style={{ boxShadow: `0 0 20px ${feature.color}33`, color: feature.color }}>
                {feature.icon}
              </div>
              <div className="feature-info">
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
              <div className="feature-glow" style={{ background: feature.color }}></div>
            </motion.div>
          ))}
        </div>

        {/* --- Category Glass Navigation --- */}
        <div className="category-nav-island">
          <div className="nav-scroll-wrapper">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- Section Header --- */}
        <div className="section-header-3d">
          <div className="sh-left">
            <HiOutlineFire className="fire-icon" />
            <h2>Trending <span className="sh-alt">Assets</span></h2>
          </div>
          <Link to="/notes" className="explore-link">
            <span>View All</span>
            <HiOutlineChevronRight />
          </Link>
        </div>

        {/* --- 3D Subject Grid --- */}
        <div className="subjects-grid-3d">
          <AnimatePresence mode='popLayout'>
            {currentSubjects.map((subject, idx) => (
              <motion.div
                key={subject.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                className="card-perspective-wrapper"
              >
                <Link to={subject.link} className="subject-card-magazine">
                  {/* Card Header with Image Background and Dark Overlay */}
                  <div className="card-header-magazine" style={{ background: subject.gradient }}>
                    <div className="card-overlay"></div>
                    <div className="read-time-badge">
                      <HiOutlineClock />
                      <span>{subject.readTime}</span>
                    </div>
                    <h3 className="card-title-magazine">{subject.title}</h3>
                    <div className="card-watermark">vtunotesforall.in</div>
                  </div>

                  {/* Card Content */}
                  <div className="card-content-magazine">
                    {/* Category Tags */}
                    <div className="card-tags">
                      <span className="tag-category">{subject.category}</span>
                      <span className="tag-semester">{subject.semester}</span>
                    </div>

                    {/* Subject Code */}
                    <h4 className="card-code">{subject.code}</h4>

                    {/* Description */}
                    <p className="card-description">{subject.description}</p>

                    {/* Metrics */}
                    <div className="card-metrics">
                      <div className="metric-item">
                        <HiOutlineClock />
                        <span>{subject.date}</span>
                      </div>
                      <div className="metric-item">
                        <FaEye />
                        <span>{subject.views}</span>
                      </div>
                      <div className="metric-item metric-likes">
                        <FaHeart />
                        <span>{subject.likes}</span>
                      </div>
                    </div>
                  </div>


                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- Premium Pagination --- */}
        {totalPages > 1 && (
          <div className="extreme-pagination">
            <button
              className="p-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              <FaChevronLeft />
            </button>

            <div className="p-numbers">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`p-num ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              className="p-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* --- Support Section --- */}
      <SupportSection />

      {/* --- Discussion Forum Section --- */}
      <div className="home-discussion-wrapper">
        <CommentSection />
      </div>



      {/* --- Support Modal --- */}
      <SupportModal isOpen={isPopupOpen} onClose={closePopup} />

      {/* --- Welcome Support Popup --- */}
      <AnimatePresence>
        {showWelcomePopup && (
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8, transition: { duration: 0.2 } }}
            className="support-popup-overlay"
          >
            <div className="support-popup-card">
              <div className="support-popup-glow"></div>
              <div className="popup-scanning-line"></div>
              
              {/* Decorative Corners */}
              <div className="corner-bracket tl"></div>
              <div className="corner-bracket tr"></div>
              <div className="corner-bracket bl"></div>
              <div className="corner-bracket br"></div>

              <div className="popup-status-bar">
                <span className="status-dot"></span>
                <span className="status-text">SYSTEM OPTIMAL // SECURE CONNECTION</span>
              </div>

              <button className="support-popup-close" onClick={closePopup}>
                <FaTimes />
              </button>

              <div className="popup-content-inner">
                <div className="popup-icon-wrap">
                  <FaCoffee className="floating-coffee" />
                  <div className="icon-pulse-ring"></div>
                </div>
                
                <h4>Support <span className="gradient-text">VTUNOTES</span></h4>
                <p>Fuel the mission. Help us keep this portal free and evolving for every student.</p>
                
                <button className="support-popup-btn" onClick={handleSupportClick}>
                  <span>Become a Legend</span>
                  <FaBolt className="bolt-energy" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;