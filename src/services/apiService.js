const URL = 'https://api.themoviedb.org/3/'
const KEY = '9ee6bc50fba98d1bbdb5801aa008e934';

async function fetchMoviesApi(url) {
    const response = await fetch(url);
    
   return response.ok ? await response.json() : Promise.reject(new Error('movies list is empty'));
    
}

function fetchTrendingMovies () {
    return fetchMoviesApi(`${URL}trending/movie/day?api_key=${KEY}`)
};

function fetchMoviesBySearch (query) {
    return fetchMoviesApi(`${URL}search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false)&query=${query}`)
};

function fetchMovieById (id) {
    return fetchMoviesApi(`${URL}movie/${id}?api_key=${KEY}&language=en-US`)
};

function fetchMovieCasts (id) {
    return fetchMoviesApi(`${URL}movie/${id}/credits?api_key=${KEY}&language=en-US`)
};

function fetchMovieReviews (id) {
    return fetchMoviesApi(`${URL}movie/${id}/reviews?api_key=${KEY}&language=en-US&page=1`)
};

export { fetchTrendingMovies, fetchMoviesBySearch, fetchMovieById,  fetchMovieCasts, fetchMovieReviews, KEY };
