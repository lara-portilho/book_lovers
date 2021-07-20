import { NavbarContainer } from './styles'
import { Link, useHistory } from 'react-router-dom'
import firebase from '../../firebaseConnection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faPlusCircle,
	faSearch,
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
	const history = useHistory()

	function handleLogOut() {
		firebase.auth().signOut()
		history.push('/login')
	}

	return (
		<NavbarContainer>
			<Link to="/" className="logo">
				Book Lovers
			</Link>

			<div>
				<button onClick={() => handleLogOut()} className="btn">
					<FontAwesomeIcon icon={faSignOutAlt} />
					<span>Sair</span>
				</button>
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
