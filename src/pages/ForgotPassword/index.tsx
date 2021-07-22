import { ForgotPasswordContainer } from './styles'
import { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import firebase from '../../firebaseConnection'
import { toast } from 'react-toastify'

export default function ForgotPassword() {
	const history = useHistory()
	const [email, setEmail] = useState('')

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				history.push('/')
			}
		})
	}, [history])

	function sendEmail(e: any) {
		e.preventDefault()

		firebase
			.auth()
			.sendPasswordResetEmail(email)
			.then(() => {
				history.push('/login')
				toast.success(
					'Email enviado! Após a atualização da senha, faça o login.'
				)
			})
			.catch((err) => {
				if (err.code === 'auth/invalid-email') {
					toast.error('Email inválido.')
				}
				if (err.code === 'auth/user-not-found') {
					toast.error('Usuário não registrado.')
				}
			})
	}

	return (
		<ForgotPasswordContainer>
			<form>
				<label>
					Digite seu email que enviaremos um código para verificar a
					troca de senha:
				</label>
				<label>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					<input
						type="submit"
						value="Enviar"
						className="btn"
						onClick={(e) => sendEmail(e)}
					/>
				</label>
			</form>
			<Link to="/login" className="loginBtn">
				Voltar para o Login
			</Link>
		</ForgotPasswordContainer>
	)
}
