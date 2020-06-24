import React, { useState } from "react";
import "./App.css";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/Navbar";



function App() {

  const[color,setColor] = useState('#60d8eb52')
  return (
    <div id="main" style={{backgroundColor:color}}>
      <Navbar changeTheme={(val)=>{setColor(val)}}/>
      <Dashboard/>
    </div>
  );
}

export default App;
