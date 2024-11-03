import React, { useState } from 'react';
import './PatientData.css';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function PatientData({ isEditMode, setEditMode }) {
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
    if (!formData.aiAcknowledgement) {
      alert('You must acknowledge the AI chatbot.');
      return;
    }
    if (!formData.consentAcknowledgement) {
      alert('You must consent to share information.');
      return;
    }
    setEditMode(false); // Switch to display mode
  };

  return (
    <div className="PatientData">
      <NavBar />
      <main className="patient-data-main">
        <h1>{isEditMode ? 'Edit Your Health Data' : 'Your Health Data'}</h1>
        {isEditMode ? (
          <form onSubmit={handleSubmit} className="patient-data-container">
            <label>
              Name <span className="required">*</span>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              Birthday <span className="required">*</span>
              <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />
            </label>
            <label>
              Gender <span className="required">*</span>
              <input type="text" name="gender" value={formData.gender} onChange={handleChange} required />
            </label>
            <label>
              Emergency Contact <span className="required">*</span>
              <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required />
            </label>
            <label>
              Cancer Type and Stage <span className="required">*</span>
              <input type="text" name="cancerTypeStage" value={formData.cancerTypeStage} onChange={handleChange} required />
            </label>
            <label>
              Current Treatment Plan <span className="required">*</span>
              <input type="text" name="treatmentPlan" value={formData.treatmentPlan} onChange={handleChange} required />
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
              AI Chatbot Acknowledgement <span className="required">*</span>
              <input type="checkbox" name="aiAcknowledgement" checked={formData.aiAcknowledgement} onChange={handleChange} required />
            </label>
            <label>
              Consent to Share Information Acknowledgement <span className="required">*</span>
              <input type="checkbox" name="consentAcknowledgement" checked={formData.consentAcknowledgement} onChange={handleChange} required />
            </label>
            <button type="submit" className="save-button">Save</button>
          </form>
        ) : (
          <div className="patient-data-display">
            <div className="data-item"><strong>Name:</strong> {formData.name}</div>
            <div className="data-item"><strong>Birthday:</strong> {formData.birthday}</div>
            <div className="data-item"><strong>Gender:</strong> {formData.gender}</div>
            <div className="data-item"><strong>Emergency Contact:</strong> {formData.emergencyContact}</div>
            <div className="data-item"><strong>Cancer Type and Stage:</strong> {formData.cancerTypeStage}</div>
            <div className="data-item"><strong>Current Treatment Plan:</strong> {formData.treatmentPlan}</div>
            <div className="data-item"><strong>Allergies:</strong> {formData.allergies}</div>
            <div className="data-item"><strong>Comorbidities:</strong> {formData.comorbidities}</div>
            <div className="data-item"><strong>Doctor Information:</strong> {formData.doctorInfo}</div>
            <div className="data-item"><strong>Medications:</strong> {formData.medications}</div>
            <div className="data-item"><strong>AI Chatbot Acknowledgement:</strong> {formData.aiAcknowledgement ? 'Yes' : 'No'}</div>
            <div className="data-item"><strong>Consent to Share Information Acknowledgement:</strong> {formData.consentAcknowledgement ? 'Yes' : 'No'}</div>
            <button onClick={() => setEditMode(true)} className="edit-button">Edit</button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default PatientData;
