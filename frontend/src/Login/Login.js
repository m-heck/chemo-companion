import React, { useState } from 'react';
import './Login.css';
import Footer from '../Footer/Footer';

function Login({ onLoginSuccess, onSignupClick }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLogin = () => {
    onLoginSuccess();
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
          <input type="email" id="email" required placeholder="email@example.com" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required placeholder="••••••••" />
        </div>
        <button className="login-button" onClick={handleLogin}>Log In</button>
        <div className="options">
          <a href="#forgot-password" onClick={() => setModalOpen(true)} className="forgot-password">Forgot Password?</a>
          <a href="#sign-up" onClick={onSignupClick} className="new-user">New User? Sign Up</a>
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
