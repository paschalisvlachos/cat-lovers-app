// src/components/Favorites.tsx

import React from 'react';
import { Cat } from '../interfaces/CatInterfaces';

interface FavoritesProps {
  favorites: Cat[]; // Accept the favorite cats as a prop
}

const Favorites: React.FC<FavoritesProps> = ({ favorites }) => {
  return (
    <div className="container">
      <h1 className="my-4">Your Favorite Cats</h1>
      {favorites.length === 0 ? (
        <p>You have no favorite cats yet.</p>
      ) : (
        <div className="row">
          {favorites.map((cat) => (
            <div key={cat.id} className="col-md-4 mb-4">
              <div className="card">
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
