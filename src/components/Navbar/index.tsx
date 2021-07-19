import { NavbarContainer } from './styles'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
	return (
		<NavbarContainer>
			<Link to="/" className="logo">
				Book Lovers
			</Link>
			<div className="links">
				<Link to="/all" className="div-link">
					<FontAwesomeIcon icon={faSearch} />
					<span>Pesquisar</span>
				</Link>
				<Link to="/add" className="div-link">
					<FontAwesomeIcon icon={faPlusCircle} />
					<span>Adicionar</span>
				</Link>
			</div>
		</NavbarContainer>
	)
}
