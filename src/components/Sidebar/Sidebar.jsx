import "./Sidebar.css";

const navItems = [
  {
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="7" height="7" rx="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5"/>
      </svg>
    ),
  },
  {
    label: "Customers",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: "Vehicles",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2"/>
        <circle cx="7" cy="17" r="2"/>
        <path d="M9 17h6"/>
        <circle cx="17" cy="17" r="2"/>
      </svg>
    ),
  },
  {
    label: "Services",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    label: "Spare Parts",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
  {
    label: "Invoices",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
];

function Sidebar({ collapsed , activeTab, setActiveTab }) {
  return (
    <aside className={`sidebar${collapsed ? " sidebar--collapsed" : ""}`}>

      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-logo">A</div>
        <div className="sidebar-brand-text">
          <h2>AutoCare</h2>
          <p>Service Management</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="sidebar-section">
        <p className="menu-label">Main menu</p>

        <nav className="sidebar-nav">
          {navItems.map(({ icon, label }) => (
            <a
              href="#"
              className={activeTab === label ? "active" : ""}
              key={label}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(label);
              }}
              title={collapsed ? label : undefined}
            >
              <span className="nav-icon-wrap">{icon}</span>
              <span className="nav-label">{label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="user-avatar">AM</div>
          <div className="sidebar-user-text">
            <h4>Aasath</h4>
            <p>Admin</p>
          </div>
        </div>
        <button className="logout-btn" title={collapsed ? "Log out" : undefined}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span className="logout-label">Log out</span>
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;
