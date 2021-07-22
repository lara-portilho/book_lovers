import { ProfileEditingContainer } from './styles'
import { useState, useEffect } from 'react'
import firebase from '../../../firebaseConnection'
import { toast } from 'react-toastify'
import { useHistory, Link } from 'react-router-dom'

export default function ProfileEditing() {
	const history = useHistory()
	const [userData, setUserData] = useState({
		username: '',
		email: '',
		isVerified: false,
	})
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	})

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setUserData({
					username: user.displayName!,
					email: user.email!,
					isVerified: user.emailVerified,
				})
			} else {
				toast.error(
					'Por favor, entre ou cadastre-se antes de continuar.'
				)
				history.push('/login')
			}
		})
	}, [history])

	function handleUpdateProfile(e: any) {
		e.preventDefault()
		const user = firebase.auth().currentUser

		firebase
			.auth()
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(() => {
				user?.updateEmail(userData.email).catch((err) => {
					console.log(err)
					toast.error('Houve algum erro.')
				})
				user?.updateProfile({
					displayName: userData.username,
				}).catch((err) => {
					console.log(err)
					toast.error('Houve algum erro.')
				})
				firebase
					.firestore()
					.collection('users')
					.doc(user?.uid)
					.update({
						username: userData.username,
						email: userData.email,
					})
					.catch((err) => {
						console.log(err)
						toast.error('Houve algum erro.')
					})
				toast.success('Perfil atualizado com sucesso.')
				history.push('/profile')
			})
			.catch((err) => {
				if (err.code === 'auth/invalid-email') {
					toast.error('Email inválido.')
				}
				if (err.code === 'auth/user-disabled') {
					toast.error('Este usuário foi desativado')
				}

				if (
					err.code === 'auth/user-not-found' ||
					err.code === 'auth/wrong-password'
				) {
					toast.error('Email/senha incorretos.')
				}
			})
	}

	const updateField = (e: any) => {
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		})
	}

	const updateFieldCredentials = (e: any) => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<ProfileEditingContainer>
			<form>
				<h3>Insira seus novos dados:</h3>
				<label>
					Nome:&nbsp;
					<input
						type="text"
						value={userData.username}
						name="username"
						onChange={updateField}
						className="txtInput"
						required
					/>
				</label>
				<label>
					Email:&nbsp;
					<input
						type="text"
						value={userData.email}
						name="email"
						onChange={updateField}
						className="txtInput"
						required
					/>
					&nbsp;
				</label>
				<hr />
				<h3>Insira seus dados atuais para confirmar:</h3>
				<label>
					Email:
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={(e) => updateFieldCredentials(e)}
						className="txtInput"
						required
					/>
				</label>

				<label>
					Senha:
					<input
						type="password"
						placeholder="Senha"
						name="password"
						onChange={(e) => updateFieldCredentials(e)}
						className="txtInput"
						required
					/>
				</label>
				<input
					type="submit"
					value="Confirmar"
					onClick={handleUpdateProfile}
					className="finishEditBtn"
				/>
			</form>
			<Link to="/profile" className="cancelBtn">
				Cancelar
			</Link>
		</ProfileEditingContainer>
	)
}
