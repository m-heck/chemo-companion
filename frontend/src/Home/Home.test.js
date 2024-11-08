import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

describe('Home page', () => {
  // helper function to render the home page with necessary wrappers
  const renderHomePage = () => {
    render(
      <Router>
        <Home />
      </Router>
    );
  };

  test('renders welcome message', () => {
    renderHomePage();

    // check if the welcome message is visible
    expect(screen.getByRole('heading', { level: 1, name: /welcome to chemoCompanion/i })).toBeInTheDocument();
    expect(screen.getByText(/your trusted partner in managing your health journey/i)).toBeInTheDocument();
  });

  test('renders buttons with correct links', () => {
    renderHomePage();

    // check if the "Get Started" button links to /chatbot
    const getStartedButton = screen.getByRole('button', { name: /get started/i });
    expect(getStartedButton.closest('a')).toHaveAttribute('href', '/chatbot');

    // check if the "Learn More" button links to /learn-more
    const learnMoreButton = screen.getByRole('button', { name: /learn more/i });
    expect(learnMoreButton.closest('a')).toHaveAttribute('href', '/learn-more');
  });

  test('renders feature section', () => {
    renderHomePage();

    // check if the feature section headers and content are visible
    expect(screen.getByText(/ai chatbot for immediate support/i)).toBeInTheDocument();
    expect(screen.getByText(/real-time symptom tracking/i)).toBeInTheDocument();
    expect(screen.getByText(/resources and support/i)).toBeInTheDocument();
  });
});
