import { useState, useEffect } from "react";
import api from "../../services/AxiosURL"; // உங்கள் axios api instance path

function AddServiceForm({ onClose, onSave, initialData }) {
  // initialData இருந்தால் Edit mode (Boolean flag)
  const isEditMode = Boolean(initialData);
  console.log(initialData.mechanic);


  // Dropdown options store செய்ய states
  const [vehicles, setVehicles] = useState([]);
  const [mechanics, setMechanics] = useState([]);

  // Service Form State
  const [formData, setFormData] = useState({
    vehicle: initialData?.vehicle || "",
    mechanic: initialData?.mechanic || "",
    service_type: initialData?.service_type || "Full Service",
    service_date: initialData?.service_date ? initialData.service_date.substring(0, 16) : "",
    status: initialData?.status || "PENDING",
    estimated_cost: initialData?.estimated_cost || "",
    actual_cost: initialData?.actual_cost || "",
    mileage_at_service: initialData?.mileage_at_service || "",
    problem_description: initialData?.problem_description || "",
    notes: initialData?.notes || "",
  });

  // Vehicles மற்றும் Mechanics dropdown list-ஐ fetch செய்ய
  useEffect(() => {
    // 1. Fetch Vehicles
    api.get("vehicles/")
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error("Error fetching vehicles:", err));

    // 2. Fetch Mechanics (API endpoint இருந்தால்)
    api.get("mechanics/")
      .then((res) => setMechanics(res.data))
      .catch((err) => console.error("Error fetching mechanics:", err));
  }, []);

  // initialData மாறினால் form state-ஐ sync செய்ய
  useEffect(() => {
    if (initialData) {
      setFormData({
        vehicle: initialData.vehicle || "",
        mechanic: initialData.mechanic || "",
        service_type: initialData.service_type || "Full Service",
        service_date: initialData.service_date ? initialData.service_date.substring(0, 16) : "",
        status: initialData.status || "PENDING",
        estimated_cost: initialData.estimated_cost || "",
        actual_cost: initialData.actual_cost || "",
        mileage_at_service: initialData.mileage_at_service || "",
        problem_description: initialData.problem_description || "",
        notes: initialData.notes || "",
      });
    }
  }, [initialData]);

  // Input change handler
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  // Form submit handler
  function handleSubmit(event) {
    // console.log(formData);
    event.preventDefault();

    // DRF Payload format (Numbers conversion)
    const payload = {
      ...formData,
      vehicle: Number(formData.vehicle),
      mechanic: formData.mechanic ? Number(formData.mechanic) : null,
      mileage_at_service: formData.mileage_at_service ? Number(formData.mileage_at_service) : null,
      estimated_cost: formData.estimated_cost ? Number(formData.estimated_cost) : 0,
      actual_cost: formData.actual_cost ? Number(formData.actual_cost) : null,
    };

    onSave(payload);
    console.log(payload);
    
  }

  return (
    <div className="form-overlay">
      <div className="modal-card modal-card--wide">
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
              <h2>{isEditMode ? "Edit Service" : "Add New Service"}</h2>
              <p>
                {isEditMode
                  ? "Update the details of this service record."
                  : "Fill in the details to create a new service record."}
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
          <div className="form-body form-body--scrollable">
            
            {/* Vehicle Dropdown */}
            <div className="form-field">
              <label htmlFor="service-vehicle">
                Vehicle <span>*</span>
              </label>
              <select
                id="service-vehicle"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Vehicle --</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.vehicle_number} {v.brand ? `(${v.brand} ${v.model || ""})` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Type & Status */}
            <div className="form-grid-2">
              <div className="form-field">
                <label htmlFor="service-type">Service Type <span>*</span></label>
                <select
                  id="service-type"
                  name="service_type"
                  value={formData.service_type}
                  onChange={handleChange}
                  required
                >
                  <option value="Full Service">Full Service</option>
                  <option value="Oil Change">Oil Change</option>
                  <option value="Body Wash">Body Wash</option>
                  <option value="Engine Repair">Engine Repair</option>
                  <option value="Tire Alignment">Tire Alignment</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="service-status">Status <span>*</span></label>
                <select
                  id="service-status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="PENDING">PENDING</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
            </div>

            {/* Service Date */}
            <div className="form-field">
              <label htmlFor="service-date">Service Date & Time <span>*</span></label>
              <input
                id="service-date"
                type="datetime-local"
                name="service_date"
                value={formData.service_date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Costs */}
            <div className="form-grid-2">
              <div className="form-field">
                <label htmlFor="service-est-cost">Estimated Cost (LKR) <span>*</span></label>
                <input
                  id="service-est-cost"
                  type="number"
                  placeholder="5000.00"
                  name="estimated_cost"
                  value={formData.estimated_cost}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="service-actual-cost">Actual Cost (LKR)</label>
                <input
                  id="service-actual-cost"
                  type="number"
                  placeholder="5750.00"
                  name="actual_cost"
                  value={formData.actual_cost}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Mileage & Mechanic */}
            <div className="form-grid-2">
              <div className="form-field">
                <label htmlFor="service-mileage">Mileage at Service (km)</label>
                <input
                  id="service-mileage"
                  type="number"
                  placeholder="15800"
                  name="mileage_at_service"
                  value={formData.mileage_at_service}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="service-mechanic">Assign Mechanic</label>
                <select
                  id="service-mechanic"
                  name="mechanic"
                  value={formData.mechanic}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Optional / Select --</option>
                  {mechanics.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Problem Description */}
            <div className="form-field">
              <label htmlFor="service-problem">Problem Description <span>*</span></label>
              <textarea
                id="service-problem"
                placeholder="Describe the problem reported by the customer..."
                name="problem_description"
                value={formData.problem_description}
                onChange={handleChange}
              />
            </div>

            {/* Notes */}
            <div className="form-field">
              <label htmlFor="service-notes">Internal Notes</label>
              <textarea
                id="service-notes"
                placeholder="Mechanic feedback, spare parts used, etc."
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="textarea--sm"
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
              {isEditMode ? "Save Changes" : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddServiceForm;