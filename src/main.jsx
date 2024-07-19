import ReactDOM from 'react-dom/client'
import App from './components/app/app'
import './styles/index.scss'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)
