import { ProfileContainer } from './styles'
import firebase from '../../firebaseConnection'
import { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

export default function Profile() {
	const history = useHistory()
	const [userData, setUserData] = useState({
		username: '',
		email: '',
	})

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setUserData({
					username: user.displayName!,
					email: user.email!,
				})
			} else {
				history.push('/login')
			}
		})
	}, [history])

	function handleLogout() {
		firebase.auth().signOut()
		history.push('/login')
	}

	return (
		<ProfileContainer>
			<form>
				<label>
					Nome:&nbsp;
					<input
						disabled
						type="text"
						value={userData.username}
						name="username"
						className="txtInput"
					/>
				</label>
				<label>
					Email:&nbsp;
					<input
						disabled
						type="text"
						value={userData.email}
						name="email"
						className="txtInput"
					/>
				</label>
				<Link to="/profile/edit" className="editBtn">
					Editar perfil
				</Link>
			</form>
			<div className="btns">
				<Link to="/profile/editpass" className="passBtn">
					Atualizar senha
				</Link>
				<button onClick={() => handleLogout()} className="outBtn">
					Sair
				</button>
			</div>
			<Link to="/profile/delete" className="delBtn">
				Deletar Conta
			</Link>
			<Link to="/" className="homeBtn">
				Home
			</Link>
		</ProfileContainer>
	)
}
