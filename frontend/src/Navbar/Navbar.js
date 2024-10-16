import './Navbar.css';
import logo from '../Navbar/logo.png';
import { useState } from 'react';
import Notification from '../Notification/Notification';

function NavBar({ onSignOut, onLogoClick, onChatbotClick }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="NavBar">
      <div className="logo" onClick={onLogoClick}>
        <img src={logo} alt="ChemoCompanion Logo" />
      </div>
      <nav>
        <button className="nav-button">Home</button>
        <button className="nav-button" onClick={onChatbotClick}>AI Chatbot Page</button>
        <button className="nav-button">Resources</button>
        <button className="nav-button">Provider Chat</button>
        <button className="nav-button">Patient Data</button>

        <Notification /> {}

        <div className="profile-section">
          <button className="profile-button" onClick={handleProfileClick}>Profile</button>
          {isProfileOpen && (
            <div className="profile-dropdown">
              <button className="dropdown-item">Account Management</button>
              <button className="dropdown-item">Settings</button>
              <button className="dropdown-item" onClick={onSignOut}>Sign Out</button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;