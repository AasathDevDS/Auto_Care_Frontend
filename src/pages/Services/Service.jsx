import { useEffect, useState } from "react";
import api from "../../services/AxiosURL";
import ServiceTable from "./ServiceTable";
import ServiceDetailsView from "./ServiceDetailView";

function Service(){
  const [loading , setLoading] = useState(true);
  const [service , setService] = useState([]);
  const [error , setError] = useState(null);
  const [isdetailsFormOpen , setIsDetailsFormOpen] = useState(false);
  const [details , setDetails] = useState([]) 


  useEffect(() => {
    api.get("services/")
    .then((response) => {
      setService(response.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("API Error:" , err);
      setError("Could not fetch data by API");
      setLoading(false);
    })
  }, [])

  const handleEyeClick = (service) =>{
    setDetails(service);
    setIsDetailsFormOpen(true);

  }

  const handleCloseForm = () => {
    setIsDetailsFormOpen(false);

  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      await api.delete(`services/${id}/`);
      setService((prevServices) => prevServices.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Error deleting :", err.response?.data || err.message);
      alert("Failed to delete service.");
    }
  };

  return (
  <section className="customer-page">
      <div className="page-header">
        <div className="page-header-text">
          <span className="section-tag">Service directory</span>
          <h1>Services</h1>
          <p className="page-header-desc">Manage your AutoCare service information in one place.</p>
        </div>

        <button className="add-btn" >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Service
        </button>
      </div>

      <div className="customer-panel">
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
              placeholder="Search ..."
              name="search"
              // value={query}
              // onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <span className="customer-count">
            0 of 0
            {/* {filteredCustomers.length} of {customers.length} customers */}
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
          <ServiceTable 
          services = {service}
          onEyeView={handleEyeClick}
          onDelete={handleDelete}
          />
        )}

         {isdetailsFormOpen && (
          <ServiceDetailsView 
          service={details}
          onClose={handleCloseForm}/>
        )}

        {/* Form Modal */}
        {/* {isFormOpen && (
          <AddCustomerForm
            onClose={handleCloseForm}
            onSave={handleSaveCustomer}
            initialData={editingCustomer}
          />
        )} */}
      </div>
    </section>
  );
}

export default Service;