import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGraduationCap, FaLaptopCode, FaMicrochip, FaArrowRight, FaRocket } from "react-icons/fa";
import "./BranchModern.css"; // CHANGED: Modern CSS

const branches = [
  {
    id: "first-year",
    title: "First Year / P-Cycle",
    description: "Start strong with foundational notes, model papers, and resources tailored for 1st & 2nd semester.",
    icon: <FaGraduationCap />,
    color: "blue",
    path: "/branch/first-year"
  },
  {
    id: "cse",
    title: "CSE & ISE Stream",
    description: "Master algorithms, data structures, and core CS subjects with updated 2022 scheme materials.",
    icon: <FaLaptopCode />,
    color: "indigo",
    path: "/branch/cse"
  },
  {
    id: "ece",
    title: "Electronics (ECE)",
    description: "Deep dive into circuits, signals, and communication systems with comprehensive study guides.",
    icon: <FaMicrochip />,
    color: "purple",
    path: "/branch/ece"
  }
];

function BranchSelection() {
  const navigate = useNavigate();

  return (
    <div className="branch-page-container">
      <div className="branch-bg-decoration"></div>

      <div className="branch-content">
        <div className="branch-hero">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="branch-hero-badge"><FaRocket /> VTU NOTES PORTAL</span>
            <h1>Select Your Stream</h1>
            <p>
              Choose your engineering path to access premium notes, model papers, and question banks.
            </p>
          </motion.div>
        </div>

        <div className="branch-selection-grid">
          {branches.map((branch, index) => (
            <motion.div
              key={branch.id}
              className="branch-card-glass"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => navigate(branch.path)}
            >
              <div className="bm-icon-wrapper">
                {branch.icon}
              </div>

              <h3 className="bm-title">{branch.title}</h3>
              <p className="bm-desc">{branch.description}</p>

              <div className="bm-footer">
                <span>View Resources</span>
                <FaArrowRight className="bm-arrow" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BranchSelection;