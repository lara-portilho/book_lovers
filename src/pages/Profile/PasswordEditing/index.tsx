import { PasswordEditingContainer } from './styles'
import { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import firebase from '../../../firebaseConnection'
import { toast } from 'react-toastify'

export default function PasswordEditing() {
	const history = useHistory()
	const [newPassword, setNewPassowrd] = useState({
		password: '',
		confirm_password: '',
	})
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

	function handleUpdatePassword(e: any) {
		e.preventDefault()
		const user = firebase.auth().currentUser

		if (newPassword.confirm_password === newPassword.password) {
			firebase
				.auth()
				.signInWithEmailAndPassword(
					credentials.email,
					credentials.password
				)
				.then(() => {
					user?.updatePassword(newPassword.password).catch((err) => {
						if (err.code === 'auth/weak-password') {
							toast.error(
								'A senha deve ter 6 ou mais caracteres.'
							)
						} else {
							console.log(err)
							toast.error('Houve um erro.')
						}
					})
					toast.success('Senha atualizada com sucesso.')
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
		} else {
			toast.error('A confirmação da senha deve ser igual à senha.')
		}
	}

	const updateField = (e: any) => {
		setNewPassowrd({
			...newPassword,
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
		<PasswordEditingContainer>
			<form>
				<h3>Insira sua nova senha:</h3>
				<label>
					Senha:&nbsp;
					<input
						type="password"
						value={newPassword.password}
						name="password"
						onChange={updateField}
						className="txtInput"
						required
					/>
				</label>
				<label>
					Confirme a senha:&nbsp;
					<input
						type="password"
						value={newPassword.confirm_password}
						name="confirm_password"
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
					onClick={handleUpdatePassword}
					className="finishEditBtn"
				/>
			</form>
			<Link to="/profile" className="cancelBtn">
				Cancelar
			</Link>
		</PasswordEditingContainer>
	)
}
