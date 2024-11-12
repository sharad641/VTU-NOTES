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
                    question: 'Which of the following is used to declare a variable in JavaScript?',
                    options: ['var', 'let', 'const', 'All of the above'],
                    correctAnswer: 'All of the above'
                },
                {
                    question: 'What does the following code do? `console.log(3 + 4 + "5")`',
                    options: ['Outputs 75', 'Outputs 12', 'Outputs "75"', 'Outputs "34"'],
                    correctAnswer: 'Outputs "75"'
                },
                {
                    question: 'Which of these methods can be used to loop through an array in JavaScript?',
                    options: ['for', 'forEach', 'map', 'All of the above'],
                    correctAnswer: 'All of the above'
                },
                {
                    question: 'What will be the output of the following JavaScript code?\n`console.log(!!"hello")`',
                    options: ['false', 'true', 'undefined', 'NaN'],
                    correctAnswer: 'true'
                },
                {
                    question: 'Which of the following is NOT a valid JavaScript data type?',
                    options: ['boolean', 'number', 'object', 'character'],
                    correctAnswer: 'character'
                },
                {
                    question: 'What is the correct syntax for adding a comment in JavaScript?',
                    options: ['// This is a comment', '/* This is a comment */', '<!-- This is a comment -->', 'Both A and B'],
                    correctAnswer: 'Both A and B'
                },
                {
                    question: 'Which operator is used to compare two values in JavaScript?',
                    options: ['=', '==', '===', '!='],
                    correctAnswer: '=='
                },
                {
                    question: 'What will the following code print?\n`console.log(10 / 2)`',
                    options: ['2', '5', '0', 'NaN'],
                    correctAnswer: '5'
                },
                {
                    question: 'Which of these data structures is ordered and indexed?',
                    options: ['Object', 'Array', 'Set', 'Map'],
                    correctAnswer: 'Array'
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
                },{
                    question: 'Given the object `let obj = { name: "Alice", age: 25 };`, what will `obj.name` return?',
                    options: ['Alice', 'name', '25', 'undefined'],
                    correctAnswer: 'Alice'
                },
                {
                    question: 'What will the following code output? `for (let i = 0; i < 3; i++) { console.log(i); }`',
                    options: ['1 2 3', '0 1 2', '0 1 2 3', '0 1'],
                    correctAnswer: '0 1 2'
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
                },
                {
                    question: 'Given an n x n matrix, write an algorithm to rotate the matrix by 90 degrees clockwise in-place. What is the time complexity of your solution?',
                    options: ['O(n)', 'O(n^2)', 'O(n log n)', 'O(1)'],
                    correctAnswer: 'O(n^2)'
                },
                {
                    question: 'Design and implement an LRU (Least Recently Used) cache. What is the time complexity of both the `get` and `put` operations in your design?',
                    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
                    correctAnswer: 'O(1)'
                },
                {
                    question: 'Given two sorted arrays of size m and n, find the median of the two sorted arrays in logarithmic time. What is the time complexity of your solution?',
                    options: ['O(log m + log n)', 'O(m + n)', 'O(log(min(m, n)))', 'O(n^2)'],
                    correctAnswer: 'O(log(min(m, n)))'
                },
                {
                    question: 'What is the time complexity of Kadane’s algorithm to find the maximum sum of a contiguous subarray in an array of size n?',
                    options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
                    correctAnswer: 'O(n)'
                },
                {
                    question: 'How can you detect a cycle in an undirected graph? What is the time complexity of your algorithm?',
                    options: ['O(n)', 'O(m)', 'O(n + m)', 'O(n^2)'],
                    correctAnswer: 'O(n + m)'
                },
                {
                    question: 'How would you check if two strings are permutations of each other in terms of time complexity?',
                    options: ['O(n log n)', 'O(n^2)', 'O(n)', 'O(1)'],
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
            question: 'Which of the following is a valid C data type?',
            options: ['int', 'float', 'char', 'All of the above'],
            correctAnswer: 'All of the above'
        },
        {
            question: 'What is the time complexity of a linear search algorithm?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
            correctAnswer: 'O(n)'
        },
        {
            question: 'A car travels 100 km in 2 hours. What is its average speed?',
            options: ['40 km/h', '50 km/h', '60 km/h', '100 km/h'],
            correctAnswer: '50 km/h'
        },
        {
            question: 'Which of the following is the base case for a recursive function?',
            options: ['Return statement', 'For loop', 'If statement', 'While loop'],
            correctAnswer: 'If statement'
        },
        {
            question: 'In a circuit, if the resistance is doubled and the voltage is halved, what will happen to the power?',
            options: ['It will remain the same', 'It will be halved', 'It will be doubled', 'It will be quartered'],
            correctAnswer: 'It will be quartered'
        },
        {
            question: 'If a product costs 400 and is sold for 500, what is the profit percentage?',
            options: ['20%', '25%', '30%', '40%'],
            correctAnswer: '25%'
        },
        {
            question: 'Which of the following is the correct formula for calculating the area of a triangle?',
            options: ['base * height', 'base * height / 2', 'length * width', 'radius² * π'],
            correctAnswer: 'base * height / 2'
        },
        {
            question: 'How many sides does a hexagon have?',
            options: ['5', '6', '7', '8'],
            correctAnswer: '6'
        }
    ],
    Medium: [
        {
            question: 'A train travels at 60 km/h for 3 hours. How far does it travel?',
            options: ['180 km', '150 km', '200 km', '240 km'],
            correctAnswer: '180 km'
        },
        {
            question: 'What is the output of the following C code snippet: `int a = 5; printf("%d", a);`?',
            options: ['5', 'a', 'error', 'undefined'],
            correctAnswer: '5'
        },
        {
            question: 'What is the value of the expression (a + b)²?',
            options: ['a² + b²', 'a² + 2ab + b²', '2ab', 'a² - b²'],
            correctAnswer: 'a² + 2ab + b²'
        },
        {
            question: 'A resistor has a value of 10 ohms. If the voltage across it is 20 volts, what is the current?',
            options: ['1 A', '2 A', '3 A', '4 A'],
            correctAnswer: '2 A'
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
            question: 'Which of the following is NOT a valid HTTP method?',
            options: ['GET', 'POST', 'FETCH', 'DELETE'],
            correctAnswer: 'FETCH'
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
            question: 'What is the output of the following code in C: `int arr[3] = {1, 2, 3}; printf("%d", arr[2]);`?',
            options: ['1', '2', '3', 'error'],
            correctAnswer: '3'
        },
        {
            question: 'A person buys a product for 600 and sells it for 720. What is the profit percentage?',
            options: ['15%', '20%', '25%', '30%'],
            correctAnswer: '20%'
        },
        {
            question: 'What is the sum of the first 10 prime numbers?',
            options: ['129', '120', '112', '130'],
            correctAnswer: '129'
        },
        {
            question: 'What is the time complexity of the binary search algorithm?',
            options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'],
            correctAnswer: 'O(log n)'
        },
        {
            question: 'Which of the following is a stable sorting algorithm?',
            options: ['Merge Sort', 'Quick Sort', 'Heap Sort', 'Bubble Sort'],
            correctAnswer: 'Merge Sort'
        },
        {
            question: 'If the area of a circle is 314 cm², what is its radius?',
            options: ['5 cm', '7 cm', '10 cm', '15 cm'],
            correctAnswer: '10 cm'
        },
        {
            question: 'What is the perimeter of a rectangle with length 15 meters and width 10 meters?',
            options: ['30 meters', '35 meters', '40 meters', '45 meters'],
            correctAnswer: '50 meters'
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
                                {q.options.map((option, idx) => {
                                    // Check if this option is the correct answer
                                    const isCorrect = option === q.correctAnswer;
                                    const isSelected = answers[index] === option;
                                    const optionClass = isSubmitting ? (isSelected ? (isCorrect ? 'correct' : 'incorrect') : (isCorrect ? 'correct' : '')) : '';

                                    return (
                                        <div key={idx} className={`option ${optionClass}`}>
                                            <input
                                                type="radio"
                                                id={`option-${index}-${idx}`}
                                                name={`question-${index}`}
                                                value={option}
                                                onChange={() => handleOptionChange(index, option)}
                                                checked={isSelected}
                                            />
                                            <label htmlFor={`option-${index}-${idx}`}>{option}</label>
                                        </div>
                                    );
                                })}
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
                    <div className="answer-review">
                        {questionsList.map((q, index) => (
                            <div key={index} className={`question-review ${answers[index] === q.correctAnswer ? 'correct' : 'incorrect'}`}>
                                <p>{q.question}</p>
                                <p>Your Answer: <span className={answers[index] === q.correctAnswer ? 'correct' : 'incorrect'}>{answers[index]}</span></p>
                                <p>Correct Answer: <span className="correct">{q.correctAnswer}</span></p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default TestPage;