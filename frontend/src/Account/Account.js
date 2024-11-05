import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Navbar/Navbar';
import './Account.css';

function Account() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  useEffect(() => {
    // Fetch user data from the server using the JWT token
    axios.get('http://localhost:3001/profile', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const data = response.data.profile;
        setEmail(data.email);
        setFirstName(data.first);
        setLastName(data.last);
        setBirthday(data.bday);
        setGender(data.gender);
        setEmergencyContact(data.emergencyphone);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      email,
      first: firstName,
      last: lastName,
      bday: birthday,
      gender,
      emergencyphone: emergencyContact,
    };

    axios.put('http://localhost:3001/update-user', updatedData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Information updated:', response.data);
        alert('Information updated successfully');
      })
      .catch((error) => {
        console.error('Error updating information:', error);
        alert('An error occurred while updating information');
      });
  };

  return (
    <div className="account-management">
      <NavBar />
      <main className="main">
        <div className="form-container">
          <h1>Manage Your Account</h1>
          <p>Update your account information below.</p>
          <form onSubmit={handleUpdate}>
            <section className="personal-info">
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="first-name">First Name</label>
                <input
                  type="text"
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="last-name">Last Name</label>
                <input
                  type="text"
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="birthday">Birthday</label>
                <input
                  type="date"
                  id="birthday"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="emergency-contact">Emergency Contact</label>
                <input
                  type="text"
                  id="emergency-contact"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                />
              </div>
              <button type="submit" className="update-button">Update Information</button>
            </section>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Account;