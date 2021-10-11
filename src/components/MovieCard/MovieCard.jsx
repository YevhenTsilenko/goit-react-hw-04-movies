import { KEY } from '../../services/apiService';
import PropTypes from 'prop-types';

function MovieCard({ movies }) {
  return (
    <div className="movies_card">
        <img
        className="movies__img"
        src={`https://image.tmdb.org/t/p/w300${movies.poster_path}?api_key=${KEY}`}
        alt={movies.original_title}
        />
        <div>
            <h2>{movies.original_title}</h2>
            <p>User Score: {movies.vote_average}</p>
            <h3>Overview:</h3>
            <p>{movies.overview}</p>
            <h3>Genres:</h3>
            <ul>
              {movies.genres.map(genre => (
                  <li key={genre.id} className="movies__list">
                  {genre.name}
                  </li>
              ))}
            </ul>
        </div>
    </div>
  );
}

MovieCard.propTypes = {
  movies: PropTypes.object.isRequired,
};

export { MovieCard }