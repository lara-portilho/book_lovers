import { HomeContainer } from './styles'

export default function Home() {
	return (
		<HomeContainer>
			<section className="reading">
				<h2>Lendo</h2>
			</section>
			<section className="favorites">
				<h2>Favoritos</h2>
			</section>
			<section className="series">
				<h2>Coleções</h2>
			</section>
			<section className="recent">
				<h2>Recentes</h2>
			</section>
		</HomeContainer>
	)
}
