import React, { useState } from 'react';
import './CreateNotification.css';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function CreateNotification() {
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleChangeMessage = (e) => {
    setNotificationMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Notification created: ${notificationMessage}`);
    setNotificationMessage('');
  };

  return (
    <div className="create-notification-page">
      <NavBar />
      <div className="create-notification-container">
        <h1>Create New Notification</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Notification Message:
            <textarea
              value={notificationMessage}
              onChange={handleChangeMessage}
              required
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
