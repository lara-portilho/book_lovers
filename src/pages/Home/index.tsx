import { HomeContainer } from './styles'
import { useState, useEffect } from 'react'
import firebase from '../../firebaseConnection'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

interface IBook {
	id: string
	name: string
	author: string
}

export default function Home() {
	const [books, setBooks] = useState<IBook[]>([])
	const [booksFav, setBooksFav] = useState<IBook[]>([])
	const [booksRead, setBooksRead] = useState<IBook[]>([])

	useEffect(() => {
		const db = firebase.firestore().collection('books')

		db.get()
			.then((snapshot) => {
				let list = [] as IBook[]

				snapshot.forEach((doc) => {
					list.push({
						id: doc.id,
						name: doc.data().name,
						author: doc.data().author,
					})
				})

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

				snapshot.forEach((doc) => {
					list.push({
						id: doc.id,
						name: doc.data().name,
						author: doc.data().author,
					})
				})

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

				snapshot.forEach((doc) => {
					list.push({
						id: doc.id,
						name: doc.data().name,
						author: doc.data().author,
					})
				})

				setBooksRead(list)
			})
			.catch((err) => {
				console.log(err)
				toast.error('Houve algum erro.')
			})
	}, [])

	return (
		<HomeContainer>
			<section className="reading">
				<h2>Lendo</h2>
				<div className="bookCont">
					{booksRead.map((book) => {
						return (
							<Link
								to={`/book/${book.id}`}
								key={book.id}
								className="bookCard">
								<span>{book.name}</span>
								<span>{book.author}</span>
							</Link>
						)
					})}
				</div>
			</section>
			<section className="favorites">
				<h2>Favoritos</h2>
				<div className="bookCont">
					{booksFav.map((book) => {
						return (
							<Link
								to={`/book/${book.id}`}
								key={book.id}
								className="bookCard">
								<span>{book.name}</span>
								<span>{book.author}</span>
							</Link>
						)
					})}
				</div>
			</section>
			<section className="all">
				<h2>Livros</h2>
				<div className="bookCont">
					{books.map((book) => {
						return (
							<Link
								to={`/book/${book.id}`}
								key={book.id}
								className="bookCard">
								<span>{book.name}</span>
								<span>{book.author}</span>
							</Link>
						)
					})}
				</div>
			</section>
		</HomeContainer>
	)
}
