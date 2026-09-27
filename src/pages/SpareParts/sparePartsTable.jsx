const AVATAR_COLORS = 6;

function SparePartsTable({ spareParts, onDelete, onEdit }) {

  if (spareParts.length === 0) {
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

        <h3>No spare parts yet</h3>
        <p>Add your first spare part to get started.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>     
            <th>Category</th>
            <th>Supplier</th>
            <th>Quantity</th>
            <th>Minimum Stock</th>
            <th>Unit Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {spareParts.map((part, index) => (
            <tr key={part.id}>

              <td>{part.id}</td>

              <td>
                <div className="row-name-cell">
                  <div className={`avatar avatar-${index % AVATAR_COLORS}`}>
                    {part.name
                      ? part.name.charAt(0).toUpperCase()
                      : "?"}
                  </div>

                  <span>{part.name}</span>
                </div>
              </td>

              <td className="cell-text">
                {part.category || "-"}
              </td>

              <td className="cell-text">
                {part.supplier || "-"}
              </td>

              <td className="cell-text">
                {part.quantity ?? 0}
              </td>
              <td className="cell-text">
                {part.minimum_stock ?? 0}
              </td>

              <td className="cell-text">
                {part.unit_price != null
                  ? `Rs. ${Number(part.unit_price).toLocaleString()}`
                  : "-"}
              </td>

              <td>
                <div className="action-buttons">

                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => onEdit(part)}
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
                    onClick={() => onDelete(part.id)}
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

export default SparePartsTable;