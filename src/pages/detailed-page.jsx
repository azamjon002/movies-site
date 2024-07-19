import { useParams } from 'react-router-dom'

const DetailedPage = () => {
	const {movieId} = useParams()

	return (
		<div>{movieId}</div>
	)
}

export default DetailedPage