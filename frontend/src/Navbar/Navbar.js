import './Navbar.css';
import logo from '../Navbar/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Notification from '../Notification/Notification';
import { useNavigate } from 'react-router-dom';

function HealthcareNavBar({ onSignOut }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const navigate = useNavigate();

  const handleSignOutClick = () => {
    navigate('/');
  };

  return (
    <header className="NavBar">
      <div className="logo">
        <Link to="/provider">
          <img src={logo} alt="ChemoCompanion Logo" />
        </Link>
      </div>
      <nav>
        <Link to="/provider" className="nav-button">Healthcare Home</Link>
        <Link to="/provider/send-notification" className="nav-button">Create Notifications</Link>
        <Link to="/chatbot" className="nav-button">AI Chatbot Page</Link>

        <Notification />

        <div className="profile-section">
          <button className="profile-button" onClick={handleProfileClick}>Profile</button>
          {isProfileOpen && (
            <div className="profile-dropdown">
              <Link to="/account" className="dropdown-item">Account Management</Link>
              <button className="dropdown-item" onClick={handleSignOutClick}>Sign Out</button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default HealthcareNavBar;