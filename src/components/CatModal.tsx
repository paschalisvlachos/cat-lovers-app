import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { Cat } from '../interfaces/CatInterfaces';

interface CatModalProps {
  onClose: () => void;
  addToFavorites: (cat: Cat) => void;
  removeFromFavorites: (cat: Cat) => void;
  isFavorite: (catId: string) => boolean;
}

const CatModal: React.FC<CatModalProps> = ({ onClose, addToFavorites, removeFromFavorites, isFavorite }) => {
  const { catId } = useParams<{ catId: string }>();
  const [cat, setCat] = useState<Cat | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (catId) {
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

      fetchCat();
    }
  }, [catId]);

  const handleClose = () => {
    onClose();
    navigate('/');
  };

  return (
    <Modal show={!!cat} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Cat Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : cat ? (
          <>
            <img src={cat.url} alt="Cat" className="img-fluid mb-3" />
            
            {cat.breeds && cat.breeds.length > 0 && (
              <div>
                <h5>Breed: {cat.breeds[0].name}</h5>
                <p><strong>Origin:</strong> {cat.breeds[0].origin}</p>
                <p>{cat.breeds[0].description}</p>
              </div>
            )}

            <div className="mt-auto">
              <Button
                variant={isFavorite(cat.id) ? 'danger' : 'primary'}
                onClick={() => isFavorite(cat.id) ? removeFromFavorites(cat) : addToFavorites(cat)}
              >
                {isFavorite(cat.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
            </div>
          </>
        ) : (
          <p>No cat found.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CatModal;
