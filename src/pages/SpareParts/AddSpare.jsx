import { useState, useEffect } from "react";

function AddSparePartForm({ onClose, onSave, initialData }) {
  const isEditMode = Boolean(initialData);
  const [sparePart, setSparePart] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "",
    supplier: initialData?.supplier || "",
    quantity: initialData?.quantity ?? "",
    minimum_stock: initialData?.minimum_stock ?? "",
    unit_price: initialData?.unit_price ?? "",
  });

  // Sync form when editing another spare part
  useEffect(() => {
    if (initialData) {
      setSparePart({
        name: initialData?.name || "",
        category: initialData?.category || "",
        supplier: initialData?.supplier || "",
        quantity: initialData?.quantity ?? "",
        minimum_stock: initialData?.minimum_stock ?? "",
        unit_price: initialData?.unit_price ?? "",
      });
    } 
  }, [initialData]);

  function handleChange(event) {
    const { name, value } = event.target;

    setSparePart((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSave({
      ...sparePart,
      quantity: Number(sparePart.quantity),
      minimum_stock: Number(sparePart.minimum_stock),
      unit_price: Number(sparePart.unit_price),
    });
  }

  return (
    <div className="form-overlay">
      <div className="modal-card">

        {/* Modal Header */}
        <div className="form-header">

          <div className="form-header-left">

            <div className="form-header-icon">
              {isEditMode ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
              )}
            </div>

            <div>
              <h2>
                {isEditMode ? "Edit Spare Part" : "Add Spare Part"}
              </h2>

              <p>
                {isEditMode
                  ? "Update the details of this spare part."
                  : "Fill in the details to add a new spare part."}
              </p>
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

            {/* Part Name */}
            <div className="form-field">
              <label htmlFor="spare-part-name">
                Part Name <span>*</span>
              </label>

              <input
                id="spare-part-name"
                type="text"
                placeholder="e.g. Brake Pad"
                name="name"
                required
                value={sparePart.name}
                onChange={handleChange}
              />
            </div>

            

            {/* Category */}
            <div className="form-field">
              <label htmlFor="spare-part-category">
                Category
              </label>

              <input
                id="spare-part-category"
                type="text"
                placeholder="e.g. Braking System"
                name="category"
                value={sparePart.category}
                onChange={handleChange}
              />
            </div>

            {/* Supplier */}
            <div className="form-field">
              <label htmlFor="spare-part-number">
                Supplier <span>*</span>
              </label>

              <input
                id="spare-part-number"
                type="text"
                placeholder="e.g. Auto-Lanka"
                name="supplier"
                value={sparePart.supplier}
                onChange={handleChange}
              />
            </div>

            {/* Quantity */}
            <div className="form-field">
              <label htmlFor="spare-part-quantity">
                Quantity <span>*</span>
              </label>

              <input
                id="spare-part-quantity"
                type="number"
                min="0"
                placeholder="e.g. 25"
                name="quantity"
                required
                value={sparePart.quantity}
                onChange={handleChange}
              />
            </div>

            
            {/* Mini Stock Count */}
            <div className="form-field">
              <label htmlFor="spare-part-quantity">
                Minimum stock <span>*</span>
              </label>

              <input
                id="spare-part-quantity"
                type="number"
                min="0"
                placeholder="e.g. 25"
                name="minimum_stock"
                required
                value={sparePart.minimum_stock}
                onChange={handleChange}
              />
            </div>

            {/* Unit Price */}
            <div className="form-field">
              <label htmlFor="spare-part-price">
                Unit Price (Rs.) <span>*</span>
              </label>

              <input
                id="spare-part-price"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 4500.00"
                name="unit_price"
                required
                value={sparePart.unit_price}
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
              {isEditMode ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              )}

              {isEditMode ? "Save Changes" : "Add Spare Part"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default AddSparePartForm;