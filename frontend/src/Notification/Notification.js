import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './Notification.css';
import React from 'react';
import axios from 'axios';

function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const shownotification = () =>{

      fetch('http://localhost:3001/getnotifications', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setNotifications(data.profile);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });

  };
  useEffect(() => {
    shownotification();
  }, []);
  const handleNotificationClick = () => {
    setIsOpen(!isOpen);
    shownotification();
  };

  const handleDismiss = (notification) => {
    axios.post('http://localhost:3001/deletenotification', {notification},{headers:{ 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }})
    .then((res) => {   
      shownotification();
    })
  .catch((error) =>{
    if(error.response){
      alert("error");
      return;
    }
  });
  };
  

  return (
    <div className="notification-section">
      <div className="notification-bell-container" onClick={handleNotificationClick}>
        <FontAwesomeIcon icon={faBell} className="notification-bell" data-testid="notification-bell"/>
        {notifications.length > 0 && (
          <span className="notification-badge">{notifications.length}</span>
        )}
      </div>
      {isOpen && (
        <div className="notification-dropdown" data-testid="notification-dropdown">
          {notifications.length > 0 ? (
            notifications.map((user) => (
              <div key={user.notification} className="notification-item">
                {user.notification}
                <button className="dismiss-button" onClick={() => handleDismiss(user.notification)}>x</button>
              </div>
            ))
          ) : (
            <div className="notification-item">No new notifications</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Notification;