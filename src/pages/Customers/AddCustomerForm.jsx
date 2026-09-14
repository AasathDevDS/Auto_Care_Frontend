import "./AddCustomerForm.css";
import { useState } from "react";

function AddCustomerForm({ onClose, onAdd }) {

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });


  // Input values change
  function handleChange(event) {

    const { name, value } = event.target;

    setCustomer((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }


  // Form submit
  function handleSubmit(event) {

    event.preventDefault();

    
    // Send customer object to Customer.jsx
    onAdd(customer);

    // Close modal
    onClose();
  }


  return (
    <div className="form-overlay">

      <div className="customer-form">

        {/* Modal Header */}
        <div className="form-header">
          <div className="form-header-left">
            <div className="form-header-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
            </div>
            <div>
              <h2>Add Customer</h2>
              <p>Fill in the details to register a new customer.</p>
            </div>
          </div>

          <button type="button" className="form-close-btn" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
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
                value={customer.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="customer-email">
                Email Address
              </label>
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
              <label htmlFor="customer-address">
                Address
              </label>
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
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="btn-submit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Customer
            </button>
          </div>
        </form>

      </div>

    </div>
  );
}

export default AddCustomerForm;