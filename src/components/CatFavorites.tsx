import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cat, FavoritesProps } from '../interfaces/CatInterfaces';

const Favorites: React.FC<FavoritesProps> = ({ favorites }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCatClick = (cat: Cat) => {
    navigate(`/cat/${cat.id}`, { state: { backgroundLocation: location } }); // Navigate to the modal for the selected cat
  };

  return (
    <div className="container">
      <h1 className="my-4">Your Favourite Cats</h1>
      {favorites.length === 0 ? (
        <p>You have no favourite cats yet.</p>
      ) : (
        <div className="row">
          {favorites.map((cat) => (
            <div key={cat.id} className="col-md-4 mb-4">
              <div className="card" onClick={() => handleCatClick(cat)} style={{ cursor: 'pointer' }}>
                <img src={cat.url} className="cat-img card-img-top" alt="Favorite cat" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
