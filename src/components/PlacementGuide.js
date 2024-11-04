// src/components/PlacementGuide.js

import React from 'react';
import './PlacementGuide.css';

const PlacementGuide = () => {
    const sections = [
        {
            title: 'Aptitude Preparation',
            info: 'Sharpen your quantitative, logical reasoning, and analytical skills, as these tests are essential in initial screening rounds. Regular practice with sample questions enhances problem-solving abilities and boosts confidence, making you better prepared for competitive exams and interviews.',
            resources: [
                { label: 'Top Aptitude Practice Site', url: 'https://www.geeksforgeeks.org/aptitude-for-placements/' },
                { label: 'Math and Logic Practice', url: 'https://www.indiabix.com/' },
            ],
            pdf: 'https://drive.google.com/file/d/1e319ug9dlYbX3HixOYPyWLpLYqSMg_zY/view?usp=drive_link',
           
        },
        {
            title: 'Technical Skills',
            info: 'Enhance your coding skills by mastering data structures and algorithms. Familiarize yourself with various problem-solving strategies and practice optimizing your code for efficiency. This foundational knowledge is crucial for technical interviews and will significantly improve your programming capabilities.',
            resources: [
                { label: 'Data Structures and Algorithms', url: 'https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/?ref=shm' },
                { label: 'Coding Practice', url: 'https://www.interviewbit.com/practice/' },
                { label: 'System Design Basics', url: 'https://www.geeksforgeeks.org/what-is-system-design-learn-system-design/' }
            ],
            pdf: 'https://drive.google.com/file/d/1HSyuSTtHV9BDBpFygw7j0QNtSdRqSHFg/view?usp=drive_link',
            
        },
        {
            title: 'Resume and Cover Letter',
            info: 'Build a strong resume and cover letter to showcase your technical and soft skills effectively. Tailor each document for specific job roles.',
            resources: [
                { label: 'Resume Templates and Tips', url: 'https://zety.com/blog/resume-formats?utm_source=bing&utm_medium=sem&utm_campaign=567883115&utm_term=resume%20formats&network=o&device=c&adposition=&adgroupid=1183076252669210&placement=&utm_source=bing&utm_medium=sem&utm_campaign=567883115&utm_term=resume%20formats&network=o&device=c&adposition=&adgroupid=1183076252669210&placement=&msclkid=966147280157117139ad2000a62b8877' },
                { label: 'Cover Letter Examples', url: 'https://www.linkedin.com/posts/sohansethi_using-this-cv-will-help-you-get-interviews-activity-7246524212721434625-hH4M?utm_source=share&utm_medium=member_android' },
            ],
            pdf: 'https://drive.google.com/file/d/1tyXiV0fOids1O0m_0Rg99VZBNAbYl8df/view?usp=drive_link', // Update with actual Google Drive PDF ID
        },
        {
            title: 'Mock Interviews and Behavioral Questions',
            info: 'Practice mock interviews to build confidence. Familiarize yourself with commonly asked behavioral questions and practice your responses.',
            resources: [
                { label: 'Mock Interview Platform', url: 'https://www.interviewbit.com/peer-mock-interview/' },
                { label: 'Behavioral Interview Guide', url: 'https://in.redrob.io/blog/behavioral-and-competency-based-interview-questions-guide/' },
            ],
            pdf: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_4', // Update with actual Google Drive PDF ID
        },
        {
            title: 'Soft Skills and Communication',
            info: 'Cultivate essential soft skills such as effective communication, teamwork, and leadership. These skills are vital for success in group discussions and interviews, as they demonstrate your ability to collaborate and convey ideas clearly.',
            resources: [
                { label: 'Public Speaking Tips', url: 'https://alison.com/course/introduction-to-public-speaking?utm_source=bing&utm_medium=cpc&utm_campaign=531498932&utm_content=1360098421544507&utm_term=kwd-85007315307112:loc-90&msclkid=e81f1ed9a17a17576ac579f10560d4a4' },
                { label: 'Effective Communication Strategies', url: 'https://www.bing.com/videos/search?view=detail&q=Effective+Communication+Strategies&&mid=A06F8B5E074E1974C35BA06F8B5E074E1974C35B&&FORM=VRDGAR' },
            ],
            pdf: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_5', // Update with actual Google Drive PDF ID
        }
    ];

    return (
        <div className="placement-guide-container">
            <header className="header">
                <h1>Placement Preparation Guide</h1>
                <p>Navigate through each phase of the placement process with structured resources, tips, and practice materials.</p>
            </header>
            

            <section className="section-list">
                {sections.map((section, index) => (
                    <div key={index} className="section-box">
                        <h2>{section.title}</h2>
                        <p>{section.info}</p>
                        <ul className="resources-list">
                            {section.resources.map((resource, i) => (
                                <li key={i}>
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.label}</a>
                                </li>
                            ))}
                        </ul>
                        <a href={section.pdf} download className="download-button">Download PDF</a> {/* Download link for PDF */}
                    </div>
                ))}
            </section>

            <section className="additional-links">
                <h2>Additional Preparation Links</h2>
                <ul className="additional-resources">
                    <li><a href="https://www.glassdoor.co.in/Reviews/index.htm" target="_blank" rel="noopener noreferrer">Company Reviews & Interview Insights</a></li>
                    <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn Learning for Skills</a></li>
                </ul>
            </section>

            <section className="placement-checklist">
                <h2>Placement Preparation Checklist</h2>
                <p>Follow this checklist to ensure you're fully prepared for your placement process:</p>
                <ul>
                    <li>Complete aptitude practice tests.</li>
                    <li>Revise key technical concepts.</li>
                    <li>Create and refine resume and cover letter.</li>
                    <li>Practice behavioral and technical interview questions.</li>
                    <li>Participate in mock interviews and group discussions.</li>
                </ul>
            </section>

            <footer className="career-footer">
                <div className="career-footer-content">
                    <div className="career-footer-info">
                        <h2 className="career-footer-title">Kickstart Your Career!</h2>
                        <p className="career-footer-description">
                            Stay updated with the latest internship and job opportunities in tech, along with resources to help you prepare.
                        </p>
                        <button 
                            className="career-footer-button" 
                        
                        >
                            Latest Internship & Job Opportunities
                        </button>
                    </div>
                    <div className="career-footer-links">
                        <h3 className="career-footer-links-title">Current Openings</h3>
                        <ul className="career-footer-links-list">
                            <li className="career-footer-link-item">
                                <a href="https://www.missionstartupkarnataka.org/elevate-karnataka?en" target="_blank" rel="noopener noreferrer">
                                👉👉👉Idea2PoC / ELEVATE Program
                                </a>
                                <p className="career-footer-link-description">👉👉👉Idea2PoC / ELEVATE Program - ELEVATE 2024
                                The Idea2PoC/ELEVATE program is a Government of Karnataka initiative designed to support and fund innovative startups in Karnataka, helping them validate proof of concept and scale their solutions to the next level.</p>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </footer>
            <div className="placement-guide-container">
    <header className="header">
        <h1>Career Guidance</h1>
        <p>If you need personalized career guidance, please reach out to us via email. Our experts are ready to assist you!</p>
    </header>
    <div className="contact-info">
        <p>Email us at: <a href="vtunotesforall@gmail.com" className="email-link">vtunotesforall@gmail.com</a></p>
        <p>We look forward to helping you navigate your career path!</p>
    </div>
</div>

        </div>
        
    );
};

export default PlacementGuide;
