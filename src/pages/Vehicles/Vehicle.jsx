function Vehicle(){
  return (
    
    <section className="vehicle-page">
      <div className="page-header">
        <div className="page-header-text">
          <span className="section-tag">Vehicle directory</span>
          <h1>Vehicle</h1>
          <p className="page-header-desc">Manage your AutoCare vehicle information in one place.</p>
        </div>

        <button className="add-btn" >
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
            />
          </div>
          <span className="customer-count">
          </span>
        </div>
      </div>
    </section>
  
  )
};

export default Vehicle;