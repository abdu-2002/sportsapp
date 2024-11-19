// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CoachDashboard from './components/CoachDashboard';
import PlayerDashboard from './components/PlayerDashboard';
import Nav from './components/Nav';
import TeamManagement from './components/TeamManagement';
import PlayerManagement from './components/PlayerManagement';
import FixtureManagement from './components/FixtureManagement';
import AttendanceManagement from './components/AttendanceManagement';
// import 'bootstrap/dist/css/bootstrap.min.css';





const App = () => (
  
        <Routes>
            <Route path="/" element={<Navigate to="/nav" replace />} />
            <Route path="/nav" element={<Nav />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/player-dashboard" element={<PlayerDashboard/>} />
            <Route path="/coach-dashboard" element={<CoachDashboard/>} />
              {/* Define nested routes for each management section */}
              <Route path="/team" element={<TeamManagement />} />
                <Route path="/player" element={<PlayerManagement />} />
                <Route path="/fixture" element={<FixtureManagement />} />
                <Route path="/attendance" element={<AttendanceManagement />} />
               
        </Routes>
    
);

export default App;
