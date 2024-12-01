import React, { useState } from 'react';
import './CreateNotification.css';
import HealthcareNavbar from '../Navbar/HealthcareNavbar'; 
import Footer from '../Footer/Footer';
import axios from 'axios';

function CreateNotification() {
  const [notification, setNotificationMessage] = useState('');

  const handleChangeMessage = (e) => {
    setNotificationMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    axios.post('http://localhost:3001/makenotification', {notification},{headers:{ 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }})
    .then((res) => {   
    alert(`Notification created: ${notification}`);
    setNotificationMessage('');
    })
  .catch((error) =>{
    if(error.response){
      alert("error");
      return;
    }
  });
  };

  return (
    <div className="create-notification-page">
      <HealthcareNavbar />
      <div className="create-notification-container">
        <h1>Create New Notification</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Notification Message:
            <input
              type="text"
              value={notification}
              onChange={handleChangeMessage}
              
            />
          </label>
          <button type="submit">Create Notification</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default CreateNotification;
