import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Loader } from './components/Loader/Loader';
import './App.css';

const HomePage = lazy(() =>
  import('./pages/HomePage/HomePage'),
);

const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage/MovieDetailsPage'),
);

const MoviesPage = lazy(() =>
  import('./pages/MoviesPage/MoviesPage'),
);


function App() {
  return (
    <div>
      <Header />

      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path="/movies">
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
