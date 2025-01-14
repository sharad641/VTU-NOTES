// src/components/Branch.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Branch.css'; 
import AdSenseAd from './AdSenseAd'; // Import AdSenseAd Component

function Branch() {
    const { branch } = useParams();

    // Determine semester links based on the branch
    let semesterLinks;

    if (branch === 'first-year') {
        semesterLinks = (
            <>
                <li><Link to={`/branch/${branch}/1`}>Semester 1</Link></li>
                <li><Link to={`/branch/${branch}/2`}>Semester 2</Link></li>
            </>
        );
    } else {
        semesterLinks = (
            <>
                <li><Link to={`/branch/${branch}/3`}>Semester 3</Link></li>
                 {/* AdSense Ad - Above the PDF Viewer */}
                            <AdSenseAd adClient="ca-pub-9499544849301534" adSlot="3936951010" />
                <li><Link to={`/branch/${branch}/4`}>Semester 4</Link></li>
                <li><Link to={`/branch/${branch}/5`}>Semester 5</Link></li>
               
            </>
        );
    }

    return (
        <div>
            {/* Headline Message Section */}
            <div className="headline-message">
                <div className="marquee-text">
                    
                    <span style={{ display: 'block', marginTop: '10px' }}></span>
                    Explore the notes for both the First Year and CSE (Computer Science Engineering) streams, along with the question banks, question papers, and many more.
                </div>
            </div>
             {/* AdSense Ad - Above the PDF Viewer */}
                        <AdSenseAd adClient="ca-pub-9499544849301534" adSlot="3936951010" />

            {/* Branch Section */}
            <div className="branch" style={{ marginTop: '20px' }}>
                <h2>{branch.toUpperCase()} NOTES</h2>
                <p>Select a semester:</p>
                <ul>
                    {semesterLinks}
                </ul>
                 
                            
            </div>
        </div>
    );
}

export default Branch;
