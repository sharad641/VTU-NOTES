import { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, query, orderByChild, limitToLast, onValue, off } from 'firebase/database';

export const usePlacementReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Optimization: Only fetch the last 50 reviews to keep the site fast
    const reviewsRef = query(
        ref(database, 'placement_reviews'), 
        orderByChild('createdAt'), 
        limitToLast(50)
    );

    const listener = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert to array and reverse (Newest First)
        const loadedReviews = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).reverse(); 
        
        setReviews(loadedReviews);
      } else {
        setReviews([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching data:", error);
      setLoading(false);
    });

    return () => off(reviewsRef, 'value', listener);
  }, []);

  return { reviews, loading };
};