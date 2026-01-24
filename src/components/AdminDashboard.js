import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../firebase";
import { ref, onValue, remove, push, update } from "firebase/database";
import emailjs from "emailjs-com";
import {
  FaBars, FaEnvelope, FaComments, FaSignOutAlt, FaCheckCircle,
  FaTrash, FaReply, FaSearch, FaFilter, FaBell, FaUserCircle,
  FaProjectDiagram, FaStar, FaTimes, FaMoon, FaSun, FaSpinner,
  FaChevronLeft, FaChevronRight, FaHome, FaHistory, FaBriefcase, FaBuilding,
  FaHeart
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import "./AdminModern.css"; // CHANGED: Modern CSS

const StatCard = ({ icon, title, value, color, onClick, active, trend }) => (
  <div
    className={`a-stat-card ${active ? 'active' : ''}`}
    onClick={onClick}
  >
    <div className="a-stat-icon" style={{ background: color }}>
      {icon}
    </div>
    <span className="a-stat-val">{value}</span>
    <span className="a-stat-label">{title}</span>
    {trend && <span style={{ position: 'absolute', top: '24px', right: '24px', color: '#10B981', fontSize: '0.85rem', fontWeight: '600' }}>{trend}</span>}
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();

  // UI State
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Data State
  const [data, setData] = useState({
    projects: [],
    reviews: [],
    placementReviews: [],
    contacts: [],
    comments: [],
    donations: []
  });

  // Action State
  const [searchQuery, setSearchQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [showManualSync, setShowManualSync] = useState(false);
  const [manualDonor, setManualDonor] = useState({ name: "", amount: "", paymentId: "", mobile: "" });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // --- Effects ---
  useEffect(() => {
    setIsLoading(true);
    const refs = {
      projects: ref(database, "project_enquiries"),
      reviews: ref(database, "project_reviews"),
      placementReviews: ref(database, "placement_reviews"),
      contacts: ref(database, "contacts"),
      comments: ref(database, "comments"),
      donations: ref(database, "donations")
    };

    const listeners = [];
    const fetchData = (key) => onValue(refs[key], (snap) => {
      const raw = snap.val() || {};
      let processed = [];
      if (key === 'projects') {
        Object.entries(raw).forEach(([userId, userProjs]) => {
          Object.entries(userProjs).forEach(([id, proj]) => {
            processed.push({
              userId, id, ...proj,
              status: proj.steps?.step3 ? 'Completed' : proj.steps?.step2 ? 'In Progress' : 'New'
            });
          });
        });
      } else {
        processed = Object.entries(raw).map(([id, val]) => ({ id, ...val }));
      }
      setData(prev => ({ ...prev, [key]: processed }));
    });

    Object.keys(refs).forEach(key => listeners.push(fetchData(key)));
    setTimeout(() => setIsLoading(false), 1000);

    return () => listeners.forEach(unsub => unsub());
  }, []);

  // --- Actions ---
  const showNotification = (msg, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [{ id, msg, type }, ...prev]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  const handleDelete = async (collection, id, userId = null) => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;
    const path = userId ? `${collection}/${userId}/${id}` : `${collection}/${id}`;
    try {
      await remove(ref(database, path));
      showNotification("Deleted successfully", "success");
    } catch (e) { showNotification("Delete failed", "error"); }
  };

  const handleReply = async (item, collection) => {
    if (!replyText.trim()) return showNotification("Message is empty", "error");
    try {
      await push(ref(database, `${collection}/${item.id}/replies`), {
        reply: replyText,
        timestamp: new Date().toISOString(),
        adminEmail: auth.currentUser?.email
      });
      if (collection === 'contacts') {
        await emailjs.send("service_j5pkcea", "template_i7qypwb", {
          to_name: item.name, email: item.email, reply_message: replyText
        }, "YURLptuFopnO6loVO");
      }
      setReplyingTo(null); setReplyText("");
      showNotification("Reply sent successfully", "success");
    } catch (e) { showNotification("Failed to send reply", "error"); }
  };

  const toggleProjectStep = (userId, projId, step, currentSteps) => {
    const newSteps = { ...currentSteps };
    if (step === "step1") { newSteps.step1 = true; newSteps.step2 = false; newSteps.step3 = false; }
    if (step === "step2") { newSteps.step1 = true; newSteps.step2 = true; newSteps.step3 = false; }
    if (step === "step3") { newSteps.step1 = true; newSteps.step2 = true; newSteps.step3 = true; }
    update(ref(database, `project_enquiries/${userId}/${projId}/steps`), newSteps);
  };

  // --- Logic ---
  const processedData = useMemo(() => {
    if (activeTab === 'overview') return [];

    // Select data source based on tab
    let list = activeTab === 'placements' ? data.placementReviews : (data[activeTab] || []);

    if (activeTab === 'projects' && projectFilter !== 'all') {
      list = list.filter(i => i.status === projectFilter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(item => Object.values(item).some(val => String(val).toLowerCase().includes(q)));
    }
    // Sort by timestamp desc
    return list.sort((a, b) => new Date(b.timestamp || b.createdAt) - new Date(a.timestamp || a.createdAt));
  }, [data, activeTab, projectFilter, searchQuery]);

  const paginatedData = processedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(processedData.length / itemsPerPage);

  const formatDate = (iso) => {
    if (!iso) return "-";
    const date = new Date(iso);
    return isNaN(date.getTime()) ? "-" : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' });
  };

  return (
    <div className="admin-container-modern">

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-brand">
          <FaUserCircle className="brand-icon" /> Admin<span style={{ color: 'white' }}>Portal</span>
        </div>

        <nav className="admin-nav">
          <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <FaHome /> Dashboard
          </button>

          <button className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => { setActiveTab('projects'); setCurrentPage(1); }}>
            <FaProjectDiagram /> Projects <span className="nav-badge">{data.projects.length}</span>
          </button>

          <button className={`nav-item ${activeTab === 'placements' ? 'active' : ''}`} onClick={() => { setActiveTab('placements'); setCurrentPage(1); }}>
            <FaBriefcase /> Placements <span className="nav-badge">{data.placementReviews.length}</span>
          </button>

          <button className={`nav-item ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => { setActiveTab('reviews'); setCurrentPage(1); }}>
            <FaStar /> Proj. Reviews <span className="nav-badge">{data.reviews.length}</span>
          </button>

          <button className={`nav-item ${activeTab === 'contacts' ? 'active' : ''}`} onClick={() => { setActiveTab('contacts'); setCurrentPage(1); }}>
            <FaEnvelope /> Messages <span className="nav-badge">{data.contacts.length}</span>
          </button>

          <button className={`nav-item ${activeTab === 'donations' ? 'active' : ''}`} onClick={() => { setActiveTab('donations'); setCurrentPage(1); }}>
            <FaHeart /> Donations <span className="nav-badge">{data.donations.length}</span>
          </button>
        </nav>

        <div className="admin-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }} onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden"><FaBars /></button>
            <div className="topbar-title">
              <h2>{activeTab === 'overview' ? 'Command Center' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
              <p>Welcome back, Admin</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}><FaBell style={{ fontSize: '1.2rem', color: '#94A3B8' }} /><span style={{ position: 'absolute', top: -5, right: -5, width: 10, height: 10, background: 'red', borderRadius: '50%' }}></span></div>
          </div>
        </header>

        {/* Stats Row */}
        <div className="admin-stats-row">
          <StatCard
            icon={<FaProjectDiagram />} title="Total Projects"
            value={data.projects.length} color="#6366f1" trend="+12%"
            active={activeTab === 'projects'} onClick={() => setActiveTab('projects')}
          />
          <StatCard
            icon={<FaBriefcase />} title="Placement Reviews"
            value={data.placementReviews.length} color="#0ea5e9" trend="+5%"
            active={activeTab === 'placements'} onClick={() => setActiveTab('placements')}
          />
          <StatCard
            icon={<FaStar />} title="Project Reviews"
            value={data.reviews.length} color="#f59e0b" trend="+8%"
            active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}
          />
          <StatCard
            icon={<FaEnvelope />} title="Messages"
            value={data.contacts.length} color="#10b981"
            active={activeTab === 'contacts'} onClick={() => setActiveTab('contacts')}
          />
          <StatCard
            icon={<FaHeart />} title="Total Support"
            value={`₹${data.donations.reduce((acc, curr) => acc + (parseInt(curr.amount) || 0), 0)}`} color="#ec4899"
            active={activeTab === 'donations'} onClick={() => setActiveTab('donations')}
          />
        </div>

        {/* Content Body */}
        <div className="content-body">
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}><FaSpinner className="spin" /> Loading Data...</div>
          ) : activeTab === 'overview' ? (
            <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: '1fr 1fr' }}>
              <div className="admin-table-container" style={{ gridColumn: '1 / -1' }}>
                <h3 style={{ marginBottom: '20px' }}>Recent Activity</h3>
                <table className="admin-table">
                  <tbody>
                    {[...data.projects.slice(0, 3), ...data.placementReviews.slice(0, 2)].map((item, i) => (
                      <tr key={i}>
                        <td width="50"><div className="user-avatar-text">{i + 1}</div></td>
                        <td>
                          <div style={{ fontWeight: '700' }}>{item.company || item.name || 'Anonymous'}</div>
                          <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{item.role || item.projectType || 'Update'}</div>
                        </td>
                        <td>{formatDate(item.timestamp || item.createdAt)}</td>
                        <td><span className="status-badge new">New</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="admin-table-container">
              <div className="admin-controls">
                <div className="search-admin">
                  <FaSearch style={{ color: '#94A3B8' }} />
                  <input placeholder="Search records by name, email, content..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                {activeTab === 'projects' && (
                  <div className="search-admin" style={{ width: '200px' }}>
                    <FaFilter style={{ color: '#94A3B8' }} />
                    <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)} style={{ background: 'black', border: 'none', color: 'white', width: '100%', outline: 'none' }}>
                      <option value="all">All Status</option>
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                )}
                {activeTab === 'donations' && (
                  <button 
                    className="pay-now-btn" 
                    style={{ padding: '10px 20px', fontSize: '0.9rem', width: 'auto' }}
                    onClick={() => setShowManualSync(true)}
                  >
                    <HiOutlineSparkles /> Add Record
                  </button>
                )}
              </div>

              {paginatedData.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#94A3B8' }}>No records found matching your criteria.</div>
              ) : (
                <>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>User / Candidate</th>
                        <th>Details / Content</th>
                        <th>Status / Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map(item => (
                        <tr key={item.id}>
                          <td>
                            <div className="user-cell">
                              <div className="user-avatar-text" style={{ background: activeTab === 'placements' ? '#EC4899' : activeTab === 'donations' ? '#F43F5E' : '#6366F1' }}>
                                {(item.name || item.user || 'U').charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div style={{ fontWeight: '700' }}>{item.name || item.user || 'Anonymous'}</div>
                                <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{item.mobile || item.email || item.course || 'No Contact'}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {activeTab === 'placements' && (
                              <div>
                                <strong>{item.company}</strong> ({item.role})
                                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '4px' }}>{item.experience?.substring(0, 60)}...</p>
                              </div>
                            )}
                            {activeTab === 'projects' && (
                              <div>
                                <strong>{item.projectType}</strong>
                                <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{item.message?.substring(0, 60)}...</p>
                              </div>
                            )}
                            {(activeTab === 'contacts' || activeTab === 'comments') && (
                              <div>{item.message || item.text}</div>
                            )}
                            {activeTab === 'reviews' && (
                              <div>
                                {[...Array(5)].map((_, i) => <FaStar key={i} style={{ color: i < item.rating ? '#F59E0B' : '#334155', fontSize: '0.8rem' }} />)}
                                <p>{item.review}</p>
                              </div>
                            )}
                            {activeTab === 'donations' && (
                              <div>
                                <strong style={{ color: '#F8FAFC' }}>
                                  ID: <a 
                                    href={`https://dashboard.razorpay.com/app/payments/${item.paymentId}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ color: '#6366F1', textDecoration: 'none' }}
                                  >
                                    {item.paymentId || 'Manual'}
                                  </a>
                                </strong>
                                <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Date: {formatDate(item.timestamp)}</p>
                              </div>
                            )}
                          </td>
                          <td>
                            {activeTab === 'projects' ? (
                              <span className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>{item.status}</span>
                            ) : activeTab === 'donations' ? (
                              <div style={{ color: '#4ADE80', fontWeight: '900', fontSize: '1.2rem' }}>
                                ₹{item.amount}
                              </div>
                            ) : (
                              <div style={{ fontSize: '0.9rem', color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <FaBriefcase style={{ fontSize: '0.8rem', color: '#94A3B8' }} />
                                {activeTab === 'placements' ? item.offerStatus || item.status : formatDate(item.timestamp)}
                              </div>
                            )}
                          </td>
                          <td>
                            <div className="action-btn-group">
                              {(activeTab === 'contacts' || activeTab === 'comments') && (
                                <button className="idx-btn" onClick={() => setReplyingTo(item.id)} title="Reply"><FaReply /></button>
                              )}
                              <button className="idx-btn danger" onClick={() => handleDelete(activeTab === 'projects' ? 'project_enquiries' : activeTab === 'placements' ? 'placement_reviews' : activeTab, item.id, item.userId)}><FaTrash /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                    <button className="idx-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><FaChevronLeft /></button>
                    <span>{currentPage} / {totalPages}</span>
                    <button className="idx-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}><FaChevronRight /></button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Manual Sync Modal */}
      {showManualSync && (
        <div className="support-modal-overlay" style={{ zIndex: 3000 }} onClick={() => setShowManualSync(false)}>
          <div className="support-modal-container" style={{ maxWidth: '400px', padding: '30px' }} onClick={e => e.stopPropagation()}>
            <h3>Manual Sync</h3>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '20px' }}>Enter historical Razorpay data manually.</p>
            <div className="support-form">
              <div className="form-group">
                <label>Supporter Name</label>
                <input 
                  type="text" 
                  value={manualDonor.name} 
                  onChange={e => setManualDonor({...manualDonor, name: e.target.value})}
                  placeholder="e.g. Rahul S"
                />
              </div>
              <div className="form-group">
                <label>Amount (₹)</label>
                <input 
                  type="number" 
                  value={manualDonor.amount} 
                  onChange={e => setManualDonor({...manualDonor, amount: e.target.value})}
                  placeholder="e.g. 20"
                />
              </div>
              <div className="form-group">
                <label>Payment ID (Razorpay)</label>
                <input 
                  type="text" 
                  value={manualDonor.paymentId} 
                  onChange={e => setManualDonor({...manualDonor, paymentId: e.target.value})}
                  placeholder="e.g. pay_S7jJw..."
                />
              </div>
              <button 
                className="pay-now-btn" 
                onClick={async () => {
                  if (!manualDonor.amount || !manualDonor.paymentId) return showNotification("Amount & ID required", "error");
                  try {
                    await push(ref(database, 'donations'), {
                      ...manualDonor,
                      timestamp: Date.now(),
                      status: 'success'
                    });
                    setShowManualSync(false);
                    setManualDonor({ name: "", amount: "", paymentId: "", mobile: "" });
                    showNotification("Donor added to Hall of Fame", "success");
                  } catch (e) {
                    showNotification("Failed to add donor", "error");
                  }
                }}
              >
                Sync to Hall of Fame
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {notifications.map(n => (
          <div key={n.id} style={{
            background: n.type === 'success' ? '#10B981' : n.type === 'error' ? '#EF4444' : '#3B82F6',
            color: 'white', padding: '12px 20px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', fontWeight: '600',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            {n.type === 'success' ? <FaCheckCircle /> : <FaBell />} {n.msg}
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminDashboard;