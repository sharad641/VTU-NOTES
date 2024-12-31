import React, { useState, useEffect } from 'react';
import { database } from '../firebase'; // Adjust the path
import { ref, push, onValue } from 'firebase/database';
import './CommentSection.css';

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
      const commentsRef = ref(database, 'commentsall'); // Use 'commentsall'
      await push(commentsRef, {
        text: commentText.trim(),
        author: 'Anonymous', // You can modify this based on your needs
        timestamp: Date.now(),
      });
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="comment-section">
      <div className="comment-form">
        <textarea
          className="comment-textarea"
          placeholder="Write your comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button className="submit-comment-btn" onClick={handleCommentSubmit}>
          Submit Comment
        </button>
      </div>

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <div className="comment-header">
              <strong>{comment.author || 'Unknown Author'}</strong>
              <span className="timestamp">{new Date(comment.timestamp).toLocaleString()}</span>
            </div>

            <p className="comment-text">{comment.text || 'No comment text available.'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
