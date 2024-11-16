import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';

// Helper function to render Login with Router
const renderLogin = () => {
    render(
      <Router>
        <Login onLoginSuccess={jest.fn()} />
      </Router>
    );
  };


describe('login component', () => {
  it('renders the login form', () => {
    render(
      <Router>
        <Login onLoginSuccess={jest.fn()} />
      </Router>
    );

    // check if essential elements (email, password inputs, and login button) are in the document
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    render(
      <Router>
        <Login onLoginSuccess={jest.fn()} />
      </Router>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    // simulate user typing in the inputs
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // check if the values are correctly updated
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('opens and closes the modal on forgot password link click', () => {
    render(
      <Router>
        <Login onLoginSuccess={jest.fn()} />
      </Router>
    );

    const forgotPasswordLink = screen.getByText('Forgot Password?');
    fireEvent.click(forgotPasswordLink);

    // check if the modal content appears when the link is clicked
    expect(screen.getByText('Forgot Your Password?')).toBeInTheDocument();

    // now close the modal
    const closeModalButton = screen.getByText('Close');
    fireEvent.click(closeModalButton);

    // ensure the modal is closed
    expect(screen.queryByText('Forgot Your Password?')).not.toBeInTheDocument();
  });

  it('navigates to signup page when "new user? sign up" link is clicked', () => {
    render(
      <Router>
        <Login onLoginSuccess={jest.fn()} />
      </Router>
    );

    const signupLink = screen.getByText('New User? Sign Up');
    fireEvent.click(signupLink);

    // check if the page navigates to the signup page
    expect(window.location.pathname).toBe('/signup');
  });

  it('shows the correct user type radio buttons', () => {
    render(
      <Router>
        <Login onLoginSuccess={jest.fn()} />
      </Router>
    );

    // check if the user type options are displayed
    expect(screen.getByLabelText('Patient')).toBeInTheDocument();
    expect(screen.getByLabelText('Healthcare Worker')).toBeInTheDocument();
  });

  it('updates user type on radio button selection', () => {
    render(
      <Router>
        <Login onLoginSuccess={jest.fn()} />
      </Router>
    );

    const patientRadio = screen.getByLabelText('Patient');
    const healthcareWorkerRadio = screen.getByLabelText('Healthcare Worker');

    expect(patientRadio.checked).toBe(false);
    expect(healthcareWorkerRadio.checked).toBe(false);
    fireEvent.click(patientRadio);
    expect(patientRadio.checked).toBe(true);
    expect(healthcareWorkerRadio.checked).toBe(false);

    // select 'healthcare worker' radio button
    fireEvent.click(healthcareWorkerRadio);
    expect(patientRadio.checked).toBe(false);
    expect(healthcareWorkerRadio.checked).toBe(true);
  });
  

  it('selects user type "healthcare worker" when corresponding radio button is clicked', () => {
    renderLogin();

    const patientRadio = screen.getByLabelText(/patient/i);
    const healthcareWorkerRadio = screen.getByLabelText(/healthcare worker/i);

    expect(patientRadio.checked).toBe(false);
    expect(healthcareWorkerRadio.checked).toBe(false);

    // Select "healthcare worker"
    fireEvent.click(healthcareWorkerRadio);

    // Assert "healthcare worker" is selected and "patient" is not
    expect(healthcareWorkerRadio.checked).toBe(true);
    expect(patientRadio.checked).toBe(false);
  });
  

  it('enables login button when email and password fields are entered', () => {
    render(
      <Router>
        <Login onLoginSuccess={jest.fn()} />
      </Router>
    );

    const loginButton = screen.getByRole('button', { name: /log in/i });
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    // simulate user typing in the email and password fields
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // check that login button is enabled once the fields are populated
    expect(loginButton).toBeEnabled();
  });
});

it('opens and closes the modal on forgot password link click, and triggers action on Send Instructions click', () => {
  render(
    <Router>
      <Login onLoginSuccess={jest.fn()} />
    </Router>
  );

  // Step 1: Open the modal
  const forgotPasswordLink = screen.getByText('Forgot Password?');
  fireEvent.click(forgotPasswordLink);

  // Verify the modal opens
  expect(screen.getByText('Forgot Your Password?')).toBeInTheDocument();

  // Step 2: Simulate clicking the "Send Instructions" button
  const sendInstructionsButton = screen.getByText('Send Instructions');
  fireEvent.click(sendInstructionsButton);

  // Check if the modal closes after clicking the "Send Instructions" button
  expect(screen.queryByText('Forgot Your Password?')).not.toBeInTheDocument();
});
