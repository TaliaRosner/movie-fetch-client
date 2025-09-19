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
              id: m._id || m.id || m.MovieID || m.Title || m.title,
              title: m.title || m.Title || "",
              description: m.description || m.Description || "",
              genre:
                (m.genre && typeof m.genre === "string" && m.genre) ||
                (m.genre && m.genre.name) ||
                (m.Genre && typeof m.Genre === "string" && m.Genre) ||
                (m.Genre && m.Genre.Name) ||
                "",
              director:
                (m.director && typeof m.director === "string" && m.director) ||
                (m.director && m.director.name) ||
                (m.Director && typeof m.Director === "string" && m.Director) ||
                (m.Director && m.Director.Name) ||
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

  // Get the genre name as plain text, no matter how it's stored on the movie
  const getGenre = (movie) => {
    if (!movie) return "";
    if (movie.genre && typeof movie.genre === "string") return movie.genre;
    if (movie.genre && movie.genre.name) return movie.genre.name;
    if (movie.Genre && typeof movie.Genre === "string") return movie.Genre;
    if (movie.Genre && movie.Genre.Name) return movie.Genre.Name;
    return "";
  };

  if (selectedMovie) {
    const currentGenre = getGenre(selectedMovie);

    const similarMovies = movies.filter(
      (m) =>
        (m.id || m.title) !== (selectedMovie.id || selectedMovie.title) &&
        getGenre(m) === currentGenre
    );

    return (
      <div style={{ padding: "20px" }}>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />

        <hr />
        <h3>Similar movies</h3>

        {similarMovies.length === 0 ? (
          <p>No similar movies found.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            {similarMovies.map((m) => (
              <MovieCard
                key={m.id || m.title}
                movie={m}
                onMovieClick={(mv) => setSelectedMovie(mv)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (error) return <div>Failed to load movies: {error}</div>;
  if (!movies.length) return <div>No movies found.</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "12px",
      }}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id || movie.title}
          movie={movie}
          onMovieClick={(mv) => setSelectedMovie(mv)}
        />
      ))}
    </div>
  );
};

MainView.propTypes = {};

export default MainView;
