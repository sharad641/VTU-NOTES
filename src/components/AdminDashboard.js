import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../firebase";
import { ref, onValue, remove, push, update, increment } from "firebase/database";
import emailjs from "emailjs-com";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import {
  FaBars, FaChartLine, FaEnvelope, FaComments, FaUsers, FaUserShield, FaSignOutAlt, FaCheckCircle
} from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("analytics");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [analyticsData, setAnalyticsData] = useState({});
  const [projects, setProjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [authUsers, setAuthUsers] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleLogout = async () => {
    try { await auth.signOut(); navigate("/login"); } 
    catch (err) { console.error(err); }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (window.innerWidth <= 768) setSidebarOpen(false);
  };

  // --- Fetch Analytics ---
  useEffect(() => {
    const analyticsRef = ref(database, "analytics");
    const unsub = onValue(analyticsRef, snap => {
      setAnalyticsData(snap.val() || {});
      setLoading(false);
    });
    update(analyticsRef, { totalPageViews: increment(1) }).catch(console.error);
    return () => unsub();
  }, []);

  // --- Fetch Projects (Nested Structure) ---
  useEffect(() => {
    const refProjects = ref(database, "project_enquiries");
    const unsub = onValue(refProjects, snap => {
      const data = snap.val() || {};
      const allProjects = [];
      Object.entries(data).forEach(([userId, userProjects]) => {
        Object.entries(userProjects).forEach(([projId, proj]) => {
          allProjects.push({ userId, projId, ...proj });
        });
      });
      allProjects.sort((a, b) => b.timestamp - a.timestamp);
      setProjects(allProjects);
    });
    return () => unsub();
  }, []);

  // --- Fetch Reviews ---
  useEffect(() => {
    const refReviews = ref(database, "project_reviews");
    const unsub = onValue(refReviews, snap => {
      setReviews(Object.entries(snap.val() || {}).map(([id, review]) => ({ id, ...review })).reverse());
    });
    return () => unsub();
  }, []);

  // --- Fetch Contacts ---
  useEffect(() => {
    const refContacts = ref(database, "contacts");
    const unsub = onValue(refContacts, snap => {
      setContacts(Object.entries(snap.val() || {}).map(([id, c]) => ({ id, ...c }))
        .sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)));
    });
    return () => unsub();
  }, []);

  // --- Fetch Comments ---
  useEffect(() => {
    const refComments = ref(database, "comments");
    const unsub = onValue(refComments, snap => {
      setComments(Object.entries(snap.val() || {}).map(([id, c]) => ({ id, ...c }))
        .sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)));
    });
    return () => unsub();
  }, []);

  // --- Fetch DB Users ---
  useEffect(() => {
    const refUsers = ref(database, "users");
    const unsub = onValue(refUsers, snap => {
      setUsers(Object.entries(snap.val() || {}).map(([id, u]) => ({ id, ...u })));
    });
    return () => unsub();
  }, []);

  // --- Fetch Auth Users ---
  useEffect(() => {
    const fetchAuthUsers = async () => {
      try {
        if (!auth.currentUser) return;
        const token = await auth.currentUser.getIdToken(true);
        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/projects/vtu-notes-e1d8d/accounts:lookup?key=YOUR_FIREBASE_WEB_API_KEY`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: token }),
          }
        );
        const data = await res.json();
        setAuthUsers(data.users || []);
      } catch (err) { console.error(err); }
    };
    fetchAuthUsers();
  }, []);

  // --- Delete ---
  const handleDelete = (path, id, userId=null) => {
    const dbPath = userId ? `${path}/${userId}/${id}` : `${path}/${id}`;
    remove(ref(database, dbPath)).catch(console.error);
  };

  // --- Reply ---
  const handleReply = async (item, type) => {
    if (!replyText.trim()) return alert("Reply cannot be empty!");
    try {
      await push(ref(database, `${type}/${item.id}/replies`), {
        reply: replyText,
        timestamp: new Date().toISOString(),
        admin: "Admin",
      });
      if (type === "contacts") {
        await emailjs.send("service_j5pkcea", "template_i7qypwb", {
          to_name: item.name,
          email: item.email,
          reply_message: replyText,
          message: item.message
        }, "YURLptuFopnO6loVO");
      }
      alert("Reply sent!");
      setReplyingTo(null);
      setReplyText("");
    } catch (err) { console.error(err); alert("Failed to send reply."); }
  };

  // --- Analytics Chart Data ---
  const chartData = analyticsData.visits ? Object.entries(analyticsData.visits).map(([date,v]) => ({ date, visits:v })) : [];

  // --- Toggle Project Steps ---
  const toggleStep = (userId, projId, step) => {
    const project = projects.find(p => p.userId===userId && p.projId===projId);
    if (!project) return;
    const newSteps = { ...project.steps };
    if (step === "step1") { newSteps.step1=true; newSteps.step2=false; newSteps.step3=false; }
    if (step === "step2") { newSteps.step1=true; newSteps.step2=true; newSteps.step3=false; }
    if (step === "step3") { newSteps.step1=true; newSteps.step2=true; newSteps.step3=true; }
    update(ref(database, `project_enquiries/${userId}/${projId}/steps`), newSteps).catch(console.error);
  };

  // --- Card Component ---
  const Card = ({ title, children }) => (
    <div className="admin-card">
      <h3>{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="dashboard-layout">
      <button className="hamburger" onClick={()=>setSidebarOpen(!sidebarOpen)}><FaBars size={24}/></button>
      <aside className={`sidebar ${sidebarOpen?"open":""}`}>
        <h2>Admin Panel</h2>
        <nav>
          <button className={activeTab==="analytics"?"active":""} onClick={()=>handleTabChange("analytics")}><FaChartLine/> Analytics</button>
          <button className={activeTab==="projects"?"active":""} onClick={()=>handleTabChange("projects")}>📝 Projects</button>
          <button className={activeTab==="reviews"?"active":""} onClick={()=>handleTabChange("reviews")}>⭐ Reviews</button>
          <button className={activeTab==="contacts"?"active":""} onClick={()=>handleTabChange("contacts")}><FaEnvelope/> Contacts</button>
          <button className={activeTab==="comments"?"active":""} onClick={()=>handleTabChange("comments")}><FaComments/> Comments</button>
          <button className={activeTab==="users"?"active":""} onClick={()=>handleTabChange("users")}><FaUsers/> DB Users</button>
          <button className={activeTab==="authusers"?"active":""} onClick={()=>handleTabChange("authusers")}><FaUserShield/> Auth Users</button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}><FaSignOutAlt/> Logout</button>
      </aside>

      <main className="dashboard-content">
        {/* --- Analytics Tab --- */}
        {activeTab==="analytics" && (
          <Card title="📊 Analytics Overview">
            {loading ? <p>Loading...</p> :
              <>
                <div className="analytics-stats">
                  <div><strong>{analyticsData.totalUsers||0}</strong><div>Total Users</div></div>
                  <div><strong>{analyticsData.totalPageViews||0}</strong><div>Page Views</div></div>
                </div>
                {chartData.length>0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" /><YAxis /><Tooltip />
                      <Line type="monotone" dataKey="visits" stroke="#007bff" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : <p>No visit data</p>}
              </>
            }
          </Card>
        )}

        {/* --- Projects Tab --- */}
        {activeTab==="projects" && (
          <Card title="📝 Project Enquiries">
            {projects.length===0 ? <p>No projects submitted.</p> :
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th><th>Email</th><th>Type</th><th>Message</th><th>Steps</th><th>Timestamp</th><th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map(p => (
                      <tr key={p.projId}>
                        <td>{p.name}</td>
                        <td>{p.email}</td>
                        <td>{p.projectType}</td>
                        <td>{p.message}</td>
                        <td>
                          {["step1","step2","step3"].map((s,i)=>(
                            <span key={s} style={{cursor:"pointer",color:p.steps?.[s]?"green":"gray",marginRight:"5px"}}
                              onClick={()=>toggleStep(p.userId,p.projId,s)}>
                              {p.steps?.[s] ? <FaCheckCircle /> : i+1}
                            </span>
                          ))}
                        </td>
                        <td>{new Date(p.timestamp).toLocaleString()}</td>
                        <td><button onClick={()=>handleDelete("project_enquiries",p.projId,p.userId)}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
          </Card>
        )}
{/* --- Reviews Tab --- */}
{activeTab==="reviews" && (
  <Card title="⭐ Project Reviews">
    {reviews.length===0 ? <p>No reviews yet.</p> :
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Project</th>
              <th>Review</th>
              <th>Rating</th>
              <th>Timestamp</th>
              <th>Action</th> {/* Added Action column */}
            </tr>
          </thead>
          <tbody>
            {reviews.map(r => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.project}</td>
                <td>{r.review}</td>
                <td>{r.rating}</td>
                <td>{new Date(r.timestamp).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDelete("project_reviews", r.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    }
  </Card>
)}


        {activeTab==="contacts" && (
          <Card title="📩 Contacts">
            {contacts.length===0 ? <p>No messages.</p> :
              <div className="table-responsive">
                <table>
                  <thead><tr><th>Name</th><th>Email</th><th>Message</th><th>Reply</th><th>Action</th></tr></thead>
                  <tbody>{contacts.map(c => <tr key={c.id}>
                    <td>{c.name}</td><td>{c.email}</td><td>{c.message}</td>
                    <td>{replyingTo===c.id ?
                      <div className="reply-box">
                        <input value={replyText} onChange={e=>setReplyText(e.target.value)} placeholder="Reply..." />
                        <button onClick={()=>handleReply(c,"contacts")}>Send</button>
                        <button onClick={()=>setReplyingTo(null)}>Cancel</button>
                      </div> :
                      <button onClick={()=>setReplyingTo(c.id)}>Reply</button>
                    }</td>
                    <td><button onClick={()=>handleDelete("contacts",c.id)}>Delete</button></td>
                  </tr>)}</tbody>
                </table>
              </div>
            }
          </Card>
        )}

        {activeTab==="comments" && (
          <Card title="💬 Comments">
            {comments.length===0 ? <p>No comments.</p> :
              <div className="table-responsive">
                <table>
                  <thead><tr><th>User</th><th>Comment</th><th>Timestamp</th><th>Reply</th><th>Action</th></tr></thead>
                  <tbody>{comments.map(c => <tr key={c.id}>
                    <td>{c.user||"Anonymous"}</td><td>{c.text||c.message}</td>
                    <td>{new Date(c.timestamp).toLocaleString()}</td>
                    <td>{replyingTo===c.id ?
                      <div className="reply-box">
                        <input value={replyText} onChange={e=>setReplyText(e.target.value)} placeholder="Reply..." />
                        <button onClick={()=>handleReply(c,"comments")}>Send</button>
                        <button onClick={()=>setReplyingTo(null)}>Cancel</button>
                      </div> :
                      <button onClick={()=>setReplyingTo(c.id)}>Reply</button>
                    }</td>
                    <td><button onClick={()=>handleDelete("comments",c.id)}>Delete</button></td>
                  </tr>)}</tbody>
                </table>
              </div>
            }
          </Card>
        )}

        {activeTab==="users" && (
          <Card title="👥 DB Users">
            {users.length===0 ? <p>No users.</p> :
              <div className="table-responsive">
                <table>
                  <thead><tr><th>Name</th><th>Email</th><th>Action</th></tr></thead>
                  <tbody>{users.map(u => <tr key={u.id}>
                    <td>{u.name||"N/A"}</td><td>{u.email||"N/A"}</td>
                    <td><button onClick={()=>handleDelete("users",u.id)}>Delete</button></td>
                  </tr>)}</tbody>
                </table>
              </div>
            }
          </Card>
        )}

        {activeTab==="authusers" && (
          <Card title="🔐 Auth Users">
            {authUsers.length===0 ? <p>No auth users.</p> :
              <div className="table-responsive">
                <table>
                  <thead><tr><th>Email</th><th>UID</th><th>Provider</th><th>Created</th><th>Last Login</th></tr></thead>
                  <tbody>{authUsers.map(u => <tr key={u.localId}>
                    <td>{u.email}</td><td>{u.localId}</td><td>{u.providerUserInfo?.[0]?.providerId||"password"}</td>
                    <td>{new Date(u.createdAt).toLocaleString()}</td>
                    <td>{new Date(u.lastLoginAt).toLocaleString()}</td>
                  </tr>)}</tbody>
                </table>
              </div>
            }
          </Card>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;
