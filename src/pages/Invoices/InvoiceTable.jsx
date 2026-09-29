const AVATAR_COLORS = 6;

export default function InvoiceTable({ invoices , onDelete , onEdit , onEyeView }) {
  // console.log(invoices);

  const getStatusBadge = (status) => {
    const s = status?.toUpperCase();
    if (s === "PAID")  return "badge-success";
    if (s === "PARTIALY_PAID") return "badge-warning";
    if (s === "CANCELLED")  return "badge-cancelled";
    return "badge-pending";
  };

  const formatStatus = (status) => {
    const labels = {
      PAID:     "Paid",
      PARTIALLY_PAID: "Partially paid",
      PENDING:   "Pending",
      CANCELLED:   "Cancelled",
    };
    return labels[status?.toUpperCase()] ?? (status || "-");
  };
  

  if (invoices.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
        </div>

        <h3>No Invoices yet</h3>
        <p>Add your first Invoice to get started.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vehicle Number</th>     
            <th>Date</th>
            <th>Service Charge</th>
            <th>Parts Cost</th>
            <th>Total</th>
            <th>Paid Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={invoice.id}>

              <td>{invoice.id}</td>

              <td>
                <div className="row-name-cell">
                  <div className={`avatar avatar-${index % AVATAR_COLORS}`}>
                    {invoice.vehicle_number
                      ? invoice.vehicle_number.charAt(0).toUpperCase()
                      : "?"}
                  </div>

                  <span>{invoice.vehicle_number}</span>
                </div>
              </td>
              <td className="cell-date">
                {invoice.invoice_date
                  ? new Date(invoice.invoice_date).toLocaleDateString()
                  : "-"}
              </td>

              <td className="cell-text">
                {invoice.service_charge != null
                  ? `Rs. ${Number(invoice.service_charge).toLocaleString()}`
                  : "-"}
              </td>

              <td className="cell-text">
                {invoice.parts_cost != null
                  ? `Rs. ${Number(invoice.parts_cost).toLocaleString()}`
                  : "-"}
              </td>

              <td className="cell-text">
                {invoice.total_amount != null
                  ? `Rs. ${Number(invoice.total_amount).toLocaleString()}`
                  : "-"}
              </td>
              <td className="cell-text">
                {invoice.paid_amount != null
                  ? `Rs. ${Number(invoice.paid_amount).toLocaleString()}`
                  : "-"}
              </td>

              <td>
                <span className={`status-pill ${getStatusBadge(invoice.payment_status)}`}>
                  {formatStatus(invoice.payment_status)}
                </span>
              </td>

              

              <td>
                <div className="action-buttons">
                  {/* 1. View Details Button (Eye Icon) */}
                    <button
                      type="button"
                      className="view-btn"
                      onClick={() => onEyeView(invoice)}
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
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => onEdit(invoice)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => onDelete(invoice.id)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
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

