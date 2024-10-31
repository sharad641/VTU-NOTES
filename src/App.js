// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';               // Scheme selection page
import BranchSelection from './components/BranchSelection'; // Branch selection page
import Branch from './components/Branch';           // Import Branch component
import Subjects from './components/Subjects';       // Subjects component
import ModuleDetail from './components/ModuleDetail'; // Import ModuleDetail component
import PdfViewer from './components/PdfViewer';     // Import PdfViewer component
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    {/* Protected Routes */}
                    <Route 
                        path="/" 
                        element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/branch-selection/:scheme" 
                        element={isAuthenticated ? <BranchSelection /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/branch/:branch" 
                        element={isAuthenticated ? <Branch /> : <Navigate to="/login" />} // Route for Branch
                    />
                    <Route 
                        path="/branch/:branch/:semester" 
                        element={isAuthenticated ? <Subjects /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/branch/:branch/:semester/modules/:subjectName" 
                        element={isAuthenticated ? <ModuleDetail /> : <Navigate to="/login" />} // Route for ModuleDetail
                    />
                    <Route 
                        path="/pdf/:pdfUrl" 
                        element={isAuthenticated ? <PdfViewer /> : <Navigate to="/login" />} // Route for PdfViewer
                    />
                    
                    {/* Authentication Routes */}
                    <Route 
                        path="/login" 
                        element={<Login setIsAuthenticated={setIsAuthenticated} />} 
                    />
                    <Route 
                        path="/signup" 
                        element={<Signup />} 
                    />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
