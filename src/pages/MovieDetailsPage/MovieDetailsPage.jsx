import { useState, useEffect } from 'react';
import { Link, useRouteMatch, Route, Switch, useLocation, useHistory, useParams } from 'react-router-dom';
import { fetchMovieById } from '../../services/apiService';
import { Cast } from '../Cast/Cast';
import { Reviews } from '../Reviews/Reviews';
import { ReturnButton } from '../../components/Button/ReturnButton';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { Loader } from '../../components/Loader/Loader';
import styles from './MovieDetailsPage.module.css';


export default function MovieDetailsPage() {
  const location = useLocation();
  const history = useHistory();
  const { url } = useRouteMatch();
  const [moviePage, setMoviePage] = useState(null);
  const [status, setStatus] = useState('idle');
  const { movieId } = useParams()

  useEffect(() => {
    setStatus('pending');
    fetchMovieById(movieId)
      .then(setMoviePage)
      .catch(() => setStatus('rejected'))
      .finally(() => setStatus('idle'));
  }, [movieId]);


  const onGoBack = () => {
    setStatus('pending');
    history.push(location?.state?.from.location ?? '/');
  };

  return (
    <>
      <ReturnButton onClick={onGoBack}>{'⬅ Go back'}</ReturnButton>

      {status === 'pending' && <Loader />}

      {moviePage && (
        <>
          <MovieCard movies={moviePage} />

          <hr />
          <p>Additional information</p>
          <ul>
            <Link className={styles.link}
              to={{
                pathname: `${url}/cast`,
                state: {
                  from: location?.state?.from ?? '/',
                  label: 'Back to the selected movie',
                },
              }}
            >
              Cast
            </Link>

            <Link className={styles.link}
              to={{
                pathname: `${url}/reviews`,
                state: {
                  from: location?.state?.from ?? '/',
                },
              }}
            >
              Reviews
            </Link>
          </ul>
          <hr />
          <Switch>
            <Route exact path="/movies/:movieId/cast">
              <Cast />
            </Route>

            <Route path="/movies/:movieId/reviews">
                <Reviews />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}