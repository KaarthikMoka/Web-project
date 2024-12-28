import React, { useState, useEffect } from 'react';
import './RatingFilter.css'; // Assuming you have this file for your CSS

function RatingFilter() {
  const [movies, setMovies] = useState([]);
  const [selectedRating, setSelectedRating] = useState('all');
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Fetch movie data from JSON file or API
  useEffect(() => {
    fetch('/container.json')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movie data:', error));
  }, []);

  // Filter movies based on selected rating
  useEffect(() => {
    let filtered = movies;

    if (selectedRating !== 'all') {
      filtered = filtered.filter((movie) => movie.rating >= parseInt(selectedRating));
    }

    setFilteredMovies(filtered);
  }, [selectedRating, movies]);

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  // Handle movie card click to open the movie link
  const handleMovieClick = (movieLink) => {
    if (movieLink) {
      window.open(movieLink, '_blank'); // Open movie link in a new tab
    } else {
      alert("No link available for this movie.");
    }
  };

  return (
    <div className="filter-container">
      <h2>Filter Movies by Rating</h2>
      
      <div className="rating-buttons">
        <button
          className={`rating-button ${selectedRating === 'all' ? 'active' : ''}`}
          onClick={() => handleRatingChange('all')}
        >
          All Ratings
        </button>
        <button
          className={`rating-button ${selectedRating === '9' ? 'active' : ''}`}
          onClick={() => handleRatingChange('9')}
        >
          9 and above
        </button>
        <button
          className={`rating-button ${selectedRating === '8' ? 'active' : ''}`}
          onClick={() => handleRatingChange('8')}
        >
          8 and above
        </button>
        <button
          className={`rating-button ${selectedRating === '7' ? 'active' : ''}`}
          onClick={() => handleRatingChange('7')}
        >
          7 and above
        </button>
        <button
          className={`rating-button ${selectedRating === '6' ? 'active' : ''}`}
          onClick={() => handleRatingChange('6')}
        >
          6 and above
        </button>
      </div>

      <div className="filter-message">
        {selectedRating !== 'all' ? (
          <p>Showing movies with rating {selectedRating} and above</p>
        ) : (
          <p>Showing all movies</p>
        )}
      </div>

      <div className="movies-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => handleMovieClick(movie.movi_link)} // Open movie link on click
            >
              <img src={movie.poster} alt={movie.title} className="movie-image" />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p><strong>Genre:</strong> {Array.isArray(movie.genre) ? movie.genre.join(', ') : 'N/A'}</p>
                <p><strong>Rating:</strong> {movie.rating}</p>
                <p><strong>Language:</strong> {movie.language}</p>
                <p><strong>Director:</strong> {movie.director}</p>
                <p><strong>Cast:</strong> {Array.isArray(movie.cast) ? movie.cast.join(', ') : 'N/A'}</p>
                <div className="movie-links">
                  {Array.isArray(movie.links) && movie.links.length > 0 ? (
                    movie.links.map((link, index) => (
                      <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                        Watch on {link.platform}
                      </a>
                    ))
                  ) : (
                    <p>No links available</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No movies found for the selected rating.</p>
        )}
      </div>
    </div>
  );
}

export default RatingFilter;
