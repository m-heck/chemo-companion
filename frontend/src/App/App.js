import './App.css';
import Landing from '../Landing/Landing';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Signup from '../Signup/Signup'; 
import Chatbot from '../Chatbot/Chatbot';
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleLoginClick = () => {
    setCurrentPage('login');
  };

  const handleSignupClick = () => {
    setCurrentPage('signup'); 
  };

  const handleLoginSuccess = () => {
    setCurrentPage('home');
  };

  const handleSignupSuccess = () => {
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
      {currentPage === 'login' && <Login onLoginSuccess={handleLoginSuccess} onSignupClick={handleSignupClick} />}
      {currentPage === 'signup' && <Signup onSignupSuccess={handleSignupSuccess} />} {/* Render Signup component */}
      {currentPage === 'landing' && <Landing onLoginClick={handleLoginClick} onSignUpClick={handleSignupClick} />}
      {currentPage === 'chatbot' && <Chatbot />}
    </div>
  );
}

export default App;
