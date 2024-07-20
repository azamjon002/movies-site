import { Route, Routes } from 'react-router-dom'
import Header from '../header/header'
import { Suspense, lazy } from 'react'
import Spinner from '../spinner/spinner'
const NotFoundPage = lazy(() => import("../../pages/not-found-page"))
const Homepage = lazy(() => import("../../pages/home-page"))
const TrandingPage = lazy(() => import('../../pages/tranding-page'))
const PopularPage = lazy(() => import('../../pages/popular-page'))
const DetailedPage = lazy(() => import('../../pages/detailed-page'))

const App = () => {

	return (
		<div className='app'>
			<Header />
			<Suspense fallback={<Spinner/>}>
				<Routes>
					<Route path='/' element={<Homepage/>}/>
					<Route path='/popular' element={<PopularPage/>}/>
					<Route path='/tranding' element={<TrandingPage/>}/>
					<Route path='/movie/:movieId' element={<DetailedPage />} />
					<Route path='*' element={<NotFoundPage />}/>
				</Routes>
			</Suspense>
		
		</div>
	)
}

export default App
