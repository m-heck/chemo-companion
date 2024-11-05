import React from 'react';
import './App.css';
import Landing from '../Landing/Landing';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Signup from '../Signup/Signup'; 
import Chatbot from '../Chatbot/Chatbot';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PatientData from '../PatientData/PatientData';
import Account from '../Account/Account';
import Resources from '../Resources/Resources';
import { useState } from 'react';
import HealthcareHome from '../Home/HealthcareHome';
import CreateNotification from '../CreateNotification/CreateNotification';

function App() {
  const [isEditMode, setEditMode] = useState(false);

  const handleLoginSuccess = () => {
    console.log('Login successful');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route 
            path="/patient-data" 
            element={<PatientData isEditMode={isEditMode} setEditMode={setEditMode} />} 
          />
          <Route 
            path="/patient-data/edit" 
            element={<PatientData isEditMode={true} setEditMode={setEditMode} />} 
          />
          <Route path="/account" element={<Account />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/healthcare-home" element={<HealthcareHome />} />
          <Route path="/create-notification" element={<CreateNotification />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
