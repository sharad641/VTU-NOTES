import React, { useState, useEffect } from "react";
import vtu2025 from "../data/vtu2025.json";
import "./Notes.css";

function VTU2025Notes() {
  const [branch, setBranch] = useState("CSE");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (vtu2025.branches[branch]) {
      setSubjects(vtu2025.branches[branch]);
    } else {
      setSubjects([]);
    }
  }, [branch]);

  return (
    <div className="notes-page">
      <h1>📚 VTU 2025 Scheme Notes</h1>

      {/* Branch Selector */}
      <div className="branch-selector">
        <label htmlFor="branch">Select Branch:</label>
        <select
          id="branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        >
          {Object.keys(vtu2025.branches).map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Subjects List */}
      <div className="subject-list">
        {subjects.map((sub, index) => (
          <div key={index} className="subject-card">
            <h3>
              {sub.subCode} - {sub.subName}
            </h3>
            <a
              href={sub.notesLink}
              target="_blank"
              rel="noopener noreferrer"
              className="button modern-button"
            >
              🔗 View Notes
            </a>
          </div>
        ))}

        {subjects.length === 0 && <p>No subjects found for this branch.</p>}
      </div>
    </div>
  );
}

export default VTU2025Notes;
