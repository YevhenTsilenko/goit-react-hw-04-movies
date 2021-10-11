import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { fetchMoviesBySearch } from '../../services/apiService';
import { Searchbar } from '../../components/Searchbar/Searchbar';
import { Loader } from '../../components/Loader/Loader';



export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [status, setStatus] = useState('idle');
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const searchQuery = new URLSearchParams(location.search).get('query') ?? '';
  

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setStatus('pending');

    fetchMoviesBySearch(searchQuery)
      .then(movies => {
        if(movies.results.length === 0) {
          alert('There is no matches. Try something else')
        }
        setMovies(movies.results);
        setStatus('resolved');
      })
      .catch((error) => {
          setStatus('rejected');
          return error.message;
      });

  }, [searchQuery]);

  const handleFormSubmit = (query) => {

    history.push({
      ...location,
      search: `query=${query}`,
    });
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit}/>

      {status === 'pending' && <Loader />}

      <ul>
        {movies &&
          movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: {
                    from: { location },
                  },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
