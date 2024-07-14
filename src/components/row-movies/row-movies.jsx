/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import MovieService from '../../services/movie-service'
import Error from '../error/error'
import MovieInfo from '../movie-info/movie-info'
import RowMoviesItem from '../row-movies-item/row-movies-item'
import Spinner from '../spinner/spinner'
import './row-movies.scss'

const RowMovies = () =>  {
	const [open, setOpen] = useState(false);
	const [movies, setMovies] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [movieId, setMovieId] = useState(null)
	const [page, setPage] = useState(2)
	const [newItemLoading, setNewItemLoading] = useState(false)

	const movieService = new MovieService()
	
	useEffect(() => {
		getTrandingMovies(page);
	},[])


	const onClose = () => setOpen(false);

	const onOpen = (id) => {
		setOpen(true);
		setMovieId(id);
	};


	const getTrandingMovies = (page) => {
		movieService.getTrandingMovies(page)
		.then(res => setMovies(movies => [...movies, ...res]))
		.catch(() => setError(true))
		.finally(() => {
			setLoading(false)
			setNewItemLoading(false)
		})
	}

	const getMoreMovies = () => {
		setPage(page => page+1)
		setNewItemLoading(true)
		getTrandingMovies(page+1)
	}

	const errorContent = error ? <Error/> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !( error || loading ) ? <Content movies={movies} onOpen={onOpen}/> : null

	return (
		<div className='app__rowmovie'>
			<div className='app__rowmovie-top'>
				<div className='app__rowmovie-top__title'>
					<img src='/tranding.svg' alt='' />
					<h1>Trending</h1>
				</div>
				<div className='hr' />
				<a href='#'>See more</a>
			</div>
			{errorContent}
			{loadingContent}
			{content}

			<div className='app__rowmovie__loadmore'>
				<button className='btn btn-secondary' onClick={getMoreMovies} disabled={newItemLoading}>
					Load More
				</button>
			</div>

			<Modal open={open} onClose={onClose}>
				<MovieInfo movieId={movieId}/>
			</Modal>
		</div>
	)
}

export default RowMovies

const Content = ({movies, onOpen}) => {
	return (
		<div className='app__rowmovie-lists'>
			{movies.map((movie) => (
				<RowMoviesItem
					key={movie.id}
					movie={movie}
					onOpen={onOpen}
				/>	
			))}
		</div>
	)
}