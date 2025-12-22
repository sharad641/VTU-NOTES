import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaDownload, FaExternalLinkAlt, FaCheckCircle, FaBookOpen, FaLaptopCode, FaUserTie, FaComments } from 'react-icons/fa';
import './PlacementGuide.css';

// Data separated for cleaner code
const SECTIONS_DATA = [
    {
        id: 'aptitude',
        category: 'Aptitude',
        icon: <FaBookOpen />,
        title: 'Aptitude Preparation',
        info: 'Sharpen your quantitative, logical reasoning, and analytical skills. Essential for initial screening rounds.',
        resources: [
            { label: 'GeeksForGeeks Aptitude', url: 'https://www.geeksforgeeks.org/aptitude-for-placements/' },
            { label: 'IndiaBix Practice', url: 'https://www.indiabix.com/' },
        ],
        pdfs: [
            { name: 'Aptitude Cheatsheet', link: 'https://drive.google.com/file/d/1e319ug9dlYbX3HixOYPyWLpLYqSMg_zY/view?usp=drive_link' }
        ],
    },
    {
        id: 'technical',
        category: 'Technical',
        icon: <FaLaptopCode />,
        title: 'Technical Skills & DSA',
        info: 'Master Data Structures and Algorithms. Optimize code efficiency for technical interviews.',
        resources: [
            { label: 'DSA Tutorials (GFG)', url: 'https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/?ref=shm' },
            { label: 'InterviewBit Practice', url: 'https://www.interviewbit.com/practice/' },
            { label: 'System Design Basics', url: 'https://www.geeksforgeeks.org/what-is-system-design-learn-system-design/' }
        ],
        pdfs: [
            { name: 'DSA Roadmap', link: 'https://drive.google.com/file/d/1HSyuSTtHV9BDBpFygw7j0QNtSdRqSHFg/view?usp=drive_link' },
            { name: 'Coding Patterns', link: 'https://drive.google.com/file/d/1C205XEaMlVUbudWxqUzftXGRyhqgvhAf/view?usp=sharing' },
            { name: 'SQL Basics', link: 'https://drive.google.com/file/d/1AZAaqV1poGvLWHkVWuLtUyP44V5tZzgm/view?usp=sharing' }
        ],
    },
    {
        id: 'resume',
        category: 'Soft Skills',
        icon: <FaUserTie />,
        title: 'Resume & Cover Letter',
        info: 'Build a strong resume tailored for specific job roles to showcase your skills effectively.',
        resources: [
            { label: 'Resume Templates (Zety)', url: 'https://zety.com/blog/resume-formats' },
            { label: 'Cover Letter Examples', url: 'https://www.linkedin.com/posts/sohansethi_using-this-cv-will-help-you-get-interviews-activity-7246524212721434625-hH4M' },
        ],
        pdfs: [
            { name: 'Resume Guide PDF', link: 'https://drive.google.com/file/d/1tyXiV0fOids1O0m_0Rg99VZBNAbYl8df/view?usp=drive_link' }
        ],
    },
    {
        id: 'interview',
        category: 'Interview',
        icon: <FaComments />,
        title: 'Mock Interviews',
        info: 'Practice mock interviews and behavioral questions to build confidence.',
        resources: [
            { label: 'Peer Mock Interview', url: 'https://www.interviewbit.com/peer-mock-interview/' },
            { label: 'Behavioral Guide', url: 'https://in.redrob.io/blog/behavioral-and-competency-based-interview-questions-guide/' },
        ],
        pdfs: [
            { name: 'Interview Q&A PDF', link: 'https://drive.google.com/file/d/1dZeO-PnPiAmN-Ikt3tuYUTkGif6tNlzm/view?usp=sharing' }
        ],
    },
    {
        id: 'communication',
        category: 'Soft Skills',
        icon: <FaUserTie />,
        title: 'Communication Skills',
        info: 'Cultivate effective communication and leadership skills for GDs and HR rounds.',
        resources: [
            { label: 'Public Speaking Course', url: 'https://alison.com/course/introduction-to-public-speaking' },
            { label: 'Communication Strategies', url: 'https://www.bing.com/videos/search?view=detail&q=Effective+Communication+Strategies' },
        ],
        pdfs: [
            { name: 'Soft Skills Handbook', link: 'https://drive.google.com/file/d/1uL5PUHe1AJsji-GDzImr5J3G80EfBOMe/view?usp=sharing' }
        ],
    }
];

const CHECKLIST_ITEMS = [
    "Complete 5 Aptitude Practice Tests",
    "Solve Top 50 DSA Interview Questions",
    "Create a 1-Page ATS Friendly Resume",
    "Draft a Generic Cover Letter",
    "Prepare 'Tell me about yourself' answer",
    "Participate in 2 Mock Interviews"
];

const PlacementGuide = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [checklist, setChecklist] = useState(() => {
        // Load saved progress from localStorage
        const saved = localStorage.getItem('placementChecklist');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('placementChecklist', JSON.stringify(checklist));
    }, [checklist]);

    const handleCheck = (item) => {
        setChecklist(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    const calculateProgress = () => {
        const total = CHECKLIST_ITEMS.length;
        const checked = Object.values(checklist).filter(Boolean).length;
        return Math.round((checked / total) * 100);
    };

    // Filter Logic
    const filteredSections = SECTIONS_DATA.filter(section => {
        const matchesSearch = section.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              section.info.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || section.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', ...new Set(SECTIONS_DATA.map(item => item.category))];

    return (
        <div className="pg-container">
            {/* Hero Section */}
            <header className="pg-hero">
                <div className="pg-hero-content">
                    <h1>Placement <span className="highlight">Mastery</span> Guide</h1>
                    <p>Your structured roadmap to cracking dream companies.</p>
                    
                    <div className="pg-search-bar">
                        <FaSearch className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Search topics (e.g., DSA, Resume)..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="pg-cta-group">
                        <Link to="/test" className="btn-primary">Take Practice Test</Link>
                    </div>
                </div>
            </header>

            {/* Filter Tabs */}
            <div className="pg-filters">
                {categories.map(cat => (
                    <button 
                        key={cat} 
                        className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Content Grid */}
            <section className="pg-grid">
                {filteredSections.length > 0 ? (
                    filteredSections.map((section, index) => (
                        <div key={index} className="pg-card">
                            <div className="card-header">
                                <div className="card-icon">{section.icon}</div>
                                <h2>{section.title}</h2>
                            </div>
                            <p className="card-info">{section.info}</p>
                            
                            <div className="card-links">
                                <h3><FaExternalLinkAlt /> Resources</h3>
                                <ul>
                                    {section.resources.map((res, i) => (
                                        <li key={i}>
                                            <a href={res.url} target="_blank" rel="noopener noreferrer">{res.label}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="card-downloads">
                                {section.pdfs.map((pdf, i) => (
                                    <a key={i} href={pdf.link} target="_blank" rel="noopener noreferrer" className="pdf-btn">
                                        <FaDownload /> {pdf.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results">No resources found for "{searchTerm}"</div>
                )}
            </section>

            {/* Interactive Checklist Section */}
            <section className="pg-checklist-section">
                <div className="checklist-header">
                    <h2><FaCheckCircle /> Preparation Tracker</h2>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${calculateProgress()}%` }}></div>
                        <span className="progress-text">{calculateProgress()}% Complete</span>
                    </div>
                </div>
                
                <div className="checklist-grid">
                    {CHECKLIST_ITEMS.map((item, index) => (
                        <label key={index} className={`checklist-item ${checklist[item] ? 'checked' : ''}`}>
                            <input 
                                type="checkbox" 
                                checked={!!checklist[item]} 
                                onChange={() => handleCheck(item)}
                            />
                            <span className="checkmark"></span>
                            {item}
                        </label>
                    ))}
                </div>
            </section>

            {/* Footer Links */}
            <footer className="pg-footer">
                <h3>Additional Insights</h3>
                <div className="footer-links">
                    <a href="https://www.glassdoor.co.in/Reviews/index.htm" target="_blank" rel="noopener noreferrer">Glassdoor Reviews</a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn Learning</a>
                </div>
            </footer>
        </div>
    );
};

export default PlacementGuide;