import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Customer from "./pages/Customers/Customer";
import Vehicle from "./pages/Vehicles/Vehicle";
import Service from "./pages/Services/Service";
import SP from "./pages/SpareParts/SpareParts";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Mechanics from "./pages/Mechanics/Mechanics";
import Invoices from "./pages/Invoices/Invoices";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./Route/ProtectedRoute"; //  Guard Import

import "./App.css";
import "./styles/shared.css";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  // Login page-க்கு மட்டும் தனியாக render ஆகும்
  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className={`app-shell${sidebarCollapsed ? " sidebar-is-collapsed" : ""}`}>
      <Sidebar collapsed={sidebarCollapsed} />

      <div className="main-area">
        <Navbar onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)} />

        <main className="content">
          <Routes>
            {/* Root path-ல் token இருந்தால் dashboard, இல்லையென்றால் login */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* 👇 அனைத்து முக்கிய pages-ம் இப்போது ProtectedRoute-க்குள் பாதுகாக்கப்பட்டுள்ளன */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customers" element={<Customer />} />
              <Route path="/vehicles" element={<Vehicle />} />
              <Route path="/services" element={<Service />} />
              <Route path="/mechanics" element={<Mechanics />} />
              <Route path="/spare-parts" element={<SP />} />
              <Route path="/invoices" element={<Invoices />} />
            </Route>

            {/* தெரியாத ஏதேனும் URL அடித்தால் dashboard-க்கு அனுப்ப */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;