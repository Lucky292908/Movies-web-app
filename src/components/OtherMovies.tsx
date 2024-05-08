import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie } from '../MovieInterface';
import ReactPlayer from 'react-player';
import './OtherMovies.css';
import { RotatingLines } from 'react-loader-spinner';

interface OtherMoviesProps {
  apiUrl: string;
}

const OtherMovies: React.FC<OtherMoviesProps> = ({ apiUrl }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [playingMovieUrl, setPlayingMovieUrl] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [hoveredMovie, setHoveredMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchMovies(apiUrl);
        const moviesWithUrls = await fetchVideoUrls(movieData);
        setMovies(moviesWithUrls);
        setLoading(false); // Set loading to false after data fetching
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, [apiUrl]);

  const fetchMovies = async (url: string) => {
    const response = await axios.get(url, {
      params: {
        api_key: '57f5719c4c694f54a902ec2ac3395714',
        language: 'en-US',
        sort_by: 'popularity.desc',
        include_adult: true,
        include_video: true,
        page: 1
      }
    });
    return response.data.results;
  };

  const fetchVideoUrls = async (moviesData: any[]) => {
    const moviesWithUrls = await Promise.all(moviesData.map(async (movie: any) => {
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
    setPlayingMovieUrl(movie.videoUrl);
    setSelectedMovie(movie);
  };

  const handleClosePlayer = () => {
    setPlayingMovieUrl(null);
    setSelectedMovie(null);
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
    <div className="horizontal-scroll">
      {loading ? ( // Render loading spinner if data is loading
        <RotatingLines strokeColor='#ae4ab0'></RotatingLines>
      ) : (
        movies.map((movie) => (
          <div
            className={`card ${hoveredMovie === movie ? 'hovered' : ''}`}
            key={movie.id}
            onMouseEnter={() => setHoveredMovie(movie)}
            onMouseLeave={() => setHoveredMovie(null)}
            onClick={() => handlePlayMovie(movie)}
          >
            {movie.poster_path && (
              <div className='over'>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className='overview'>{movie.overview}</div>
                {hoveredMovie === movie && (
                  <div className='video-container'>
                    <ReactPlayer
                      url={movie.videoUrl}
                      playing={true} // Autoplay when hovered
                      controls={true}
                      width="100%"
                      height="100%"
                    />
                  </div>
                )}
              </div>
            )}
            <span className='title'>{movie.title}</span>
            <br />
            <div className='rt'> <Rating average={movie.vote_average} />
            </div>
            <h5 className='re'>Release Date: {movie.release_date}</h5>
          </div>
        ))
      )}
      {playingMovieUrl && (
        <div className="video-player">
          <ReactPlayer url={playingMovieUrl} controls={true} width="100%" height="100%" />
          <button onClick={handleClosePlayer}>Close</button>
        </div>
      )}
    </div>
  );
};

export default OtherMovies;
