import "./Navbar.css";

function Navbar({ activeTab }) {
  // Format the active tab string
  const formattedTab = activeTab
    ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace("-", " ")
    : "Dashboard";

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-breadcrumb">
          <span className="topbar-eyebrow">Service Management</span>
          <span className="breadcrumb-sep">/</span>
          <span className="topbar-page-title">{formattedTab} Workspace</span>
        </div>
      </div>

      <div className="topbar-right">
        {/* Notification bell — decorative */}
        <button className="topbar-icon-btn" aria-label="Notifications">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="notif-dot"></span>
        </button>

        <div className="topbar-divider" aria-hidden="true"></div>

        <div className="topbar-user">
          <div className="topbar-avatar">AM</div>
          <div className="topbar-user-info">
            <strong>Aasath</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
