import React, { useState, useEffect, useRef } from 'react';
import './ModelPapers.css';

const papers = [
  // Existing papers (1-8)
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
  
  // New papers added (9-25)
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
    // 关联的解答样本
    relatedSolutions: [
      {
        title: "BCS503 MQP SOLUTION SAMPLE 1 (Comprehensive notes for Module 5)",
        previewUrl: "https://drive.google.com/file/d/1OfbbBXT1eYl-mAruZYJZzNiRotujQe5E/preview",
      },
      {
        title: "BCS503 MQP 1 SOLUTION SAMPLE 1",
        previewUrl: "https://drive.google.com/file/d/1FrvIgJ-jQjWZ0ECR0zSP0e1JizJaAWXE/preview",
      },
      {
        title: "BCS503 MQP 2 SOLUTION SAMPLE 1",
        previewUrl: "https://drive.google.com/file/d/1uo_V8O6catQ2rKKqEmHYPL4TMcvr8Yf9/preview",
      },
    ],
    popularity: 'high',
  }
];

const categories = [
  { id: 'all', label: 'All Papers', icon: '📚', color: '#8B5CF6' },
  { id: 'core', label: 'Core Subjects', icon: '💻', color: '#3B82F6' },
  { id: 'elective', label: 'Electives', icon: '🎯', color: '#10B981' },
  { id: 'basic_science', label: 'Basic Sciences', icon: '🔬', color: '#F59E0B' },
  { id: 'programming', label: 'Programming', icon: '💾', color: '#EC4899' }
];

const semesters = [
  { id: 'all', label: 'All Semesters', icon: '📅' },
  { id: '1', label: 'Semester 1', icon: '1️⃣' },
  { id: '2', label: 'Semester 2', icon: '2️⃣' },
  { id: '3', label: 'Semester 3', icon: '3️⃣' },
  { id: '4', label: 'Semester 4', icon: '4️⃣' },
  { id: '5', label: 'Semester 5', icon: '5️⃣' },
  { id: '6', label: 'Semester 6', icon: '6️⃣' },
];

const ModelPapers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [sortBy, setSortBy] = useState('alphabetical');
  const [filteredPapers, setFilteredPapers] = useState(papers);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [viewMode, setViewMode] = useState('view');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarkedPapers, setBookmarkedPapers] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [modalView, setModalView] = useState('resources'); // 'resources' or 'preview'
  const searchRef = useRef(null);
  const modalRef = useRef(null);

  // Initialize bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('paperBookmarks');
    if (savedBookmarks) {
      setBookmarkedPapers(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('paperBookmarks', JSON.stringify(bookmarkedPapers));
  }, [bookmarkedPapers]);

  // Filter papers
  useEffect(() => {
    let result = papers;

    if (searchTerm) {
      result = result.filter(
        paper =>
          paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paper.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(paper => paper.category === selectedCategory);
    }

    if (selectedSemester !== 'all') {
      result = result.filter(paper => paper.semester === selectedSemester);
    }

    switch (sortBy) {
      case 'alphabetical':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'semester':
        result.sort((a, b) => a.semester - b.semester);
        break;
      case 'popularity':
        const popularityOrder = { 'very-high': 4, 'high': 3, 'medium': 2, 'low': 1 };
        result.sort((a, b) => (popularityOrder[b.popularity] || 0) - (popularityOrder[a.popularity] || 0));
        break;
      default:
        break;
    }

    setFilteredPapers(result);
  }, [searchTerm, selectedCategory, selectedSemester, sortBy]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setSelectedPaper(null);
    };
    if (selectedPaper) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [selectedPaper]);

  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const toggleBookmark = (paperId) => {
    setBookmarkedPapers(prev => {
      if (prev.includes(paperId)) {
        showNotificationMessage('Paper removed from bookmarks');
        return prev.filter(id => id !== paperId);
      } else {
        showNotificationMessage('Paper added to bookmarks');
        return [...prev, paperId];
      }
    });
  };

  const getViewLink = (link) => {
    if (!link) return null;
    if (link.includes('drive.google.com')) {
      if (link.includes('/view')) return link.replace('/view', '/preview');
      if (link.includes('/preview')) return link;
      if (link.includes('/view?usp=drive_link')) return link.replace('/view?usp=drive_link', '/preview');
    }
    return link;
  };

  const getDownloadLink = (link) => {
    if (!link) return null;
    if (link.includes('drive.google.com')) {
      return link.replace('/preview', '/view?usp=sharing').replace('/view?usp=drive_link', '/view?usp=sharing');
    }
    return link;
  };

  const getPopularityIcon = (popularity) => {
    switch(popularity) {
      case 'very-high': return '🔥';
      case 'high': return '⭐';
      case 'medium': return '📈';
      default: return '📄';
    }
  };

  const handleQuickFilter = (category, semester) => {
    setSelectedCategory(category);
    setSelectedSemester(semester);
    searchRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const PaperCard = ({ paper }) => {
    const isBookmarked = bookmarkedPapers.includes(paper.id);
    
    return (
      <div className="paper-card" data-category={paper.category}>
        <div className="paper-card-gradient"></div>
        <div className="paper-card-content">
          <div className="paper-card-header">
            <div className="paper-meta">
              <span className="paper-badge semester">Sem {paper.semester}</span>
              <span className="paper-badge year">{paper.year}</span>
              <span className="paper-popularity">
                {getPopularityIcon(paper.popularity)}
              </span>
            </div>
            <button 
              className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(paper.id);
              }}
            >
              {isBookmarked ? '★' : '☆'}
            </button>
          </div>
          
          <h3 onClick={() => setSelectedPaper(paper)}>
            {paper.title}
          </h3>
          
          <div className="paper-code" onClick={() => setSelectedPaper(paper)}>
            <span className="code-icon">📘</span>
            {paper.code}
          </div>
          
          <div className="paper-resources">
            {paper.modelPaperLink && <span className="resource-badge">📄 Paper</span>}
            {paper.solutionLink && <span className="resource-badge">✅ Solution</span>}
            {paper.oldPaperLink && <span className="resource-badge">📜 Old</span>}
            {paper.relatedSolutions && <span className="resource-badge">📚 Samples</span>}
          </div>
          
          <div className="paper-actions">
            <button 
              className="action-btn view-btn"
              onClick={() => {
                setSelectedPaper(paper);
                setViewMode('view');
                setModalView('resources');
              }}
            >
              👁️ View
            </button>
            <button 
              className="action-btn download-btn"
              onClick={() => {
                window.open(getDownloadLink(paper.modelPaperLink || paper.solutionLink || paper.oldPaperLink), '_blank');
              }}
            >
              ⬇️ Download
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`model-papers-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Header with Theme Toggle */}
      <div className="main-header">
        <div className="header-content">
          <div className="header-main">
            <div className="logo-section">
              <div className="logo">
                <span className="logo-icon">📚</span>
                <h1>PaperHub</h1>
              </div>
              <p className="tagline">Your Gateway to Academic Excellence</p>
            </div>
            
            <div className="header-controls">
              <button 
                className="theme-toggle"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
              <button 
                className={`bookmarks-toggle ${showBookmarks ? 'active' : ''}`}
                onClick={() => setShowBookmarks(!showBookmarks)}
              >
                {showBookmarks ? '📖 All Papers' : '⭐ Bookmarks'}
              </button>
            </div>
          </div>
          
          <p className="header-description">
            Access premium collection of model question papers, solutions, and previous year papers.
            Smart search, instant preview, and organized by semester & category.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <div className="stat-number">{papers.length}</div>
            <div className="stat-label">Total Papers</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <div className="stat-number">{bookmarkedPapers.length}</div>
            <div className="stat-label">Bookmarked</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <div className="stat-number">{categories.length - 1}</div>
            <div className="stat-label">Categories</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <div className="stat-number">6</div>
            <div className="stat-label">Semesters</div>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="quick-filters">
        <h3>⚡ Quick Access</h3>
        <div className="quick-buttons">
          <button 
            className="quick-btn"
            onClick={() => handleQuickFilter('core', '5')}
          >
            💻 5th Sem Core
          </button>
          <button 
            className="quick-btn"
            onClick={() => handleQuickFilter('elective', '6')}
          >
            🎯 6th Sem Electives
          </button>
          <button 
            className="quick-btn"
            onClick={() => handleQuickFilter('basic_science', 'all')}
          >
            🔬 Basic Sciences
          </button>
          <button 
            className="quick-btn"
            onClick={() => setShowBookmarks(true)}
          >
            ⭐ My Bookmarks
          </button>
        </div>
      </div>

      {/* Main Controls */}
      <div className="main-controls" ref={searchRef}>
        <div className="search-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search papers by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>
                ✕
              </button>
            )}
          </div>
          
          <div className="mode-toggle">
            <div className="toggle-switch">
              <button 
                className={`toggle-option ${viewMode === 'view' ? 'active' : ''}`}
                onClick={() => setViewMode('view')}
              >
                <span className="toggle-icon">👁️</span>
                <span className="toggle-label">View Mode</span>
              </button>
              <button 
                className={`toggle-option ${viewMode === 'download' ? 'active' : ''}`}
                onClick={() => setViewMode('download')}
              >
                <span className="toggle-icon">⬇️</span>
                <span className="toggle-label">Download Mode</span>
              </button>
            </div>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-group">
            <div className="filter-label">📁 Category</div>
            <div className="category-chips">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{ '--category-color': cat.color }}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-label">📅 Semester</div>
            <div className="semester-grid">
              {semesters.map(sem => (
                <button
                  key={sem.id}
                  className={`semester-chip ${selectedSemester === sem.id ? 'active' : ''}`}
                  onClick={() => setSelectedSemester(sem.id)}
                >
                  {sem.icon} {sem.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-label">🔀 Sort</div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="alphabetical">A → Z Alphabetical</option>
              <option value="newest">🆕 Newest First</option>
              <option value="semester">📚 By Semester</option>
              <option value="popularity">🔥 By Popularity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Papers Display */}
      <div className="results-header">
        <h2>
          {showBookmarks ? '⭐ My Bookmarked Papers' : '📄 Available Papers'}
          <span className="results-count">{filteredPapers.length} papers</span>
        </h2>
        <div className="view-mode-indicator">
          <span className="mode-badge">
            {viewMode === 'view' ? '👁️ View Mode' : '⬇️ Download Mode'}
          </span>
        </div>
      </div>

      {filteredPapers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No papers found</h3>
          <p>Try adjusting your search criteria or browse all papers</p>
          <button 
            className="reset-btn"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedSemester('all');
              setShowBookmarks(false);
            }}
          >
            🔄 Show All Papers
          </button>
        </div>
      ) : (
        <div className="papers-grid">
          {(showBookmarks ? papers.filter(p => bookmarkedPapers.includes(p.id)) : filteredPapers)
            .map(paper => (
              <PaperCard key={paper.id} paper={paper} />
            ))
          }
        </div>
      )}

      {/* Featured Papers */}
      {!showBookmarks && filteredPapers.length > 0 && (
        <div className="featured-section">
          <h3>🔥 Most Popular Papers</h3>
          <div className="featured-grid">
            {papers
              .filter(p => p.popularity === 'very-high')
              .slice(0, 3)
              .map(paper => (
                <div key={paper.id} className="featured-card">
                  <div className="featured-badge">🔥 Popular</div>
                  <h4>{paper.title}</h4>
                  <div className="featured-code">{paper.code}</div>
                  <button 
                    className="featured-btn"
                    onClick={() => setSelectedPaper(paper)}
                  >
                    Access Now →
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* Modern Paper Details Modal */}
      {selectedPaper && (
        <div className="modern-modal-overlay" onClick={() => setSelectedPaper(null)}>
          <div className="modern-modal" onClick={e => e.stopPropagation()} ref={modalRef}>
            {/* Modal Header */}
            <div className="modern-modal-header">
              <div className="modal-header-content">
                <div className="modal-title-group">
                  <div className="modal-main-title">
                    <h2>{selectedPaper.title}</h2>
                    <div className="title-actions">
                      <span className="modal-code-badge">{selectedPaper.code}</span>
                      <button 
                        className={`modal-bookmark-btn ${bookmarkedPapers.includes(selectedPaper.id) ? 'bookmarked' : ''}`}
                        onClick={() => toggleBookmark(selectedPaper.id)}
                        title={bookmarkedPapers.includes(selectedPaper.id) ? 'Remove bookmark' : 'Add bookmark'}
                      >
                        {bookmarkedPapers.includes(selectedPaper.id) ? '★' : '☆'}
                      </button>
                    </div>
                  </div>
                  <div className="modal-sub-info">
                    <span className="modal-info-item">
                      <span className="info-icon">📅</span>
                      Sem {selectedPaper.semester} • {selectedPaper.year}
                    </span>
                    <span className="modal-info-item">
                      <span className="info-icon">{getPopularityIcon(selectedPaper.popularity)}</span>
                      {selectedPaper.popularity.replace('-', ' ')}
                    </span>
                    <span className="modal-info-item">
                      <span className="info-icon">
                        {selectedPaper.category === 'core' ? '💻' : 
                         selectedPaper.category === 'elective' ? '🎯' : 
                         selectedPaper.category === 'programming' ? '💾' : '🔬'}
                      </span>
                      {selectedPaper.category.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <button 
                  className="modern-modal-close"
                  onClick={() => setSelectedPaper(null)}
                  aria-label="Close modal"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Tabs */}
            <div className="modal-tabs">
              <button 
                className={`modal-tab ${modalView === 'resources' ? 'active' : ''}`}
                onClick={() => setModalView('resources')}
              >
                <span className="tab-icon">📚</span>
                <span className="tab-label">Resources</span>
              </button>
              <button 
                className={`modal-tab ${modalView === 'preview' ? 'active' : ''}`}
                onClick={() => setModalView('preview')}
              >
                <span className="tab-icon">👁️</span>
                <span className="tab-label">Preview</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="modern-modal-content">
              {/* Resources View */}
              {modalView === 'resources' && (
                <div className="resources-view">
                  <div className="mode-selector-section">
                    <div className="mode-selector">
                      <div className="mode-header">
                        <h4>Access Mode</h4>
                        <span className="mode-hint">Choose how to access the paper</span>
                      </div>
                      <div className="mode-options-grid">
                        <button 
                          className={`mode-option-card ${viewMode === 'view' ? 'active' : ''}`}
                          onClick={() => setViewMode('view')}
                        >
                          <div className="mode-option-icon">👁️</div>
                          <div className="mode-option-content">
                            <div className="mode-option-title">View Online</div>
                            <div className="mode-option-desc">Preview in browser instantly</div>
                          </div>
                          {viewMode === 'view' && <div className="active-indicator"></div>}
                        </button>
                        <button 
                          className={`mode-option-card ${viewMode === 'download' ? 'active' : ''}`}
                          onClick={() => setViewMode('download')}
                        >
                          <div className="mode-option-icon">⬇️</div>
                          <div className="mode-option-content">
                            <div className="mode-option-title">Download</div>
                            <div className="mode-option-desc">Save for offline use</div>
                          </div>
                          {viewMode === 'download' && <div className="active-indicator"></div>}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="resources-grid-modern">
                    <h4>Available Resources</h4>
                    <div className="resources-cards-container">
                      {selectedPaper.modelPaperLink && (
                        <a
                          href={viewMode === 'view' ? getViewLink(selectedPaper.modelPaperLink) : getDownloadLink(selectedPaper.modelPaperLink)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="resource-card-modern primary"
                        >
                          <div className="resource-card-icon">
                            <span>📄</span>
                          </div>
                          <div className="resource-card-content">
                            <div className="resource-card-title">Model Question Paper</div>
                            <div className="resource-card-desc">Latest pattern & syllabus based</div>
                            <div className="resource-card-meta">Primary Resource</div>
                          </div>
                          <div className="resource-card-action">
                            <span className="action-text">
                              {viewMode === 'view' ? 'View Paper →' : 'Download →'}
                            </span>
                          </div>
                        </a>
                      )}
                      
                      {selectedPaper.solutionLink && (
                        <a
                          href={viewMode === 'view' ? getViewLink(selectedPaper.solutionLink) : getDownloadLink(selectedPaper.solutionLink)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="resource-card-modern success"
                        >
                          <div className="resource-card-icon">
                            <span>✅</span>
                          </div>
                          <div className="resource-card-content">
                            <div className="resource-card-title">Solutions & Answer Key</div>
                            <div className="resource-card-desc">Detailed step-by-step solutions</div>
                            <div className="resource-card-meta">Verified Answers</div>
                          </div>
                          <div className="resource-card-action">
                            <span className="action-text">
                              {viewMode === 'view' ? 'View Solutions →' : 'Download →'}
                            </span>
                          </div>
                        </a>
                      )}
                      
                      {selectedPaper.oldPaperLink && (
                        <a
                          href={viewMode === 'view' ? getViewLink(selectedPaper.oldPaperLink) : getDownloadLink(selectedPaper.oldPaperLink)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="resource-card-modern warning"
                        >
                          <div className="resource-card-icon">
                            <span>📜</span>
                          </div>
                          <div className="resource-card-content">
                            <div className="resource-card-title">Previous Year Papers</div>
                            <div className="resource-card-desc">Past examination papers</div>
                            <div className="resource-card-meta">Practice Material</div>
                          </div>
                          <div className="resource-card-action">
                            <span className="action-text">
                              {viewMode === 'view' ? 'View Papers →' : 'Download →'}
                            </span>
                          </div>
                        </a>
                      )}
                      
                      {/* Related Solutions for BCS503 */}
                      {selectedPaper.relatedSolutions && selectedPaper.relatedSolutions.length > 0 && (
                        <div className="related-solutions-section">
                          <div className="section-header">
                            <span className="section-icon">📚</span>
                            <h5>Related Solution Samples</h5>
                          </div>
                          <div className="related-solutions-grid">
                            {selectedPaper.relatedSolutions.map((solution, index) => (
                              <a
                                key={index}
                                href={viewMode === 'view' ? getViewLink(solution.previewUrl) : getDownloadLink(solution.previewUrl)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="solution-sample-card"
                              >
                                <div className="solution-sample-header">
                                  <span className="solution-icon">📝</span>
                                  <span className="solution-index">Sample {index + 1}</span>
                                </div>
                                <div className="solution-sample-title">
                                  {solution.title}
                                </div>
                                <div className="solution-sample-action">
                                  {viewMode === 'view' ? 'View →' : 'Download →'}
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="study-tips-modern">
                    <div className="study-tips-header">
                      <span className="tips-icon">💡</span>
                      <h5>Smart Study Tips</h5>
                    </div>
                    <div className="tips-content">
                      <p>
                        Start with the model paper to understand the current pattern, then check solutions for better understanding. 
                        Finally, practice with old papers under timed conditions to improve speed and accuracy.
                        {selectedPaper.relatedSolutions && 
                          " Use the solution samples above for additional practice on specific modules."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Preview View */}
              {modalView === 'preview' && selectedPaper.modelPaperLink && (
                <div className="preview-view">
                  <div className="preview-header">
                    <h4>Paper Preview</h4>
                    <div className="preview-controls">
                      <button 
                        className="preview-action-btn"
                        onClick={() => window.open(getViewLink(selectedPaper.modelPaperLink), '_blank')}
                      >
                        🔗 Open in New Tab
                      </button>
                      <button 
                        className="preview-action-btn"
                        onClick={() => window.open(getDownloadLink(selectedPaper.modelPaperLink), '_blank')}
                      >
                        ⬇️ Download Paper
                      </button>
                    </div>
                  </div>
                  <div className="preview-container">
                    <iframe
                      src={getViewLink(selectedPaper.modelPaperLink)}
                      title={`Preview of ${selectedPaper.title}`}
                      className="paper-preview-iframe"
                      allow="autoplay"
                    />
                  </div>
                  <div className="preview-footer">
                    <p>Use the controls above to open in a new tab or download the paper for offline access.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="modern-modal-footer">
              <div className="modal-footer-actions">
                <button 
                  className="footer-action-btn share-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    showNotificationMessage('Link copied to clipboard!');
                  }}
                >
                  <span className="footer-action-icon">🔗</span>
                  Share Paper
                </button>
                <button 
                  className="footer-action-btn close-btn"
                  onClick={() => setSelectedPaper(null)}
                >
                  <span className="footer-action-icon">✕</span>
                  Close
                </button>
              </div>
              <div className="modal-footer-info">
                <span className="footer-info-text">
                  All papers are provided for educational purposes only.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {showNotification && (
        <div className="notification-toast">
          <div className="toast-content">
            <span className="toast-icon">✨</span>
            {notificationMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelPapers;