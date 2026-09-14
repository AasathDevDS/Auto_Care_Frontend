import { useState } from "react";
import Customer from "./pages/Customers/Customer";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={`app-shell${sidebarCollapsed ? " sidebar-is-collapsed" : ""}`}>
      <Sidebar collapsed={sidebarCollapsed} />

      <div className="main-area">
        <Navbar onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)} />
        <main className="content">
          <Customer />
        </main>
      </div>
    </div>
  );
}

export default App;
