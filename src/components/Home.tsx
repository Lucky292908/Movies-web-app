// Home.tsx

import React, { useState, ChangeEvent, useEffect } from 'react';
import './Home.css'; // Import the CSS file
import OtherMovies from './OtherMovies';
import Trailer from './Trailer';


const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');
  const [yearFilter, setYearFilter] = useState<string | null>(null);
  const [ratingFilter, setRatingFilter] = useState<string | null>(null);
  const [topRatedUrl, setTopRatedUrl] = useState<string>('https://api.themoviedb.org/3/movie/top_rated'); // Initial API URL for top rated movies
  const movieId = 123; // Replace 123 with the actual movie ID

  const LatestUrl = '  https://api.themoviedb.org/3/discover/movie';
  const popularUrl = 'https://api.themoviedb.org/3/movie/popular';
  const similarUrl = 'https://api.themoviedb.org/3/movie/560/similar';
  const recommendationUrl = 'https://api.themoviedb.org/3/movie/123/recommendations';

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    // Debounce the search input changes
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // Adjust the delay time as needed

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  useEffect(() => {
    // Update the API URL based on the debounced search query
    const newTopRatedUrl = debouncedSearchQuery
      ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(debouncedSearchQuery)}`
      : 'https://api.themoviedb.org/3/movie/top_rated'; // If no search query, show top rated movies
    setTopRatedUrl(newTopRatedUrl);
  }, [debouncedSearchQuery]);

  useEffect(() => {
    // Constructing filter query parameters
    const filterParams = [];

    if (yearFilter) {
      filterParams.push(`primary_release_year=${yearFilter}`);
    }

    if (ratingFilter) {
      const [minRating, maxRating] = ratingFilter.split('-');
      filterParams.push(`vote_average.gte=${minRating}&vote_average.lte=${maxRating}`);
    }

    // Constructing final API URL with filters
    const apiUrlWithFilters = filterParams.length
      ? `${LatestUrl}?${filterParams.join('&')}`
      : LatestUrl;

    setTopRatedUrl(apiUrlWithFilters);
  }, [yearFilter, ratingFilter]);

  const handleYearFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setYearFilter(event.target.value === 'null' ? null : event.target.value);
  };

  const handleRatingFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRatingFilter(event.target.value === 'null' ? null : event.target.value);
  };

  // Generate year range options with a 1-year gap
  const yearOptions = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1900; year -= 1) {
    yearOptions.push(`${year}`);
  }

  return (
   <>
   
   <Trailer  />
    <div className="movies-container">
    
   
       {/* <ContinuousBackground></ContinuousBackground> */}
      <div className='serch'><div className="search-bar">
        <input
          type="text"
          placeholder="Search movies by title..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
     

      
        
        <div className="filter-group">
        
          <label htmlFor="year-filter"></label>
          <select id="year-filter" value={yearFilter || 'null'} onChange={handleYearFilterChange}>
            <option value="null"> Filter Year</option>
            {yearOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="rating-filter"></label>
          <select id="rating-filter" value={ratingFilter || 'null'} onChange={handleRatingFilterChange}>
            <option value="null"> Filter Rating</option>
            <option value="1-3">1-3</option>
            <option value="4-7">4-7</option>
            <option value="7-10">7-10</option>
          </select>
          
        </div>
     
      </div>
     
      {/* Movie sections */}
      <h1 className="section-title">All Movies</h1>
      <div className="horizontal-scroll">
        <OtherMovies apiUrl={topRatedUrl} />
      </div>

      <h1 className="section-title">Top Rated Movies</h1>
      <div className="horizontal-scroll">
        <OtherMovies apiUrl={LatestUrl} />
      </div>

      <h1 className="section-title">Popular Movies</h1>
      <div className="horizontal-scroll">
        <OtherMovies apiUrl={popularUrl} />
      </div>

      <h1 className="section-title">Similar Movies</h1>
      <div className="horizontal-scroll">
        <OtherMovies apiUrl={similarUrl} />
      </div>

      <h1 className="section-title">Recommendations</h1>
      <div className="horizontal-scroll">
        <OtherMovies apiUrl={recommendationUrl} />
      </div>
    </div>
   
   
   </>
  );
};

export default Home;

