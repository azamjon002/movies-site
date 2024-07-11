import ErrorBoundary from '../error-boundary/error-boundary'
import Header from '../header/header'
import Hero from '../hero/hero'
import RowMovies from '../row-movies/row-movies'

const App = () => {

	return (
		<div className='app'>
			<Header />
			<ErrorBoundary>
				<Hero />
			</ErrorBoundary>
			<ErrorBoundary >
				<RowMovies />
			</ErrorBoundary>
		</div>
	)
}

export default App
