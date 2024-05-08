// Nave.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nave.css'; // Import CSS file for styling

const Nave: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`nav-container ${isActive ? 'active' : ''}`}>
      <div className="nav-left">
        <Link to="/" className="nav-logo">
        <img src="https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg" alt="Cogo" className="home-image" />
        </Link>
        <div className={`nav-links ${isActive ? 'active' : ''}`}>
          <Link to="/movies" className="nav-link"><i className="fas fa-film"></i> Movies</Link>
          <Link to="/popular" className="nav-link"><i className="fas fa-fire"></i> Popular</Link>
          <Link to="/similarMovies" className="nav-link"><i className="fas fa-link"></i> Similar</Link>
          <Link to="/top" className="nav-link"><i className="fas fa-star"></i> Top Rating</Link>
          <Link to="/recommendation" className="nav-link"><i className="fas fa-thumbs-up"></i> Recommended</Link>
          
        </div>
      </div>
      
      <div className={`hamburger ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
}

export default Nave;
