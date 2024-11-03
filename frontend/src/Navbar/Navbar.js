import './Navbar.css';
import logo from '../Navbar/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Notification from '../Notification/Notification';
import { useNavigate } from 'react-router-dom';

function NavBar({ onSignOut }) {
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
        <Link to="/home">
          <img src={logo} alt="ChemoCompanion Logo" />
        </Link>
      </div>
      <nav>
        <Link to="/home" className="nav-button">Home</Link>
        <Link to="/chatbot" className="nav-button">AI Chatbot Page</Link>
        <Link to="/resources" className="nav-button">Resources</Link>
        <Link to="/patient-data" className="nav-button">Patient Data</Link>

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

export default NavBar;