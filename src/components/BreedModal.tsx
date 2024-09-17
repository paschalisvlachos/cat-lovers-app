import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BreedModalProps } from '../interfaces/CatInterfaces';
import '../index.css'

const BreedModal: React.FC<BreedModalProps> = ({ selectedBreed, breedImages, onClose, handleCatClick }) => {
  if (!selectedBreed) return null;

  return (
    <Modal show={!!selectedBreed} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{selectedBreed.name} - Images</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          {breedImages.map((cat) => (
            <div key={cat.id} className="col-md-4 mb-4">
              <img
                src={cat.url}
                className="cat-img img-fluid"
                alt={selectedBreed.name}
                style={{ cursor: 'pointer' }}
                onClick={() => handleCatClick(cat)}
              />
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BreedModal;
