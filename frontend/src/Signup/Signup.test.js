import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Signup from './Signup';
import { BrowserRouter as Router } from 'react-router-dom';

// render signup component wrapped in router for navigation
const renderSignup = () => {
  render(
    <Router>
      <Signup />
    </Router>
  );
};

describe('signup component', () => {
  it('renders the form with the correct labels', () => {
    renderSignup();

    // check if the input fields are rendered with the correct labels
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('updates the form fields correctly', () => {
    renderSignup();

    // simulate user typing into form fields
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // assert the form fields have updated with the correct values
    expect(screen.getByLabelText(/first name/i).value).toBe('Jane');
    expect(screen.getByLabelText(/last name/i).value).toBe('Doe');
    expect(screen.getByLabelText(/email/i).value).toBe('jane.doe@example.com');
    expect(screen.getByLabelText(/password/i).value).toBe('password123');
  });

  it('selects the correct user type', () => {
    renderSignup();

    // simulate selecting user type as 'healthcare worker'
    fireEvent.click(screen.getByLabelText(/healthcare worker/i));

    // assert that the radio button for 'healthcare worker' is selected
    expect(screen.getByLabelText(/healthcare worker/i).checked).toBe(true);
  });

  it('shows healthcare provider field when user type is "patient"', () => {
    renderSignup();

    // simulate selecting user type as 'patient'
    fireEvent.click(screen.getByLabelText(/patient/i));

    // assert that the healthcare provider field is displayed
    expect(screen.getByLabelText(/healthcare provider/i)).toBeInTheDocument();
  });
});
