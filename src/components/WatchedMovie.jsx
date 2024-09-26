export default function WatchedMovie({
  movie,
  onDeleteWatched,
  onSelectMovie,
}) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      {" "}
      {/* adaugă handler-ul onClick */}
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={(e) => {
            e.stopPropagation(); // oprește propagarea click-ului pentru a nu selecta filmul
            onDeleteWatched(movie.imdbID);
          }}
        >
          ❌
        </button>
      </div>
    </li>
  );
}
