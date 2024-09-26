import WatchedMovie from "./WatchedMovie";

export default function WatchedMoviesList({
  watched,
  onDeleteWatched,
  onSelectMovie,
}) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
          onSelectMovie={onSelectMovie} // adaugă prop-ul onSelectMovie
        />
      ))}
    </ul>
  );
}
