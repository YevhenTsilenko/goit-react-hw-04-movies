import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCasts } from '../../services/apiService';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

function Cast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    fetchMovieCasts(movieId)
    .then((data) => setCasts([...data.cast]))
    .catch((error) => error.massage);
  }, [movieId]);

  return (
    <>
      {casts && (
        <ul>
          {casts.map(cast => (
            <li key={cast.id}>
              <img
                src={
                  cast.profile_path
                    ? `${IMG_URL}${cast.profile_path}`
                    : null
                }
                alt={cast.name}
              />
              <p>Name: {cast.name}</p>
              <p>Character: {cast.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export { Cast };