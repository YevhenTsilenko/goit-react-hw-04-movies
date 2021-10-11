import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { fetchTrendingMovies } from '../../services/apiService';
import { Loader } from '../../components/Loader/Loader';

export default function HomePage() {
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');
    fetchTrendingMovies()
      .then(movies => setMovies([...movies.results]))
      .catch(() => setStatus('rejected'))
      .finally(() => setStatus('idle'));
  }, []);


  return (
    <>
      <h2>Trending today</h2>

      {status === 'pending' && <Loader />}

      <ul>
        {movies &&
          movies.map(movie => (
            <li key={movie.id}>
              <Link to={`${url}movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}