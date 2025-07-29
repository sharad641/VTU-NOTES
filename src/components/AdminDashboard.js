import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../firebase";
import { ref, onValue } from "firebase/database";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [analyticsData, setAnalyticsData] = useState({
        totalUsers: 0,
        totalPageViews: 0,
        visits: {},
        topPages: {},
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Fetch analytics with live updates
    useEffect(() => {
        const analyticsRef = ref(database, "analytics");
        const unsubscribe = onValue(
            analyticsRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    setAnalyticsData(snapshot.val());
                } else {
                    setAnalyticsData({
                        totalUsers: 0,
                        totalPageViews: 0,
                        visits: {},
                        topPages: {},
                    });
                }
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching analytics:", error);
                setError("Failed to load analytics data.");
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    // Convert analytics data to chart format
    const chartData = analyticsData?.visits
        ? Object.entries(analyticsData.visits).map(([date, count]) => ({
              date,
              visits: count,
          }))
        : [];

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </header>

            <div className="admin-welcome">
                <h2>Welcome, Admin 👋</h2>
                <p>Here’s an overview of your website’s performance and management tools.</p>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="admin-cards-grid">
                {/* User Management */}
                <div className="admin-card">
                    <h3>👥 User Management</h3>
                    <p>View and manage registered users.</p>
                    <button className="action-btn">Manage Users</button>
                </div>

                {/* Content Management */}
                <div className="admin-card">
                    <h3>📂 Content Management</h3>
                    <p>Upload and update study notes, PDFs, and resources.</p>
                    <button className="action-btn">Manage Content</button>
                </div>

                {/* Analytics Section */}
                <div className="admin-card analytics-card">
                    <h3>📊 Analytics</h3>
                    {loading ? (
                        <p className="loading-text">Fetching analytics...</p>
                    ) : (
                        <div className="analytics-section">
                            {/* Stats */}
                            <div className="analytics-stats">
                                <div className="analytics-item">
                                    <strong>{analyticsData.totalUsers}</strong>
                                    <span>Total Users</span>
                                </div>
                                <div className="analytics-item">
                                    <strong>{analyticsData.totalPageViews}</strong>
                                    <span>Page Views</span>
                                </div>
                            </div>

                            {/* Chart for daily visits */}
                            {chartData.length > 0 && (
                                <div className="analytics-chart">
                                    <h4>Daily Visits</h4>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="visits" stroke="#4CAF50" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            )}

                            {/* Top pages */}
                            {analyticsData.topPages &&
                                Object.keys(analyticsData.topPages).length > 0 && (
                                    <div className="top-pages">
                                        <h4>Top Pages</h4>
                                        <ul>
                                            {Object.entries(analyticsData.topPages)
                                                .slice(0, 5)
                                                .map(([page, views], index) => (
                                                    <li key={index}>
                                                        <span>{page}</span>
                                                        <span>{views} views</span>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}
                        </div>
                    )}
                </div>

                {/* Settings */}
                <div className="admin-card">
                    <h3>⚙️ Settings</h3>
                    <p>Configure site preferences and admin options.</p>
                    <button className="action-btn">Site Settings</button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
