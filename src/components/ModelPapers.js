import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiMagnifyingGlass,
  HiAcademicCap,
  HiCalendar,
  HiFire,
  HiStar,
  HiDocumentText,
  HiArrowDownTray,
  HiEye,
  HiChevronRight,
  HiXMark,
  HiBookmark,
  HiOutlineBookmark,
  HiAdjustmentsHorizontal,
  HiInbox
} from 'react-icons/hi2';
import { FaFilePdf, FaBolt, FaLayerGroup } from 'react-icons/fa6';
import AdSenseAd from './AdSenseAd';
import CommentSection from './CommentSection';
import './ModelPapersModern.css'; // CHANGED: Modern Dark Theme

const papers = [
  {
    id: 1,
    title: 'Computer Networks',
    code: 'BCS502',
    category: 'core',
    semester: '5',
    year: '2024',
    modelPaperLink: 'https://drive.google.com/file/d/10ENVRIXIu0mJDN-9HfkDIyciEWItiXb6/preview',
    oldPaperLink: 'https://drive.google.com/file/d/17WdlxtTLAUE17KldQWdqiSPA3u4GWqMd/preview',
    solutionLink: 'https://drive.google.com/file/d/10ENVRIXIu0mJDN-9HfkDIyciEWItiXb6/preview',
    popularity: 'high',
  },
  {
    id: 27,
    title: 'BIG DATA ANALYTICS',
    code: 'BAD601',
    category: 'core',
    semester: '7',
    year: '2024',
    modelPaperLink: 'https://drive.google.com/file/d/1YyscUweUvfoV0BP0RQvrUREgv7mOpmAS/preview',
    oldPaperLink: 'https://drive.google.com/file/d/1YyscUweUvfoV0BP0RQvrUREgv7mOpmAS/preview',
    solutionLink: 'https://drive.google.com/file/d/1m9VH6NBghr7IWFk2v798RrMbLXeZQahf/preview',
    popularity: 'high',
  },
  {
    id: 2,
    title: 'Software Engineering and Project Management',
    code: 'BCS501',
    category: 'core',
    semester: '5',
    year: '2024',
    modelPaperLink: 'https://drive.google.com/file/d/1aHbJ6mj2m71hYtjnTt-ODAZXLnavDPF4/preview',
    oldPaperLink: 'https://drive.google.com/file/d/19ycoCUMX7u9EI9zwcCe0tkdShwTSIErC/preview',
    solutionLink: 'https://drive.google.com/file/d/1wiliZvzo0-Zc2E_UMZDhXuNa2mKgKjw5/preview',
    popularity: 'high',
  },
  {
    id: 3,
    title: 'Discrete Mathematical Structures',
    code: 'BCS405A',
    category: 'core',
    semester: '4',
    year: '2023',
    modelPaperLink: 'https://drive.google.com/file/d/1rFJKUntE4UNWRL1IMg2QjWzkVoeEFeuG/preview',
    oldPaperLink: 'https://drive.google.com/file/d/1rFJKUntE4UNWRL1IMg2QjWzkVoeEFeuG/preview',
    solutionLink: 'https://drive.google.com/file/d/1wiliZvzo0-Zc2E_UMZDhXuNa2mKgKjw5/preview',
    popularity: 'medium',
  },
  {
    id: 4,
    title: 'Database Management System',
    code: 'BCS403',
    category: 'core',
    semester: '4',
    year: '2023',
    modelPaperLink: 'https://drive.google.com/file/d/16Vzo3cbtNfTGpLS3Z8LNTDe2E7dx0Bgh/preview',
    oldPaperLink: 'https://drive.google.com/file/d/1cqwCLrwgW7Lj3e1P1ofUsz1IkMa7-WxK/preview',
    solutionLink: 'https://drive.google.com/file/d/1cqwCLrwgW7Lj3e1P1ofUsz1IkMa7-WxK/preview',
    popularity: 'high',
  },
  {
    id: 5,
    title: 'Machine Learning',
    code: 'BCS602',
    category: 'elective',
    semester: '6',
    year: '2024',
    modelPaperLink: 'https://drive.google.com/file/d/1cjG_nakCffLmtjD9n7Esa5f8ROqXhOR8/view',
    popularity: 'very-high',
  },
  {
    id: 6,
    title: 'Cloud Computing',
    code: 'BCS601',
    category: 'elective',
    semester: '6',
    year: '2024',
    modelPaperLink: 'https://drive.google.com/file/d/1fhIl9-oR8sCf_9zf0QD1m3mzoFrOPP7w/view',
    solutionLink: 'https://drive.google.com/file/d/181F2lTn_jMHgAm64ZjuEnI3FFLInfXdq/view',
    oldPaperLink: 'https://drive.google.com/file/d/1RM-0q01QYQFubdFR9fmGNlicFyRbeHl-/view',
    popularity: 'very-high',
  },
  {
    id: 7,
    title: 'Applied Physics',
    code: 'BPHYS102',
    category: 'basic_science',
    semester: '1',
    year: '2023',
    modelPaperLink: 'https://drive.google.com/file/d/1rZNOK4PUfRHIAQmKrBnVare0rsNDjQHk/preview',
    solutionLink: 'https://drive.google.com/file/d/1JYhf1gRdDphyZEijSf_tEIpCN0uyN1i7/preview',
    popularity: 'medium',
  },
  {
    id: 8,
    title: 'Mathematics-II',
    code: 'BMATS201',
    category: 'basic_science',
    semester: '2',
    year: '2023',
    modelPaperLink: 'https://drive.google.com/file/d/1vHxAXnHlBBglr-K3ZUAGqzwP5SC0qNki/preview',
    solutionLink: 'https://drive.google.com/file/d/1BXyhq4ZiTLbhpIwJHGkRYe60rbJQqQne/preview',
    oldPaperLink: 'https://drive.google.com/file/d/1cWG4jvZRZ2iBJA09t0WRW78dqw2vdm9x/preview',
    popularity: 'high',
  },
  {
    id: 9,
    title: 'Applied Chemistry for CSE stream',
    code: 'BCHES202',
    category: 'basic_science',
    semester: '2',
    year: '2023',
    modelPaperLink: 'https://drive.google.com/file/d/1HkhlDCYaNe8yPC5td-aCksjyMtz7hiLH/preview',
    solutionLink: 'https://drive.google.com/file/d/1Qsw-USW8fq6meVzpU74mYOIP7WwECOXb/preview',
    popularity: 'medium',
  },
  {
    id: 10,
    title: 'GRAPH THEORY',
    code: 'BCS5405B',
    category: 'core',
    semester: '5',
    year: '2024',
    modelPaperLink: 'https://drive.google.com/file/d/1Jdgxk2UiVeXb-TJJywapMucYhW_HLqj3/preview',
    solutionLink: 'https://drive.google.com/file/d/15m3xXKv-Os6JlQI6QvlTnBet7lI2ynCx/preview',
    popularity: 'medium',
  },
  {
    id: 11,
    title: 'INTEGRATED WASTE MANAGEMENT FOR A SMART CITY',
    code: 'BCV654C',
    category: 'elective',
    semester: '6',
    year: '2024',
    modelPaperLink: 'https://drive.google.com/file/d/1S6IqRQY87HsRhsqKC3CWsljih5zQoWt-/preview',
    popularity: 'low',
  },
  {
    id: 12,
    title: 'RENEWABLE ENERGY POWER PLANTS',
    code: 'BME654B',
    category: 'elective',
    semester: '6',
    year: '2024',
    modelPaperLink: 'https://drive.google.com/file/d/1Ny11P33Gx1VgtTPeBR2C-Pixd2OWuO7U/preview',
    popularity: 'low',
  },
  {
    id: 13,
    title: 'CLOUD COMPUTING AND SECURITY',
    code: 'BIS613D',
    category: 'elective',
    semester: '6',
    year: '2024',
    modelPaperLink: 'https://drive.google.com/file/d/1fhIl9-oR8sCf_9zf0QD1m3mzoFrOPP7w/view?usp=drive_link',
    popularity: 'high',
  },
  {
    id: 14,
    title: 'WATER CONSERVATION AND RAIN WATER HARVESTING',
    code: 'BCV654A',
    category: 'elective',
    semester: '6',
    year: '2024',
    modelPaperLink: 'https://drive.google.com/file/d/1bOrd1-U9omf_IH3ZS5gWPceSfP01O4a8/preview',
    popularity: 'low',
  },
  {
    id: 15,
    title: 'Microcontroller',
    code: 'BCS402',
    category: 'core',
    semester: '4',
    year: '2023',
    modelPaperLink: 'https://drive.google.com/file/d/1bFd7GbQA6GycngDouhlvhnjNAoPW6t6q/view?usp=drive_link',
    popularity: 'high',
  },
  {
    id: 16,
    title: 'Principles of Programming Using C',
    code: 'BPOPS103',
    category: 'programming',
    semester: '1',
    year: '2023',
    modelPaperLink: 'https://drive.google.com/file/d/1XbWC-4lhCglAe2uNps_S0yJtRjx8JKY8/preview',
    popularity: 'high',
  },
  {
    id: 17,
    title: 'Introduction to Python Programming',
    code: 'BPLCK205B',
    category: 'programming',
    semester: '2',
    year: '2023',
    modelPaperLink: 'https://drive.google.com/file/d/1XIvt4xN6tEo34CYD1kpn2OWrgRy0zdEo/preview',
    solutionLink: 'https://drive.google.com/file/d/12PN6-yofvVSVi3xgnbsTc2mhzuWRt4gS/preview',
    popularity: 'high',
  },
  {
    id: 18,
    title: 'Introduction to Electrical Engineering',
    code: 'BESCK104B',
    category: 'basic_science',
    semester: '1',
    year: '2023',
    modelPaperLink: 'https://drive.google.com/file/d/1xm1BU-8LUzSmpWSc30vJNtRvTeqQcYS2/preview',
    popularity: 'medium',
  },
  {
    id: 19,
    title: 'MATHEMATICS FOR CS ENGINEERING STREAM',
    code: 'BCS301',
    category: 'basic_science',
    semester: '3',
    year: '2023',
    modelPaperLink: 'https://drive.google.com/file/d/1yWlFPiwEkizdCX-nfOJhg4j571naHRh9/preview',
    solutionLink: 'https://drive.google.com/file/d/1__LR4Vo4wqsQYd8IbIixnxFOM85AmAY-/preview',
    popularity: 'high',
  },
  {
    id: 20,
    title: 'Operating System',
    code: 'BCS303',
    category: 'core',
    semester: '3',
    year: '2023',
    modelPaperLink: 'https://drive.google.com/file/d/1YXVbpdqeVKm4Hozh7lLH7mFS8NkLWz_k/preview',
    popularity: 'high',
  },
  {
    id: 21,
    title: 'Data Structures and Applications',
    code: 'BCS304',
    category: 'core',
    semester: '3',
    year: '2023',
    modelPaperLink: 'https://drive.google.com/file/d/1inTZ9YeyPBbXGvKJDtbxGvEMPTgVYSml/preview',
    solutionLink: 'https://drive.google.com/file/d/1oqqZKNvDkFMtU5210eS_Q-LFEepR_bfr/preview',
    popularity: 'very-high',
  },
  {
    id: 22,
    title: 'Object Oriented Programming with JAVA',
    code: 'BCS306A',
    category: 'programming',
    semester: '3',
    year: '2023',
    modelPaperLink: 'https://drive.google.com/file/d/1LLY2jEI-KnI6M5wacApA_KW-SViB0pIs/preview',
    solutionLink: 'https://drive.google.com/file/d/1g4x5sDmgyLnsC0kkWPhGuy1BNcJnF5Sd/preview',
    popularity: 'very-high',
  },
  {
    id: 23,
    title: 'DISCRETE MATHEMATICAL STRUCTURES (BCS405A)',
    code: 'BCS405A',
    category: 'core',
    semester: '4',
    year: '2023',
    modelPaperLink: 'https://drive.google.com/file/d/1cOOJv05d1Dl_7pL7ANCMxXTuvUziD9ai/preview',
    solutionLink: 'https://drive.google.com/file/d/1iuXEzjqn6yqNc3AnkBMEyQN1M3qb0JYs/preview',
    popularity: 'medium',
  },
  {
    id: 24,
    title: 'Biology for Engineering',
    code: 'BBOC407',
    category: 'basic_science',
    semester: '4',
    year: '2023',
    modelPaperLink: 'https://drive.google.com/file/d/1qRg6fD6doTfw9h51suNe5fbjuWgeECQO/preview',
    solutionLink: 'https://drive.google.com/file/d/1h_udrhNRqd0UiwdM8bVeH_PTXyWsVcKB/preview',
    popularity: 'low',
  },
  {
    id: 25,
    title: 'Applied Physics for CSE stream',
    code: 'BPHYS102',
    category: 'basic_science',
    semester: '1',
    year: '2023',
    modelPaperLink: 'https://drive.google.com/file/d/1Qsw-USW8fq6meVzpU74mYOIP7WwECOXb/preview',
    popularity: 'medium',
  },
  {
    id: 26,
    title: 'Theory of Computation',
    code: 'BCS503',
    category: 'core',
    semester: '5',
    year: '2024',
    modelPaperLink: 'https://drive.google.com/file/d/1YBiqED7uRBVSs3yFOpUi4Lpqx9EAOKZ5/preview',
    popularity: 'high',
  }
];

const categories = [
  { id: 'all', label: 'All Papers', icon: <HiInbox />, color: '#8B5CF6' },
  { id: 'core', label: 'Core Subjects', icon: <HiAcademicCap />, color: '#3B82F6' },
  { id: 'elective', label: 'Electives', icon: <HiStar />, color: '#10B981' },
  { id: 'basic_science', label: 'Basic Sciences', icon: <FaLayerGroup />, color: '#F59E0B' },
  { id: 'programming', label: 'Programming', icon: <HiDocumentText />, color: '#EC4899' }
];

const semesters = [
  { id: 'all', label: 'All Sems', icon: '📅' },
  { id: '1', label: 'Sem 1', icon: '1️⃣' },
  { id: '2', label: 'Sem 2', icon: '2️⃣' },
  { id: '3', label: 'Sem 3', icon: '3️⃣' },
  { id: '4', label: 'Sem 4', icon: '4️⃣' },
  { id: '5', label: 'Sem 5', icon: '5️⃣' },
  { id: '6', label: 'Sem 6', icon: '6️⃣' },
];

const ModelPapers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedSemester, setSelectedSemester] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('alphabetical');
  const [filteredPapers, setFilteredPapers] = React.useState(papers);
  const [isDarkMode, setIsDarkMode] = React.useState(() => localStorage.getItem("theme") === "dark");
  const [bookmarkedPapers, setBookmarkedPapers] = React.useState(() => JSON.parse(localStorage.getItem('paperBookmarks') || '[]'));
  const [showBookmarks, setShowBookmarks] = React.useState(false);
  const [selectedPaper, setSelectedPaper] = React.useState(null);

  React.useEffect(() => {
    let result = [...papers];
    if (searchTerm) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'all') result = result.filter(p => p.category === selectedCategory);
    if (selectedSemester !== 'all') result = result.filter(p => p.semester === selectedSemester);

    result.sort((a, b) => {
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      if (sortBy === 'newest') return parseInt(b.year) - parseInt(a.year);
      if (sortBy === 'semester') return parseInt(a.semester) - parseInt(b.semester);
      if (sortBy === 'popularity') {
        const order = { 'very-high': 4, 'high': 3, 'medium': 2, 'low': 1 };
        return (order[b.popularity] || 0) - (order[a.popularity] || 0);
      }
      return 0;
    });
    setFilteredPapers(result);
  }, [searchTerm, selectedCategory, selectedSemester, sortBy]);

  React.useEffect(() => {
    localStorage.setItem('paperBookmarks', JSON.stringify(bookmarkedPapers));
  }, [bookmarkedPapers]);

  const handleOpenHub = (paper, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log("Opening Hub for:", paper.title);
    setSelectedPaper(paper);
  };

  const handleCloseHub = (e) => {
    if (e) e.stopPropagation();
    setSelectedPaper(null);
  };

  const toggleBookmark = (id) => {
    setBookmarkedPapers(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const getDownloadLink = (url) => {
    if (!url) return null;
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? `https://drive.google.com/uc?export=download&id=${match[1]}` : url;
  };

  return (
    <div className={`papers-portal-root ${isDarkMode ? 'dark' : 'light'}`}>
      {/* --- Floating Background Elements --- */}
      <div className="papers-background-shapes">
        <div className="shape s1"></div>
        <div className="shape s2"></div>
        <div className="geo-shape hexagon geo-1"></div>
        <div className="geo-shape triangle geo-2"></div>
        <div className="geo-shape hexagon geo-3"></div>
        <div className="geo-shape triangle geo-4"></div>
      </div>

      <div className="papers-hero-layer">
        <div className="portal-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="papers-hero-card"
          >
            <div className="hero-mesh-bg"></div>
            <div className="hero-brand">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="brand-glow"
              ></motion.div>
              <motion.h1 layout>
                Model Papers <span className="version-tag">3.0</span>
              </motion.h1>
              <p className="hero-p">Experience the future of VTU resource accessibility.</p>
            </div>

            <div className="hero-stats-island">
              <div className="hero-stat">
                <span className="stat-value">{papers.length}</span>
                <span className="stat-tag">Cataloged</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="stat-value">{bookmarkedPapers.length}</span>
                <span className="stat-tag">Saved</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="papers-main-content portal-container">
        {/* -- Futuristic Island Control Bar -- */}
        <div className="papers-island-controls glass-noise">
          <div className="search-pill">
            <HiMagnifyingGlass className="search-icon-act" />
            <input
              type="text"
              placeholder="System Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && <HiXMark className="clear-icon" onClick={() => setSearchTerm('')} />}
          </div>

          <div className="filter-pill-group">
            <div className="sort-pill">
              <HiAdjustmentsHorizontal />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="alphabetical">Name</option>
                <option value="newest">Recent</option>
                <option value="semester">Sem</option>
                <option value="popularity">Hot</option>
              </select>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`bookmark-toggle-pill ${showBookmarks ? 'active' : ''}`}
              onClick={() => setShowBookmarks(!showBookmarks)}
            >
              <HiStar />
            </motion.button>
          </div>
        </div>

        {/* -- Category Scroller -- */}
        <div className="category-scroller">
          <div className="scroller-inner">
            {categories.map(cat => (
              <motion.button
                key={cat.id}
                whileHover={{ y: -2 }}
                className={`cat-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <div className="cat-icon-frame">{cat.icon}</div>
                <span>{cat.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* -- Semester Grid -- */}
        <div className="sem-pill-grid">
          {semesters.map(sem => (
            <motion.button
              key={sem.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`sem-pill ${selectedSemester === sem.id ? 'active' : ''}`}
              onClick={() => setSelectedSemester(sem.id)}
            >
              {sem.label}
            </motion.button>
          ))}
        </div>

        {/* -- Papers Grid with 3D Tilt Effect Look -- */}
        <motion.div layout className="papers-high-grid">
          <AnimatePresence mode='popLayout'>
            {(showBookmarks ? papers.filter(p => bookmarkedPapers.includes(p.id)) : filteredPapers).map((paper, idx) => (
              <React.Fragment key={paper.id}>
              <motion.div
                layout
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                whileHover={{ y: -8, perspective: 1000 }}
                className={`paper-high-card ${paper.popularity === 'very-high' ? 'is-hot-glow' : ''}`}
              >
                <div className="card-glass-noise"></div>
                <div className="paper-card-top">
                  <div className={`paper-type-tag ${paper.category}`}>{paper.category.replace('_', ' ')}</div>
                  <motion.button
                    whileTap={{ scale: 1.5 }}
                    onClick={() => toggleBookmark(paper.id)}
                    className={`paper-save-btn ${bookmarkedPapers.includes(paper.id) ? 'saved' : ''}`}
                  >
                    {bookmarkedPapers.includes(paper.id) ? <HiBookmark /> : <HiOutlineBookmark />}
                  </motion.button>
                </div>

                <div className="paper-card-body">
                  <div className="paper-id-vibe">{paper.code}</div>
                  <h3>{paper.title}</h3>
                  <div className="paper-meta-row">
                    <span className="meta-item"><HiAcademicCap /> Sem {paper.semester}</span>
                    <span className="meta-item"><HiCalendar /> {paper.year}</span>
                    {paper.popularity === 'very-high' && <span className="meta-hot"><div className="hot-pulse"></div> HOT</span>}
                  </div>
                </div>

                <div className="paper-card-footer">
                  <button className="paper-prime-btn view" onClick={(e) => handleOpenHub(paper, e)}>
                    <HiEye /> <span>Open Hub</span>
                  </button>
                  <a href={getDownloadLink(paper.modelPaperLink || paper.oldPaperLink)} download className="paper-prime-btn download" onClick={(e) => e.stopPropagation()}>
                    <HiArrowDownTray />
                  </a>
                </div>
              </motion.div>
              {/* Inject In-Feed Ad after every 6th item */}
              {(idx + 1) % 6 === 0 && (
                 <motion.div 
                   layout 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }} 
                   className="paper-high-card ad-card-container"
                   style={{ 
                     display: 'flex', 
                     alignItems: 'center', 
                     justifyContent: 'center',
                     background: 'rgba(255,255,255,0.02)',
                     border: '1px border rgba(255,255,255,0.1)'
                   }}
                 >
                    <AdSenseAd 
                       adClient="ca-pub-9499544849301534" 
                       adSlot="3936951010" 
                       adFormat="fluid"
                       style={{ display: 'block', minWidth: '250px' }}
                    />
                 </motion.div>
              )}
              </React.Fragment>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPapers.length === 0 && (
          <div className="papers-empty-state">
            <HiInbox className="empty-icon" />
            <h3 className="empty-h">System Empty</h3>
            <p className="empty-p">No resources detected for this query.</p>
            <button className="reset-btn-vibe" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedSemester('all'); }}>Re-initialize</button>
          </div>
        )}
      </div>

      {!showBookmarks && filteredPapers.length > 0 && (
        <div className="papers-premium-footer portal-container">
          <div className="trending-barrier">
            <div className="barrier-line"></div>
            <span>LIVE TRAFFIC</span>
            <div className="barrier-line"></div>
          </div>
          <div className="trending-scroller">
            {papers.filter(p => p.popularity === 'very-high').slice(0, 4).map(p => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={p.id}
                className="trending-mini-card"
                onClick={() => setSelectedPaper(p)}
              >
                <div className="mini-icon"><FaBolt /></div>
                <div className="mini-info">
                  <h4>{p.title}</h4>
                  <span>{p.code}</span>
                </div>
                <HiChevronRight className="mini-arrow" />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="portal-footer-ad portal-container">
        <AdSenseAd adClient="ca-pub-9499544849301534" adSlot="7579321744" adFormat="auto" fullWidthResponsive={true} />
        <CommentSection />
      </div>

      {/* --- High-Fidelity Glass Drawer --- */}
      <AnimatePresence>
        {selectedPaper && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseHub}
              className="paper-drawer-overlay"
            />
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="paper-glass-drawer"
            >
              <div className="drawer-header">
                <button className="close-drawer" onClick={handleCloseHub}><HiXMark /></button>
                <div className="drawer-badges">
                  <span className="badge-sem">Semester {selectedPaper.semester}</span>
                  <span className="badge-year">{selectedPaper.year}</span>
                </div>
              </div>

              <div className="drawer-content">
                <div className="content-brand">
                  <div className="brand-icon"><FaFilePdf /></div>
                  <span className="brand-code">{selectedPaper.code}</span>
                </div>
                <h2>{selectedPaper.title}</h2>
                <p>Access the official VTU model papers and verified solutions for this subject.</p>

                <div className="resource-stack">
                  <button className="stack-item prime" onClick={() => navigate(`/pdf/${encodeURIComponent(selectedPaper.modelPaperLink)}`)}>
                    <div className="item-info">
                      <h4>Model Paper</h4>
                      <span>Preview Official Paper</span>
                    </div>
                    <HiEye />
                  </button>
                  {selectedPaper.solutionLink && (
                    <button className="stack-item" onClick={() => navigate(`/pdf/${encodeURIComponent(selectedPaper.solutionLink)}`)}>
                      <div className="item-info">
                        <h4>Solutions</h4>
                        <span>Verified Answers</span>
                      </div>
                      <HiStar />
                    </button>
                  )}
                  {selectedPaper.oldPaperLink && (
                    <button className="stack-item" onClick={() => navigate(`/pdf/${encodeURIComponent(selectedPaper.oldPaperLink)}`)}>
                      <div className="item-info">
                        <h4>Old Exam Paper</h4>
                        <span>Previous Session</span>
                      </div>
                      <HiCalendar />
                    </button>
                  )}
                </div>

                <div className="drawer-actions">
                  <a href={getDownloadLink(selectedPaper.modelPaperLink)} download className="drawer-download-btn">
                    <HiArrowDownTray /> <span>Secure Download</span>
                  </a>
                </div>
              </div>

              <div className="drawer-footer">
                <p>Files are served via secure cloud infrastructure.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModelPapers;