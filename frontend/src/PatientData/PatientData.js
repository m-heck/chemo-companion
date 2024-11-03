import React, { useState } from 'react';
import './PatientData.css';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function PatientData() {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    birthday: '1990-01-01',
    gender: 'Male',
    emergencyContact: 'Jane Doe - 123-456-7890',
    cancerTypeStage: 'Stage II',
    treatmentPlan: 'Chemotherapy',
    allergies: 'None',
    comorbidities: 'None',
    doctorInfo: 'Dr. Smith',
    medications: 'Medication A, Medication B',
    aiAcknowledgement: false,
    consentAcknowledgement: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    setIsEditing(false); // Exit edit mode after submission
  };

  return (
    <div className="PatientData">
      <NavBar /> {/* Navbar at the top */}
      
      <main className="patient-data-main">
        <h1 style={{ textAlign: 'left' }}>Health Data Form</h1>
        <p style={{ textAlign: 'left' }}>Manage and view your health data securely in one place.</p>
        
        {!isEditing ? (
          <div className="patient-summary">
            <h2>Current Patient Data</h2>
            <ul>
              <li><strong>Name:</strong> {formData.name}</li>
              <li><strong>Birthday:</strong> {formData.birthday}</li>
              <li><strong>Gender:</strong> {formData.gender}</li>
              <li><strong>Emergency Contact:</strong> {formData.emergencyContact}</li>
              <li><strong>Cancer Type and Stage:</strong> {formData.cancerTypeStage}</li>
              <li><strong>Current Treatment Plan:</strong> {formData.treatmentPlan}</li>
              <li><strong>Allergies:</strong> {formData.allergies}</li>
              <li><strong>Comorbidities:</strong> {formData.comorbidities}</li>
              <li><strong>Doctor Information:</strong> {formData.doctorInfo}</li>
              <li><strong>Medications:</strong> {formData.medications}</li>
            </ul>
            <button onClick={() => setIsEditing(true)} className="edit-button">Edit Data</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="patient-data-container">
            <label>
              Name
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              Birthday
              <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />
            </label>
            <label>
              Gender
              <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
            </label>
            <label>
              Emergency Contact
              <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} />
            </label>
            <label>
              Cancer Type and Stage
              <input type="text" name="cancerTypeStage" value={formData.cancerTypeStage} onChange={handleChange} />
            </label>
            <label>
              Current Treatment Plan
              <input type="text" name="treatmentPlan" value={formData.treatmentPlan} onChange={handleChange} />
            </label>
            <label>
              Allergies
              <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} />
            </label>
            <label>
              Comorbidities
              <input type="text" name="comorbidities" value={formData.comorbidities} onChange={handleChange} />
            </label>
            <label>
              Doctor Information
              <input type="text" name="doctorInfo" value={formData.doctorInfo} onChange={handleChange} />
            </label>
            <label>
              Medications
              <textarea name="medications" value={formData.medications} onChange={handleChange} />
            </label>
            <label>
              AI Chatbot Acknowledgement
              <input type="checkbox" name="aiAcknowledgement" checked={formData.aiAcknowledgement} onChange={handleChange} />
            </label>
            <label>
              Consent to Share Information Acknowledgement
              <input type="checkbox" name="consentAcknowledgement" checked={formData.consentAcknowledgement} onChange={handleChange} />
            </label>
            <button type="submit" className="save-button">Submit</button>
          </form>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default PatientData;
