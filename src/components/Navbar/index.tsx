import { NavbarContainer } from './styles'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faPlusCircle,
	faSearch,
	faUser,
} from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
	return (
		<NavbarContainer>
			<Link to="/" className="logo">
				Book Lovers
			</Link>

			<div>
				<Link to="/profile" className="link-profile">
					<FontAwesomeIcon icon={faUser} />
					<span>Perfil</span>
				</Link>
				<Link to="/all" className="link">
					<FontAwesomeIcon icon={faSearch} />
					<span>Pesquisar</span>
				</Link>
				<Link to="/add" className="link">
					<FontAwesomeIcon icon={faPlusCircle} />
					<span>Adicionar</span>
				</Link>
			</div>
		</NavbarContainer>
	)
}
