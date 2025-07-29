import React, { useState, useEffect, useRef } from 'react';
import { database, auth } from '../firebase';
import { ref, push, onValue, remove } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import './CommentSection.css';

const ADMIN_EMAIL = "sp1771838@gmail.com";

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
  const commentFormRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUserEmail(user?.email || null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const commentsRef = ref(database, 'comments');
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedComments = Object.keys(data)
          .map((key) => ({ id: key, ...data[key] }))
          .sort((a, b) => b.timestamp - a.timestamp);
        setComments(fetchedComments);
      } else {
        setComments([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !email.trim()) {
      alert('Both email and comment text are required.');
      return;
    }
    try {
      const commentsRef = ref(database, 'comments');
      await push(commentsRef, {
        text: commentText.trim(),
        author: userName.trim() || 'Anonymous',
        email: email.trim(),
        timestamp: Date.now(),
        replies: {},
      });
      setCommentText('');
      setUserName('');
      setEmail('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('An error occurred while adding your comment.');
    }
  };

  const handleReplySubmit = async (commentId, replyKey = null) => {
    if (currentUserEmail !== ADMIN_EMAIL) {
      alert('Only the admin can reply to comments.');
      return;
    }
    if (!replyText.trim()) {
      alert('Reply text is required.');
      return;
    }
    try {
      const basePath = replyKey
        ? `comments/${commentId}/replies/${replyKey}/replies`
        : `comments/${commentId}/replies`;
      const replyRef = ref(database, basePath);
      await push(replyRef, {
        text: replyText.trim(),
        author: "Admin",
        email: ADMIN_EMAIL,
        timestamp: Date.now(),
        replies: {},
      });
      setReplyText('');
      setIsReplyingTo({ commentId: null, replyKey: null });
    } catch (error) {
      console.error('Error adding reply:', error);
      alert('An error occurred while adding your reply.');
    }
  };

  const handleDelete = async (path) => {
    if (currentUserEmail !== ADMIN_EMAIL) return;
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      const commentRef = ref(database, path);
      await remove(commentRef);
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('An error occurred while deleting this comment.');
    }
  };

  const toggleReplies = (id) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderAvatar = (author, isAdmin) => {
    const initials = author ? author.charAt(0).toUpperCase() : "U";
    const bg = isAdmin ? "#2563eb" : "#6b7280";
    return (
      <div className="avatar" style={{ backgroundColor: bg }}>
        {initials}
      </div>
    );
  };

  const renderReplies = (replies, parentPath, parentCommentId) => {
    if (!replies || typeof replies !== 'object') return null;

    return Object.entries(replies)
      .sort(([, a], [, b]) => b.timestamp - a.timestamp)
      .map(([key, reply]) => {
        const replyPath = `${parentPath}/replies/${key}`;
        const replyId = `${parentCommentId}-${key}`;
        const isExpanded = expandedReplies[replyId] || false;

        return (
          <div key={key} className="reply-card">
            <div className="comment-header">
              {renderAvatar(reply.author, reply.email === ADMIN_EMAIL)}
              <div>
                <strong>{reply.author}</strong>
                <span className="timestamp">{new Date(reply.timestamp).toLocaleString()}</span>
              </div>
              {currentUserEmail === ADMIN_EMAIL && (
                <>
                  <button
                    className="reply-btn"
                    onClick={() => setIsReplyingTo({ commentId: parentCommentId, replyKey: key })}
                  >
                    Reply
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(replyPath)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
            <p className="reply-text">{reply.text}</p>

            {reply.replies && Object.keys(reply.replies).length > 0 && (
              <button className="toggle-replies-btn" onClick={() => toggleReplies(replyId)}>
                {isExpanded ? "Hide Replies" : `View Replies (${Object.keys(reply.replies).length})`}
              </button>
            )}

            {isExpanded && renderReplies(reply.replies, replyPath, parentCommentId)}

            {isReplyingTo.commentId === parentCommentId && isReplyingTo.replyKey === key && currentUserEmail === ADMIN_EMAIL && (
              <div className="reply-form">
                <textarea
                  className="reply-textarea"
                  placeholder="Write your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  required
                />
                <button
                  className="submit-reply-btn"
                  onClick={() => handleReplySubmit(parentCommentId, key)}
                >
                  Submit Reply
                </button>
              </div>
            )}
          </div>
        );
      });
  };

  return (
    <div className="comment-section-container">
      <header className="header">
        <h2 className="section-title">💬 Need Any VTU Notes or Help?</h2>
        <p className="intro-paragraph">
          Looking for a specific subject's notes? Have feedback or suggestions? Drop your comments below – we’ll get back to you!
        </p>
      </header>

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="comment-form" ref={commentFormRef}>
        <input
          type="text"
          className="comment-author"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          className="comment-email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          className="comment-textarea"
          placeholder="Share your message, suggestions, or note request..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        />
        <button type="submit" className="submit-btn">📝 Post Comment</button>
      </form>

      {/* Comment List */}
      {comments
        .slice(0, showAllComments ? comments.length : 30)
        .map((comment) => (
          <div key={comment.id} className="comment-card">
            <div className="comment-header">
              {renderAvatar(comment.author, comment.email === ADMIN_EMAIL)}
              <div>
                <strong>{comment.author}</strong>
                <span className="timestamp">{new Date(comment.timestamp).toLocaleString()}</span>
              </div>
              {currentUserEmail === ADMIN_EMAIL && (
                <>
                  <button
                    className="reply-btn"
                    onClick={() => setIsReplyingTo({ commentId: comment.id, replyKey: null })}
                  >
                    Reply
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(`comments/${comment.id}`)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
            <p className="comment-text">{comment.text}</p>
            {renderReplies(comment.replies, `comments/${comment.id}`, comment.id)}
            {isReplyingTo.commentId === comment.id && isReplyingTo.replyKey === null && currentUserEmail === ADMIN_EMAIL && (
              <div className="reply-form">
                <textarea
                  className="reply-textarea"
                  placeholder="Write your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  required
                />
                <button
                  className="submit-reply-btn"
                  onClick={() => handleReplySubmit(comment.id)}
                >
                  Submit Reply
                </button>
              </div>
            )}
          </div>
        ))}
      {comments.length > 30 && (
        <button
          className="toggle-comments-btn"
          onClick={() => setShowAllComments(!showAllComments)}
        >
          {showAllComments ? '🔽 Hide Comments' : `🔼 View All Comments (${comments.length - 30})`}
        </button>
      )}
    </div>
  );
};

export default CommentSection;
