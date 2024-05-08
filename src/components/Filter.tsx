import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Filter.css';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const Filter: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sortBy, setSortBy] = useState<string>('popularity.desc'); // Default sorting by popularity
  const [filterByYear, setFilterByYear] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, );

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: '57f5719c4c694f54a902ec2ac3395714',
          sort_by: sortBy,
          primary_release_year: filterByYear
        }
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSortBy(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilterByYear(e.target.value);
  };

  return (
    <div>
      <div className='filter-container'>
        <div className='filter'>
          <label>
            Sort By:
            <select value={sortBy} onChange={handleSortChange}>
              <option value='vote_average.desc'>Rating High to Low</option>
              <option value='vote_average.asc'>Rating Low to High</option>
            </select>
          </label>
          <label>
            Filter By Year:
            <input type="number" value={filterByYear} onChange={handleYearChange} />
          </label>
        </div>
      </div>
      <div className="movie-container">
        <div className="movie-scroll">
          {movies.map((movie: Movie) => (
            <div key={movie.id} className="movie-card">
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>Release Year: {movie.release_date.substring(0, 4)}</p>
                <p>Rating: {movie.vote_average}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
