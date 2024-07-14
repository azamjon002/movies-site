import { useEffect, useState } from 'react'
import MovieService from '../../services/movie-service'
import Error from '../error/error'
import Spinner from '../spinner/spinner'
import './movie-info.scss'
import PropTypes from 'prop-types';


const MovieInfo = ({movieId}) => {

	const [movie, setMovie] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const movieService = new MovieService();

	useEffect(() => {
		updateMovie()
	},[movieId])


	const updateMovie = () => {
		
		if(!movieId){
			setError(false)
		}

		movieService.getDetailMovies(movieId)
		.then(res => setMovie(res))
		.catch(()=> setError(true))
		.finally(()=> setLoading(false))
	}


	const errorContent = error ? <Error/> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !( error || loading ) ? <Content movie={movie} isMain={true} /> : null

	return (
		<div className='movieinfo'>
			{errorContent}
			{loadingContent}
			{content}
		</div>
	)
}

const Content = ({movie, isMain = false}) =>{

	return (
		<>
			<img src={isMain ? movie.poster_path : movie.backdrop_path} alt='img' />
			<div className='app__hero-movie__descr'>
				<h2>{movie.name}</h2>
				<p>
					{movie.description}
				</p>
			
			</div>
		</>
	)
}

export default MovieInfo

Content.propTypes = {
	movie:PropTypes.object,
	isMain:PropTypes.bool,
}

MovieInfo.propTypes = {
	movieId:PropTypes.number,
}
