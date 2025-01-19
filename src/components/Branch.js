import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './Branch.css';
import AdSenseAd from './AdSenseAd'; 

function Branch() {
    const { branch } = useParams();
    const navigate = useNavigate();

    // Determine semester links and descriptions based on the branch
    let semesterLinks;

    if (branch === 'first-year') {
        semesterLinks = (
            <>
                <li>
                    <Link to={`/branch/${branch}/1`} className="semester-link">Semester 1</Link>
                    <p>
                        Explore foundational concepts in <strong>Mathematics-I</strong>, delve into the wonders of <strong>Chemistry</strong>, and master programming basics with <strong>Principles of C Programming</strong>. Understand the basics of construction and planning in <strong>Introduction to Civil Engineering</strong>.
                    </p>
                    <button
                        className="view-resources-button"
                        onClick={() => navigate(`/branch/${branch}/1`)}
                    >
                        View Resources
                    </button>
                </li>
                <li>
                    <Link to={`/branch/${branch}/2`} className="semester-link">Semester 2</Link>
                    <p>
                        Build on your knowledge with <strong>Mathematics-II</strong>, advance your programming skills with <strong>C Programming</strong>, and get hands-on with <strong>Physics Experiments</strong>. Workshops provide practical exposure to engineering concepts.
                    </p>
                    <button
                        className="view-resources-button"
                        onClick={() => navigate(`/branch/${branch}/2`)}
                    >
                        View Resources
                    </button>
                </li>
            </>
        );
    } else if (branch === 'cse') {
        semesterLinks = (
            <>
                <li>
                    <Link to={`/branch/${branch}/3`} className="semester-link">Semester 3</Link>
                    <p>
                        Deep dive into <strong>Mathematics-III</strong>, understand computer hardware with <strong>Digital Design and Computer Organization (DDCO)</strong>, manage processes with <strong>Operating Systems</strong>, and strengthen problem-solving with <strong>Data Structures and Algorithms (DSA)</strong>. Enhance your coding skills through <strong>OOPS with Java and C++</strong> and hands-on learning in the <strong>DSA Lab with Scripting</strong>.
                    </p>
                    <button
                        className="view-resources-button"
                        onClick={() => navigate(`/branch/${branch}/3`)}
                    >
                        View Resources
                    </button>
                </li>
                <div className="ad-container">
                                                
                                            </div>
                             
                <li>
                    <Link to={`/branch/${branch}/4`} className="semester-link">Semester 4</Link>
                    <p>
                        Expand your knowledge with advanced topics like <strong>Database Management Systems</strong>, <strong>Computer Networks</strong>, and <strong>Design and Analysis of Algorithms</strong>. Dive into projects to strengthen your practical skills.
                    </p>
                    <button
                        className="view-resources-button"
                        onClick={() => navigate(`/branch/${branch}/4`)}
                    >
                        View Resources
                    </button>
                </li>
                <div className="ad-container">
                                                <AdSenseAd
                                                    adClient="ca-pub-9499544849301534"
                                                    adSlot="7579321744"
                                                    adFormat="auto"
                                                    fullWidthResponsive={true}
                                                />
                                            </div>
                             
                <li>
                    <Link to={`/branch/${branch}/5`} className="semester-link">Semester 5</Link>
                    <p>
                        Prepare for the future with industry-relevant topics like <strong>Software Engineering and Project Management (SEPM)</strong>, <strong>Computer Networks</strong>, <strong>Theory of Computation (TOC)</strong>, <strong>Artificial Intelligence (AI)</strong>, and <strong>Full Stack Development</strong>. Understand research techniques with <strong>Research and Methodology</strong> and explore operating systems in depth with <strong>Unix Programming</strong>.
                    </p>
                    <button
                        className="view-resources-button"
                        onClick={() => navigate(`/branch/${branch}/5`)}
                    >
                        View Resources
                    </button>
                </li>
            </>
        );
    } else {
        semesterLinks = <p>No semesters available for this branch. Please check back later!</p>;
    }

    return (
        <div>
            {/* Headline Message Section */}
           
                

            {/* Branch Section */}
            <div className="branch" style={{ marginTop: '20px' }}>
                <h1 className="branch-title">{branch.toUpperCase()} NOTES</h1>
                <p className="branch-description">Navigate through semesters to unlock a wealth of knowledge, resources, and tools designed to help you excel.</p>
                <ul className="semester-list">{semesterLinks}</ul>
            </div>

            {/* Call to Action Section */}
            <div className="cta-section">
                <p>🌟 Looking for something specific? Don’t hesitate to <Link to="/contact">contact us</Link> for personalized assistance. 🌟</p>
            </div>
        </div>
    );
}

export default Branch;
