import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/AxiosURL";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
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
            <p className="page-header-desc">Overview of your workshop operations</p>
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
            <p className="page-header-desc">Overview of your workshop operations</p>
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

  // Generate Conic Gradient for Donut Chart
  const donutColors = ["#4F46E5", "#059669", "#D97706", "#DC2626", "#8B5CF6", "#06B6D4"];
  const totalServices = service_distribution.reduce((acc, curr) => acc + curr.count, 0);
  let conicGradientString = "";
  let currentPercent = 0;

  if (totalServices > 0) {
    service_distribution.forEach((item, index) => {
      const percent = (item.count / totalServices) * 100;
      const color = donutColors[index % donutColors.length];
      conicGradientString += `${color} ${currentPercent}% ${currentPercent + percent}%, `;
      currentPercent += percent;
    });
    conicGradientString = conicGradientString.slice(0, -2);
  } else {
    conicGradientString = "#E5E7EB 0% 100%";
  }

  return (
    <section className="module-page">
      <div className="page-header">
        <div className="page-header-text">
          <span className="section-tag">Workspace</span>
          <h1>Dashboard</h1>
          <p className="page-header-desc">Overview of your workshop operations</p>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="dashboard-metrics">
        <div className="metric-card">
          <div className="metric-info">
            <p>Total Vehicles</p>
            <h3>{metrics.total_vehicles ?? 0}</h3>
          </div>
          <div className="metric-icon metric-icon-blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2"/>
              <circle cx="7" cy="17" r="2"/>
              <path d="M9 17h6"/>
              <circle cx="17" cy="17" r="2"/>
            </svg>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <p>Active Repairs</p>
            <h3>{metrics.active_repairs ?? 0}</h3>
          </div>
          <div className="metric-icon metric-icon-amber">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <p>Revenue (Month)</p>
            <h3>{formatCurrency(metrics.month_revenue)}</h3>
          </div>
          <div className="metric-icon metric-icon-green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="12" rx="2"/>
              <path d="M12 12h.01"/>
              <path d="M17 12h.01"/>
              <path d="M7 12h.01"/>
            </svg>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <p>Low Stock Items</p>
            <h3>{stock_alerts.length}</h3>
          </div>
          <div className="metric-icon metric-icon-red">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="dashboard-bento">
        {/* Recent Services */}
        <div className="dashboard-panel panel-recent-services">
          <div className="panel-header">
            <h2>Recent Service Records</h2>
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
                    <th>Reg No</th>
                    <th>Vehicle</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recent_services.map(service => (
                    <tr key={service.id}>
                      <td className="cell-text" style={{fontWeight: 600}}>{service.reg_no}</td>
                      <td>{service.vehicle_model}</td>
                      <td>{getStatusBadge(service.status)}</td>
                      <td className="cell-date">{formatDate(service.created_at)}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="view-btn" onClick={() => setActiveTab?.("Services")} title="View Service">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="dashboard-panel panel-quick-actions">
          <div className="panel-header">
            <h2>Quick Garage Actions</h2>
          </div>
          <div className="panel-content">
            <div className="quick-actions-list">
              <button className="quick-action-btn" onClick={() => navigate("/customers")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Customer
              </button>
              <button className="quick-action-btn" onClick={() => navigate("/vehicles")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                New Vehicle
              </button>

              <button className="quick-action-btn" onClick={() => navigate("/services")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                Book Service
              </button>
              <button className="quick-action-btn" onClick={() => navigate("/invoices")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                Create Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="dashboard-panel panel-stock-alerts">
          <div className="panel-header">
            <h2>Spare Parts Stock Alerts</h2>
          </div>
          <div className="panel-content" style={{padding: '16px'}}>
            {stock_alerts.length === 0 ? (
              <div className="empty-state" style={{padding: '20px'}}>
                <p>No stock alerts</p>
              </div>
            ) : (
              <div className="alert-list">
                {stock_alerts.map((item, index) => (
                  <div className="alert-item" key={index}>
                    <div className="alert-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    </div>
                    <div className="alert-details">
                      <h4 className="alert-name">{item.name}</h4>
                      <div className="alert-meta">
                        {item.quantity} in stock <br />
                        (Min: {item.minimum_stock}) • Rs. {parseFloat(item.unit_price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Service Type Distribution */}
        <div className="dashboard-panel panel-service-dist">
          <div className="panel-header">
            <h2>Service Type Distribution</h2>
          </div>
          <div className="panel-content">
            {service_distribution.length === 0 ? (
              <div className="empty-state" style={{padding: '30px 20px'}}>
                <p>No service data available</p>
              </div>
            ) : (
              <div className="donut-container">
                <div className="donut-chart" style={{ background: `conic-gradient(${conicGradientString})` }}>
                  <div className="donut-hole"></div>
                </div>
                <div className="donut-legend">
                  {service_distribution.map((item, index) => {
                    const color = donutColors[index % donutColors.length];
                    return (
                      <div className="legend-item" key={index}>
                        <div className="legend-color" style={{ backgroundColor: color }}></div>
                        <span>{item.service_type} ({item.count})</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Dashboard;
