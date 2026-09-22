const AVATAR_COLORS = 6;

function ServiceTable({services , onEyeView , onDelete , onEdit}){
  if (services.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <h3>No vehicles yet</h3>
        <p>Add your first Vehicle to get started.</p>
      </div>
    );
  }
  const getStatusBadge = (status) => {
    const s = status?.toUpperCase();
    if (s === "COMPLETED") return "badge-success";
    if (s === "IN_PROGRESS") return "badge-warning";
    return "badge-pending";
  };

  return (
    <div className="table-container">
      <table className="customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vehicle Number</th>
            <th>Actual Cost</th>
            <th>Service Type</th>
            <th>Status</th>
            <th>Service Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {services.map((service, index) => (
            <tr key={service.id}>
              <td>{service.id}</td>

              <td>
                <div className="customer-name">
                  <div className={`avatar avatar-${index % AVATAR_COLORS}`}>
                    {service.vehicle_number ? service.vehicle_number.charAt(0).toUpperCase() : "?"}
                  </div>
                  <span>{service.vehicle_number}</span>
                </div>
              </td>

              <td className="cell-phone">{service.actual_cost || "-"}</td>
              <td className="cell-email">{service.service_type|| "-"}</td>
              <td className={`status-pill ${getStatusBadge(service.status)}`}>{service.status|| "-"}</td>

              <td className="cell-date">
                {service.service_date
                  ? new Date(service.service_date).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                <div className="action-buttons">
                    {/* 1. View Details Button (Eye Icon) */}
                    <button
                      type="button"
                      className="view-btn"
                      onClick={() => onEyeView(service)}
                    >
                      <svg 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      View
                    </button>

                    {/* 2. Edit Button */}
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => onEdit(service)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit
                    </button>

                    {/* 3. Delete Button */}
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => onDelete(service.id)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                      Delete
                    </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ); 
}

export default ServiceTable;