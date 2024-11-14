import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PatientWidget from './PatientWidget';

const mockPatientData = {
  first: 'John',
  last: 'Doe',
  email: 'john.doe@example.com',
  gender: 'Male',
  treatment: 'Chemotherapy',
  bday: '1990-01-01',
  emergencyphone: '123-456-7890',
  cancerTypeStage: 'Lung Cancer, Stage 2',
  allergy: 'Peanuts',
  comorbid: 'Hypertension',
  doctorinfo: 'Dr. Smith, Oncology',
  medication: 'Chemotherapy Drugs',
  aiAcknowledgement: true,
  consentAcknowledgement: true,
};

describe('patientwidget component', () => {
  it('renders patient information correctly', () => {
    render(<PatientWidget patientData={mockPatientData} />);

    // check if the patient's name is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    // check if email, gender, and other details are rendered
    expect(screen.getByText('Email: john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByText('Treatment Plan: Chemotherapy')).toBeInTheDocument();
  });

  it('opens the modal when "view details" button is clicked', () => {
    render(<PatientWidget patientData={mockPatientData} />);

    // check that the modal is not initially visible
    expect(screen.queryByText(/birthday:/i)).not.toBeInTheDocument();

    // click the "view details" button to open the modal
    fireEvent.click(screen.getByText('View Details'));

    // check if the modal content is displayed
    expect(screen.getByText(/birthday:/i)).toBeInTheDocument();
    expect(screen.getByText('1990-01-01')).toBeInTheDocument();
    expect(screen.getByText(/emergency contact:/i)).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('Lung Cancer, Stage 2')).toBeInTheDocument();
  });

  it('closes the modal when "close" button is clicked', () => {
    render(<PatientWidget patientData={mockPatientData} />);

    // open the modal first
    fireEvent.click(screen.getByText('View Details'));

    // check if the modal is visible
    expect(screen.getByText(/birthday:/i)).toBeInTheDocument();

    // click the "close" button to close the modal
    fireEvent.click(screen.getByText('Close'));

    // check if the modal content is no longer visible
    expect(screen.queryByText(/birthday:/i)).not.toBeInTheDocument();
  });
});
