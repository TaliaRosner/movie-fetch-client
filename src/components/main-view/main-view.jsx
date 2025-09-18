import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const API_BASE = "https://movie-fetch-b460a958d87e.herokuapp.com";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/movies`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const normalized = Array.isArray(data)
          ? data.map((m) => ({
              id: m._id || m.id,
              title: m.title || m.Title || "",
              description: m.description || m.Description || "",
              genre:
                (m.genre && (m.genre.name || m.genre)) ||
                (m.Genre && (m.Genre.Name || m.Genre)) ||
                "",
              director:
                (m.director && (m.director.name || m.director)) ||
                (m.Director && (m.Director.Name || m.Director)) ||
                "",
              image: m.image || m.ImagePath || m.Image || "",
            }))
          : [];
        setMovies(normalized);
      })
      .catch((e) => {
        setError(e.message || "Failed to fetch");
        setMovies([]);
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (error) return <div>Failed to load movies: {error}</div>;
  if (!movies.length) return <div>No movies found.</div>;

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id || movie.title}
          movie={movie}
          onMovieClick={(m) => setSelectedMovie(m)}
        />
      ))}
    </div>
  );
};

MainView.propTypes = {};

export default MainView;
