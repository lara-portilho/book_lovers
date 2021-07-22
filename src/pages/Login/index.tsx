import { LoginContainer } from './styles'
import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import firebase from '../../firebaseConnection'

export default function Login() {
	const history = useHistory()
	const [data, setData] = useState({
		email: '',
		password: '',
	})

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				history.push('/')
			}
		})
	}, [history])

	function handleSubmit(e: any) {
		e.preventDefault()
		firebase
			.auth()
			.signInWithEmailAndPassword(data.email, data.password)
			.then(() => {
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
		setData({
			...data,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<LoginContainer>
			<h1>Login</h1>
			<form>
				<label>
					Email:
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={(e) => updateField(e)}
						required
					/>
				</label>

				<label>
					Senha:
					<input
						type="password"
						placeholder="Senha"
						name="password"
						onChange={(e) => updateField(e)}
						required
					/>
				</label>

				<Link to="/forgotpassword" className="passBtn">
					Esqueceu a senha?
				</Link>

				<label>
					<input
						type="submit"
						value="Entrar"
						className="btn"
						onClick={(e) => handleSubmit(e)}
					/>
				</label>
			</form>
			<Link to="/signup" className="signupBtn">
				Cadastre-se
			</Link>
		</LoginContainer>
	)
}
