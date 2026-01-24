import React, { useState, useEffect } from "react";
import {
  ArrowLeft, Calendar, MapPin, Briefcase, Banknote, Terminal,
  CheckCircle, XCircle, Layers, User, MessageSquare, Send, BookOpen,
  DownloadCloud, FileText, ExternalLink, Lightbulb, Plus, Share2
} from "lucide-react";
import { motion } from "framer-motion";
import { auth, database } from "../firebase";
import { ref, push, onValue, serverTimestamp } from "firebase/database";
import "./PlacementModern.css"; // CHANGED: Modern CSS
import { useNavigate } from "react-router-dom"; // Added for navigation

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
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <MessageSquare size={20} className="text-accent" /> Discussion
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
        {comments.map(c => (
          <div key={c.id} style={{ background: 'rgba(0,0,0,0.02)', padding: '12px', borderRadius: '12px' }}>
            <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>{c.author}</strong>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-gray)' }}>{c.text}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Ask a question..."
          className="modern-input"
          style={{ padding: '10px 16px' }}
        />
        <button
          onClick={sendComment}
          style={{
            background: 'var(--pm-accent)', color: 'white', border: 'none',
            width: '44px', borderRadius: '12px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

/* ----------------- Detail View ----------------- */
export default function PlacementDetailView({ data, onBack }) {
  const navigate = useNavigate(); // Hook for navigation
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="placement-content-wrapper"
      style={{ paddingTop: '40px' }}
    >
      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <button
          onClick={onBack}
          style={{
            background: 'white', border: 'none', padding: '10px 20px', borderRadius: '100px',
            display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
        >
          <ArrowLeft size={18} /> Back
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate('/share-experience')}
            style={{
              background: 'var(--pm-accent)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '100px',
              display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', cursor: 'pointer',
              boxShadow: '0 4px 12px var(--pm-accent-glow)'
            }}
          >
            <Plus size={18} /> Share Yours
          </button>
        </div>
      </div>

      <div className="detail-sticky-container">
        {/* MAIN CONTENT */}
        <div className="detail-main-col">
          {/* Header Card */}
          <div className="detail-glass-panel" style={{ marginBottom: '30px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div className="company-logo-placeholder" style={{ width: '64px', height: '64px', fontSize: '2rem', marginBottom: '20px' }}>
                {data.company[0]}
              </div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '900', lineHeight: 1.1, marginBottom: '10px' }}>{data.company}</h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-gray)', fontWeight: '500', marginBottom: '24px' }}>{data.role}</p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <span className={`status-pill ${data.status.toLowerCase()}`}>
                  {data.status === 'Selected' ? <CheckCircle size={14} /> : <XCircle size={14} />} {data.status}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-gray)' }}>
                  <Calendar size={16} /> {data.dateObj.toLocaleDateString()}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-gray)' }}>
                  <MapPin size={16} /> {data.location}
                </span>
              </div>
            </div>
          </div>

          {/* Rounds */}
          <div className="detail-glass-panel" style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Layers className="text-accent" /> Selection Rounds
            </h2>
            <div style={{ position: 'relative', paddingLeft: '20px', borderLeft: '2px solid rgba(0,0,0,0.05)' }}>
              {data.rounds.map((r, i) => (
                <div key={i} style={{ marginBottom: '30px', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: '-29px', top: '0', width: '16px', height: '16px',
                    background: 'var(--pm-accent)', borderRadius: '50%', border: '4px solid white',
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.1)'
                  }}></div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>{r.title || `Round ${i + 1}`}</h3>
                  <p style={{ lineHeight: 1.6, color: 'var(--text-gray)' }}>{r.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Text */}
          <div className="detail-glass-panel">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileText className="text-accent" /> Overall Experience
            </h2>
            <div style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-dark)' }}>
              {data.experience.split('\n').map((para, idx) => (
                <p key={idx} style={{ marginBottom: '16px' }}>{para}</p>
              ))}
            </div>
          </div>

          {/* Discussion */}
          <DiscussionSection reviewId={data.id} />
        </div>

        {/* SIDEBAR */}
        <aside className="detail-sidebar">
          {/* Author Card */}
          <div className="detail-glass-panel" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {data.authorPhoto ? <img src={data.authorPhoto} alt="" style={{ width: '100%', borderRadius: '50%' }} /> : <User size={24} color="#64748B" />}
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '700' }}>{data.authorName}</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-gray)' }}>
                  {data.gradYear !== "N/A" ? `Class of ${data.gradYear}` : "Student"}
                </p>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-gray)' }}>CTC</span>
                <span style={{ fontWeight: '700' }}>{data.ctc}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-gray)' }}>Type</span>
                <span style={{ fontWeight: '700' }}>{data.placementType}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-gray)' }}>Difficulty</span>
                <span style={{ fontWeight: '700' }}>{data.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          {data.technologies?.length > 0 && (
            <div className="detail-glass-panel" style={{ padding: '30px' }}>
              <h4 style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: '700' }}>Tech Stack</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {data.technologies.map((t, i) => (
                  <span key={i} style={{ background: 'rgba(0,0,0,0.05)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {(data.resources?.length > 0 || data.externalLinks?.length > 0) && (
            <div className="detail-glass-panel" style={{ padding: '30px' }}>
              <h4 style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: '700' }}>Resources</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {data.resources?.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <BookOpen size={14} color="var(--pm-accent)" /> {r}
                  </div>
                ))}
                {data.externalLinks?.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--pm-accent)', textDecoration: 'none', fontWeight: '600' }}>
                    <DownloadCloud size={14} /> {link.title || "Material"} <ExternalLink size={12} />
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
