import { NavLink, Link } from 'react-router-dom'
import { navbar_links } from '../../constants'
import './header.scss'

const Header = () => {
	return (
		<div className='app__header'>
			<h1 className='app__logo'>
				<Link to={'/'}>
					<img src='/logo.svg' alt='logo' />
					<img src='/logo-text.svg' alt='logo-text' />
				</Link>
			</h1>
			<nav className='app__menu'>
				<ul>
					{navbar_links.map(item => (
						<li key={item.label}>
							<NavLink to={item.path} className={({isActive}) => isActive ? 'active' : ''}>
								{item.label}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</div>
	)
}

export default Header
