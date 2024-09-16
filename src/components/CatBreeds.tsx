import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css'; 
import { Cat, Breed } from '../interfaces/CatInterfaces'; 
import CatModal from './CatModal'; 

const CatBreeds: React.FC = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [breedImages, setBreedImages] = useState<Cat[]>([]);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null); // State for the selected cat image

  // Function to load cat breeds from the API
  const fetchBreeds = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        'https://api.thecatapi.com/v1/breeds',
        {
          headers: {
            'x-api-key': 'live_a1F2iA1wqRf6ayWFfuRUAKU2xtEvQK2FmCKFHJjBgpy38PuJZcLXxivjdBApjy5t',
          },
        }
      );
      setBreeds(response.data);
    } catch (error) {
      setError('Failed to load cat breeds. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch images of a specific breed
  const fetchBreedImages = async (breedId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}`,
        {
          headers: {
            'x-api-key': 'YOUR_API_KEY', 
          },
        }
      );
      setBreedImages(response.data);
    } catch (error) {
      setError('Failed to load breed images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  // Function to handle when a breed is clicked
  const handleBreedClick = (breed: Breed) => {
    setSelectedBreed(breed); // Set the selected breed
    fetchBreedImages(breed.id); // Fetch images for the selected breed
  };

  // Function to handle when a cat image is clicked and the modal should open
  const handleCatClick = (cat: Cat) => {
    setSelectedCat(cat); // Set the clicked cat as the selected one
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedCat(null); // Reset the selected cat to close the modal
  };

  return (
    <div className="container">
      <h1 className="my-4">Cat Breeds</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {breeds.map((breed) => (
            <div key={breed.id} className="col-md-4 mb-4">
              <div className="card h-100" onClick={() => handleBreedClick(breed)} style={{ cursor: 'pointer' }}>
                <div className="card-body">
                  <h5 className="card-title">{breed.name}</h5>
                  <p className="card-text"><strong>Origin:</strong> {breed.origin}</p>
                  <p className="card-text"><strong>Temperament:</strong> {breed.temperament}</p>
                  <p className="card-text">{breed.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for displaying breed-specific images */}
      {selectedBreed && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedBreed.name} - Breed Images</h5>
                <button type="button" className="close" onClick={() => setSelectedBreed(null)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {loading ? (
                  <p>Loading images...</p>
                ) : (
                  <div className="row">
                    {breedImages.map((cat) => (
                      <div key={cat.id} className="col-md-4 mb-4">
                        <img
                          src={cat.url}
                          className="img-fluid"
                          alt="Breed"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleCatClick(cat)} // Open CatModal with the selected cat image
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CatModal for the selected cat image */}
      {selectedCat && <CatModal selectedCat={selectedCat} onClose={handleCloseModal} />}
    </div>
  );
};

export default CatBreeds;
