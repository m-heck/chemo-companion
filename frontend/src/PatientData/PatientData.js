import React, { useState } from 'react';
import './PatientData.css';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function PatientData() {
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    gender: '',
    emergencyContact: '',
    cancerTypeStage: '',
    treatmentPlan: '',
    allergies: '',
    comorbidities: '',
    doctorInfo: '',
    medications: '',
    aiAcknowledgement: false,
    consentAcknowledgement: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the backend)
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="PatientData">
      <NavBar /> {/* Navbar at the top */}
      
      <main className="patient-data-main">
        <h1 style={{ textAlign: 'left' }}>Health Data Form</h1>
        <p style={{ textAlign: 'left' }}>Manage and view your health data securely in one place.</p>

        <form onSubmit={handleSubmit} className="patient-data-container" style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <label style={{ textAlign: 'left' }}>
            Name
            <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ marginTop: '5px', padding: '8px', width: '100%' }} required />
          </label>
          <label style={{ textAlign: 'left' }}>
            Birthday
            <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} style={{ marginTop: '5px', padding: '8px', width: '100%' }} required />
          </label>
          <label style={{ textAlign: 'left' }}>
            Gender
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} style={{ marginTop: '5px', padding: '8px', width: '100%' }} />
          </label>
          <label style={{ textAlign: 'left' }}>
            Emergency Contact
            <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} style={{ marginTop: '5px', padding: '8px', width: '100%' }} />
          </label>
          <label style={{ textAlign: 'left' }}>
            Cancer Type and Stage
            <input type="text" name="cancerTypeStage" value={formData.cancerTypeStage} onChange={handleChange} style={{ marginTop: '5px', padding: '8px', width: '100%' }} />
          </label>
          <label style={{ textAlign: 'left' }}>
            Current Treatment Plan
            <input type="text" name="treatmentPlan" value={formData.treatmentPlan} onChange={handleChange} style={{ marginTop: '5px', padding: '8px', width: '100%' }} />
          </label>
          <label style={{ textAlign: 'left' }}>
            Allergies
            <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} style={{ marginTop: '5px', padding: '8px', width: '100%' }} />
          </label>
          <label style={{ textAlign: 'left' }}>
            Comorbidities
            <input type="text" name="comorbidities" value={formData.comorbidities} onChange={handleChange} style={{ marginTop: '5px', padding: '8px', width: '100%' }} />
          </label>
          <label style={{ textAlign: 'left' }}>
            Doctor Information
            <input type="text" name="doctorInfo" value={formData.doctorInfo} onChange={handleChange} style={{ marginTop: '5px', padding: '8px', width: '100%' }} />
          </label>
          <label style={{ textAlign: 'left' }}>
            Medications
            <textarea name="medications" value={formData.medications} onChange={handleChange} style={{ marginTop: '5px', padding: '8px', width: '100%', height: '100px' }} />
          </label>
          <label style={{ textAlign: 'left' }}>
            AI Chatbot Acknowledgement
            <input type="checkbox" name="aiAcknowledgement" checked={formData.aiAcknowledgement} onChange={handleChange} style={{ marginLeft: '5px' }} />
          </label>
          <label style={{ textAlign: 'left' }}>
            Consent to Share Information Acknowledgement
            <input type="checkbox" name="consentAcknowledgement" checked={formData.consentAcknowledgement} onChange={handleChange} style={{ marginLeft: '5px' }} />
          </label>
          <button type="submit" className="save-button" style={{ padding: '10px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '4px', marginTop: '15px' }}>Submit</button>
        </form>
      </main>
      
      <Footer /> {/* Footer at the bottom */}
    </div>
  );
}

export default PatientData;
