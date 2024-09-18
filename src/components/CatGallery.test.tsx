import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CatGallery from './CatGallery';
import { Cat } from '../interfaces/CatInterfaces';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Mock the Axios instance
const mockAxios = new MockAdapter(axios);

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock data
const mockCats: Cat[] = [
  {
    id: '1',
    url: 'https://example.com/cat1.jpg',
    breeds: [{
        id: 'persian', name: 'Persian',
        description: '',
        origin: '',
        temperament: ''
    }],
  },
  {
    id: '2',
    url: 'https://example.com/cat2.jpg',
    breeds: [],
  },
];

describe('CatGallery Component', () => {
  beforeEach(() => {
    mockAxios
      .onGet('https://api.thecatapi.com/v1/images/search?limit=10&include_breeds=true')
      .reply(200, mockCats);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should handle cat click and navigate to the detail page', async () => {
    render(
      <Router>
        <CatGallery addToFavorites={jest.fn()} removeFromFavorites={jest.fn()} isFavorite={jest.fn()} />
      </Router>
    );

    // Wait for cats to be rendered
    await waitFor(() => {
      expect(screen.getByAltText('Cat 1')).toBeInTheDocument();
    });

    // Simulate clicking the first cat image
    fireEvent.click(screen.getByAltText('Cat 1'));

    // Ensure navigation is called with the correct URL
    expect(mockNavigate).toHaveBeenCalledWith('/cat/1', { state: { backgroundLocation: expect.any(Object) } });
  });
});
