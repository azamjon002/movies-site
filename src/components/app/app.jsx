import { Route, Routes } from 'react-router-dom'
import Header from '../header/header'
import Homepage from '../../pages/home-page'
import Tvpage from '../../pages/tv-page'
import NotFoundPage from '../../pages/not-found-page'
import DetailedPage from '../../pages/detailed-page';

const App = () => {

	return (
		<div className='app'>
			<Header />
			<Routes>
				<Route path='/' element={<Homepage/>}/>
				<Route path='/tv' element={<Tvpage/>}/>
				<Route path='/movie/:movieId' element={<DetailedPage />} />
				<Route path='*' element={<NotFoundPage />}/>
			</Routes>
		</div>
	)
}

export default App
