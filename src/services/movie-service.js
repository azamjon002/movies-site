import { useHttp } from '../components/hooks/useHttp';


const useMovieService = () => {
	
	const {request, loading, error, clearError} = useHttp()

	const _apiBase = 'https://api.themoviedb.org/3';
	const _apiLang = 'language=en-US';
	const _apiKey = 'api_key=e59cbe7bde4f1f664ed01bfdb2b9e81e';
	const _imageBaseUrl = 'https://image.tmdb.org/t/p/original';
	const _apiPage = 2;


	const getPopularMovies = async (page = _apiPage) => {
		const response = await request(`${_apiBase}/movie/popular?${_apiLang}&page=${page}&${_apiKey}`)
		const movies = response.results;
		return movies && movies.map(movie => _transformMovie(movie))
	}
	
	
	const getTrandingMovies = async (page = _apiPage) => {
		const response = await request(`${_apiBase}/movie/top_rated?${_apiLang}&page=${page}&${_apiKey}`)
		const movies = response.results;

		return movies && movies.map(movie => _transformMovie(movie))
	}
	
	const getDetailMovies = async (id) => {
		const movie = await request(`${_apiBase}/movie/${id}?${_apiLang}&${_apiKey}`)
		return _transformMovie(movie)
	}

	const getRandomMovie = async () => {
		const res = await getPopularMovies()
		const movie = res[Math.floor(Math.random() * res.length)];
		return movie
	}

	const _transformMovie = (movie) => {
		return {
			name: movie.original_title,
			description: movie.overview,
			backdrop_path: `${_imageBaseUrl}${movie.backdrop_path}`,
			poster_path: `${_imageBaseUrl}${movie.poster_path}`,
			id: movie.id,
			release_date: movie.release_date,
			vote_average: movie.vote_average
		}
	}

	return {getPopularMovies, getTrandingMovies, getRandomMovie, getDetailMovies, loading, error, clearError}
}

export default useMovieService;