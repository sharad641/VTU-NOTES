import React, { useState, useEffect } from 'react';
import { database } from '../firebase'; // Adjust the path to your Firebase configuration
import { ref, push, onValue } from 'firebase/database';
import './CommentSection.css';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [userName, setUserName] = useState('');
  const [replyText, setReplyText] = useState('');
  const [isReplyingTo, setIsReplyingTo] = useState({ commentId: null, replyKey: null });
  const [showAllComments, setShowAllComments] = useState(false);

  // Fetch comments from Firebase
  useEffect(() => {
    const commentsRef = ref(database, 'comments');
    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedComments = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setComments(fetchedComments);
      } else {
        setComments([]);
      }
    });
  }, []);

  // Add a new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim() === '') {
      alert('Your comment cannot be empty.');
      return;
    }

    try {
      const commentsRef = ref(database, 'comments');
      await push(commentsRef, {
        text: commentText.trim(),
        author: userName.trim() || 'Anonymous',
        timestamp: Date.now(),
        replies: {},
      });
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Add a reply
  const handleReplySubmit = async (commentId, replyKey = null) => {
    if (replyText.trim() === '') {
      alert('Your reply cannot be empty.');
      return;
    }

    try {
      const basePath = replyKey
        ? `comments/${commentId}/replies/${replyKey}/replies`
        : `comments/${commentId}/replies`;
      const replyRef = ref(database, basePath);

      await push(replyRef, {
        text: replyText.trim(),
        author: userName.trim() || 'Anonymous',
        timestamp: Date.now(),
        replies: {},
      });

      setReplyText('');
      setIsReplyingTo({ commentId: null, replyKey: null });
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  // Render replies recursively
  const renderReplies = (replies, parentPath, parentCommentId) => {
    if (!replies || typeof replies !== 'object') return null;

    return Object.entries(replies).map(([key, reply]) => {
      const replyPath = `${parentPath}/replies/${key}`;

      return (
        <div key={key} className="reply-card">
          <strong>{reply.author}</strong>
          <span className="timestamp">{new Date(reply.timestamp).toLocaleString()}</span>
          <p className="reply-text">{reply.text}</p>

          <button
            className="reply-btn"
            onClick={() => setIsReplyingTo({ commentId: parentCommentId, replyKey: key })}
          >
            Reply
          </button>

          {isReplyingTo.commentId === parentCommentId && isReplyingTo.replyKey === key && (
            <div className="reply-form">
              <textarea
                className="reply-textarea"
                placeholder="Write your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button
                className="submit-reply-btn"
                onClick={() => handleReplySubmit(parentCommentId, key)}
              >
                Submit Reply
              </button>
            </div>
          )}

          {renderReplies(reply.replies, replyPath, parentCommentId)}
        </div>
      );
    });
  };

  return (
    <div className="comment-section-container11">
      <header className="header1">
        <h2 className="section-title">Share Your Thoughts</h2>
        <p className="intro-paragraph">
          Have thoughts about our website? We’d love to hear from you!
          Share your comments, suggestions, or experiences to help us improve and serve you better.
        </p>
      </header>

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input
          type="text"
          className="comment-author"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <textarea
          className="comment-textarea"
          placeholder="Share Your Thoughts..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type="submit" className="submit-btn">Leave a Comment</button>
      </form>

      {/* Comments */}
      {comments
        .slice(0, showAllComments ? comments.length : 1)
        .map((comment) => (
          <div key={comment.id} className="comment-card">
            <div className="comment-header">
              <strong>{comment.author}</strong>
              <span className="timestamp">{new Date(comment.timestamp).toLocaleString()}</span>
              <button
                className="reply-btn"
                onClick={() => setIsReplyingTo({ commentId: comment.id, replyKey: null })}
              >
                Reply
              </button>
            </div>
            <p className="comment-text">{comment.text}</p>

            {renderReplies(comment.replies, `comments/${comment.id}`, comment.id)}

            {isReplyingTo.commentId === comment.id && isReplyingTo.replyKey === null && (
              <div className="reply-form">
                <textarea
                  className="reply-textarea"
                  placeholder="Write your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
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

      {/* Toggle Comments */}
      {comments.length > 1 && (
        <button
          className="toggle-comments-btn"
          onClick={() => setShowAllComments(!showAllComments)}
        >
          {showAllComments ? 'Hide Comments' : `View All Comments (${comments.length - 1})`}
        </button>
      )}
    </div>
  );
};

export default CommentSection;
