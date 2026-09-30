// import "./ServiceDetailView.css";

function InvoiceDetailsView({ invoice, onClose, onEdit }) {
  if (!invoice) return null;

  // Payment Status-kku thaguntha Badge class (PAID, PARTIAL, PENDING)
  const getStatusBadge = (status) => {
    const s = status?.toUpperCase();
    if (s === "PAID") return "badge-success";
    if (s === "PARTIAL") return "badge-warning";
    return "badge-pending";
  };

  // Payment Method format seiyya
  const formatPaymentMethod = (method) => {
    switch (method) {
      case "CARD":
        return "Card Payment";
      case "ONLINE":
        return "Bank / Online Transfer";
      case "CASH":
      default:
        return "Cash";
    }
  };

  // Date format seiyya
  const formattedDate = invoice.created_at
    ? new Date(invoice.created_at).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    : "N/A";

  const currency = "LKR";

  return (
    <div className="form-overlay">
      <div className="modal-card service-details-modal">
        {/* Modal Header */}
        <div className="form-header">
          <div className="form-header-left">
            <div className="form-header-icon">
              {/* Receipt / Invoice Icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div>
              <h2>Invoice #{invoice.id} Details</h2>
              <p>
                Service: <strong>#{invoice.service}</strong>
                {invoice.vehicle_number ? ` (${invoice.vehicle_number})` : ""}
              </p>
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

        {/* Modal Body - Dividers illatha Clean Details Grid */}
        <div className="form-body details-body">
          <div className="details-info-grid">
            {/* Status & Method */}
            <div className="detail-item">
              <span className="detail-label">Payment Status</span>
              <span className={`status-pill ${getStatusBadge(invoice.payment_status)}`}>
                {invoice.payment_status}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Payment Method</span>
              <span className="detail-value">{formatPaymentMethod(invoice.payment_method)}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Invoice Date</span>
              <span className="detail-value">{formattedDate}</span>
            </div>

            {/* Charges Breakdown */}
            <div className="detail-item">
              <span className="detail-label">Service Charge</span>
              <span className="detail-value">
                {currency} {Number(invoice.service_charge || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Parts Cost</span>
              <span className="detail-value">
                {currency} {Number(invoice.parts_cost || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Discount</span>
              <span className="detail-value text-muted">
                - {currency} {Number(invoice.discount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Billing Summary */}
            <div className="detail-item">
              <span className="detail-label">Total Amount</span>
              <span className="detail-value text-bold amount-highlight">
                {currency} {Number(invoice.total_amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Paid Amount</span>
              <span className="detail-value text-success">
                {currency} {Number(invoice.paid_amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Remaining Balance</span>
              <span className={`detail-value ${Number(invoice.remaining_amount) > 0 ? "text-danger" : "text-muted"}`}>
                {currency} {Number(invoice.remaining_amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Billing Notes Box */}
          <div className="detail-box">
            <span className="detail-label">Billing Notes</span>
            <p className="detail-description">
              {invoice.notes || "No special billing instructions or warranty notes."}
            </p>
          </div>
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
                onEdit(invoice);
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit Invoice
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetailsView;