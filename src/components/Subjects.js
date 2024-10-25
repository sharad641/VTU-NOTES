import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import modulesData from '../modules.json'; // Import the local JSON file
import './Subjects.css';

const Subjects = () => {
  const { branch, semester } = useParams();
  const [selectedSubject, setSelectedSubject] = useState(null); // Track which subject is selected

  // Data for subjects
  const subjectsData = {
    cse: {
      1: ['Mathematics', 'Physics', 'Chemistry'],
      2: ['Data Structures', 'Discrete Mathematics'],
      3: ['Computer Networks', 'Database Management Systems'],
      4: ['Software Engineering', 'Operating Systems'],
      5: ['Computer Networks', 'Software Engineering','Theory oF Computation','RMIP'],
      6: ['Machine Learning', 'Compiler Design'],
      7: ['Cloud Computing', 'Big Data'],
      8: ['Project Work', 'Entrepreneurship'],
    },
    ece: {
      1: ['Mathematics', 'Electronics'],
      2: ['Signals and Systems', 'Circuit Theory'],
      3: ['Microprocessors', 'Control Systems'],
      4: ['Communication Systems', 'Digital Signal Processing'],
      5: ['Embedded Systems', 'VLSI Design'],
      6: ['Wireless Communication', 'Optical Communication'],
      7: ['Robotics', 'Artificial Intelligence'],
      8: ['Project Work', 'Technical Seminar'],
    },
  };

  // Function to handle subject click and show modules
  const handleSubjectClick = (subject) => {
    if (selectedSubject === subject) {
      setSelectedSubject(null); // Toggle off
    } else {
      setSelectedSubject(subject); // Set the clicked subject
    }
  };

  const subjects = subjectsData[branch.toLowerCase()]?.[semester] || [];

  // Render the module buttons dynamically
  const renderModules = () => {
    const modules = modulesData[branch.toLowerCase()][semester][selectedSubject] || [];

    return (
      <div className="modules">
        <h3>Modules for {selectedSubject}</h3>
        <ul>
          {modules.map((module, index) => (
            <li key={index}>
              <button onClick={() => handleModuleClick(module)}>
                {module.title} {/* Display module title from the JSON */}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Handle click for modules (open PDF in a new tab)
  const handleModuleClick = (module) => {
    window.open(module.url, '_blank'); // Open the URL of the selected module
  };

  return (
    <div className="subjects" style={{ marginTop: '80px' }}>
      <h2>{branch.toUpperCase()} - Semester {semester}</h2>
      <h3>Subjects:</h3>
      <ul>
        {subjects.map((subject) => (
          <li key={subject}>
            <button onClick={() => handleSubjectClick(subject)}>
              {subject}
            </button>
            {selectedSubject === subject && renderModules()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subjects;
