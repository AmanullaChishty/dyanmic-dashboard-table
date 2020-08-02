import React from "react";
import "./App.css";
import Dashboard from "./pages/dashboard";
import { SideNavbar } from "./components/SideNav";

function App() {
  return (
    <div id="main">
      <SideNavbar />
      <Dashboard />
    </div>
  );
}

export default App;
