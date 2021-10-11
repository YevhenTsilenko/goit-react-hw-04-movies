import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchMovieReviews } from '../../services/apiService';

function Reviews () {
    const [reviews, setReviews] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        fetchMovieReviews(movieId)
        .then(data => setReviews([...data.results]))
        .catch(error => error.massage);
    }, [movieId]);

    return reviews.length !== 0 ?
        (<ul>
            {reviews.map(review => (
                <li key={review.id}>
                    <h2>Author: {review.author}</h2>
                    <p>{review.content}</p>
                </li>
            ))}       
        </ul>)
        : (<p>There is no reviws for this movie</p>);
}

Reviews.propTypes = {
    id: PropTypes.string,
};

export { Reviews };