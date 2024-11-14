import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HealthcareHome from './HealthcareHome';
import { MemoryRouter } from 'react-router-dom';

// mock global fetch function to simulate api responses
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      profile: {
        email: 'test@example.com',
        first: 'John',
        last: 'Doe',
        bday: '1990-01-01',
        gender: 'Male',
        emergencyphone: '123-456-7890',
      },
    }),
  })
);

describe('HealthcareHome Component', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // mock console.error
  });

  afterEach(() => {
    jest.clearAllMocks(); // reset mock after each test
  });

  it('renders the healthcare home title', () => {
    render(
      <MemoryRouter>
        <HealthcareHome />
      </MemoryRouter>
    );

    // check if the healthcare home dashboard title is rendered
    expect(screen.getByText('Healthcare Provider Dashboard')).toBeInTheDocument();
  });

  it('calls fetch and populates user data correctly', async () => {
    render(
      <MemoryRouter>
        <HealthcareHome />
      </MemoryRouter>
    );
  
    // verify that fetch was called once
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  
    // wait for user data to be displayed
    await waitFor(() => {
      expect(screen.getByText(/John/i)).toBeInTheDocument(); // first name
      expect(screen.getByText(/Doe/i)).toBeInTheDocument(); // last name
      expect(screen.getByText(/test@example.com/i)).toBeInTheDocument(); // email
    });
  });

  it('renders PatientWidget for each user in the list', async () => {
    render(
      <MemoryRouter>
        <HealthcareHome />
      </MemoryRouter>
    );
  
    // wait for PatientWidget to render with user data
    await waitFor(() => {
      expect(screen.getByText(/John/i)).toBeInTheDocument(); // look for "John"
      expect(screen.getByText(/Doe/i)).toBeInTheDocument();  // look for "Doe"
    });
  });

  it('handles fetch errors gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));
  
    render(
      <MemoryRouter>
        <HealthcareHome />
      </MemoryRouter>
    );
  
    // ensure error is handled gracefully
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('Error fetching user data:'),
        expect.any(Error)
      );
    });
  });
});
