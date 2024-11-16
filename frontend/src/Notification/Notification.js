import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './Notification.css';
import React from 'react';

function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Yay Team Monkeys :)' },
    { id: 2, message: 'New symptom tracking report available. Please review your entries.' },
    { id: 3, message: 'Upcoming appointment: Chemotherapy session scheduled for Thursday at 2 PM.' },
    { id: 4, message: 'Make sure you stay hydrated!' },
    { id: 5, message: 'You received a new message from your healthcare provider!'},
  ]);

  const handleNotificationClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter(notification => notification.id !== id));
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
            notifications.map((notification) => (
              <div key={notification.id} className="notification-item">
                {notification.message}
                <button className="dismiss-button" onClick={() => handleDismiss(notification.id)}>x</button>
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