import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BranchSelection from './components/BranchSelection';
import Branch from './components/Branch';
import Subjects from './components/Subjects';
import ModuleDetail from './components/ModuleDetail';
import PdfViewer from './components/PdfViewer';
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
                        element={isAuthenticated ? <Branch /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/branch/:branch/:semester" 
                        element={isAuthenticated ? <Subjects /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/branch/:branch/:semester/modules/:subjectName" 
                        element={isAuthenticated ? <ModuleDetail /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/pdf/:pdfUrl" 
                        element={isAuthenticated ? <PdfViewer /> : <Navigate to="/login" />} 
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

                    {/* Catch-All Route */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
