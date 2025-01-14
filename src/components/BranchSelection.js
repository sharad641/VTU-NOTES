// src/components/BranchSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

import './BranchSelection.css';

function BranchSelection() {
    const navigate = useNavigate();

    const handleBranchClick = (branch) => {
        navigate(`/branch/${branch}`);
    };

    return (
        <div>
            {/* Headline Message Section */}
           

            {/* Main Content */}
            <div className="branch-container" style={{ marginTop: '20px' }}>
                <h1 className="branch-header">VTU Notes Categories (2022 Scheme)</h1>
                
                {/* Branch Cards Section */}
                <div className="branch-section">
                    {/* First Year Engineering */}
                    <div className="branch-card">
                        <h2>1ST YEAR ENGINEERING</h2>
                        <p>
                            The first year under the 2022 scheme provides a strong foundation for all engineering disciplines:
                        </p>
                        <ul>
                            <li><strong>Engineering Mathematics I & II:</strong> Key topics include differential calculus, integral calculus, differential equations, and linear algebra.</li>
                            <li><strong>Engineering Physics / Chemistry:</strong> Covers topics like quantum mechanics, nanotechnology, and chemical bonding.</li>
                            <li><strong>Basic Electrical Engineering:</strong> Core concepts like DC circuits, AC fundamentals, and electrical machines.</li>
                            <li><strong>Programming for Problem Solving:</strong> Focus on C programming and algorithms.
                            </li>
                            <li><strong>Engineering Graphics & Workshop:</strong> Hands-on skills in design and fabrication.</li>
                        </ul>
                        <button 
                            className="branch-button" 
                            onClick={() => handleBranchClick('first-year')}>
                            Explore First Year Notes
                        </button>
                    </div>

                    {/* CSE Stream */}
                    <div className="branch-card">
                        <h2>CSE STREAM</h2>
                        <p>
                            The CSE stream under the 2022 scheme focuses on cutting-edge technologies and essential computer science topics:
                        </p>
                        <ul>
                            <li><strong>Second Year (3rd and 4th Semesters):</strong>
                                <ul>
                                    <li><strong>3rd Semester:</strong> Data Structures, Object-Oriented Programming using Java, Computer Organization and Architecture, and Engineering Mathematics III.</li>
                                    <li><strong>4th Semester:</strong> Design and Analysis of Algorithms, Operating Systems, Microcontroller and Embedded Systems, Database Management Systems.</li>
                                </ul>
                            </li>
                            <li><strong>Third Year (5th and 6th Semesters):</strong>
                                <ul>
                                    <li><strong>5th Semester:</strong> Computer Networks, Software Engineering, Web Technologies, and elective subjects like Cloud Computing.</li>
                                    <li><strong>6th Semester:</strong> Machine Learning, Cryptography, System Software, and advanced electives.</li>
                                </ul>
                            </li>
                            <li><strong>Final Year (7th and 8th Semesters):</strong> In-depth focus on emerging technologies like Artificial Intelligence, Blockchain, IoT, and major project work.</li>
                        </ul>
                        <button 
                            className="branch-button" 
                            onClick={() => handleBranchClick('cse')}>
                            Explore CSE Notes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BranchSelection;
