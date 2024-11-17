import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './Navbar';

describe('NavBar component', () => {
  it('renders the navbar with links', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );

    // check if essential navbar links are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('AI Chatbot Page')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Patient Data')).toBeInTheDocument();
  });

  it('opens and closes the profile dropdown when clicked', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );

    const profileButton = screen.getByText('Profile');
    
    // initially, dropdown should not be visible
    expect(screen.queryByText('Account Management')).toBeNull();
    expect(screen.queryByText('Sign Out')).toBeNull();

    // open dropdown
    fireEvent.click(profileButton);

    // check if dropdown is visible
    expect(screen.getByText('Account Management')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();

    // close dropdown
    fireEvent.click(profileButton);

    // ensure dropdown is closed
    expect(screen.queryByText('Account Management')).toBeNull();
    expect(screen.queryByText('Sign Out')).toBeNull();
  });
});
