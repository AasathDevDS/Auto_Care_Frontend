import { useEffect, useState } from "react";
import api from "../../services/AxiosURL";

export default function ServiceSpare( {onClose} ) {
  const [spareparts , setSpareParts] = useState([]);
  const [selectedSparePart, setSelectedSparePart] = useState("");

  const selectedSpare = spareparts.find(
  (s) => s.id === Number(selectedSparePart)
);



  useEffect(() => {
    api.get("spareparts/")
    .then((res) => setSpareParts(res.data))
    .catch((err) => console.error("Error in Fetching SpareParts:" , err));
  } , []);

  // console.log(spareparts);

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
        <form >

          <div className="form-body">

            {/* Spare Part */}

            <div className="form-field">
              <label htmlFor="spare-part">
                Spare Part <span>*</span>
              </label>

             <select
                id="spare-part"
                name="spare_part"
                value={selectedSparePart}
                onChange={(e) => setSelectedSparePart(e.target.value)}
                required
              >
                <option value="">-- Select Spare Part --</option>

                {spareparts.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} - {s.category} - {s.supplier}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity & Unit Price */}
            <div className="form-grid-2">

              <div className="form-field">
                <label htmlFor="spare-part-quantity">
                  Quantity <span>*</span>
                </label>

                <input
                  id="spare-part-quantity"
                  type="number"
                  min="1"
                  placeholder={selectedSpare ? selectedSpare.quantity : 0}
                  name="quantity"
                  // value={formData.quantity}
                  // onChange={handleChange}
                  required
                />

                 <label>
                  Current Available Quantity :{" "}
                  <strong>{selectedSpare ? selectedSpare.quantity : 0}</strong>
                </label>
              </div>
              
               
          

              <div className="form-field">
                <label htmlFor="spare-part-price">
                  Unit Price (LKR) <span>*</span>
                </label>

                <input
                  id="spare-part-price"
                  type="number"
                  placeholder={selectedSpare ? selectedSpare.unit_price : 0}
                  name="unit_price"
                  // value={formData.unit_price}
                  // onChange={handleChange}
                  required
                />
                <label>
                  Current Unit Price is :{" "}
                  <strong>{selectedSpare ? selectedSpare.unit_price : 0}</strong>
                </label>
            
              </div>


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
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>

              Add Spare Part
            </button>

          </div>

        </form>
      </div>
</div>
  );
}