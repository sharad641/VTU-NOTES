import React, { useState, useEffect } from 'react';
import './TestPage.css';

const TestPage = () => {
    // Define test options and questions
    const testOptions = ['Coding Test', 'Aptitude Test'];
    const difficultyLevels = ['Easy', 'Medium', 'Hard'];

    const questions = {
        'Coding Test': {
            Easy: [
                {
                    question: 'What is 2 + 2?',
                    options: ['3', '4', '5', '6'],
                    correctAnswer: '4'
                },
                {
                    question: 'Write a function to reverse a string.',
                    options: ['Function to reverse a string', 'Function to sort a string', 'Function to split a string', 'Function to capitalize a string'],
                    correctAnswer: 'Function to reverse a string'
                },
                {
                    question: 'Which of the following is a valid JavaScript data type?',
                    options: ['integer', 'float', 'boolean', 'character'],
                    correctAnswer: 'boolean'
                },
                {
                    question: 'Which of these is an example of an object in Python?',
                    options: ['[1, 2, 3]', '({a: 1})', 'None', 'True'],
                    correctAnswer: '({a: 1})'
                },
                {
                    question: 'Which function is used to parse a string into an integer in JavaScript?',
                    options: ['parseInt()', 'parseFloat()', 'toInt()', 'convert()'],
                    correctAnswer: 'parseInt()'
                },
                {
                    question: 'Which of the following is used to declare a constant in JavaScript?',
                    options: ['const', 'let', 'var', 'constant'],
                    correctAnswer: 'const'
                },
                {
                    question: 'Which keyword is used to create a function in JavaScript?',
                    options: ['def', 'function', 'fun', 'create'],
                    correctAnswer: 'function'
                },
                {
                    question: 'Which of the following is a mutable data type in Python?',
                    options: ['List', 'Tuple', 'String', 'Integer'],
                    correctAnswer: 'List'
                },
                {
                    question: 'What is the result of 10 % 3 in JavaScript?',
                    options: ['1', '3', '0', '2'],
                    correctAnswer: '1'
                },
                {
                    question: 'Which method is used to add an element to the end of an array in JavaScript?',
                    options: ['push()', 'pop()', 'shift()', 'unshift()'],
                    correctAnswer: 'push()'
                }
            ],
            Medium: [
                {
                    question: 'What is the time complexity of a binary search?',
                    options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(n^2)'],
                    correctAnswer: 'O(log n)'
                },
                {
                    question: 'What is the time complexity of quicksort?',
                    options: ['O(n log n)', 'O(n^2)', 'O(log n)', 'O(n)'],
                    correctAnswer: 'O(n log n)'
                },
                {
                    question: 'Which of the following is the best sorting algorithm in terms of time complexity?',
                    options: ['Merge Sort', 'Bubble Sort', 'Quick Sort', 'Selection Sort'],
                    correctAnswer: 'Merge Sort'
                },
                {
                    question: 'Which algorithm is used to find the shortest path in a graph?',
                    options: ['DFS', 'BFS', 'Dijkstra\'s Algorithm', 'Kruskal\'s Algorithm'],
                    correctAnswer: 'Dijkstra\'s Algorithm'
                },
                {
                    question: 'Which of the following is true for a hash table?',
                    options: ['It stores values in sorted order', 'It requires a dynamic array', 'It uses a hash function to store values', 'It cannot handle collisions'],
                    correctAnswer: 'It uses a hash function to store values'
                },
                {
                    question: 'What is the time complexity of accessing an element in an array?',
                    options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
                    correctAnswer: 'O(1)'
                },
                {
                    question: 'Which of the following is an example of a linear data structure?',
                    options: ['Array', 'Stack', 'Queue', 'All of the above'],
                    correctAnswer: 'All of the above'
                },
                {
                    question: 'What is the purpose of the "this" keyword in JavaScript?',
                    options: ['It refers to the current object', 'It refers to the global object', 'It is used for function binding', 'It refers to the last element in an array'],
                    correctAnswer: 'It refers to the current object'
                },
                {
                    question: 'In which of the following languages is a "pointer" used?',
                    options: ['JavaScript', 'Python', 'C', 'Ruby'],
                    correctAnswer: 'C'
                },
                {
                    question: 'Which of the following is true for recursion?',
                    options: ['A recursive function calls itself', 'A recursive function uses a loop', 'Recursion always improves performance', 'Recursion does not require base case'],
                    correctAnswer: 'A recursive function calls itself'
                }
            ],
            Hard: [
                {
                    question: 'What is the time complexity of Merge Sort?',
                    options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
                    correctAnswer: 'O(n log n)'
                },
                {
                    question: 'Which of the following is a stable sorting algorithm?',
                    options: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Selection Sort'],
                    correctAnswer: 'Merge Sort'
                },
                {
                    question: 'Which of the following is the space complexity of Merge Sort?',
                    options: ['O(1)', 'O(n)', 'O(n log n)', 'O(log n)'],
                    correctAnswer: 'O(n)'
                },
                {
                    question: 'What is the time complexity of finding the kth smallest element using Quickselect?',
                    options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(log n)'],
                    correctAnswer: 'O(n)'
                },
                {
                    question: 'Which of the following best describes the purpose of a Hash Map?',
                    options: ['To store elements in sorted order', 'To store elements using keys', 'To find the minimum value in an array', 'To store elements in a dynamic array'],
                    correctAnswer: 'To store elements using keys'
                },
                {
                    question: 'What is the worst-case time complexity of quicksort?',
                    options: ['O(n log n)', 'O(n^2)', 'O(n)', 'O(log n)'],
                    correctAnswer: 'O(n^2)'
                },
                {
                    question: 'What is the space complexity of a recursive Depth First Search (DFS)?',
                    options: ['O(n)', 'O(n^2)', 'O(log n)', 'O(1)'],
                    correctAnswer: 'O(n)'
                },
                {
                    question: 'Which of the following is true for a Red-Black Tree?',
                    options: ['It is a self-balancing binary search tree', 'It always maintains a height of log(n)', 'It does not require balancing during insertions', 'It is a type of AVL tree'],
                    correctAnswer: 'It is a self-balancing binary search tree'
                },
                {
                    question: 'Which algorithm is used for finding the shortest path in a weighted graph?',
                    options: ['Kruskal\'s Algorithm', 'Dijkstra\'s Algorithm', 'Prim\'s Algorithm', 'Floyd-Warshall Algorithm'],
                    correctAnswer: 'Dijkstra\'s Algorithm'
                },
                {
                    question: 'What is the worst-case space complexity of quicksort?',
                    options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(n^2)'],
                    correctAnswer: 'O(n)'
                }
            ]
        },
        'Aptitude Test': {
            Easy: [
                {
                    question: 'If the sum of two numbers is 20, and one number is 12, what is the other number?',
                    options: ['7', '8', '9', '10'],
                    correctAnswer: '8'
                },
                {
                    question: 'What is the next number in the sequence: 2, 4, 8, 16, ...?',
                    options: ['20', '24', '32', '64'],
                    correctAnswer: '32'
                },
                {
                    question: 'A car travels 100 km in 2 hours. What is its average speed?',
                    options: ['40 km/h', '50 km/h', '60 km/h', '100 km/h'],
                    correctAnswer: '50 km/h'
                },
                {
                    question: 'What is 15% of 200?',
                    options: ['25', '30', '35', '40'],
                    correctAnswer: '30'
                },
                {
                    question: 'If a product costs 400 and is sold for 500, what is the profit percentage?',
                    options: ['20%', '25%', '30%', '40%'],
                    correctAnswer: '25%'
                },
                {
                    question: 'If a box contains 5 red balls and 3 green balls, what is the probability of picking a red ball?',
                    options: ['1/5', '5/8', '3/5', '3/8'],
                    correctAnswer: '5/8'
                },
                {
                    question: 'How many sides does a hexagon have?',
                    options: ['5', '6', '7', '8'],
                    correctAnswer: '6'
                },
                {
                    question: 'What is the area of a triangle with base 5 cm and height 8 cm?',
                    options: ['20 cm²', '25 cm²', '30 cm²', '40 cm²'],
                    correctAnswer: '20 cm²'
                },
                {
                    question: 'If a person earns 5000 per month and spends 3000, what is the savings rate?',
                    options: ['30%', '40%', '50%', '60%'],
                    correctAnswer: '40%'
                },
                {
                    question: 'What is the next number in the sequence: 5, 10, 20, 40, ...?',
                    options: ['50', '60', '80', '100'],
                    correctAnswer: '80'
                }
            ],
            Medium: [
                {
                    question: 'A train travels at 60 km/h for 3 hours. How far does it travel?',
                    options: ['180 km', '150 km', '200 km', '240 km'],
                    correctAnswer: '180 km'
                },
                {
                    question: 'The ratio of the ages of two people is 3:4. If the older person is 36 years old, what is the age of the younger person?',
                    options: ['27 years', '24 years', '21 years', '18 years'],
                    correctAnswer: '27 years'
                },
                {
                    question: 'A person buys a product for 600 and sells it for 720. What is the profit percentage?',
                    options: ['15%', '20%', '25%', '30%'],
                    correctAnswer: '20%'
                },
                {
                    question: 'What is the average of the numbers 12, 15, 18, 21?',
                    options: ['15', '16', '17', '18'],
                    correctAnswer: '16'
                },
                {
                    question: 'If a car covers 60 km in 1 hour, how long will it take to cover 180 km?',
                    options: ['2 hours', '3 hours', '4 hours', '5 hours'],
                    correctAnswer: '3 hours'
                },
                {
                    question: 'What is the area of a square with side length 8 cm?',
                    options: ['50 cm²', '64 cm²', '80 cm²', '100 cm²'],
                    correctAnswer: '64 cm²'
                },
                {
                    question: 'The sum of three numbers is 72. If two numbers are 24 and 36, what is the third number?',
                    options: ['12', '10', '8', '6'],
                    correctAnswer: '12'
                },
                {
                    question: 'What is the compound interest on 1000 at 10% for 2 years?',
                    options: ['200', '210', '220', '230'],
                    correctAnswer: '210'
                },
                {
                    question: 'How many degrees are in the sum of the interior angles of a hexagon?',
                    options: ['360°', '540°', '720°', '1080°'],
                    correctAnswer: '720°'
                },
                {
                    question: 'A person walks 20 meters east, then 30 meters north. What is the straight-line distance from his starting point?',
                    options: ['40 meters', '50 meters', '60 meters', '70 meters'],
                    correctAnswer: '50 meters'
                }
            ],
            Hard: [
                {
                    question: 'What is the time complexity of sorting a list of 1000 elements using merge sort?',
                    options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
                    correctAnswer: 'O(n log n)'
                },
                {
                    question: 'A person walks 10 km in 2 hours. What is his average speed?',
                    options: ['3 km/h', '4 km/h', '5 km/h', '6 km/h'],
                    correctAnswer: '5 km/h'
                },
                {
                    question: 'The sum of three consecutive numbers is 75. What is the middle number?',
                    options: ['24', '25', '26', '27'],
                    correctAnswer: '25'
                },
                {
                    question: 'If the area of a circle is 314 cm², what is its radius?',
                    options: ['5 cm', '7 cm', '10 cm', '15 cm'],
                    correctAnswer: '10 cm'
                },
                {
                    question: 'What is the sum of the first 10 prime numbers?',
                    options: ['129', '120', '112', '130'],
                    correctAnswer: '129'
                },
                {
                    question: 'A train moves at a speed of 72 km/h. How much time does it take to cover 90 km?',
                    options: ['1 hour', '1.5 hours', '2 hours', '2.5 hours'],
                    correctAnswer: '1.25 hours'
                },
                {
                    question: 'A car travels 150 km in 3 hours and 45 minutes. What is its average speed?',
                    options: ['40 km/h', '42 km/h', '45 km/h', '50 km/h'],
                    correctAnswer: '40 km/h'
                },
                {
                    question: 'The perimeter of a rectangle is 50 meters. If the length is 15 meters, what is the width?',
                    options: ['10 meters', '12 meters', '15 meters', '20 meters'],
                    correctAnswer: '10 meters'
                },
                {
                    question: 'The average of 5 numbers is 25. What is the sum of the numbers?',
                    options: ['100', '125', '150', '200'],
                    correctAnswer: '125'
                },
                {
                    question: 'What is the sum of the interior angles of a polygon with 10 sides?',
                    options: ['1800°', '1500°', '1200°', '900°'],
                    correctAnswer: '1440°'
                }
            ]
        }
    };

    const [selectedTest, setSelectedTest] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [questionsList, setQuestionsList] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [timer, setTimer] = useState(600); // 10 minutes timer (in seconds)
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle test selection
    const handleTestSelection = (test) => {
        setSelectedTest(test);
        setSelectedDifficulty(null); // Reset difficulty when a new test is selected
        setQuestionsList([]);
        setScore(null);
        setTimer(600); // Reset timer on test selection
    };

    // Handle difficulty selection
    const handleDifficultySelection = (difficulty) => {
        setSelectedDifficulty(difficulty);
        setQuestionsList(questions[selectedTest][difficulty]);
    };

    // Handle answer selection
    const handleOptionChange = (questionIndex, selectedOption) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: selectedOption,
        }));
    };

    // Calculate score after submission
    const calculateScore = () => {
        let totalScore = 0;
        questionsList.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) {
                totalScore++;
            }
        });
        setScore(totalScore);
        setIsSubmitting(true); // Trigger submission state
    };

    // Timer countdown effect
    useEffect(() => {
        if (timer > 0 && !isSubmitting) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer, isSubmitting]);

    // Progress Bar Calculation
    const progressPercentage = (questionsList.length > 0) 
        ? (Object.keys(answers).length / questionsList.length) * 100
        : 0;

    return (
        <div className="test-page-container">
            <header className="test-page-header">
                <h1>MCQ Quiz</h1>
                <p>Test your knowledge and track your progress!</p>
            </header>

            {/* Test Selection */}
            {!selectedTest && (
                <section className="test-selection">
                    <h2>Select a Test</h2>
                    <div className="test-options">
                        {testOptions.map((test, index) => (
                            <button key={index} onClick={() => handleTestSelection(test)}>{test}</button>
                        ))}
                    </div>
                </section>
            )}

            {/* Difficulty Level Selection */}
            {selectedTest && !selectedDifficulty && (
                <section className="difficulty-selection">
                    <h2>Select Difficulty Level</h2>
                    <div className="difficulty-options">
                        {difficultyLevels.map((level, index) => (
                            <button key={index} onClick={() => handleDifficultySelection(level)}>{level}</button>
                        ))}
                    </div>
                </section>
            )}

            {/* Progress Bar */}
            {selectedTest && selectedDifficulty && (
                <div className="progress-bar-container">
                    <progress value={progressPercentage} max={100}></progress>
                    <span>{Math.round(progressPercentage)}% Completed</span>
                </div>
            )}

            {/* Timer */}
            {selectedTest && selectedDifficulty && !isSubmitting && (
                <div className="timer">
                    <p>Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
                </div>
            )}

            {/* Questions and Options */}
            {selectedTest && selectedDifficulty && (
                <section className="test-questions">
                    <h2>{selectedTest} - {selectedDifficulty} Level</h2>
                    {questionsList.map((q, index) => (
                        <div key={index} className={`question-box ${isSubmitting ? (answers[index] === q.correctAnswer ? 'correct' : 'incorrect') : ''}`}>
                            <p>{q.question}</p>
                            <div className="options-container">
                                {q.options.map((option, idx) => (
                                    <div key={idx} className="option">
                                        <input
                                            type="radio"
                                            id={`option-${index}-${idx}`}
                                            name={`question-${index}`}
                                            value={option}
                                            onChange={() => handleOptionChange(index, option)}
                                            checked={answers[index] === option}
                                        />
                                        <label htmlFor={`option-${index}-${idx}`}>{option}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Submit Button */}
            {selectedTest && selectedDifficulty && !isSubmitting && (
                <section className="test-result">
                    <button onClick={calculateScore} className="submit-button">Submit Test</button>
                </section>
            )}

            {/* Score Display */}
            {isSubmitting && score !== null && (
                <section className="score-display">
                    <h2>Your Score: {score} / {questionsList.length}</h2>
                </section>
            )}
        </div>
    );
};

export default TestPage;
