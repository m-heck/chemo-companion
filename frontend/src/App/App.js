import './App.css';
import Landing from '../Landing/Landing';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Chatbot from '../Chatbot/Chatbot';
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
  
  const handleChatbotClick = () => {
    setCurrentPage('chatbot');
  };

  return (
    <div className="App">
      {currentPage === 'home' && <Home onSignOut={handleSignOut} onChatbotClick={handleChatbotClick} />}
      {currentPage === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'landing' && <Landing onLoginClick={handleLoginClick} />}
      {currentPage === 'chatbot' && <Chatbot />}
    </div>
  );
}

export default App;
