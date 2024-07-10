import React from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import MovieService from '../../services/movie-service'
import Error from '../error/error'
import MovieInfo from '../movie-info/movie-info'
import RowMoviesItem from '../row-movies-item/row-movies-item'
import Spinner from '../spinner/spinner'
import './row-movies.scss'

class RowMovies extends React.Component {
	state = {
		open: false,
		movies: [],
		error: false,
		loading: false,
		movieId: null
	}


	movieService = new MovieService()
	
	componentDidMount(){
		this.getTrandingMovies();
	}

	onClose = () => this.setState({open:false})

	onOpen = (id) => this.setState({open:true, movieId:id})


	getTrandingMovies = () => {
		this.movieService.getTrandingMovies()
		.then(res => {this.setState({movies:res})})
		.catch(() => {this.setState({error:true})})
		.finally(() => {this.setState({loading:false})})
	}

	render() {
		const { open, movies, error, loading, movieId } = this.state

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

				<div className='app__rowmovie-lists'>
					{movies.map((movie) => (
						error ? <Error key={movie.id}/> : loading ? <Spinner />
							: <RowMoviesItem
								key={movie.id}
								movie={movie}
								onOpen={this.onOpen}
							/>	
					))}
				</div>

				<Modal open={open} onClose={this.onClose}>
					<MovieInfo movieId={movieId} isMain={false}/>
				</Modal>
			</div>
		)
	}
}

export default RowMovies
