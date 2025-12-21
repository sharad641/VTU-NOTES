import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCalculator, FaBook, FaStar, FaPercent, FaPlus, 
  FaLayerGroup, FaUndo, FaGraduationCap, FaArrowRight 
} from "react-icons/fa";
import "./Calculator.css";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const Calculator = () => {
  const [activeTab, setActiveTab] = useState("sgpa");

  return (
    <div className="calc-page-wrapper">
      
      {/* Hero Header */}
      <header className="calc-hero">
        <div className="hero-icon-circle">
          <FaCalculator />
        </div>
        <h1>Academic <span className="highlight-blue">Calculators</span></h1>
        <p>Calculate your SGPA, CGPA, and Percentage with precision.</p>
      </header>

      {/* Segmented Control / Tabs */}
      <div className="calc-tabs-container">
        <div className="calc-tabs">
          <button 
            className={`tab-btn ${activeTab === "sgpa" ? "active" : ""}`} 
            onClick={() => setActiveTab("sgpa")}
          >
            <FaLayerGroup /> SGPA
          </button>
          <button 
            className={`tab-btn ${activeTab === "cgpa" ? "active" : ""}`} 
            onClick={() => setActiveTab("cgpa")}
          >
            <FaGraduationCap /> CGPA
          </button>
          <button 
            className={`tab-btn ${activeTab === "percentage" ? "active" : ""}`} 
            onClick={() => setActiveTab("percentage")}
          >
            <FaPercent /> GPA to %
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="calc-display-area">
        <AnimatePresence mode="wait">
          {activeTab === "sgpa" && <SGPACalculator key="sgpa" />}
          {activeTab === "cgpa" && <CGPACalculator key="cgpa" />}
          {activeTab === "percentage" && <GpaToPercentageCalculator key="percent" />}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* =========================================
   SUB-COMPONENT: SGPA CALCULATOR
   ========================================= */
const SGPACalculator = () => {
  const [selectedCycle, setSelectedCycle] = useState("");
  const [subjects, setSubjects] = useState([{ subject: "", credits: "", marks: "" }]);
  const [sgpa, setSgpa] = useState(null);
  const [error, setError] = useState("");

  // Logic Preserved
  const convertMarksToGrade = (marks) => {
    if (marks >= 90) return 10;
    if (marks >= 80) return 9;
    if (marks >= 70) return 8;
    if (marks >= 60) return 7;
    if (marks >= 50) return 6;
    if (marks >= 40) return 5;
    return 0;
  };

  const calculateSgpa = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    setError("");

    subjects.forEach((sub) => {
      const credits = parseFloat(sub.credits);
      const marks = parseFloat(sub.marks);

      if (isNaN(credits) || isNaN(marks)) {
        setError("⚠️ Please fill all credits and marks correctly.");
        return;
      }

      const grade = convertMarksToGrade(marks);
      totalCredits += credits;
      totalPoints += credits * grade;
    });

    if (totalCredits === 0) {
      setError("Total credits cannot be zero.");
      return;
    }
    setSgpa((totalPoints / totalCredits).toFixed(2));
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...subjects];
    list[index][name] = value;
    setSubjects(list);
  };

  const addSubject = () => {
    setSubjects([...subjects, { subject: "", credits: "", marks: "" }]);
  };

  const reset = () => {
    setSubjects([{ subject: "", credits: "", marks: "" }]);
    setSgpa(null);
    setSelectedCycle("");
    setError("");
  };

  return (
    <motion.div className="calc-card" variants={fadeIn} initial="hidden" animate="visible" exit="exit">
      {!selectedCycle ? (
        <div className="selection-view">
          <h3>Select Your Cycle / Semester</h3>
          <div className="cycle-grid">
            {["Physics Cycle", "Chemistry Cycle", "3rd Sem", "4th Sem", "5th Sem", "6th Sem", "7th Sem", "8th Sem"].map((c) => (
              <button key={c} className="cycle-btn" onClick={() => setSelectedCycle(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="calculation-view">
          <div className="view-header">
            <h3>{selectedCycle} Calculation</h3>
            <button className="reset-link" onClick={reset}><FaUndo /> Reset</button>
          </div>

          <div className="input-rows">
            {subjects.map((sub, i) => (
              <div key={i} className="input-row">
                <div className="input-group flex-grow">
                  <FaBook className="input-icon" />
                  <input 
                    name="subject" 
                    placeholder={`Subject ${i + 1} Name`} 
                    value={sub.subject} 
                    onChange={(e) => handleInputChange(i, e)} 
                  />
                </div>
                <div className="input-group small">
                  <FaStar className="input-icon" />
                  <input 
                    type="number" 
                    name="credits" 
                    placeholder="Credits" 
                    value={sub.credits} 
                    onChange={(e) => handleInputChange(i, e)} 
                  />
                </div>
                <div className="input-group small">
                  <FaCalculator className="input-icon" />
                  <input 
                    type="number" 
                    name="marks" 
                    placeholder="Marks" 
                    value={sub.marks} 
                    onChange={(e) => handleInputChange(i, e)} 
                  />
                </div>
              </div>
            ))}
          </div>

          <button className="add-btn" onClick={addSubject}>
            <FaPlus /> Add Subject
          </button>

          <div className="action-area">
            <button className="calc-btn-primary" onClick={calculateSgpa}>
              Calculate SGPA <FaArrowRight />
            </button>
          </div>

          {error && <div className="error-msg">{error}</div>}
          
          {sgpa !== null && (
            <motion.div className="result-card" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
              <span className="result-label">Your SGPA</span>
              <span className="result-value">{sgpa}</span>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

/* =========================================
   SUB-COMPONENT: CGPA CALCULATOR
   ========================================= */
const CGPACalculator = () => {
  const [semesters, setSemesters] = useState([{ semester: "", credits: "", sgpa: "" }]);
  const [cgpa, setCgpa] = useState(null);

  const calculateCgpa = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    
    semesters.forEach((sem) => {
      const cr = parseFloat(sem.credits);
      const s = parseFloat(sem.sgpa);
      if (cr > 0 && !isNaN(s)) {
        totalCredits += cr;
        totalPoints += cr * s;
      }
    });

    setCgpa(totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0);
  };

  const handleChange = (i, e) => {
    const list = [...semesters];
    list[i][e.target.name] = e.target.value;
    setSemesters(list);
  };

  return (
    <motion.div className="calc-card" variants={fadeIn} initial="hidden" animate="visible" exit="exit">
      <h3>Cumulative Grade Point Average</h3>
      <div className="input-rows">
        {semesters.map((sem, i) => (
          <div key={i} className="input-row">
            <div className="input-group flex-grow">
              <FaLayerGroup className="input-icon" />
              <input name="semester" placeholder={`Sem ${i+1}`} value={sem.semester} onChange={(e) => handleChange(i, e)} />
            </div>
            <div className="input-group">
              <FaStar className="input-icon" />
              <input type="number" name="credits" placeholder="Credits" value={sem.credits} onChange={(e) => handleChange(i, e)} />
            </div>
            <div className="input-group">
              <FaGraduationCap className="input-icon" />
              <input type="number" name="sgpa" placeholder="SGPA" value={sem.sgpa} onChange={(e) => handleChange(i, e)} />
            </div>
          </div>
        ))}
      </div>

      <button className="add-btn" onClick={() => setSemesters([...semesters, { semester: "", credits: "", sgpa: "" }])}>
        <FaPlus /> Add Semester
      </button>

      <div className="action-area">
        <button className="calc-btn-primary" onClick={calculateCgpa}>
          Calculate CGPA <FaArrowRight />
        </button>
      </div>

      {cgpa !== null && (
        <motion.div className="result-card" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
          <span className="result-label">Your CGPA</span>
          <span className="result-value">{cgpa}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

/* =========================================
   SUB-COMPONENT: PERCENTAGE
   ========================================= */
const GpaToPercentageCalculator = () => {
  const [gpa, setGpa] = useState("");
  const [percent, setPercent] = useState(null);

  const calculate = () => {
    const val = parseFloat(gpa);
    if (!isNaN(val) && val >= 0 && val <= 10) {
      setPercent(((val - 0.75) * 10).toFixed(2)); // Standard VTU Formula often (SGPA - 0.75)*10, Check your specific logic
      // NOTE: Your original code used (gpa - 0.5) * 10. I kept your logic below:
      setPercent(((val - 0.5) * 10).toFixed(2)); 
    } else {
      setPercent("Invalid");
    }
  };

  return (
    <motion.div className="calc-card center-content" variants={fadeIn} initial="hidden" animate="visible" exit="exit">
      <h3>Convert GPA to Percentage</h3>
      <p className="helper-text">Enter your SGPA or CGPA scale (0-10)</p>
      
      <div className="input-group large-input">
        <FaGraduationCap className="input-icon" />
        <input 
          type="number" 
          placeholder="Enter GPA..." 
          value={gpa} 
          onChange={(e) => setGpa(e.target.value)} 
        />
      </div>

      <button className="calc-btn-primary full-width" onClick={calculate}>
        Convert <FaPercent />
      </button>

      {percent !== null && (
        <motion.div className="result-card mt-large" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
          <span className="result-label">Percentage</span>
          <span className="result-value">{percent === "Invalid" ? "Invalid Input" : `${percent}%`}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Calculator;