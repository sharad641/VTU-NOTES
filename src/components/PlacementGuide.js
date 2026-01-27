import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaSearch, FaDownload, FaExternalLinkAlt, FaCheckCircle, 
    FaBookOpen, FaLaptopCode, FaUserTie, FaComments, FaBuilding, 
    FaChevronDown, FaChevronUp, FaRocket, FaLightbulb, FaBrain,
    FaGlobe, FaRoad, FaHourglassHalf, FaPaperPlane, FaCode, FaChartLine, FaBriefcase,
    FaFileAlt, FaMagic, FaCopy, FaFileCode, FaSync
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './PlacementGuideModern.css';

// --- DATA ---
const SECTIONS_DATA = [
    {
        id: 'aptitude',
        category: 'Aptitude',
        icon: <FaBrain />,
        title: 'Aptitude Mastery',
        info: 'The first hurdle in 90% of recruitment processes. Focus on speed and accuracy.',
        resources: [
            { label: 'Indiabix (Quant & Logical)', url: 'https://www.indiabix.com/' },
            { label: 'GeeksForGeeks Aptitude', url: 'https://www.geeksforgeeks.org/aptitude-for-placements/' },
            { label: 'FacePrep Aptitude', url: 'https://www.faceprep.in/aptitude/' }
        ],
        pdfs: [
            { name: 'Quant Cheatsheet', link: 'https://drive.google.com/file/d/1e319ug9dlYbX3HixOYPyWLpLYqSMg_zY/view?usp=drive_link' },
            { name: 'Logical Reasoning PDF', link: '#' }
        ],
    },
    {
        id: 'technical',
        category: 'Technical',
        icon: <FaLaptopCode />,
        title: 'Funda + DSA',
        info: 'Core CS subjects (OS, DBMS, CN) and Problem Solving (DSA) are non-negotiable.',
        resources: [
            { label: 'Striver SDE Sheet', url: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/' },
            { label: 'LeetCode Top 100', url: 'https://leetcode.com/problem-list/top-100-liked-questions/' },
            { label: 'CS Fundamentals (GateSmashers)', url: 'https://www.youtube.com/c/GateSmashers' }
        ],
        pdfs: [
            { name: 'DSA Roadmap', link: 'https://drive.google.com/file/d/1HSyuSTtHV9BDBpFygw7j0QNtSdRqSHFg/view?usp=drive_link' },
            { name: 'SQL Quick Guide', link: 'https://drive.google.com/file/d/1AZAaqV1poGvLWHkVWuLtUyP44V5tZzgm/view?usp=sharing' }
        ],
    },
    {
        id: 'softskills',
        category: 'Soft Skills',
        icon: <FaUserTie />,
        title: 'Resume & HR',
        info: 'Your resume gets you shortlisted. Your communication gets you hired.',
        resources: [
            { label: 'Resume Worded (ATS Check)', url: 'https://resumeworded.com/' },
            { label: 'Harvard Resume Guide', url: 'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2023/04/resume-and-cover-letter-guide.pdf' },
            { label: 'Common HR Questions', url: 'https://www.indiabix.com/hr-interview/questions-and-answers/' }
        ],
        pdfs: [
            { name: 'Resume Templates', link: 'https://drive.google.com/file/d/1tyXiV0fOids1O0m_0Rg99VZBNAbYl8df/view?usp=drive_link' }
        ],
    },
    {
        id: 'offcampus',
        category: 'Off-Campus',
        icon: <FaGlobe />,
        title: 'Off-Campus Hunt',
        info: 'Don\'t rely solely on campus drives. 60% of high-paying jobs are found here.',
        resources: [
            { label: 'LinkedIn Jobs (Networking)', url: 'https://www.linkedin.com/jobs/' },
            { label: 'Wellfound (Startups)', url: 'https://wellfound.com/' },
            { label: 'Unstop (Hackathons)', url: 'https://unstop.com/' },
            { label: 'Instahyre (Premium)', url: 'https://www.instahyre.com/' }
        ],
        pdfs: [
            { name: 'Cold Email Templates', link: '#' } // Placeholder for now
        ],
    },
    {
        id: 'roadmaps',
        category: 'Roadmaps',
        icon: <FaRoad />,
        title: 'Role-Based Paths',
        info: 'Curated paths for SDE, Web Dev, and Data Science roles.',
        resources: [
            { label: 'SDE / Core Engineering', url: 'https://roadmap.sh/backend' },
            { label: 'Frontend / Full Stack', url: 'https://roadmap.sh/frontend' },
            { label: 'Data Science / AI', url: 'https://roadmap.sh/ai-data-scientist' }
        ],
        pdfs: [],
    },

    {
        id: 'projects',
        category: 'Projects',
        icon: <FaRocket />,
        title: 'Project Portfolio',
        info: 'Showcase practical application of your skills. Build full-stack or unique niche projects.',
        resources: [
            { label: 'GitHub Project Ideas', url: 'https://github.com/florinpop17/app-ideas' },
            { label: 'Figma for UI Design', url: 'https://www.figma.com/' }
        ],
        pdfs: [],
    },
    {
        id: 'mock-tests',
        category: 'Mock Tests',
        icon: <FaBrain />,
        title: 'Skill Assessment',
        info: 'Test your knowledge in Coding, Aptitude, and Core CS subjects with our gamified quiz arena.',
        resources: [
            { label: 'Start Mock Test', url: '/test' } // Internal Link
        ],
        pdfs: [],
    }
];

// --- NEW FEATURES DATA ---
const TIPS_DATA = [
    "Consistency > Intensity. Code for 1 hour daily rather than 10 hours on Sunday.",
    "Don't ignore Aptitude. It filters out 60% of candidates in the first round.",
    "Mock Interviews are awkward but necessary. Fail here, not in the actual interview.",
    "Your projects speak louder than your GPA (mostly). Deploy them, don't just keep them Localhost.",
    "Cold emailing alumni from your target company works better than easy apply."
];

const TIMELINE_DATA = [
    {
        sem: '6th Semester',
        title: 'Foundation & Projects',
        desc: 'Master one stack (MERN/Java). Build 2 major projects. Start Grind 75 LeetCode.',
        icon: <FaCode />
    },
    {
        sem: '7th Semester (Aug-Nov)',
        title: 'The Prime Time',
        desc: 'Campus drives begin. Secure a "Safe Option" (3-6 LPA). Focus on Aptitude & Core CS.',
        icon: <FaBriefcase />
    },
    {
        sem: '8th Semester (Dec-May)',
        title: 'Dream & Off-Campus',
        desc: 'Apply for high-paying startups (Wellfound). Look for 6-month internships. Negotiate offers.',
        icon: <FaRocket />
    }
];

const SUCCESS_STORIES = [
    {
        name: "Priya S.",
        company: "Google",
        role: "SDE-1",
        quote: "I focused purely on DSA for 6 months. Striver's sheet is a goldmine. Don't give up if you get rejected 10 times."
    },
    {
        name: "Rahul K.",
        company: "Accenture",
        role: "FSE",
        quote: "Communication skills saved me. My coding round was average, but I explained my logic clearly in the interview."
    },
    {
        name: "Amit V.",
        company: "Groww",
        role: "Backend Intern",
        quote: "I didn't have a high CGPA. My open-source contributions caught the recruiter's eye on Twitter."
    }
];

const COMPANIES_DATA = [
    {
        name: 'TCS (Ninja / Digital / Prime)',
        role: 'System Engineer',
        pattern: 'Aptitude (Numerical, Verbal, Reasoning) + Advanced Coding + Communication.',
        tips: 'Focus on NQT basics for Ninja. For Digital/Prime, master Advanced Coding (DP, Graphs) and effective Communication.'
    },
    {
        name: 'Infosys (SP / DSE)',
        role: 'Specialist Programmer',
        pattern: 'Online Test (Reasoning, Math, Verbal, Pseudo Code, Puzzle) + Interview.',
        tips: 'Pseudo code section is tricky, practice it specifically. Puzzles are often decisive in the interview.'
    },
    {
        name: 'Accenture',
        role: 'ASE / FSE',
        pattern: 'Cognitive & Technical Assessment + Coding + Communication Test + Interview.',
        tips: 'Cognitive & Tech assessment is elimination round. Communication test is AI-based (pronunciation/fluency).'
    }
];

const CHECKLIST_ITEMS = [
    "Solved 50+ Easy/Medium LeetCode problems",
    "Completed 1 solid Full-Stack Project",
    "Created ATS-friendly Resume",
    "Sent 10 Cold Emails to Recruiters/Alumni",
    "Applied to 20+ companies on LinkedIn/Naukri",
    "Revised Core CS (OS, DBMS, CN)",
    "Registered on Unstop & Naukri",
    "Taken 2 Mock Interviews"
];

// --- RESUME BUILDER COMPONENT REMOVED (Moved to /resume-builder) ---

// --- INTERNAL COMPONENTS ---


// --- COMPONENT ---
const PlacementGuide = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [expandedCompany, setExpandedCompany] = useState(null);
    const [checklist, setChecklist] = useState(() => {
        const saved = localStorage.getItem('modernPlacementChecklist');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('modernPlacementChecklist', JSON.stringify(checklist));
    }, [checklist]);

    const handleCheck = (item) => {
        setChecklist(prev => ({ ...prev, [item]: !prev[item] }));
    };

    const calculateXP = () => {
        const checkedCount = Object.values(checklist).filter(Boolean).length;
        return checkedCount * 100;
    };

    const getPlayerLevel = (xp) => {
        if (xp < 300) return "Novice Intern";
        if (xp < 600) return "Code Ninja";
        return "Placement God";
    };

    const toggleCompany = (index) => {
        setExpandedCompany(expandedCompany === index ? null : index);
    };

    const filteredSections = SECTIONS_DATA.filter(section => {
        const matchesSearch = section.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              section.info.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || section.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', ...new Set(SECTIONS_DATA.map(item => item.category))];

    const [dailyTip, setDailyTip] = useState('');

    useEffect(() => {
        // Random Tip
        const random = Math.floor(Math.random() * TIPS_DATA.length);
        setDailyTip(TIPS_DATA[random]);
    }, []);

    return (
        <div className="pg-container">
            {/* Hero Section */}
            <header className="pg-hero">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1>Placement <span style={{color: '#a855f7'}}>Mastery</span> 2025</h1>
                    <p>Your ultimate strategic roadmap to cracking your dream job.</p>
                </motion.div>

                {/* Daily Tip Widget */}
                <motion.div 
                    className="pg-tip-container"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '100%', opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <div className="pg-tip-card">
                        <div className="pg-tip-icon-box">
                            <FaLightbulb className="pg-tip-icon" />
                        </div>
                        <div className="pg-tip-content">
                            <h3>
                                Daily Logic 
                                <span className="pg-tip-tag">#Motivation</span>
                            </h3>
                            <p>"{dailyTip}"</p>
                        </div>
                        <div className="pg-tip-actions">
                            <button 
                                className="pg-tip-action-btn" 
                                onClick={() => {
                                    navigator.clipboard.writeText(dailyTip);
                                    // Could add a toast here
                                }}
                                title="Copy Quote"
                            >
                                <FaCopy />
                            </button>
                            <button 
                                className="pg-tip-action-btn" 
                                onClick={() => {
                                    const random = Math.floor(Math.random() * TIPS_DATA.length);
                                    setDailyTip(TIPS_DATA[random]);
                                }}
                                title="Next Tip"
                            >
                                <FaSync />
                            </button>
                        </div>
                    </div>
                </motion.div>

                <div className="pg-search-container">
                    <FaSearch className="pg-search-icon" />
                    <input 
                        type="text" 
                        className="pg-search-input"
                        placeholder="Search resources, topics..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Desktop Filters (Hidden on Mobile) */}
                <div className="pg-filters">
                    {categories.map(cat => (
                        <button 
                            key={cat} 
                            className={`pg-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Mobile Filter Dropdown (Visible on Mobile) */}
                <div className="pg-mobile-filter-container">
                    <button 
                        className={`pg-mobile-dropdown-btn ${isDropdownOpen ? 'open' : ''}`} 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span className="pg-selected-cat">{activeCategory}</span>
                        {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    
                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div 
                                className="pg-mobile-dropdown-menu"
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                {categories.map(cat => (
                                    <div 
                                        key={cat}
                                        className={`pg-mobile-dropdown-item ${activeCategory === cat ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveCategory(cat);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        {cat}
                                        {activeCategory === cat && <FaCheckCircle className="pg-check-icon-mobile" />}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </header>

            {/* Resources Grid */}
            <section className="pg-grid">
                <AnimatePresence>
                    {filteredSections.map((section) => (
                        <motion.div 
                            key={section.id}
                            className="pg-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }} // Simple tilt
                        >
                            <div className="pg-card-header">
                                <div className="pg-icon-wrapper">{section.icon}</div>
                                <h2>{section.title}</h2>
                            </div>
                            <p className="pg-card-info">{section.info}</p>
                            
                            <div className="pg-links-section">
                                <h3><FaExternalLinkAlt /> Top Resources</h3>
                                <ul className="pg-link-list">
                                    {section.resources.map((res, i) => (
                                        <li key={i} className="pg-link-item">
                                            {res.url.startsWith('/') ? (
                                                <Link to={res.url} className="pg-link">
                                                    {res.label}
                                                </Link>
                                            ) : (
                                                <a href={res.url} target="_blank" rel="noopener noreferrer" className="pg-link">
                                                    {res.label}
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {section.pdfs.length > 0 && (
                                <div className="pg-downloads">
                                    {section.pdfs.map((pdf, i) => (
                                        <a key={i} href={pdf.link} target="_blank" rel="noopener noreferrer" className="pg-btn-download">
                                            <FaDownload /> {pdf.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </section>

            {/* Resume Features Removed */}

            {/* Visual Timeline Strategy */}
            <section className="pg-timeline-section">
                <h2 className="pg-timeline-title"><FaChartLine /> The Strategy Timeline</h2>
                <div className="pg-timeline">
                    {TIMELINE_DATA.map((item, index) => (
                        <div key={index} className="pg-timeline-node">
                            <div className="pg-timeline-dot"></div>
                            <motion.div 
                                className="pg-timeline-content"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <span className="pg-timeline-date">{item.sem}</span>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {item.icon} {item.title}
                                </h3>
                                <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>{item.desc}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Preparation Tracker (Gamified) */}
            <section className="pg-tracker-section">
                <motion.div 
                    className="pg-tracker-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="pg-level-badge">{getPlayerLevel(calculateXP())}</div>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <FaCheckCircle style={{ color: '#6366f1' }} /> 
                        Quest Board
                    </h2>
                    
                    <div className="pg-progress-container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>XP: {calculateXP()} / {CHECKLIST_ITEMS.length * 100}</span>
                            <span>{Math.round((calculateXP() / (CHECKLIST_ITEMS.length * 100)) * 100)}%</span>
                        </div>
                        <div className="pg-progress-bar-bg">
                            <div 
                                className="pg-progress-fill" 
                                style={{ width: `${(calculateXP() / (CHECKLIST_ITEMS.length * 100)) * 100}%` }}
                            ></div>
                        </div>
                        <p className="pg-xp-text">Complete quests to level up!</p>
                    </div>

                    <div className="pg-checklist-grid">
                        {CHECKLIST_ITEMS.map((item, index) => (
                            <div 
                                key={index} 
                                className={`pg-checklist-item pg-quest-card ${checklist[item] ? 'checked completed' : ''}`}
                                onClick={() => handleCheck(item)}
                            >
                                <div className="pg-checkbox">
                                    {checklist[item] && <FaCheckCircle className="pg-check-icon"/>}
                                </div>
                                <span>{item}</span>
                                <span className="pg-quest-xp">+100 XP</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Success Stories Carousel */}
            <section className="pg-stories-section">
                <h2 style={{ marginBottom: '2rem' }}>Inspired by Seniors</h2>
                <div className="pg-story-scroll">
                    {SUCCESS_STORIES.map((story, i) => (
                        <div key={i} className="pg-story-card">
                            <div className="pg-story-quote">"{story.quote}"</div>
                            <div className="pg-story-author">
                                <div className="pg-avatar">{story.name.charAt(0)}</div>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>{story.name}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                                        {story.role} @ <span style={{ color: '#a855f7' }}>{story.company}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default PlacementGuide;