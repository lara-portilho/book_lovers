import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AddBook from './pages/AddBook'
import Error from './pages/Error'

export default function Routes() {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/add">
					<AddBook />
				</Route>
				<Route path="*">
					<Error />
				</Route>
			</Switch>
		</BrowserRouter>
	)
}
