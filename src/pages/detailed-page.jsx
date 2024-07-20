import { useParams } from 'react-router-dom'
import DetailedMovie from '../components/detailed-movie/detailed-movie'

const DetailedPage = () => {
	const {movieId} = useParams()

	return (
		<>
			<DetailedMovie />
		</>
	)
}

export default DetailedPage