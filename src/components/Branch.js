// src/components/Branch.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AdSenseAd from './AdSenseAd'; 
import './Branch.css'; 

function Branch() {
    const { branch } = useParams();

    // Determine semester links based on the branch
    const semesters = branch === 'first-year' 
        ? ['1', '2'] 
        : ['3', '4', '5', '6'];

    return (
        <div>
            {/* Headline Message Section */}
            <div className="headline-message">
                <div className="marquee-text">
                    <span style={{ display: 'block', marginTop: '10px' }}></span>
                    Explore the notes for both the First Year and CSE (Computer Science Engineering) streams, along with the question banks, question papers, and many more.
                </div>
            </div>

            {/* Branch Section */}
            <div className="branch">
                <h2>{branch.toUpperCase()} NOTES</h2>
                <p>Select a semester:</p>
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
        </div>
    );
}

export default Branch;
