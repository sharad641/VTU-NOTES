// src/components/Subjects.js
import React, {  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
 // Import the local JSON file
import './Subjects.css';

const Subjects = () => {
  const { branch, semester } = useParams();
  const navigate = useNavigate(); // Initialize the navigate function
  

  const subjectsData = {
    'first-year': {
      1: [
        { name: 'Mathematics For CSE', code: 'BMATS101', credits: 4, info: 'First Semester Mathematics for CSE Module 1 to 5 Notes, Solved Model Question papers, Lab Manual' },
        { name: 'Applied Physics For CSE', code: 'BPHYS102/202', credits: 3, info: 'First Semester Physics Module 1 to 5 Notes, Solved Model Question papers, Lab Manual' },
        { name: 'Principle of Programming Using C', code: 'BPOP103/203', credits: 4, info: 'First Semester Principles of Programming Using C for CSE Module 1 to 5 Notes, Solved Model Question papers, Lab Manual.' },
        { name: 'Communicative English', code: 'BENGK106', credits: 2, info: 'First Semester Communicative English Module 1 to 5 MCQ, Solved Model Question papers' },
        { name: 'Indian Constitution', code: 'BICOK107', credits: 2, info: 'First Semester Indian Constitution Module 1 to 5 MCQ, Solved Model Question papers' },
        { name: 'Scientific Foundation Of Health', code: 'BSFHK158', credits: 2, info: 'First Semester Scientific Foundation Of Health Module 1 to 5 MCQ, Solved Model Question papers' },
        { name: 'Introduction to Civil Engineering', code: 'BESCK104A', credits: 3, info: 'First Semester Introduction to Civil Engineering Module 1 to 5 Notes, Solved Model Question papers.' },
      ],
      2: [
        { name: 'Mathematics For CSE', code: 'BMATS201', credits: 4, info: 'Advanced mathematical concepts for computer science.' },
        { name: 'Applied Chemistry For CSE', code: 'BCHES102/202', credits: 3, info: 'Chemistry principles in engineering contexts.' },
        { name: 'Computer Aided Engineering Drawing', code: 'BCEDK203', credits: 3, info: 'Techniques for engineering drawing using software.' },
        { name: 'Professional Writing Skills in English', code: 'BPWSK206', credits: 2, info: 'Development of professional writing skills.' },
        { name: 'Samskrutika Kannada', code: 'BKSKK207', credits: 2, info: 'Cultural study through the Kannada language.' },
        { name: 'Innovation and Design Thinking', code: 'BIDTK258', credits: 3, info: 'Creative problem solving and design methodologies.' },
        { name: 'Introduction to Programming Language', code: 'BPLCK105/205B', credits: 4, info: 'Introduction to programming languages and their paradigms.' },
        { name: 'Introduction to Electrical Engineering', code: 'BESCK104/204B', credits: 3, info: 'Fundamentals of electrical engineering concepts.' },
      ],
    },
    cse: {
      3: [
        { name: 'Mathematics For CSE', code: 'BMATS301', credits: 4, info: 'Study of mathematical algorithms applied in computer science.' },
        { name: 'Digital Design  and Computer Organization', code: 'BCS302', credits: 4, info: 'Fundamental principles of physics.' },
  
        { name: 'OPERATING SYSTEMS  ', code: 'BCS303', credits: 4, info: 'Study of data organization and management.' },
        { name: 'DATA STRUCTURES AND APPLICATIONS ', code: 'BCS304', credits: 3, info: 'To explain fundamentals of data structures and their applications.  ' },
        { name: 'Object Oriented Programming with JAVA ', code: 'BCS306A', credits: 3, info: 'To understand Object Oriented Programming Features of JAVA.    ' },
        { name: 'OBJECT ORIENTED PROGRAMMING with C++', code: 'BCS306B', credits: 3, info: '  To understand the generic programming features of C++ including Exception handling ' },
        { name: 'DATA STRUCTURES LABORATORY', code: 'BCSL305', credits: 1, info: 'Dynamic memory management    ' },
        { name: 'Social Connect & Responsibility ', code: 'BSCK307', credits: 1, info: 'Identify the needs and problems of the community and involve them in problem –solving.' },

      ],

      4: [
        { name: 'Analysis & Design of Algorithms ', code: 'BCS401', credits: 3, info: 'To learn the methods for analyzing algorithms and evaluating their performance. ' },
        { name: 'MICROCONTROLLERS', code: 'BCS402', credits: 3, info: 'Understand the fundamentals of ARM-based systems and basic architecture of CISC and RISC.' },
  
        { name: 'DATABASE MANAGEMENT SYSTEM   ', code: 'BCS403', credits: 4, info: 'To Provide a strong foundation in database concepts, technology, and practice.' },
        { name: 'DISCRETE MATHEMATICAL STRUCTURES  ', code: 'BCS405A', credits: 3, info: 'To help students to understand discrete and continuous mathematical structures. ' },
        { name: 'GRAPH THEORY   ', code: 'BCS405B', credits: 3, info: ' Understand the basic concepts of graphs and their properties, and operations of graphs. ' },
        { name: 'Analysis & Design of Algorithms Lab ', code: 'BCSL404', credits: 1, info: ' To apply diverse design strategies for effective problem-solving. ' },
        { name: 'ARTIFICIAL INTELLIGENCE  ', code: 'BAD402', credits: 4, info: 'Gain a historical perspective of AI and its foundations. Get to know approaches of inference, perception, knowledge representation, and learning  ' },
        { name: 'OPTIMIZATION TECHNIQUE   ', code: 'BCS405C', credits: 3, info: 'Gain the knowledge of linear algebra tools' },

      ],
    },
    ece: {
      3: [
        { name: 'Mathematics', code: 'BMATH301', credits: 4, info: 'Advanced mathematics for electrical engineering.' },
        { name: 'Electronics', code: 'BELE301', credits: 3, info: 'Introduction to electronic circuits.' },
      ],
    },
  };

  // Function to handle subject click and navigate to ModuleDetail
  const handleSubjectClick = (subject) => {
    navigate(`/branch/${branch}/${semester}/modules/${subject.name}`);
  };

  // Retrieve subjects based on selected branch and semester
  const subjects = subjectsData[branch.toLowerCase()]?.[parseInt(semester)] || [];

  return (
    <div className="subjects" style={{ marginTop: '80px' }}>
      <h2>{branch.toUpperCase()} - Semester {semester}</h2>
      <h3>Subjects:</h3>
      <ul>
        {subjects.map((subject) => (
          <li key={subject.name} className="subject-item">
            <div className="subject-box" onClick={() => handleSubjectClick(subject)}>
              <div className="subject-info">
                <h4>{subject.name}</h4>
                <span className="subject-code">{subject.code}</span>
              </div>
              <div className="credits-box">Credits: {subject.credits}</div>
              <div className="subject-details">{subject.info}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subjects;
