import { DeleteAccountContainer } from './styles'
import { useState, useEffect } from 'react'
import firebase from '../../../firebaseConnection'
import { toast } from 'react-toastify'
import { useHistory, Link } from 'react-router-dom'

export default function DeleteAccount() {
	const history = useHistory()
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	})

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				toast.error(
					'Por favor, entre ou cadastre-se antes de continuar.'
				)
				history.push('/login')
			}
		})
	}, [history])

	const updateFieldCredentials = (e: any) => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		})
	}

	function handleDeleteAccount(e: any) {
		e.preventDefault()
		const user = firebase.auth().currentUser

		firebase
			.auth()
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(() => {
				//delete all documents in collection books
				firebase
					.firestore()
					.collection(`users/${user?.uid}/books`)
					.get()
					.then((snapshot) => {
						if (!snapshot.empty) {
							snapshot.forEach((doc) => {
								firebase
									.firestore()
									.collection(`users/${user?.uid}/books`)
									.doc(doc.id)
									.delete()
							})
						}
					})
					.catch((err) => {
						console.log(err)
						toast.error('Houve algum erro.')
					})

				//delete user document
				firebase
					.firestore()
					.collection('users')
					.doc(user?.uid)
					.delete()
					.catch((err) => {
						console.log(err)
						toast.error('Houve algum erro.')
					})

				//delete user
				user?.delete()
				toast.success('Conta deletada com sucesso.')
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
		history.push('/login')
	}

	return (
		<DeleteAccountContainer>
			<form>
				<h3>Tem certeza? Se sim, digite seus dados para confirmar:</h3>
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
					value="Deletar minha conta"
					onClick={handleDeleteAccount}
					className="deleteBtn"
				/>
			</form>
			<Link to="/profile" className="cancelBtn">
				Cancelar
			</Link>
		</DeleteAccountContainer>
	)
}
