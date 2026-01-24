// src/components/ProjectReviews.js
import React, { useState, useEffect } from "react";
import { database, auth } from "../firebase";
import { ref, push, onValue, remove } from "firebase/database";
import { FaStar, FaTrashAlt, FaSearch, FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { motion } from "framer-motion";
import "./ProjectReviewsModern.css"; // CHANGED: Modern Dark Theme

const ProjectReviews = () => {
  const [reviewData, setReviewData] = useState({ name: "", project: "", review: "", rating: 0 });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("newest");
  const [search, setSearch] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const reviewsRef = ref(database, "project_reviews");
    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val()
        ? Object.entries(snapshot.val()).map(([id, value]) => ({ id, ...value }))
        : [];
      setReviews(data.reverse());
      if (data.length > 0) {
        const avg = data.reduce((a, b) => a + (b.rating || 0), 0) / data.length;
        setAvgRating(avg.toFixed(1));
      } else setAvgRating(0);
    });

    if (auth.currentUser && auth.currentUser.uid === "YOUR_ADMIN_UID") setIsAdmin(true);
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => setReviewData({ ...reviewData, [e.target.name]: e.target.value });

  const handleRating = (rate) => setReviewData((prev) => ({ ...prev, rating: rate }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return alert("❌ Please login to submit a review.");
    if (!reviewData.name || !reviewData.project || !reviewData.review || reviewData.rating === 0)
      return alert("⚠️ Fill all fields and rate your experience.");

    setLoading(true);
    try {
      await push(ref(database, "project_reviews"), {
        ...reviewData,
        timestamp: Date.now(),
        userId: auth.currentUser.uid,
      });
      setReviewData({ name: "", project: "", review: "", rating: 0 });
      alert("✅ Review submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await remove(ref(database, `project_reviews/${id}`));
      } catch (err) {
        alert("❌ Failed to delete review.");
      }
    }
  };

  const sorted = [...reviews].sort((a, b) =>
    sortType === "rating" ? b.rating - a.rating : b.timestamp - a.timestamp
  );

  const filtered = sorted.filter(
    (r) =>
      r.project.toLowerCase().includes(search.toLowerCase()) ||
      r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="reviews-section-pro">
      <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        ⭐ Project Reviews & Ratings
      </motion.h2>

      {/* Average Rating */}
      <div className="avg-rating-box sticky">
        <div className="avg-stars">
          {[1, 2, 3, 4, 5].map((i) => (
            <FaStar key={i} color={i <= avgRating ? "#facc15" : "#e2e8f0"} size={22} />
          ))}
        </div>
        <p><strong>{avgRating}</strong> / 5 based on {reviews.length} reviews</p>
      </div>

      {/* Review Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="review-form-pro"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <input name="name" value={reviewData.name} onChange={handleChange} placeholder="Your Name" required />
        <input name="project" value={reviewData.project} onChange={handleChange} placeholder="Project Title" required />
        <textarea
          name="review"
          value={reviewData.review}
          onChange={handleChange}
          placeholder="Share your experience..."
          required
        />

        {/* Rating Stars */}
        <div className="rating-stars-input">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.2 }}
              onMouseEnter={() => setHoverRating(i)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => handleRating(i)}
            >
              <FaStar size={28} color={i <= (hoverRating || reviewData.rating) ? "#facc15" : "#cbd5e1"} />
            </motion.div>
          ))}
        </div>

        <motion.button whileHover={{ scale: 1.05 }} className="submit-btn-pro" disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </motion.button>
      </motion.form>

      {/* Search & Sort */}
      <div className="reviews-controls">
        <div className="search-box">
          <FaSearch />
          <input
            placeholder="Search by project or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => setSortType(sortType === "newest" ? "rating" : "newest")}
          className="sort-btn-pro"
        >
          {sortType === "newest" ? (
            <>
              <FaSortAmountUp /> Sort by Rating
            </>
          ) : (
            <>
              <FaSortAmountDown /> Sort by Newest
            </>
          )}
        </button>
      </div>

      {/* Reviews Display */}
      <div className="reviews-grid-pro">
        {filtered.length === 0 ? (
          <p className="no-reviews-pro">No reviews found. Be the first to share your project experience!</p>
        ) : (
          filtered.map((r, idx) => (
            <motion.div
              key={r.id}
              className="review-card-pro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="review-header-pro">
                <h4>{r.project}</h4>
                <span>— {r.name}</span>
              </div>
              <div className="review-stars-pro">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FaStar key={i} size={18} color={r.rating >= i ? "#facc15" : "#e2e8f0"} />
                ))}
              </div>
              <p className="review-text-pro">"{r.review}"</p>
              {isAdmin && (
                <button className="delete-btn-pro" onClick={() => handleDelete(r.id)}>
                  <FaTrashAlt /> Delete
                </button>
              )}
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};

export default ProjectReviews;
