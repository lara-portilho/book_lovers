import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AddBook from './pages/AddBook'
import List from './pages/List'
import Book from './pages/Book'
import Error from './pages/Error'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import ProfileEditing from './pages/Profile/Editing'
import PasswordEditing from './pages/Profile/PasswordEditing'
import DeleteAccount from './pages/Profile/DeleteAccount'

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

				<Route exact path="/profile">
					<Profile />
				</Route>

				<Route exact path="/profile/edit">
					<ProfileEditing />
				</Route>

				<Route exact path="/profile/editpass">
					<PasswordEditing />
				</Route>

				<Route exact path="/profile/delete">
					<DeleteAccount />
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
