// src/components/CatBreeds.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // For navigation and location
import { Breed, Cat } from '../interfaces/CatInterfaces';
import BreedModal from './BreedModal'; // Import the new BreedModal component

const CatBreeds: React.FC = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [breedImages, setBreedImages] = useState<Cat[]>([]);
  const navigate = useNavigate();
  const location = useLocation(); // To get the current location

  const fetchBreeds = async () => {
    try {
      setError(null);
      const response = await axios.get('https://api.thecatapi.com/v1/breeds', {
        headers: {
          'x-api-key': 'live_a1F2iA1wqRf6ayWFfuRUAKU2xtEvQK2FmCKFHJjBgpy38PuJZcLXxivjdBApjy5t',
        },
      });
      setBreeds(response.data);
    } catch (error) {
      setError('Failed to load cat breeds. Please try again.');
    }
  };

  const fetchBreedImages = async (breedId: string) => {
    try {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}`,
        {
          headers: {
            'x-api-key': 'live_a1F2iA1wqRf6ayWFfuRUAKU2xtEvQK2FmCKFHJjBgpy38PuJZcLXxivjdBApjy5t',
          },
        }
      );
      setBreedImages(response.data);
    } catch (error) {
      setError('Failed to load breed images.');
    }
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  const handleBreedClick = (breed: Breed) => {
    setSelectedBreed(breed);
    fetchBreedImages(breed.id);
  };

  const handleCatClick = (cat: Cat) => {
    navigate(`/cat/${cat.id}`, { state: { backgroundLocation: location } });
  };

  return (
    <div className="container">
      <h1 className="my-4">Cat Breeds</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {breeds.map((breed) => (
          <div key={breed.id} className="col-md-4 mb-4">
            <div className="card" onClick={() => handleBreedClick(breed)} style={{ cursor: 'pointer' }}>
              <div className="card-body">
                <h5 className="card-title">{breed.name}</h5>
                <p><strong>Origin:</strong> {breed.origin}</p>
                <p><strong>Temperament:</strong> {breed.temperament}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Use the new BreedModal component */}
      <BreedModal
        selectedBreed={selectedBreed}
        breedImages={breedImages}
        onClose={() => setSelectedBreed(null)}
        handleCatClick={handleCatClick}
      />
    </div>
  );
};

export default CatBreeds;
