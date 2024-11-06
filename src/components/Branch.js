// src/components/Branch.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Branch.css'; 

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
                <li><Link to={`/branch/${branch}/4`}>Semester 4</Link></li>
                <li><Link to={`/branch/${branch}/5`}>Semester 5</Link></li>
                <li><Link to={`/branch/${branch}/6`}>Semester 6</Link></li>
                <li><Link to={`/branch/${branch}/7`}>Semester 7</Link></li>
                <li><Link to={`/branch/${branch}/8`}>Semester 8</Link></li>
            </>
        );
    }

    return (
        <div>
            {/* Headline Message Section */}
            <div className="headline-message">
                <div className="marquee-text">
                    Notes for the ECE (Electrical and Computer Engineering) and Civil Engineering streams are yet to be uploaded.
                    <span style={{ display: 'block', marginTop: '10px' }}></span>
                    Explore the notes for both the First Year and CSE (Computer Science Engineering) streams, along with the question banks, question papers, and many more.
                </div>
            </div>

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
