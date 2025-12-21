import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ThumbsUp, CheckCircle, Building2, Calendar, 
  ChevronDown, ChevronUp, Share2, Bookmark, User, Copy
} from 'lucide-react';
import { auth } from '../firebase';
import './ReviewCard.css';

const ReviewCard = ({ data, onLike }) => {
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // Local state for bookmark demo
  
  const currentUser = auth.currentUser;
  const isLiked = data.likedBy?.includes(currentUser?.uid);

  // --- Handlers ---

  const handleLike = () => {
    if (!currentUser) return alert("Please sign in to like.");
    onLike(data.id);
  };

  const handleShare = () => {
    // Simulate copying link
    navigator.clipboard.writeText(`Check out this interview experience at ${data.company}: [Link]`);
    alert("Link copied to clipboard!"); 
  };

  // --- Helpers ---

  // 1. Get readable date
  const dateStr = data.createdAt?.seconds 
    ? new Date(data.createdAt.seconds * 1000).toLocaleDateString('en-US', { 
        month: 'short', day: 'numeric', year: 'numeric' 
      }) 
    : 'New';

  // 2. Badge Color Helper
  const getBadgeClass = (type) => {
    if (!type) return 'badge on-campus';
    const lower = type.toLowerCase();
    if (lower.includes('off')) return 'badge off-campus';
    if (lower.includes('intern')) return 'badge internship';
    return 'badge on-campus';
  };

  // 3. Dynamic Logo URL (Uses Clearbit API based on company name)
  // If company is "Amazon", url is logo.clearbit.com/amazon.com
  // We try a best guess by appending .com or using the name directly
  const getLogoUrl = (companyName) => {
    if (!companyName) return null;
    const cleanName = companyName.toLowerCase().replace(/\s/g, '');
    return `https://logo.clearbit.com/${cleanName}.com`;
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="review-card"
    >
      
      {/* 1. Header: Company & CTC */}
      <div className="card-top">
        <div className="company-profile">
          <div className="company-logo-wrapper">
            {!imageError ? (
              <img 
                src={getLogoUrl(data.company)} 
                alt={`${data.company} Logo`}
                className="company-logo"
                onError={() => setImageError(true)}
              />
            ) : (
              <Building2 size={24} color="#94a3b8" />
            )}
          </div>
          <div className="company-meta">
            <h3>{data.company}</h3>
            <p>{data.role}</p>
          </div>
        </div>

        <div className="pkg-badge-group">
          <div className="ctc-gradient">{data.ctc}</div>
          <span className={getBadgeClass(data.placementType)}>
            {data.placementType}
          </span>
        </div>
      </div>

      {/* 2. Middle: Student Info & Tags */}
      <div className="card-middle">
        <div className="student-row">
          <div className="mini-avatar">
            {data.author?.photoURL ? (
              <img src={data.author.photoURL} alt="User" style={{width:'100%', height:'100%', borderRadius:'50%'}} />
            ) : (
              data.author?.name?.[0] || <User size={14} />
            )}
          </div>
          <div className="student-info">
            <span className="student-name">
              {data.author?.name || "Anonymous"}
            </span>
            {data.verified && <CheckCircle size={14} color="#3b82f6" fill="transparent" />}
            <span className="dot-separator"></span>
            <span>{data.year || '2025'} Batch</span>
          </div>
        </div>

        {data.rounds && (
          <div className="tags-row">
            {data.rounds.map((round, idx) => (
              <span key={idx} className="modern-tag">{round}</span>
            ))}
          </div>
        )}
      </div>

      {/* 3. Content: Experience with Smooth Expand */}
      <div className="card-content">
        <motion.div 
          initial={false}
          animate={{ height: expanded ? 'auto' : 85 }} // 85px is approx 3 lines
          style={{ overflow: 'hidden', position: 'relative' }}
          transition={{ duration: 0.3 }}
        >
          <p className="exp-text">
            {data.experience}
          </p>
          {!expanded && data.experience?.length > 150 && (
            <div className="fade-overlay"></div>
          )}
        </motion.div>

        {data.experience?.length > 150 && (
          <button onClick={() => setExpanded(!expanded)} className="read-more-btn">
            {expanded ? (
              <>Show Less <ChevronUp size={16} /></>
            ) : (
              <>Read Full Experience <ChevronDown size={16} /></>
            )}
          </button>
        )}
      </div>

      {/* 4. Footer: Actions & Date */}
      <div className="card-actions">
        <div className="action-group">
          <button 
            onClick={handleLike} 
            className={`action-btn ${isLiked ? 'liked' : ''}`}
            title="Like Story"
          >
            <ThumbsUp size={18} className={isLiked ? "fill-current" : ""} />
            <span>{data.likes || 0}</span>
          </button>
          
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={`action-btn ${isSaved ? 'saved' : ''}`}
            title="Save for later"
          >
            <Bookmark size={18} className={isSaved ? "fill-current" : ""} />
          </button>

          <button onClick={handleShare} className="action-btn" title="Share Link">
            <Share2 size={18} />
          </button>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:'0.8rem', color:'#94a3b8' }}>
          <Calendar size={14} />
          <span>{dateStr}</span>
        </div>
      </div>

    </motion.div>
  );
};

export default ReviewCard;