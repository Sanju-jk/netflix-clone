import axios from 'axios';


const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3';

// Axios instance
const tmdb = axios.create({
    baseURL: BASE_URL,
    params: {
      api_key: API_KEY,
    },
  });
  
  // API calls for home page
  export const getTrending = () => tmdb.get('/trending/all/week');
  export const getTopRated = () => tmdb.get('/movie/top_rated');
  export const getPopularTV = () => tmdb.get('/tv/popular');
  export const getByGenre = (genreId) =>
    tmdb.get('/discover/movie', {
      params: { with_genres: genreId },
    });

// Api calls for movies page
  export const getPopularMovies = () => tmdb.get('/movie/popular');
  export const getUpcomingMovies = () => tmdb.get('/movie/upcoming');
  export const getLatestMovies = () => tmdb.get('/movie/now_playing');

// Api calls for tv shows
  export const getTopRatedTvShows = () => tmdb.get('/tv/top_rated');
  export const getLatestTvShows = () => tmdb.get('/tv/airing_today');

  
  export default tmdb;