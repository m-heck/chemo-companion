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
      <h3>{patientData.first + " " + patientData.last}</h3>
      <p>Email: {patientData.email}</p>
      <p>Gender: {patientData.gender}</p>
      <p>Cancer Type and Stage: {patientData.cancerdetail}</p>
      <p>Treatment Plan: {patientData.treatment}</p>
      <button onClick={handleViewDetails} className="view-details-button">View Details</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{patientData.first + " " + patientData.last}</h2>
            <p>Email: {patientData.email}</p>
            <p><strong>Birthday:</strong> {patientData.bday}</p>
            <p><strong>Gender:</strong> {patientData.gender}</p>
            <p><strong>Emergency Contact:</strong> {patientData.emergencyphone}</p>
            <p><strong>Cancer Type and Stage:</strong> {patientData.cancerTypeStage}</p>
            <p><strong>Current Treatment Plan:</strong> {patientData.cancerdetail}</p>
            <p><strong>Allergies:</strong> {patientData.allergy}</p>
            <p><strong>Comorbidities:</strong> {patientData.comorbid}</p>
            <p><strong>Doctor Information:</strong> {patientData.doctorinfo}</p>
            <p><strong>Medications:</strong> {patientData.medication}</p>
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
