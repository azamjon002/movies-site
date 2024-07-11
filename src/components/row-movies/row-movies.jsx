/* eslint-disable react/prop-types */
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
		loading: true,
		movieId: null,
		page:2,
		newItemLoading: false
	}


	movieService = new MovieService()
	
	componentDidMount(){
		this.getTrandingMovies();
	}

	onClose = () => this.setState({open:false})

	onOpen = (id) => this.setState({open:true, movieId:id})


	getTrandingMovies = (page) => {
		this.movieService.getTrandingMovies(page)
		.then(res => {
			this.setState(
				({movies}) => ({movies: [...movies, ...res]})
			)
		})
		.catch(() => {this.setState({error:true})})
		.finally(() => {this.setState({loading:false, newItemLoading:false})})
	}

	getMoreMovies = () => {
		this.setState(({page}) => ({page:page+1, newItemLoading:true}));
		this.getTrandingMovies(this.state.page)
	}

	render() {
		const { open, movies, error, loading, movieId, newItemLoading } = this.state
		const errorContent = error ? <Error/> : null
		const loadingContent = loading ? <Spinner /> : null
		const content = !( error || loading ) ? <Content movies={movies} onOpen={this.onOpen}/> : null

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
					<button className='btn btn-secondary' onClick={this.getMoreMovies} disabled={newItemLoading}>
						Load More
					</button>
				</div>

				<Modal open={open} onClose={this.onClose}>
					<MovieInfo movieId={movieId} isMain={false}/>
				</Modal>
			</div>
		)
	}
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