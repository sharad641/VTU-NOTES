import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../firebase";
import { ref, onValue, update, increment, remove, push } from "firebase/database";
import emailjs from "emailjs-com";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  FaBars,
  FaChartLine,
  FaEnvelope,
  FaComments,
  FaUsers,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("analytics");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    totalUsers: 0,
    totalPageViews: 0,
    visits: {},
    topPages: {},
    signupsPerDay: {},
  });
  const [contacts, setContacts] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [authUsers, setAuthUsers] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(true);

  // Logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (window.innerWidth <= 768) setSidebarOpen(false);
  };

  // Fetch analytics
  useEffect(() => {
    const analyticsRef = ref(database, "analytics");
    const unsub = onValue(analyticsRef, (snap) => {
      const d = snap.val() || {};
      setAnalyticsData({
        totalUsers: d.totalUsers || 0,
        totalPageViews: d.totalPageViews || 0,
        visits: d.visits || {},
        topPages: d.topPages || {},
        signupsPerDay: d.signupsPerDay || {},
      });
      setLoading(false);
    });
    update(analyticsRef, { totalPageViews: increment(1) }).catch(console.error);
    return () => unsub();
  }, []);

  // Fetch contacts
  useEffect(() => {
    const unsub = onValue(ref(database, "contacts"), (snap) => {
      const data = snap.val() || {};
      const sorted = Object.entries(data)
        .map(([id, msg]) => ({ id, ...msg }))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setContacts(sorted);
    });
    return () => unsub();
  }, []);

  // Fetch comments
  useEffect(() => {
    const unsub = onValue(ref(database, "comments"), (snap) => {
      const data = snap.val() || {};
      const sorted = Object.entries(data)
        .map(([id, c]) => ({ id, ...c }))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setComments(sorted);
    });
    return () => unsub();
  }, []);

  // Fetch DB users
  useEffect(() => {
    const unsub = onValue(ref(database, "users"), (snap) => {
      const data = snap.val() || {};
      const list = Object.entries(data).map(([id, u]) => ({ id, ...u }));
      setUsers(list);
    });
    return () => unsub();
  }, []);

  // Fetch Firebase Auth users
  useEffect(() => {
    const fetchAuthUsers = async () => {
      try {
        const token = await auth.currentUser.getIdToken(true);
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/projects/vtu-notes-e1d8d/accounts:lookup?key=YOUR_FIREBASE_WEB_API_KEY`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: token }),
          }
        );
        const data = await response.json();
        setAuthUsers(data.users || []);
      } catch (err) {
        console.error("Auth users fetch error:", err);
      }
    };
    fetchAuthUsers();
  }, []);

  // Delete handler
  const handleDelete = (path, id) => {
    remove(ref(database, `${path}/${id}`)).catch((err) =>
      console.error("Delete error:", err)
    );
  };

  // Reply to contact (Email + DB)
  const handleReply = async (contact) => {
    if (!replyText.trim()) return alert("Reply cannot be empty!");
    try {
      await push(ref(database, `contacts/${contact.id}/replies`), {
        reply: replyText,
        timestamp: new Date().toISOString(),
        admin: "Admin",
      });
      await emailjs.send(
        "service_j5pkcea",
        "template_i7qypwb",
        {
          to_name: contact.name,
          email: contact.email,
          reply_message: replyText,
          message: contact.message,
        },
        "YURLptuFopnO6loVO"
      );
      alert("Reply sent & emailed successfully!");
      setReplyingTo(null);
      setReplyText("");
    } catch (err) {
      console.error("Reply error:", err);
      alert("Failed to send reply.");
    }
  };

  // Reply to comment
  const handleCommentReply = async (comment) => {
    if (!replyText.trim()) return alert("Reply cannot be empty!");
    try {
      await push(ref(database, `comments/${comment.id}/replies`), {
        reply: replyText,
        timestamp: new Date().toISOString(),
        admin: "Admin",
      });
      alert("Reply added!");
      setReplyingTo(null);
      setReplyText("");
    } catch (err) {
      console.error("Comment reply error:", err);
      alert("Failed to add reply.");
    }
  };

  // Chart data
  const chartData = Object.entries(analyticsData.visits).map(([date, visits]) => ({ date, visits }));
  const signupChartData = Object.entries(analyticsData.signupsPerDay).map(([date, signups]) => ({ date, signups }));

  // Sections
  const renderAnalytics = () => (
    <div className="admin-card">
      <h3>📊 Analytics Overview</h3>
      {loading ? <p>Loading analytics...</p> : (
        <>
          <div className="analytics-stats">
            <div><strong>{analyticsData.totalUsers}</strong><div>Total Users</div></div>
            <div><strong>{analyticsData.totalPageViews}</strong><div>Page Views</div></div>
            <div><strong>{(analyticsData.totalPageViews / (analyticsData.totalUsers || 1)).toFixed(1)}</strong><div>Avg Views/User</div></div>
          </div>
          <h4>Daily Visits</h4>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" /><YAxis /><Tooltip />
                <Line type="monotone" dataKey="visits" stroke="#007bff" />
              </LineChart>
            </ResponsiveContainer>
          ) : <p>No visit data available.</p>}
          <h4>New Signups Per Day</h4>
          {signupChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={signupChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" /><YAxis /><Tooltip />
                <Line type="monotone" dataKey="signups" stroke="#7c3aed" />
              </LineChart>
            </ResponsiveContainer>
          ) : <p>No signup data available.</p>}
          <h4>Top Pages</h4>
          <ul>
            {Object.entries(analyticsData.topPages)
              .sort((a, b) => b[1] - a[1])
              .map(([page, count]) => <li key={page}>{page}: {count} views</li>)}
          </ul>
        </>
      )}
    </div>
  );

  const renderContacts = () => (
    <div className="admin-card">
      <h3>📩 Contact Messages</h3>
      {contacts.length === 0 ? <p>No contact messages yet.</p> : (
        <div className="table-container">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Message</th><th>Reply</th><th>Action</th></tr></thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td><td>{contact.email}</td><td>{contact.message}</td>
                  <td>
                    {replyingTo === contact.id ? (
                      <div className="reply-box">
                        <input type="text" placeholder="Type reply..." value={replyText} onChange={(e) => setReplyText(e.target.value)} />
                        <button className="save-btn" onClick={() => handleReply(contact)}>Send</button>
                        <button className="cancel-btn" onClick={() => setReplyingTo(null)}>Cancel</button>
                      </div>
                    ) : <button className="reply-btn" onClick={() => setReplyingTo(contact.id)}>Reply</button>}
                  </td>
                  <td><button className="delete-btn" onClick={() => handleDelete("contacts", contact.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderComments = () => (
    <div className="admin-card">
      <h3>💬 User Comments</h3>
      {comments.length === 0 ? <p>No comments yet.</p> : (
        <div className="table-container">
          <table>
            <thead><tr><th>User</th><th>Comment</th><th>When</th><th>Reply</th><th>Action</th></tr></thead>
            <tbody>
              {comments.map(({ id, user, text, message, timestamp }) => (
                <tr key={id}>
                  <td>{user || "Anonymous"}</td>
                  <td>{text || message}</td>
                  <td>{new Date(timestamp).toLocaleString("en-IN", { hour12: true })}</td>
                  <td>
                    {replyingTo === id ? (
                      <div className="reply-box">
                        <input type="text" placeholder="Type reply..." value={replyText} onChange={(e) => setReplyText(e.target.value)} />
                        <button className="save-btn" onClick={() => handleCommentReply({ id })}>Send</button>
                        <button className="cancel-btn" onClick={() => setReplyingTo(null)}>Cancel</button>
                      </div>
                    ) : <button className="reply-btn" onClick={() => setReplyingTo(id)}>Reply</button>}
                  </td>
                  <td><button className="delete-btn" onClick={() => handleDelete("comments", id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderUsers = () => (
    <div className="admin-card">
      <h3>👥 Realtime DB Users</h3>
      {users.length === 0 ? <p>No users yet.</p> : (
        <div className="table-container">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Action</th></tr></thead>
            <tbody>
              {users.map(({ id, name, email }) => (
                <tr key={id}>
                  <td>{name || "N/A"}</td><td>{email || "N/A"}</td>
                  <td><button className="delete-btn" onClick={() => handleDelete("users", id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderAuthUsers = () => (
    <div className="admin-card">
      <h3>🔐 Firebase Auth Users</h3>
      {authUsers.length === 0 ? <p>No auth users found.</p> : (
        <div className="table-container">
          <table>
            <thead><tr><th>Email</th><th>UID</th><th>Provider</th><th>Created</th><th>Last Sign-in</th></tr></thead>
            <tbody>
              {authUsers.map((u) => (
                <tr key={u.localId}>
                  <td>{u.email}</td><td>{u.localId}</td>
                  <td>{u.providerUserInfo?.[0]?.providerId || "password"}</td>
                  <td>{new Date(u.createdAt).toLocaleString()}</td>
                  <td>{new Date(u.lastLoginAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="dashboard-layout">
      {/* Hamburger for mobile */}
      <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>Admin Panel</h2>
        <nav>
          <button className={activeTab === "analytics" ? "active" : ""} onClick={() => handleTabChange("analytics")}>
            <FaChartLine /> Analytics
          </button>
          <button className={activeTab === "contacts" ? "active" : ""} onClick={() => handleTabChange("contacts")}>
            <FaEnvelope /> Contacts
          </button>
          <button className={activeTab === "comments" ? "active" : ""} onClick={() => handleTabChange("comments")}>
            <FaComments /> Comments
          </button>
          <button className={activeTab === "users" ? "active" : ""} onClick={() => handleTabChange("users")}>
            <FaUsers /> DB Users
          </button>
          <button className={activeTab === "authusers" ? "active" : ""} onClick={() => handleTabChange("authusers")}>
            <FaUserShield /> Auth Users
          </button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      <main className="dashboard-content">
        {activeTab === "analytics" && renderAnalytics()}
        {activeTab === "contacts" && renderContacts()}
        {activeTab === "comments" && renderComments()}
        {activeTab === "users" && renderUsers()}
        {activeTab === "authusers" && renderAuthUsers()}
      </main>
    </div>
  );
};

export default AdminDashboard;
