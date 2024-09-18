import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation'; // Adjust the path if necessary

describe('Navigation Component', () => {
  it('should render the navigation bar with all links', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    // Check if the brand is rendered
    expect(screen.getByText('Cat Lovers App')).toBeInTheDocument();

    // Check if the links are rendered
    expect(screen.getByText('Gallery')).toBeInTheDocument();
    expect(screen.getByText('Breeds')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });

  it('should render the correct href values for the NavLinks', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    // Check if the links point to the correct routes
    expect(screen.getByText('Gallery').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Breeds').closest('a')).toHaveAttribute('href', '/breeds');
    expect(screen.getByText('Favorites').closest('a')).toHaveAttribute('href', '/favorites');
  });
});
