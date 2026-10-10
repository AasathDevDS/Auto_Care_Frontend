import api from "../../services/AxiosURL";
import "./ServiceDetailView.css";
import { useEffect, useState } from "react";

function ServiceDetailsView({ service, onClose, onEdit }) {
  if (!service) return null;
  const [usedSpares , setUsedSpares] = useState([]);

  const filtereduserSpare = usedSpares.filter((usedSpare) => usedSpare.service === service.id);
  
  
  // Status-க்குரிய Badge class
  const getStatusBadge = (status) => {
    const s = status?.toUpperCase();
    if (s === "COMPLETED") return "badge-success";
    if (s === "IN_PROGRESS") return "badge-warning";
    return "badge-pending";
  };

  useEffect(() => {
    api.get("service-spare-parts/")
    .then((response) => {
      setUsedSpares(response.data);
      console.log(response.data);
    })
    .catch ((err) => {
      console.error("API error" , err);
    })
  }, []);

  // Date formatting
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
      <div className="modal-card service-details-modal">
        {/* Modal Header */}
        <div className="form-header">
          <div className="form-header-left">
            <div className="form-header-icon">
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

        {/* Modal Body - Dividers இல்லாமல் Clean Details View */}
        <div className="form-body details-body">
          <div className="details-info-grid">
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

            <div className="detail-item">
              <span className="detail-label">Estimated Cost</span>
              <span className="detail-value">
                LKR {Number(service.estimated_cost || 0).toLocaleString()}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Actual Cost</span>
              <span className="detail-value text-bold">
                LKR {service.actual_cost ? Number(service.actual_cost).toLocaleString() : "--"}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Mileage at Service</span>
              <span className="detail-value">
                {service.mileage_at_service ? `${service.mileage_at_service} km` : "N/A"}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Assigned Mechanic</span>
              <span className="detail-value">
                {service.mechanic_name || `ID: ${service.mechanic || "Not Assigned"}`}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Vehicle Number</span>
              <span className="detail-value">
                {service.vehicle_number || `ID: ${service.vehicle}`}
              </span>
            </div>
          </div>

          {/* Problem Description Box */}
          <div className="detail-box">
            <span className="detail-label">Problem Description</span>
            <p className="detail-description">
              {service.problem_description || "No specific problems reported."}
            </p>
          </div>

          {/* Internal Notes Box */}
          {service.notes && (
            <div className="detail-box">
              <span className="detail-label">Internal Notes</span>
              <p className="detail-description">{service.notes}</p>
            </div>
          )}
        {/* Used Spare Parts Section */}
          <div className="detail-box spares-detail-box">
            <span className="detail-label">Used Spare Parts</span>
            
            {filtereduserSpare.length > 0 ? (
              <div className="table-responsive">
                <table className="spares-table">
                  <thead>
                    <tr>
                      <th>Part Name</th>
                      <th className="text-center">Used Qty</th>
                      <th className="text-right">Unit Price</th>
                      <th className="text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtereduserSpare.map((spare) => {
                      const qty = Number(spare.quantity || 0);
                      const price = Number(spare.unit_price || 0);
                      const total = qty * price;

                      return (
                        <tr key={spare.id}>
                          <td className="part-name">
                            {spare.spare_part_name || `Part #${spare.spare_part || spare.id}`}
                          </td>
                          <td className="text-center">{qty}</td>
                          <td className="text-right">LKR {price.toLocaleString()}</td>
                          <td className="text-right text-bold">LKR {total.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="detail-description empty-text">No spare parts recorded for this service.</p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
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