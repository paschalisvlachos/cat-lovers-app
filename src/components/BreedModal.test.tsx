import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BreedModal from './BreedModal';
import { Breed, Cat } from '../interfaces/CatInterfaces';

// Mock data
const mockBreed: Breed = {
  id: '1',
  name: 'Persian',
  origin: 'Iran',
  description: 'A cute and fluffy Persian cat.',
  temperament: 'Calm and friendly',
};

const mockBreedImages: Cat[] = [
  { id: 'cat1', url: 'https://example.com/cat1.jpg', breeds: [] },
  { id: 'cat2', url: 'https://example.com/cat2.jpg', breeds: [] },
];

const mockOnClose = jest.fn();
const mockHandleCatClick = jest.fn();

describe('BreedModal Component', () => {
  it('renders breed details and images correctly when a breed is selected', () => {
    render(
      <BreedModal
        selectedBreed={mockBreed}
        breedImages={mockBreedImages}
        onClose={mockOnClose}
        handleCatClick={mockHandleCatClick}
      />
    );

    // Check if the modal title and breed name are rendered
    expect(screen.getByText('Persian - Images')).toBeInTheDocument();

    // Check if the breed images are rendered
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(2);
    expect(images[0]).toHaveAttribute('src', 'https://example.com/cat1.jpg');
    expect(images[1]).toHaveAttribute('src', 'https://example.com/cat2.jpg');
  });

  it('calls handleCatClick when an image is clicked', () => {
    render(
      <BreedModal
        selectedBreed={mockBreed}
        breedImages={mockBreedImages}
        onClose={mockOnClose}
        handleCatClick={mockHandleCatClick}
      />
    );

    // Simulate clicking the first image
    fireEvent.click(screen.getAllByRole('img')[0]);

    // Check if handleCatClick was called with the correct argument
    expect(mockHandleCatClick).toHaveBeenCalledWith(mockBreedImages[0]);
  });

  it('calls onClose when the close button is clicked', () => {
    render(
      <BreedModal
        selectedBreed={mockBreed}
        breedImages={mockBreedImages}
        onClose={mockOnClose}
        handleCatClick={mockHandleCatClick}
      />
    );

    // Simulate clicking the close button
    fireEvent.click(screen.getByText('Close'));

    // Ensure onClose was called
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('does not render anything when no breed is selected', () => {
    const { container } = render(
      <BreedModal
        selectedBreed={null}
        breedImages={[]}
        onClose={mockOnClose}
        handleCatClick={mockHandleCatClick}
      />
    );

    // Ensure the modal is not rendered when no breed is selected
    expect(container).toBeEmptyDOMElement();
  });
});
