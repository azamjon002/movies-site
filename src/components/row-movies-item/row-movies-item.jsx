/* eslint-disable react/prop-types */
import './row-movies-item.scss'

const RowMoviesItem = ({ movie, onOpen }) => {
	return (
		<div className='list__item'  onClick={ () => onOpen(movie.id)}>
			<img src={movie.poster_path} alt={movie.name} />
			<h2>
				{movie.name.length > 18 ? `${movie.name.slice(0,18)} ...` : movie.name}
			</h2>
			<div className='list__item-descr'>
				<img src="/date.svg" alt="" />
				<p>{movie.release_date}</p>
				<div className='dot' />
				<p>{movie.vote_average.toFixed(1)}</p>
				<img src="/star.svg" alt="" />
			</div>
		</div>
	)
}

export default RowMoviesItem
