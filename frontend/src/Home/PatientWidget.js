import React, { useState } from 'react';
import './PatientWidget.css';

function PatientWidget({ patientData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="patient-widget">
      <h3>{patientData.name}</h3>
      <p>Gender: {patientData.gender}</p>
      <p>Cancer Type and Stage: {patientData.cancerTypeStage}</p>
      <p>Treatment Plan: {patientData.treatmentPlan}</p>
      <button onClick={handleViewDetails} className="view-details-button">View Details</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{patientData.name}</h2>
            <p><strong>Birthday:</strong> {patientData.birthday}</p>
            <p><strong>Gender:</strong> {patientData.gender}</p>
            <p><strong>Emergency Contact:</strong> {patientData.emergencyContact}</p>
            <p><strong>Cancer Type and Stage:</strong> {patientData.cancerTypeStage}</p>
            <p><strong>Current Treatment Plan:</strong> {patientData.treatmentPlan}</p>
            <p><strong>Allergies:</strong> {patientData.allergies}</p>
            <p><strong>Comorbidities:</strong> {patientData.comorbidities}</p>
            <p><strong>Doctor Information:</strong> {patientData.doctorInfo}</p>
            <p><strong>Medications:</strong> {patientData.medications}</p>
            <p><strong>AI Chatbot Acknowledgement:</strong> {patientData.aiAcknowledgement ? 'Yes' : 'No'}</p>
            <p><strong>Consent to Share Information Acknowledgement:</strong> {patientData.consentAcknowledgement ? 'Yes' : 'No'}</p>
            <button onClick={handleCloseModal} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientWidget;
