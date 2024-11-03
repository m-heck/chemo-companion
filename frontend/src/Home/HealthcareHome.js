import React from 'react';
import './HealthcareHome.css';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import PatientWidget from './PatientWidget';

const mockPatients = [
  { id: 1, name: 'John Doe', birthday: '1980-05-01', gender: 'Male', cancerTypeStage: 'Lung Cancer Stage II', treatmentPlan: 'Chemotherapy', allergies: 'None', comorbidities: 'Hypertension' },
  { id: 2, name: 'Jane Smith', birthday: '1975-11-20', gender: 'Female', cancerTypeStage: 'Breast Cancer Stage I', treatmentPlan: 'Radiation Therapy', allergies: 'Penicillin', comorbidities: 'Diabetes' },
];

function HealthcareHome() {
  return (
    <div className="HealthcareHome">
      <NavBar />
      <main className="HealthcareHome-main">
        <h1>Healthcare Provider Dashboard</h1>
        {mockPatients.map(patient => (
          <PatientWidget
            key={patient.id}
            patientData={patient}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default HealthcareHome;
