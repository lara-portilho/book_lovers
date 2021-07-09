import { ErrorContainer } from './styles'
import { Link } from 'react-router-dom'

export default function Error() {
	return (
		<ErrorContainer>
			<h1>404</h1>
			<p>Esta página não existe.</p>
			<Link to="/">Voltar para Home</Link>
		</ErrorContainer>
	)
}
