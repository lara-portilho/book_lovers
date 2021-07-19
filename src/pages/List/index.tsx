import { ListContainer } from './styles'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import firebase from '../../firebaseConnection'
import { toast } from 'react-toastify'

interface IBook {
	id: string
	name: string
	author: string
	series: string
	finished: string
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
		name: '',
		author: '',
		series: '',
		finished: '',
		reading: false,
		favorite: false,
		sort: 1,
	})

	const loadQueryParams = useCallback(() => {
		const db = firebase.firestore().collection('books')
		let q1, q2, q3, q4, q5, qf

		//sort = query.get('sort')

		if (query.get('name') !== null && query.get('name') !== '') {
			q1 = db.where('name', '==', query.get('name'))
			//sort = '1' ? '3' : sort
			//sort = '2' ? '3' : sort
		} else {
			q1 = db
		}
		if (query.get('author') !== null && query.get('author') !== '') {
			q2 = q1.where('author', '==', query.get('author'))
			//sort = '3' ? '1' : sort
		} else {
			q2 = q1
		}
		if (query.get('series') !== null && query.get('series') !== '') {
			q3 = q2.where('series', '==', query.get('series'))
		} else {
			q3 = q2
		}
		if (query.get('reading') !== null && query.get('reading') !== 'false') {
			q4 = q3.where('reading', '==', true)
		} else {
			q4 = q3
		}
		if (
			query.get('favorite') !== null &&
			query.get('favorite') !== 'false'
		) {
			q5 = q4.where('favorite', '==', true)
		} else {
			q5 = q4
		}

		qf = q5

		// switch (sort) {
		// 	case null:
		// 	case '1':
		// 		qf = q4.orderBy('name')
		// 		break
		// 	case '2':
		// 		qf = q4.orderBy('name', 'desc')
		// 		break
		// 	case '3':
		// 		qf = q4.orderBy('author')
		// 		break
		// 	case '4':
		// 		qf = q4.orderBy('finished')
		// 		break
		// 	case '5':
		// 		qf = q4.orderBy('finished', 'desc')
		// 		break
		// 	default:
		// 		qf = q4
		// 		break
		// }

		qf.get()
			.then((snapshot) => {
				let list = [] as IBook[]

				snapshot.forEach((doc) => {
					list.push({
						id: doc.id,
						name: doc.data().name,
						author: doc.data().author,
						series: doc.data().series,
						finished: doc.data().finished,
						favorite: doc.data().favorite,
						reading: doc.data().reading,
					})
				})

				setBooks(list)
			})
			.catch((err) => {
				console.log(err)
				toast.error('Houve algum erro.')
			})
	}, [query])

	useEffect(() => {
		loadQueryParams()
	}, [loadQueryParams])

	function handleSubmit(e: any) {
		e.preventDefault()
		let newURL = '/all'
		newURL += `?sort=${searchData.sort}`
		newURL += `&name=${searchData.name}`
		newURL += `&author=${searchData.author}`
		newURL += `&series=${searchData.series}`
		newURL += `&finished=${searchData.finished}`
		newURL += `&favorite=${searchData.favorite}`
		newURL += `&reading=${searchData.reading}`
		history.push(newURL)

		setSearchData({
			name: '',
			author: '',
			series: '',
			finished: '',
			reading: false,
			favorite: false,
			sort: 1,
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
			<form className="filter">
				<label>
					Nome:&nbsp;
					<input
						type="search"
						name="name"
						className="txtInput"
						placeholder="Nome"
						value={searchData.name}
						onChange={updateField}
					/>
				</label>

				<label>
					Autor:&nbsp;
					<input
						type="search"
						name="author"
						className="txtInput"
						placeholder="Autor"
						value={searchData.author}
						onChange={updateField}
					/>
				</label>

				<label>
					Coleção:&nbsp;
					<input
						type="search"
						name="series"
						className="txtInput"
						placeholder="Coleção"
						value={searchData.series}
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

				{/* <label>
					Ordenar por:&nbsp;
					<select name="sort" onChange={updateField}>
						<option value={1}>A - Z</option>
						<option value={2}>Z - A</option>
						<option value={3}>Autor</option>
						<option value={4}>Últimos finalizados</option>
						<option value={5}>Primeiros finalizados</option>
					</select>
				</label> */}

				<label>
					<input
						className="btn"
						type="submit"
						onClick={(e) => handleSubmit(e)}
						value="Pesquisar"
					/>
				</label>
			</form>

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
