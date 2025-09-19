import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  if (!movie) return null; // avoid rendering before a movie is selected

  return (
    <div>
      <div>
        {movie.image ? (
          <img src={movie.image} alt={movie.title} style={{ width: "200px" }} />
        ) : null}
      </div>
      <div>
        <h2>{movie.title}</h2>
      </div>
      <p>
        <strong>Description:</strong> {movie.description}
      </p>
      <p>
        <strong>Genre:</strong>{" "}
        {typeof movie.genre === "string" ? movie.genre : movie.genre?.name}
      </p>
      <p>
        <strong>Director:</strong>{" "}
        {typeof movie.director === "string"
          ? movie.director
          : movie.director?.name}
      </p>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
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
  onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
