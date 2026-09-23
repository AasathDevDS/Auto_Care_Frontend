import { useEffect, useState } from "react";
import api from "../../services/AxiosURL";
import MechanicTable from "./MechanicsTable";
import AddMechanic from "./AddMechanic";


function Mechanics(){
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mechanics , setMechanics] = useState([]);
  const [editingMechanic , setEditingMechanic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // Search filter
  const filteredMechanics = mechanics.filter((mechanic) => {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return true;

    const nameMatch = mechanic.name?.toLowerCase().includes(searchTerm);
    const phoneMatch = mechanic.phone?.toLowerCase().includes(searchTerm);
    const specialMatch = mechanic.specialization?.toLowerCase().includes(searchTerm);

    return nameMatch || phoneMatch || specialMatch; });


  useEffect(() => {
    api.get("mechanics/")
    .then((response) => {
      // console.log(response.data);
      setMechanics(response.data);
      setLoading(false);
    })
    .catch ((err) => {
      console.error("API Error:", err);
      setError("Could not fetch data!");
      setLoading(false);
    });
  }, []);
  const handleClose = () => {
    setIsFormOpen(false);
  }

  const handleSaveMechanic = async (mechanic) => {
    console.log(mechanic);
    const response = await api.post("mechanics/", mechanic);
    setMechanics((prev) => [...prev, response.data]);
    setIsFormOpen(false);
    
  };

  const handleEditClick = (mechanic) => {
    setEditingMechanic(mechanic);
    setIsFormOpen(true);
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this mechanic?")) return;

    try {
      await api.delete(`mechanics/${id}/`);
      setMechanics((prevMechanics) => prevMechanics.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Error deleting mechanic:", err.response?.data || err.message);
      alert("Failed to delete mechanic.");
    }
  } 
  

  return (
  <section className="module-page">
      <div className="page-header">
        <div className="page-header-text">
          <span className="section-tag">Mechnics directory</span>
          <h1>Mechanics</h1>
          <p className="page-header-desc">Manage your AutoCare mechanic information in one place.</p>
        </div>

        <button className="add-btn" onClick={() => setIsFormOpen(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Mechanic
        </button>
      </div>

      <div className="module-panel">
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
              placeholder="Search .... "
              name="search"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <span className="record-count">
             {filteredMechanics.length} of {mechanics.length} Mechanics
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
          <MechanicTable
            mechanics={filteredMechanics}
            onDelete={handleDelete}
            onEdit={handleEditClick}
          />
        )}

        {/* Form Modal */}
        {isFormOpen && (
          <AddMechanic
            onClose={handleClose}
            onSave={handleSaveMechanic}
            initialData={editingMechanic}
          />
        )}
      </div>
    </section>
  );

};

export default Mechanics;