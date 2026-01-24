import React, { useState, useEffect } from 'react';
import { database } from '../firebase'; // Adjust the path
import { ref, push, onValue } from 'firebase/database';
import { FaPaperPlane, FaUserCircle } from 'react-icons/fa';
import './CommentModern.css'; // CHANGED: Modern CSS with high contrast

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  // Fetch comments from Firebase
  useEffect(() => {
    const commentsRef = ref(database, 'commentsall'); // Use 'commentsall'
    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedComments = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        })).sort((a, b) => b.timestamp - a.timestamp); // Sort newest first
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
      const commentsRef = ref(database, 'commentsall'); // Use 'commentsall'
      await push(commentsRef, {
        text: commentText.trim(),
        author: 'Student Scholar', // Default name
        timestamp: Date.now(),
      });
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="comment-section-modern">
      <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', fontWeight: '700' }}>Discussion & Doubts</h3>

      <div className="comment-input-card">
        <textarea
          className="comment-textarea-modern"
          placeholder="Ask a question or share your thoughts..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button className="comment-btn-primary" onClick={handleCommentSubmit}>
          <FaPaperPlane /> Post Comment
        </button>
      </div>

      <div className="comments-list-modern">
        {comments.length > 0 ? comments.map((comment) => (
          <div key={comment.id} className="comment-card-modern">
            <div className="comment-header-modern">
              <div className="comment-author-modern">
                <div className="comment-author-avatar">
                  {(comment.author || 'U').charAt(0)}
                </div>
                <span>{comment.author || 'Anonymous'}</span>
              </div>
              <span className="comment-date-modern">{new Date(comment.timestamp).toLocaleDateString()}</span>
            </div>

            <p className="comment-body-modern">{comment.text || 'No content.'}</p>
          </div>
        )) : (
          <div style={{ textAlign: 'center', color: '#94A3B8', padding: '20px' }}>
            No comments yet. Be the first to start the discussion!
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
