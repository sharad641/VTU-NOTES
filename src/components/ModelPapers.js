import React, { useState, useEffect, useMemo } from "react";
import "./ModelPapers.css";
import {
  FaSearch, FaCheck, FaFilePdf, FaHistory,
  FaDatabase, FaArrowRight, FaTimes, FaCopy, 
  FaThLarge, FaList, FaFilter, FaCloudDownloadAlt
} from "react-icons/fa";

// --- Static Data ---
const PAPERS_DATA = [
  { title: 'Computer Networks', code: 'BCS502', modelPaperLink: '#', oldPaperLink: '#', solutionLink: '#' },
  { title: 'Software Engineering', code: 'BCS501', modelPaperLink: '#', oldPaperLink: '#', solutionLink: '#' },
  { title: 'Discrete Math Structures', code: 'BCS405A', modelPaperLink: '#', oldPaperLink: '#', solutionLink: '#' },
  { title: 'Applied Physics', code: 'BPHYS102', modelPaperLink: '#', solutionLink: '#' },
  { title: 'Applied Chemistry', code: 'BCHES202', modelPaperLink: '#', solutionLink: '#' },
  { title: 'Graph Theory', code: 'BCS5405B', modelPaperLink: '#', solutionLink: '#' },
  { title: 'Database Mgmt System', code: 'BCS403', modelPaperLink: '#', solutionLink: '#' },
  { title: 'Cloud Computing', code: 'BCS601', modelPaperLink: '#' },
  { title: 'Machine Learning', code: 'BCS602', modelPaperLink: '#' },
  { title: 'Microcontroller', code: 'BCS601', solutionLink: '#', oldPaperLink: '#' },
  { title: 'Python Programming', code: 'BPLCK205B', modelPaperLink: '#', solutionLink: '#' },
  { title: 'Mathematics-II', code: 'BMATS201', modelPaperLink: '#', solutionLink: '#' },
  { title: 'Data Structures', code: 'BCS304', modelPaperLink: '#', solutionLink: '#' },
  { title: 'OOPS with JAVA', code: 'BCS306A', modelPaperLink: '#', solutionLink: '#' }
];

// --- Utilities ---
const getGradient = (str) => {
  const hash = str.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  const hue1 = Math.abs(hash % 360);
  const hue2 = (hue1 + 40) % 360;
  return `linear-gradient(135deg, hsl(${hue1}, 85%, 96%) 0%, hsl(${hue2}, 90%, 98%) 100%)`;
};

const getInitials = (title) => {
  const parts = title.split(' ');
  return parts.length > 1 ? (parts[0][0] + parts[1][0]) : parts[0].substring(0, 2);
};

// --- Sub-Components ---
const SkeletonCard = ({ viewMode }) => (
  <div className={`paper-card skeleton ${viewMode}`}>
    <div className="sk-icon"></div>
    <div className="sk-content">
      <div className="sk-title"></div>
      <div className="sk-meta"></div>
    </div>
  </div>
);

const ModelPapers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredPapers = useMemo(() => {
    return PAPERS_DATA.filter(p => {
      const matchSearch = (p.title + p.code).toLowerCase().includes(searchTerm.toLowerCase());
      const matchFilter = activeFilter === "solutions" ? p.solutionLink : true;
      return matchSearch && matchFilter;
    });
  }, [searchTerm, activeFilter]);

  const displayPapers = showAll ? filteredPapers : filteredPapers.slice(0, 8);

  const copyLink = (link) => {
    if(!link) return;
    navigator.clipboard.writeText(link);
    setToast("Link copied to clipboard");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="library-container">
      {/* Floating Toast */}
      <div className={`toast ${toast ? 'show' : ''}`}>
        <FaCheck className="toast-icon" /> {toast}
      </div>

      {/* Header Section */}
      <div className="library-header">
        <div className="header-text">
          <h1>Resource Library</h1>
          <p>Curated collection of model papers & solutions</p>
        </div>
        
        <div className="stats-badges">
          <div className="stat-pill">
            <span className="pill-val">{PAPERS_DATA.length}</span> Subjects
          </div>
          <div className="stat-pill highlight">
            <span className="pill-val">{PAPERS_DATA.filter(p => p.solutionLink).length}</span> Solved
          </div>
        </div>
      </div>

      {/* Control Bar (Search + Filters) */}
      <div className="control-bar sticky-bar">
        <div className="search-group">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search subject or code..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && <FaTimes className="clear-icon" onClick={() => setSearchTerm('')} />}
        </div>

        <div className="actions-group">
          <div className="filter-toggle">
            <button 
              className={activeFilter === 'all' ? 'active' : ''} 
              onClick={() => setActiveFilter('all')}
            >All</button>
            <button 
              className={activeFilter === 'solutions' ? 'active' : ''} 
              onClick={() => setActiveFilter('solutions')}
            >Solved</button>
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

      {/* Content Area */}
      <div className={`papers-layout ${viewMode}`}>
        {loading ? (
          Array(6).fill(0).map((_, i) => <SkeletonCard key={i} viewMode={viewMode} />)
        ) : displayPapers.length > 0 ? (
          displayPapers.map((paper, idx) => (
            <div 
              key={idx} 
              className="paper-card"
              style={{ background: viewMode === 'grid' ? getGradient(paper.title) : '#fff' }}
            >
              <div className="card-top">
                <div className="subject-icon">
                  {getInitials(paper.title)}
                </div>
                <div className="meta-badge"><FaDatabase /> {paper.code}</div>
              </div>

              <div className="card-content">
                <h3>{paper.title}</h3>
                
                <div className="resource-tags">
                  {paper.modelPaperLink && <span className="tag tag-model">Model</span>}
                  {paper.oldPaperLink && <span className="tag tag-old">Old Paper</span>}
                  {paper.solutionLink && <span className="tag tag-sol">Solved</span>}
                </div>
              </div>

              <div className="card-actions">
                {paper.solutionLink ? (
                  <a href={paper.solutionLink} target="_blank" rel="noreferrer" className="btn-main">
                    <FaCheck /> <span>View Solution</span>
                  </a>
                ) : (
                  <button className="btn-main disabled" disabled>No Solution</button>
                )}

                <div className="secondary-actions">
                  {paper.modelPaperLink && (
                    <a href={paper.modelPaperLink} target="_blank" rel="noreferrer" className="icon-action" title="Model Paper">
                      <FaFilePdf />
                    </a>
                  )}
                  {paper.oldPaperLink && (
                    <a href={paper.oldPaperLink} target="_blank" rel="noreferrer" className="icon-action" title="History">
                      <FaHistory />
                    </a>
                  )}
                  <button className="icon-action" onClick={() => copyLink(paper.solutionLink || paper.modelPaperLink)}>
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
            <p>Try adjusting your search filters</p>
            <button onClick={() => {setSearchTerm(''); setActiveFilter('all');}}>Clear Filters</button>
          </div>
        )}
      </div>

      {!showAll && !loading && displayPapers.length < filteredPapers.length && (
        <div className="load-more">
          <button onClick={() => setShowAll(true)}>
            View All Resources <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ModelPapers;