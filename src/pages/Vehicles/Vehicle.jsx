import { useEffect, useState } from "react";
import api from "../../services/CustomerServices";
import VehicleTable from "./VehicleTable";
import AddVehicleForm from "./AddVehicleForm";

function Vehicle(){ 
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [vehicle , setVehicle] = useState([])
  const [loading , setLoading] = useState(true)
  const [errors , setErrors] = useState(null)
  const [query , setQuery] = useState("")

  const filteredVehicles = vehicle.filter((veh) => {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return true;

    const customerNameMatch = veh.customer_name?.toLowerCase().includes(searchTerm);
    const vehicleNumberMatch = veh.vehicle_number?.toLowerCase().includes(searchTerm);
    const typeMatch = veh.vehicle_type?.toLowerCase().includes(searchTerm);
    const modelMatch = veh.model?.toLowerCase().includes(searchTerm);
    const brandMatch = veh.brand?.toLowerCase().includes(searchTerm);

    return customerNameMatch || typeMatch || modelMatch || brandMatch || vehicleNumberMatch ;
  })
  useEffect(() => {
    api.get("vehicles/")
      .then((response) => {
        // console.log(response.data)
        setVehicle(response.data);
        setLoading(false)
      })
      .catch((err) => {
        console.error("API Error:", err);
        setErrors("Could not fetch data!");
        setLoading(false);
      });
  }, []);

  
  const handleEditClick = (vehicle) => {
    console.log(vehicle);
    setEditingVehicle(vehicle);
    setIsFormOpen(true);
  };
  const handleDelete = async (id) => {    
    if (!window.confirm("Are you sure you want to delete this veicle?")) return;

    try {
      await api.delete(`vehicles/${id}/`);
      setCustomers((prevVehicles) => prevVehicles.filter((v) => v.id !== id));
    } catch (err) {
      console.error("Error deleting customer:", err.response?.data || err.message);
      alert("Failed to delete vehicle.");
    }
  }

  const handleSaveVehicle = async (vehicleData) => {
    //POST DATA
    // console.log(vehicleData);
    const response = await api.post("vehicles/" , vehicleData);
    setVehicle((preValue) => [...preValue , response.data]);
    setIsFormOpen(false);
  }

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    
    <section className="vehicle-page">
      <div className="page-header">
        <div className="page-header-text">
          <span className="section-tag">Vehicle directory</span>
          <h1>Vehicle</h1>
          <p className="page-header-desc">Manage your AutoCare vehicle information in one place.</p>
        </div>

        <button className="add-btn" onClick={() => setIsFormOpen(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Vehicle
        </button>
      </div>

      <div className="vehicle-panel">
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
              placeholder="Search "
              name="search"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <span className="customer-count">
            {filteredVehicles.length} of {vehicle.length} 
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
        {errors && (
          <div className="status-card status-error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errors}</span>
          </div>
        )}

        {!loading && !errors && (
          <VehicleTable 
          vehicles = {filteredVehicles}
          onDelete={handleDelete}
          onEdit = {handleEditClick}/>
        )}

        {/* Form Modal */}
        {isFormOpen && (
          <AddVehicleForm
            onClose={handleCloseForm}
            onSave={handleSaveVehicle}
            initialData={editingVehicle}
          />
        )}
        

      </div>
    </section>
  
  )
};

export default Vehicle;