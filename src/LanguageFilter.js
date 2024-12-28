import React, { useState, useEffect } from 'react';
import './Lang.css';
import './King.css';

function LanguageFilter() {
  const [movies, setMovies] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Fetch movies from container.json
  useEffect(() => {
    fetch('/container.json')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Movies:', data); // Log fetched data to check
        setMovies(data);
      })
      .catch((error) => console.error('Error fetching movie data:', error));
  }, []);

  // Filter movies based on selected language
  useEffect(() => {
    let filtered = movies;

    // Only filter if selected language is not 'All'
    if (selectedLanguage !== 'All') {
      filtered = filtered.filter((movie) => {
        // Ensure movie.language exists and is a string or an array of languages
        if (Array.isArray(movie.language)) {
          // Check if the language array includes the selected language
          return movie.language.some((lang) => lang.toLowerCase() === selectedLanguage.toLowerCase());
        }
        // If movie.language is a string, check for direct match
        return movie.language.toLowerCase() === selectedLanguage.toLowerCase();
      });
    }

    setFilteredMovies(filtered);
  }, [selectedLanguage, movies]);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
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
      <h2>Filter Movies by Language</h2>

      {/* Language Filter Buttons - Displayed horizontally */}
      <div className="language-list">
        <button className="genre-item" onClick={() => handleLanguageChange('All')}>All Languages</button>
        <button className="genre-item" onClick={() => handleLanguageChange('Kannada')}>Kannada</button>
        <button className="genre-item" onClick={() => handleLanguageChange('Hindi')}>Hindi</button>
        <button className="genre-item" onClick={() => handleLanguageChange('Telugu')}>Telugu</button>
        <button className="genre-item" onClick={() => handleLanguageChange('English')}>English</button>
        <button className="genre-item" onClick={() => handleLanguageChange('Tamil')}>Tamil</button>
        <button className="genre-item" onClick={() => handleLanguageChange('Malayalam')}>Malayalam</button>
      </div>

      {/* Movie Cards */}
      <div className="movies-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => handleMovieClick(movie.movi_link)} // Open movie link on click
            >
              <img
                src={movie.poster}
                alt={`${movie.title} poster`}
                className="movie-image"
              />
              <h3 className="movie-title">{movie.title}</h3>
              <div className="movie-info">
                <p><strong>Genre:</strong> {movie.genre.join(', ')}</p>
                <p><strong>Year:</strong> {movie.releaseYear}</p>
                <p><strong>Rating:</strong> {movie.rating}</p>
                <p><strong>Language:</strong> {Array.isArray(movie.language) ? movie.language.join(', ') : movie.language}</p>
                <a
                  href={movie.trailer}
                  className="movie-trailer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Trailer
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No movies found for the selected language.</p>
        )}
      </div>
    </div>
  );
}

export default LanguageFilter;
