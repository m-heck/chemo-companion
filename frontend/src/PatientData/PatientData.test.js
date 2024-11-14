import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import PatientData from './PatientData';
import { BrowserRouter as Router } from 'react-router-dom';

// mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      profile: {
        first: 'John', last: 'Doe', bday: '1990-01-01', gender: 'Male', emergencyphone: '123-456-7890', cancerdetail: 'Stage 2',
        treatment: 'Chemotherapy', allergy: 'None', comorbid: 'None', doctorinfo: 'Dr. Smith', medication: 'None'
      },
    }),
  })
);

const renderPatientData = (isEditMode, setEditMode) => {
  render(
    <Router>
      <PatientData isEditMode={isEditMode} setEditMode={setEditMode} />
    </Router>
  );
};

describe('PatientData component', () => {
  it('renders patient data in display mode', async () => {
    await act(async () => {
      renderPatientData(false, jest.fn());
    });

    expect(screen.getByText(/first name:/i)).toBeInTheDocument();
    expect(screen.getByText(/last name:/i)).toBeInTheDocument();
    expect(screen.getByText(/birthday:/i)).toBeInTheDocument();
    expect(screen.getByText(/gender:/i)).toBeInTheDocument();
    expect(screen.getByText(/emergency contact:/i)).toBeInTheDocument();
    expect(screen.getByText(/cancer type and stage:/i)).toBeInTheDocument();
    expect(screen.getByText(/current treatment plan:/i)).toBeInTheDocument();
  });

  it('renders patient data in edit mode and allows editing', async () => {
    const setEditMode = jest.fn();

    await act(async () => {
      renderPatientData(true, setEditMode);
    });

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/birthday/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/emergency contact/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cancer type and stage/i)).toBeInTheDocument();

    const firstNameInput = screen.getByLabelText(/first name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John');
  });

  it('toggles edit mode when edit button is clicked', async () => {
    const setEditMode = jest.fn();

    await act(async () => {
      renderPatientData(false, setEditMode);
    });

    const editButton = screen.getByText(/edit/i);
    fireEvent.click(editButton);

    expect(setEditMode).toHaveBeenCalledWith(true);
  });

  it('displays save button in edit mode', async () => {
    await act(async () => {
      renderPatientData(true, jest.fn());
    });

    const saveButton = screen.getByText(/save/i);
    expect(saveButton).toBeInTheDocument();
  });

  it('displays patient data in display mode when not in edit mode', async () => {
    await act(async () => {
      renderPatientData(false, jest.fn());
    });

    const editButton = screen.getByText(/edit/i);
    expect(editButton).toBeInTheDocument();
  });

});
