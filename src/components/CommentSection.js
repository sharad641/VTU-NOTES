import React, { useState, useEffect } from 'react';
import { database, auth } from '../firebase';
import { ref, push, onValue, remove, update } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import {
  FaPaperPlane, FaReply, FaTrash, FaThumbtack,
  FaUser, FaShieldAlt
} from 'react-icons/fa';
import './CommentSectionModern.css'; // CHANGED: Modern Dark Theme

const ADMIN_EMAIL = "sp1771838@gmail.com";
const EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "👎"];

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }) +
    " • " +
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

// 🎨 Helper: Generate unique color from name
const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
};

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [replyText, setReplyText] = useState('');
  const [isReplyingTo, setIsReplyingTo] = useState({ commentId: null, replyKey: null });
  const [showAllComments, setShowAllComments] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [expandedReplies, setExpandedReplies] = useState({});
  const [loading, setLoading] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setCurrentUserEmail(user?.email || null));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const commentsRef = ref(database, 'comments');
    return onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedComments = Object.keys(data)
          .map((key) => ({ id: key, ...data[key] }))
          .sort((a, b) => b.pinned - a.pinned || b.timestamp - a.timestamp);
        setComments(fetchedComments);
      } else setComments([]);
      setLoading(false);
    });
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedText = commentText.trim();
    if (!trimmedText || !validateEmail(trimmedEmail)) return alert('Invalid details.');

    try {
      await push(ref(database, 'comments'), {
        text: trimmedText,
        author: userName.trim() || 'Anonymous',
        email: trimmedEmail,
        timestamp: Date.now(),
        replies: {},
        reactions: {},
        pinned: false
      });
      setCommentText(''); setUserName(''); setEmail('');
    } catch (error) { console.error(error); }
  };

  const handleReplySubmit = async (commentId, replyKey = null) => {
    if (currentUserEmail !== ADMIN_EMAIL) return alert('Admin access required.');
    if (!replyText.trim()) return;

    const path = replyKey ? `comments/${commentId}/replies/${replyKey}/replies` : `comments/${commentId}/replies`;
    try {
      await push(ref(database, path), {
        text: replyText.trim(),
        author: "Admin",
        email: ADMIN_EMAIL,
        timestamp: Date.now(),
        pinned: false
      });
      setReplyText(''); setIsReplyingTo({ commentId: null, replyKey: null });
    } catch (error) { console.error(error); }
  };

  const handleDelete = async (path) => {
    if (currentUserEmail !== ADMIN_EMAIL) return;
    if (window.confirm("Delete this comment?")) await remove(ref(database, path));
  };

  const handlePin = async (path, currentPinned) => {
    if (currentUserEmail !== ADMIN_EMAIL) return;
    await update(ref(database, path), { pinned: !currentPinned });
  };

  const handleReaction = async (path, emoji) => {
    if (!currentUserEmail) { setShowLoginPopup(true); return; }
    const userKey = currentUserEmail.replace('.', '_');
    await update(ref(database, path + `/reactions/${userKey}`), { emoji });
  };

  const toggleReplies = (id) => setExpandedReplies(prev => ({ ...prev, [id]: !prev[id] }));

  // ✨ Modern Avatar Renderer
  const renderAvatar = (author, isAdmin) => {
    const initials = author ? author.charAt(0).toUpperCase() : "U";
    const bgColor = isAdmin ? "#2563eb" : stringToColor(author || "User");
    return (
      <div className="avatar" style={{ backgroundColor: bgColor }}>
        {isAdmin && <FaShieldAlt className="avatar-badge" />}
        {initials}
      </div>
    );
  };

  const renderReplies = (replies, parentPath, parentCommentId) => {
    if (!replies) return null;
    return Object.entries(replies)
      .sort(([, a], [, b]) => b.pinned - a.pinned || b.timestamp - a.timestamp)
      .map(([key, reply]) => {
        const replyPath = `${parentPath}/replies/${key}`;
        const replyId = `${parentCommentId}-${key}`;
        const isExpanded = expandedReplies[replyId];
        const isAdmin = reply.email === ADMIN_EMAIL;

        return (
          <div key={key} className={`reply-tree ${reply.pinned ? 'reply-pinned' : ''}`}>
            <div className="tree-line"></div>

            <div className="reply-card-modern">
              <div className="reply-header">
                {renderAvatar(reply.author, isAdmin)}
                <div className="meta-info">
                  <span className={`author-name ${isAdmin ? 'admin-highlight' : ''}`}>
                    {reply.author} {isAdmin && <span className="admin-tag">MOD</span>}
                  </span>
                  <span className="comment-time">{formatDate(reply.timestamp)}</span>
                </div>
                {currentUserEmail === ADMIN_EMAIL && (
                  <div className="mod-controls">
                    <FaReply onClick={() => setIsReplyingTo({ commentId: parentCommentId, replyKey: key })} title="Reply" />
                    <FaThumbtack onClick={() => handlePin(replyPath, reply.pinned)} className={reply.pinned ? 'active' : ''} />
                    <FaTrash onClick={() => handleDelete(replyPath)} className="danger" />
                  </div>
                )}
              </div>

              <div className="comment-content">{reply.text}</div>

              {/* Reactions */}
              {isAdmin && (
                <div className="reactions-row">
                  {EMOJIS.map(emoji => {
                    const count = reply.reactions ? Object.values(reply.reactions).filter(r => r.emoji === emoji).length : 0;
                    return <span key={emoji} className="reaction-pill" onClick={() => handleReaction(replyPath, emoji)}>{emoji} {count > 0 && count}</span>
                  })}
                </div>
              )}

              {/* View More Replies */}
              {reply.replies && (
                <button className="view-replies-link" onClick={() => toggleReplies(replyId)}>
                  {isExpanded ? "Hide" : `View ${Object.keys(reply.replies).length} replies`}
                </button>
              )}
            </div>

            {isExpanded && <div className="nested-level">{renderReplies(reply.replies, replyPath, parentCommentId)}</div>}

            {/* Inline Reply Box */}
            {isReplyingTo.commentId === parentCommentId && isReplyingTo.replyKey === key && currentUserEmail === ADMIN_EMAIL && (
              <div className="inline-reply-box">
                <input type="text" value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Write a reply..." autoFocus />
                <button onClick={() => handleReplySubmit(parentCommentId, key)}><FaPaperPlane /></button>
              </div>
            )}
          </div>
        );
      });
  };

  return (
    <section className="discussion-section">
      <div className="ds-container">

        {/* Header */}
        <div className="ds-header">
          <h2>Discussion <span className="highlight">Forum</span></h2>
          <p>Ask questions, share notes, or connect with peers.</p>
        </div>

        {/* Create Post */}
        <div className="create-post-card">
          <div className="cp-header">
            <div className="fake-avatar"><FaUser /></div>
            <input type="text" placeholder="Your Name" value={userName} onChange={e => setUserName(e.target.value)} />
            <input type="email" placeholder="Email (Private)" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <textarea
            placeholder="What's on your mind?"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
          />
          <div className="cp-footer">
            <button className="post-btn" onClick={handleCommentSubmit}>
              Post Comment <FaPaperPlane />
            </button>
          </div>
        </div>

        {/* Feed */}
        <div className="discussion-feed">
          {loading ? <div className="loader">Loading...</div> :
            comments.slice(0, showAllComments ? comments.length : 8).map(comment => {
              const isAdmin = comment.email === ADMIN_EMAIL;
              return (
                <div key={comment.id} className={`main-comment ${comment.pinned ? 'pinned-highlight' : ''}`}>
                  {comment.pinned && <div className="pin-banner"><FaThumbtack /> Pinned by Admin</div>}

                  <div className="mc-body">
                    <div className="mc-left">
                      {renderAvatar(comment.author, isAdmin)}
                    </div>
                    <div className="mc-right">
                      <div className="mc-meta">
                        <span className={`mc-author ${isAdmin ? 'admin-text' : ''}`}>
                          {comment.author} {isAdmin && <FaShieldAlt title="Admin" />}
                        </span>
                        <span className="mc-date">{formatDate(comment.timestamp)}</span>
                      </div>
                      <div className="mc-text">{comment.text}</div>

                      {/* Action Bar */}
                      <div className="mc-actions">
                        {isAdmin && (
                          <div className="emoji-dock">
                            {EMOJIS.map(emoji => (
                              <button key={emoji} onClick={() => handleReaction(`comments/${comment.id}`, emoji)}>{emoji}</button>
                            ))}
                          </div>
                        )}
                        {currentUserEmail === ADMIN_EMAIL && (
                          <>
                            <button onClick={() => setIsReplyingTo({ commentId: comment.id, replyKey: null })} className="act-btn">Reply</button>
                            <button onClick={() => handlePin(`comments/${comment.id}`, comment.pinned)} className="act-btn">{comment.pinned ? 'Unpin' : 'Pin'}</button>
                            <button onClick={() => handleDelete(`comments/${comment.id}`)} className="act-btn danger">Delete</button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Replies Area */}
                  <div className="replies-zone">
                    {renderReplies(comment.replies, `comments/${comment.id}`, comment.id)}
                  </div>

                  {/* Main Reply Input */}
                  {isReplyingTo.commentId === comment.id && isReplyingTo.replyKey === null && (
                    <div className="main-reply-input">
                      <input value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Reply as Admin..." autoFocus />
                      <button onClick={() => handleReplySubmit(comment.id)}>Send</button>
                    </div>
                  )}
                </div>
              )
            })
          }
        </div>

        {comments.length > 8 && (
          <button className="load-more" onClick={() => setShowAllComments(!showAllComments)}>
            {showAllComments ? "Show Less" : "Load More Comments"}
          </button>
        )}

      </div>

      {showLoginPopup && (
        <div className="auth-modal">
          <div className="auth-box">
            <h3>🔒 Login Required</h3>
            <p>Please login to interact.</p>
            <button onClick={() => window.location.href = '/login'}>Login Now</button>
            <button className="close" onClick={() => setShowLoginPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CommentSection;