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

function App() {
  const [isEditMode, setEditMode] = useState(false); // Define state for edit mode

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
