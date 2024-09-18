import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';
import CatBreeds from './CatBreeds';

// Set up Axios Mock Adapter
const mockAxios = new MockAdapter(axios);

// Mock Data
const mockBreeds = [
  { id: '1', name: 'Persian', origin: 'Iran', temperament: 'Calm and friendly' },
  { id: '2', name: 'Siamese', origin: 'Thailand', temperament: 'Energetic' },
];

const mockBreedImages = [
  { id: '1', url: 'https://example.com/cat1.jpg', breeds: [] },
  { id: '2', url: 'https://example.com/cat2.jpg', breeds: [] },
];

// Unit test for CatBreeds component
describe('CatBreeds Component', () => {
  beforeEach(() => {
    // Mock GET request for cat breeds
    mockAxios.onGet('https://api.thecatapi.com/v1/breeds').reply(200, mockBreeds);
  });

  afterEach(() => {
    // Reset Axios Mock Adapter after each test
    mockAxios.reset();
  });

  it('should fetch and render the list of breeds', async () => {
    render(
      <Router>
        <CatBreeds />
      </Router>
    );

    // Check if the breeds are displayed after API call
    await waitFor(() => {
      expect(screen.getByText('Persian')).toBeInTheDocument();
      expect(screen.getByText('Siamese')).toBeInTheDocument();
    });
  });

  it('should handle breed selection and open the modal with breed images', async () => {
    // Mock GET request for breed images
    mockAxios
      .onGet('https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=1')
      .reply(200, mockBreedImages);

    render(
      <Router>
        <CatBreeds />
      </Router>
    );

    // Wait for the breeds to render
    await waitFor(() => {
      expect(screen.getByText('Persian')).toBeInTheDocument();
    });

    // Click on the Persian breed card
    fireEvent.click(screen.getByText('Persian'));

    // Check if the modal is opened and breed images are displayed
    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images.length).toBe(2);
      expect(images[0]).toHaveAttribute('src', 'https://example.com/cat1.jpg');
    });
  });

  it('should display an error message if fetching breeds fails', async () => {
    // Mock API error
    mockAxios.onGet('https://api.thecatapi.com/v1/breeds').reply(500);

    render(
      <Router>
        <CatBreeds />
      </Router>
    );

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Failed to load cat breeds. Please try again.')).toBeInTheDocument();
    });
  });
});
