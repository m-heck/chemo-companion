
import React, { useState, useEffect } from 'react';
import './HealthcareHome.css';
import HealthcareNavbar from '../Navbar/HealthcareNavbar'; 
import Footer from '../Footer/Footer';
import PatientWidget from './PatientWidget';


function HealthcareHome() {
  const [userList, setUserList] = useState([]);
useEffect(() => {
  fetch('http://localhost:3001/profilelist', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setUserList([data.profile]);
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
}, []);
  return (
    
    <div className="HealthcareHome">
      <HealthcareNavbar />
      <main className="HealthcareHome-main">
        <h1>Healthcare Provider Dashboard</h1>
        {userList.map(user => (
          <PatientWidget
            key={user.email}
            patientData={user}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default HealthcareHome;
