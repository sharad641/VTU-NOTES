import React, { useState } from 'react';
import './ModelPapers.css';

const papers = [
  {
    title: 'DISCRETE MATHEMATICAL STRUCTURES (BCS405A)',
    code: 'BCS405A',
    modelPaperLink: 'https://drive.google.com/file/d/1rFJKUntE4UNWRL1IMg2QjWzkVoeEFeuG/preview',
     oldPaperLink: 'https://drive.google.com/file/d/1rFJKUntE4UNWRL1IMg2QjWzkVoeEFeuG/preview', solutionLink: 'https://drive.google.com/file/d/1wiliZvzo0-Zc2E_UMZDhXuNa2mKgKjw5/preview',
     solutionLink: 'https://drive.google.com/file/d/10bsSqzZMxz-Ve1DldYWZ1Sv7wAhKNUYT/preview',
  },
  {
    title: 'GRAPH THEORY',
    code: 'BCS5405B',
    modelPaperLink: 'https://drive.google.com/file/d/1Jdgxk2UiVeXb-TJJywapMucYhW_HLqj3/preview',
    solutionLink: 'https://drive.google.com/file/d/15m3xXKv-Os6JlQI6QvlTnBet7lI2ynCx/preview',
    
  },
  {
    title: 'DATABASE MANAGEMENT SYSTEM',
    code: 'BCS403',
    modelPaperLink: 'https://drive.google.com/file/d/16Vzo3cbtNfTGpLS3Z8LNTDe2E7dx0Bgh/preview',
    oldPaperLink: 'https://drive.google.com/file/d/1cqwCLrwgW7Lj3e1P1ofUsz1IkMa7-WxK/preview', solutionLink: 'https://drive.google.com/file/d/1cqwCLrwgW7Lj3e1P1ofUsz1IkMa7-WxK/preview',
  },
  {
    title: 'INTEGRATED WASTE MANAGEMENT FOR A SMART CITY',
    code: 'BCV654C',
    modelPaperLink: 'https://drive.google.com/file/d/1S6IqRQY87HsRhsqKC3CWsljih5zQoWt-/preview',
  },
   {
    title: 'RENEWABLE ENERGY POWER PLANTS',
    code: 'BME654B',
    modelPaperLink: 'https://drive.google.com/file/d/1Ny11P33Gx1VgtTPeBR2C-Pixd2OWuO7U/preview',
  },
  

   {
    title: 'CLOUD COMPUTING AND SECURITY FOR BOTH BCS601 AND BIS613D',
    code: 'BIS613D and BCS601',
    modelPaperLink: 'https://drive.google.com/file/d/1fhIl9-oR8sCf_9zf0QD1m3mzoFrOPP7w/view?usp=drive_link',
  },
  
  {
    title: 'Machine Learning',
    code: 'BCS602',
    modelPaperLink: 'https://drive.google.com/file/d/1cjG_nakCffLmtjD9n7Esa5f8ROqXhOR8/view?usp=drive_link',
  },
  {
    title: 'Microcontroller',
    code: 'BCS601',
    solutionLink: 'https://drive.google.com/file/d/181F2lTn_jMHgAm64ZjuEnI3FFLInfXdq/view?usp=drive_link',
    oldPaperLink: 'https://drive.google.com/file/d/1RM-0q01QYQFubdFR9fmGNlicFyRbeHl-/view?usp=drive_link',
  },
  {
    title: 'WATER CONSERVATION AND RAIN WATER HARVESTING',
    code: 'BCV654A',
    modelPaperLink: 'https://drive.google.com/file/d/1bOrd1-U9omf_IH3ZS5gWPceSfP01O4a8/preview',
  },
  {
    title: 'Machine Learning',
    code: 'BCS602',
    modelPaperLink: 'https://drive.google.com/file/d/1cjG_nakCffLmtjD9n7Esa5f8ROqXhOR8/view?usp=drive_link',
  },
  {
    title: 'Cloud Computing',
    code: 'BCS601 And BIS613D ',
    modelPaperLink: 'https://drive.google.com/file/d/1fhIl9-oR8sCf_9zf0QD1m3mzoFrOPP7w/view?usp=drive_link',
  },
  {
    title: 'Microcontroller',
    code: 'BCS402',
    modelPaperLink: 'https://drive.google.com/file/d/1bFd7GbQA6GycngDouhlvhnjNAoPW6t6q/view?usp=drive_link',
  },
  {
    title: 'Applied Physics for CSE stream',
    code: 'BPHYS102',
    modelPaperLink: 'https://drive.google.com/file/d/1Qsw-USW8fq6meVzpU74mYOIP7WwECOXb/preview',
  },
  {
    title: 'Principles of Programming Using C',
    code: 'BPOPS103',
    modelPaperLink: 'https://drive.google.com/file/d/1XbWC-4lhCglAe2uNps_S0yJtRjx8JKY8/preview',
  },
  {
    title: 'Introduction to Python Programming',
    code: 'BPLCK205B',
    modelPaperLink: 'https://drive.google.com/file/d/1XIvt4xN6tEo34CYD1kpn2OWrgRy0zdEo/preview',
    solutionLink: 'https://drive.google.com/file/d/12PN6-yofvVSVi3xgnbsTc2mhzuWRt4gS/preview',
  },
  {
    title: 'Introduction to Electrical Engineering',
    code: 'BESCK104B',
    modelPaperLink: 'https://drive.google.com/file/d/1xm1BU-8LUzSmpWSc30vJNtRvTeqQcYS2/preview',
  },
   
  {
    title: 'Mathematics-II for CSE Stream',
    code: 'BMATS201',
    modelPaperLink: 'https://drive.google.com/file/d/1vHxAXnHlBBglr-K3ZUAGqzwP5SC0qNki/preview',
    solutionLink: 'https://drive.google.com/file/d/1BXyhq4ZiTLbhpIwJHGkRYe60rbJQqQne/preview',
    oldPaperLink: 'https://drive.google.com/file/d/1cWG4jvZRZ2iBJA09t0WRW78dqw2vdm9x/preview',
  
  },
  
  {
    title: 'MATHEMATICS FOR CS ENGINEERING STREAM',
    code: 'BCS301',
    modelPaperLink: 'https://drive.google.com/file/d/1yWlFPiwEkizdCX-nfOJhg4j571naHRh9/preview',
    solutionLink: 'https://drive.google.com/file/d/1__LR4Vo4wqsQYd8IbIixnxFOM85AmAY-/preview',
  },
  {
    title: 'Operating System',
    code: 'BCS303',
    modelPaperLink: 'https://drive.google.com/file/d/1YXVbpdqeVKm4Hozh7lLH7mFS8NkLWz_k/preview',
  },
  {
    title: 'Data Structures and Applications',
    code: 'BCS304',
    modelPaperLink: 'https://drive.google.com/file/d/1inTZ9YeyPBbXGvKJDtbxGvEMPTgVYSml/preview',
    solutionLink: 'https://drive.google.com/file/d/1oqqZKNvDkFMtU5210eS_Q-LFEepR_bfr/preview',
  },
  {
    title: 'Object Oriented Programming with JAVA',
    code: 'BCS306A',
    modelPaperLink: 'https://drive.google.com/file/d/1LLY2jEI-KnI6M5wacApA_KW-SViB0pIs/preview',
    solutionLink: 'https://drive.google.com/file/d/1g4x5sDmgyLnsC0kkWPhGuy1BNcJnF5Sd/preview',
  },
  {
    title: 'DISCRETE MATHEMATICAL STRUCTURES',
    code: 'BCS405A',
    modelPaperLink: 'https://drive.google.com/file/d/1cOOJv05d1Dl_7pL7ANCMxXTuvUziD9ai/preview',
    solutionLink: 'https://drive.google.com/file/d/1iuXEzjqn6yqNc3AnkBMEyQN1M3qb0JYs/preview',
  },
  {
    title: 'Biology for Engineering',
    code: 'BBOC407',
    modelPaperLink: 'https://drive.google.com/file/d/1qRg6fD6doTfw9h51suNe5fbjuWgeECQO/preview',
    solutionLink: 'https://drive.google.com/file/d/1h_udrhNRqd0UiwdM8bVeH_PTXyWsVcKB/preview',
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
      <p>Download model papers, solutions, and old papers by subject name or code.</p>

      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="🔎 Search by subject name or code (e.g., BCS601)..."
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
                  📄 Question Paper
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
