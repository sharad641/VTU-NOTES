// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS for styling

function Home() {
  return (
    <div className="home-container" style={{ marginTop: '80px' }}>
      <h1 className="home-header">VTU Engineering Notes</h1>
      
      <div className="courses-section"> {/* Use the new courses section class */}
        <div className="course-card">
          <Link to="/branch/cse">Computer Science Engineering</Link>
        </div>
        <div className="course-card">
          <Link to="/branch/ece">Electronics and Communication</Link>
        </div>
        <div className="course-card">
          <Link to="/branch/mech">Mechanical Engineering</Link>
        </div>
        <div className="course-card">
          <Link to="/branch/civil">Civil Engineering</Link>
        </div>
        {/* Add more branches as needed */}
      </div>
    </div>
  );
}

export default Home;
