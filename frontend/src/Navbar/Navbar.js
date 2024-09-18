import './Navbar.css';
import logo from '../Navbar/logo.png';

function NavBar({ onSignOut, onLogoClick }) {
  return (
    <header className="NavBar">
      <div className="logo" onClick={onLogoClick}>
        <img src={logo} alt="ChemoCompanion Logo" />
      </div>
      <nav>
        <button className="nav-button">Home</button>
        <button className="nav-button" onClick={() => console.log('AI Companion clicked')}>AI Companion</button>
        <button className="sign-out-button" onClick={onSignOut}>Sign Out</button>
      </nav>
    </header>
  );
}

export default NavBar;
