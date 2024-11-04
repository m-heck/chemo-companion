import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import axios from 'axios';

function Signup({ onSignupSuccess }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient'); 
  const [healthcareProvider, setHealthcareProvider] = useState('');

  const navigate = useNavigate();

  const handleSignupSuccess = (e) => {
    e.preventDefault();

    if (userType === 'patient' && !healthcareProvider) {
      alert('Please select a healthcare provider.');
      return;
    }
    axios.post('http://localhost:3001/signup', { firstName, lastName, email, password, userType, healthcareProvider })
    .then(response => {
      console.log('Signup successful');
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
    // Simulating a successful signup without actual backend call
    console.log('Signup successful (mock)');
    navigate('/patient-data/edit'); // Navigate to the Patient Data page
  };

  /*
  const handleSignupSuccess = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/signup', { firstName, lastName, email, password, userType, healthcareProvider })
      .then(response => {
        console.log('Signup successful');
        navigate('/patient-data/edit');
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };
  */

  return (
    <div className="Signup">
      <div className="intro">
        <h1 className="intro-title">Create Your Account</h1>
        <p>Join us to start your journey with ChemoCompanion.</p>
      </div>

      <main className="Signup-main">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignupSuccess}>
          <div className="input-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
            />
          </div>
          <div className="input-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
            />
          </div>
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

          <div className="input-group user-type">
            <label>User Type</label>
            <div className="radio-group">
                <label className="radio-label">
                <input
                    type="radio"
                    value="patient"
                    checked={userType === 'patient'}
                    onChange={(e) => setUserType(e.target.value)}
                    className="radio-input"
                />
                <span className="radio-custom">Patient</span>
                </label>
                <label className="radio-label">
                <input
                    type="radio"
                    value="healthcare-worker"
                    checked={userType === 'healthcare-worker'}
                    onChange={(e) => setUserType(e.target.value)}
                    className="radio-input"
                />
                <span className="radio-custom">Healthcare Worker</span>
                </label>
            </div>
          </div>

          {userType === 'patient' && (
            <div className="input-group">
              <label htmlFor="healthcare-provider">Healthcare Provider</label>
              <select
                id="healthcare-provider"
                required
                value={healthcareProvider}
                onChange={(e) => setHealthcareProvider(e.target.value)}
              >
                <option value="" disabled>Select your healthcare provider</option>
                <option value="Florida Hospital">Florida Hospital</option>
                <option value="Orlando Chemotherapy Clinic">Orlando Chemotherapy Clinic</option>
                <option value="Miami Cancer Institute">Miami Cancer Institute</option>
                {/* Add more options as needed */}
              </select>
            </div>
          )}

          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default Signup;