// src/components/Branch.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaGraduationCap, FaChevronRight, FaBookOpen } from 'react-icons/fa';
import Breadcrumbs from './Breadcrumbs';
import './BranchModern.css'; // CHANGED: Modern CSS
import AdSenseAd from './AdSenseAd';

function Branch() {
    const { branch } = useParams();

    // Determine semester links based on the branch
    const semesters = branch === 'first-year'
        ? ['1', '2']
        : ['3', '4', '5', '6', '7'];

    const branchName = branch === 'cse' ? "Computer Science"
        : branch === 'ece' ? "Electronics"
            : branch === 'first-year' ? "First Year / P-Cycle"
                : branch.toUpperCase();

    return (
        <div className="branch-page-container">
            <div className="branch-bg-decoration"></div>

            <div className="branch-content">
                <div style={{ marginBottom: '30px' }}>
                    <Breadcrumbs />
                </div>

                {/* Hero */}
                <div className="branch-hero" style={{ textAlign: 'left', marginBottom: '40px', padding: '0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                        <div className="bm-icon-wrapper" style={{ margin: 0, width: '60px', height: '60px', fontSize: '1.5rem' }}>
                            <FaGraduationCap />
                        </div>
                        <div>
                            <span className="branch-hero-badge" style={{ marginBottom: '8px' }}>STREAM</span>
                            <h1 style={{ fontSize: '2.5rem' }}>{branchName}</h1>
                        </div>
                    </div>
                    <p style={{ margin: 0, maxWidth: '600px' }}>Select your current semester to access comprehensive notes, previous year question papers, and study materials.</p>
                </div>

                {/* Semester Grid */}
                <div className="sem-grid-modern">
                    {semesters.map((sem) => (
                        <Link to={`/branch/${branch}/${sem}`} key={sem} className="sem-card-modern">
                            <span className="sem-number">{sem}</span>
                            <div className="sem-info">
                                <h3>Semester {sem}</h3>
                                <span><FaBookOpen /> View Subjects <FaChevronRight style={{ fontSize: '0.7rem' }} /></span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Ad Section */}
                <div style={{ marginTop: '60px', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <AdSenseAd
                        adClient="ca-pub-9499544849301534"
                        adSlot="7579321744"
                        adFormat="auto"
                        fullWidthResponsive={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default Branch;