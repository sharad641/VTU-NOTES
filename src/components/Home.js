import React from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineMagnifyingGlass, HiOutlineFire,
  HiOutlineClock, HiOutlineChevronRight, HiOutlineSparkles
} from 'react-icons/hi2';
import {
  FaRocket, FaShieldAlt, FaLightbulb, FaUserAstronaut,
  FaHeart, FaBolt, FaCrown, FaStar, FaChevronLeft, FaChevronRight,
  FaGraduationCap, FaLayerGroup, FaRobot, FaCalculator,
  FaTimes, FaCoffee, FaEye
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { database } from '../firebase';
import './Home.css';
import './SupportPopup.css';
import './CareerBanner.css';

import { subjectsData } from '../data/subjectsData';
import CommentSection from './CommentSection';
import SupportSection from './SupportSection';
import SupportModal from './SupportModal';
import AdSenseAd from './AdSenseAd';

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

        {/* --- Expert Career Guides Banner (Premium 3D Glass) --- */}
        <div className="career-banner-container">
            <Link to="/career-tools" className="career-banner-link">
              <motion.div
                whileHover={{ scale: 1.02, translateY: -5 }}
                whileTap={{ scale: 0.98 }}
                className="career-banner-modern"
              >
                {/* Background Glow Effects */}
                <div className="career-banner-glow career-banner-glow-top"></div>
                <div className="career-banner-glow career-banner-glow-bottom"></div>

                <div className="cb-content">
                   <div className="cb-badge">
                       <FaCrown className="cb-crown-icon" /> Premium Career Access
                   </div>

                   <h2 className="cb-heading">
                       Master the Future of <br/>
                       <span className="cb-heading-gradient">Engineering Tech.</span>
                   </h2>

                   <p className="cb-description">
                       Get high-fidelity roadmaps, salary insights, and step-by-step guides for the most high-paying domains in 2026.
                   </p>

                   {/* Tech Stack Pills */}
                   <div className="cb-tech-stack">
                       {[
                           { name: 'Artificial Intelligence', color: '#A855F7' },
                           { name: 'Cyber Security', color: '#10B981' },
                           { name: 'DevOps & Cloud', color: '#F59E0B' },
                           { name: 'Full Stack', color: '#38BDF8' }
                       ].map((tech, i) => (
                           <div key={i} className="cb-tech-pill">
                               <span className="cb-tech-dot" style={{ background: tech.color, boxShadow: `0 0 10px ${tech.color}` }}></span>
                               <span className="cb-tech-name">{tech.name}</span>
                           </div>
                       ))}
                   </div>

                   {/* Placement Tools (Quick Access) */}
                   <div className="cb-placement-tools">
                       <div className="cb-placement-label">
                           Placement Resources
                       </div>
                       <div className="cb-placement-grid">
                           {[
                               { name: 'Roadmap', link: '/placement-guide', icon: <FaGraduationCap /> },
                               { name: 'Stories', link: '/placement-stories', icon: <FaStar /> },
                               { name: 'Experience', link: '/share-experience', icon: <FaUserAstronaut /> }
                           ].map((tool, i) => (
                               <Link 
                                 to={tool.link} 
                                 key={i} 
                                 className="cb-tool-link"
                                 onClick={(e) => e.stopPropagation()}
                               >
                                   <span className="cb-tool-icon">{tool.icon}</span>
                                   <span className="cb-tool-name">{tool.name}</span>
                               </Link>
                           ))}
                       </div>
                   </div>

                   <motion.div 
                     className="cb-cta"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                   >
                       <span>START LEARNING</span>
                       <HiOutlineChevronRight />
                   </motion.div>
                </div>

                {/* 3D Visual Element (Right Side) */}
                <div className="cb-visual">
                    {/* Floating Icons */}
                    <motion.div 
                      animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                      className="cb-floating-card cb-floating-card-top"
                    >
                        <div className="cb-floating-icon cb-floating-icon-ai">
                          <FaRobot />
                        </div>
                        <div className="cb-floating-text">
                            <div className="cb-floating-label">Trending</div>
                            <div className="cb-floating-title">AI & ML Guide</div>
                        </div>
                    </motion.div>

                    <motion.div 
                      animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }} 
                      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                      className="cb-floating-card cb-floating-card-bottom"
                    >
                        <div className="cb-floating-icon cb-floating-icon-security">
                          <FaShieldAlt />
                        </div>
                        <div className="cb-floating-text">
                            <div className="cb-floating-label">High Pay</div>
                            <div className="cb-floating-title">Cyber Security</div>
                        </div>
                    </motion.div>

                    {/* Center Glow */}
                    <div className="cb-center-glow"></div>
                </div>

              </motion.div>
            </Link>
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
              <React.Fragment key={subject.id}>
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
              {/* Inject In-Feed Ad after every 5th item */}
              {(idx + 1) % 5 === 0 && (
                 <motion.div 
                   layout 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }} 
                   className="card-perspective-wrapper ad-card-home"
                   style={{ 
                     display: 'flex', 
                     alignItems: 'center', 
                     justifyContent: 'center',
                     minHeight: '280px',
                     background: 'rgba(255,255,255,0.02)',
                     borderRadius: '20px',
                     border: '1px solid rgba(255,255,255,0.1)'
                   }}
                 >
                    <AdSenseAd 
                       adClient="ca-pub-9499544849301534" 
                       adSlot="3936951010" 
                       adFormat="fluid"
                       style={{ display: 'block', width: '100%', minWidth: '250px' }}
                    />
                 </motion.div>
              )}
              </React.Fragment>
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