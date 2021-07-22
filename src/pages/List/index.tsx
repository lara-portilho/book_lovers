import { ListContainer } from './styles'
import { useState, useEffect, useMemo } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import firebase from '../../firebaseConnection'
import { toast } from 'react-toastify'

interface IBook {
	id: string
	name: string
	author: string
	series: string
	favorite: boolean
	reading: boolean
}

export default function List() {
	const [books, setBooks] = useState<IBook[]>([])
	const history = useHistory()
	const location = useLocation()
	const query = useMemo(
		() => new URLSearchParams(location.search),
		[location.search]
	)

	const [searchData, setSearchData] = useState({
		search: '',
		reading: false,
		favorite: false,
		sort: 1,
	})

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				let q1, qf
				const db = firebase
					.firestore()
					.collection(`/users/${user.uid}/books`)

				const sort = query.get('sort')

				switch (sort) {
					case null:
					case '1':
						q1 = db.orderBy('name')
						break
					case '2':
						q1 = db.orderBy('author')
						break
					case '3':
						q1 = db.orderBy('series')
						break
					default:
						q1 = db
						break
				}
				if (
					query.get('search') !== null &&
					query.get('search') !== ''
				) {
					qf = q1
						.startAt(query.get('search'))
						.endAt(query.get('search') + '\uf8ff')
				} else {
					qf = q1
				}

				qf.get()
					.then((snapshot) => {
						let list = [] as IBook[]
						let filteredList1 = [] as IBook[]
						let filteredList2 = [] as IBook[]

						snapshot.forEach((doc) => {
							list.push({
								id: doc.id,
								name: doc.data().name,
								author: doc.data().author,
								series: doc.data().series,
								favorite: doc.data().favorite,
								reading: doc.data().reading,
							})
						})

						if (query.get('favorite') === 'true') {
							filteredList1 = list.filter((item) => {
								return item.favorite
							})
						} else {
							filteredList1 = list
						}

						if (query.get('reading') === 'true') {
							filteredList2 = filteredList1.filter((item) => {
								return item.reading
							})
						} else {
							filteredList2 = filteredList1
						}

						setBooks(filteredList2)
					})
					.catch((err) => {
						console.log(err)
						toast.error('Houve algum erro.')
					})
			} else {
				history.push('/login')
			}
		})
	}, [history, query])

	function handleSubmit(e: any) {
		e.preventDefault()
		let newURL = '/all'
		newURL += `?sort=${searchData.sort}`
		newURL += `&search=${searchData.search}`
		newURL += `&favorite=${searchData.favorite}`
		newURL += `&reading=${searchData.reading}`
		history.push(newURL)

		setSearchData({
			search: '',
			reading: false,
			favorite: false,
			sort: searchData.sort,
		})
	}

	const updateField = (e: any) => {
		setSearchData({
			...searchData,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<ListContainer>
			<div className="rightColumn">
				<form className="filter">
					<label>
						Pesquisar por:&nbsp;
						<select name="sort" onChange={updateField}>
							<option value={1}>Nome</option>
							<option value={2}>Autor</option>
							<option value={3}>Coleção</option>
						</select>
						<input
							type="search"
							name="search"
							className="txtInput"
							placeholder="Digite aqui"
							value={searchData.search}
							onChange={updateField}
						/>
					</label>

					<label>
						<input
							type="checkbox"
							name="favorite"
							checked={searchData.favorite}
							onChange={() => {
								searchData.favorite
									? setSearchData({
											...searchData,
											favorite: false,
									  })
									: setSearchData({
											...searchData,
											favorite: true,
									  })
							}}
						/>
						&nbsp; Favoritos
					</label>

					<label>
						<input
							type="checkbox"
							name="reading"
							checked={searchData.reading}
							onChange={() => {
								searchData.reading
									? setSearchData({
											...searchData,
											reading: false,
									  })
									: setSearchData({
											...searchData,
											reading: true,
									  })
							}}
						/>
						&nbsp; Lendo
					</label>

					<label>
						<input
							className="btn"
							type="submit"
							onClick={handleSubmit}
							value="Pesquisar"
						/>
					</label>
				</form>
				<Link to="/" className="homeBtn">
					Home
				</Link>
			</div>

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
					<span className="noneFound">Nenhum livro encontrado!</span>
				)}
			</div>
		</ListContainer>
	)
}
