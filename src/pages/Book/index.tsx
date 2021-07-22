import { BookContainer } from './styles'
import { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import firebase from '../../firebaseConnection'
import { toast } from 'react-toastify'

export default function Book() {
	const history = useHistory()
	const { id } = useParams<{ id: string }>()
	const [editing, setEditing] = useState(false)
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
				const db = firebase
					.firestore()
					.collection(`/users/${user.uid}/books`)

				db.doc(id)
					.get()
					.then((doc) => {
						if (!doc.exists) {
							toast.error('Este livro não existe.')
							history.push('/')
						} else {
							console.log(doc)
							setUserID(user.uid)

							setData({
								name: doc.data()?.name,
								author: doc.data()?.author,
								series: doc.data()?.series,
								published: doc.data()?.published,
								times_read: doc.data()?.times_read,
								started: doc.data()?.started,
								finished: doc.data()?.finished,
								reading: doc.data()?.reading,
								favorite: doc.data()?.favorite,
							})
						}
					})
					.catch((err) => {
						console.log(err)
						toast.error('Houve algum erro.')
					})
			} else {
				history.push('/login')
			}
		})
	}, [history, id])

	async function handleExclude(e: any) {
		e.preventDefault()
		await firebase
			.firestore()
			.collection(`/users/${userID}/books`)
			.doc(id)
			.delete()
			.then(() => {
				toast.success('Livro deletado com sucesso.')
				history.push('/')
			})
			.catch((err) => {
				console.log(err)
				toast.error('Houve algum erro.')
			})
	}

	async function handleSubmit(e: any) {
		e.preventDefault()
		await firebase
			.firestore()
			.collection(`/users/${userID}/books`)
			.doc(id)
			.update({
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
				toast.success('Livro atualiado com sucesso.')
				setEditing(false)
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
		<BookContainer>
			<form>
				<div className="firstColumn">
					<label>
						Nome:&nbsp;
						<input
							type="text"
							value={data.name}
							name="name"
							disabled={!editing}
							onChange={updateField}
						/>
					</label>
					<label>
						Autor(a):&nbsp;
						<input
							type="text"
							value={data.author}
							name="author"
							disabled={!editing}
							onChange={updateField}
						/>
					</label>
					<label>
						Coleção:&nbsp;
						<input
							type="text"
							value={data.series}
							name="series"
							disabled={!editing}
							onChange={updateField}
						/>
					</label>
					<label>
						Publicado em:&nbsp;
						<input
							type="date"
							value={data.published}
							name="published"
							disabled={!editing}
							onChange={updateField}
						/>
					</label>
					<label>
						Vezes lido:&nbsp;
						<input
							type="number"
							value={data.times_read}
							name="times_read"
							disabled={!editing}
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
							disabled={!editing}
							onChange={updateField}
						/>
					</label>
					<label>
						Finalizdo em:&nbsp;
						<input
							type="date"
							value={data.finished}
							name="finished"
							disabled={!editing}
							onChange={updateField}
						/>
					</label>
					<label>
						Lendo?&nbsp;
						<input
							type="checkbox"
							name="reading"
							checked={data.reading}
							onChange={() => {
								data.reading
									? setData({ ...data, reading: false })
									: setData({ ...data, reading: true })
							}}
							disabled={!editing}
						/>
					</label>
					<label>
						Favorito?&nbsp;
						<input
							type="checkbox"
							name="favorite"
							checked={data.favorite}
							onChange={() => {
								data.favorite
									? setData({ ...data, favorite: false })
									: setData({ ...data, favorite: true })
							}}
							disabled={!editing}
						/>
					</label>
					<div className="buttons">
						<label>
							{editing ? (
								<input
									className="btn"
									type="submit"
									onClick={handleSubmit}
									value="Enviar"
								/>
							) : (
								<input
									className="btn"
									type="button"
									onClick={(e) => {
										e.preventDefault()
										setEditing(true)
									}}
									value="Editar"
								/>
							)}
						</label>
						<label>
							<input
								className="btn"
								type="button"
								onClick={handleExclude}
								value="Excluir"
								disabled={editing}
							/>
						</label>
					</div>
				</div>
			</form>
			<Link to="/" className="homeBtn">
				Home
			</Link>
		</BookContainer>
	)
}
