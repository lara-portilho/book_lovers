import { HomeContainer } from './styles'
import { useState, useEffect } from 'react'
import firebase from '../../firebaseConnection'
import { toast } from 'react-toastify'
import { Link, useHistory } from 'react-router-dom'

interface IBook {
	id: string
	name: string
	author: string
}

export default function Home() {
	const [books, setBooks] = useState<IBook[]>([])
	const [booksFav, setBooksFav] = useState<IBook[]>([])
	const [booksRead, setBooksRead] = useState<IBook[]>([])
	const history = useHistory()

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				const db = firebase
					.firestore()
					.collection(`/users/${user.uid}/books`)

				db.get()
					.then((snapshot) => {
						let list = [] as IBook[]

						if (!snapshot.empty) {
							snapshot.forEach((doc) => {
								list.push({
									id: doc.id,
									name: doc.data().name,
									author: doc.data().author,
								})
							})
						}
						setBooks(list)
					})
					.catch((err) => {
						console.log(err)
						toast.error('Houve algum erro.')
					})

				db.where('favorite', '==', true)
					.get()
					.then((snapshot) => {
						let list = [] as IBook[]
						if (!snapshot.empty) {
							snapshot.forEach((doc) => {
								list.push({
									id: doc.id,
									name: doc.data().name,
									author: doc.data().author,
								})
							})
						}
						setBooksFav(list)
					})
					.catch((err) => {
						console.log(err)
						toast.error('Houve algum erro.')
					})

				db.where('reading', '==', true)
					.get()
					.then((snapshot) => {
						let list = [] as IBook[]
						if (!snapshot.empty) {
							snapshot.forEach((doc) => {
								list.push({
									id: doc.id,
									name: doc.data().name,
									author: doc.data().author,
								})
							})
						}
						setBooksRead(list)
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

	return (
		<HomeContainer>
			<section className="reading">
				<h2>Lendo</h2>
				<div className="bookCont">
					{booksRead.length > 0 ? (
						booksRead.map((book) => {
							return (
								<Link
									to={`/book/${book.id}`}
									key={book.id}
									className="bookCard">
									<span>{book.name}</span>
									<span>{book.author}</span>
								</Link>
							)
						})
					) : (
						<span className="noneFound">
							Nenhum livro encontrado!
						</span>
					)}
				</div>
			</section>
			<section className="favorites">
				<h2>Favoritos</h2>
				<div className="bookCont">
					{booksFav.length > 0 ? (
						booksFav.map((book) => {
							return (
								<Link
									to={`/book/${book.id}`}
									key={book.id}
									className="bookCard">
									<span>{book.name}</span>
									<span>{book.author}</span>
								</Link>
							)
						})
					) : (
						<span className="noneFound">
							Nenhum livro encontrado!
						</span>
					)}
				</div>
			</section>
			<section className="all">
				<h2>Livros</h2>
				<div className="bookCont">
					{books.length > 0 ? (
						books.map((book) => {
							return (
								<Link
									to={`/book/${book.id}`}
									key={book.id}
									className="bookCard">
									<span>{book.name}</span>
									<span>{book.author}</span>
								</Link>
							)
						})
					) : (
						<span className="noneFound">
							Nenhum livro encontrado!
						</span>
					)}
				</div>
			</section>
		</HomeContainer>
	)
}
