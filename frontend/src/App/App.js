import './App.css';
import Landing from '../Landing/Landing';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Signup from '../Signup/Signup'; 
import Chatbot from '../Chatbot/Chatbot';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HealthDataForm from '../PatientData/PatientData';
import Account from '../Account/Account';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/patient-data" element={<HealthDataForm />} />
          <Route path="/account" element={<Account />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;