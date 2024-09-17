import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import CatGallery from './components/CatGallery';
import CatBreeds from './components/CatBreeds';
import Favorites from './components/CatFavorites';
import CatModal from './components/CatModal';
import CopyCatDetails from './components/CopyCatDetails';
import Navigation from './components/Navigation';
import { Cat } from './interfaces/CatInterfaces';

const App: React.FC = () => {
  const [favorites, setFavorites] = useState<Cat[]>([]);
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation || location;

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (cat: Cat) => {
    if (!favorites.some(fav => fav.id === cat.id)) {
      setFavorites([...favorites, cat]);
    }
  };

  const removeFromFavorites = (cat: Cat) => {
    setFavorites(favorites.filter(fav => fav.id !== cat.id));
  };

  const isFavorite = (catId: string) => {
    return favorites.some(fav => fav.id === catId);
  };

  return (
    <div>
      <Navigation />

      <Routes location={backgroundLocation}>
        <Route
          path="/"
          element={
            <CatGallery
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              isFavorite={isFavorite}
            />
          }
        />
        <Route path="/breeds" element={<CatBreeds />} />
        <Route path="/favorites" element={<Favorites favorites={favorites} />} />
        <Route path="/copycat/:catId" element={<CopyCatDetails />} />
      </Routes>

      {location.state?.backgroundLocation && (
        <Routes>
          <Route
            path="/cat/:catId"
            element={
              <CatModal
                onClose={() => window.history.back()}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                isFavorite={isFavorite}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
