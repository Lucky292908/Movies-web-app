import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Trailer.css';

interface Movie {
  id: number;
  posterPath: string;
  videoUrl: string | null;
}

const Trailer: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = '57f5719c4c694f54a902ec2ac3395714';
        const movieUrl = 'https://api.themoviedb.org/3/movie/upcoming';

        const response = await fetch(`${movieUrl}?api_key=${apiKey}`);
        const responseData = await response.json();

        if (response.ok) {
          const movieData: Movie[] = responseData.results.map((movie: any) => ({
            id: movie.id,
            posterPath: movie.poster_path,
            videoUrl: null
          }));
          setMovies(movieData);
        } else {
          console.error('Error fetching data:', responseData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = async (movie: Movie, index: number) => {
    setSelectedImageIndex(index); // Store the index of the clicked image
    fetchVideo(movie);
  };

  const fetchVideo = async (movie: Movie) => {
    try {
      const apiKey = '57f5719c4c694f54a902ec2ac3395714';
      const videoUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`;

      const response = await fetch(videoUrl);
      const responseData = await response.json();

      if (response.ok) {
        const videoData = responseData.results.find((result: any) => result.type === "Trailer" && result.site === "YouTube");
        if (videoData) {
          setSelectedVideo(`https://www.youtube.com/watch?v=${videoData.key}`);
        } else {
          console.error('Trailer not found for the selected movie.');
        }
      } else {
        console.error('Error fetching video data:', responseData);
      }
    } catch (error) {
      console.error('Error fetching video data:', error);
    }
  };

  const handleVideoClose = () => {
    setSelectedVideo(null);
    setSelectedImageIndex(null); // Reset the selected image index when closing the video
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at a time
  };

  return (
    <div className="image-container" ref={imageContainerRef}>
      <Slider {...settings} className="slider-container">
        {movies.map((movie, index) => (
          <div key={index} className="card1" onClick={() => handleImageClick(movie, index)}>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.posterPath}`}
              alt={`Poster ${index}`}
              className="poster-image"
            />
          </div>
        ))}
      </Slider>
      {selectedVideo && (
        <div className="video-container">
          <ReactPlayer
            url={selectedVideo}
            playing={true}
            controls={true}
            width="100%"
            height="100%"
          />
          <button onClick={handleVideoClose} className="close-button">Close</button>
        </div>
      )}
    </div>
  );
};

export default Trailer;
