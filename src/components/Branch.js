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
        <div className="branch" style={{ marginTop: '80px' }}>
            <h2>{branch.toUpperCase()} NOTES</h2>
            <p>Select a semester:</p>
            <ul>
                {semesterLinks}
            </ul>
        </div>
    );
}

export default Branch;
