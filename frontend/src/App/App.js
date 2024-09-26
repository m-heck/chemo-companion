import './App.css';
import Landing from '../Landing/Landing';
import Home from '../Home/Home';
import Login from '../Login/Login'; // Import the Login component
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleLoginClick = () => {
    setCurrentPage('login');
  };

  const handleLoginSuccess = () => {
    setCurrentPage('home');
  };

  const handleSignOut = () => {
    setCurrentPage('landing');
  };

  return (
    <div className="App">
      {currentPage === 'home' && <Home onSignOut={handleSignOut} />}
      {currentPage === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'landing' && <Landing onLoginClick={handleLoginClick} />}
    </div>
  );
}

export default App;
