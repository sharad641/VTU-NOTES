// src/components/Branch.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AdSenseAd from './AdSenseAd'; 
import './Branch.css'; 
import CommentSection from './CommentSection';
import Breadcrumbs from './Breadcrumbs'; // 1. Import the Breadcrumbs component

function Branch() {
    const { branch } = useParams();

    // Determine semester links based on the branch
    const semesters = branch === 'first-year' 
        ? ['1', '2'] 
        : ['3', '4', '5', '6','7'];

    return (
        <div>
            {/* 2. Modern Navigation Path (Breadcrumbs) */}
            {/* Added marginTop to prevent it from hiding behind your fixed Navbar */}
            <div style={{ marginTop: '80px' }}> 
                <Breadcrumbs />
            </div>

            {/* Branch Section */}
            <div className="branch">
                <h2>{branch.toUpperCase()} NOTES</h2>
                
                <ul className="semester-list">
                    {semesters.map((sem) => (
                        <li key={sem}>
                            <Link to={`/branch/${branch}/${sem}`}>
                                <div className="semester-card">
                                    <span>Semester {sem}</span>
                                </div>
                                <div className="ad-container">
                                    <AdSenseAd
                                        adClient="ca-pub-9499544849301534"
                                        adSlot="7579321744"
                                        adFormat="auto"
                                        fullWidthResponsive={true}
                                    />
                                </div>     
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* 💬 Comments */}
            <CommentSection />
        </div>
    );
}

export default Branch;