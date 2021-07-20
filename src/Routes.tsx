import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AddBook from './pages/AddBook'
import List from './pages/List'
import Book from './pages/Book'
import Error from './pages/Error'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

export default function Routes() {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path="/login">
					<Login />
				</Route>

				<Route exact path="/signup">
					<SignUp />
				</Route>

				<Route exact path="/">
					<Home />
				</Route>

				<Route exact path="/add">
					<AddBook />
				</Route>

				<Route path="/all">
					<List />
				</Route>

				<Route exact path="/book/:id">
					<Book />
				</Route>

				<Route path="*">
					<Error />
				</Route>
			</Switch>
		</BrowserRouter>
	)
}
