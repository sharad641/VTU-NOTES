import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlacementReviews } from '../hooks/usePlacementReviews';
import {
  Search, Briefcase, MapPin,
  Banknote, Layers, TrendingUp, Plus, Clock,
  AlertCircle, CheckCircle, XCircle, Calendar, User as UserIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './PlacementModern.css'; // CHANGED: Modern CSS
import PlacementDetailView from './PlacementDetailView';

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

const formatStatus = (status) => {
  if (!status) return "Pending";
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

const parseCTC = (ctcString) => {
  if (!ctcString) return 0;
  const num = parseFloat(ctcString.replace(/[^0-9.]/g, ''));
  return isNaN(num) ? 0 : num;
};

// --- SUB-COMPONENTS ---

const ExperienceCardModern = ({ item, onClick }) => {
  const displayStatus = formatStatus(item.status);

  return (
    <motion.div
      variants={itemVariants}
      className="experience-card-modern"
      onClick={onClick}
    >
      <div className="card-company-header">
        <div className="company-logo-placeholder">{item.company?.charAt(0) || "C"}</div>
        <div className={`status-pill ${displayStatus.toLowerCase()}`}>
          {displayStatus === 'Selected' && <CheckCircle size={12} />}
          {displayStatus === 'Rejected' && <XCircle size={12} />}
          {displayStatus === 'Pending' && <Clock size={12} />}
          {displayStatus}
        </div>
      </div>

      <div className="card-title-row">
        <h3>{item.company || "Unknown Company"}</h3>
        <p className="card-role">{item.role || "Software Engineer"}</p>
      </div>

      <div className="card-stats-grid">
        <div className="card-stat-item"><Briefcase size={14} /> {item.placementType || "On-Campus"}</div>
        <div className="card-stat-item"><Banknote size={14} /> {item.ctc || "N/A"}</div>
        <div className="card-stat-item"><MapPin size={14} /> {item.location || "Remote"}</div>
        <div className="card-stat-item"><Layers size={14} /> {item.roundsCount} Rounds</div>
      </div>

      <div className="card-footer-modern">
        <span>By {item.authorName}</span>
        <span>{item.dateObj ? item.dateObj.toLocaleDateString() : "Recent"}</span>
      </div>
    </motion.div>
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
      switch (sortBy) {
        case 'Newest': return b.dateObj - a.dateObj;
        case 'Oldest': return a.dateObj - b.dateObj;
        case 'CTC High': return parseCTC(b.ctc) - parseCTC(a.ctc);
        case 'CTC Low': return parseCTC(a.ctc) - parseCTC(b.ctc);
        default: return 0;
      }
    });
  }, [enrichedReviews, searchTerm, filters, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!Array.isArray(reviews) || reviews.length === 0) return { total: 0, successRate: 0, companies: 0 };
    const total = reviews.length;
    const successCount = reviews.filter(r => (r.offerStatus === 'Selected' || r.status === 'Selected')).length;
    const companies = new Set(reviews.map(r => r.company?.toLowerCase().trim()).filter(Boolean)).size;
    return { total, successRate: Math.round((successCount / total) * 100), companies };
  }, [reviews]);

  if (loading) {
    return (
      <div className="placement-page-container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="placement-page-container">
      {/* Background Engine */}
      <div className="placement-background-engine">
        <div className="engine-shape blob-1"></div>
        <div className="engine-shape blob-2"></div>
      </div>

      <AnimatePresence mode="wait">
        {selectedExperience ? (
          <PlacementDetailView
            key="detail-view"
            data={selectedExperience}
            onBack={() => setSelectedExperience(null)}
          />
        ) : (
          <motion.div
            key="list-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="placement-content-wrapper"
          >
            {/* FAB */}
            <button
              onClick={() => navigate('/share-experience')}
              className="fab-share-modern"
              title="Share your experience"
            >
              <Plus size={24} />
            </button>

            {/* Hero Section */}
            <div className="placement-hero">
              <div className="hero-text">
                <h1 className="hero-title">Placement Stories</h1>
                <p className="hero-subtitle">
                  Real interview experiences, questions, and success stories from your seniors to help you crack your dream job.
                </p>
              </div>
              <div className="hero-stats-row">
                <div className="hero-stat-card">
                  <h3>{stats.total}</h3>
                  <p>Stories</p>
                </div>
                <div className="hero-stat-card">
                  <h3>{stats.companies}</h3>
                  <p>Companies</p>
                </div>
                <div className="hero-stat-card">
                  <h3>{stats.successRate}%</h3>
                  <p>Selected</p>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="placement-filter-bar">
              <input
                type="text"
                placeholder="Search companies, roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input-modern"
              />

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <select
                  value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select-modern"
                >
                  <option value="Newest">Newest First</option>
                  <option value="Oldest">Oldest First</option>
                  <option value="CTC High">Highest CTC</option>
                </select>

                <select
                  value={filters.status} onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="filter-select-modern"
                >
                  <option value="All">All Outcomes</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filteredData.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="placement-grid"
              >
                {filteredData.map((experience) => (
                  <ExperienceCardModern
                    key={experience.id}
                    item={experience}
                    onClick={() => setSelectedExperience(experience)}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="no-results" style={{ textAlign: 'center', padding: '40px' }}>
                <AlertCircle size={48} style={{ margin: '0 auto 20px', opacity: 0.5 }} />
                <h3>No stories found</h3>
                <p>Try adjusting your search filters.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}