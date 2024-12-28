import React, { useState, useEffect } from 'react';
import './Year.css'; // Assuming the updated CSS is in this file

function YearFilter() {
  const [movies, setMovies] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    fetch('/container.json')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movie data:', error));
  }, []);

  useEffect(() => {
    if (selectedYear === 'all') {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) => movie.releaseYear === parseInt(selectedYear));
      setFilteredMovies(filtered);
    }
  }, [selectedYear, movies]);

  const handleChange = (year) => {
    setSelectedYear(year);
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
    <div className="year-filter-container">
      <h2>Filter Movies by Year</h2>
      
      <div className="year-buttons">
        <button
          className={`year-button ${selectedYear === 'all' ? 'active' : ''}`}
          onClick={() => handleChange('all')}
        >
          All Years
        </button>
        <button
          className={`year-button ${selectedYear === '2024' ? 'active' : ''}`}
          onClick={() => handleChange('2024')}
        >
          2024
        </button>
        <button
          className={`year-button ${selectedYear === '2023' ? 'active' : ''}`}
          onClick={() => handleChange('2023')}
        >
          2023
        </button>
        <button
          className={`year-button ${selectedYear === '2022' ? 'active' : ''}`}
          onClick={() => handleChange('2022')}
        >
          2022
        </button>
        <button
          className={`year-button ${selectedYear === '2021' ? 'active' : ''}`}
          onClick={() => handleChange('2021')}
        >
          2021
        </button>
        <button
          className={`year-button ${selectedYear === '2020' ? 'active' : ''}`}
          onClick={() => handleChange('2020')}
        >
          2020
        </button>
        <button
          className={`year-button ${selectedYear === '2019' ? 'active' : ''}`}
          onClick={() => handleChange('2019')}
        >
          2019
        </button>
      </div>

      <div className="year-filter-message">
        {selectedYear !== 'all' ? (
          <p>Showing movies from the year {selectedYear}</p>
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
          <p>No movies found for the selected year.</p>
        )}
      </div>
    </div>
  );
}

export default YearFilter;
