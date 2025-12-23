import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../firebase";
import { ref, onValue, remove, push, update } from "firebase/database";
import emailjs from "emailjs-com";
import {
  FaBars, FaEnvelope, FaComments, FaSignOutAlt, FaCheckCircle, 
  FaTrash, FaReply, FaSearch, FaFilter, FaBell, FaUserCircle, 
  FaProjectDiagram, FaStar, FaTimes, FaMoon, FaSun, FaSpinner,
  FaChevronLeft, FaChevronRight, FaHome, FaHistory, FaBriefcase, FaBuilding
} from "react-icons/fa";
import "./AdminDashboard.css";

// --- Sub-Components ---

const StatCard = ({ icon, title, value, color, onClick, active, trend }) => (
  <div 
    className={`stat-card ${active ? 'active' : ''}`} 
    onClick={onClick}
  >
    <div className="stat-top">
      <div className="stat-icon-wrapper" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>
        {icon}
      </div>
      <div className="stat-trend">
        <span>{trend || "+0%"}</span> this week
      </div>
    </div>
    <div className="stat-info">
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
    <div className="stat-bg-decoration" style={{ color: color }}>{icon}</div>
  </div>
);

// Visual Chart Widget
const ProjectStatusChart = ({ projects }) => {
  const stats = {
    new: projects.filter(p => p.status === 'New').length,
    progress: projects.filter(p => p.status === 'In Progress').length,
    completed: projects.filter(p => p.status === 'Completed').length,
  };
  const total = projects.length || 1; 

  return (
    <div className="chart-widget">
      <h4>Project Status Distribution</h4>
      <div className="progress-bars">
        <div className="p-bar-group">
          <div className="p-label"><span>New</span><span>{stats.new}</span></div>
          <div className="p-track"><div className="p-fill new" style={{width: `${(stats.new/total)*100}%`}}></div></div>
        </div>
        <div className="p-bar-group">
          <div className="p-label"><span>In Progress</span><span>{stats.progress}</span></div>
          <div className="p-track"><div className="p-fill progress" style={{width: `${(stats.progress/total)*100}%`}}></div></div>
        </div>
        <div className="p-bar-group">
          <div className="p-label"><span>Completed</span><span>{stats.completed}</span></div>
          <div className="p-track"><div className="p-fill completed" style={{width: `${(stats.completed/total)*100}%`}}></div></div>
        </div>
      </div>
    </div>
  );
};

const RecentActivity = ({ data }) => {
  const combined = [
    ...data.projects.map(i => ({ ...i, type: 'Project', icon: <FaProjectDiagram/>, text: `New inquiry from ${i.name}` })),
    ...data.reviews.map(i => ({ ...i, type: 'Review', icon: <FaStar/>, text: `${i.rating}★ review from ${i.name}` })),
    ...data.placementReviews.map(i => ({ ...i, type: 'Placement', icon: <FaBriefcase/>, text: `Placement review: ${i.company}` })),
    ...data.contacts.map(i => ({ ...i, type: 'Message', icon: <FaEnvelope/>, text: `Message from ${i.name}` }))
  ].sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);

  return (
    <div className="activity-widget">
      <h4>Recent Activity</h4>
      <div className="activity-list">
        {combined.map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="activity-item">
            <div className={`activity-icon ${item.type.toLowerCase()}`}>{item.icon}</div>
            <div className="activity-details">
              <span className="activity-text">{item.text}</span>
              <span className="activity-time">{new Date(item.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // UI State
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [isLoading, setIsLoading] = useState(true);
  
  // Data State
  const [data, setData] = useState({ 
    projects: [], 
    reviews: [], 
    placementReviews: [], // Added for placement reviews
    contacts: [], 
    comments: [] 
  });
  
  // Action State
  const [searchQuery, setSearchQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  
  // Pagination & Sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'descending' });
  const itemsPerPage = 7;

  // --- Effects ---
  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    setIsLoading(true);
    const refs = {
      projects: ref(database, "project_enquiries"),
      reviews: ref(database, "project_reviews"),
      placementReviews: ref(database, "placement_reviews"), // New Firebase Ref
      contacts: ref(database, "contacts"),
      comments: ref(database, "comments")
    };

    const listeners = [];
    const fetchData = (key) => onValue(refs[key], (snap) => {
        const raw = snap.val() || {};
        let processed = [];
        if(key === 'projects') {
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
    if(!window.confirm("Are you sure? This cannot be undone.")) return;
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
    if(activeTab === 'overview') return [];
    
    // Select data source based on tab
    let list = activeTab === 'placements' ? data.placementReviews : (data[activeTab] || []);

    if (activeTab === 'projects' && projectFilter !== 'all') {
      list = list.filter(i => i.status === projectFilter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(item => Object.values(item).some(val => String(val).toLowerCase().includes(q)));
    }
    return list.sort((a, b) => {
      let aVal = a[sortConfig.key] || "";
      let bVal = b[sortConfig.key] || "";
      return sortConfig.direction === 'ascending' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });
  }, [data, activeTab, projectFilter, searchQuery, sortConfig]);

  const paginatedData = processedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(processedData.length / itemsPerPage);

  const formatDate = (iso) => {
    if (!iso) return "-";
    const date = new Date(iso);
    return isNaN(date.getTime()) ? "-" : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' });
  };

  // --- Render ---
  return (
    <div className={`admin-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      
      {/* Notifications */}
      <div className="notification-wrapper">
        {notifications.map(n => (
          <div key={n.id} className={`toast toast-${n.type}`}>
            {n.type === 'success' ? <FaCheckCircle/> : <FaBell/>} {n.msg}
          </div>
        ))}
      </div>

      {/* Backdrop for Mobile */}
      <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)}></div>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo"><FaUserCircle /></div>
          <div>Admin<span>Panel</span></div>
        </div>

        <nav className="nav-menu">
          <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
            <FaHome /> Dashboard
          </button>
          <div className="nav-divider">Data Management</div>
          
          <button className={activeTab === 'projects' ? 'active' : ''} onClick={() => { setActiveTab('projects'); setCurrentPage(1); }}>
            <FaProjectDiagram /> Projects <span className="badge">{data.projects.length}</span>
          </button>
          
          <button className={activeTab === 'placements' ? 'active' : ''} onClick={() => { setActiveTab('placements'); setCurrentPage(1); }}>
            <FaBriefcase /> Placements <span className="badge">{data.placementReviews.length}</span>
          </button>

          <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => { setActiveTab('reviews'); setCurrentPage(1); }}>
            <FaStar /> Proj. Reviews <span className="badge">{data.reviews.length}</span>
          </button>
          
          <button className={activeTab === 'contacts' ? 'active' : ''} onClick={() => { setActiveTab('contacts'); setCurrentPage(1); }}>
            <FaEnvelope /> Messages <span className="badge">{data.contacts.length}</span>
          </button>
          
          <button className={activeTab === 'comments' ? 'active' : ''} onClick={() => { setActiveTab('comments'); setCurrentPage(1); }}>
            <FaComments /> Comments <span className="badge">{data.comments.length}</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button onClick={handleLogout} className="logout-link">
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="main-content">
        <header className="top-header">
          <button className="hamburger" onClick={() => setSidebarOpen(true)}><FaBars /></button>
          <div className="header-title">
            <h2>{activeTab === 'overview' ? 'Dashboard Overview' : activeTab === 'placements' ? 'Placement Reviews' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            <p className="header-subtitle">Welcome back, Admin</p>
          </div>
          <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </header>

        {/* Stats Row */}
        <div className="stats-row">
          <StatCard 
            icon={<FaProjectDiagram />} title="Total Projects" 
            value={data.projects.length} color="#6366f1" trend="+12%"
            active={activeTab === 'projects'} onClick={() => setActiveTab('projects')}
          />
          <StatCard 
            icon={<FaBriefcase />} title="Placement Reviews" 
            value={data.placementReviews.length} color="#0ea5e9" trend="+7%"
            active={activeTab === 'placements'} onClick={() => setActiveTab('placements')}
          />
          <StatCard 
            icon={<FaStar />} title="Project Reviews" 
            value={data.reviews.length} color="#f59e0b" trend="+5%"
            active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}
          />
          <StatCard 
            icon={<FaEnvelope />} title="Messages" 
            value={data.contacts.length} color="#10b981" trend="+8%"
            active={activeTab === 'contacts'} onClick={() => setActiveTab('contacts')}
          />
        </div>

        {/* Content Area */}
        <div className="content-body">
          {isLoading ? (
            <div className="loading-container"><FaSpinner className="spinner" /> Loading...</div>
          ) : activeTab === 'overview' ? (
            /* --- DASHBOARD OVERVIEW TAB --- */
            <div className="overview-grid">
               <ProjectStatusChart projects={data.projects} />
               <RecentActivity data={data} />
            </div>
          ) : (
            /* --- DATA TABLES / LISTS --- */
            <>
              <div className="controls-bar">
                <div className="search-input-group">
                  <FaSearch />
                  <input 
                    type="text" placeholder="Search records..." 
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                {activeTab === 'projects' && (
                  <div className="filter-dropdown">
                    <FaFilter />
                    <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
                      <option value="all">All Projects</option>
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                )}
              </div>

              {paginatedData.length === 0 ? (
                <div className="empty-placeholder">No records found matching your criteria.</div>
              ) : (
                <>
                  {/* Table View (Desktop) */}
                  <div className="glass-table-container">
                    <table className="glass-table">
                      <thead>
                        <tr>
                          <th>User / Candidate</th>
                          {activeTab === 'placements' ? <th>Company Info</th> : <th>Details</th>}
                          {activeTab === 'projects' ? <th>Progress</th> : <th>Date</th>}
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map(item => (
                          <tr key={item.id}>
                            <td>
                              <div className="user-info-cell">
                                <div className={`avatar-initials ${activeTab}`}>
                                  {item.name?.charAt(0) || item.user?.charAt(0) || '?'}
                                </div>
                                <div>
                                  <div className="font-bold">{item.name || item.user || 'Anonymous'}</div>
                                  <div className="font-small">{item.email || item.course || 'No details'}</div>
                                </div>
                              </div>
                            </td>
                            
                            <td className="detail-cell">
                                {activeTab === 'projects' && (
                                    <>
                                        <span className="pill pill-indigo">{item.projectType}</span>
                                        <div className="truncate-text">{item.message}</div>
                                    </>
                                )}
                                {activeTab === 'reviews' && (
                                    <>
                                        <div className="stars-row">
                                            {[...Array(5)].map((_,i) => <FaStar key={i} className={i<item.rating?'filled':''}/>)}
                                        </div>
                                        <div className="truncate-text">{item.project} - {item.review}</div>
                                    </>
                                )}
                                {activeTab === 'placements' && (
                                    <>
                                        <div className="company-info">
                                            <FaBuilding className="icon-tiny"/> <strong>{item.company}</strong>
                                            {item.role && <span className="role-tag">{item.role}</span>}
                                        </div>
                                        <div className="truncate-text">{item.review || item.experience}</div>
                                    </>
                                )}
                                {(activeTab === 'contacts' || activeTab === 'comments') && (
                                    <div className="truncate-text large">{item.message || item.text}</div>
                                )}
                            </td>

                            <td>
                                {activeTab === 'projects' ? (
                                    <div className="status-tracker">
                                        <div className={`track-dot ${item.steps?.step1?'done':''}`} onClick={()=>toggleProjectStep(item.userId, item.id, 'step1', item.steps)} title="New">1</div>
                                        <div className="track-line"></div>
                                        <div className={`track-dot ${item.steps?.step2?'done':''}`} onClick={()=>toggleProjectStep(item.userId, item.id, 'step2', item.steps)} title="In Progress">2</div>
                                        <div className="track-line"></div>
                                        <div className={`track-dot ${item.steps?.step3?'done':''}`} onClick={()=>toggleProjectStep(item.userId, item.id, 'step3', item.steps)} title="Completed">3</div>
                                    </div>
                                ) : (
                                    <div className="date-display">
                                        <FaHistory className="icon-tiny"/> {formatDate(item.timestamp)}
                                    </div>
                                )}
                            </td>

                            <td>
                                <div className="action-row">
                                    {(activeTab === 'contacts' || activeTab === 'comments') && (
                                        <button className="btn-icon reply" onClick={() => setReplyingTo(item.id)} title="Reply"><FaReply /></button>
                                    )}
                                    <button 
                                      className="btn-icon delete" 
                                      onClick={() => handleDelete(activeTab === 'projects'?'project_enquiries': activeTab === 'placements' ? 'placement_reviews' : activeTab, item.id, item.userId)} 
                                      title="Delete"
                                    >
                                      <FaTrash />
                                    </button>
                                </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards (Responsive) */}
                  <div className="mobile-list-view">
                    {paginatedData.map(item => (
                        <div className="mobile-card-glass" key={item.id}>
                            <div className="mc-header">
                                <span className="mc-name">{item.name || item.user}</span>
                                <span className="mc-date">{formatDate(item.timestamp)}</span>
                            </div>
                            <div className="mc-body">
                                {activeTab === 'projects' && (
                                    <>
                                        <div className="mc-row"><span>Type:</span> {item.projectType}</div>
                                        <div className="mc-row"><span>Status:</span> <span className={`status-tag ${item.status.replace(' ','-').toLowerCase()}`}>{item.status}</span></div>
                                    </>
                                )}
                                {activeTab === 'placements' && (
                                    <>
                                        <div className="mc-row"><span>Company:</span> {item.company}</div>
                                        <div className="mc-row"><span>Role:</span> {item.role || 'N/A'}</div>
                                    </>
                                )}
                                <div className="mc-message">
                                    {item.message || item.text || item.review || item.experience}
                                </div>
                            </div>
                            <div className="mc-actions">
                                {(activeTab === 'contacts' || activeTab === 'comments') && 
                                    <button className="btn-glass" onClick={()=>setReplyingTo(item.id)}>Reply</button>
                                }
                                <button 
                                  className="btn-glass danger" 
                                  onClick={()=>handleDelete(activeTab === 'projects'?'project_enquiries':activeTab === 'placements'?'placement_reviews':activeTab, item.id, item.userId)}
                                >
                                  Delete
                                </button>
                            </div>
                        </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="pagination-bar">
                    <button disabled={currentPage===1} onClick={()=>setCurrentPage(p=>p-1)}><FaChevronLeft/></button>
                    <span>{currentPage} / {totalPages}</span>
                    <button disabled={currentPage===totalPages} onClick={()=>setCurrentPage(p=>p+1)}><FaChevronRight/></button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>

      {/* Modern Modal */}
      {replyingTo && (
        <div className="modal-backdrop">
          <div className="glass-modal">
            <div className="modal-header">
              <h3>Send Reply</h3>
              <button onClick={() => setReplyingTo(null)}><FaTimes/></button>
            </div>
            <div className="modal-body">
                <textarea 
                    value={replyText} 
                    onChange={e=>setReplyText(e.target.value)}
                    placeholder="Type your response here..."
                    rows={5}
                ></textarea>
            </div>
            <div className="modal-footer">
                <button className="btn-text" onClick={() => setReplyingTo(null)}>Cancel</button>
                <button className="btn-primary" onClick={() => handleReply(paginatedData.find(i=>i.id===replyingTo), activeTab)}>Send Message</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;