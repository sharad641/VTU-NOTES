import React, { useState, useEffect } from 'react';
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
import UploadForm from './components/UploadForm'; // Import the UploadForm component
import { auth } from './firebase'; // Import Firebase auth

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check user authentication state on mount
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user); // Set authentication state based on user
        });

        return () => unsubscribe(); // Clean up subscription on unmount
    }, []);

    // Protected route wrapper to reduce repetition
    const ProtectedRoute = ({ element }) => (
        isAuthenticated ? element : <Navigate to="/login" />
    );

    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    {/* Protected Routes */}
                    <Route path="/" element={<ProtectedRoute element={<Home />} />} />
                    <Route path="/branch-selection/:scheme" element={<ProtectedRoute element={<BranchSelection />} />} />
                    <Route path="/branch/:branch" element={<ProtectedRoute element={<Branch />} />} />
                    <Route path="/branch/:branch/:semester" element={<ProtectedRoute element={<Subjects />} />} />
                    <Route path="/branch/:branch/:semester/modules/:subjectName" element={<ProtectedRoute element={<ModuleDetail />} />} />
                    <Route path="/pdf/:pdfUrl" element={<ProtectedRoute element={<PdfViewer />} />} />
                    <Route path="/upload" element={<ProtectedRoute element={<UploadForm />} />} /> {/* New UploadForm route */}
                    
                    {/* Authentication Routes */}
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Catch-All Route */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
