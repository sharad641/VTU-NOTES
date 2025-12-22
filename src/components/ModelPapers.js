import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./ModelPapers.css";
import {
  FaSearch, FaCheck, FaFilePdf, FaHistory,
  FaDatabase, FaArrowRight, FaTimes, FaCopy, 
  FaThLarge, FaList, FaCloudDownloadAlt, FaFilter,
  FaBook, FaDownload, FaExternalLinkAlt, FaStar,
  FaRegStar, FaSortAmountDown, FaSortAmountUp
} from "react-icons/fa";

// --- Static Data with Enhanced Information ---
const PAPERS_DATA = [
  { 
    title: 'Computer Networks', 
    code: 'BCS502', 
    modelPaperLink: '#', 
    oldPaperLink: '#', 
    solutionLink: '#',
    difficulty: 'Medium',
    year: 2024,
    rating: 4.5,
    downloads: 1245,
    lastUpdated: '2024-03-15'
  },
  { 
    title: 'Software Engineering', 
    code: 'BCS501', 
    modelPaperLink: '#', 
    oldPaperLink: '#', 
    solutionLink: '#',
    difficulty: 'Easy',
    year: 2023,
    rating: 4.2,
    downloads: 987,
    lastUpdated: '2024-02-28'
  },
  { 
    title: 'Discrete Math Structures', 
    code: 'BCS405A', 
    modelPaperLink: '#', 
    oldPaperLink: '#', 
    solutionLink: '#',
    difficulty: 'Hard',
    year: 2024,
    rating: 4.7,
    downloads: 1567,
    lastUpdated: '2024-03-20'
  },
  { 
    title: 'Applied Physics', 
    code: 'BPHYS102', 
    modelPaperLink: '#', 
    solutionLink: '#',
    difficulty: 'Medium',
    year: 2023,
    rating: 4.0,
    downloads: 876,
    lastUpdated: '2024-01-10'
  },
  { 
    title: 'Applied Chemistry', 
    code: 'BCHES202', 
    modelPaperLink: '#', 
    solutionLink: '#',
    difficulty: 'Easy',
    year: 2024,
    rating: 4.1,
    downloads: 654,
    lastUpdated: '2024-03-05'
  },
  { 
    title: 'Graph Theory', 
    code: 'BCS5405B', 
    modelPaperLink: '#', 
    solutionLink: '#',
    difficulty: 'Hard',
    year: 2023,
    rating: 4.8,
    downloads: 1432,
    lastUpdated: '2024-02-15'
  },
  { 
    title: 'Database Mgmt System', 
    code: 'BCS403', 
    modelPaperLink: '#', 
    solutionLink: '#',
    difficulty: 'Medium',
    year: 2024,
    rating: 4.3,
    downloads: 1789,
    lastUpdated: '2024-03-25'
  },
  { 
    title: 'Cloud Computing', 
    code: 'BCS601', 
    modelPaperLink: '#',
    difficulty: 'Hard',
    year: 2024,
    rating: 4.6,
    downloads: 1123,
    lastUpdated: '2024-03-18'
  },
  { 
    title: 'Machine Learning', 
    code: 'BCS602', 
    modelPaperLink: '#',
    difficulty: 'Hard',
    year: 2024,
    rating: 4.9,
    downloads: 2345,
    lastUpdated: '2024-03-22'
  },
  { 
    title: 'Microcontroller', 
    code: 'BCS601', 
    solutionLink: '#', 
    oldPaperLink: '#',
    difficulty: 'Medium',
    year: 2023,
    rating: 4.4,
    downloads: 765,
    lastUpdated: '2024-01-30'
  },
  { 
    title: 'Python Programming', 
    code: 'BPLCK205B', 
    modelPaperLink: '#', 
    solutionLink: '#',
    difficulty: 'Easy',
    year: 2024,
    rating: 4.7,
    downloads: 1987,
    lastUpdated: '2024-03-28'
  },
  { 
    title: 'Mathematics-II', 
    code: 'BMATS201', 
    modelPaperLink: '#', 
    solutionLink: '#',
    difficulty: 'Hard',
    year: 2023,
    rating: 4.2,
    downloads: 1345,
    lastUpdated: '2024-02-20'
  },
  { 
    title: 'Data Structures', 
    code: 'BCS304', 
    modelPaperLink: '#', 
    solutionLink: '#',
    difficulty: 'Medium',
    year: 2024,
    rating: 4.8,
    downloads: 2567,
    lastUpdated: '2024-03-30'
  },
  { 
    title: 'OOPS with JAVA', 
    code: 'BCS306A', 
    modelPaperLink: '#', 
    solutionLink: '#',
    difficulty: 'Medium',
    year: 2024,
    rating: 4.5,
    downloads: 1765,
    lastUpdated: '2024-03-12'
  }
];

// --- Utilities ---
const getGradient = (str) => {
  const hash = str.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  const hue1 = Math.abs(hash % 360);
  const hue2 = (hue1 + 60) % 360;
  return `linear-gradient(135deg, hsl(${hue1}, 85%, 96%) 0%, hsl(${hue2}, 90%, 98%) 100%)`;
};

const getInitials = (title) => {
  const parts = title.split(' ');
  return parts.length > 1 
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : parts[0].substring(0, 2).toUpperCase();
};

const difficultyColors = {
  Easy: '#10b981',
  Medium: '#f59e0b',
  Hard: '#ef4444'
};

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FaStar key={i} className="star filled" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<FaStar key={i} className="star half" />);
    } else {
      stars.push(<FaRegStar key={i} className="star" />);
    }
  }
  return stars;
};

// --- Sub-Components ---
const SkeletonCard = ({ viewMode }) => (
  <div className={`paper-card skeleton ${viewMode}`}>
    <div className="sk-header">
      <div className="sk-icon"></div>
      <div className="sk-badge"></div>
    </div>
    <div className="sk-content">
      <div className="sk-title"></div>
      <div className="sk-meta"></div>
      <div className="sk-tags">
        <div className="sk-tag"></div>
        <div className="sk-tag"></div>
      </div>
    </div>
    <div className="sk-actions">
      <div className="sk-button"></div>
      <div className="sk-icons">
        <div className="sk-icon-small"></div>
        <div className="sk-icon-small"></div>
      </div>
    </div>
  </div>
);

const MobileFilterPanel = ({ 
  isOpen, 
  onClose, 
  activeFilter, 
  setActiveFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder
}) => (
  <div className={`mobile-filter-panel ${isOpen ? 'open' : ''}`}>
    <div className="filter-panel-header">
      <h3>Filters & Sort</h3>
      <button className="close-filter" onClick={onClose}>
        <FaTimes />
      </button>
    </div>
    
    <div className="filter-section">
      <h4>Resource Type</h4>
      <div className="filter-options">
        <button 
          className={activeFilter === 'all' ? 'active' : ''} 
          onClick={() => setActiveFilter('all')}
        >
          All Resources
        </button>
        <button 
          className={activeFilter === 'solutions' ? 'active' : ''} 
          onClick={() => setActiveFilter('solutions')}
        >
          With Solutions
        </button>
        <button 
          className={activeFilter === 'model' ? 'active' : ''} 
          onClick={() => setActiveFilter('model')}
        >
          Model Papers
        </button>
      </div>
    </div>
    
    <div className="filter-section">
      <h4>Sort By</h4>
      <div className="sort-options">
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="title">Title</option>
          <option value="year">Year</option>
          <option value="rating">Rating</option>
          <option value="downloads">Downloads</option>
          <option value="difficulty">Difficulty</option>
        </select>
        
        <button 
          className="sort-order-btn"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>
    </div>
    
    <button className="apply-filters" onClick={onClose}>
      Apply Filters
    </button>
  </div>
);

const ModelPapers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredPapers = useMemo(() => {
    let filtered = PAPERS_DATA.filter(p => {
      const matchSearch = (p.title + p.code).toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchFilter = true;
      if (activeFilter === "solutions") matchFilter = p.solutionLink;
      if (activeFilter === "model") matchFilter = p.modelPaperLink;
      
      const matchYear = selectedYears.length === 0 || selectedYears.includes(p.year.toString());
      const matchDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(p.difficulty);
      
      return matchSearch && matchFilter && matchYear && matchDifficulty;
    });

    // Sorting logic
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch(sortBy) {
        case 'year':
          aVal = a.year;
          bVal = b.year;
          break;
        case 'rating':
          aVal = a.rating;
          bVal = b.rating;
          break;
        case 'downloads':
          aVal = a.downloads;
          bVal = b.downloads;
          break;
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          aVal = difficultyOrder[a.difficulty];
          bVal = difficultyOrder[b.difficulty];
          break;
        default:
          aVal = a.title.toLowerCase();
          bVal = b.title.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, activeFilter, sortBy, sortOrder, selectedYears, selectedDifficulties]);

  const displayPapers = showAll ? filteredPapers : filteredPapers.slice(0, 8);

  const copyLink = useCallback((link) => {
    if(!link) return;
    navigator.clipboard.writeText(link);
    setToast("Link copied to clipboard");
    setTimeout(() => setToast(null), 3000);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="library-container">
      {/* Floating Toast */}
      <div className={`toast ${toast ? 'show' : ''}`}>
        <FaCheck className="toast-icon" /> {toast}
      </div>

      {/* Mobile Filter Panel */}
      <MobileFilterPanel
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* Header Section */}
      <div className="library-header">
        <div className="header-text">
          <h1>Resource Library</h1>
          <p>Curated collection of model papers, solutions, and study materials</p>
        </div>
        
        <div className="stats-badges">
          <div className="stat-pill">
            <span className="pill-val">{PAPERS_DATA.length}</span> Subjects
          </div>
          <div className="stat-pill highlight">
            <span className="pill-val">{PAPERS_DATA.filter(p => p.solutionLink).length}</span> Solved
          </div>
          <div className="stat-pill">
            <span className="pill-val">{PAPERS_DATA.filter(p => p.modelPaperLink).length}</span> Model Papers
          </div>
        </div>
      </div>

      {/* Advanced Control Bar */}
      <div className="advanced-control-bar">
        <div className="control-group main-controls">
          <div className="search-group">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search subject, code, or topic..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && <FaTimes className="clear-icon" onClick={() => setSearchTerm('')} />}
          </div>

          <button 
            className="mobile-filter-btn"
            onClick={() => setShowMobileFilters(true)}
            aria-label="Open filters"
          >
            <FaFilter />
            Filters
          </button>
        </div>

        <div className="control-group secondary-controls">
          <div className="desktop-filters">
            <div className="filter-group">
              <span className="filter-label">Filter:</span>
              <div className="filter-options">
                <button 
                  className={activeFilter === 'all' ? 'active' : ''} 
                  onClick={() => setActiveFilter('all')}
                >
                  All
                </button>
                <button 
                  className={activeFilter === 'solutions' ? 'active' : ''} 
                  onClick={() => setActiveFilter('solutions')}
                >
                  With Solutions
                </button>
                <button 
                  className={activeFilter === 'model' ? 'active' : ''} 
                  onClick={() => setActiveFilter('model')}
                >
                  Model Papers
                </button>
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Sort:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="title">Title</option>
                <option value="year">Year</option>
                <option value="rating">Rating</option>
                <option value="downloads">Downloads</option>
                <option value="difficulty">Difficulty</option>
              </select>
              
              <button 
                className="sort-order-btn"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
              >
                {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
              </button>
            </div>
          </div>

          <div className="view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''} 
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
            >
              <FaThLarge />
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''} 
              onClick={() => setViewMode('list')}
              aria-label="List View"
            >
              <FaList />
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters (Desktop) */}
      <div className="advanced-filters">
        <div className="filter-category">
          <h4>Year</h4>
          <div className="filter-chips">
            {[2024, 2023, 2022].map(year => (
              <button
                key={year}
                className={`filter-chip ${selectedYears.includes(year.toString()) ? 'active' : ''}`}
                onClick={() => {
                  setSelectedYears(prev => 
                    prev.includes(year.toString())
                      ? prev.filter(y => y !== year.toString())
                      : [...prev, year.toString()]
                  );
                }}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
        
        <div className="filter-category">
          <h4>Difficulty</h4>
          <div className="filter-chips">
            {['Easy', 'Medium', 'Hard'].map(diff => (
              <button
                key={diff}
                className={`filter-chip difficulty-${diff.toLowerCase()} ${selectedDifficulties.includes(diff) ? 'active' : ''}`}
                style={{ '--difficulty-color': difficultyColors[diff] }}
                onClick={() => {
                  setSelectedDifficulties(prev => 
                    prev.includes(diff)
                      ? prev.filter(d => d !== diff)
                      : [...prev, diff]
                  );
                }}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
        
        {(selectedYears.length > 0 || selectedDifficulties.length > 0) && (
          <button 
            className="clear-filters"
            onClick={() => {
              setSelectedYears([]);
              setSelectedDifficulties([]);
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className={`papers-layout ${viewMode}`}>
        {loading ? (
          Array(6).fill(0).map((_, i) => <SkeletonCard key={i} viewMode={viewMode} />)
        ) : displayPapers.length > 0 ? (
          displayPapers.map((paper, idx) => (
            <div 
              key={idx} 
              className="paper-card"
              style={{ 
                background: viewMode === 'grid' ? getGradient(paper.title) : '#fff',
                '--hover-color': getGradient(paper.title)
              }}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-header">
                <div className="subject-icon">
                  {getInitials(paper.title)}
                </div>
                <div className="card-meta">
                  <span className="subject-code">
                    <FaDatabase /> {paper.code}
                  </span>
                  <span 
                    className="difficulty-badge"
                    style={{ backgroundColor: difficultyColors[paper.difficulty] }}
                  >
                    {paper.difficulty}
                  </span>
                </div>
              </div>

              <div className="card-content">
                <h3>{paper.title}</h3>
                
                <div className="card-stats">
                  <div className="rating">
                    {renderStars(paper.rating)}
                    <span className="rating-value">{paper.rating}</span>
                  </div>
                  <div className="downloads">
                    <FaDownload /> {formatNumber(paper.downloads)}
                  </div>
                  <div className="year">
                    {paper.year}
                  </div>
                </div>
                
                <div className="resource-tags">
                  {paper.modelPaperLink && <span className="tag tag-model">Model Paper</span>}
                  {paper.oldPaperLink && <span className="tag tag-old">Old Papers</span>}
                  {paper.solutionLink && <span className="tag tag-sol">Solutions</span>}
                </div>
                
                <div className="updated-info">
                  Updated: {new Date(paper.lastUpdated).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>

              <div className={`card-actions ${hoveredCard === idx ? 'hovered' : ''}`}>
                <div className="primary-actions">
                  {paper.solutionLink ? (
                    <a 
                      href={paper.solutionLink} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="btn-main"
                    >
                      <FaCheck /> <span>View Solution</span> <FaExternalLinkAlt className="external-icon" />
                    </a>
                  ) : (
                    <button className="btn-main disabled" disabled>
                      <FaBook /> <span>Study Material</span>
                    </button>
                  )}
                </div>

                <div className="secondary-actions">
                  {paper.modelPaperLink && (
                    <a 
                      href={paper.modelPaperLink} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="icon-action" 
                      title="Model Paper"
                    >
                      <FaFilePdf />
                    </a>
                  )}
                  {paper.oldPaperLink && (
                    <a 
                      href={paper.oldPaperLink} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="icon-action" 
                      title="Previous Papers"
                    >
                      <FaHistory />
                    </a>
                  )}
                  <button 
                    className="icon-action copy-btn"
                    onClick={() => copyLink(paper.solutionLink || paper.modelPaperLink)}
                    title="Copy Link"
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon"><FaCloudDownloadAlt /></div>
            <h3>No resources found</h3>
            <p>Try adjusting your search or filters</p>
            <button 
              className="clear-all-btn"
              onClick={() => {
                setSearchTerm('');
                setActiveFilter('all');
                setSelectedYears([]);
                setSelectedDifficulties([]);
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {!showAll && !loading && displayPapers.length < filteredPapers.length && (
        <div className="load-more-container">
          <button 
            className="load-more-btn"
            onClick={() => setShowAll(true)}
          >
            View All Resources ({filteredPapers.length - displayPapers.length} more)
            <FaArrowRight className="arrow-icon" />
          </button>
        </div>
      )}

      {/* Quick Stats Footer */}
      <div className="quick-stats">
        <div className="stat-item">
          <div className="stat-value">{PAPERS_DATA.length}</div>
          <div className="stat-label">Total Subjects</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{PAPERS_DATA.filter(p => p.solutionLink).length}</div>
          <div className="stat-label">With Solutions</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">
            {Math.round(PAPERS_DATA.reduce((acc, p) => acc + p.rating, 0) / PAPERS_DATA.length * 10) / 10}
          </div>
          <div className="stat-label">Avg Rating</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">
            {PAPERS_DATA.reduce((acc, p) => acc + p.downloads, 0).toLocaleString()}
          </div>
          <div className="stat-label">Total Downloads</div>
        </div>
      </div>
    </div>
  );
};

export default ModelPapers;