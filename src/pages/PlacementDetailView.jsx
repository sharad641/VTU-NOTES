import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Briefcase,
  Banknote,
  Terminal,
  CheckCircle,
  XCircle,
  Layers,
  User,
  MessageSquare,
  Send
} from "lucide-react";
import { motion } from "framer-motion";
import { auth, database } from "../firebase";
import { ref, push, onValue, serverTimestamp } from "firebase/database";
import "./PlacementSection.css";

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
    <div className="discussion-wrapper">
      <h3>
        <MessageSquare size={18} /> Discussion
      </h3>

      {comments.map(c => (
        <div key={c.id} className="comment-bubble">
          <div className="comment-avatar">
            <User size={14} />
          </div>
          <div className="comment-body">
            <strong>{c.author}</strong>
            <p>{c.text}</p>
          </div>
        </div>
      ))}

      <div className="comment-input-box">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Ask a question..."
        />
        <button className="btn-send" onClick={sendComment}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

/* ----------------- Detail View ----------------- */
export default function PlacementDetailView({ data, onBack }) {
  if (!data) return null;

  return (
    <motion.div className="detail-overlay">
      <div className="detail-navbar">
        <div className="nav-max-width">
          <button className="nav-btn-back" onClick={onBack}>
            <ArrowLeft size={16} /> Back
          </button>
          <span>{data.minRead} min read</span>
        </div>
      </div>

      <div className="detail-container">
        <div className="detail-layout">
          {/* MAIN */}
          <div className="detail-main">
            <div className="article-header">
              <div className="company-logo-xl">
                {data.company[0]}
              </div>
              <div>
                <h1>{data.company}</h1>
                <p>{data.role}</p>
                <div className="article-meta-row">
                  <span className={`status-badge-lg ${data.status}`}>
                    {data.status === "Selected"
                      ? <CheckCircle size={14} />
                      : <XCircle size={14} />}
                    {data.status}
                  </span>
                  <span><Calendar size={14} /> {data.dateObj.toLocaleDateString()}</span>
                  <span><MapPin size={14} /> {data.location}</span>
                </div>
              </div>
            </div>

            <h2><Layers size={18} /> Selection Process</h2>
            {data.rounds.map((r, i) => (
              <div key={i} className="timeline-item">
                <strong>{r.title || `Round ${i + 1}`}</strong>
                <p>{r.description}</p>
              </div>
            ))}

            <DiscussionSection reviewId={data.id} />
          </div>

          {/* SIDEBAR */}
          <aside className="detail-sidebar">
            <div className="sidebar-card">
              <User size={16} /> {data.authorName}
            </div>

            <div className="sidebar-card">
              <p><Briefcase size={14} /> {data.placementType}</p>
              <p><Banknote size={14} /> {data.ctc}</p>
              <p><Terminal size={14} /> {data.difficulty}</p>
            </div>

            {data.technologies?.length > 0 && (
              <div className="sidebar-card">
                <div className="card-label">Tech Stack</div>
                <div className="tech-tags">
                  {data.technologies.map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </motion.div>
  );
}
