import React, { useState, useEffect } from 'react';
import { auth, database } from '../firebase';
import { ref, push } from 'firebase/database';


import './TestPage.css';
const TestPage = () => {
    // Define test options and questions
    const testOptions = ['Coding Test', 'Aptitude Test', 'EVS MCQ'];
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
},
'EVS MCQ': {
    Module1: [
        {
            "question": "Which among the following is not a climatic factor?",
            "options": ["Pressure", "Saprophytes", "Temperature", "All of the above"],
            "correctAnswer": "Saprophytes"
        },
        {
            "question": "The basic requirements of human beings are provided by",
            "options": ["Industrialization", "Agriculture", "Both a & b", "Urbanization"],
            "correctAnswer": "Both a & b"
        },
        {
            "question": "Niche means",
            "options": ["Specific place of ecosystem", "Specific climate condition", "Specific weather", "Both b & c"],
            "correctAnswer": "Specific place of ecosystem"
        },
        {
            "question": "Environment means",
            "options": ["A beautiful landscape", "Industrial production", "Sum total of all conditions", "Air and water"],
            "correctAnswer": "Sum total of all conditions"
        },
        {
            "question": "Atmosphere has the main constituents",
            "options": ["Nitrogen, oxygen and water vapor", "Argon, neon and helium", "Carbon dioxide, methane", "Nitrogen oxides and sulfur oxides"],
            "correctAnswer": "Nitrogen, oxygen and water vapor"
        },
        {
            "question": "A major nitrogen storage reservoir is",
            "options": ["River", "Atmosphere", "Oceans", "Trees"],
            "correctAnswer": "Atmosphere"
        },
        {
            "question": "The part of the atmosphere in which life will not exist is known as",
            "options": ["Lithosphere", "Biosphere", "Atmosphere", "Ionosphere"],
            "correctAnswer": "Ionosphere"
        },
        {
            "question": "Hydrological cycle mainly involves",
            "options": ["Air & Water", "Sun & Rain", "Animal & Water", "None of the above"],
            "correctAnswer": "Sun & Rain"
        },
        {
            "question": "Which layer of the earth contains groundwater?",
            "options": ["Core", "Mantle", "Crust", "All of the above"],
            "correctAnswer": "Crust"
        },
        {
            "question": "Which of the following is not an abiotic component of an ecosystem?",
            "options": ["Plant", "Solar Light", "Temperature", "Humidity"],
            "correctAnswer": "Plant"
        },
        {
            "question": "Hydrosphere denotes",
            "options": ["Air", "Plants", "Planktons", "None"],
            "correctAnswer": "None"
        },
        {
            "question": "__________ is the average weather of a habitat.",
            "options": ["Climate", "Pedogenesis", "Both a & b", "None"],
            "correctAnswer": "Climate"
        },
        {
            "question": "Microscopic organisms are",
            "options": ["Phytoplankton", "Zooplankton", "Plankton", "All the above"],
            "correctAnswer": "All the above"
        },
        {
            "question": "Medha Patkar is famous for",
            "options": ["Chipko movement", "Appiko Movement", "Both a & b", "Narmada Bachao Andolan"],
            "correctAnswer": "Narmada Bachao Andolan"
        },
        {
            "question": "The origin of the word Ecology is",
            "options": ["French", "Greek", "Latin", "Both a & b"],
            "correctAnswer": "Greek"
        },
        {
            "question": "Percentage of O₂ in the atmosphere",
            "options": ["21%", "20.9%", "Both a & b", "None of the above"],
            "correctAnswer": "20.9%"
        },
        {
            "question": "The word Biosphere was introduced by",
            "options": ["Grinnell", "Odum", "Earnest Haeckel", "Edward Suess"],
            "correctAnswer": "Edward Suess"
        },
        {
            "question": "The term Environ means",
            "options": ["Surroundings", "Environment", "Okios", "All the above"],
            "correctAnswer": "Surroundings"
        },
        {
            "question": "The community ecology is also called",
            "options": ["Species ecology", "Auto ecology", "Synecology", "All the above"],
            "correctAnswer": "Synecology"
        },
        {
            "question": "Global unit characterized by flora and fauna",
            "options": ["Biosphere", "Biome", "Ecosystem", "None"],
            "correctAnswer": "Biome"
        },
        {
            "question": "Which of the following is a biotic component of an ecosystem?",
            "options": ["Fungi", "Solar Light", "Temperature", "Humidity"],
            "correctAnswer": "Fungi"
        },
        {
            "question": "Which of the following is terrestrial resources?",
            "options": ["Grassland", "Forest", "Desert", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "Dead plant parts and animal remains",
            "options": ["Grassing", "Microorganism", "Detritus", "None"],
            "correctAnswer": "Detritus"
        },
        {
            "question": "The term Ecology was introduced in the year",
            "options": ["1935", "1867", "1866", "1927"],
            "correctAnswer": "1866"
        },
        {
            "question": "Ecosystem is",
            "options": ["Segment of nature", "Segment of Biome", "Patches of Biome", "All the above"],
            "correctAnswer": "All the above"
        },
        {
            "question": "Formation of a hole in the ozone is maximum over",
            "options": ["India", "Antarctica", "Europe", "Africa"],
            "correctAnswer": "Antarctica"
        },
        {
            "question": "The term Ecological Engineering was first coined by",
            "options": ["Elton", "Odum", "Grinnel", "None"],
            "correctAnswer": "Odum"
        },
        {
            "question": "Deforestation generally decreases",
            "options": ["Rainfall", "Soil erosion", "Drought", "Global warming"],
            "correctAnswer": "Rainfall"
        },
        {
            "question": "Peeling of the Ozone umbrella, which protects us from UV rays, is caused by",
            "options": ["PAN", "CO₂", "CFCs", "Coal burning"],
            "correctAnswer": "CFCs"
        },
        {
            "question": "A food web consists of",
            "options": ["A portion of a food chain", "An organism's position in a food chain", "Interlocking food chains", "A set of similar consumers"],
            "correctAnswer": "Interlocking food chains"
        },
        {
            "question": "Secondary consumers are also called",
            "options": ["Carnivorous", "Herbivorous", "Both a & b", "None"],
            "correctAnswer": "Carnivorous"
        },
        {
            "question": "The word Ecosystem was coined by",
            "options": ["A G Tansley", "Ernest Haeckel", "Odum", "None"],
            "correctAnswer": "A G Tansley"
        },
        {
            "question": "Earth Day is observed on",
            "options": ["1st December", "5th June", "April 2nd", "1st January"],
            "correctAnswer": "April 2nd"
        }
    ],
    Module1Contunue: [
        {
            "question": "The term ‘Environment’ has been derived from the French word which means to encircle or surround.",
            "options": ["Environ", "Oikos", "Geo", "Aqua"],
            "correctAnswer": "Environ"
        },
        {
            "question": "Which of the following conceptual spheres of the environment has the least storage capacity for matter?",
            "options": ["Atmosphere", "Lithosphere", "Hydrosphere", "Biosphere"],
            "correctAnswer": "Atmosphere"
        },
        {
            "question": "Which of the following is a biotic component of an ecosystem?",
            "options": ["Fungi", "Solar light", "Temperature", "Humidity"],
            "correctAnswer": "Fungi"
        },
        {
            "question": "In an ecosystem, the flow of energy is",
            "options": ["Bidirectional", "Cyclic", "Unidirectional", "Multidirectional"],
            "correctAnswer": "Unidirectional"
        },
        {
            "question": "Which Pyramid is always upright?",
            "options": ["Energy", "Biomass", "Numbers", "Food chain"],
            "correctAnswer": "Energy"
        },
        {
            "question": "The sequence of eating and being eaten in an ecosystem is called",
            "options": ["Food Chain", "Carbon cycle", "Hydrological cycle", "Anthroposystem"],
            "correctAnswer": "Food Chain"
        },
        {
            "question": "Which of the following is a producer in an ecosystem?",
            "options": ["Plants and some bacteria", "Animals", "Human beings", "Fish"],
            "correctAnswer": "Plants and some bacteria"
        },
        {
            "question": "The largest reservoir of nitrogen on our planet is",
            "options": ["Oceans", "Atmosphere", "Biosphere", "Fossil fuels"],
            "correctAnswer": "Atmosphere"
        },
        {
            "question": "The word ‘Environment’ is derived from",
            "options": ["Greek", "French", "Spanish", "English"],
            "correctAnswer": "French"
        },
        {
            "question": "Which of the following is the terrestrial ecosystem?",
            "options": ["Forest", "Grassland", "Desert", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "World Environment Day is on",
            "options": ["5th May", "5th June", "18th July", "16th August"],
            "correctAnswer": "5th June"
        },
        {
            "question": "Which of the following is absorbed by green plants from the atmosphere?",
            "options": ["Carbon dioxide", "Water", "Nutrients", "All of the above"],
            "correctAnswer": "Carbon dioxide"
        },
        {
            "question": "A food web consists of",
            "options": ["A portion of a food chain", "An organism’s position in a food chain", "Interlocking food chains", "A set of similar consumers"],
            "correctAnswer": "Interlocking food chains"
        },
        {
            "question": "Which of the following are producers?",
            "options": ["Animals", "Human beings", "Plants & Bacteria", "Fishes"],
            "correctAnswer": "Plants & Bacteria"
        },
        {
            "question": "Which of the following is an ecosystem?",
            "options": ["Forest", "Desert", "Mountain", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "Which of the following is NOT an example of a terrestrial ecosystem?",
            "options": ["Forest", "Desert", "Water", "Grassland"],
            "correctAnswer": "Water"
        },
        {
            "question": "An ecosystem is a region in which",
            "options": ["Dead organisms interact with their environment", "Living organisms do not interact with their environment", "Living organisms interact with their environment", "All of the above"],
            "correctAnswer": "Living organisms interact with their environment"
        },
        {
            "question": "The term ecosystem was first proposed by",
            "options": ["Jacob van Verkull", "A G Tansley", "Costraza", "Marie Gibbs"],
            "correctAnswer": "A G Tansley"
        },
        {
            "question": "The transfer of energy & nutrients from one feeding group of organisms to another in a series is called",
            "options": ["Energy chain", "Food Chain", "Balanced ecosystem", "Food Web"],
            "correctAnswer": "Food Chain"
        },
        {
            "question": "What kind of climate can be found in the Thar Desert?",
            "options": ["Cold", "Dry", "Cool", "Moist"],
            "correctAnswer": "Dry"
        },
        {
            "question": "Why does the Rann of Kutch attract aquatic birds in the monsoon season?",
            "options": ["Because desert land is converted to forest land", "Because desert land is converted to snow", "Because desert land is converted to salt marshes", "Because desert land does not convert"],
            "correctAnswer": "Because desert land is converted to salt marshes"
        },
        {
            "question": "The biggest desert in the world, including both hot and cold deserts, is",
            "options": ["Sahara", "Arctic", "Arabian", "Antarctica"],
            "correctAnswer": "Antarctica"
        },
        {
            "question": "On which factor is forest type mainly dependent?",
            "options": ["Abiotic", "Size of the forest", "Shape of trees", "Products from the trees"],
            "correctAnswer": "Abiotic"
        },
        {
            "question": "How does the tropical rainforest get its name?",
            "options": ["Due to less rain", "Due to heavy rain", "Due to moderate rain", "Due to no rain required"],
            "correctAnswer": "Due to heavy rain"
        },
        {
            "question": "Where can we find both running water as well as stagnant water?",
            "options": ["Marine ecosystems", "Wetlands", "Coral reefs", "Freshwater ecosystems"],
            "correctAnswer": "Freshwater ecosystems"
        },
        {
            "question": "Which is the largest ecosystem on Earth?",
            "options": ["Desert", "Forest", "Grassland", "Oceans"],
            "correctAnswer": "Oceans"
        },
        {
            "question": "Which of the following is among the world’s most productive ecosystems in terms of biomass production?",
            "options": ["Pond ecosystems", "Lake ecosystems", "Brackish water ecosystems", "River ecosystems"],
            "correctAnswer": "Brackish water ecosystems"
        },
        {
            "question": "Which ecosystem is known as a giant permanent pond?",
            "options": ["Lake Ecosystem", "Pond ecosystem", "Seashore ecosystem", "Marine ecosystem"],
            "correctAnswer": "Lake Ecosystem"
        },
        {
            "question": "What is the main cause of wildfire?",
            "options": ["Volcanic activity", "Lightning", "Pollution", "Human activity"],
            "correctAnswer": "Human activity"
        },
        {
            "question": "Which action can help combat climate change according to SDG 13?",
            "options": ["Increase fossil fuel usage", "Promote renewable energy sources", "Reduce recycling efforts", "Expand deforestation"],
            "correctAnswer": "Promote renewable energy sources"
        },
        {
            "question": "Which SDG aims to protect, restore, and promote sustainable use of terrestrial ecosystems?",
            "options": ["SDG 14", "SDG 15", "SDG 16", "SDG 17"],
            "correctAnswer": "SDG 15"
        }
        

    ],
    Module2: [
        {
            "question": "Which of the following is a disadvantage of renewable energy?",
            "options": ["High pollution", "Available only in few places", "High running cost", "Unreliable supply"],
            "correctAnswer": "Unreliable supply"
        },
        {
            "question": "A Solar cell is an electrical device that converts the energy of light directly into electricity by the ____________.",
            "options": ["Photovoltaic effect", "Chemical effect", "Atmospheric effect", "Physical effect"],
            "correctAnswer": "Photovoltaic effect"
        },
        {
            "question": "Which mining causes breathing and chest problems?",
            "options": ["Open cast mining", "Deep mining", "Digging", "None of these"],
            "correctAnswer": "Deep mining"
        },
        {
            "question": "In hydroelectric power, what is necessary for the production of power throughout the year?",
            "options": ["Dams filled with water", "High amount of air", "High intense sunlight", "Nuclear power"],
            "correctAnswer": "Dams filled with water"
        },
        {
            "question": "The main composition of biogas is _______________.",
            "options": ["Methane", "Carbon dioxide", "Nitrogen", "Hydrogen"],
            "correctAnswer": "Methane"
        },
        {
            "question": "Which Ministry is responsible for research and development in renewable energy sources such as wind power, small hydro, biogas, and solar power?",
            "options": ["Human Resource Development", "Agriculture and Farmers Welfare", "Ministry of New and Renewable Energy", "Health and Family Welfare"],
            "correctAnswer": "Ministry of New and Renewable Energy"
        },
        {
            "question": "Which among the following has the largest amount of installed grid-interactive renewable power capacity in India?",
            "options": ["Wind power", "Solar power", "Biomass power", "Small Hydro power"],
            "correctAnswer": "Wind power"
        },
        {
            "question": "The world’s first 100% solar-powered airport is located at ____________.",
            "options": ["Cochin, Kerala", "Bengaluru, Karnataka", "Chennai, Tamil Nadu", "Mumbai, Maharashtra"],
            "correctAnswer": "Cochin, Kerala"
        },
        {
            "question": "Which of the following is not under the Ministry of New and Renewable Energy?",
            "options": ["Wind energy", "Solar energy", "Tidal energy", "Large hydro"],
            "correctAnswer": "Large hydro"
        },
        {
            "question": "Where is the largest Wind Farm located in India?",
            "options": ["Jaisalmer Wind Park, Rajasthan", "Muppandal Wind Farm, Tamil Nadu", "Vaspet Wind Farm, Maharashtra", "Chakala Wind Farm, Maharashtra"],
            "correctAnswer": "Muppandal Wind Farm, Tamil Nadu"
        },
        {
            "question": "Which is the most dangerous radiation?",
            "options": ["Alpha radiation", "Beta radiation", "Gamma radiation", "All of the above"],
            "correctAnswer": "Gamma radiation"
        },
        {
            "question": "Which Indian enterprise has the Motto “ENERGY FOREVER”?",
            "options": ["Indian Renewable Energy Development Agency", "Indian Non-Renewable Energy Development", "Indian Agricultural Development", "Indian Biotechnology Development"],
            "correctAnswer": "Indian Renewable Energy Development Agency"
        },
        {
            "question": "Solar radiation flux is usually measured with the help of a:",
            "options": ["Pyranometer", "Anemometer", "Sunshine recorder", "None of the above"],
            "correctAnswer": "Pyranometer"
        },
        {
            "question": "What does a hydrogen fuel cell emit?",
            "options": ["Water", "Steam", "Greenhouse gas", "Methane"],
            "correctAnswer": "Water"
        },
        {
            "question": "The most widely used nuclear fuel in the world is ______________.",
            "options": ["Thorium – 232", "Uranium – 238", "Uranium – 235", "Plutonium – 239"],
            "correctAnswer": "Uranium – 235"
        },
        {
            "question": "The blades in wind turbines are connected to:",
            "options": ["Nacelle", "Tower", "Foundations", "String"],
            "correctAnswer": "Nacelle"
        },
        {
            "question": "In the production of wave energy, which form of energy is used?",
            "options": ["Potential energy", "Kinetic energy", "Solar energy", "Wind energy"],
            "correctAnswer": "Kinetic energy"
        },
        {
            "question": "A tidal barrage is a barrier built over a:",
            "options": ["River bed", "River estuary", "River end", "River starting"],
            "correctAnswer": "River estuary"
        },
        {
            "question": "In hydroelectric power:",
            "options": ["Kinetic energy is transferred to potential", "Potential energy is transferred to kinetic", "Solar energy is transferred to wind energy", "Wind energy is transferred to solar energy"],
            "correctAnswer": "Potential energy is transferred to kinetic"
        },
        {
            "question": "OTEC is an energy technology that converts:",
            "options": ["Energy in large tides of ocean to generate electricity", "Energy in ocean waves to generate electricity", "Energy in ocean due to thermal gradient to generate electricity", "Energy in the fast-moving ocean currents to generate electricity"],
            "correctAnswer": "Energy in ocean due to thermal gradient to generate electricity"
        },
        {
            "question": "In order to produce solar energy during sunlight, where is the energy stored in the batteries?",
            "options": ["Nickel Sulfur", "Zinc Cadmium", "Nickel Cadmium", "Nickel Zinc"],
            "correctAnswer": "Nickel Cadmium"
        },
        {
            "question": "Which place in India has experimented with tidal energy?",
            "options": ["Goa", "Karnataka", "Kerala", "Tamil Nadu"],
            "correctAnswer": "Tamil Nadu"
        },
        {
            "question": "According to WHO, how many premature deaths annually are linked to air pollution caused by burning fossil fuels?",
            "options": ["One million", "Three million", "Five million", "Seven million"],
            "correctAnswer": "Seven million"
        },
        {
            "question": "Energy in the form of heat and light is obtained by:",
            "options": ["Biomass", "Fossil fuels", "Sun", "Wind"],
            "correctAnswer": "Sun"
        },
        {
            "question": "SI unit for energy is:",
            "options": ["Watt", "Kilogram", "Newton", "Joule"],
            "correctAnswer": "Joule"
        },
        {
            "question": "Trapped heat inside the earth is known as:",
            "options": ["Heat energy", "Kinetic energy", "Geothermal energy", "Thermal energy"],
            "correctAnswer": "Geothermal energy"
        },
        {
            "question": "How much of the known universe mass is made up of hydrogen?",
            "options": ["62%", "75%", "99%", "10%"],
            "correctAnswer": "75%"
        },
        {
            "question": "Hydrogen energy can be tapped through:",
            "options": ["Heat pumps", "Fuel cells", "Photovoltaic cells", "Gasifiers"],
            "correctAnswer": "Fuel cells"
        },
        {
            "question": "Most widely used solar material is:",
            "options": ["Arsenic", "Silicon", "Cadmium", "Steel"],
            "correctAnswer": "Silicon"
        },
        {
            "question": "From the list given below, pick the item that is not a natural resource:",
            "options": ["Soil", "Water", "Electricity", "Air"],
            "correctAnswer": "Electricity"
        },
        {
            "question": "Which environmental problem is associated with the construction of high-rise dams?",
            "options": ["Submerging human settlements", "Deforestation and loss of biodiversity", "High financial costs", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "What is the function of a fuel reformer in a fuel cell?",
            "options": ["Enabling the fuel cell to use a hydrocarbon instead of hydrogen", "Control of emissions from the fuel cell", "Cooling of the fuel cell", "Enabling the fuel cell to use water as fuel"],
            "correctAnswer": "Enabling the fuel cell to use a hydrocarbon instead of hydrogen"
        },
        {
            "question": "Energy is measured in:",
            "options": ["Blu", "Bhu", "Btu", "Ntu"],
            "correctAnswer": "Btu"
        },
        {
            "question": "Btu (British thermal unit) is equal to:",
            "options": ["1055J", "955J", "1550J", "None of these"],
            "correctAnswer": "1055J"
        },
        {
            "question": "Electromagnetic radiation energy exists in the form of:",
            "options": ["Light", "Wave", "Heat", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "The equivalent of one Dobson unit is:",
            "options": ["0.1mm", "0.01mm", "0.1m", "0.01m"],
            "correctAnswer": "0.01mm"
        },
        {
            "question": "Cancer and related diseases are caused due to:",
            "options": ["Primary radiation", "Non-ionizing radiation", "Ionizing radiation", "Secondary radiation"],
            "correctAnswer": "Ionizing radiation"
        },
        {
            "question": "Which of the following is considered an alternate fuel?",
            "options": ["CNG", "Kerosene", "Coal", "Petrol"],
            "correctAnswer": "CNG"
        },
        {
            "question": "Wind energy generation depends on:",
            "options": ["Direction of wind", "Velocity of wind", "Humidity", "Precipitation"],
            "correctAnswer": "Velocity of wind"
        },
        {
            "question": "Nuclear fusion uses the following as a fuel:",
            "options": ["Carbon", "Helium", "Hydrogen", "Water"],
            "correctAnswer": "Hydrogen"
        },
        {
            "question": "A nuclear power plant in Karnataka is located at:",
            "options": ["Bhadravathi", "Sandur", "Raichur", "Kaiga"],
            "correctAnswer": "Kaiga"
        },
        {
            "question": "About ¾ of India's coal deposits are found in:",
            "options": ["Karnataka", "Tamil Nadu", "Kashmir", "Bihar & Orissa"],
            "correctAnswer": "Bihar & Orissa"
        },
        {
            "question": "Smelting of metallic minerals into copper, lead, and zinc releases large amounts of:",
            "options": ["Carbon dioxide", "Nitrogen oxide", "Sulphur dioxide", "Hydrogen Sulphide"],
            "correctAnswer": "Sulphur dioxide"
        },
        {
            "question": "The quantity of solar energy received by the earth is:",
            "options": ["5%", "15%", "99%", "45%"],
            "correctAnswer": "99%"
        },
        {
            "question": "What is a major problem associated with hydrogen fuel cells?",
            "options": ["Storage and distribution", "Availability of hydrogen", "Creates pollution", "None of the above"],
            "correctAnswer": "Storage and distribution"
        },
        {
            "question": "A good example of a renewable energy resource is:",
            "options": ["Hydropower", "Coal", "Oil", "All of the above"],
            "correctAnswer": "Hydropower"
        },
        {
            "question": "The basic element of fossil fuels is:",
            "options": ["Sulphur", "Phosphorous", "Carbon", "Oxygen"],
            "correctAnswer": "Carbon"
        },
        {
            "question": "The energy released by the decay of one U-235 atom will be of the order of:",
            "options": ["100MeV", "10MeV", "200MeV", "1000MeV"],
            "correctAnswer": "200MeV"
        },
        {
            "question": "A renewable energy source is considered a:",
            "options": ["Primary source", "Secondary source", "Tertiary source", "None of the above"],
            "correctAnswer": "Primary source"
        },
        {
            "question": "The energy consumption for global transportation is:",
            "options": ["42%", "24%", "4%", "34%"],
            "correctAnswer": "24%"
        }
    
    
    ],
    Module2continue: [
        {
            "question": "Annual oil consumption in India is about:",
            "options": ["3.25 million tons", "325 million tons", "32.5 million tons", "0.325 million tons"],
            "correctAnswer": "325 million tons"
        },
        {
            "question": "Fossil fuels largely consist of:",
            "options": ["Hydrocarbon", "Hydrogen sulphide", "Hydrochloric acid", "Carbon dioxide"],
            "correctAnswer": "Hydrocarbon"
        },
        {
            "question": "Wind Farms are located in:",
            "options": ["River basin", "Plain area", "Hilly area", "Valley area"],
            "correctAnswer": "Hilly area"
        },
        {
            "question": "How is OTEC caused?",
            "options": ["By wind energy", "By geothermal energy", "By solar energy", "By gravitational force"],
            "correctAnswer": "By solar energy"
        },
        {
            "question": "What does OTEC stand for?",
            "options": ["Ocean Thermal Energy Cultivation", "Ocean Thermal Energy Conversion", "Ocean Techno Energy Conservation", "Ocean Thermal Energy Consumption"],
            "correctAnswer": "Ocean Thermal Energy Conversion"
        },
        {
            "question": "Which type of turbine is commonly used in tidal energy?",
            "options": ["Francis turbine", "Kaplan turbine", "Pelton wheel", "Gorlov turbine"],
            "correctAnswer": "Kaplan turbine"
        },
        {
            "question": "What type of tide occurs when the difference between high and low tide is greatest?",
            "options": ["Diurnal tide", "Neap tide", "Spring tide", "Ebb tide"],
            "correctAnswer": "Spring tide"
        },
        {
            "question": "How do fuel cells generate electricity?",
            "options": ["Combustion", "Fusion", "Electrochemical reaction", "Condensation"],
            "correctAnswer": "Electrochemical reaction"
        },
        {
            "question": "A disease that becomes unusually widespread and even global in its reach is referred to as:",
            "options": ["Epidemic", "Pandemic", "Spanish flu", "Hyper endemic"],
            "correctAnswer": "Pandemic"
        },
        {
            "question": "Which of the following volcanoes is known for its most destructive volcanic eruption in recorded history?",
            "options": ["Mount Kilimanjaro", "Mauna Loa", "Krakatoa", "Mount St Helens"],
            "correctAnswer": "Krakatoa"
        },
        {
            "question": "Bhopal Gas Disaster is a kind of:",
            "options": ["Natural disaster", "Manmade disaster", "Climatological disaster", "None of the above"],
            "correctAnswer": "Manmade disaster"
        },
        {
            "question": "Which of the following buildings in Tripura are identified as vulnerable to earthquakes?",
            "options": ["MBB College", "Nir Mahal", "Ujjayanta Palace", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "The National Disaster Management Authority (NDMA) is headed by:",
            "options": ["Prime Minister of India", "President of India", "Governor of States", "Chief Minister of States"],
            "correctAnswer": "Prime Minister of India"
        },
        {
            "question": "Volcanoes are generally found where:",
            "options": ["Intraplates pull apart or are coming together", "Tectonic plates pull apart or are coming together", "Earth's crust pulls apart or comes together", "None of these"],
            "correctAnswer": "Tectonic plates pull apart or are coming together"
        },
        {
            "question": "Volcanic erupted material when inside the earth is called:",
            "options": ["Lava", "Magma", "Lahars", "None of these"],
            "correctAnswer": "Magma"
        },
        {
            "question": "The International Tsunami Information Centre is located in:",
            "options": ["Honolulu", "Goa", "Jakarta", "Puducherry"],
            "correctAnswer": "Honolulu"
        },
        {
            "question": "Which of the following is not a man-made hazard?",
            "options": ["Leakage of toxic waste", "Wars and civil strife", "Drought", "Environmental pollution"],
            "correctAnswer": "Drought"
        },
        {
            "question": "Cyclones occurring in the North Atlantic Ocean are called:",
            "options": ["Typhoon", "Hurricanes", "Tornado", "None of the above"],
            "correctAnswer": "Hurricanes"
        },
        {
            "question": "High intensity and long duration of rainfall in Tripura cause:",
            "options": ["Earthquakes", "Floods", "Landslides", "Cyclone"],
            "correctAnswer": "Landslides"
        },
        {
            "question": "Generally, the number on the Richter Scale ranges between:",
            "options": ["0 and 6", "0 and 9", "1 to 5", "1 to 12"],
            "correctAnswer": "0 and 9"
        },
        {
            "question": "Disaster Management includes:",
            "options": ["Mitigation", "Reconstruction", "Rehabilitation", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "The United Nations disaster management team is responsible for solving problems resulting from disasters in:",
            "options": ["Asia", "Africa", "Australia", "All continents"],
            "correctAnswer": "All continents"
        },
        {
            "question": "In India, the National Institute of Disaster Management is located at:",
            "options": ["Manipur", "Punjab", "Hyderabad", "New Delhi"],
            "correctAnswer": "New Delhi"
        },
        {
            "question": "The Disaster Management Act was enacted in:",
            "options": ["2006", "2003", "2005", "2009"],
            "correctAnswer": "2005"
        },
        {
            "question": "The level of harm by a hazard is governed by:",
            "options": ["Magnitude of the hazard", "Frequency of the hazard", "Intensity at the impact point", "All of the above"],
            "correctAnswer": "All of the above"
        }
    ],
    Module3: [
        {
            "question": "Which of the following gases is most abundant in the atmosphere?",
            "options": ["Methane", "Nitrogen", "CFC", "Argon"],
            "correctAnswer": "Nitrogen"
        },
        {
            "question": "Incomplete combustion of fuel such as petrol and diesel gives:",
            "options": ["Nitrogen oxide", "Carbon dioxide", "Sulphur dioxide", "Carbon monoxide"],
            "correctAnswer": "Carbon monoxide"
        },
        {
            "question": "B.O.D (Biological Oxygen Demand) determines the health of:",
            "options": ["Soil", "Air", "Water", "Sky"],
            "correctAnswer": "Water"
        },
        {
            "question": "Which of the following is not a source of air pollution?",
            "options": ["Automobile exhaust", "Burning of firewood", "Power plant", "Windmill"],
            "correctAnswer": "Windmill"
        },
        {
            "question": "Which of the following is a natural source of air pollution?",
            "options": ["Acid rain", "Precipitation", "Storms", "Volcanic eruption"],
            "correctAnswer": "Volcanic eruption"
        },
        {
            "question": "Sound becomes hazardous noise pollution at decibels:",
            "options": ["Above 30", "Above 80", "Above 100", "Above 120"],
            "correctAnswer": "Above 80"
        },
        {
            "question": "Ozone hole is present in:",
            "options": ["Biosphere", "Troposphere", "Stratosphere", "Lithosphere"],
            "correctAnswer": "Stratosphere"
        },
        {
            "question": "The largest reservoir of nitrogen on our planet is:",
            "options": ["Oceans", "Atmosphere", "Biosphere", "Fossil fuels"],
            "correctAnswer": "Atmosphere"
        },
        {
            "question": "Cholera is caused due to:",
            "options": ["Verito cholerae", "Entamoeba histolytica", "Vibrio cholerae", "None of the above"],
            "correctAnswer": "Vibrio cholerae"
        },
        {
            "question": "Water logging is a phenomenon in which:",
            "options": ["Plants increase fodder yield", "Plants increase overall crop yield", "Trees increase overall wood production", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "Noise is measured in:",
            "options": ["Decibels", "Joules", "PPM", "NTU"],
            "correctAnswer": "Decibels"
        },
        {
            "question": "Which of the following gases are called greenhouse gases?",
            "options": ["Methane", "Nitrogen", "Carbon dioxide", "Both a and c"],
            "correctAnswer": "Both a and c"
        },
        {
            "question": "Which of the following statements is true about SMOG?",
            "options": ["SMOG is derived from fog", "SMOG is derived from smoke", "SMOG is derived from water vapor", "Derived from both fog and smoke"],
            "correctAnswer": "Derived from both fog and smoke"
        },
        {
            "question": "Which of the following is a secondary air pollutant?",
            "options": ["SPM", "PAN", "SO2", "NO2"],
            "correctAnswer": "PAN"
        },
        {
            "question": "Formation of London smog takes place in:",
            "options": ["Winter during daytime", "Summer during daytime", "Summer during morning time", "Winter during morning time"],
            "correctAnswer": "Winter during morning time"
        },
        {
            "question": "Which of the following is a waterborne disease?",
            "options": ["Smallpox", "Cholera", "Diabetes", "Malaria"],
            "correctAnswer": "Cholera"
        },
        {
            "question": "In 1984, the Bhopal gas tragedy took place because methyl isocyanate:",
            "options": ["Reacted with ammonia", "Reacted with water", "Reacted with DDT", "Reacted with CO2"],
            "correctAnswer": "Reacted with water"
        },
        {
            "question": "The layer of the atmosphere between 10 km to 50 km above sea level is called:",
            "options": ["Troposphere", "Thermosphere", "Stratosphere", "Mesosphere"],
            "correctAnswer": "Stratosphere"
        },
        {
            "question": "A well-oxidized sewage contains nitrogen mainly as:",
            "options": ["Nitrates", "Nitrites", "Free Ammonia", "None of the above"],
            "correctAnswer": "Nitrates"
        },
        {
            "question": "Air pollution that occurs in sunlight is called:",
            "options": ["CFC", "Photochemical smog", "Fog", "Acid rain"],
            "correctAnswer": "Photochemical smog"
        },
        {
            "question": "Brewery and sugar factory waste alter the quality of a water body by increasing:",
            "options": ["Temperature", "Turbidity", "pH", "COD and BOD"],
            "correctAnswer": "COD and BOD"
        },
        {
            "question": "In a coal-fired power plant, electrostatic precipitators are installed to control the emission of:",
            "options": ["SO2", "NO2", "SPM", "CO"],
            "correctAnswer": "SPM"
        },
        {
            "question": "What is called for the movement of surface litter and topsoil from one place to another?",
            "options": ["Soil submerge", "Soil degradation", "Soil erosion", "Soil pollution"],
            "correctAnswer": "Soil erosion"
        },
        {
            "question": "Organic agriculture advocates avoiding the use of:",
            "options": ["Organic manure", "Stored water", "Modern technologies in harvesting", "Chemical fertilizers"],
            "correctAnswer": "Chemical fertilizers"
        },
        {
            "question": "DDT is a major contributor to pollution because it:",
            "options": ["Is non-biodegradable", "Kills good microorganisms", "Destroys valuable species and worms", "Interferes with pesticides"],
            "correctAnswer": "Is non-biodegradable"
        },
        {
            "question": "Soil pollution due to PAHs can be sourced to:",
            "options": ["Vehicle emission", "Cigarette smoke", "Extraction of shale oil", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "Benzene and methyl benzene are major soil pollutants from petroleum industries. They are:",
            "options": ["Organic pollutants", "Inorganic pollutants", "Carcinogenic pollutants", "None of the above"],
            "correctAnswer": "Carcinogenic pollutants"
        },
        {
            "question": "B.O.D (Biological Oxygen Demand) determines the health of:",
            "options": ["Soil", "Air", "Water", "Microorganisms"],
            "correctAnswer": "Water"
        },
        {
            "question": "Methemoglobinemia is caused by the contamination of water due to:",
            "options": ["Mercury", "Nitrate", "Arsenic", "Cadmium"],
            "correctAnswer": "Nitrate"
        },
        {
            "question": "Freons are called:",
            "options": ["Hydrocarbons", "Ozone", "Methane", "Solvents"],
            "correctAnswer": "Solvents"
        }

    ],
    Module3partA: [
        {
            "question": "Which of the following is an air pollutant?",
            "options": ["CO", "O2", "N2", "All of the above"],
            "correctAnswer": "CO"
        },
        {
            "question": "Which of the following is mainly responsible for water pollution?",
            "options": ["Afforestation", "Oil refineries", "Paper factories", "Both b and c"],
            "correctAnswer": "Both b and c"
        },
        {
            "question": "Which of the following is involved in the production of carboxyhemoglobin?",
            "options": ["CO", "SO2", "NO2", "NO3"],
            "correctAnswer": "CO"
        },
        {
            "question": "Incomplete combustion of fuel such as petrol and diesel gives:",
            "options": ["Nitrogen oxide", "Carbon monoxide", "Sulphur dioxide", "Carbon dioxide"],
            "correctAnswer": "Carbon monoxide"
        },
        {
            "question": "The main components of photochemical smog are:",
            "options": ["Water vapor", "Sulphur dioxide", "Oxides of nitrogen", "Nitrogen"],
            "correctAnswer": "Oxides of nitrogen"
        },
        {
            "question": "Sound becomes hazardous noise pollution at decibels:",
            "options": ["Above 30", "Above 80", "Above 100", "Above 120"],
            "correctAnswer": "Above 80"
        },
        {
            "question": "The atmosphere of big cities is polluted most by:",
            "options": ["Household waste", "Radioactive fallout", "Automobile exhausts", "Pesticides"],
            "correctAnswer": "Automobile exhausts"
        },
        {
            "question": "Which of the following is not a source of air pollution?",
            "options": ["Automobile exhaust", "Windmill", "Burning of firewood", "Power plant"],
            "correctAnswer": "Windmill"
        },
        {
            "question": "The lowest layer of the atmosphere is:",
            "options": ["Ionosphere", "Troposphere", "Stratosphere", "Lithosphere"],
            "correctAnswer": "Troposphere"
        },
        {
            "question": "What happened in India in 1984?",
            "options": ["Chipko Movement", "Bhopal Gas Disaster", "Narmada Bachao Andolan", "None of the above"],
            "correctAnswer": "Bhopal Gas Disaster"
        },
        {
            "question": "Which of the following serves as an indicator of atmospheric pollution?",
            "options": ["Fern", "Liverworts", "Hornworts", "Epiphytic lichens"],
            "correctAnswer": "Epiphytic lichens"
        },
        {
            "question": "What is the order of the waste management hierarchy, from most to least favored?",
            "options": ["Prevention-Recycle-Reuse", "Prevention-Reuse-Disposal-Recycle", "Prevention-Disposal-Reuse-Recycle", "Prevention-Reuse-Recycle-Disposal"],
            "correctAnswer": "Prevention-Reuse-Recycle-Disposal"
        },
        {
            "question": "What is a Geo-net?",
            "options": ["A synthetic material used for drainage of liquids", "A synthetic material used for drainage of gases", "A ceramic material used for drainage of liquids", "A fibrous material used for drainage of liquids"],
            "correctAnswer": "A synthetic material used for drainage of liquids"
        },
        {
            "question": "How do you remove leachate from the landfill?",
            "options": ["By gravity", "By pumping from low points", "Both a and b", "None of the above"],
            "correctAnswer": "Both a and b"
        },
        {
            "question": "What is the most expensive component of solid waste handling?",
            "options": ["Collection", "Storage", "Treatment", "Separation"],
            "correctAnswer": "Collection"
        },
        {
            "question": "What are the methods in which energy can be recovered from waste to energy?",
            "options": ["Heat", "Electricity", "Co-generation", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "Which of the following solid wastes describe the term ‘Municipal Solid Waste’?",
            "options": ["Toxic", "Hazardous", "Non-toxic", "Non-hazardous"],
            "correctAnswer": "Non-toxic"
        },
        {
            "question": "Which toxic compound is not found in e-waste?",
            "options": ["Mercury", "Cadmium", "Neon", "Lead"],
            "correctAnswer": "Neon"
        },
        {
            "question": "What does e-waste stand for?",
            "options": ["Environment waste", "Electronic waste", "Equipment waste", "None of the above"],
            "correctAnswer": "Electronic waste"
        },
        {
            "question": "Which country produces the most e-waste per year?",
            "options": ["India", "China", "USA", "France"],
            "correctAnswer": "USA"
        },
        {
            "question": "Primary sludge includes:",
            "options": ["Total suspended solids", "Suspended solids", "Removable solids", "Settleable solids"],
            "correctAnswer": "Settleable solids"
        },
        {
            "question": "Which of the following methods are used in rural communities?",
            "options": ["Aerobic digestion", "Mechanical dewatering", "Dewatering", "Composting"],
            "correctAnswer": "Composting"
        },
        {
            "question": "From which of the following methods can toxic chemicals be removed?",
            "options": ["Sorption", "Adsorption", "Absorption", "Dewatering"],
            "correctAnswer": "Adsorption"
        },
        {
            "question": "What is the term used for the reuse of sewage sludge?",
            "options": ["Compost", "Solids", "Biosolids", "Sludge"],
            "correctAnswer": "Biosolids"
        },
        {
            "question": "Sludge from the primary clarifier is:",
            "options": ["Brown and flocculant-like appearance", "Dark in color", "Gray and slimy", "Dark brown in color"],
            "correctAnswer": "Dark brown in color"
        },
        {
            "question": "Which of the following is a biodegradable waste?",
            "options": ["Polythene bags", "Synthetic fiber", "Food waste", "Paper"],
            "correctAnswer": "Food waste"
        },
        {
            "question": "The process of decomposition of biodegradable solid waste by earthworms is called:",
            "options": ["Landfills", "Shredding", "Vermi-composting", "Composting"],
            "correctAnswer": "Vermi-composting"
        },
        {
            "question": "________ is the cutting and tearing of municipal solid waste.",
            "options": ["Landfills", "Shredding", "Pulverization", "Composting"],
            "correctAnswer": "Shredding"
        },
        {
            "question": "X-ray films are a source of which of the following gases?",
            "options": ["SO2", "CO2", "NO2", "SO3"],
            "correctAnswer": "SO2"
        },
        {
            "question": "The process of burning municipal solid wastes under suitable temperature and conditions in a specific furnace is called:",
            "options": ["Landfill", "Incineration", "Recycling", "Vermicomposting"],
            "correctAnswer": "Incineration"
        }
    ],
    Module3partB: [
        {
            "question": "When the organic matter present in the sanitary landfill decomposes, it generates:",
            "options": ["Methane", "Nitrogen", "Hydrogen", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "Which of the following methods is better for the solid waste problem?",
            "options": ["Recycling", "Landfilling", "Both a and b", "None of the above"],
            "correctAnswer": "Both a and b"
        },
        {
            "question": "Which of the following gases is produced from landfill wastes?",
            "options": ["Biogas", "Natural gas", "Liquefied petroleum gas", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "The most important remedy to avoid negative impacts due to industrialization is:",
            "options": ["Industry should be closed", "Don’t allow new industrial units", "Industry should treat all wastes before disposal", "Industries should be shifted far away from human habitats"],
            "correctAnswer": "Industry should treat all wastes before disposal"
        },
        {
            "question": "Which of the following industries generates colored waste?",
            "options": ["Software industry", "Textile industry", "Biomedical industry", "None of the above"],
            "correctAnswer": "Textile industry"
        },
        {
            "question": "Physical pollution of water is due to:",
            "options": ["Dissolved oxygen", "Turbidity", "pH", "None of the above"],
            "correctAnswer": "Turbidity"
        },
        {
            "question": "Sound beyond which of the following levels can be regarded as a pollutant?",
            "options": ["40dB", "80dB", "120dB", "150dB"],
            "correctAnswer": "80dB"
        },
        {
            "question": "“Minamata Disease” is caused due to:",
            "options": ["Lead", "Arsenic", "Mercury", "Cadmium"],
            "correctAnswer": "Mercury"
        },
        {
            "question": "The process of movement of nutrients from the soil by acid rain is called:",
            "options": ["Transpiration", "Evapo-transpiration", "Leaching", "Infiltration"],
            "correctAnswer": "Leaching"
        },
        {
            "question": "Chlorofluorocarbons (CFCs) are:",
            "options": ["Non-toxic", "Non-flammable", "Non-carcinogenic", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "Formation of the ozone layer is explained by:",
            "options": ["Rosenmund reaction", "Henderson’s reaction", "Chapman’s reaction", "Perkin’s reaction"],
            "correctAnswer": "Chapman’s reaction"
        },
        {
            "question": "The Bhopal Gas Tragedy was caused due to the leakage of:",
            "options": ["Methyl Iso Cyanate (MIC)", "Sulphur dioxide", "Mustard gas", "Methane"],
            "correctAnswer": "Methyl Iso Cyanate (MIC)"
        },
        {
            "question": "The Environmental Protection Act was enacted in the year:",
            "options": ["1986", "1976", "1989", "1991"],
            "correctAnswer": "1986"
        },
        {
            "question": "The Environmental Protection Agency (EPA) was established in:",
            "options": ["1970", "1986", "1988", "1998"],
            "correctAnswer": "1970"
        },
        {
            "question": "The EPA consists of:",
            "options": ["5 Chapters, 18 sections", "4 chapters, 26 sections", "3 chapters, 20 sections", "4 chapters, 24 sections"],
            "correctAnswer": "4 chapters, 26 sections"
        },
        {
            "question": "The Air (Prevention and Control of Pollution) Act was enacted in the year:",
            "options": ["1981", "1986", "1991", "1989"],
            "correctAnswer": "1981"
        },
        {
            "question": "Noise pollution was inserted as pollution in the Air Act in:",
            "options": ["1981", "1976", "1997", "1987"],
            "correctAnswer": "1987"
        },
        {
            "question": "Which solid waste is generated during dry processes in the textile industry?",
            "options": ["Press mud", "Yeast sludge", "Cotton dust", "Bagasse"],
            "correctAnswer": "Cotton dust"
        },
        {
            "question": "What is the percentage of settleable solids in municipal wastewater?",
            "options": ["60%", "70%", "90%", "65%"],
            "correctAnswer": "70%"
        },
        {
            "question": "What is the color of septic wastewater?",
            "options": ["Grey", "Black", "Light brown", "Dark brown"],
            "correctAnswer": "Black"
        },
        {
            "question": "Which of the following is a biodegradable waste?",
            "options": ["Polythene bags", "Synthetic fiber", "Food waste", "Paper"],
            "correctAnswer": "Food waste"
        },
        {
            "question": "Which of the following is the cutting and tearing of municipal solid waste?",
            "options": ["Landfills", "Shredding", "Pulverization", "Composting"],
            "correctAnswer": "Shredding"
        },
        {
            "question": "X-ray films are a source of which of the following gases?",
            "options": ["SO2", "CO2", "NO2", "SO3"],
            "correctAnswer": "SO2"
        },
        {
            "question": "The process of burning municipal solid wastes under suitable temperature and conditions in a specific furnace is called:",
            "options": ["Landfill", "Incineration", "Recycling", "Vermicomposting"],
            "correctAnswer": "Incineration"
        },
        {
            "question": "The process of decomposition of biodegradable solid waste by earthworms is called:",
            "options": ["Landfills", "Shredding", "Vermi-composting", "Composting"],
            "correctAnswer": "Vermi-composting"
        },
        {
            "question": "When the organic matter in a sanitary landfill decomposes, it generates:",
            "options": ["Methane", "Nitrogen", "Hydrogen", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "Which of the following gases can be produced from landfill waste?",
            "options": ["Biogas", "Natural gas", "Liquefied petroleum gas", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "The most valuable part of a PC or TV is the:",
            "options": ["Lead in the CRT", "Circuit boards containing silver and gold", "Copper in the cathode yoke", "None of the above"],
            "correctAnswer": "Circuit boards containing silver and gold"
        },
        {
            "question": "Which toxic element is commonly found in e-waste?",
            "options": ["Lead", "Cadmium", "Beryllium", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "What is the primary cause of acid rain?",
            "options": ["Carbon dioxide", "Sulphur dioxide", "Methane", "Ozone depletion"],
            "correctAnswer": "Sulphur dioxide"
        }
    ],
    Module4: [
        {
            "question": "The Environmental Protection Act was enacted in the year:",
            "options": ["1986", "1992", "1984", "1974"],
            "correctAnswer": "1986"
        },
        {
            "question": "Which of the following is an NGO?",
            "options": ["Narmada Bachao Andolan", "Bombay Natural History Society", "Centre for Science & Environment", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "Economic security is measured on the basis of:",
            "options": ["Income", "Labour market & employment", "Work, job & skills", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "Socio-economic security in environmental aspects involves:",
            "options": ["Fairness & equity in distribution cost for complex existing generation", "Welfare of the present generation", "Intra & intergenerational equity of resources", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "Minamata episode of Japan is due to the poisoning of:",
            "options": ["Lead", "Nickel", "Mercury", "Cadmium"],
            "correctAnswer": "Mercury"
        },
        {
            "question": "What is the maximum allowable concentration of fluorides in drinking water?",
            "options": ["1.0 mg/L", "1.25 mg/L", "1.50 mg/L", "1.75 mg/L"],
            "correctAnswer": "1.50 mg/L"
        },
        {
            "question": "Electromagnetic radiation can cause:",
            "options": ["Plague", "Malaria", "Cancer", "Dengue fever"],
            "correctAnswer": "Cancer"
        },
        {
            "question": "Among the freshwater available on Earth, the percentage of surface water is about:",
            "options": ["50%", "10%", "5%", "Less than 1%"],
            "correctAnswer": "Less than 1%"
        },
        {
            "question": "Which of the following is not a part of the hydrological cycle?",
            "options": ["Precipitation", "Infiltration", "Transpiration", "Perspiration"],
            "correctAnswer": "Perspiration"
        },
        {
            "question": "Groundwater depends on:",
            "options": ["Amount of rainfall", "Geological formations", "Runoff", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "The Earth's land surface covered by forest is about:",
            "options": ["1/4", "1/3", "2/3", "1/5"],
            "correctAnswer": "1/3"
        },
        {
            "question": "About _____% of the Earth's surface is covered by water:",
            "options": ["53%", "19%", "71%", "33%"],
            "correctAnswer": "71%"
        },
        {
            "question": "The term 'acid rain' was coined in the year:",
            "options": ["1952", "1852", "1652", "1752"],
            "correctAnswer": "1852"
        },
        {
            "question": "Physical pollution of water is due to:",
            "options": ["Dissolved oxygen", "Turbidity", "pH", "None of the above"],
            "correctAnswer": "Turbidity"
        },
        {
            "question": "Which greenhouse gas is known as a colorless, non-flammable gas with a sweetish odor, also called laughing gas?",
            "options": ["Methane", "Carbon dioxide", "Nitrous oxide", "Sulphur hexafluoride"],
            "correctAnswer": "Nitrous oxide"
        },
        {
            "question": "Global warming could affect:",
            "options": ["Climate", "Increase in sea level", "Melting of glaciers", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "Each chlorine-free radical can destroy how many ozone molecules?",
            "options": ["100", "10,000", "100,000", "100"],
            "correctAnswer": "100,000"
        },
        {
            "question": "Acid rain has been increasing due to:",
            "options": ["Urbanization", "Industrialization", "Increase in vehicle pollution", "None of the above"],
            "correctAnswer": "Increase in vehicle pollution"
        },
        {
            "question": "Cancer and related diseases are caused due to:",
            "options": ["Primary radiation", "Non-ionizing radiation", "Ionizing radiation", "Secondary radiation"],
            "correctAnswer": "Ionizing radiation"
        },
        {
            "question": "The major contributors to acid rain are known as:",
            "options": ["Precursors", "Processors", "Protons", "Pollutants"],
            "correctAnswer": "Precursors"
        },
        {
            "question": "World Ozone Day is celebrated on:",
            "options": ["September 16", "June 5", "September 30", "March 21"],
            "correctAnswer": "September 16"
        },
        {
            "question": "Ozone layer thickness is measured in which units?",
            "options": ["PPM", "PPB", "Db", "DU"],
            "correctAnswer": "DU"
        },
        {
            "question": "The equivalent of one Dobson unit is:",
            "options": ["0.1mm", "0.01mm", "0.1m", "0.01m"],
            "correctAnswer": "0.01mm"
        },
        {
            "question": "Ozone hole is said to occur when the ozone level decreases below:",
            "options": ["200 DU", "2000 DU", "20 DU", "2 DU"],
            "correctAnswer": "200 DU"
        },
        {
            "question": "What is the pH range of drinking water?",
            "options": ["6 to 9.9", "6.5 to 8.5", "6 to 8.5", "6.5 to 7.5"],
            "correctAnswer": "6.5 to 8.5"
        },
        {
            "question": "The normal average thickness of the stratospheric ozone layer across the globe is around:",
            "options": ["200 DU", "300 DU", "400 DU", "500 DU"],
            "correctAnswer": "300 DU"
        },
        {
            "question": "Which of the following has the highest penetration power?",
            "options": ["Alpha particles", "Beta particles", "Gamma-rays", "None of these"],
            "correctAnswer": "Gamma-rays"
        },
        {
            "question": "Temporary hardness of water is due to:",
            "options": ["Chloride hardness", "Manganese hardness", "Calcium hardness", "Carbonate hardness"],
            "correctAnswer": "Carbonate hardness"
        },
        {
            "question": "Water without fluoride causes:",
            "options": ["Corrosion", "Dental cavities", "Scale formation", "Tooth decay"],
            "correctAnswer": "Tooth decay"
        },
        {
            "question": "Which organ of the body is usually damaged from lead poisoning?",
            "options": ["Kidney", "Lungs", "Liver", "Heart"],
            "correctAnswer": "Kidney"
        }

    ],
    Modul4partA: [
        {
            "question": "Global warming may bring about the following changes in the climate of the Earth:",
            "options": ["Increase in rainfall", "Desertification", "Drought", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "‘Earth Day’ is held every year on:",
            "options": ["June 5", "November 23", "April 22", "January 26"],
            "correctAnswer": "April 22"
        },
        {
            "question": "Which of the following involves children in environmental awareness?",
            "options": ["Ecomark", "Ecoclub", "Eco Task Force", "All of these"],
            "correctAnswer": "All of these"
        },
        {
            "question": "Which of the following is NOT a correct pair?",
            "options": ["World Forest Day - March 21", "Earth Day - June 5", "World Population Day - July 11", "World Day for Water - March 22"],
            "correctAnswer": "Earth Day - June 5"
        },
        {
            "question": "The Karnataka State Pollution Control Board (KSPCB) was constituted in the year:",
            "options": ["1974", "1982", "1986", "1976"],
            "correctAnswer": "1974"
        },
        {
            "question": "The Water (Prevention & Control of Pollution) Act was enacted in the year:",
            "options": ["1986", "1974", "1994", "2004"],
            "correctAnswer": "1974"
        },
        {
            "question": "Blue baby syndrome (Methemoglobinemia) is caused by the contamination of water due to:",
            "options": ["Phosphates", "Sulphur", "Arsenic", "Nitrates"],
            "correctAnswer": "Nitrates"
        },
        {
            "question": "An important factor that causes waterborne diseases is:",
            "options": ["Using contaminated sewage for irrigation", "Leaching of untreated fecal and urinary discharges into water bodies", "Discharge of industrial waste", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "EIA stands for:",
            "options": ["Environmental Industrial Impact", "Eco Industrial Act", "Eco Impact Assessment", "Environmental Impact Assessment"],
            "correctAnswer": "Environmental Impact Assessment"
        },
        {
            "question": "EIA is related to:",
            "options": ["Resource conservation", "Efficient equipment/process", "Waste minimization", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "Which of the following is a key element of EIA?",
            "options": ["Scoping", "Screening", "Identifying & evaluating alternatives", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "Which of the following is an ill effect of urbanization?",
            "options": ["Decrease in agricultural land", "Loss of greenery", "Loss of water bodies", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "Acid rain can be controlled by:",
            "options": ["Reducing SO2 & NO2 emissions", "Reducing oxygen emission", "Increasing the number of lakes", "Increasing the forest cover"],
            "correctAnswer": "Reducing SO2 & NO2 emissions"
        },
        {
            "question": "Which of the following statements about ozone is true?",
            "options": ["Ozone is a major constituent of photochemical smog", "Ozone protects us from the harmful UV radiation of the Sun", "Ozone is highly reactive", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "Greenhouse gas emissions from burning fuel in automobiles contribute:",
            "options": ["16%", "10%", "20%", "5%"],
            "correctAnswer": "20%"
        },
        {
            "question": "The required iron content in drinking water as specified by BIS is:",
            "options": ["300 mg/L", "30 mg/L", "3 mg/L", "0.3 mg/L"],
            "correctAnswer": "0.3 mg/L"
        },
        {
            "question": "The pH value of acid rain was recorded in early studies as:",
            "options": ["2.5", "7.5", "4.7", "5.7"],
            "correctAnswer": "4.7"
        },
        {
            "question": "Stone cancer is an effect of:",
            "options": ["Climate change", "Hard water", "Acid rain", "Excess of calcium"],
            "correctAnswer": "Acid rain"
        },
        {
            "question": "Which of the following gases is NOT a concern for the greenhouse effect?",
            "options": ["CO2", "CH4", "SO2", "H2O vapors"],
            "correctAnswer": "SO2"
        },
        {
            "question": "Among all oxides of nitrogen, which one is responsible for the formation of acid rain?",
            "options": ["Nitrous oxide", "Nitric oxide", "Nitrogen trioxide", "Nitrogen pentoxide"],
            "correctAnswer": "Nitric oxide"
        },
        {
            "question": "World Ozone Day is celebrated every year on:",
            "options": ["15th Sept.", "16th Oct.", "16th Sept.", "22nd Apr."],
            "correctAnswer": "16th Sept."
        },
        {
            "question": "Contribution of carbon dioxide to global warming from industries is about:",
            "options": ["50%", "24%", "25%", "75%"],
            "correctAnswer": "25%"
        },
        {
            "question": "Animal husbandry may result in:",
            "options": ["Acid rain", "Ozone depletion", "Global warming", "Snowfall"],
            "correctAnswer": "Global warming"
        },
        {
            "question": "Percentage of groundwater available in Earth's environment is:",
            "options": ["0.02%", "0.5%", "1.5%", "0.2%"],
            "correctAnswer": "0.5%"
        },
        {
            "question": "What is the average concentration of ozone in the ozone layer of the atmosphere?",
            "options": ["Nearly 100%", "Greater than 90%", "Between 10-50%", "Less than 10 ppm"],
            "correctAnswer": "Less than 10 ppm"
        },
        {
            "question": "Which of the following devices can be used to measure ozone in the stratosphere from the ground?",
            "options": ["Spectrometer", "Photometer", "Spectrophotometer", "Spectro-ozonometer"],
            "correctAnswer": "Spectrophotometer"
        },
        {
            "question": "Who discovered the formation of ozone from photochemical reactions?",
            "options": ["G.M.B. Dobson", "Sydney Chapman", "Carl Sagan", "Henri Buisson"],
            "correctAnswer": "Sydney Chapman"
        },
        {
            "question": "Which of the following UV radiations is responsible for causing sunburns and skin cancer?",
            "options": ["UV-A", "UV-B", "UV-C", "All of the above"],
            "correctAnswer": "UV-B"
        },
        {
            "question": "When was the ozone hole discovered?",
            "options": ["1974", "1964", "1994", "1984"],
            "correctAnswer": "1984"
        }
    ],
    Module5: [
        {
            "question": "Environmental (Protection) Act was enacted in the year",
            "options": ["1986", "1992", "1984", "1976"],
            "correctAnswer": "1986"
        },
        {
            "question": "The Air (Prevention & Control of Pollution) Act was enacted in the year",
            "options": ["1981", "1996", "2000", "1991"],
            "correctAnswer": "1981"
        },
        {
            "question": "What is the primary objective of the Water (Prevention and Control of Pollution) Act, 1974?",
            "options": ["To prevent deforestation", "To provide drinking water", "To control water pollution and maintain water quality", "To promote industries"],
            "correctAnswer": "To control water pollution and maintain water quality"
        },
        {
            "question": "The Wild Life Protection Act was enacted in the year",
            "options": ["1986", "1974", "1992", "1972"],
            "correctAnswer": "1972"
        },
        {
            "question": "What does the term ‘pollutant’ refer to under the Water (Prevention and Control of Pollution) Act, 1974?",
            "options": ["Any waste or substance that, when added to water, results in its contamination", "Any substance that harms the environment", "Only industrial waste", "Only domestic waste"],
            "correctAnswer": "Any waste or substance that, when added to water, results in its contamination"
        },
        {
            "question": "The Environmental (Protection) Act 1986 deals with",
            "options": ["Air", "Water", "Soil", "All"],
            "correctAnswer": "All"
        },
        {
            "question": "Under the Environment Protection Act, of 1986, who has the authority to take action in case of environmental violations?",
            "options": ["The Ministry of Finance", "The Central Pollution Control Board (CPCB)", "The Central Government", "The National Green Tribunal"],
            "correctAnswer": "The Central Government"
        },
        {
            "question": "What is the maximum period for which biomedical waste can be stored at a healthcare facility, as per the Biomedical Waste Management Rules, 2016?",
            "options": ["24 hours", "72 hours", "48 hours", "7 days"],
            "correctAnswer": "48 hours"
        },
        {
            "question": "Which of the following is considered biomedical waste as per the Biomedical Waste Management Rules, 2016?",
            "options": ["Household waste", "Agricultural waste", "Waste generated from hospitals, clinics, and laboratories", "Industrial waste"],
            "correctAnswer": "Waste generated from hospitals, clinics, and laboratories"
        },
        {
            "question": "Which color-coded containers are used for disposing of human anatomical waste under the Biomedical Waste Management Rules, 2016?",
            "options": ["red containers", "yellow containers", "blue containers", "green containers"],
            "correctAnswer": "yellow containers"
        },
        {
            "question": "What is the penalty for violating the provisions of the Air (Prevention and Control of Pollution) Act, 1981?",
            "options": ["A warning letter from the government", "Imprisonment and/or fine", "Immediate closure of the offending industry", "No penalty is specified"],
            "correctAnswer": "Imprisonment and/or fine"
        },
        {
            "question": "Under the Solid Waste Management Rules, 2016, which of the following is banned for waste generators?",
            "options": ["Waste incineration", "Waste segregation", "Littering and open burning of waste", "Waste treatment"],
            "correctAnswer": "Littering and open burning of waste"
        },
        {
            "question": "Under the Solid Waste Management Rules, 2016, who is responsible for managing and processing construction and demolition waste?",
            "options": ["Local authorities", "Developers and builders", "Central Pollution Control Board", "Municipalities and waste contractors"],
            "correctAnswer": "Local authorities"
        },
        {
            "question": "Who is responsible for enforcing the provisions of the Water Act, 1974?",
            "options": ["The Ministry of Environment, Forest and Climate Change", "The State Pollution Control Boards", "The Central Water Commission", "The local municipal corporation"],
            "correctAnswer": "The State Pollution Control Boards"
        },
        {
            "question": "Which of the following pollutants are targeted by the Water (Prevention and Control of Pollution) Act, 1974?",
            "options": ["Pesticides", "Sewage", "Heavy metals in water", "All the above"],
            "correctAnswer": "All the above"
        },
        {
            "question": "The primary objective of the Air (Prevention and Control of Pollution) Act, 1981 is to:",
            "options": ["Control soil pollution", "Prevent and control air pollution", "Regulate industrial waste disposal", "Monitor water quality"],
            "correctAnswer": "Prevent and control air pollution"
        },
        {
            "question": "Under the Air Act, 1981, which of the following is considered a 'pollutant'?",
            "options": ["Carbon dioxide", "Oxygen", "Sulfur dioxide", "Nitrogen"],
            "correctAnswer": "Sulfur dioxide"
        },
        {
            "question": "Which of the following is a primary objective of the Environmental Protection Act of 1986 in India?",
            "options": ["To promote industrial growth without any environmental regulations", "To provide financial subsidies to companies for environmental protection", "To prevent environmental degradation and control pollution", "To encourage deforestation for economic growth"],
            "correctAnswer": "To prevent environmental degradation and control pollution"
        },
        {
            "question": "The Environmental Protection Act, 1986 was enacted in response to which of the following environmental disasters in India?",
            "options": ["Bhopal Gas Tragedy", "Delhi Air Pollution Crisis", "Ganga River Pollution", "Flooding in Chennai"],
            "correctAnswer": "Bhopal Gas Tragedy"
        },
        {
            "question": "Under the Environmental Protection Act, 1986, who is responsible for ensuring compliance with environmental standards?",
            "options": ["State Pollution Control Boards", "non-governmental organizations (NGOs)", "Local Municipalities", "The Central Pollution Control Board (CPCB)"],
            "correctAnswer": "The Central Pollution Control Board (CPCB)"
        },
        {
            "question": "The Solid Waste Management Rules, 2016 in India primarily aim to:",
            "options": ["Promote the recycling of solid waste", "Provide financial support for municipal corporations", "Manage the disposal of hazardous waste", "Control the use of plastic waste in industries"],
            "correctAnswer": "Promote the recycling of solid waste"
        },
        {
            "question": "Which of the following categories of waste must be managed separately according to the Solid Waste Management Rules, 2016?",
            "options": ["Only dry waste", "Non-recyclable waste only", "Wet waste, dry waste, and hazardous waste", "Only recyclable plastic waste"],
            "correctAnswer": "Wet waste, dry waste, and hazardous waste"
        },
        {
            "question": "What is the role of municipalities under the Solid Waste Management Rules, 2016?",
            "options": ["To monitor waste generation in rural areas only", "To collect only biodegradable waste", "To ensure the proper segregation and collection of waste", "To incinerate all solid waste"],
            "correctAnswer": "To ensure the proper segregation and collection of waste"
        },
        {
            "question": "What is the primary objective of the E-Waste (Management) Rules, 2016 in India?",
            "options": ["To increase the sales of electronic products", "To discourage the use of electronic products", "To promote the import of electronic waste", "To regulate the safe disposal and recycling of e-waste"],
            "correctAnswer": "To regulate the safe disposal and recycling of e-waste"
        },
        {
            "question": "What does E-Waste refer to?",
            "options": ["Any electrical or electronic device that has reached the end of its useful life", "Only the waste generated by large industries", "Only the waste from mobile phones", "Only the batteries used in electronic devices"],
            "correctAnswer": "Any electrical or electronic device that has reached the end of its useful life"
        },
        {
            "question": "Which of the following is NOT considered e-waste?",
            "options": ["Old mobile phones", "Defective televisions", "Unused plastic bottles", "Used batteries from electronic devices"],
            "correctAnswer": "Unused plastic bottles"
        },
        {
            "question": "What are some common hazardous materials found in e-waste?",
            "options": ["Paper and plastic", "Glass and wood", "Mercury, lead, and cadmium", "Cotton and fabric"],
            "correctAnswer": "Mercury, lead, and cadmium"
        },
        {
            "question": "What is the iron and steel constituting of e-waste?",
            "options": ["20%", "30%", "40%", "50%"],
            "correctAnswer": "50%"
        },
        {
            "question": "Which of the following element make e-waste hazardous in nature?",
            "options": ["Lead", "Glass", "Plastic", "Iron"],
            "correctAnswer": "Lead"
        },
        {
            "question": "In 2006, the IAER projected that waste by 2010.",
            "options": ["1 billion", "2 billion", "3 billion", "4 billion"],
            "correctAnswer": "3 billion"
        }
    ],
    Module5partA: [
        {
            "question": "In 2006, the IAER projected that electronic and electrical appliances would become e-waste by 2010.",
            "options": ["1 billion", "2 billion", "3 billion", "4 billion"],
            "correctAnswer": "3 billion"
        },
        {
            "question": "According to the Comptroller and Auditor- General’s (CAG) report what is the amount of e-waste generated annually?",
            "options": ["4LT", "5LT", "6LT", "7LT"],
            "correctAnswer": "5LT"
        },
        {
            "question": "What is the hazardous pollutant released from LEDs?",
            "options": ["Arsenic", "Barium", "Cobalt", "Cadmium"],
            "correctAnswer": "Arsenic"
        },
        {
            "question": "What is the hazardous pollutant released from electron tubes?",
            "options": ["Arsenic", "Barium", "Cobalt", "Cadmium"],
            "correctAnswer": "Barium"
        },
        {
            "question": "What is the hazardous pollutant released from batteries?",
            "options": ["Arsenic", "Barium", "Cobalt", "Cadmium"],
            "correctAnswer": "Cadmium"
        },
        {
            "question": "What is the hazardous pollutant released from circuit boards?",
            "options": ["Arsenic", "Barium", "Lead", "Copper"],
            "correctAnswer": "Lead"
        },
        {
            "question": "What is the hazardous pollutant released from telephones?",
            "options": ["Lithium", "Barium", "Lead", "Copper"],
            "correctAnswer": "Lead"
        },
        {
            "question": "What is the hazardous pollutant released from calculators?",
            "options": ["Lithium", "Mercury", "Lead", "Copper"],
            "correctAnswer": "Mercury"
        },
        {
            "question": "Which of the hazardous pollutant occurs in plastic?",
            "options": ["Lithium", "PCBs", "Lead", "Copper"],
            "correctAnswer": "PCBs"
        },
        {
            "question": "What is one of the primary methods for recycling e-waste?",
            "options": ["Incineration", "Landfilling", "Manual dismantling and material recovery", "Burning"],
            "correctAnswer": "Manual dismantling and material recovery"
        },
        {
            "question": "What is the main reason e-waste has become a global issue?",
            "options": ["Large quantities are produced every year", "It is biodegradable", "It does not require recycling", "It is harmless to human health"],
            "correctAnswer": "Large quantities are produced every year"
        },
        {
            "question": "What year were the E-Waste (Management) Rules first notified in India?",
            "options": ["2009", "2011", "2014", "2017"],
            "correctAnswer": "2011"
        },
        {
            "question": "Who is responsible for segregating biomedical waste at the point of generation in a healthcare facility?",
            "options": ["Waste management company", "Healthcare facility's administrative staff", "Doctors and healthcare workers", "Patients"],
            "correctAnswer": "Doctors and healthcare workers"
        },
        {
            "question": "What is the primary purpose of the Biomedical Waste Management Rules, 2016?",
            "options": ["To reduce waste disposal costs", "To manage healthcare waste in an environmentally safe manner", "To encourage recycling", "To reduce the use of plastic in hospitals"],
            "correctAnswer": "To manage healthcare waste in an environmentally safe manner"
        },
        {
            "question": "Which of the following is an essential characteristic of a successful solid waste management program?",
            "options": ["Strict regulations with high penalties", "Comprehensive waste collection, recycling, and disposal systems", "Minimal involvement of the community", "Focus on increasing landfill size"],
            "correctAnswer": "Comprehensive waste collection, recycling, and disposal systems"
        },
        {
            "question": "Under which rule of Government, guidelines for solid waste management are followed today?",
            "options": ["Municipal Solid Waste Rules, 2000", "Municipal Solid Waste Rules, 2016", "Solid Waste Rules, 2000", "Solid Waste Rules, 2016"],
            "correctAnswer": "Municipal Solid Waste Rules, 2016"
        },
        {
            "question": "Which of the following is not a category of biomedical waste as per the 2016 rules?",
            "options": ["Yellow", "Green", "Blue", "White"],
            "correctAnswer": "Green"
        },
        {
            "question": "What is the maximum allowable period for storing biomedical waste in healthcare facilities under the BMW Rules?",
            "options": ["24 hours", "48 hours", "72 hours", "7 days"],
            "correctAnswer": "48 hours"
        },
        {
            "question": "Which of the following categories is included under solid waste as per the 2016 rules?",
            "options": ["Construction and demolition waste", "Electronic waste", "Hazardous waste", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "Who is responsible for collecting and transporting solid waste under the Solid Waste Management Rules, 2016?",
            "options": ["Local authorities (municipalities or urban local bodies)", "Private citizens", "NGOs", "Environmental protection agencies"],
            "correctAnswer": "Local authorities (municipalities or urban local bodies)"
        },
        {
            "question": "Which of the following is regulated under the Air (Prevention and Control of Pollution) Act, 1981?",
            "options": ["Noise pollution", "Soil pollution", "Air pollution from industrial emissions", "Solid waste disposal"],
            "correctAnswer": "Air pollution from industrial emissions"
        },
        {
            "question": "Under the Water (Prevention and Control of Pollution) Act, 1974, the term 'pollution' refers to:",
            "options": ["Only the contamination of water bodies", "Only air pollution", "The contamination of water, air, and soil", "Soil erosion"],
            "correctAnswer": "The contamination of water, air, and soil"
        }
    ],
    Modulequestionpaper1: [
        {
            "question": "Which type of ecosystem is characterized by high biodiversity, tall trees, and a warm climate year-round?",
            "options": ["Desert ecosystem", "Riverine ecosystem", "Forest ecosystem", "Oceanic ecosystem"],
            "correctAnswer": "Forest ecosystem"
        },
        {
            "question": "Which of the following best defines an ecosystem?",
            "options": ["A community of organisms interacting with each other only", "A network of species sharing similar resources", "A system involving interactions between living organisms and their physical environment", "A group of species that live in the same geographic area"],
            "correctAnswer": "A system involving interactions between living organisms and their physical environment"
        },
        {
            "question": "Which ecosystem is most adapted to extreme temperatures and low water availability?",
            "options": ["Wetlands", "Forest", "Desert", "Oceanic"],
            "correctAnswer": "Desert"
        },
        {
            "question": "What is the primary goal of the United Nations’ Sustainable Development Goal (SDG) 1?",
            "options": ["Achieve universal education", "Eradicate poverty in all its forms", "Ensure clean water and sanitation", "Combat climate change"],
            "correctAnswer": "Eradicate poverty in all its forms"
        },
        {
            "question": "What is the primary characteristic of wetlands?",
            "options": ["High salinity", "Frequent flooding and water saturation", "Sparse vegetation", "Rocky terrain"],
            "correctAnswer": "Frequent flooding and water saturation"
        },
        {
            "question": "SDG 13 focuses on which critical global issue?",
            "options": ["Marine life conservation", "Climate action", "Gender equality", "Sustainable agriculture"],
            "correctAnswer": "Climate action"
        },
        {
            "question": "SDG 14 focuses on the conservation and sustainable use of:",
            "options": ["Freshwater resources", "Terrestrial ecosystems", "Oceans, seas, and marine resources", "Urban environments"],
            "correctAnswer": "Oceans, seas, and marine resources"
        },
        {
            "question": "Which of the following ecosystems plays a crucial role in carbon sequestration?",
            "options": ["Oceanic ecosystem", "Desert ecosystem", "Riverine ecosystem", "Mountain ecosystem"],
            "correctAnswer": "Oceanic ecosystem"
        },
        {
            "question": "Which SDG promotes responsible consumption and production patterns?",
            "options": ["SDG 12", "SDG 9", "SDG 5", "SDG 15"],
            "correctAnswer": "SDG 12"
        },
        {
            "question": "Which of the following is the largest source of freshwater on Earth?",
            "options": ["Rivers", "Glaciers and ice caps", "Groundwater", "Lakes"],
            "correctAnswer": "Glaciers and ice caps"
        },
        {
            "question": "Which of the following is a primary indicator of water quality?",
            "options": ["Temperature", "Turbidity", "Salinity", "pH level"],
            "correctAnswer": "pH level"
        },
        {
            "question": "Which of the following diseases is primarily water-borne?",
            "options": ["Tuberculosis", "Cholera", "Malaria", "Dengue"],
            "correctAnswer": "Cholera"
        },
        {
            "question": "What percentage of the Earth's water is freshwater?",
            "options": ["97%", "50%", "2.5%", "10%"],
            "correctAnswer": "2.5%"
        },
        {
            "question": "Which of the following organisms causes typhoid?",
            "options": ["Vibrio cholerae", "Salmonella typhi", "Plasmodium falciparum", "Escherichia coli"],
            "correctAnswer": "Salmonella typhi"
        },
        {
            "question": "Malaria is an example of which type of disease?",
            "options": ["Water-borne", "Air-borne", "Water-induced", "Food-borne"],
            "correctAnswer": "Water-induced"
        },
        {
            "question": "The recommended safe limit of fluoride in drinking water by the WHO is:",
            "options": ["1.5 mg/L", "2.5 mg/L", "3.0 mg/L", "0.5 mg/L"],
            "correctAnswer": "1.5 mg/L"
        },
        {
            "question": "Excess fluoride in drinking water primarily causes which health condition?",
            "options": ["Rickets", "Fluorosis", "Goiter", "Scurvy"],
            "correctAnswer": "Fluorosis"
        },
        {
            "question": "Which of the following is a non-conventional source of energy?",
            "options": ["Coal", "Natural Gas", "Solar Energy", "Petroleum"],
            "correctAnswer": "Solar Energy"
        },
        {
            "question": "Hydropower is considered a type of:",
            "options": ["Solar energy", "Non-renewable energy", "Renewable energy", "Geothermal energy"],
            "correctAnswer": "Renewable energy"
        },
        {
            "question": "Fluoride in drinking water affects which part of the human body the most?",
            "options": ["Liver", "Teeth", "Heart", "Lungs"],
            "correctAnswer": "Teeth"
        },
        {
            "question": "Which country is the largest producer of wind energy?",
            "options": ["India", "China", "Germany", "USA"],
            "correctAnswer": "China"
        },
        {
            "question": "What is the primary advantage of using solar energy?",
            "options": ["Low installation cost", "Non-renewable source", "Zero greenhouse gas emissions", "High maintenance cost"],
            "correctAnswer": "Zero greenhouse gas emissions"
        },
        {
            "question": "Hydrogen is considered a clean energy source because:",
            "options": ["It is abundant in fossil fuels", "It produces only water as a by-product", "It is cheaper than coal", "It can only be used in nuclear reactors"],
            "correctAnswer": "It produces only water as a by-product"
        },
        {
            "question": "Which form of energy is stored in fossil fuels?",
            "options": ["Nuclear Energy", "Thermal Energy", "Chemical Energy", "Electrical Energy"],
            "correctAnswer": "Chemical Energy"
        },
        {
            "question": "Which gas is the primary contributor to the greenhouse effect?",
            "options": ["Oxygen", "Carbon dioxide", "Nitrogen", "Argon"],
            "correctAnswer": "Carbon dioxide"
        },
        {
            "question": "What is the primary effect of excessive nutrients like nitrogen and phosphorus in water bodies?",
            "options": ["Acidification", "Eutrophication", "Ozone depletion", "Desertification"],
            "correctAnswer": "Eutrophication"
        },
        {
            "question": "Which of the following is a major source of water pollution?",
            "options": ["Agricultural runoff", "Solar energy production", "Wind energy turbines", "Geothermal power plants"],
            "correctAnswer": "Agricultural runoff"
        },
        {
            "question": "Which pollutant is most commonly associated with industrial wastewater?",
            "options": ["Pesticides", "Heavy metals", "Carbon dioxide", "Methane"],
            "correctAnswer": "Heavy metals"
        },
        {
            "question": "What is the unit used to measure noise levels?",
            "options": ["Hertz (Hz)", "Decibel (dB)", "Joule (J)", "Pascal (Pa)"],
            "correctAnswer": "Decibel (dB)"
        },
        {
            "question": "Which of the following is a major source of air pollution in urban areas?",
            "options": ["Agricultural activities", "Automobile emissions", "Deforestation", "Solar power plants"],
            "correctAnswer": "Automobile emissions"
        },
        {
            "question": "What is a key preventive measure for reducing air pollution?",
            "options": ["Reducing deforestation", "Using renewable energy sources", "Increasing the use of fossil fuels", "Promoting single-use plastics"],
            "correctAnswer": "Using renewable energy sources"
        },
        {
            "question": "Which pollutant is responsible for causing acid rain?",
            "options": ["Carbon monoxide", "Sulfur dioxide", "Methane", "Ammonia"],
            "correctAnswer": "Sulfur dioxide"
        },
        {
            "question": "Which health condition is most commonly associated with air pollution?",
            "options": ["Osteoporosis", "Respiratory diseases", "Skin infections", "Digestive disorders"],
            "correctAnswer": "Respiratory diseases"
        },
        {
            "question": "Which type of waste is classified under biomedical waste?",
            "options": ["Construction debris", "Used syringes", "E-waste", "Food packaging"],
            "correctAnswer": "Used syringes"
        },
        {
            "question": "Which of the following is a major source of solid waste in urban areas?",
            "options": ["Agriculture", "Industries", "Households", "Forests"],
            "correctAnswer": "Households"
        },
        {
            "question": "Which type of solid waste is categorized as biodegradable?",
            "options": ["Glass bottles", "Plastic bags", "Food scraps", "Aluminum cans"],
            "correctAnswer": "Food scraps"
        },
        {
            "question": "What is the final step in the functional elements of solid waste management?",
            "options": ["Waste collection", "Waste transportation", "Waste disposal", "Waste generation"],
            "correctAnswer": "Waste disposal"
        },
        {
            "question": "What is a key characteristic of biomedical waste?",
            "options": ["Non-hazardous", "Radioactive", "Infectious and hazardous", "Biodegradable and harmless"],
            "correctAnswer": "Infectious and hazardous"
        },
        {
            "question": "According to the Solid Waste Management Rules, 2016, which of the following is a duty of waste generators?",
            "options": ["Ensure segregation of waste at source", "Transport waste to landfill sites", "Burn the waste in open spaces", "Dispose of waste in water bodies"],
            "correctAnswer": "Ensure segregation of waste at source"
        },
        {
            "question": "Under the Biomedical Waste Management Rules, 2016, biomedical waste should be treated and disposed of within how many hours of generation?",
            "options": ["12 hours", "24 hours", "48 hours", "72 hours"],
            "correctAnswer": "48 hours"
        },
        {
            "question": "Which hazardous pollutant is commonly found in e-waste?",
            "options": ["Mercury", "Methane", "Sulfur dioxide", "Carbon monoxide"],
            "correctAnswer": "Mercury"
        },
        {
            "question": "Which of the following is a basic principle of e-waste management?",
            "options": ["Open burning of e-waste", "Extended Producer Responsibility (EPR)", "Dumping in water bodies", "Burying without treatment"],
            "correctAnswer": "Extended Producer Responsibility (EPR)"
        },
        {
            "question": "The E-Waste (Management) Rules, 2022, introduced stricter guidelines on:",
            "options": ["Banning e-waste recycling", "EPR targets for producers", "Eliminating e-waste management entirely", "Exporting all e-waste overseas"],
            "correctAnswer": "EPR targets for producers"
        },
        {
            "question": "What is the primary aim of the E-Waste (Management) Rules, 2022?",
            "options": ["Promote informal recycling of e-waste", "Encourage scientific and safe disposal of e-waste", "Increase landfilling of e-waste", "Restrict the use of recycled components"],
            "correctAnswer": "Encourage scientific and safe disposal of e-waste"
        },
        {
            "question": "According to the E-Waste (Management and Handling) Rules, 2011, who is primarily responsible for the collection of e-waste?",
            "options": ["Municipal corporations", "Producers and manufacturers", "Consumers", "Educational institutions"],
            "correctAnswer": "Producers and manufacturers"
        },
        {
            "question": "Which of the following environmental issues is caused by improper e-waste disposal?",
            "options": ["Ozone depletion", "Soil and groundwater contamination", "Desertification", "Ocean acidification"],
            "correctAnswer": "Soil and groundwater contamination"
        },
        {
            "question": "Which of the following devices contributes the most to global e-waste generation?",
            "options": ["Refrigerators", "Mobile phones and computers", "Solar panels", "Wind turbines"],
            "correctAnswer": "Mobile phones and computers"
        },
        {
            "question": "Which toxic substance in e-waste is known to cause kidney damage when improperly disposed of?",
            "options": ["Cadmium", "Carbon dioxide", "Nitrogen", "Phosphorus"],
            "correctAnswer": "Cadmium"
        },
        {
            "question": "Which component of e-waste is most valuable for recycling due to its precious metal content?",
            "options": ["Plastic casings", "Circuit boards", "Batteries", "Cathode ray tubes"],
            "correctAnswer": "Circuit boards"
        }


    ],
    Modulequestionpaper2: [
        {
            "question": "Habitat refers to",
            "options": ["Physical conditions of the place where organisms live", "Chemical conditions of the place where organisms live", "Both a & b", "None of a or b"],
            "correctAnswer": "Both a & b"
        },
        {
            "question": "Which of the following energy has the greatest potential among all the sources of renewable energy?",
            "options": ["Solar energy", "Wind Energy", "Thermal energy", "Hydro-electrical energy"],
            "correctAnswer": "Solar energy"
        },
        {
            "question": "The term ‘Environment’ has been derived from the French word which means to encircle or surround",
            "options": ["Environ", "Oikos", "Geo", "Aqua"],
            "correctAnswer": "Environ"
        },
        {
            "question": "Which of the following statements is false?",
            "options": ["Inorganic nutrients are recycled in an ecosystem", "Energy ‘flows’ through the ecosystem in the form of carbon-carbon bonds", "Energy is recycled in an ecosystem", "Respiration process releases energy"],
            "correctAnswer": "Energy is recycled in an ecosystem"
        },
        {
            "question": "In terms of greenhouse gas emissions, how good or bad is hydrogen fuel?",
            "options": ["Major contributor of greenhouse gas emissions", "Zero-emission fuel", "Lowest contributor of greenhouse gas emissions", "Hydrogen cannot be used as fuel"],
            "correctAnswer": "Zero-emission fuel"
        },
        {
            "question": "A food web consists of",
            "options": ["A portion of a food chain", "An organism’s position in a food chain", "Interlocking food chains", "A set of similar consumers"],
            "correctAnswer": "Interlocking food chains"
        },
        {
            "question": "In what form is solar energy radiated from the sun?",
            "options": ["Ultraviolet Radiation", "Infrared radiation", "Electromagnetic waves", "Transverse waves"],
            "correctAnswer": "Electromagnetic waves"
        },
        {
            "question": "The by-product of the ocean thermal energy conversion is",
            "options": ["Hot water", "Desalinated water", "Chemicals", "Gases"],
            "correctAnswer": "Desalinated water"
        },
        {
            "question": "Where can we find both running water as well as stagnant water?",
            "options": ["Marine ecosystems", "Wetlands", "Coral reefs", "Freshwater ecosystems"],
            "correctAnswer": "Wetlands"
        },
        {
            "question": "What is the conventional source for hydel power?",
            "options": ["Tidal wave", "Currents", "Water", "Ripples"],
            "correctAnswer": "Water"
        },
        {
            "question": "Groundwater characteristics must be monitored at least once in a",
            "options": ["Week", "Month", "Day", "Quarter"],
            "correctAnswer": "Month"
        },
        {
            "question": "Acid rains are produced by",
            "options": ["Excess NO2 and SO2 from burning fossil fuels", "Excess production of NH3 by industry and coal gas", "Excess release of carbon monoxide by incomplete combustion", "Excess formation of CO2 by combustion and animal respiration"],
            "correctAnswer": "Excess NO2 and SO2 from burning fossil fuels"
        },
        {
            "question": "Which ecosystem is known as a giant permanent pond?",
            "options": ["Lake Ecosystem", "Pond ecosystem", "Seashore ecosystem", "Marine ecosystem"],
            "correctAnswer": "Lake Ecosystem"
        },
        {
            "question": "Which of the following is a producer in an ecosystem?",
            "options": ["Plants and some bacteria capable of producing their own food", "Animals", "Human beings", "Fish"],
            "correctAnswer": "Plants and some bacteria capable of producing their own food"
        },
        {
            "question": "The transfer of energy & nutrients from one feeding group of organization to another in a series is called",
            "options": ["Energy chain", "Food Chain", "Balanced ecosystem", "Food Web"],
            "correctAnswer": "Food Chain"
        },
        {
            "question": "Which one of the following is a result of climate change?",
            "options": ["Adequate rainfall", "Pure air", "Deficiency of freshwater", "Less soil pollution"],
            "correctAnswer": "Deficiency of freshwater"
        },
        {
            "question": "Which contaminant causes kidney and liver problems if present in groundwater?",
            "options": ["Benzene", "Toluene", "Benzotoulene", "Lead"],
            "correctAnswer": "Lead"
        },
        {
            "question": "In an ecosystem, the flow of energy is",
            "options": ["Bidirectional", "Cyclic", "Unidirectional", "Multidirectional"],
            "correctAnswer": "Unidirectional"
        },
        {
            "question": "Which type of turbine is commonly used in tidal energy?",
            "options": ["Francis turbine", "Kaplan turbine", "Pelton wheel", "Gorlov turbine"],
            "correctAnswer": "Gorlov turbine"
        },
        {
            "question": "In an ecosystem, biological cycling of materials is maintained by",
            "options": ["Producer", "Consumer", "Decomposer", "All of the above"],
            "correctAnswer": "All of the above"
        },
        {
            "question": "What type of energy is wind energy?",
            "options": ["Renewable energy", "Non-renewable energy", "Conventional energy", "Commercial energy"],
            "correctAnswer": "Renewable energy"
        },
        {
            "question": "Disaster management deals with situations that occur after the disaster.",
            "options": ["True", "False"],
            "correctAnswer": "True"
        },
        {
            "question": "What is the significance of the ionosphere?",
            "options": ["Aviation movements", "High frequency radio transmission", "Regulates weather", "All of the mentioned"],
            "correctAnswer": "All of the mentioned"
        },
        {
            "question": "World Environment Day is on",
            "options": ["5th May", "5th June", "18th July", "16th August"],
            "correctAnswer": "5th June"
        },
        {
            "question": "How is hydrogen gas produced from fossil fuels?",
            "options": ["Partial oxidation of methane", "Electrolysis", "Evaporation", "Biomass gasification"],
            "correctAnswer": "Partial oxidation of methane"
        },
        {
            "question": "The Taj Mahal in India is affected by",
            "options": ["Fog", "Acid rain", "Water pollution", "Soil Pollution"],
            "correctAnswer": "Acid rain"
        },
        {
            "question": "Environmental Impact Assessment (EIA) is mandatory under which one of the following Indian legislations?",
            "options": ["Indian Forest Act", "Air (Prevention and Control of Pollution) Act", "Wildlife Protection Act", "Environment (Protection) Act"],
            "correctAnswer": "Environment (Protection) Act"
        },
        {
            "question": "What is the primary aim of the Air (Prevention and Control of Pollution) Act, 1981?",
            "options": ["To promote water conservation", "To control air pollution and preserve air quality", "To regulate waste management practices", "To protect soil quality"],
            "correctAnswer": "To control air pollution and preserve air quality"
        },
        {
            "question": "Under the Solid Waste Management Rules, 2016, which of the following is NOT a duty of waste generators?",
            "options": ["To segregate waste at the source", "To manage waste through disposal in landfills", "To register with the authorities", "To ensure waste is handled by authorized persons"],
            "correctAnswer": "To manage waste through disposal in landfills"
        },
        {
            "question": "Which year was the Water (Prevention and Control of Pollution) Act enacted?",
            "options": ["1980", "1974", "1991", "1986"],
            "correctAnswer": "1974"
        },
        {
            "question": "Under the Solid Waste Management Rules, 2016, which of the following is NOT a duty of waste generators?",
            "options": ["To segregate waste at the source", "To manage waste through disposal in landfills", "To register with the authorities", "To ensure waste is handled by authorized persons"],
            "correctAnswer": "To manage waste through disposal in landfills"
        },
        {
            "question": "The Water Act, 1974 led to the establishment of which regulatory body?",
            "options": ["Central Water Commission", "Central Pollution Control Board and State Pollution Control Boards", "Ministry of Environment and Forests", "National Green Tribunal"],
            "correctAnswer": "Central Pollution Control Board and State Pollution Control Boards"
        },
        {
            "question": "According to the Biomedical Waste Management Rules, 2016, which color bin is designated for disposing of infectious waste?",
            "options": ["Yellow", "Blue", "Red", "Black"],
            "correctAnswer": "Yellow"
        },
        {
            "question": "What is the process of movement downwards of vadose water called?",
            "options": ["Infiltration", "Filtration", "Deposition", "Down-flow"],
            "correctAnswer": "Infiltration"
        },
        {
            "question": "What is called for the movement of surface litter and topsoil from one place to another?",
            "options": ["Soil submerge", "Soil degradation", "Soil erosion", "Soil pollution"],
            "correctAnswer": "Soil erosion"
        },
        {
            "question": "Which disease is caused by drinking water high in nitrates?",
            "options": ["Cholera", "Methemoglobinemia", "Kidney problem", "Liver problem"],
            "correctAnswer": "Methemoglobinemia"
        },
        {
            "question": "In which Act, noise is included as an environmental pollutant?",
            "options": ["1974", "1981", "1988", "1994"],
            "correctAnswer": "1981"
        },
        {
            "question": "What is the upper surface of the zone of saturation called?",
            "options": ["Aquifer", "Aquiclude", "Water table", "Aquifuge"],
            "correctAnswer": "Water table"
        },
        {
            "question": "How many primary pollutants are there?",
            "options": ["Three", "Five", "Seven", "Nine"],
            "correctAnswer": "Five"
        },
        {
            "question": "The term ‘Municipal Solid Waste’ is used to describe which kind of solid waste?",
            "options": ["Hazardous", "Toxic", "Non-hazardous", "Non-toxic"],
            "correctAnswer": "Non-hazardous"
        },
        {
            "question": "Open cycle OTEC uses surface water directly to make electricity.",
            "options": ["Hot", "Warm", "Cool", "Icy"],
            "correctAnswer": "Warm"
        },
        {
            "question": "What does OTEC stand for?",
            "options": ["Ocean thermal energy cultivation", "Ocean thermal energy conversion", "Ocean techno energy conservation", "Ocean thermal energy consumption"],
            "correctAnswer": "Ocean thermal energy conversion"
        },
        {
            "question": "Which type of turbine can be mounted both vertically and horizontally?",
            "options": ["Pelton wheel", "Kaplan turbine", "Gorlov turbine", "Francis turbine"],
            "correctAnswer": "Gorlov turbine"
        },
        {
            "question": "What type of energy is wind energy?",
            "options": ["Renewable energy", "Non-renewable energy", "Conventional energy", "Commercial energy"],
            "correctAnswer": "Renewable energy"
        },
        {
            "question": "Tsunami detectors are placed in the sea at how many kilometers from shore?",
            "options": ["25", "100", "50", "85"],
            "correctAnswer": "50"
        },
        {
            "question": "What makes desert regions highly unproductive?",
            "options": ["Salinity", "Sunlight", "Temperature", "Increase in rain"],
            "correctAnswer": "Salinity"
        },
        {
            "question": "How can desert ecosystems be conserved?",
            "options": ["By minimizing human activity", "By pouring water into the desert area", "By deforestation", "By killing organisms"],
            "correctAnswer": "By minimizing human activity"
        },
        {
            "question": "How does the tropical rainforest get its name?",
            "options": ["Due to less rain", "Due to heavy rain", "Due to moderate rain", "Due to no rain required"],
            "correctAnswer": "Due to heavy rain"
        },
        {
            "question": "How can we control acid rain caused by the exhaust fumes from cars?",
            "options": ["By burning more fuels", "By using old engine vehicles", "By using ignition", "By using catalytic converters"],
            "correctAnswer": "By using catalytic converters"
        },
        {
            "question": "Which is the most acidic in the pH scale?",
            "options": ["0", "7", "10", "14"],
            "correctAnswer": "0"
        },
        {
            "question": "Which hazardous pollutant is commonly found in e-waste?",
            "options": ["Mercury", "Methane", "Sulfur dioxide", "Carbon monoxide"],
            "correctAnswer": "Mercury"
        },
        {
            "question": "Which of the following is a basic principle of e-waste management?",
            "options": ["Open burning of e-waste", "Extended Producer Responsibility (EPR)", "Dumping in water bodies", "Burying without treatment"],
            "correctAnswer": "Extended Producer Responsibility (EPR)"
        },
        {
            "question": "The E-Waste (Management) Rules, 2022, introduced stricter guidelines on:",
            "options": ["Banning e-waste recycling", "EPR targets for producers", "Eliminating e-waste management entirely", "Exporting all e-waste overseas"],
            "correctAnswer": "EPR targets for producers"
        },
        {
            "question": "What is the primary aim of the E-Waste (Management) Rules, 2022?",
            "options": ["Promote informal recycling of e-waste", "Encourage scientific and safe disposal of e-waste", "Increase landfilling of e-waste", "Restrict the use of recycled components"],
            "correctAnswer": "Encourage scientific and safe disposal of e-waste"
        },
        {
            "question": "According to the E-Waste (Management and Handling) Rules, 2011, who is primarily responsible for the collection of e-waste?",
            "options": ["Municipal corporations", "Producers and manufacturers", "Consumers", "Educational institutions"],
            "correctAnswer": "Producers and manufacturers"
        },
        {
            "question": "Which of the following environmental issues is caused by improper e-waste disposal?",
            "options": ["Ozone depletion", "Soil and groundwater contamination", "Desertification", "Ocean acidification"],
            "correctAnswer": "Soil and groundwater contamination"
        },
        {
            "question": "Which of the following devices contributes the most to global e-waste generation?",
            "options": ["Refrigerators", "Mobile phones and computers", "Solar panels", "Wind turbines"],
            "correctAnswer": "Mobile phones and computers"
        },
        {
            "question": "Which toxic substance in e-waste is known to cause kidney damage when improperly disposed of?",
            "options": ["Cadmium", "Carbon dioxide", "Nitrogen", "Phosphorus"],
            "correctAnswer": "Cadmium"
        }


    ]


}

    };

   
    const [user, setUser] = useState(null);
    const [selectedTest, setSelectedTest] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [questionsList, setQuestionsList] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [timer, setTimer] = useState(600); // 10 minutes timer
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser ? currentUser : null);
        });
        return () => unsubscribe();
    }, []);

    const handleTestSelection = (test) => {
        setSelectedTest(test);
        setSelectedDifficulty(null);
        setQuestionsList([]);
        setScore(null);
        setTimer(600);
    };

    const handleDifficultySelection = (difficulty) => {
        setSelectedDifficulty(difficulty);
        setQuestionsList(questions[selectedTest]?.[difficulty] || []);
    };

    const handleOptionChange = (questionIndex, selectedOption) => {
        setAnswers((prevAnswers) => ({ ...prevAnswers, [questionIndex]: selectedOption }));
    };

    const calculateScore = () => {
        let totalScore = 0, attendedQuestions = 0;
        questionsList.forEach((q, index) => {
            if (answers[index] !== undefined) {
                attendedQuestions++;
                if (answers[index] === q.correctAnswer) totalScore++;
            }
        });
    
        const percentage = attendedQuestions ? (totalScore / attendedQuestions) * 100 : 0;
    
        setScore({
            totalScore,
            attendedQuestions,
            totalQuestions: questionsList.length,
            percentage
        });
        setIsSubmitting(true);
    
        // Congratulatory message for EVS MCQ test if score is greater than 45%
        if (selectedTest === 'EVS MCQ' && percentage > 45) {
            alert("Congratulations! You passed the exam. To score more, study our question bank and answers more.");
        }
    
        if (user) {
            push(ref(database, `users/${user.uid}/testResults`), {
                test: selectedTest, difficulty: selectedDifficulty,
                score: totalScore, attendedQuestions, totalQuestions: questionsList.length,
                percentage: percentage.toFixed(2), timestamp: new Date().toISOString()
            });
        }
    };
    
    useEffect(() => {
        if (timer > 0 && !isSubmitting) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer, isSubmitting]);

    return (
        <div className="test-page-container">
            <header className="test-page-header">
                <h1>MCQ Quiz</h1>
            </header>

            {!selectedTest && (
                <section className="test-selection11">
                    <h2>Select a Test</h2>
                    {testOptions.map((test, index) => (
                        <button key={index} onClick={() => handleTestSelection(test)}>{test}</button>
                    ))}
                </section>
            )}

            {selectedTest && selectedTest !== 'EVS MCQ' && !selectedDifficulty && (
                <section className="difficulty-selection11">
                    <h2>Select Difficulty Level</h2>
                    {difficultyLevels.map((level, index) => (
                        <button key={index} onClick={() => handleDifficultySelection(level)}>{level}</button>
                    ))}
                </section>
            )}

            {selectedTest === 'EVS MCQ' && !selectedDifficulty && (
                <section className="difficulty-selection">
                    <h2>Select a Module</h2>
                    {Object.keys(questions['EVS MCQ']).map((module, index) => (
                        <button key={index} onClick={() => handleDifficultySelection(module)}>{module}</button>
                    ))}
                </section>
            )}

            {selectedTest && selectedDifficulty && (
                <section className="test-questions">
                    <h2>{selectedTest} - {selectedDifficulty}</h2>
                    {questionsList.map((q, index) => (
                        <div key={index} className="question-box">
                            <p>{q.question}</p>
                            {q.options.map((option, idx) => {
                                let optionClass = '';
                                if (isSubmitting) {
                                    if (answers[index] === option && option === q.correctAnswer) {
                                        optionClass = 'correct';
                                    } else if (answers[index] === option && option !== q.correctAnswer) {
                                        optionClass = 'incorrect';
                                    } else if (option === q.correctAnswer) {
                                        optionClass = 'correct';
                                    } else {
                                        optionClass = 'unselected';
                                    }
                                }
                                return (
                                    <label key={idx} className={optionClass}>
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={option}
                                            onChange={() => handleOptionChange(index, option)}
                                            disabled={isSubmitting}
                                        />
                                        {option}
                                    </label>
                                );
                            })}
                        </div>
                    ))}
                </section>
            )}

            {selectedTest && selectedDifficulty && !isSubmitting && (
                <button onClick={calculateScore} className="submit-button11">Submit Test</button>
            )}

            {isSubmitting && score !== null && (
                <section className="score-display11">
                    <h2>Your Score: {score.totalScore} / {score.totalQuestions}</h2>
                    <p>Attended Questions: {score.attendedQuestions}</p>
                    <p>Percentage: {score.percentage}%</p>
                </section>
            )}
        </div>
    );
};


export default TestPage;