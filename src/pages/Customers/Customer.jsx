import CustomerTable from "./CustomerTable";
import api from "../../services/CustomerServices";
import "./Customer.css";
import { useEffect, useState } from "react";
import AddCustomerForm from "./AddCustomerForm";

function Customer() {
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // Search filter
  const filteredCustomers = customers.filter((customer) => {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return true;

    const nameMatch = customer.name?.toLowerCase().includes(searchTerm);
    const phoneMatch = customer.phone?.toLowerCase().includes(searchTerm);
    const emailMatch = customer.email?.toLowerCase().includes(searchTerm);

    return nameMatch || phoneMatch || emailMatch;
  });

  // 1. Initial Data Fetch
  useEffect(() => {
    api.get("customers/")
      .then((response) => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Could not fetch data!");
        setLoading(false);
      });
  }, []);

  // 2. Unified Save Handler (Handles both POST and PUT)
  const handleSaveCustomer = async (formData) => {
    try {
      if (editingCustomer) {
        // UPDATE (PUT)
        const response = await api.put(`customers/${editingCustomer.id}/`, formData);

        setCustomers((prev) =>
          prev.map((c) => (c.id === editingCustomer.id ? response.data : c))
        );
      } else {
        // CREATE (POST)
        console.log(formData);
        const response = await api.post("customers/", formData);
        setCustomers((prev) => [...prev, response.data]);
      }

      handleCloseForm();
    } catch (err) {
      console.error("Save error:", err.response?.data || err.message);
      alert("Failed to save customer details. Please check input data.");
    }
  };

  // 3. Delete Customer Handler (DELETE)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      await api.delete(`customers/${id}/`);
      setCustomers((prevCustomers) => prevCustomers.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting customer:", err.response?.data || err.message);
      alert("Failed to delete customer.");
    }
  };

  // 4. Modal Handlers
  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCustomer(null);
  };

  return (
    <section className="customer-page">
      <div className="page-header">
        <div className="page-header-text">
          <span className="section-tag">Customer directory</span>
          <h1>Customers</h1>
          <p className="page-header-desc">Manage your AutoCare customer information in one place.</p>
        </div>

        <button className="add-btn" onClick={() => setIsFormOpen(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Customer
        </button>
      </div>

      <div className="customer-panel">
        <div className="table-toolbar">
          <div className="search-box">
            <span className="search-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by name, phone or email..."
              name="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <span className="customer-count">
            {filteredCustomers.length} of {customers.length} customers
          </span>
        </div>

        {/* Loading Feedback */}
        {loading && (
          <div className="status-card status-loading">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <span>Loading customers...</span>
          </div>
        )}

        {/* Error Feedback */}
        {error && (
          <div className="status-card status-error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* 1. onEdit prop-ஐ CustomerTable-க்கு இணைக்கிறோம் */}
        {!loading && !error && (
          <CustomerTable
            customers={filteredCustomers}
            onDelete={handleDelete}
            onEdit={handleEditClick}
          />
        )}

        {/* Form Modal */}
        {isFormOpen && (
          <AddCustomerForm
            onClose={handleCloseForm}
            onSave={handleSaveCustomer}
            initialData={editingCustomer}
          />
        )}
      </div>
    </section>
  );
}

export default Customer;