import './Navbar.css';
import logo from '../Navbar/logo.png'; 
import { Link } from 'react-router-dom';
import { useState } from 'react';
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
        <Link to="/healthcare-home">
          <img src={logo} alt="ChemoCompanion Logo" />
        </Link>
      </div>
      <nav>
        <Link to="/healthcare-home" className="nav-button">Healthcare Home</Link>
        <Link to="/create-notification" className="nav-button">Create Notifications</Link>
        
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