// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Branch from './components/Branch';
import Subjects from './components/Subjects';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    {/* Protected Routes */}
                    <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/branch/:branch" element={isAuthenticated ? <Branch /> : <Navigate to="/login" />} />
                    <Route path="/branch/:branch/:semester" element={isAuthenticated ? <Subjects /> : <Navigate to="/login" />} />
                    
                    {/* Authentication Routes */}
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
