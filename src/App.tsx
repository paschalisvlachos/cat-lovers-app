import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CatGallery from './components/CatGallery';
import CatBreeds from './components/CatBreeds';

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Cat Lovers</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Gallery</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/breeds">Cat Breeds</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<CatGallery />} />
        <Route path="/breeds" element={<CatBreeds />} />
      </Routes>
    </div>
  );
};

export default App;
