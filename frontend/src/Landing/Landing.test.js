import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Landing from './Landing';
import { useNavigate } from 'react-router-dom';
import App from '../App/App';

// mock the useNavigate hook so we can track navigation in the tests
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('landing page', () => {
  const mockNavigate = useNavigate();  // create a mock for the navigate function

  // helper function to render the landing page with necessary wrappers
  const renderLandingPage = () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
  };

  test('renders header content', () => {
    renderLandingPage();
  
    // check if the header text (h1) is showing up on the page
    expect(screen.getByRole('heading', { level: 1, name: /chemoCompanion/i })).toBeInTheDocument();
    expect(screen.getByText(/supporting you through every step/i)).toBeInTheDocument();
  });

  test('renders login and signup buttons and simulates clicks', () => {
    const mockNavigate = jest.fn(); // mock the navigate function
    useNavigate.mockImplementation(() => mockNavigate); // make sure our mockNavigate is used

    render(<App />);  // render the app, which already includes a Router

    // look for the login and signup buttons
    const loginButton = screen.getByRole('button', { name: /log in/i });
    const signUpButton = screen.getByRole('button', { name: /sign up/i });

    // check that the buttons are rendered
    expect(loginButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();

    // simulate clicking both buttons
    fireEvent.click(loginButton);
    fireEvent.click(signUpButton);

    // ensure that our mockNavigate was called the right number of times and with correct routes
    expect(mockNavigate).toHaveBeenCalledTimes(2);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(mockNavigate).toHaveBeenCalledWith('/signup');
  });

  test('renders statistics section', () => {
    renderLandingPage();

    // check if the statistics values are visible on the page
    expect(screen.getByText(/97.4%/i)).toBeInTheDocument();
    expect(screen.getByText(/2 million/i)).toBeInTheDocument();
    expect(screen.getByText(/30-35%/i)).toBeInTheDocument();
  });

  test('accordion toggles content', () => {
    renderLandingPage();

    // find all the accordion headers and simulate clicks to toggle their content
    const accordionHeaders = screen.getAllByRole('button');

    // click on the first accordion header to show the content
    fireEvent.click(accordionHeaders[0]);
    expect(screen.getByText(/chemoCompanion is a support app/i)).toBeVisible();
  });
});
