import { NavbarContainer } from './styles'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
	return (
		<NavbarContainer>
			<Link to="/" className="logo">
				Book Lovers
			</Link>
			<Link to="/add" className="add">
				<FontAwesomeIcon icon={faPlusCircle} />
				<p>Adicionar</p>
			</Link>
		</NavbarContainer>
	)
}
