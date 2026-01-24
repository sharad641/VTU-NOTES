
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFilePdf, FaTimes, FaGraduationCap, FaCode } from 'react-icons/fa';
import './SearchResults.css';
import { moduleDetails } from '../data/moduleData';

const SearchResults = ({ query, onClose }) => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) return;

    const lowerQuery = query.toLowerCase();
    const matches = [];

    // Search across the moduleDetails structure
    // Structure: branch -> semester -> subject[] -> modules[]
    Object.keys(moduleDetails).forEach(branch => {
      const semesterData = moduleDetails[branch];
      Object.keys(semesterData).forEach(sem => {
        const subjects = semesterData[sem];
        subjects.forEach(subject => {
          // Check subject title/code
          if (
            subject.title.toLowerCase().includes(lowerQuery) ||
            subject.code.toLowerCase().includes(lowerQuery)
          ) {
            matches.push({
              type: 'subject',
              title: subject.title,
              subTitle: `${branch.toUpperCase()} - Sem ${sem}`,
              path: `/branch/${branch}/${sem}/modules/${encodeURIComponent(subject.title)}`,
              icon: <FaGraduationCap />
            });
          }

          // Check modules/files
          if (subject.modules) {
            subject.modules.forEach(mod => {
              if (
                mod.title.toLowerCase().includes(lowerQuery) ||
                (mod.tags && mod.tags.some(t => t.toLowerCase().includes(lowerQuery)))
              ) {
                 matches.push({
                  type: 'file',
                  title: mod.title,
                  subTitle: `${subject.title} (${subject.code})`,
                  path: null, // Files might need detailed navigation or direct open, but we link to the module page for context
                  linkPath: `/branch/${branch}/${sem}/modules/${encodeURIComponent(subject.title)}`,
                  fileUrl: mod.fileUrl,
                  icon: <FaFilePdf />
                });
              }
            });
          }
        });
      });
    });

    setResults(matches.slice(0, 10)); // Limit to 10 results
  }, [query]);

  const handleResultClick = (result) => {
    if (result.path) {
      navigate(result.path);
      onClose();
    } else if (result.linkPath) {
        navigate(result.linkPath);
        onClose();
    }
  };

  return (
    <div className="search-overlay">
      <div className="search-modal">
        <div className="search-header">
          <h3>Search Results for "{query}"</h3>
          <button onClick={onClose} className="close-btn"><FaTimes /></button>
        </div>
        
        <div className="search-list">
          {results.length === 0 ? (
            <div className="no-results">No notes found. Try a subject code or name.</div>
          ) : (
            results.map((res, idx) => (
              <div key={idx} className="search-result-item" onClick={() => handleResultClick(res)}>
                <div className="result-icon">{res.icon}</div>
                <div>
                  <div className="result-title">{res.title}</div>
                  <div className="result-subtitle">{res.subTitle}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
