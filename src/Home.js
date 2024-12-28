import React, { useState } from 'react';

import './Home.css';

function Home({ movies }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter movies based on the search term
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle movie card click
  const handleMovieClick = (movieLink) => {
    if (movieLink) {
      window.open(movieLink, '_blank'); // Open movie link in a new tab
    } else {
      alert("No link available for this movie.");
    }
  };

  return (
    <>
      <div className="home-page">
        {/* Welcome Section */}
        <div className="video-overlay">
          <h1 className="welcome-text">Welcome to FRAMECINI</h1>
          <p className="welcome-description">Discover your favorite movies and more.</p>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Movies Section */}
        <div className="home-container">
          <h2>Movies</h2>
          <div className="movies-grid">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="movie-card"
                  onClick={() => handleMovieClick(movie.movi_link)} // Use the link from the movie object
                >
                  <img src={movie.poster} alt={movie.title} className="movie-image" />
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p><strong>Genre:</strong> {Array.isArray(movie.genre) ? movie.genre.join(', ') : 'N/A'}</p>
                    <p><strong>Rating:</strong> {movie.rating}</p>
                    <p><strong>Language:</strong> {movie.language}</p>
                    <p><strong>Director:</strong> {movie.director}</p>
                    <p><strong>Cast:</strong> {Array.isArray(movie.cast) ? movie.cast.join(', ') : 'N/A'}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No movies found matching your search.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
