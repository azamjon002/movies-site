class MovieService {
	_apiBase = 'https://api.themoviedb.org/3';
	_apiLang = 'language=en-US';
	_apiKey = 'api_key=e59cbe7bde4f1f664ed01bfdb2b9e81e';
	_imageBaseUrl = 'https://image.tmdb.org/t/p/original';

	getResource = async (url) => {
		const response = await fetch(url);

		if(!response.ok){
			return new Error(`Could not fetch ${url}, status: ${response.status}`)
		}

		return await response.json();
	}

	getPopularMovies = async () => {
		return this.getResource(`${this._apiBase}/movie/popular?${this._apiLang}&${this._apiKey}`)
	}
	
	
	getTrandingMovies = async () => {
		const response = await this.getResource(`${this._apiBase}/movie/top_rated?${this._apiLang}&${this._apiKey}`)
		const movies = response.results;

		return movies && movies.map(movie => this._transformMovie(movie))
	}
	
	getDetailMovies = async (id) => {
		const movie = await this.getResource(`${this._apiBase}/movie/${id}?${this._apiLang}&${this._apiKey}`)
		return this._transformMovie(movie)
	}

	getRandomMovie = async () => {
		const res = await this.getPopularMovies()
		const movie = res.results[Math.floor(Math.random() * res.results.length)];
		return this._transformMovie(movie);
	}

	_transformMovie = (movie) => {
		return {
			name: movie.original_title,
			description: movie.overview,
			backdrop_path: `${this._imageBaseUrl}${movie.backdrop_path}`,
			poster_path: `${this._imageBaseUrl}${movie.poster_path}`,
			id: movie.id,
			release_date: movie.release_date,
			vote_average: movie.vote_average
		}
	}
}

export default MovieService;