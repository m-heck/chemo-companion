import React from 'react';
import { render, screen } from '@testing-library/react';
import Resources from './Resources';
import { BrowserRouter as Router } from 'react-router-dom';

const renderResources = () => {
  render(
    <Router>
      <Resources />
    </Router>
  );
};

describe('Resources component', () => {
  it('renders the component with the correct heading', () => {
    renderResources();

    expect(screen.getByText(/find reliable information/i)).toBeInTheDocument();
  });

  it('renders the introduction section with description', () => {
    renderResources();

    expect(screen.getByText(/Here are some trusted resources/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore these links/i)).toBeInTheDocument();
  });

  it('renders all resource items with correct titles', () => {
    renderResources();

    const resourceItems = [
      'American Cancer Society',
      'National Cancer Institute',
      'CancerCare',
      'Healthline',
    ];

    resourceItems.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders all resource links with correct URLs', () => {
    renderResources();

    const resourceLinks = screen.getAllByRole('link', {
      name: /visit website/i,
    });

    const expectedUrls = [
      'https://www.cancer.org',
      'https://www.cancer.gov',
      'https://www.cancercare.org',
      'https://www.healthline.com',
    ];

    resourceLinks.forEach((link, index) => {
      expect(link).toHaveAttribute('href', expectedUrls[index]);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('contains a footer at the bottom of the page', () => {
    renderResources();

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
