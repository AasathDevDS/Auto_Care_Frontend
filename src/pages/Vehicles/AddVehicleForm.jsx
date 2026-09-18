import { useEffect, useState } from "react";
import api from "../../services/CustomerServices";

function AddVehicleForm({onClose , onSave , initialData}){
  const isEditMode = Boolean(initialData);
  const [customers , setCustomers] = useState([]);
  const [error , setError] = useState(null);
  const [formData, setFormData] = useState({
    customer: initialData?.customer || "", // Backend Foreign Key ID
    vehicle_number: initialData?.vehicle_number || "",
    current_mileage: initialData?.current_mileage || "",
    brand: initialData?.brand || "",
    model: initialData?.model || "",
    vehicle_type: initialData?.vehicle_type || "",
    year: initialData?.year || "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialData) {
      setFormData({
    customer: initialData?.customer || "",
    vehicle_number: initialData?.vehicle_number || "",
    current_mileage: initialData?.current_mileage || "",
    brand: initialData?.brand || "",
    model: initialData?.model || "",
    vehicle_type: initialData?.vehicle_type || "",
    year: initialData?.year || "",
      });
    }
  }, [initialData]);
  

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

  function handleChange(e) {
    const {name , value} = e.target;
    setFormData((preValue) => ({
      ...preValue,
      [name]:value,
    }))
  }

  function handleSubmit(e) {
  e.preventDefault();

  const payload = {
    ...formData,
    customer: Number(formData.customer),
    current_mileage: formData.current_mileage ? Number(formData.current_mileage) : null,
    vehicle_type : formData.vehicle_type.toUpperCase(),
    year: formData.year ? Number(formData.year) : null,
  };

  onSave(payload);
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
              <h2>{isEditMode ? "Edit Vehicle" : "Add Vehicle"}</h2>
              <p>
                {isEditMode
                  ? "Update the details of this vehicle."
                  : "Fill in the details to register a new vehicle."}
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
              <label htmlFor="customer-select">
                Customer Name <span>*</span>
              </label>
              <select
                id="customer-select"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Customer --</option>
                {customers.map((cust) => (
                  <option key={cust.id} value={cust.id}>
                    {cust.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="customer-phone">
                Vehicle Number <span>*</span>
              </label>
              <input
                id="vehicle-number"
                type="text"
                placeholder="e.g. BCC-8430"
                name="vehicle_number"
                value={formData.vehicle_number}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="customer-email">Mileage</label>
              <input
                id="vehicle-mileage"
                type="number"
                placeholder="e.g. 19800"
                name="current_mileage"
                value={formData.current_mileage}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="customer-address">Brand</label>
              <input
                id="vehicle-brand"
                placeholder="Honda"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="customer-address">Model</label>
              <input
                id="vehicle-model"
                placeholder="Grace"
                name="model"
                value={formData.model}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="vehicle-type">Vehicle Type</label>
              <select
                id="vehicle-type"
                name="vehicle_type"
                value={formData.vehicle_type}
                onChange={handleChange}
                required>
                <option value="">-- Select Vehicle Type --</option>
                <option value="CAR">Car</option>
                <option value="VAN">Van</option>
                <option value="MOTORCYCLE">Motorcycle</option>
                <option value="THREE_WHEELER">Three Wheeler</option>
                <option value="SUV">SUV</option>
              </select>
          </div>
            <div className="form-field">
              <label htmlFor="customer-address">Model Year</label>
              <input
                type="number"
                id="year"
                placeholder="2019"
                name="year"
                value={formData.year}
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
              {isEditMode ? "Save Changes" : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleForm;