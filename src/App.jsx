import { useState } from "react";
import { Routes, Route } from "react-router-dom";

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

  return (
    <div
      className={`app-shell${
        sidebarCollapsed ? " sidebar-is-collapsed" : ""
      }`}
    >
      <Sidebar />

      <div className="main-area">
        <Navbar
          onToggleSidebar={() =>
            setSidebarCollapsed((prev) => !prev)
          }
        />

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/vehicles" element={<Vehicle />} />
            <Route path="/services" element={<Service />} />
            <Route path="/mechanics" element={<Mechanics />} />
            <Route path="/spare-parts" element={<SP />} />
            <Route path="/invoices" element={<Invoices />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;