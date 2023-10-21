
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
import Edit_meeting from './pageAdmin/edit_meeting';
import Edit_Gym from './pageAdmin/edit_gym';
import Edit_Spa from './pageAdmin/edit_spa';
import Edit_users from './pageAdmin/info_user';
import Report from './pageAdmin/report';

import RoomPage from './pageUser/roomPage'
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
function App() {
  

  return (
    <>
    
    <Routes>


      <Route path="/" element={
      <UserRoute>
        <HomePage />
      </UserRoute>
    } />
      <Route path="/roomPage" element={
        <UserRoute>
          <RoomPage />
        </UserRoute>
    } />


{/* Admin */}
      <Route path="/dashboard" element={
        <AdminRoute>
          <Dashboard />
        </AdminRoute>
      } />
      <Route path="/edit_home" element={
        <AdminRoute>
          <Edit_home />
        </AdminRoute>
      } />
      <Route path="/edit_payment" element={
        <AdminRoute>
          <Edit_payment />
        </AdminRoute>      
      } />
      <Route path="/edit_rooms" element={
        <AdminRoute>
           <Edit_rooms />
        </AdminRoute>
      } />
      
      <Route path="/edit_meeting" element={
        <AdminRoute>
           <Edit_meeting/>
        </AdminRoute>
      } />

      <Route path="/edit_gym" element={
        <AdminRoute>
           <Edit_Gym/>
        </AdminRoute>
      } />

      <Route path="/edit_Spa" element={
        <AdminRoute>
           <Edit_Spa/>
        </AdminRoute>
      } />
      <Route path="/edit_users" element={
      <AdminRoute>
        <Edit_users />
      </AdminRoute>
      } />
      <Route path="/report" element={
      <AdminRoute>
        <Report />
      </AdminRoute>
      } />




      
    </Routes>
      
      {/* <Dashboard /> */}
      {/* <HomePage /> */}
    </>
  )
}

export default App
