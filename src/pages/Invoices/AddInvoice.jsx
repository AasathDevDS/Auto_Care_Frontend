import { useState, useEffect } from "react";
import api from "../../services/AxiosURL";

export default function AddInvoiceForm({ onClose, onSave, initialData }) {
  const isEditMode = Boolean(initialData);
  const [services, setServices] = useState([]);

  const [invoice, setInvoice] = useState({
    service: initialData?.service || "",
    service_charge: initialData?.service_charge || "0",
    parts_cost: initialData?.parts_cost || "0",
    discount: initialData?.discount || "0",
    invoice_date : initialData?.invoice_date ? initialData.invoice_date.substring(0,16) : "",
    total_amount: initialData?.total_amount || "0",
    paid_amount: initialData?.paid_amount || "0",
    remaining_amount: initialData?.remaining_amount || "0",
    payment_status: initialData?.payment_status || "PENDING",
    payment_method: initialData?.payment_method || "CASH",
    notes: initialData?.notes || "",
  });

  // Bug Fix 1: initialData மாறும் போது சரியான service ID-ஐ sync செய்தல்
  useEffect(() => {
    if (initialData) {
      setInvoice({
        service: initialData.service || "",
        service_charge: initialData.service_charge || "0.00",
        parts_cost: initialData.parts_cost || "0.00",
        discount: initialData.discount || "0.00",
        total_amount: initialData.total_amount || "0.00",
        paid_amount: initialData.paid_amount || "0.00",
        remaining_amount: initialData.remaining_amount || "0.00",
        payment_status: initialData.payment_status || "PENDING",
        payment_method: initialData.payment_method || "CASH",
        notes: initialData.notes || "",
      });
    }
  }, [initialData]);

  // Fetch Services
  useEffect(() => {
    api.get("services/")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setInvoice((prev) => {
      const updated = { ...prev, [name]: value };

      // Number calculations
      const serviceCharge = parseFloat(name === "service_charge" ? value : updated.service_charge) || 0;
      const partsCost = parseFloat(name === "parts_cost" ? value : updated.parts_cost) || 0;
      const discount = parseFloat(name === "discount" ? value : updated.discount) || 0;
      const paid = parseFloat(name === "paid_amount" ? value : updated.paid_amount) || 0;

      const total = Math.max(0, serviceCharge + partsCost - discount);
      const remaining = Math.max(0, total - paid);

      // Auto update status
      let status = updated.payment_status;
      if (paid >= total && total > 0) {
        status = "PAID";
      } else if (paid > 0 && paid < total) {
        status = "PARTIALLY_PAID";
      } else {
        status = "PENDING";
      }

      return {
        ...updated,
        total_amount: total.toFixed(2),
        remaining_amount: remaining.toFixed(2),
        payment_status: status,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!invoice.service) {
      alert("Please select a service vehicle.");
      return;
    }
    // Clean payload pass செய்தல்
    onSave(invoice);
  }

  return (
    <div className="form-overlay">
      <div className="modal-card">

        {/* Modal Header */}
        <div className="form-header">
          <div className="form-header-left">
            <div className="form-header-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>

            <div>
              <h2>{isEditMode ? "Edit Invoice" : "Generate Invoice"}</h2>
              <p>
                {isEditMode && initialData?.vehicle_number
                  ? `Vehicle: ${initialData.vehicle_number} (${initialData.vehicle_brand || ""} ${initialData.vehicle_model || ""})`
                  : "Fill in the billing details for the service."}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="form-body">

            {/* Service Vehicle Dropdown */}
            {/* Bug Fix 2: name="service" மற்றும் disabled in edit mode */}
            <div className="form-field">
              <label htmlFor="service-vehicle">
                Service Vehicle Details <span>*</span>
              </label>
              <select
                id="service-vehicle"
                name="service"
                value={invoice.service}
                onChange={handleChange}
                disabled={isEditMode}
                required
              >
                <option value="">-- Select Service Vehicle --</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.vehicle_number} {s.vehicle_brand ? `(${s.vehicle_brand} ${s.vehicle_model || ""})` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Charge */}
            <div className="form-field">
              <label htmlFor="service-charge">Service Charge (Rs.) <span>*</span></label>
              <input
                id="service-charge"
                type="number"
                step="0.01"
                min="0"
                name="service_charge"
                value={invoice.service_charge}
                onChange={handleChange}
                required
              />
            </div>

            {/* Parts Cost */}
            <div className="form-field">
              <label htmlFor="parts-cost">Parts Cost (Rs.) <span>*</span></label>
              <input
                id="parts-cost"
                type="number"
                step="0.01"
                min="0"
                name="parts_cost"
                value={invoice.parts_cost}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="invoice-date">Invoice Date & Time <span>*</span></label>
              <input
                id="invoice-date"
                type="datetime-local"
                name="invoice_date"
                value={invoice.invoice_date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Discount */}
            <div className="form-field">
              <label htmlFor="discount">Discount (Rs.)</label>
              <input
                id="discount"
                type="number"
                step="0.01"
                min="0"
                name="discount"
                value={invoice.discount}
                onChange={handleChange}
              />
            </div>

            {/* Total Amount (Read-only) */}
            <div className="form-field">
              <label htmlFor="total-amount">Total Amount (Rs.)</label>
              <input
                id="total-amount"
                type="number"
                step="0.01"
                name="total_amount"
                value={invoice.total_amount}
                readOnly
              />
            </div>

            {/* Paid Amount */}
            <div className="form-field">
              <label htmlFor="paid-amount">Paid Amount (Rs.) <span>*</span></label>
              <input
                id="paid-amount"
                type="number"
                step="0.01"
                min="0"
                name="paid_amount"
                value={invoice.paid_amount}
                onChange={handleChange}
                required
              />
            </div>

            {/* Remaining Amount (Read-only) */}
            <div className="form-field">
              <label htmlFor="remaining-amount">Remaining Amount (Rs.)</label>
              <input
                id="remaining-amount"
                type="number"
                step="0.01"
                name="remaining_amount"
                value={invoice.remaining_amount}
                readOnly
              />
            </div>

            {/* Payment Method */}
            <div className="form-field">
              <label htmlFor="payment-method">Payment Method <span>*</span></label>
              <select
                id="payment-method"
                name="payment_method"
                value={invoice.payment_method}
                onChange={handleChange}
                required
              >
                <option value="CASH">Cash</option>
                <option value="CARD">Card</option>
                <option value="ONLINE">Online Transfer</option>
              </select>
            </div>

            {/* Payment Status */}
            <div className="form-field">
              <label htmlFor="payment-status">Payment Status <span>*</span></label>
              <select
                id="payment-status"
                name="payment_status"
                value={invoice.payment_status}
                onChange={handleChange}
                required
              >
                <option value="PAID">Paid</option>
                <option value="PARTIALLY_PAID">Partial</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>

            {/* Notes */}
            <div className="form-field" style={{ gridColumn: "1 / -1" }}>
              <label htmlFor="invoice-notes">Notes</label>
              <textarea
                id="invoice-notes"
                name="notes"
                rows="2"
                placeholder="e.g. Regular Customer, Warranty applied"
                value={invoice.notes}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Footer */}
          <div className="form-footer">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-submit"
            >
              {isEditMode ? "Save Changes" : "Create Invoice"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}