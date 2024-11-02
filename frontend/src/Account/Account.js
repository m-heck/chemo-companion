import './Account.css';
import { useState } from 'react';
import NavBar from '../Navbar/Navbar';  
import Footer from '../Footer/Footer';  

function Account() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('');
  
    const handleUpdate = () => {
      // Logic to update user information goes here
      console.log('Information updated');
    };
  
    return (
      <div className="account-management">
        <NavBar />
        <main className="main">
          <div className="form-container">
            <h1>Manage Your Account</h1>
            <p>Update your account information below.</p>
            <section className="personal-info">
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
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </section>
            <section className="medical-info">
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
            </section>
            <button className="update-button" onClick={handleUpdate}>Update My Information</button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  export default Account;