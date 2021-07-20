import { SignUpContainer } from './styles'
import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import firebase from '../../firebaseConnection'
import { toast } from 'react-toastify'

export default function SignUp() {
	const history = useHistory()
	const [data, setData] = useState({
		username: '',
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

	async function saveUser(user: firebase.auth.UserCredential) {
		await firebase
			.firestore()
			.collection('users')
			.doc(user.user?.uid)
			.set({
				username: data.username,
				email: data.email,
			})
			.catch((err) => {
				toast.error('Houve algum erro.')
				console.log(err)
			})
	}

	async function handleSubmit(e: any) {
		e.preventDefault()
		await firebase
			.auth()
			.createUserWithEmailAndPassword(data.email, data.password)
			.then((userCredential) => {
				saveUser(userCredential)
				toast.success('Cadastrado com sucesso!')
				history.push('/')
			})
			.catch((err) => {
				if (err.code === 'auth/email-already-in-use') {
					toast.error('Email já utilizado.')
				}
				if (err.code === 'auth/invalid-email') {
					toast.error('Email inválido.')
				}
				if (err.code === 'auth/weak-password') {
					toast.error('A senha deve ter 6 ou mais caracteres.')
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
		<SignUpContainer>
			<h1>Cadastro</h1>
			<form>
				<label>
					Nome:
					<input
						type="text"
						placeholder="Nome"
						name="username"
						onChange={(e) => updateField(e)}
						required
					/>
				</label>

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
				<label>
					<input
						type="submit"
						value="Cadastrar"
						className="btn"
						onClick={(e) => handleSubmit(e)}
					/>
				</label>
			</form>
			<Link to="/login">Faça o Login</Link>
		</SignUpContainer>
	)
}
