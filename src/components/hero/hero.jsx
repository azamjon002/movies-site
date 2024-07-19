import { useEffect, useState } from 'react'
import Modal from 'react-responsive-modal'
import MovieService from '../../services/movie-service'
import Error from '../error/error'
import MovieInfo from '../movie-info/movie-info'
import Spinner from '../spinner/spinner'
import './hero.scss'
import PropTypes from 'prop-types';
import useMovieService from '../../services/movie-service'

const Hero = () => {

	const [movie, setMovie] = useState(null);
	const [open, setOpen] = useState(false)	

	const {getRandomMovie, error, loading, clearError} = useMovieService()
	
	useEffect(() => {
		clearError()
		updateMovie();
	},[])

	const updateMovie = () => {
		getRandomMovie().then(res => setMovie(res))
	};

	const onClose = () => {setOpen(false)};

	const onOpen = () => setOpen(true);

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !(error || loading || !movie) ? <Content movie={movie} open={open} onClose={onClose} onOpen={onOpen} /> : null

	return (
		<div className='app__hero'>
			<div className='app__hero-info'>
				<h2>FIND MOVIES</h2>
				<h1>TV shows and more</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
					sapiente sit placeat minus dolorum, magnam, tempora quas neque quasi,
					sequi odit doloremque velit saepe autem facilis! Laudantium
					consequatur accusantium mollitia.
				</p>
				<div>
					<button className='btn btn__secondary' onClick={updateMovie}>RANDOM MOVIE</button>
				</div>
			</div>
			<div className='app__hero-movie'>
				{errorContent}
				{loadingContent}
				{content}
			</div>
		</div>
	)
}

export default Hero


const Content = ({movie, open, onClose, onOpen}) => {
	
	return (
		<>
			<img src={movie.backdrop_path} alt='img' />
			<div className='app__hero-movie__descr'>
				<h2>{movie.name}</h2>
				<p>
					{movie.description && movie.description.length >= 250 ? `${movie.description.slice(0,250)} ...` : movie.description}
				</p>
				<button className='btn btn__primary' style={{width:"100%"}} onClick={onOpen}>DETAILS</button>
			</div>

			<Modal open={open} onClose={onClose}>
				<MovieInfo movieId={movie.id} />
			</Modal>
		</>
	)
}

Content.propTypes = {
	movie: PropTypes.object,
	open: PropTypes.bool,
	onClose: PropTypes.func,
	onOpen: PropTypes.func,
}