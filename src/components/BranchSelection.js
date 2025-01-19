import React from "react";
import { useNavigate } from "react-router-dom";
import "./BranchSelection.css";

function BranchSelection() {
  const navigate = useNavigate();

  const handleBranchClick = (branch) => {
    navigate(`/branch/${branch}`);
  };

  return (
    <div className="branch-container">
      <h1 className="branch-header">VTU Notes Categories (2022 Scheme)</h1>
      <div className="branch-section">
        {/* First Year Card */}
        <div className="branch-card premium-card" onClick={() => handleBranchClick("first-year")}>
          <div className="branch-image">
            <h2>First Year</h2>
          </div>
          <div className="branch-content">
            <span className="branch-tag premium-tag">First Year</span>
            <h3>Explore First Year Notes</h3>
            <p>
              Download the latest VTU notes, model papers, previous year question banks, 
              and much more tailored for first-year engineering students!
            </p>
            <div className="branch-meta">
              <span>📅 21-12-2024</span>
              <span>👤vtunotesforall</span>
            </div>
            <p className="brand-tag">Powered by <strong>vtunotesforall.in</strong></p>
          </div>
        </div>

        {/* CSE-ISE Card */}
        <div className="branch-card premium-card" onClick={() => handleBranchClick("cse")}>
          <div className="branch-image">
            <h2>CSE-ISE</h2>
          </div>
          <div className="branch-content">
            <span className="branch-tag premium-tag">CSE-ISE</span>
            <h3>Explore CSE Notes</h3>
            <p>
              Access comprehensive VTU notes, model papers, question banks, 
              and important resources for CSE & ISE branches!
            </p>
            <div className="branch-meta">
              <span>📅 21-12-2024</span>
              <span>👤 vtunotesforall</span>
            </div>
            <p className="brand-tag">Powered by <strong>vtunotesforall.in</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BranchSelection;
