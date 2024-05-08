import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Nave from './components/Nave';
import Home from './components/Home';
import Movies from './components/Movies';
import Top from './components/Top';
import People from './components/Popular';
import SimilarMovies from './components/Similarmovies';
import Recommendation from './components/Recommendation';
import Footer from './components/Footer';
import Crew from './components/Crew';

function App() {
  return (
    <Router>
      <div className="App">
        <Nave /> {/* Navigation component */}
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/Top" element={<Top />} />
          <Route path="/popular" element={<People />} />
          <Route path="/SimilarMovies" element={<SimilarMovies></SimilarMovies>} />
          <Route path="/recommendation" element={<Recommendation></Recommendation>} />
         
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
