import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Cat } from '../interfaces/CatInterfaces';

interface CatModalProps {
  selectedCat: Cat | null;
  onClose: () => void;
}

const CatModal: React.FC<CatModalProps> = ({ selectedCat, onClose }) => {
  if (!selectedCat) return null;

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cat Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={selectedCat.url}
          alt="Selected cat"
          className="img-fluid mb-3"
          style={{ width: '100%' }}
        />
        {selectedCat.breeds && selectedCat.breeds.length > 0 ? (
          <div>
            <h5>Breed: {selectedCat.breeds[0].name}</h5>
            <p><strong>Origin:</strong> {selectedCat.breeds[0].origin}</p>
            <p><strong>Description:</strong> {selectedCat.breeds[0].description}</p>
            <p><strong>Temperament:</strong> {selectedCat.breeds[0].temperament}</p>
          </div>
        ) : (
          <p>No breed information available for this cat.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CatModal;
