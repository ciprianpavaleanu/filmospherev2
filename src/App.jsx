import { useEffect, useState } from "react";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import MainContent from "./components/MainContent";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";

const KEY = "dea361f5";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // Starea pentru a gestiona vizualizarea curentă
  const [view, setView] = useState("search"); // "search" sau "watched"

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => {
      setView("watched"); // Schimbă vizualizarea la 'watched'
      return id === selectedId ? null : id;
    });
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 1) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />

        <div className="view-buttons">
          <button
            onClick={() => setView("search")}
            className={view === "search" ? "active" : ""}
          >
            Search Results
          </button>
          <button
            onClick={() => setView("watched")}
            className={view === "watched" ? "active" : ""}
            id="watched-button"
          >
            Watched List
          </button>
        </div>
      </Navbar>

      <MainContent>
        {view === "search" && (
          <Box>
            <span className="label">Search Results</span>
            {isLoading && <Loader />}
            {!isLoading && !error && (
              <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
            )}
            {error && <ErrorMessage message={error} />}
          </Box>
        )}

        {view === "watched" && (
          <Box>
            {selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList
                  watched={watched}
                  onDeleteWatched={handleDeleteWatched}
                  onSelectMovie={handleSelectMovie} // adaugă onSelectMovie
                />
              </>
            )}
          </Box>
        )}
      </MainContent>
    </>
  );
}
