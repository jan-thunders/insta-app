import React,{useState} from "react";
import "./style.css"
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";

import {Routes,Route} from "react-router-dom";


const App = () => {
  
    return(
        <div>
             <Routes>
                <Route path="/" element={<Signup/>}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/dashboard" element={<Dashboard />}/>
             </Routes>
        </div>
    )
}

export default App;