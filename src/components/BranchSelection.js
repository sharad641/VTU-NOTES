// src/components/BranchSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BranchSelection.css';

function BranchSelection() {
    const navigate = useNavigate();

    const handleBranchClick = (branch) => {
        if (branch === 'first-year') {
            // Navigate to the 1st and 2nd semester routes
            navigate(`/branch/first-year`);
        } else {
            // Navigate to the selected stream's semester routes (3rd to 8th)
            navigate(`/branch/${branch}`);
        }
    };

    return (
        <div>
            {/* Headline Message Section */}
            <div className="headline-message">
                <div className="marquee-text">
                Notes for the ECE (Electrical and Computer Engineering) and Civil Engineering streams are yet to be uploaded.
                    <span style={{ display: 'block', marginTop: '10px' }}></span>
                    "Explore the notes for both the First Year and CSE (Computer Science Engineering) streams, along with the question banks,question papers And many more."
                </div>
            </div>

            {/* Main Content */}
            <div className="branch-container" style={{ marginTop: '20px' }}>
                <h1 className="branch-header">VTU Notes Categories</h1>
                
                {/* Branch Cards Section */}
                <div className="branch-section">
                    <div className="branch-card" onClick={() => handleBranchClick('first-year')}>
                        1ST YEAR ENGINEERING
                    </div>
                    <div className="branch-card" onClick={() => handleBranchClick('cse')}>
                        CSE STREAM
                    </div>
                    <div className="branch-card" onClick={() => handleBranchClick('ece')}>
                        ECE STREAM
                    </div>
                    <div className="branch-card" onClick={() => handleBranchClick('civil')}>
                        Civil Engineering
                    </div>
                    {/* Add more branches as needed */}
                </div>
            </div>
        </div>
    );
}

export default BranchSelection;
