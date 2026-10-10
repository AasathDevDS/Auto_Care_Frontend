import { useEffect, useState } from "react";
import api from "../../services/AxiosURL";

export default function ServiceSpare({ onClose, serviceId }) {
  const [spareparts, setSpareParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    service: serviceId,
    spare_part: "",
    quantity: "",
    unit_price: "",
  });

  // Fetch spare parts on mount
  useEffect(() => {
    api
      .get("spareparts/")
      .then((res) => setSpareParts(res.data))
      .catch((err) => {
        console.error("Error in Fetching SpareParts:", err);
        setError("Spare parts விபரங்களை load செய்ய முடியவில்லை.");
      });
  }, []);

  // Selected spare part object
  const selectedSpare = spareparts.find(
    (s) => s.id === Number(formData.spare_part)
  );

  // Spare part dropdown handler (Auto-fills price and resets quantity)
  function handleSparePartChange(event) {
    const selectedId = event.target.value;
    const part = spareparts.find((s) => s.id === Number(selectedId));

    setFormData((prevValue) => ({
      ...prevValue,
      spare_part: selectedId,
      unit_price: part ? part.unit_price : "",
      quantity: "",
    }));
  }

  // Generic input change handler
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  // Form submission with backend API call and validation
  async function handleSubmit(event) {
    // console.log(A);
    
    event.preventDefault();
    setError(null);

    // Stock availability validation
    if (selectedSpare && Number(formData.quantity) > selectedSpare.quantity) {
      setError(`Stock போதாது! இருப்பு: ${selectedSpare.quantity}`);
      return;
    }

    setLoading(true);

    try {
      // console.log(formData);
      await api.post("service-spare-parts/", {
        service: serviceId,
        spare_part_name: Number(formData.spare_part),
        quantity: Number(formData.quantity),
        unit_price: Number(formData.unit_price),
      });
      // console.log(formData);
      onClose();
    } catch (err) {
      console.error("Error submitting spare part:", err);
      const apiError =
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        "Error submitting spare part. Please try again.";
      setError(apiError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-overlay">
      <div className="modal-card modal-card--wide">

        {/* Modal Header */}
        <div className="form-header">
          <div className="form-header-left">
            <div className="form-header-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <div>
              <h2>Add Spare Part</h2>
              <p>Add a spare part used for this service.</p>
            </div>
          </div>

          <button
            type="button"
            className="form-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-body">

            {/* Error Message */}
            {error && (
              <div
                style={{
                  padding: "10px",
                  marginBottom: "15px",
                  borderRadius: "6px",
                  backgroundColor: "#fee2e2",
                  color: "#b91c1c",
                  fontSize: "14px",
                }}
              >
                {error}
              </div>
            )}

            {/* Spare Part Dropdown */}
            <div className="form-field">
              <label htmlFor="spare-part">
                Spare Part <span>*</span>
              </label>

              <select
                id="spare-part"
                name="spare_part"
                value={formData.spare_part}
                onChange={handleSparePartChange}
                required
              >
                <option value="">-- Select Spare Part --</option>
                {spareparts.map((s) => (
                  <option key={s.id} value={s.id} disabled={s.quantity <= 0}>
                    {s.name} - {s.category} ({s.quantity <= 0 ? "Out of Stock" : `Stock: ${s.quantity}`})
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity & Unit Price */}
            <div className="form-grid-2">

              {/* Quantity */}
              <div className="form-field">
                <label htmlFor="spare-part-quantity">
                  Quantity <span>*</span>
                </label>

                <input
                  id="spare-part-quantity"
                  type="number"
                  min="1"
                  max={selectedSpare ? selectedSpare.quantity : undefined}
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder={
                    selectedSpare
                      ? `Max: ${selectedSpare.quantity}`
                      : "Enter quantity"
                  }
                  disabled={!selectedSpare || selectedSpare.quantity <= 0}
                  required
                />

                <small style={{ marginTop: "4px", color: "#6b7280" }}>
                  Current Available Quantity:{" "}
                  <strong>
                    {selectedSpare ? selectedSpare.quantity : 0}
                  </strong>
                </small>
              </div>

              {/* Unit Price */}
              <div className="form-field">
                <label htmlFor="spare-part-price">
                  Unit Price (LKR) <span>*</span>
                </label>

                <input
                  id="spare-part-price"
                  type="number"
                  step="0.01"
                  min="0"
                  name="unit_price"
                  value={formData.unit_price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />

                <small style={{ marginTop: "4px", color: "#6b7280" }}>
                  Standard Unit Price:{" "}
                  <strong>
                    {selectedSpare ? selectedSpare.unit_price : 0}
                  </strong>
                </small>
              </div>

            </div>
          </div>

          {/* Modal Footer */}
          <div className="form-footer">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-submit"
              disabled={loading || !selectedSpare || selectedSpare.quantity <= 0}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              {loading ? "Adding..." : "Add Spare Part"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}