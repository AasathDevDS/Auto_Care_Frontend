import "./AddCustomerForm.css";
import { useState, useEffect } from "react";

function AddCustomerForm({ onClose, onSave, initialData }) {
  // initialData இருந்தால் Edit mode (Boolean flag)
  const isEditMode = Boolean(initialData);

  const [customer, setCustomer] = useState({
    name: initialData?.name || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    address: initialData?.address || "",
  });

  // initialData மாறினால் form state-ஐ sync செய்ய (safety measure)
  useEffect(() => {
    if (initialData) {
      setCustomer({
        name: initialData.name || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
        address: initialData.address || "",
      });
    }
  }, [initialData]);

  // Input change handler
  function handleChange(event) {
    const { name, value } = event.target;
    setCustomer((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  // Form submit handler
  function handleSubmit(event) {
    event.preventDefault();
    // Data-வை parent-க்கு அனுப்பி சேமிக்கிறோம்
    onSave(customer);
  }

  return (
    <div className="form-overlay">
      <div className="customer-form">
        {/* Modal Header */}
        <div className="form-header">
          <div className="form-header-left">
            <div className="form-header-icon">
              {isEditMode ? (
                // Edit Icon
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              ) : (
                // Add Icon
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
              )}
            </div>
            <div>
              {/* Dynamic Heading & Description */}
              <h2>{isEditMode ? "Edit Customer" : "Add Customer"}</h2>
              <p>
                {isEditMode
                  ? "Update the details of this customer."
                  : "Fill in the details to register a new customer."}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="form-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
          <div className="form-body">
            <div className="form-field">
              <label htmlFor="customer-name">
                Full Name <span>*</span>
              </label>
              <input
                id="customer-name"
                type="text"
                placeholder="e.g. Ahmed Ali"
                name="name"
                required
                value={customer.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="customer-phone">
                Phone Number <span>*</span>
              </label>
              <input
                id="customer-phone"
                type="text"
                placeholder="e.g. +94 77 123 4567"
                name="phone"
                required
                value={customer.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="customer-email">Email Address</label>
              <input
                id="customer-email"
                type="email"
                placeholder="e.g. ahmed@example.com"
                name="email"
                value={customer.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="customer-address">Address</label>
              <textarea
                id="customer-address"
                placeholder="Street, City, Province"
                name="address"
                value={customer.address}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="form-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="btn-submit">
              {isEditMode ? (
                // Save Icon
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
              ) : (
                // Add Icon
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              )}
              {isEditMode ? "Save Changes" : "Add Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCustomerForm;