import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Cat } from '../interfaces/CatInterfaces';

const CopyCatDetails: React.FC = () => {
  const { catId } = useParams<{ catId: string }>();
  const [cat, setCat] = useState<Cat | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.thecatapi.com/v1/images/${catId}`, {
          headers: {
            'x-api-key': 'live_a1F2iA1wqRf6ayWFfuRUAKU2xtEvQK2FmCKFHJjBgpy38PuJZcLXxivjdBApjy5t',
          },
        });
        setCat(response.data);
      } catch (error) {
        setError('Failed to load cat image.');
      } finally {
        setLoading(false);
      }
    };

    if (catId) {
      fetchCat();
    }
  }, [catId]);

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : cat ? (
        <div>
          <h1>Cat Details</h1>
          <img src={cat.url} alt="Cat" className="img-fluid mb-3" />
          {cat.breeds && cat.breeds.length > 0 && (
            <div>
              <h5>Breed: {cat.breeds[0].name}</h5>
              <p><strong>Origin:</strong> {cat.breeds[0].origin}</p>
              <p>{cat.breeds[0].description}</p>
            </div>
          )}
        </div>
      ) : (
        <p>No cat found.</p>
      )}
    </div>
  );
};

export default CopyCatDetails;
