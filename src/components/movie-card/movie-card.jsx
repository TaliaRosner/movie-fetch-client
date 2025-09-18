// src/components/movie-card/movie-card.jsx
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        margin: "10px",
        cursor: "pointer",
      }}
      onClick={() => onMovieClick(movie)}
    >
      <h3>{movie.title}</h3>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.any,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    genre: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ name: PropTypes.string }),
    ]),
    director: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ name: PropTypes.string }),
    ]),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
