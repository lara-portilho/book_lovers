import { ProfileEditingContainer } from './styles'
import { useState, useEffect } from 'react'
import firebase from '../../../firebaseConnection'
import { toast } from 'react-toastify'
import { useHistory, Link } from 'react-router-dom'

export default function ProfileEditing() {
	const history = useHistory()
	const [oldEmail, setOldEmail] = useState('')
	const [newUserData, setNewUserData] = useState({
		username: '',
		email: '',
	})
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	})

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setNewUserData({
					username: user.displayName!,
					email: user.email!,
				})
				setOldEmail(user.email!)
				firebase.firestore().collection('users').doc(user.uid).update({
					username: user.displayName!,
					email: user.email!,
				})
			} else {
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
				if (oldEmail !== newUserData.email) {
					user?.updateEmail(newUserData.email).catch((err) => {
						if (err.code === 'auth/invalid-email') {
							toast.error('Email inválido.')
						}
						if (err.code === 'auth/email-already-in-use') {
							toast.error('Este email já está em uso.')
						}
					})
				}
				user?.updateProfile({
					displayName: newUserData.username,
				}).catch((err) => {
					console.log(err)
					toast.error('Houve algum erro.')
				})
				firebase
					.firestore()
					.collection('users')
					.doc(user?.uid)
					.update({
						username: newUserData.username,
						email: newUserData.email,
					})
					.catch((err) => {
						console.log(err)
						toast.error('Houve algum erro.')
					})
				toast.success('Perfil atualizado com sucesso.')
				history.push('/')
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
		setNewUserData({
			...newUserData,
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
						value={newUserData.username}
						name="username"
						onChange={(e) => updateField(e)}
						className="txtInput"
						required
					/>
				</label>
				<label>
					Email:&nbsp;
					<input
						type="email"
						value={newUserData.email}
						name="email"
						onChange={(e) => updateField(e)}
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
