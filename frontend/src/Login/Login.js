import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Footer from '../Footer/Footer';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault(); 
      axios.post('http://localhost:3001/login', { email, password})
      .then((res) => {
        navigate('/home');
    })
    .catch((error) =>{
      if(error.response){
        alert("Incorrect email or password.");
        return;
      }
    });
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="Login">
      <div className="intro">
        <h1 className="intro-title">ChemoCompanion</h1>
        <p>Log in to access your personalized dashboard and resources.</p>
      </div>

      <main className="Login-main">
        <h2>Log In</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com" 
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••" 
          />
        </div>
        <button className="login-button" onClick={handleLogin}>Log In</button>
        <div className="options">
          <a href="#forgot-password" onClick={() => setModalOpen(true)} className="forgot-password">Forgot Password?</a>
          <a href="#sign-up" onClick={handleSignupClick} className="new-user">New User? Sign Up</a>
        </div>
      </main>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Forgot Your Password?</h2>
            <p>If you already have an account with us, password reset instructions will be emailed to you.</p>
            <input type="email" placeholder="email@example.com" className="modal-input" />
            <button className="modal-button" onClick={() => setModalOpen(false)}>Send Instructions</button>
            <button className="modal-close" onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Login;
