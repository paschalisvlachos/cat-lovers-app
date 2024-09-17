import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cat, CatGalleryProps } from '../interfaces/CatInterfaces';

const CatGallery: React.FC<CatGalleryProps> = ({ addToFavorites, removeFromFavorites, isFavorite }) => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch cats from API
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
      setError('Failed to load cat images.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleCatClick = (cat: Cat) => {
    navigate(`/cat/${cat.id}`, { state: { backgroundLocation: location } }); // Open modal over gallery
  };

  return (
    <div className="container">
      <h1 className="my-4">Gallery</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        {cats.map((cat) => (
          <div key={cat.id} className="col-md-4 mb-4">
            <div className="card" onClick={() => handleCatClick(cat)} style={{ cursor: 'pointer' }}>
              <img src={cat.url} className="cat-img card-img-top" alt="Cute cat" />
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-primary my-4" onClick={fetchCats} disabled={loading}>
        {loading ? 'Loading...' : 'Load More Cats'}
      </button>
    </div>
  );
};

export default CatGallery;
