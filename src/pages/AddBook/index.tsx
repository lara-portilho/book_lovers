import { AddBookContainer } from './styles'
import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import firebase from '../../firebaseConnection'
import { toast } from 'react-toastify'

export default function AddBook() {
	const history = useHistory()
	const [userID, setUserID] = useState('')
	const [data, setData] = useState({
		name: '',
		author: '',
		series: '',
		published: '',
		times_read: 0,
		started: '',
		finished: '',
		reading: false,
		favorite: false,
	})

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setUserID(user.uid)
			} else {
				history.push('/login')
			}
		})
	}, [history])

	async function handleSubmit(e: any) {
		e.preventDefault()
		await firebase
			.firestore()
			.collection('users')
			.doc(userID)
			.collection('books')
			.add({
				name: data.name,
				author: data.author,
				series: data.series,
				published: data.published,
				times_read: data.times_read,
				started: data.started,
				finished: data.finished,
				reading: data.reading,
				favorite: data.favorite,
			})
			.then(() => {
				toast.success('Salvo com sucesso')
				setData({
					name: '',
					author: '',
					series: '',
					published: '',
					times_read: 0,
					started: '',
					finished: '',
					reading: false,
					favorite: false,
				})
			})
			.catch((err) => {
				console.log(err)
				toast.error('Houve algum erro.')
			})
	}

	const updateField = (e: any) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<AddBookContainer>
			<form>
				<div className="firstColumn">
					<label>
						Nome:&nbsp;
						<input
							type="text"
							placeholder="Nome"
							value={data.name}
							name="name"
							onChange={updateField}
						/>
					</label>
					<label>
						Autor(a):&nbsp;
						<input
							type="text"
							placeholder="Autor(a)"
							value={data.author}
							name="author"
							onChange={updateField}
						/>
					</label>
					<label>
						Coleção:&nbsp;
						<input
							type="text"
							placeholder="Coleção"
							value={data.series}
							name="series"
							onChange={updateField}
						/>
					</label>
					<label>
						Publicado em:&nbsp;
						<input
							type="date"
							value={data.published}
							name="published"
							onChange={updateField}
						/>
					</label>
					<label>
						Vezes lido:&nbsp;
						<input
							type="number"
							value={data.times_read}
							name="times_read"
							onChange={updateField}
						/>
					</label>
				</div>
				<div className="secondColumn">
					<label>
						Iniciado em:&nbsp;
						<input
							type="date"
							value={data.started}
							name="started"
							onChange={updateField}
						/>
					</label>
					<label>
						Finalizdo em:&nbsp;
						<input
							type="date"
							value={data.finished}
							name="finished"
							onChange={updateField}
						/>
					</label>
					<label>
						Lendo?&nbsp;
						<input
							type="checkbox"
							name="reading"
							onChange={() => {
								data.reading
									? setData({ ...data, reading: false })
									: setData({ ...data, reading: true })
							}}
						/>
					</label>
					<label>
						Favorito?&nbsp;
						<input
							type="checkbox"
							name="favorite"
							onChange={() => {
								data.favorite
									? setData({ ...data, favorite: false })
									: setData({ ...data, favorite: true })
							}}
						/>
					</label>
					<label>
						<input
							className="btn"
							type="submit"
							onClick={(e) => handleSubmit(e)}
							value="Adicionar"
						/>
					</label>
				</div>
			</form>
			<Link to="/" className="homeBtn">
				Home
			</Link>
		</AddBookContainer>
	)
}
