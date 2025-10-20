// src/components/ProjectReviews.js
import React, { useState, useEffect } from 'react';
import { database, auth } from '../firebase';
import { ref, push, onValue, remove } from 'firebase/database';
import { FaStar, FaTrashAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './ProjectReviews.css';

const ProjectReviews = () => {
  const [reviewData, setReviewData] = useState({
    name: '',
    project: '',
    review: '',
    rating: 0,
  });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // simple admin flag

  useEffect(() => {
    const reviewsRef = ref(database, 'project_reviews');

    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val()
        ? Object.entries(snapshot.val())
            .map(([id, value]) => ({ id, ...value }))
            .reverse()
        : [];
      setReviews(data);
    });

    // Set admin based on auth UID
    if (auth.currentUser && auth.currentUser.uid === 'YOUR_ADMIN_UID') {
      setIsAdmin(true);
    }

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (rate) => setReviewData((prev) => ({ ...prev, rating: rate }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return alert('❌ You must be logged in to submit a review.');
    if (!reviewData.name || !reviewData.project || !reviewData.review || reviewData.rating === 0) {
      return alert('⚠️ Please fill all fields and select a rating.');
    }

    setLoading(true);
    try {
      const reviewsRef = ref(database, 'project_reviews');
      await push(reviewsRef, {
        ...reviewData,
        timestamp: Date.now(),
        userId: auth.currentUser.uid,
      });
      setReviewData({ name: '', project: '', review: '', rating: 0 });
    } catch (err) {
      console.error(err);
      alert('❌ Something went wrong while submitting your review.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await remove(ref(database, `project_reviews/${id}`));
      } catch (err) {
        console.error(err);
        alert('❌ Failed to delete the review.');
      }
    }
  };

  return (
    <section className="project-reviews-section">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📝 Project Reviews
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="review-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <input
          type="text"
          name="name"
          value={reviewData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          type="text"
          name="project"
          value={reviewData.project}
          onChange={handleChange}
          placeholder="Project Name"
          required
        />
        <textarea
          name="review"
          value={reviewData.review}
          onChange={handleChange}
          placeholder="Write your review..."
          required
        />

        <div className="rating">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.3, rotate: -10 }}
              onClick={() => handleRating(i)}
              role="button"
              aria-label={`Rate ${i} stars`}
              tabIndex={0}
            >
              <FaStar
                size={24}
                className={`star ${reviewData.rating >= i ? 'active' : ''}`}
                color={reviewData.rating >= i ? '#facc15' : '#e2e8f0'}
              />
            </motion.div>
          ))}
        </div>

        <motion.button
          type="submit"
          className="submit-review-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </motion.button>
      </motion.form>

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to share your experience!</p>
        ) : (
          <div className="reviews-grid">
            {reviews.map((r, idx) => (
              <motion.div
                key={r.id}
                className="review-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="review-header">
                  <h4>{r.project}</h4>
                  <span className="reviewer-name">- {r.name}</span>
                </div>
                <div className="review-rating">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FaStar key={i} size={18} color={r.rating >= i ? '#facc15' : '#e2e8f0'} />
                  ))}
                </div>
                <p className="review-text">{r.review}</p>
                {isAdmin && (
                  <button className="delete-review-btn" onClick={() => handleDelete(r.id)}>
                    <FaTrashAlt /> Delete
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectReviews;
