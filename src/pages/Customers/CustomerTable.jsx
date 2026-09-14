import "./CustomerTable.css";

const AVATAR_COLORS = 6;

function CustomerTable({ customers, onDelete }) {

  function findDelete(event) {
    const deleteId = Number(event.target.closest("button").value);
    onDelete(deleteId);
  }

  if (customers.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <h3>No customers yet</h3>
        <p>Add your first customer to get started.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.id}>

              <td>{customer.id}</td>

              <td>
                <div className="customer-name">
                  <div className={`avatar avatar-${index % AVATAR_COLORS}`}>
                    {customer.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{customer.name}</span>
                </div>
              </td>

              <td className="cell-phone">{customer.phone}</td>

              <td className="cell-email">{customer.email}</td>

              <td className="cell-address">{customer.address}</td>

              <td className="cell-date">
                {new Date(customer.created_at).toLocaleDateString()}
              </td>

              <td>
                <div className="action-buttons">
                  <button className="edit-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Edit
                  </button>

                  <button className="delete-btn" onClick={findDelete} value={customer.id}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" style={{pointerEvents: 'none'}}>
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                      <path d="M10 11v6"/>
                      <path d="M14 11v6"/>
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
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

export default CustomerTable;