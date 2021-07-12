import Routes from './Routes'
import { GlobalStyle } from './globalStyles'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export default function App() {
	return (
		<>
			<GlobalStyle />
			<Routes />
			<ToastContainer autoClose={3000} />
		</>
	)
}
