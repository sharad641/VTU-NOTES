import React, { useState } from 'react';
import './ModelPapers.css';

const papers = [
  {
    title: 'Microcontroller',
    code: 'BCS601',
    solutionLink: 'https://drive.google.com/file/d/181F2lTn_jMHgAm64ZjuEnI3FFLInfXdq/view?usp=drive_link',
     oldPaperLink: 'https://drive.google.com/file/d/1RM-0q01QYQFubdFR9fmGNlicFyRbeHl-/view?usp=drive_link',
  },
  {
    title: 'Machine learning',
    code: 'BCS602',
    modelPaperLink: 'https://drive.google.com/file/d/1cjG_nakCffLmtjD9n7Esa5f8ROqXhOR8/view?usp=drive_link',
   
  },
  
];

const ModelPapers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredPapers = papers.filter((paper) =>
    paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const papersToDisplay = showAll ? filteredPapers : filteredPapers.slice(0, 3);

  return (
    <div className="model-papers-container">
      <h2>📄 Model Question Papers & Solutions</h2>
      <p>Download model papers, solutions, and old papers by subject or code.</p>

      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="🔎 Search by subject name or code (e.g., BCS401)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="papers-grid">
        {papersToDisplay.map((paper, index) => (
          <div key={index} className="paper-card">
            <h3>{paper.title}</h3>
            <p className="subject-code">Code: {paper.code}</p>
            <div className="paper-links">
              {paper.modelPaperLink && (
                <a
                  href={paper.modelPaperLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="paper-button"
                >
                  📄 Model Paper
                </a>
              )}
              {paper.solutionLink && (
                <a
                  href={paper.solutionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="paper-button"
                >
                  ✅ Solution
                </a>
              )}
              {paper.oldPaperLink && (
                <a
                  href={paper.oldPaperLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="paper-button"
                >
                  🕑 Old Paper
                </a>
              )}
            </div>
          </div>
        ))}
        {papersToDisplay.length === 0 && (
          <p className="no-results">No papers found for your search.</p>
        )}
      </div>

      {!showAll && filteredPapers.length > 3 && (
        <button className="see-more-button" onClick={() => setShowAll(true)}>
          See More Papers ➡️
        </button>
      )}
    </div>
  );
};

export default ModelPapers;
