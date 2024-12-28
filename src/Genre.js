import React, { useState, useEffect } from 'react';
import './Genre.css';
import './King.css';

function GenreFilter() {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    fetch('/container.json')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movie data:', error));
  }, []);

  useEffect(() => {
    let filtered = movies;

    if (selectedGenre !== 'all') {
      filtered = filtered.filter((movie) => movie.genre.includes(selectedGenre));
    }

    setFilteredMovies(filtered);
  }, [selectedGenre, movies]);

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  // Handle movie card click
  const handleMovieClick = (movieLink) => {
    if (movieLink) {
      window.open(movieLink, '_blank'); // Open movie link in a new tab
    } else {
      alert("No link available for this movie.");
    }
  };

  return (
    <div className="filter-container">
      <h2>Filter Movies by Genre</h2>
      <div className="genre-list">
        <button className="genre-item" onClick={() => handleGenreChange('all')}>All</button>
        <button className="genre-item" onClick={() => handleGenreChange('Action')}>Action</button>
        <button className="genre-item" onClick={() => handleGenreChange('Drama')}>Drama</button>
        <button className="genre-item" onClick={() => handleGenreChange('Comedy')}>Comedy</button>
        <button className="genre-item" onClick={() => handleGenreChange('Horror')}>Horror</button>
        {/* Add more genres as needed */}
      </div>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => handleMovieClick(movie.movi_link)} // Open movie link on click
          >
            <div className="movie-content">
              {/* Movie Poster */}
              <img src={movie.poster} alt={movie.title} className="movie-image" />
              <h3 className="movie-title">{movie.title}</h3>
              <a href={movie.trailer} className="movie-trailer" target="_blank" rel="noopener noreferrer">Watch Trailer</a>
            </div>
            {/* Hovered Content */}
            <div className="movie-info">
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Year:</strong> {movie.year}</p>
              <p><strong>Rating:</strong> {movie.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GenreFilter;
