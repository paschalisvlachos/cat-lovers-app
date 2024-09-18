import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Favorites from './CatFavorites';
import { Cat } from '../interfaces/CatInterfaces';

// Mock data for favorite cats
const mockFavorites: Cat[] = [
  {
    id: '1',
    url: 'https://example.com/cat1.jpg',
    breeds: [],
  },
  {
    id: '2',
    url: 'https://example.com/cat2.jpg',
    breeds: [],
  },
];

// Mock an empty favorites list
const emptyFavorites: Cat[] = [];

// Properly mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Favorites Component', () => {
  it('renders a message when there are no favorite cats', () => {
    render(
      <Router>
        <Favorites favorites={emptyFavorites} />
      </Router>
    );

    // Check if the "no favorites" message is displayed
    expect(screen.getByText('You have no favourite cats yet.')).toBeInTheDocument();
  });

  it('renders the favorite cats when there are favorites', () => {
    render(
      <Router>
        <Favorites favorites={mockFavorites} />
      </Router>
    );

    // Check if the favorite cats are rendered
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(2);
    expect(images[0]).toHaveAttribute('src', 'https://example.com/cat1.jpg');
    expect(images[1]).toHaveAttribute('src', 'https://example.com/cat2.jpg');
  });

  it('navigates to the cat detail page when a favorite cat is clicked', () => {
    render(
      <Router>
        <Favorites favorites={mockFavorites} />
      </Router>
    );

    // Simulate clicking on the first cat image
    fireEvent.click(screen.getAllByRole('img')[0]);

    // Ensure that navigate was called with the correct argument
    expect(mockNavigate).toHaveBeenCalledWith('/cat/1', {
      state: { backgroundLocation: expect.any(Object) },
    });
  });
});
