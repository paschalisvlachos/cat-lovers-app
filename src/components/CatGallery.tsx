import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../index.css'; 
import { Cat } from '../interfaces/CatInterfaces'; 
import CatModal from './CatModal'; 

const CatGallery: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null); // State for the selected cat
  const initialFetchRef = useRef<boolean>(false);

  // Function to load cats from the API
  const fetchCats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        'https://api.thecatapi.com/v1/images/search?limit=10&include_breeds=true',
        {
          headers: {
            'x-api-key': 'live_a1F2iA1wqRf6ayWFfuRUAKU2xtEvQK2FmCKFHJjBgpy38PuJZcLXxivjdBApjy5t',
          },
        }
      );

      setCats((prevCats) => [...prevCats, ...response.data]);
    } catch (error) {
      setError('Failed to load cat images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialFetchRef.current) {
      fetchCats();
      initialFetchRef.current = true;
    }
  }, []);

  // Function to handle when a cat is clicked and the modal should open
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

      <div className="row">
        {cats.map((cat) => (
          <div key={cat.id} className="col-md-4 mb-4">
            <div className="card" onClick={() => handleCatClick(cat)} style={{ position: 'relative' }}>
              <img src={cat.url} className="cat-img card-img-top" alt="Cute cat" />
              {cat.breeds && cat.breeds.length > 0 && (
                <span className="breed-icon">★</span>
              )
              }
            </div>
          </div>
        ))}
      </div>

      <button
        className="btn btn-primary my-4"
        onClick={fetchCats}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Load More Cats'}
      </button>

      {/* Render the modal component */}
      <CatModal selectedCat={selectedCat} onClose={handleCloseModal} />
    </div>
  );
};

export default CatGallery;
