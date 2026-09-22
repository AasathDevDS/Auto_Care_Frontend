import "./ServiceDetailView.css"

function ServiceDetailsView({ service, onClose , onEdit }) {
  if (!service) return null;

  // Status-க்கு தகுந்த Badge class (PENDING, COMPLETED, IN_PROGRESS)
  const getStatusBadge = (status) => {
    const s = status?.toUpperCase();
    if (s === "COMPLETED") return "badge-success";
    if (s === "IN_PROGRESS") return "badge-warning";
    return "badge-pending";
  };

  // Date format செய்ய
  const formattedDate = service.service_date
    ? new Date(service.service_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  return (
    <div className="form-overlay">
      <div className="customer-form service-details-modal">
        {/* Modal Header */}
        <div className="form-header">
          <div className="form-header-left">
            <div className="form-header-icon">
              {/* Eye / Details Icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div>
              <h2>Service #{service.id} Details</h2>
              <p>Vehicle: <strong>{service.vehicle_number || `ID: ${service.vehicle}`}</strong></p>
            </div>
          </div>

          <button
            type="button"
            className="form-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Content - Read Only Details */}
        <div className="form-body details-body">
          {/* Top Quick Status & Date */}
          <div className="detail-row">
            <div className="detail-item">
              <span className="detail-label">Status</span>
              <span className={`status-pill ${getStatusBadge(service.status)}`}>
                {service.status}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Service Type</span>
              <span className="detail-value">{service.service_type || "N/A"}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Service Date</span>
              <span className="detail-value">{formattedDate}</span>
            </div>
          </div>

          <hr className="details-divider" />

          {/* Costs & Mileage */}
          <div className="detail-row">
            <div className="detail-item">
              <span className="detail-label">Estimated Cost</span>
              <span className="detail-value">LKR {Number(service.estimated_cost || 0).toLocaleString()}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Actual Cost</span>
              <span className="detail-value text-bold">
                LKR {service.actual_cost ? Number(service.actual_cost).toLocaleString() : "--"}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Mileage at Service</span>
              <span className="detail-value">{service.mileage_at_service ? `${service.mileage_at_service} km` : "N/A"}</span>
            </div>
          </div>

          <hr className="details-divider" />

          {/* Mechanic & Vehicle Reference */}
          <div className="detail-row">
            <div className="detail-item">
              <span className="detail-label">Assigned Mechanic</span>
              <span className="detail-value">{service.mechanic_name || `ID: ${service.mechanic || "Not Assigned"}`}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Vehicle Number</span>
              <span className="detail-value">{service.vehicle_number || `ID: ${service.vehicle}`}</span>
            </div>
          </div>

          <hr className="details-divider" />

          {/* Problem Description Box */}
          <div className="detail-box">
            <span className="detail-label">Problem Description</span>
            <p className="detail-description">
              {service.problem_description || "No specific problems reported."}
            </p>
          </div>

          {/* Notes Box */}
          {service.notes && (
            <div className="detail-box">
              <span className="detail-label">Internal Notes</span>
              <p className="detail-description">{service.notes}</p>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="form-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Close
          </button>

          {onEdit && (
            <button
              type="button"
              className="btn-submit"
              onClick={() => {
                onClose();
                onEdit(service);
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit Service
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServiceDetailsView;