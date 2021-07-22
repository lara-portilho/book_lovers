import { ProfileContainer } from './styles'
import firebase from '../../firebaseConnection'
import { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Profile() {
	const history = useHistory()
	const [userData, setUserData] = useState({
		username: '',
		email: '',
	})

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				firebase
					.firestore()
					.collection('users')
					.doc(user.uid)
					.get()
					.then((snapshot) => {
						setUserData({
							username: snapshot.data()?.username,
							email: snapshot.data()?.email,
						})
					})
					.catch((err) => {
						console.log(err)
						toast.error('Houve algum erro.')
					})
			} else {
				toast.error(
					'Por favor, entre ou cadastre-se antes de continuar.'
				)
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
