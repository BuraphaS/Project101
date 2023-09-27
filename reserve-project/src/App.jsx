
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar1 from './component/Navbar'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pageUser/homePage';
import Dashboard from './pageAdmin/dashboard';
import Edit_home from './pageAdmin/edit_home';
import Edit_payment from './pageAdmin/edit_payment';
import Edit_rooms from './pageAdmin/edit_rooms';
import Edit_users from './pageAdmin/info_user';
import Report from './pageAdmin/report';
function App() {
  

  return (
    <><Navbar1 />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/edit_home" element={<Edit_home />} />
      <Route path="/edit_payment" element={<Edit_payment />} />
      <Route path="/edit_rooms" element={<Edit_rooms />} />
      <Route path="/edit_users" element={<Edit_users />} />
      <Route path="/report" element={<Report />} />
      
    </Routes>
      
      {/* <Dashboard /> */}
      {/* <HomePage /> */}
    </>
  )
}

export default App
