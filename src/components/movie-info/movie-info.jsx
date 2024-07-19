import { useEffect, useState } from 'react'
import Error from '../error/error'
import Spinner from '../spinner/spinner'
import './movie-info.scss'
import PropTypes from 'prop-types';
import useMovieService from '../../services/movie-service'
import { useNavigate } from 'react-router-dom'


const MovieInfo = ({movieId}) => {

	const [movie, setMovie] = useState(null)

	const {getDetailMovies, loading, error} = useMovieService();

	useEffect(() => {
		updateMovie()
	},[movieId])


	const updateMovie = () => {
		
		if(!movieId){
			return
		}

		getDetailMovies(movieId).then(res => setMovie(res))
	}


	const errorContent = error ? <Error/> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !( error || loading || !movie ) ? <Content movie={movie} isMain={true} /> : null

	return (
		<div className='movieinfo'>
			{errorContent}
			{loadingContent}
			{content}
		</div>
	)
}

const Content = ({movie, isMain = false}) =>{

	const navigate = useNavigate();
	return (
		<>
			<img src={isMain ? movie.poster_path : movie.backdrop_path} alt='img' />
			<div className='app__hero-movie__descr'>
				<h2>{movie.name}</h2>
				<p>
					{movie.description}
				</p>
				<button className='btn btn-light' onClick={()=> navigate(`/movie/${movie.id}`)}>
					More Details
				</button>
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
