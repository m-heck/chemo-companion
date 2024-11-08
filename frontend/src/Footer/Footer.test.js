import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  test('renders the footer content', () => {
    render(<Footer />);

    // check if the footer text is visible
    expect(screen.getByText(/chemoCompanion - team monkeys/i)).toBeInTheDocument();
  });
});
