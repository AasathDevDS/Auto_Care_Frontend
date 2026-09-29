import { useEffect, useState } from "react";
import api from "../../services/AxiosURL";
import "./Dashboard.css";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = () => {
    setLoading(true);
    setError(null);
    api.get("dashboard/")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Unable to load dashboard data.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <section className="module-page">
        <div className="page-header">
          <div className="page-header-text">
            <span className="section-tag">Overview</span>
            <h1>Dashboard</h1>
            <p className="page-header-desc">AutoCare Workshop Management Overview.</p>
          </div>
        </div>
        <div className="status-card status-loading module-panel">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          <span>Loading dashboard data...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="module-page">
        <div className="page-header">
          <div className="page-header-text">
            <span className="section-tag">Overview</span>
            <h1>Dashboard</h1>
            <p className="page-header-desc">AutoCare Workshop Management Overview.</p>
          </div>
        </div>
        <div className="status-card status-error module-panel" style={{flexDirection: 'column', alignItems: 'flex-start', padding: '24px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
          <button className="add-btn" onClick={fetchDashboardData} style={{marginTop: '16px'}}>
            Retry
          </button>
        </div>
      </section>
    );
  }

  const {
    metrics = {},
    recent_services = [],
    stock_alerts = [],
    service_distribution = []
  } = data || {};

  const formatCurrency = (amount) => {
    const val = parseFloat(amount) || 0;
    return `Rs. ${val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getStatusBadge = (status) => {
    if (status === 'IN_PROGRESS') return <span className="status-pill badge-warning">In Progress</span>;
    if (status === 'COMPLETED') return <span className="status-pill badge-success">Completed</span>;
    return <span className="status-pill badge-pending">{status}</span>;
  };

  return (
    <section className="module-page">
      <div className="page-header">
        <div className="page-header-text">
          <span className="section-tag">Overview</span>
          <h1>Dashboard</h1>
          <p className="page-header-desc">Welcome back! Here's what's happening in your workshop today.</p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="dashboard-metrics">
        <div className="metric-card">
          <div className="metric-icon metric-icon-blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2"/>
              <circle cx="7" cy="17" r="2"/>
              <path d="M9 17h6"/>
              <circle cx="17" cy="17" r="2"/>
            </svg>
          </div>
          <div className="metric-info">
            <p>Total Vehicles</p>
            <h3>{metrics.total_vehicles ?? 0}</h3>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon metric-icon-amber">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <div className="metric-info">
            <p>Active Repairs</p>
            <h3>{metrics.active_repairs ?? 0}</h3>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon metric-icon-green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <div className="metric-info">
            <p>This Month Revenue</p>
            <h3>{formatCurrency(metrics.month_revenue)}</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left Column: Recent Services */}
        <div className="dashboard-col dashboard-col-main">
          <div className="module-panel dashboard-panel">
            <div className="panel-header">
              <h2>Recent Services</h2>
            </div>
            {recent_services.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <h3>No recent services</h3>
                <p>There are no services to display right now.</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Vehicle</th>
                      <th>Registration</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent_services.map(service => (
                      <tr key={service.id}>
                        <td>
                          <div className="row-name-cell">
                            <span>{service.vehicle_model}</span>
                          </div>
                        </td>
                        <td className="cell-text">{service.reg_no}</td>
                        <td>{getStatusBadge(service.status)}</td>
                        <td className="cell-date">{formatDate(service.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Alerts & Distribution */}
        <div className="dashboard-col dashboard-col-side">
          {/* Stock Alerts */}
          <div className="module-panel dashboard-panel">
            <div className="panel-header">
              <h2>Low Stock Alerts</h2>
            </div>
            <div className="panel-content">
              {stock_alerts.length === 0 ? (
                <div className="empty-state" style={{padding: '30px 20px'}}>
                  <p>No stock alerts</p>
                </div>
              ) : (
                <div className="alert-list">
                  {stock_alerts.map((item, index) => (
                    <div className="alert-item" key={index}>
                      <div className="alert-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                      </div>
                      <div className="alert-details">
                        <h4 className="alert-name">{item.name}</h4>
                        <div className="alert-meta">
                          <span>Qty: {item.quantity} (Min: {item.minimum_stock})</span>
                          <span>•</span>
                          <span>Rs. {parseFloat(item.unit_price).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Service Distribution */}
          <div className="module-panel dashboard-panel">
            <div className="panel-header">
              <h2>Service Distribution</h2>
            </div>
            <div className="panel-content">
              {service_distribution.length === 0 ? (
                <div className="empty-state" style={{padding: '30px 20px'}}>
                  <p>No service data available</p>
                </div>
              ) : (
                <div className="distribution-list">
                  {service_distribution.map((item, index) => {
                    const total = service_distribution.reduce((acc, curr) => acc + curr.count, 0);
                    const percent = total > 0 ? (item.count / total) * 100 : 0;
                    return (
                      <div className="dist-item" key={index}>
                        <div className="dist-info">
                          <span className="dist-name">{item.service_type}</span>
                          <span className="dist-count">{item.count}</span>
                        </div>
                        <div className="dist-bar-bg">
                          <div className="dist-bar-fill" style={{width: `${percent}%`}}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Dashboard;
