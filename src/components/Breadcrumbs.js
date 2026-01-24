import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
    const location = useLocation();
    
    // 1. Get raw path segments
    const pathnames = location.pathname.split('/').filter((x) => x);

    // 2. Helper to format the display name
    const formatName = (name) => {
        // Decode URI (e.g., "Machine%20Learning" -> "Machine Learning")
        const decodedName = decodeURIComponent(name);

        if (decodedName === 'branch') return null; 
        if (decodedName === 'modules') return null; 
        if (!isNaN(decodedName)) return `Sem ${decodedName}`; 
        
        // Capitalize words
        return decodedName
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    let breadcrumbPath = '';

    return (
        <nav className="modern-breadcrumb-nav" aria-label="breadcrumb">
            <ol className="modern-breadcrumb-list">
                {/* Home Icon */}
                <li className="modern-breadcrumb-item">
                    <Link to="/" className="modern-breadcrumb-link home-link">
                        <FaHome size={14} />
                        <span className="sr-only">Home</span>
                    </Link>
                    <FaChevronRight className="modern-breadcrumb-separator" />
                </li>

                {/* Dynamic Segments */}
                {pathnames.map((name, index) => {
                    breadcrumbPath += `/${name}`;
                    const displayName = formatName(name);
                    const isLast = index === pathnames.length - 1;

                    // If it's a hidden segment (like 'modules'), skip rendering
                    if (!displayName) return null;

                    return (
                        <li 
                            className={`modern-breadcrumb-item ${isLast ? 'active' : ''}`} 
                            key={breadcrumbPath}
                        >
                            {isLast ? (
                                <span className="modern-breadcrumb-text" title={displayName}>
                                    {displayName}
                                </span>
                            ) : (
                                <>
                                    <Link 
                                        to={breadcrumbPath} 
                                        className="modern-breadcrumb-link"
                                        title={`Go to ${displayName}`}
                                    >
                                        {displayName}
                                    </Link>
                                    <FaChevronRight className="modern-breadcrumb-separator" />
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;