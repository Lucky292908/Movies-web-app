import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './Movies.css'; // Import the CSS file
import { Movie } from '../MovieInterface'; // Import the Movie interface
import { RotatingLines } from 'react-loader-spinner';

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [playingMovieUrl, setPlayingMovieUrl] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: '57f5719c4c694f54a902ec2ac3395714',
            language: 'en-US',
            page: 3
          }
        });

        const movieResults: Movie[] = response.data.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          release_date: movie.release_date,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          videoUrl: '' // Initialize videoUrl to empty string
        }));

        const moviesWithUrls = await fetchVideoUrls(movieResults);
        setMovies(moviesWithUrls);
        setLoading(false); // Set loading to false after data fetching
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, []);

  const fetchVideoUrls = async (moviesData: Movie[]) => {
    const moviesWithUrls = await Promise.all(moviesData.map(async (movie) => {
      const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos`, {
        params: {
          api_key: '57f5719c4c694f54a902ec2ac3395714',
          language: 'en-US'
        }
      });

      const videoData = videoResponse.data.results.find((result: any) => result.type === "Trailer" && result.site === "YouTube");
      if (videoData) {
        movie.videoUrl = `https://www.youtube.com/watch?v=${videoData.key}`;
      }
      
      return movie;
    }));
    return moviesWithUrls;
  };

  const handlePlayMovie = (movie: Movie) => {
    // If a movie is already playing, stop it before playing the new one
    if (playingMovieUrl && selectedMovie?.id !== movie.id) {
      setPlayingMovieUrl(null);
      setSelectedMovie(null);
      setIsFullScreen(false);
    }

    setPlayingMovieUrl(movie.videoUrl);
    setSelectedMovie(movie);
    setIsFullScreen(true);
  };

  const handleClosePlayer = () => {
    setPlayingMovieUrl(null);
    setSelectedMovie(null);
    setIsFullScreen(false);
  };

  const Rating: React.FC<{ average: number }> = ({ average }) => {
    const stars = [];
    let starClass = '';

    for (let i = 0; i < 5; i++) {
      if (i < Math.round(average / 2)) {
        if (average >= 7) {
          starClass = 'star-green';
        } else if (average >= 5) {
          starClass = 'star-yellow';
        } else {
          starClass = 'star-red';
        }
      } else {
        starClass = '';
      }
      stars.push(<span key={i} className={`rating ${starClass}`}>&#9733;</span>);
    }

    return <div className="rating">{stars}</div>;
  };

  return (
    <div className="movies-container">
      
      {loading ? ( // Render loading spinner if data is loading
        <RotatingLines strokeColor='#ae4ab0'></RotatingLines>
      ) : (
        movies.map((movie, index) => (
          <div
            className="card"
            key={movie.id}
            onMouseEnter={() => setHoveredCardIndex(index)}
            onMouseLeave={() => setHoveredCardIndex(null)}
            onClick={() => handlePlayMovie(movie)}
          >
            {movie.poster_path && (
              <div className="over">
                {hoveredCardIndex === index && (
                  <ReactPlayer
                    url={movie.videoUrl}
                    playing={true}
                    controls={false}
                    width="100%"
                    height="100%"
                  />
                )}
                <img 
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                {(!playingMovieUrl || (playingMovieUrl && selectedMovie?.id !== movie.id)) && (
                  <div className="overview">{movie.overview}</div>
                )}
              </div>
            )}
            <span className="title">{movie.title}</span>
            <div className="rt"> <Rating average={movie.vote_average} /></div>
            <h5 className="re">Release Date: {movie.release_date}</h5>
          </div>
        ))
      )}

      {playingMovieUrl && selectedMovie && (
        <div className={`video-player ${isFullScreen ? 'full-screen' : ''}`}>
          <ReactPlayer url={playingMovieUrl} playing={true} controls={true} width="100%" height="100%" />
          <button className="close-button" onClick={handleClosePlayer}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Movies;
