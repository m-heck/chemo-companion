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
