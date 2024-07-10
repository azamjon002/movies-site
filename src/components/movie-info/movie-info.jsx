/* eslint-disable react/prop-types */
import React from 'react'
import MovieService from '../../services/movie-service'
import Error from '../error/error'
import Spinner from '../spinner/spinner'
import './movie-info.scss'

class MovieInfo extends React.Component {

	state = {
		movie:null,
		loading: true,
		error:false
	}

	movieService = new MovieService();

	componentDidMount(){
		this.updateMovie()
	}

	updateMovie = () => {
		const {movieId} = this.props;

		if(!movieId){
			this.setState({error:false})
		}

		this.movieService.getDetailMovies(movieId)
		.then(res => this.setState({movie:res}))
		.catch(()=> this.setState({error:true}))
		.finally(()=> this.setState({loading:false}))
	}

	render(){
		const {movie, loading, error} = this.state;

		const errorContent = error ? <Error/> : null
		const loadingContent = loading ? <Spinner /> : null
		const content = !( error || loading ) ? <Content movie={movie} isMain={this.props.isMain} /> : null

		return (
			<div className='movieinfo'>
				{errorContent}
				{loadingContent}
				{content}
			</div>
		)
	}
}

const Content = ({movie, isMain}) =>{

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
