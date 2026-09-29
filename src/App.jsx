import { useState } from "react";
import Customer from "./pages/Customers/Customer";
import Vehicle from "./pages/Vehicles/Vehicle";
import Service from "./pages/Services/Service";
import SP from "./pages/SpareParts/SpareParts";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Mechanics from "./pages/Mechanics/Mechanics";
import Invoices from "./pages/Invoices/Invoices";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./App.css";
import "./styles/shared.css";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab , setActiveTab] = useState("Dashboard");

  return (
    <div className={`app-shell${sidebarCollapsed ? " sidebar-is-collapsed" : ""}`}>
      <Sidebar 
      collapsed={sidebarCollapsed}
      activeTab={activeTab}
      setActiveTab={setActiveTab} />

      <div className="main-area">
        <Navbar 
        onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)} 
        activeTab={activeTab}
        />
        <main className="content">
          {activeTab === "Dashboard" && <Dashboard />}
          {activeTab === "Customers" && <Customer />}
          {activeTab === "Vehicles" && <Vehicle />}
          {activeTab === "Services" && <Service />}
          {activeTab === "Mechanics" && <Mechanics />}
          {activeTab === "Spare Parts" && <SP/>}
          {activeTab === "Invoices" && <Invoices />}
        </main>
      </div>
    </div>
  );
}

export default App;
