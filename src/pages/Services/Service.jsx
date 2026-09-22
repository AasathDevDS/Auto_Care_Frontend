import { useEffect, useState } from "react";
import api from "../../services/AxiosURL";
import ServiceTable from "./ServiceTable";
import ServiceDetailsView from "./ServiceDetailView";
import AddServiceForm from "./AddService"; // நீங்கள் உருவாக்கிய Add/Edit Form

function Service() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Details View Modal State
  const [isDetailsFormOpen, setIsDetailsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Add / Edit Form Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  // 1. Initial Data Fetch
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    setLoading(true);
    api.get("services/")
      .then((response) => {
        setServices(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Could not fetch service data from API.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 2. Details Modal Handlers
  const handleEyeClick = (serviceItem) => {
    setSelectedService(serviceItem);
    setIsDetailsFormOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsFormOpen(false);
    setSelectedService(null);
  };

  // 3. Add & Edit Form Handlers
  const handleOpenAddModal = () => {
    setEditingService(null); // Clear previous edit data
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (serviceItem) => {
    setEditingService(serviceItem);
    setIsFormOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormOpen(false);
    setEditingService(null);
  };

  // 4. Save Service (POST for Add, PUT for Edit)
  const handleSaveService = async (formData) => {
    console.log(formData);
    try {
      if (editingService) {
        // Edit Mode (PUT)
        const response = await api.put(`services/${editingService.id}/`, formData);
        setServices((prev) =>
          prev.map((s) => (s.id === editingService.id ? response.data : s))
        );
      } else {
        // Add Mode (POST)
        
        
        const response = await api.post("services/", formData);
        setServices((prev) => [response.data, ...prev]);
      }
      handleCloseFormModal();
    } catch (err) {
      console.error("Error saving service:", err.response?.data || err.message);
      alert("Failed to save service record. Please check the inputs.");
    }
  };

  // 5. Delete Service
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service record?")) return;

    try {
      await api.delete(`services/${id}/`);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Error deleting:", err.response?.data || err.message);
      alert("Failed to delete service.");
    }
  };

  // Search Filter Logic (filters by service_type, vehicle_number, or status)
  const filteredServices = services.filter((s) => {
    const q = searchQuery.toLowerCase();
    const typeMatch = s.service_type?.toLowerCase().includes(q);
    const vehicleMatch = s.vehicle_number?.toLowerCase().includes(q) || String(s.vehicle).includes(q);
    const statusMatch = s.status?.toLowerCase().includes(q);
    return typeMatch || vehicleMatch || statusMatch;
  });

  return (
    <section className="module-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-text">
          <span className="section-tag">Service directory</span>
          <h1>Services</h1>
          <p className="page-header-desc">Manage your AutoCare service information in one place.</p>
        </div>

        <button className="add-btn" onClick={handleOpenAddModal}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Service
        </button>
      </div>

      <div className="module-panel">
        {/* Table Toolbar */}
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
              placeholder="Search by vehicle, type, or status..."
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <span className="record-count">
            {filteredServices.length} of {services.length} services
          </span>
        </div>

        {/* Loading Feedback */}
        {loading && (
          <div className="status-card status-loading">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <span>Loading services...</span>
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

        {/* Service Table Component */}
        {!loading && !error && (
          <ServiceTable
            services={filteredServices}
            onEyeView={handleEyeClick}
            onEdit={handleOpenEditModal}
            onDelete={handleDelete}
          />
        )}

        {/* View Details Modal */}
        {isDetailsFormOpen && (
          <ServiceDetailsView
            service={selectedService}
            onClose={handleCloseDetails}
            onEdit={(serviceToEdit) => {
              handleCloseDetails();
              handleOpenEditModal(serviceToEdit);
            }}
          />
        )}

        {/* Add / Edit Service Form Modal */}
        {isFormOpen && (
          <AddServiceForm
            onClose={handleCloseFormModal}
            onSave={handleSaveService}
            initialData={editingService}
          />
        )}
      </div>
    </section>
  );
}

export default Service;