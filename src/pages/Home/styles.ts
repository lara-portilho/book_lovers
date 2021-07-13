import styled from 'styled-components'

export const HomeContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	padding-top: 50px;

	section {
		height: auto;
		width: 80%;
		background-color: #ab84a4;
		color: #000000;
		padding: 10px;
		border-radius: 10px;
		margin-top: 30px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.bookCont {
			display: grid;
			width: 100%;
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
			grid-template-rows: auto auto;
			grid-auto-rows: 0px;
			overflow: hidden;
			justify-content: center;

			.bookCard {
				color: #ffffff;
				background-color: #08133b;
				display: flex;
				flex-direction: column;
				padding: 10px;
				margin: 10px;
				height: auto;
				justify-content: space-between;
				border-radius: 10px;
				text-decoration: none;
				transition: 0.5s;
			}

			.bookCard:hover {
				opacity: 0.6;
			}

			@media screen and (max-width: 775px) {
				grid-template-rows: auto auto auto;
			}
		}
	}
`
