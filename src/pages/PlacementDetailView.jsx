import React, { useState, useEffect } from "react";
import {
  ArrowLeft, Calendar, MapPin, Banknote,
  CheckCircle, XCircle, Layers, User, MessageSquare, Send, BookOpen,
  DownloadCloud, FileText, ExternalLink, Plus, Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { auth, database } from "../firebase";
import { ref, push, onValue, serverTimestamp } from "firebase/database";
import "./PlacementModern.css";
import { useNavigate } from "react-router-dom";
import AdSenseAd from '../components/AdSenseAd';

/* ----------------- Discussion Section ----------------- */
const DiscussionSection = ({ reviewId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const r = ref(database, `placement_experience_comments/${reviewId}`);
    return onValue(r, snap => {
      const data = snap.val() || {};
      setComments(
        Object.keys(data).map(id => ({ id, ...data[id] }))
      );
    });
  }, [reviewId]);

  const sendComment = async () => {
    if (!auth.currentUser || !text.trim()) return;

    await push(ref(database, `placement_experience_comments/${reviewId}`), {
      text,
      author: auth.currentUser.displayName || "Student",
      createdAt: serverTimestamp()
    });
    setText("");
  };

  return (
    <div className="detail-glass-panel" style={{ marginTop: '30px' }}>
      <h3 className="section-title-modern">
        <MessageSquare size={20} className="text-accent" /> Discussion
      </h3>

      <div className="discussion-box">
        {comments.length === 0 && <p className="text-muted" style={{ textAlign: 'center', fontStyle: 'italic' }}>No comments yet. Be the first!</p>}
        {comments.map(c => (
          <div key={c.id} className="comment-bubble">
            <span className="comment-author">{c.author}</span>
            <p className="comment-text">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="comment-input-row">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Ask a question..."
          className="modern-input"
        />
        <button
          onClick={sendComment}
          className="btn-primary-neon"
          style={{ width: '50px', padding: 0, justifyContent: 'center' }}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

/* ----------------- Detail View ----------------- */
export default function PlacementDetailView({ data, onBack }) {
  const navigate = useNavigate();
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="placement-content-wrapper"
      style={{ paddingTop: '20px' }}
    >
      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <button onClick={onBack} className="btn-ghost">
          <ArrowLeft size={18} /> Back
        </button>

        <button
          onClick={() => navigate('/share-experience')}
          className="btn-primary-neon"
        >
          <Plus size={18} /> Share Yours
        </button>
      </div>

      <div className="detail-content-grid">
        {/* MAIN CONTENT */}
        <div className="detail-main-col">

          {/* Header Card */}
          <div className="detail-hero-card">
            <div className="detail-hero-header-row">
              <div className="company-logo-large">
                {data.company[0]}
              </div>
              <div className="detail-hero-info">
                <h1 className="detail-title">{data.company}</h1>
                <p className="detail-role">{data.role}</p>
              </div>
            </div>

            <div className="detail-meta-row">
              <span className={`status-pill ${data.status.toLowerCase()}`}>
                {data.status === 'Selected' ? <CheckCircle size={14} /> : data.status === 'Rejected' ? <XCircle size={14} /> : <Clock size={14} />}
                {data.status}
              </span>
              <span className="meta-pill">
                <Calendar size={16} /> {data.dateObj.toLocaleDateString()}
              </span>
              <span className="meta-pill">
                <MapPin size={16} /> {data.location}
              </span>
              <span className="meta-pill">
                <Banknote size={16} /> {data.ctc}
              </span>
            </div>
          </div>

          {/* MOBILE: Author Card (appears after hero on mobile) */}
          <div className="sidebar-glass-card mobile-order-author">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e293b, #0f172a)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)' }}>
                {data.authorPhoto ? <img src={data.authorPhoto} alt="" style={{ width: '100%', borderRadius: '50%' }} /> : <User size={24} color="#94a3b8" />}
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: 'white' }}>{data.authorName}</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {data.gradYear !== "N/A" ? `Class of ${data.gradYear}` : "Student"}
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '12px', borderTop: '1px solid var(--glass-border)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Opportunity</span>
                <span style={{ fontWeight: '600', color: 'white' }}>{data.placementType}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Difficulty</span>
                <span style={{ fontWeight: '600', color: data.difficulty === 'Hard' ? '#ef4444' : data.difficulty === 'Medium' ? '#f59e0b' : '#22c55e' }}>{data.difficulty}</span>
              </div>
            </div>
          </div>

          {/* MOBILE: Tech Stack (appears after author on mobile) */}
          {data.technologies?.length > 0 && (
            <div className="sidebar-glass-card mobile-order-tech">
              <h4 className="sidebar-heading">Tech Stack</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {data.technologies.map((t, i) => (
                  <span key={i} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* Rounds */}
          <div className="detail-glass-panel mobile-order-rounds">
            <h2 className="section-title-modern">
              <Layers className="text-accent" /> Selection Rounds
            </h2>
            <div className="rounds-timeline">
              {data.rounds.map((r, i) => (
                <div key={i} className="round-item">
                  <div className="round-dot"></div>
                  <h3 className="round-title">{r.title || `Round ${i + 1}`}</h3>
                  <div className="round-desc">
                    {r.description && r.description.trim() ? r.description : <span style={{ fontStyle: 'italic', opacity: 0.6 }}>No details provided.</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Text */}
          <div className="detail-glass-panel mobile-order-experience">
            <h2 className="section-title-modern">
              <FileText className="text-accent" /> Overall Experience
            </h2>
            <div style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-main)', opacity: 0.9 }}>
              {data.experience.split('\n').map((para, idx) => (
                <p key={idx} style={{ marginBottom: '16px' }}>{para}</p>
              ))}
            </div>
          </div>

          {/* MOBILE: Resources (appears after experience on mobile) */}
          {(data.resources?.length > 0 || data.externalLinks?.length > 0) && (
            <div className="sidebar-glass-card mobile-order-resources">
              <h4 className="sidebar-heading">Resources</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.resources?.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)', padding: '8px' }}>
                    <BookOpen size={14} color="var(--primary-neon)" /> {r}
                  </div>
                ))}
                {data.externalLinks?.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noreferrer" className="resource-link-item">
                    <DownloadCloud size={16} /> <span>{link.title || "Material"}</span> <ExternalLink size={12} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* AdSense - Mobile-First Placement (appears after resources) */}
          <div className="mobile-order-ad" style={{ order: 6.5 }}>
            <AdSenseAd
              adClient="ca-pub-9499544849301534"
              adSlot="4047001347"
              adFormat="auto"
              fullWidthResponsive={true}
            />
          </div>

          {/* Discussion */}
          <DiscussionSection reviewId={data.id} />
        </div>

        {/* DESKTOP SIDEBAR (hidden on mobile) */}
        <aside className="detail-sidebar">
          {/* Author Card */}
          <div className="sidebar-glass-card desktop-only">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e293b, #0f172a)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)' }}>
                {data.authorPhoto ? <img src={data.authorPhoto} alt="" style={{ width: '100%', borderRadius: '50%' }} /> : <User size={24} color="#94a3b8" />}
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: 'white' }}>{data.authorName}</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {data.gradYear !== "N/A" ? `Class of ${data.gradYear}` : "Student"}
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '12px', borderTop: '1px solid var(--glass-border)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Opportunity</span>
                <span style={{ fontWeight: '600', color: 'white' }}>{data.placementType}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Difficulty</span>
                <span style={{ fontWeight: '600', color: data.difficulty === 'Hard' ? '#ef4444' : data.difficulty === 'Medium' ? '#f59e0b' : '#22c55e' }}>{data.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          {data.technologies?.length > 0 && (
            <div className="sidebar-glass-card desktop-only">
              <h4 className="sidebar-heading">Tech Stack</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {data.technologies.map((t, i) => (
                  <span key={i} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {(data.resources?.length > 0 || data.externalLinks?.length > 0) && (
            <div className="sidebar-glass-card desktop-only">
              <h4 className="sidebar-heading">Resources</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.resources?.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)', padding: '8px' }}>
                    <BookOpen size={14} color="var(--primary-neon)" /> {r}
                  </div>
                ))}
                {data.externalLinks?.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noreferrer" className="resource-link-item">
                    <DownloadCloud size={16} /> <span>{link.title || "Material"}</span> <ExternalLink size={12} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </motion.div>
  );
}
