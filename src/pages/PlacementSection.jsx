import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlacementReviews } from '../hooks/usePlacementReviews'; 
import { 
  Search, Filter, Briefcase, Calendar, MapPin, 
  Banknote, ArrowLeft, Share2, CheckCircle, 
  XCircle, Layers, TrendingUp, Users, Plus, BookOpen, Clock, AlertCircle, 
  MessageSquare, Send, User as UserIcon, Lightbulb, GraduationCap, Sparkles,
  Code2, Database, Globe, Cpu, Terminal, ThumbsUp, Link as LinkIcon,
  ExternalLink, FileText, DownloadCloud, ChevronRight, ChevronLeft, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, database } from '../firebase';
import { ref, push, onValue, serverTimestamp } from 'firebase/database';
import './PlacementSection.css';

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

// --- HELPER FUNCTIONS ---
const getTechIcon = (tech) => {
  const t = (tech || "").toLowerCase();
  if (t.includes('sql') || t.includes('mongo') || t.includes('data')) return <Database size={16} />;
  if (t.includes('react') || t.includes('vue') || t.includes('web')) return <Globe size={16} />;
  if (t.includes('java') || t.includes('python') || t.includes('node')) return <Code2 size={16} />;
  if (t.includes('aws') || t.includes('cloud') || t.includes('docker')) return <Cpu size={16} />;
  return <Terminal size={16} />;
};

const formatStatus = (status) => {
  if (!status) return "Pending";
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

const parseCTC = (ctcString) => {
  if (!ctcString) return 0;
  const num = parseFloat(ctcString.replace(/[^0-9.]/g, ''));
  return isNaN(num) ? 0 : num;
};

const timeAgo = (timestamp) => {
  if (!timestamp) return 'Just now';
  const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 }
  ];
  
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }
  return 'Just now';
};

// --- SUB-COMPONENTS ---

const DiscussionSection = ({ reviewId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const commentsRef = ref(database, `placement_experience_comments/${reviewId}`);
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedComments = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setComments(loadedComments);
      } else {
        setComments([]);
      }
    });
    return () => unsubscribe();
  }, [reviewId]);

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!auth.currentUser) {
      alert("Please login to comment!");
      return;
    }

    setIsSubmitting(true);
    try {
      await push(ref(database, `placement_experience_comments/${reviewId}`), {
        text: newComment,
        authorName: auth.currentUser.displayName || "Student",
        authorId: auth.currentUser.uid,
        authorPhoto: auth.currentUser.photoURL,
        createdAt: serverTimestamp()
      });
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment:", err);
      alert("Failed to post comment. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="discussion-section">
      <div className="discussion-header">
        <h3><MessageSquare size={20} /> Discussion <span className="comment-count">{comments.length}</span></h3>
      </div>
      
      <div className="comment-input">
        <textarea
          placeholder="Share your thoughts or ask a question..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          maxLength={500}
        />
        <button 
          onClick={handlePostComment} 
          disabled={isSubmitting || !newComment.trim()}
          className="post-button"
        >
          {isSubmitting ? "Posting..." : <><Send size={16} /> Post</>}
        </button>
      </div>

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-avatar">
                {comment.authorPhoto ? (
                  <img src={comment.authorPhoto} alt={comment.authorName} />
                ) : (
                  <span>{comment.authorName.charAt(0)}</span>
                )}
              </div>
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-author">{comment.authorName}</span>
                  <span className="comment-time">{timeAgo(comment.createdAt)}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-comments">
            <MessageSquare size={24} />
            <p>No comments yet. Be the first to start the discussion!</p>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, colorClass, value, label }) => (
  <motion.div 
    whileHover={{ y: -4 }} 
    className={`stat-card ${colorClass}`}
  >
    <div className="stat-icon"><Icon size={22} /></div>
    <div className="stat-content">
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  </motion.div>
);

const ExperienceCard = ({ item, onClick }) => {
  const displayStatus = formatStatus(item.status);
  
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="experience-card"
      onClick={onClick}
    >
      <div className="card-header">
        <div className="company-info">
          <div className="company-avatar">{item.company?.charAt(0) || "C"}</div>
          <div className="company-details">
            <h3 className="company-name">{item.company || "Unknown Company"}</h3>
            <p className="company-role">{item.role || "Software Engineer"}</p>
          </div>
        </div>
        <div className={`status-badge status-${displayStatus.toLowerCase()}`}>
          {displayStatus === 'Selected' ? <CheckCircle size={12} /> : 
           displayStatus === 'Rejected' ? <XCircle size={12} /> : <Clock size={12} />}
          {displayStatus}
        </div>
      </div>

      <div className="card-meta">
        <div className="meta-item">
          <Briefcase size={14} />
          <span>{item.placementType || "On-Campus"}</span>
        </div>
        <div className="meta-item highlight">
          <Banknote size={14} />
          <span>{item.ctc || "Not Disclosed"}</span>
        </div>
        <div className="meta-item">
          <MapPin size={14} />
          <span>{item.location || "Remote"}</span>
        </div>
        <div className="meta-item">
          <Layers size={14} />
          <span>{item.roundsCount || 0} Rounds</span>
        </div>
      </div>

      <p className="card-snippet">
        {item.experience?.substring(0, 120) || "No description provided..."}
        {item.experience?.length > 120 && "..."}
      </p>

      <div className="card-footer">
        <div className="author-info">
          <UserIcon size={14} />
          <span>{item.authorName || "Anonymous"}</span>
        </div>
        <div className="card-date">
          <Calendar size={14} />
          <span>{item.dateObj ? item.dateObj.toLocaleDateString() : "Recent"}</span>
        </div>
      </div>
    </motion.div>
  );
};

const FilterBar = ({ searchTerm, setSearchTerm, filters, setFilters, sortBy, setSortBy }) => {
  return (
    <div className="filter-bar">
      <div className="search-box">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search companies, roles, or technologies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-actions">
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
          <option value="CTC High">Highest CTC</option>
          <option value="CTC Low">Lowest CTC</option>
        </select>

        <select 
          value={filters.status} 
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          className="filter-select"
        >
          <option value="All">All Outcomes</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
          <option value="Pending">Pending</option>
        </select>

        <select 
          value={filters.difficulty} 
          onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
          className="filter-select"
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function PlacementSection() {
  const navigate = useNavigate();
  const { reviews, loading } = usePlacementReviews();
  
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ 
    type: 'All', 
    difficulty: 'All', 
    status: 'All' 
  });
  const [sortBy, setSortBy] = useState('Newest');

  // Process and enrich reviews data
  const enrichedReviews = useMemo(() => {
    if (!Array.isArray(reviews)) return [];
    
    return reviews.map(r => ({
      id: r.id,
      company: r.company || "Unknown Company",
      role: r.role || "Software Engineer",
      status: r.offerStatus || r.status || "Pending",
      ctc: r.ctc || "Not Disclosed",
      location: r.location || "Remote",
      difficulty: r.difficulty || 'Medium',
      placementType: r.jobType || r.placementType || 'On-Campus',
      rounds: Array.isArray(r.rounds) ? r.rounds : [],
      roundsCount: Array.isArray(r.rounds) ? r.rounds.length : 0,
      technologies: Array.isArray(r.technologies) ? r.technologies.slice(0, 5) : [],
      resources: Array.isArray(r.resources) ? r.resources : [],
      placementTips: Array.isArray(r.placementTips) ? r.placementTips.slice(0, 3) : [],
      studySuggestions: Array.isArray(r.studySuggestions) ? r.studySuggestions.slice(0, 3) : [],
      externalLinks: Array.isArray(r.externalLinks) ? r.externalLinks : [],
      experience: r.experience || "",
      dateObj: r.createdAt ? new Date(r.createdAt) : new Date(),
      authorName: r.author?.name || "Anonymous",
      authorPhoto: r.author?.photoURL || null,
      gradYear: r.gradYear || "N/A"
    }));
  }, [reviews]);

  // Filter and sort data
  const filteredData = useMemo(() => {
    let data = enrichedReviews.filter(r => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        r.company.toLowerCase().includes(searchLower) ||
        r.role.toLowerCase().includes(searchLower) ||
        r.technologies.some(t => t.toLowerCase().includes(searchLower));
      
      const normStatus = formatStatus(r.status);
      
      return matchesSearch &&
        (filters.type === 'All' || r.placementType === filters.type) &&
        (filters.status === 'All' || normStatus === filters.status) &&
        (filters.difficulty === 'All' || r.difficulty === filters.difficulty);
    });

    // Sorting
    return data.sort((a, b) => {
      switch(sortBy) {
        case 'Newest':
          return b.dateObj - a.dateObj;
        case 'Oldest':
          return a.dateObj - b.dateObj;
        case 'CTC High':
          return parseCTC(b.ctc) - parseCTC(a.ctc);
        case 'CTC Low':
          return parseCTC(a.ctc) - parseCTC(b.ctc);
        default:
          return 0;
      }
    });
  }, [enrichedReviews, searchTerm, filters, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!Array.isArray(reviews) || reviews.length === 0) {
      return { total: 0, successRate: 0, companies: 0, thisMonth: 0 };
    }
    
    const total = reviews.length;
    const successCount = reviews.filter(r => 
      (r.offerStatus === 'Selected' || r.status === 'Selected')
    ).length;
    
    const companies = new Set(reviews
      .map(r => r.company?.toLowerCase().trim())
      .filter(Boolean)
    ).size;
    
    const thisMonth = reviews.filter(r => {
      if (!r.createdAt) return false;
      const reviewDate = new Date(r.createdAt);
      const now = new Date();
      return reviewDate.getMonth() === now.getMonth() && 
             reviewDate.getFullYear() === now.getFullYear();
    }).length;
    
    return {
      total,
      successRate: Math.round((successCount / total) * 100),
      companies,
      thisMonth
    };
  }, [reviews]);

  // Detail View Component
  const DetailView = ({ data, onBack }) => {
    const displayStatus = formatStatus(data.status);
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="detail-view"
      >
        {/* Navigation */}
        <div className="detail-nav">
          <button onClick={onBack} className="back-button">
            <ArrowLeft size={18} />
            Back to Experiences
          </button>
          <div className="nav-actions">
            <button 
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="icon-button"
              title="Copy link"
            >
              <LinkIcon size={18} />
            </button>
            <button 
              onClick={() => navigate('/share-experience')}
              className="share-button"
            >
              <Share2 size={18} />
              Share Your Story
            </button>
          </div>
        </div>

        <div className="detail-content">
          {/* Main Content */}
          <div className="main-content">
            {/* Header */}
            <div className="detail-header">
              <div className="company-header">
                <h1 className="company-name">{data.company}</h1>
                <div className="role-location">
                  <span className="role">{data.role}</span>
                  <span className="divider">•</span>
                  <span className="location">{data.location}</span>
                </div>
              </div>
              <div className={`status-label status-${displayStatus.toLowerCase()}`}>
                {displayStatus}
              </div>
            </div>

            {/* Stats Overview */}
            <div className="stats-overview">
              <div className="stat-item">
                <span className="stat-value">{data.roundsCount}</span>
                <span className="stat-label">Rounds</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{data.difficulty}</span>
                <span className="stat-label">Difficulty</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{data.placementType}</span>
                <span className="stat-label">Type</span>
              </div>
              <div className="stat-item highlight">
                <span className="stat-value">{data.ctc}</span>
                <span className="stat-label">CTC</span>
              </div>
            </div>

            {/* Tech Stack */}
            {data.technologies.length > 0 && (
              <div className="tech-stack">
                <h3><Layers size={18} /> Technology Stack</h3>
                <div className="tech-tags">
                  {data.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {getTechIcon(tech)}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Interview Process */}
            <div className="interview-process">
              <h3>Interview Process</h3>
              <div className="timeline">
                {data.rounds.map((round, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker">{index + 1}</div>
                    <div className="timeline-content">
                      <h4>{round.title || `Round ${index + 1}`}</h4>
                      {round.date && (
                        <span className="round-date">
                          {new Date(round.date).toLocaleDateString()}
                        </span>
                      )}
                      <p>{round.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="experience-content">
              <h3>Overall Experience</h3>
              <div className="experience-text">
                {data.experience.split('\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* Discussion */}
            <DiscussionSection reviewId={data.id} />
          </div>

          {/* Sidebar */}
          <div className="detail-sidebar">
            {/* Author Info */}
            <div className="author-card">
              <div className="author-avatar">
                {data.authorPhoto ? (
                  <img src={data.authorPhoto} alt={data.authorName} />
                ) : (
                  <span>{data.authorName.charAt(0)}</span>
                )}
              </div>
              <div className="author-info">
                <h4>{data.authorName}</h4>
                <p className="author-batch">
                  {data.gradYear !== "N/A" ? `Class of ${data.gradYear}` : "Current Student"}
                </p>
              </div>
            </div>

            {/* Resources */}
            {data.resources.length > 0 && (
              <div className="resources-card">
                <h4><BookOpen size={18} /> Suggested Resources</h4>
                <div className="resource-list">
                  {data.resources.map((resource, index) => (
                    <span key={index} className="resource-item">{resource}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Study Materials */}
            {data.externalLinks.length > 0 && (
              <div className="materials-card">
                <h4><DownloadCloud size={18} /> Study Materials</h4>
                <div className="material-links">
                  {data.externalLinks.map((link, index) => (
                    <a 
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="material-link"
                    >
                      <FileText size={16} />
                      <span>{link.title || "Study Material"}</span>
                      <ExternalLink size={14} />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Tips & Advice */}
            {(data.placementTips.length > 0 || data.studySuggestions.length > 0) && (
              <div className="advice-card">
                <h4><Lightbulb size={18} /> Tips & Advice</h4>
                {data.placementTips.length > 0 && (
                  <div className="advice-section">
                    <h5>Placement Tips</h5>
                    <ul>
                      {data.placementTips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {data.studySuggestions.length > 0 && (
                  <div className="advice-section">
                    <h5>Study Strategy</h5>
                    <ul>
                      {data.studySuggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="cta-card">
              <h4>Got Experience?</h4>
              <p>Help others by sharing your journey</p>
              <button 
                onClick={() => navigate('/share-experience')}
                className="cta-button"
              >
                <Plus size={18} />
                Share Your Story
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Loading State
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading experiences...</p>
      </div>
    );
  }

  return (
    <div className="placement-section">
      <AnimatePresence mode="wait">
        {selectedExperience ? (
          <DetailView 
            data={selectedExperience} 
            onBack={() => setSelectedExperience(null)} 
          />
        ) : (
          <motion.div 
            key="list-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="list-view"
          >
            {/* Hero Section */}
            <div className="hero-section">
              <div className="hero-content">
                <h1 className="hero-title">Placement Experiences</h1>
                <p className="hero-subtitle">
                  Real stories from students who made it. Learn from their journeys.
                </p>
                <button 
                  onClick={() => navigate('/share-experience')}
                  className="hero-cta"
                >
                  <Plus size={18} />
                  Share Your Experience
                </button>
              </div>
              <div className="hero-stats">
                <StatCard 
                  icon={Layers}
                  colorClass="blue"
                  value={stats.total}
                  label="Experiences"
                />
                <StatCard 
                  icon={TrendingUp}
                  colorClass="green"
                  value={`${stats.successRate}%`}
                  label="Success Rate"
                />
                <StatCard 
                  icon={Briefcase}
                  colorClass="purple"
                  value={stats.companies}
                  label="Companies"
                />
                <StatCard 
                  icon={Clock}
                  colorClass="orange"
                  value={stats.thisMonth}
                  label="This Month"
                />
              </div>
            </div>

            {/* Filter Bar */}
            <FilterBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filters={filters}
              setFilters={setFilters}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            {/* Results Count */}
            <div className="results-count">
              <span className="count">{filteredData.length}</span> experiences found
            </div>

            {/* Experiences Grid */}
            {filteredData.length > 0 ? (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="experiences-grid"
              >
                {filteredData.map((experience) => (
                  <ExperienceCard 
                    key={experience.id}
                    item={experience}
                    onClick={() => setSelectedExperience(experience)}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="no-results">
                <AlertCircle size={48} />
                <h3>No experiences found</h3>
                <p>Try adjusting your search or filters</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({ type: 'All', difficulty: 'All', status: 'All' });
                  }}
                  className="reset-filters"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}