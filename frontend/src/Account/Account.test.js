// Account.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Account from './Account';

jest.mock('axios');
jest.spyOn(console, 'error').mockImplementation(() => {}); // suppress console errors for testing

describe('Account Component', () => {
  // mock the local storage for the token
  beforeAll(() => {
    localStorage.setItem('token', 'testToken');
  });

  // clean up after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // test for rendering the component and basic UI elements
  it('renders the account form with all input fields and the update button', () => {
    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    // check for the presence of input fields and button
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/birthday/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/emergency contact/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update information/i })).toBeInTheDocument();
  });

  // test for fetching and setting user data
  it('fetches and displays user data correctly', async () => {
    // mock axios response for user data
    axios.get.mockResolvedValue({
      data: {
        profile: {
          email: 'test@example.com',
          first: 'John',
          last: 'Doe',
          bday: '1990-01-01',
          gender: 'Male',
          emergencyphone: '123-456-7890',
        },
      },
    });

    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    // wait for axios call and verify form fields are populated
    await waitFor(() => expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument());
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1990-01-01')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Male')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123-456-7890')).toBeInTheDocument();
  });

  // test for updating user information
  it('sends updated data on form submission', async () => {
    // mock axios get response for initial load
    axios.get.mockResolvedValue({
      data: {
        profile: {
          email: 'test@example.com',
          first: 'John',
          last: 'Doe',
          bday: '1990-01-01',
          gender: 'Male',
          emergencyphone: '123-456-7890',
        },
      },
    });

    // explicitly define axios.put as a mock function to avoid undefined errors
    axios.put = jest.fn().mockResolvedValue({
      data: { message: 'Information updated successfully' },
    });

    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    // simulate user updating their first name
    await waitFor(() => screen.getByDisplayValue('John'));
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });

    // submit the form
    fireEvent.click(screen.getByRole('button', { name: /update information/i }));

    // check that the put request was called with updated data
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost:3001/update-user',
        {
          email: 'test@example.com',
          first: 'Jane',
          last: 'Doe',
          bday: '1990-01-01',
          gender: 'Male',
          emergencyphone: '123-456-7890',
        },
        expect.any(Object) // check headers
      );
    });
  });

  // test for handling fetch errors
  it('shows an error message if user data fails to load', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching user data'));

    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    // check if error message appears in the console (optional)
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('Error fetching user data'),
        expect.any(Error)
      );
    });
  });
});
